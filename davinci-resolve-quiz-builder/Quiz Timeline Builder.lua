-- Quiz Timeline Builder for DaVinci Resolve 21+
--
-- Reads the QuizDataset JSON used by the YouTube quiz generator and creates
-- two adjacent transparent Fusion overlay clips per question on a dedicated
-- video track above the existing edit:
--   Q01 QUESTION -> neutral question/options state
--   Q01 ANSWER   -> matching state, then answer highlight and explanation

local APP_ID = "com.redsaphir.quizTimelineBuilder"
local APP_NAME = "Quiz Timeline Builder"
local VERSION = "0.2.0"

local function fail(message)
    error(APP_NAME .. ": " .. tostring(message), 0)
end

-- Minimal self-contained JSON decoder. Resolve's built-in Lua does not ship
-- with a JSON module, so keeping this here makes the tool installable as one file.
local json = { null = {} }

local function utf8_char(codepoint)
    if codepoint <= 0x7F then
        return string.char(codepoint)
    elseif codepoint <= 0x7FF then
        return string.char(
            0xC0 + math.floor(codepoint / 0x40),
            0x80 + (codepoint % 0x40)
        )
    elseif codepoint <= 0xFFFF then
        return string.char(
            0xE0 + math.floor(codepoint / 0x1000),
            0x80 + (math.floor(codepoint / 0x40) % 0x40),
            0x80 + (codepoint % 0x40)
        )
    elseif codepoint <= 0x10FFFF then
        return string.char(
            0xF0 + math.floor(codepoint / 0x40000),
            0x80 + (math.floor(codepoint / 0x1000) % 0x40),
            0x80 + (math.floor(codepoint / 0x40) % 0x40),
            0x80 + (codepoint % 0x40)
        )
    end
    return "?"
end

function json.decode(source)
    if type(source) ~= "string" then
        fail("JSON source must be text")
    end

    local length = #source
    local position = 1

    local function decode_error(message)
        fail(string.format("Invalid JSON at byte %d: %s", position, message))
    end

    local function skip_space()
        while position <= length do
            local byte = source:byte(position)
            if byte == 32 or byte == 9 or byte == 10 or byte == 13 then
                position = position + 1
            else
                break
            end
        end
    end

    local parse_value

    local function parse_string()
        if source:sub(position, position) ~= '"' then
            decode_error("expected string")
        end
        position = position + 1
        local parts = {}
        local part_start = position

        while position <= length do
            local char = source:sub(position, position)
            if char == '"' then
                if position > part_start then
                    table.insert(parts, source:sub(part_start, position - 1))
                end
                position = position + 1
                return table.concat(parts)
            elseif char == "\\" then
                if position > part_start then
                    table.insert(parts, source:sub(part_start, position - 1))
                end
                position = position + 1
                local escape = source:sub(position, position)
                local replacements = {
                    ['"'] = '"', ['\\'] = '\\', ['/'] = '/',
                    b = "\b", f = "\f", n = "\n", r = "\r", t = "\t"
                }
                if replacements[escape] then
                    table.insert(parts, replacements[escape])
                    position = position + 1
                elseif escape == "u" then
                    local hex = source:sub(position + 1, position + 4)
                    if not hex:match("^%x%x%x%x$") then
                        decode_error("invalid Unicode escape")
                    end
                    local codepoint = tonumber(hex, 16)
                    position = position + 5
                    if codepoint >= 0xD800 and codepoint <= 0xDBFF and source:sub(position, position + 1) == "\\u" then
                        local low_hex = source:sub(position + 2, position + 5)
                        local low = tonumber(low_hex, 16)
                        if low and low >= 0xDC00 and low <= 0xDFFF then
                            codepoint = 0x10000 + ((codepoint - 0xD800) * 0x400) + (low - 0xDC00)
                            position = position + 6
                        end
                    end
                    table.insert(parts, utf8_char(codepoint))
                else
                    decode_error("invalid escape sequence")
                end
                part_start = position
            elseif char:byte() < 32 then
                decode_error("control character in string")
            else
                position = position + 1
            end
        end
        decode_error("unterminated string")
    end

    local function parse_number()
        local fragment = source:sub(position)
        local token = fragment:match("^%-?%d+%.?%d*[eE]?[+%-]?%d*")
        if not token or token == "" then
            decode_error("invalid number")
        end
        local number = tonumber(token)
        if not number then
            decode_error("invalid number")
        end
        position = position + #token
        return number
    end

    local function parse_array()
        position = position + 1
        skip_space()
        local result = {}
        if source:sub(position, position) == "]" then
            position = position + 1
            return result
        end
        while true do
            table.insert(result, parse_value())
            skip_space()
            local char = source:sub(position, position)
            if char == "]" then
                position = position + 1
                return result
            elseif char ~= "," then
                decode_error("expected ',' or ']' in array")
            end
            position = position + 1
            skip_space()
        end
    end

    local function parse_object()
        position = position + 1
        skip_space()
        local result = {}
        if source:sub(position, position) == "}" then
            position = position + 1
            return result
        end
        while true do
            local key = parse_string()
            skip_space()
            if source:sub(position, position) ~= ":" then
                decode_error("expected ':' after object key")
            end
            position = position + 1
            skip_space()
            result[key] = parse_value()
            skip_space()
            local char = source:sub(position, position)
            if char == "}" then
                position = position + 1
                return result
            elseif char ~= "," then
                decode_error("expected ',' or '}' in object")
            end
            position = position + 1
            skip_space()
        end
    end

    function parse_value()
        skip_space()
        local char = source:sub(position, position)
        if char == '"' then
            return parse_string()
        elseif char == "{" then
            return parse_object()
        elseif char == "[" then
            return parse_array()
        elseif char == "-" or char:match("%d") then
            return parse_number()
        elseif source:sub(position, position + 3) == "true" then
            position = position + 4
            return true
        elseif source:sub(position, position + 4) == "false" then
            position = position + 5
            return false
        elseif source:sub(position, position + 3) == "null" then
            position = position + 4
            return json.null
        end
        decode_error("unexpected token")
    end

    local value = parse_value()
    skip_space()
    if position <= length then
        decode_error("trailing content")
    end
    return value
end

local function read_text_file(path)
    local file, open_error = io.open(path, "rb")
    if not file then
        fail("Could not open JSON file: " .. tostring(open_error))
    end
    local source = file:read("*a")
    file:close()
    if source:sub(1, 3) == string.char(0xEF, 0xBB, 0xBF) then
        source = source:sub(4)
    end
    return source
end

local function trim(value)
    return tostring(value or ""):gsub("^%s+", ""):gsub("%s+$", "")
end

local function wrap_text(value, max_chars)
    local text = trim(value):gsub("\r\n", "\n"):gsub("\r", "\n")
    local lines = {}
    for paragraph in (text .. "\n"):gmatch("(.-)\n") do
        if paragraph == "" then
            table.insert(lines, "")
        else
            local line = ""
            for word in paragraph:gmatch("%S+") do
                if line == "" then
                    line = word
                elseif #line + 1 + #word <= max_chars then
                    line = line .. " " .. word
                else
                    table.insert(lines, line)
                    line = word
                end
            end
            if line ~= "" then
                table.insert(lines, line)
            end
        end
    end
    return table.concat(lines, "\n")
end

local function normalize_question(question, index)
    if type(question) ~= "table" then
        fail(string.format("Question %d is not an object", index))
    end
    local kind = question.type or "mcq"
    if kind ~= "mcq" and kind ~= "number" then
        fail(string.format("Question %d has unsupported type '%s'", index, tostring(kind)))
    end
    local prompt = trim(question.question)
    if prompt == "" then
        fail(string.format("Question %d has no question text", index))
    end

    local normalized = {
        type = kind,
        question = prompt,
        explanation = trim(question.explanation or question.keyTakeaway),
        id = trim(question.id),
    }

    if kind == "mcq" then
        if type(question.options) ~= "table" or #question.options < 2 then
            fail(string.format("Question %d needs at least two options", index))
        end
        normalized.options = {}
        for option_index, option in ipairs(question.options) do
            local option_text = trim(option)
            if option_text == "" then
                fail(string.format("Question %d option %d is empty", index, option_index))
            end
            table.insert(normalized.options, option_text)
        end
        local correct = tonumber(question.correctIndex)
        if correct == nil and question.correctAnswer then
            for option_index, option in ipairs(normalized.options) do
                if option == trim(question.correctAnswer) then
                    correct = option_index - 1
                    break
                end
            end
        end
        if correct == nil or correct < 0 or correct >= #normalized.options or correct ~= math.floor(correct) then
            fail(string.format("Question %d has an invalid correctIndex", index))
        end
        normalized.correct_index = correct + 1
        normalized.answer = normalized.options[normalized.correct_index]
    else
        if tonumber(question.target) == nil then
            fail(string.format("Question %d number question has no numeric target", index))
        end
        normalized.target = tonumber(question.target)
        normalized.unit = trim(question.unit or question.metricUnit)
        normalized.answer = trim(question.imperialDisplay)
        if normalized.answer == "" then
            normalized.answer = tostring(normalized.target)
            if normalized.unit ~= "" then
                normalized.answer = normalized.answer .. " " .. normalized.unit
            end
        end
    end
    return normalized
end

local function load_quiz(path, limit)
    local dataset = json.decode(read_text_file(path))
    if type(dataset) ~= "table" or type(dataset.questions) ~= "table" or #dataset.questions == 0 then
        fail("JSON must contain a non-empty questions array")
    end
    local quiz = {
        title = trim(dataset.title or dataset.theme or "Quiz"),
        theme = trim(dataset.theme or dataset.title or "Quiz"),
        questions = {},
    }
    local count = math.min(#dataset.questions, math.max(1, tonumber(limit) or #dataset.questions))
    for index = 1, count do
        table.insert(quiz.questions, normalize_question(dataset.questions[index], index))
    end
    return quiz
end

local PALETTE = {
    canvas = { 0.0, 0.0, 0.0, 0.0 },
    shadow = { 0.0, 0.0, 0.0, 0.36 },
    glass = { 0.010, 0.018, 0.038, 0.82 },
    glass_border = { 0.18, 0.24, 0.36, 0.72 },
    panel = { 0.030, 0.048, 0.090, 0.98 },
    panel_raised = { 0.047, 0.070, 0.122, 0.98 },
    option = { 0.050, 0.076, 0.132, 0.99 },
    option_border = { 0.16, 0.22, 0.34, 1.0 },
    accent = { 0.76, 0.075, 0.16, 1.0 },
    accent_soft = { 0.050, 0.013, 0.030, 1.0 },
    gold = { 0.98, 0.72, 0.20, 1.0 },
    gold_soft = { 0.050, 0.040, 0.014, 1.0 },
    correct = { 0.035, 0.56, 0.32, 1.0 },
    correct_border = { 0.18, 0.92, 0.55, 1.0 },
    dim = { 0.005, 0.010, 0.022, 0.72 },
    white = { 0.965, 0.975, 1.0, 1.0 },
    muted = { 0.57, 0.64, 0.75, 1.0 },
}

local CANVAS_WIDTH = 1920
local CANVAS_HEIGHT = 1080

local function set_tool_name(tool, name)
    if tool then
        tool:SetAttrs({ TOOLS_Name = name })
    end
    return tool
end

local function set_color(tool, color)
    tool:SetInput("UseFrameFormatSettings", 0)
    tool:SetInput("Width", CANVAS_WIDTH)
    tool:SetInput("Height", CANVAS_HEIGHT)
    tool.TopLeftRed = color[1]
    tool.TopLeftGreen = color[2]
    tool.TopLeftBlue = color[3]
    tool.TopLeftAlpha = color[4]
end

local function add_merge(comp, background, foreground, name)
    local merge = set_tool_name(comp:AddTool("Merge"), name)
    merge.Background = background.Output
    merge.Foreground = foreground.Output
    return merge
end

local function add_panel(comp, x, y, width, height, color, radius, name)
    local mask = set_tool_name(comp:AddTool("RectangleMask"), name .. " Mask")
    mask.Center = { x, y }
    mask.Width = width
    mask.Height = height
    mask.CornerRadius = radius or 0.05

    local panel = set_tool_name(comp:AddTool("Background"), name)
    set_color(panel, color)
    panel:ConnectInput("EffectMask", mask)
    panel.MultiplyByMask = 1
    return panel
end

local function add_ellipse(comp, x, y, width, height, color, soft_edge, name)
    local mask = set_tool_name(comp:AddTool("EllipseMask"), name .. " Mask")
    mask.Center = { x, y }
    mask.Width = width
    mask.Height = height
    mask.SoftEdge = soft_edge or 0.10

    local panel = set_tool_name(comp:AddTool("Background"), name)
    set_color(panel, color)
    panel:ConnectInput("EffectMask", mask)
    panel.MultiplyByMask = 1
    return panel
end

local function add_text(comp, text, x, y, size, color, name, bold, justification)
    local tool = set_tool_name(comp:AddTool("TextPlus"), name)
    tool:SetInput("UseFrameFormatSettings", 0)
    tool:SetInput("Width", CANVAS_WIDTH)
    tool:SetInput("Height", CANVAS_HEIGHT)
    tool.StyledText = text
    tool.Center = { x, y }
    tool.Size = size
    tool.Font = "Arial"
    tool.Style = bold and "Bold" or "Regular"
    -- Text+ uses the numbered Shading Element 1 inputs for glyph color.
    -- The unnumbered Red/Green/Blue fields belong to its optional background.
    tool.Red1 = color[1]
    tool.Green1 = color[2]
    tool.Blue1 = color[3]
    tool.Alpha1 = color[4]
    tool.HorizontalJustification = justification or 0
    tool.VerticalJustification = 0
    return tool
end

local function animate_blend(merge, start_frame, end_frame)
    if merge:AddModifier("Blend", "BezierSpline") then
        merge.Blend[0] = 0
        merge.Blend[start_frame] = 0
        merge.Blend[end_frame] = 1
        return true
    end
    merge.Blend = 1
    return false
end

local function option_layout(option_count)
    if option_count <= 2 then
        return { 0.53, 0.36 }, 0.12
    elseif option_count == 3 then
        return { 0.56, 0.42, 0.28 }, 0.105
    end
    return { 0.57, 0.45, 0.33, 0.21 }, 0.09
end

local function build_visual_fullscreen_legacy(comp, question, index, total, state)
    local media_out = comp:FindTool("MediaOut1")
    if not media_out then
        media_out = set_tool_name(comp:AddTool("MediaOut"), "MediaOut1")
    end

    local root = set_tool_name(comp:AddTool("Background"), "Quiz Canvas")
    set_color(root, PALETTE.canvas)
    local chain = root

    -- Soft light pools give the flat Fusion background some depth without
    -- relying on external art assets.
    local red_glow = add_ellipse(comp, 0.03, 0.88, 0.62, 0.62, PALETTE.accent_soft, 0.22, "Red Ambient Glow")
    chain = add_merge(comp, chain, red_glow, "Merge Red Ambient Glow")
    local gold_glow = add_ellipse(comp, 0.97, 0.10, 0.54, 0.54, PALETTE.gold_soft, 0.22, "Gold Ambient Glow")
    chain = add_merge(comp, chain, gold_glow, "Merge Gold Ambient Glow")

    local top_rule = add_panel(comp, 0.5, 0.972, 0.86, 0.006, PALETTE.option_border, 0.3, "Progress Track")
    chain = add_merge(comp, chain, top_rule, "Merge Progress Track")
    local progress_width = 0.86 * math.min(1, math.max(0.03, index / math.max(1, total)))
    local progress = add_panel(comp, 0.07 + (progress_width / 2), 0.972, progress_width, 0.008, PALETTE.gold, 0.3, "Progress Fill")
    local progress_merge = add_merge(comp, chain, progress, "Merge Progress Fill")
    if state == "question" then animate_blend(progress_merge, 0, 8) end
    chain = progress_merge

    local accent = add_panel(comp, 0.145, 0.912, 0.21, 0.058, PALETTE.accent, 0.32, "Question Badge")
    local accent_merge = add_merge(comp, chain, accent, "Merge Question Badge")
    if state == "question" then animate_blend(accent_merge, 0, 6) end
    chain = accent_merge

    local header = string.format("QUESTION %02d / %02d", index, total)
    local header_text = add_text(comp, header, 0.145, 0.912, 0.025, PALETTE.white, "Question Number", true)
    local header_merge = add_merge(comp, chain, header_text, "Merge Question Number")
    if state == "question" then animate_blend(header_merge, 0, 6) end
    chain = header_merge

    local type_label
    if state == "answer" then
        type_label = "ANSWER REVEAL"
    else
        type_label = question.type == "mcq" and "MULTIPLE CHOICE" or "BEST ESTIMATE"
    end
    local type_text = add_text(comp, type_label, 0.86, 0.912, 0.024, PALETTE.gold, "Question Type", true)
    local type_merge = add_merge(comp, chain, type_text, "Merge Question Type")
    if state == "question" then animate_blend(type_merge, 0, 6) end
    chain = type_merge

    local question_border = add_panel(comp, 0.5, 0.748, 0.86, 0.216, PALETTE.option_border, 0.075, "Question Border")
    local question_border_merge = add_merge(comp, chain, question_border, "Merge Question Border")
    if state == "question" then animate_blend(question_border_merge, 2, 10) end
    chain = question_border_merge

    local question_panel = add_panel(comp, 0.5, 0.748, 0.852, 0.204, PALETTE.panel, 0.075, "Question Panel")
    local question_panel_merge = add_merge(comp, chain, question_panel, "Merge Question Panel")
    if state == "question" then animate_blend(question_panel_merge, 2, 10) end
    chain = question_panel_merge

    local question_accent = add_panel(comp, 0.092, 0.748, 0.010, 0.142, PALETTE.accent, 0.35, "Question Accent Rule")
    local question_accent_merge = add_merge(comp, chain, question_accent, "Merge Question Accent Rule")
    if state == "question" then animate_blend(question_accent_merge, 4, 12) end
    chain = question_accent_merge

    local question_size = #question.question > 105 and 0.036 or (#question.question > 65 and 0.042 or 0.049)
    local question_text = add_text(
        comp,
        wrap_text(question.question, 50),
        0.5,
        0.748,
        question_size,
        PALETTE.white,
        "Question Text",
        true
    )
    local question_text_merge = add_merge(comp, chain, question_text, "Merge Question Text")
    if state == "question" then animate_blend(question_text_merge, 2, 10) end
    chain = question_text_merge

    if question.type == "mcq" then
        local positions, option_height = option_layout(#question.options)
        local letters = { "A", "B", "C", "D", "E", "F" }

        for option_index, option in ipairs(question.options) do
            local y = positions[option_index] or (0.60 - (option_index - 1) * 0.12)
            local option_border = add_panel(comp, 0.5, y, 0.82, option_height + 0.012, PALETTE.option_border, 0.12, "Option Border " .. option_index)
            local option_border_merge = add_merge(comp, chain, option_border, "Merge Option Border " .. option_index)
            if state == "question" then
                local reveal_start = 7 + ((option_index - 1) * 4)
                animate_blend(option_border_merge, reveal_start, reveal_start + 7)
            end
            chain = option_border_merge

            local option_panel = add_panel(comp, 0.5, y, 0.812, option_height, PALETTE.option, 0.12, "Option " .. option_index)
            local option_panel_merge = add_merge(comp, chain, option_panel, "Merge Option " .. option_index)
            if state == "question" then
                local reveal_start = 7 + ((option_index - 1) * 4)
                animate_blend(option_panel_merge, reveal_start, reveal_start + 7)
            end
            chain = option_panel_merge

            local letter_panel = add_panel(comp, 0.135, y, 0.066, option_height * 0.70, PALETTE.panel_raised, 0.22, "Option Letter Chip " .. option_index)
            local letter_panel_merge = add_merge(comp, chain, letter_panel, "Merge Option Letter Chip " .. option_index)
            if state == "question" then
                local reveal_start = 8 + ((option_index - 1) * 4)
                animate_blend(letter_panel_merge, reveal_start, reveal_start + 7)
            end
            chain = letter_panel_merge

            local letter = letters[option_index] or tostring(option_index)
            local letter_text = add_text(comp, letter, 0.135, y, 0.030, PALETTE.gold, "Option Letter " .. option_index, true)
            local letter_text_merge = add_merge(comp, chain, letter_text, "Merge Option Letter " .. option_index)
            if state == "question" then
                local reveal_start = 8 + ((option_index - 1) * 4)
                animate_blend(letter_text_merge, reveal_start, reveal_start + 7)
            end
            chain = letter_text_merge

            local option_size = #option > 48 and 0.027 or (#option > 28 and 0.032 or 0.037)
            local option_copy = wrap_text(option, 43)
            local option_text = add_text(comp, option_copy, 0.54, y, option_size, PALETTE.white, "Option Text " .. option_index, true)
            local option_text_merge = add_merge(comp, chain, option_text, "Merge Option Text " .. option_index)
            if state == "question" then
                local reveal_start = 7 + ((option_index - 1) * 4)
                animate_blend(option_text_merge, reveal_start, reveal_start + 7)
            end
            chain = option_text_merge

            if state == "answer" then
                if option_index == question.correct_index then
                    local correct_border = add_panel(comp, 0.5, y, 0.82, option_height + 0.012, PALETTE.correct_border, 0.12, "Correct Border")
                    local correct_border_merge = add_merge(comp, chain, correct_border, "Reveal Correct Border")
                    animate_blend(correct_border_merge, 4, 12)
                    chain = correct_border_merge

                    local correct_panel = add_panel(comp, 0.5, y, 0.812, option_height, PALETTE.correct, 0.12, "Correct Highlight")
                    local highlight_merge = add_merge(comp, chain, correct_panel, "Reveal Correct Highlight")
                    animate_blend(highlight_merge, 4, 12)
                    chain = highlight_merge

                    local correct_letter_panel = add_panel(comp, 0.135, y, 0.066, option_height * 0.70, PALETTE.white, 0.22, "Correct Letter Chip")
                    local correct_letter_panel_merge = add_merge(comp, chain, correct_letter_panel, "Reveal Correct Letter Chip")
                    animate_blend(correct_letter_panel_merge, 4, 12)
                    chain = correct_letter_panel_merge

                    local correct_letter = add_text(comp, letter, 0.135, y, 0.030, PALETTE.correct, "Correct Letter", true)
                    local correct_letter_merge = add_merge(comp, chain, correct_letter, "Reveal Correct Letter")
                    animate_blend(correct_letter_merge, 4, 12)
                    chain = correct_letter_merge

                    local correct_text = add_text(comp, option_copy, 0.54, y, option_size, PALETTE.white, "Correct Option Text", true)
                    local correct_text_merge = add_merge(comp, chain, correct_text, "Reveal Correct Text")
                    animate_blend(correct_text_merge, 4, 12)
                    chain = correct_text_merge

                    local correct_tag = add_text(comp, "CORRECT", 0.855, y, 0.021, PALETTE.white, "Correct Tag", true)
                    local correct_tag_merge = add_merge(comp, chain, correct_tag, "Reveal Correct Tag")
                    animate_blend(correct_tag_merge, 7, 14)
                    chain = correct_tag_merge
                else
                    local dim_panel = add_panel(comp, 0.5, y, 0.82, option_height + 0.012, PALETTE.dim, 0.12, "Dim Wrong Option " .. option_index)
                    local dim_merge = add_merge(comp, chain, dim_panel, "Reveal Dim Wrong " .. option_index)
                    animate_blend(dim_merge, 4, 12)
                    chain = dim_merge
                end
            end
        end
    else
        local answer_panel_color = state == "answer" and PALETTE.correct or PALETTE.option
        local estimate_border_color = state == "answer" and PALETTE.correct_border or PALETTE.option_border
        local estimate_border = add_panel(comp, 0.5, 0.42, 0.70, 0.21, estimate_border_color, 0.10, "Estimate Answer Border")
        local estimate_border_merge = add_merge(comp, chain, estimate_border, "Merge Estimate Answer Border")
        if state == "answer" then
            animate_blend(estimate_border_merge, 4, 12)
        else
            animate_blend(estimate_border_merge, 8, 16)
        end
        chain = estimate_border_merge

        local answer_panel = add_panel(comp, 0.5, 0.42, 0.688, 0.196, answer_panel_color, 0.10, "Estimate Answer Panel")
        local answer_merge = add_merge(comp, chain, answer_panel, "Merge Estimate Answer Panel")
        if state == "answer" then
            animate_blend(answer_merge, 4, 12)
        else
            animate_blend(answer_merge, 8, 16)
        end
        chain = answer_merge

        local answer_copy = state == "answer" and ("ANSWER\n" .. question.answer) or "MAKE YOUR BEST ESTIMATE"
        local answer_size = state == "answer" and 0.052 or 0.042
        local answer_text = add_text(comp, answer_copy, 0.5, 0.42, answer_size, PALETTE.white, "Estimate Answer", true)
        local answer_text_merge = add_merge(comp, chain, answer_text, "Merge Estimate Answer")
        if state == "answer" then
            animate_blend(answer_text_merge, 4, 12)
        else
            animate_blend(answer_text_merge, 8, 16)
        end
        chain = answer_text_merge
    end

    if state == "question" then
        local prompt_rule = add_panel(comp, 0.5, 0.095, 0.35, 0.004, PALETTE.option_border, 0.3, "Thinking Rule")
        local prompt_rule_merge = add_merge(comp, chain, prompt_rule, "Merge Thinking Rule")
        animate_blend(prompt_rule_merge, 20, 28)
        chain = prompt_rule_merge

        local prompt = add_text(comp, "LOCK IN YOUR ANSWER", 0.5, 0.060, 0.022, PALETTE.muted, "Thinking Prompt", true)
        local prompt_merge = add_merge(comp, chain, prompt, "Merge Thinking Prompt")
        animate_blend(prompt_merge, 20, 28)
        chain = prompt_merge
    else
        local explanation = question.explanation
        if explanation == "" then
            explanation = "Correct answer: " .. question.answer
        end
        local explanation_border = add_panel(comp, 0.5, 0.075, 0.86, 0.112, PALETTE.option_border, 0.10, "Explanation Border")
        local explanation_border_merge = add_merge(comp, chain, explanation_border, "Reveal Explanation Border")
        animate_blend(explanation_border_merge, 16, 24)
        chain = explanation_border_merge

        local explanation_panel = add_panel(comp, 0.5, 0.075, 0.852, 0.102, PALETTE.panel, 0.10, "Explanation Panel")
        local panel_merge = add_merge(comp, chain, explanation_panel, "Reveal Explanation Panel")
        animate_blend(panel_merge, 16, 24)
        chain = panel_merge

        local label = add_text(comp, "WHY IT'S RIGHT", 0.17, 0.075, 0.020, PALETTE.gold, "Explanation Label", true)
        local label_merge = add_merge(comp, chain, label, "Reveal Explanation Label")
        animate_blend(label_merge, 18, 26)
        chain = label_merge

        local explanation_size = #explanation > 145 and 0.020 or (#explanation > 90 and 0.023 or 0.027)
        local explanation_text = add_text(
            comp,
            wrap_text(explanation, 78),
            0.61,
            0.075,
            explanation_size,
            PALETTE.white,
            "Explanation Text",
            false
        )
        local explanation_merge = add_merge(comp, chain, explanation_text, "Reveal Explanation Text")
        animate_blend(explanation_merge, 18, 26)
        chain = explanation_merge
    end

    media_out.Input = chain.Output
end

local function line_count(value)
    local count = 1
    for _ in tostring(value or ""):gmatch("\n") do
        count = count + 1
    end
    return count
end

-- Text+ does not expose a dependable "fit this exact box" switch through the
-- Resolve scripting API. This performs deterministic autofit instead: wrap at
-- progressively wider character counts as the font shrinks, and stop when the
-- requested line budget is met.
local function fit_wrapped_text(value, base_chars, max_lines, max_size, min_size)
    local size = max_size
    local step = 0.002
    while size >= min_size do
        local capacity = math.max(8, math.floor(base_chars * (max_size / size)))
        local wrapped = wrap_text(value, capacity)
        if line_count(wrapped) <= max_lines then
            return wrapped, size
        end
        size = size - step
    end
    local final_capacity = math.max(8, math.floor(base_chars * (max_size / min_size)))
    return wrap_text(value, final_capacity), min_size
end

local function overlay_option_layout(option_count)
    if option_count <= 2 then
        return {
            { x = 0.285, y = 0.155 },
            { x = 0.715, y = 0.155 },
        }, 0.405, 0.090
    elseif option_count == 3 then
        return {
            { x = 0.285, y = 0.205 },
            { x = 0.715, y = 0.205 },
            { x = 0.500, y = 0.115 },
        }, 0.405, 0.075
    end
    return {
        { x = 0.285, y = 0.205 },
        { x = 0.715, y = 0.205 },
        { x = 0.285, y = 0.115 },
        { x = 0.715, y = 0.115 },
    }, 0.405, 0.075
end

local function build_visual(comp, question, index, total, state)
    local media_out = comp:FindTool("MediaOut1")
    if not media_out then
        media_out = set_tool_name(comp:AddTool("MediaOut"), "MediaOut1")
    end

    -- The canvas is deliberately transparent. The builder places these clips
    -- on a dedicated video track above the edit; only the lower overlay renders.
    local root = set_tool_name(comp:AddTool("Background"), "Transparent Canvas")
    set_color(root, PALETTE.canvas)
    local chain = root

    local shadow = add_panel(comp, 0.5, 0.238, 0.95, 0.49, PALETTE.shadow, 0.035, "Overlay Shadow")
    local shadow_merge = add_merge(comp, chain, shadow, "Merge Overlay Shadow")
    if state == "question" then animate_blend(shadow_merge, 0, 7) end
    chain = shadow_merge

    local glass_border = add_panel(comp, 0.5, 0.245, 0.94, 0.48, PALETTE.glass_border, 0.035, "Overlay Border")
    local glass_border_merge = add_merge(comp, chain, glass_border, "Merge Overlay Border")
    if state == "question" then animate_blend(glass_border_merge, 0, 7) end
    chain = glass_border_merge

    local glass = add_panel(comp, 0.5, 0.245, 0.932, 0.469, PALETTE.glass, 0.035, "Overlay Glass")
    local glass_merge = add_merge(comp, chain, glass, "Merge Overlay Glass")
    if state == "question" then animate_blend(glass_merge, 0, 7) end
    chain = glass_merge

    local progress_track = add_panel(comp, 0.5, 0.483, 0.90, 0.006, PALETTE.option_border, 0.3, "Progress Track")
    chain = add_merge(comp, chain, progress_track, "Merge Progress Track")
    local progress_width = 0.90 * math.min(1, math.max(0.03, index / math.max(1, total)))
    local progress_fill = add_panel(comp, 0.05 + (progress_width / 2), 0.483, progress_width, 0.008, PALETTE.gold, 0.3, "Progress Fill")
    local progress_merge = add_merge(comp, chain, progress_fill, "Merge Progress Fill")
    if state == "question" then animate_blend(progress_merge, 0, 8) end
    chain = progress_merge

    local badge = add_panel(comp, 0.145, 0.447, 0.20, 0.050, PALETTE.accent, 0.30, "Question Badge")
    local badge_merge = add_merge(comp, chain, badge, "Merge Question Badge")
    if state == "question" then animate_blend(badge_merge, 0, 6) end
    chain = badge_merge

    local header = string.format("QUESTION %02d / %02d", index, total)
    local header_text = add_text(comp, header, 0.145, 0.447, 0.022, PALETTE.white, "Question Number", true)
    local header_merge = add_merge(comp, chain, header_text, "Merge Question Number")
    if state == "question" then animate_blend(header_merge, 0, 6) end
    chain = header_merge

    local type_label
    if state == "answer" then
        type_label = "ANSWER REVEAL"
    else
        type_label = question.type == "mcq" and "MULTIPLE CHOICE" or "BEST ESTIMATE"
    end
    local type_text = add_text(comp, type_label, 0.835, 0.447, 0.021, PALETTE.gold, "Question Type", true)
    local type_merge = add_merge(comp, chain, type_text, "Merge Question Type")
    if state == "question" then animate_blend(type_merge, 0, 6) end
    chain = type_merge

    local question_border = add_panel(comp, 0.5, 0.345, 0.88, 0.142, PALETTE.option_border, 0.075, "Question Border")
    local question_border_merge = add_merge(comp, chain, question_border, "Merge Question Border")
    if state == "question" then animate_blend(question_border_merge, 2, 10) end
    chain = question_border_merge

    local question_panel = add_panel(comp, 0.5, 0.345, 0.872, 0.132, PALETTE.panel, 0.075, "Question Panel")
    local question_panel_merge = add_merge(comp, chain, question_panel, "Merge Question Panel")
    if state == "question" then animate_blend(question_panel_merge, 2, 10) end
    chain = question_panel_merge

    local question_accent = add_panel(comp, 0.085, 0.345, 0.009, 0.090, PALETTE.accent, 0.35, "Question Accent")
    local question_accent_merge = add_merge(comp, chain, question_accent, "Merge Question Accent")
    if state == "question" then animate_blend(question_accent_merge, 4, 12) end
    chain = question_accent_merge

    local fitted_question, question_size = fit_wrapped_text(question.question, 52, 3, 0.041, 0.026)
    local question_text = add_text(comp, fitted_question, 0.5, 0.345, question_size, PALETTE.white, "Question Text", true)
    local question_text_merge = add_merge(comp, chain, question_text, "Merge Question Text")
    if state == "question" then animate_blend(question_text_merge, 4, 12) end
    chain = question_text_merge

    if question.type == "mcq" then
        local positions, option_width, option_height = overlay_option_layout(#question.options)
        local letters = { "A", "B", "C", "D" }

        for option_index, option in ipairs(question.options) do
            local position = positions[option_index]
            local x = position.x
            local y = position.y
            local reveal_start = 8 + ((option_index - 1) * 3)

            local border = add_panel(comp, x, y, option_width, option_height + 0.010, PALETTE.option_border, 0.16, "Option Border " .. option_index)
            local border_merge = add_merge(comp, chain, border, "Merge Option Border " .. option_index)
            if state == "question" then animate_blend(border_merge, reveal_start, reveal_start + 6) end
            chain = border_merge

            local panel = add_panel(comp, x, y, option_width - 0.008, option_height, PALETTE.option, 0.16, "Option " .. option_index)
            local panel_merge = add_merge(comp, chain, panel, "Merge Option " .. option_index)
            if state == "question" then animate_blend(panel_merge, reveal_start, reveal_start + 6) end
            chain = panel_merge

            local chip_x = x - (option_width / 2) + 0.045
            local chip = add_panel(comp, chip_x, y, 0.058, option_height * 0.66, PALETTE.panel_raised, 0.24, "Option Chip " .. option_index)
            local chip_merge = add_merge(comp, chain, chip, "Merge Option Chip " .. option_index)
            if state == "question" then animate_blend(chip_merge, reveal_start + 1, reveal_start + 7) end
            chain = chip_merge

            local letter = letters[option_index]
            local letter_text = add_text(comp, letter, chip_x, y, 0.025, PALETTE.gold, "Option Letter " .. option_index, true)
            local letter_merge = add_merge(comp, chain, letter_text, "Merge Option Letter " .. option_index)
            if state == "question" then animate_blend(letter_merge, reveal_start + 1, reveal_start + 7) end
            chain = letter_merge

            local fitted_option, option_size = fit_wrapped_text(option, 22, 2, 0.031, 0.020)
            local text_x = x + 0.018
            local option_text = add_text(comp, fitted_option, text_x, y, option_size, PALETTE.white, "Option Text " .. option_index, true)
            local option_text_merge = add_merge(comp, chain, option_text, "Merge Option Text " .. option_index)
            if state == "question" then animate_blend(option_text_merge, reveal_start + 1, reveal_start + 7) end
            chain = option_text_merge

            if state == "answer" then
                if option_index == question.correct_index then
                    local correct_border = add_panel(comp, x, y, option_width, option_height + 0.010, PALETTE.correct_border, 0.16, "Correct Border")
                    local correct_border_merge = add_merge(comp, chain, correct_border, "Reveal Correct Border")
                    animate_blend(correct_border_merge, 4, 12)
                    chain = correct_border_merge

                    local correct_panel = add_panel(comp, x, y, option_width - 0.008, option_height, PALETTE.correct, 0.16, "Correct Highlight")
                    local correct_panel_merge = add_merge(comp, chain, correct_panel, "Reveal Correct Highlight")
                    animate_blend(correct_panel_merge, 4, 12)
                    chain = correct_panel_merge

                    local correct_chip = add_panel(comp, chip_x, y, 0.058, option_height * 0.66, PALETTE.white, 0.24, "Correct Chip")
                    local correct_chip_merge = add_merge(comp, chain, correct_chip, "Reveal Correct Chip")
                    animate_blend(correct_chip_merge, 4, 12)
                    chain = correct_chip_merge

                    local correct_letter = add_text(comp, letter, chip_x, y, 0.025, PALETTE.correct, "Correct Letter", true)
                    local correct_letter_merge = add_merge(comp, chain, correct_letter, "Reveal Correct Letter")
                    animate_blend(correct_letter_merge, 4, 12)
                    chain = correct_letter_merge

                    local correct_text = add_text(comp, fitted_option, text_x, y, option_size, PALETTE.white, "Correct Option Text", true)
                    local correct_text_merge = add_merge(comp, chain, correct_text, "Reveal Correct Text")
                    animate_blend(correct_text_merge, 4, 12)
                    chain = correct_text_merge
                else
                    local dim_panel = add_panel(comp, x, y, option_width, option_height + 0.010, PALETTE.dim, 0.16, "Dim Wrong Option " .. option_index)
                    local dim_merge = add_merge(comp, chain, dim_panel, "Reveal Dim Wrong " .. option_index)
                    animate_blend(dim_merge, 4, 12)
                    chain = dim_merge
                end
            end
        end
    else
        local answer_color = state == "answer" and PALETTE.correct or PALETTE.option
        local answer_border_color = state == "answer" and PALETTE.correct_border or PALETTE.option_border
        local answer_border = add_panel(comp, 0.5, 0.155, 0.58, 0.135, answer_border_color, 0.12, "Estimate Border")
        local answer_border_merge = add_merge(comp, chain, answer_border, "Merge Estimate Border")
        animate_blend(answer_border_merge, state == "answer" and 4 or 8, state == "answer" and 12 or 16)
        chain = answer_border_merge

        local answer_panel = add_panel(comp, 0.5, 0.155, 0.568, 0.123, answer_color, 0.12, "Estimate Panel")
        local answer_panel_merge = add_merge(comp, chain, answer_panel, "Merge Estimate Panel")
        animate_blend(answer_panel_merge, state == "answer" and 4 or 8, state == "answer" and 12 or 16)
        chain = answer_panel_merge

        local answer_copy = state == "answer" and ("ANSWER  •  " .. question.answer) or "MAKE YOUR BEST ESTIMATE"
        local fitted_answer, answer_size = fit_wrapped_text(answer_copy, 24, 2, 0.040, 0.025)
        local answer_text = add_text(comp, fitted_answer, 0.5, 0.155, answer_size, PALETTE.white, "Estimate Answer", true)
        local answer_text_merge = add_merge(comp, chain, answer_text, "Merge Estimate Answer")
        animate_blend(answer_text_merge, state == "answer" and 4 or 8, state == "answer" and 12 or 16)
        chain = answer_text_merge
    end

    if state == "question" then
        local prompt = add_text(comp, "LOCK IN YOUR ANSWER", 0.5, 0.043, 0.019, PALETTE.muted, "Thinking Prompt", true)
        local prompt_merge = add_merge(comp, chain, prompt, "Merge Thinking Prompt")
        animate_blend(prompt_merge, 20, 28)
        chain = prompt_merge
    else
        local explanation = question.explanation ~= "" and question.explanation or ("Correct answer: " .. question.answer)
        local explanation_border = add_panel(comp, 0.5, 0.040, 0.88, 0.066, PALETTE.option_border, 0.14, "Explanation Border")
        local explanation_border_merge = add_merge(comp, chain, explanation_border, "Reveal Explanation Border")
        animate_blend(explanation_border_merge, 16, 24)
        chain = explanation_border_merge

        local explanation_panel = add_panel(comp, 0.5, 0.040, 0.872, 0.058, PALETTE.panel, 0.14, "Explanation Panel")
        local explanation_panel_merge = add_merge(comp, chain, explanation_panel, "Reveal Explanation Panel")
        animate_blend(explanation_panel_merge, 16, 24)
        chain = explanation_panel_merge

        local explanation_label = add_text(comp, "WHY IT'S RIGHT", 0.16, 0.040, 0.017, PALETTE.gold, "Explanation Label", true)
        local explanation_label_merge = add_merge(comp, chain, explanation_label, "Reveal Explanation Label")
        animate_blend(explanation_label_merge, 18, 26)
        chain = explanation_label_merge

        local fitted_explanation, explanation_size = fit_wrapped_text(explanation, 68, 2, 0.021, 0.014)
        local explanation_text = add_text(comp, fitted_explanation, 0.61, 0.040, explanation_size, PALETTE.white, "Explanation Text", false)
        local explanation_text_merge = add_merge(comp, chain, explanation_text, "Reveal Explanation Text")
        animate_blend(explanation_text_merge, 18, 26)
        chain = explanation_text_merge
    end

    media_out.Input = chain.Output
end

local function nominal_fps(timeline)
    local raw = tonumber(timeline:GetSetting("timelineFrameRate")) or 24
    if raw > 47 then return 60 end
    if raw > 27 then return 30 end
    if raw > 24 then return 25 end
    return 24
end

local function parse_timecode(timecode, fps)
    local hours, minutes, seconds, frames = tostring(timecode):match("^(%d+):(%d+):(%d+)[:;](%d+)$")
    if not hours then
        fail("Unsupported timeline timecode: " .. tostring(timecode))
    end
    return (((tonumber(hours) * 60 + tonumber(minutes)) * 60) + tonumber(seconds)) * fps + tonumber(frames)
end

local function frame_to_timecode(frame, timeline, fps)
    local start_frame = tonumber(timeline:GetStartFrame()) or 0
    local start_tc_frames = parse_timecode(timeline:GetStartTimecode(), fps)
    local total = start_tc_frames + (tonumber(frame) - start_frame)
    if total < 0 then total = 0 end
    local frames = total % fps
    local seconds_total = math.floor(total / fps)
    local seconds = seconds_total % 60
    local minutes_total = math.floor(seconds_total / 60)
    local minutes = minutes_total % 60
    local hours = math.floor(minutes_total / 60) % 24
    return string.format("%02d:%02d:%02d:%02d", hours, minutes, seconds, frames)
end

local TRANSPARENT_PNG_BASE64 =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="

local function decode_base64(data)
    local alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    data = data:gsub("[^" .. alphabet .. "=]", "")
    return (data:gsub(".", function(character)
        if character == "=" then return "" end
        local value = alphabet:find(character, 1, true) - 1
        local bits = ""
        for index = 6, 1, -1 do
            bits = bits .. ((value % (2 ^ index) - value % (2 ^ (index - 1)) > 0) and "1" or "0")
        end
        return bits
    end):gsub("%d%d%d?%d?%d?%d?%d?%d?", function(bits)
        if #bits ~= 8 then return "" end
        local value = 0
        for index = 1, 8 do
            if bits:sub(index, index) == "1" then value = value + (2 ^ (8 - index)) end
        end
        return string.char(value)
    end))
end

local function get_or_create_asset_folder(media_pool)
    local root = media_pool:GetRootFolder()
    if not root then fail("Could not access the Media Pool root") end
    for _, folder in ipairs(root:GetSubFolderList() or {}) do
        if folder:GetName() == "Quiz Builder Assets" then return folder end
    end
    return media_pool:AddSubFolder(root, "Quiz Builder Assets") or root
end

local function get_overlay_holder(project)
    local media_pool = project:GetMediaPool()
    if not media_pool then fail("Could not access the Media Pool") end

    local temp_root = os.getenv("TEMP") or os.getenv("TMP") or "."
    local png_path = temp_root .. package.config:sub(1, 1) .. "quiz-builder-transparent.png"
    local png = io.open(png_path, "wb")
    if not png then fail("Could not create the temporary transparent overlay asset") end
    png:write(decode_base64(TRANSPARENT_PNG_BASE64))
    png:close()

    local previous_folder = media_pool:GetCurrentFolder()
    local asset_folder = get_or_create_asset_folder(media_pool)
    media_pool:SetCurrentFolder(asset_folder)

    local media_item = nil
    for _, item in ipairs(asset_folder:GetClipList() or {}) do
        if item:GetName() == "quiz-builder-transparent.png" then
            media_item = item
            break
        end
    end
    if not media_item then
        local imported = media_pool:ImportMedia({ png_path })
        media_item = imported and imported[1]
    end

    if previous_folder then media_pool:SetCurrentFolder(previous_folder) end
    if not media_item then fail("Resolve could not import the transparent overlay asset") end
    return media_pool, media_item
end

local function timecode_to_timeline_frame(timecode, timeline, fps)
    local timeline_start = tonumber(timeline:GetStartFrame()) or 0
    local current_tc_frames = parse_timecode(timecode, fps)
    local start_tc_frames = parse_timecode(timeline:GetStartTimecode(), fps)
    return timeline_start + (current_tc_frames - start_tc_frames)
end

local function append_overlay_item(media_pool, media_item, timeline, track_index, record_frame, label, color)
    -- A transparent still is used only as a non-rippling timeline carrier.
    -- Its local Fusion composition supplies the actual transparent overlay.
    local appended = media_pool:AppendToTimeline({ {
        mediaPoolItem = media_item,
        startFrame = 0,
        endFrame = 143,
        mediaType = 1,
        trackIndex = track_index,
        recordFrame = record_frame,
    } })
    local item = appended and appended[1]
    if not item then fail("Could not place " .. label .. " on the dedicated overlay track") end

    item:SetName(label)
    item:SetClipColor(color)
    local comp = item:AddFusionComp()
    if not comp then fail("Could not add the Fusion composition for " .. label) end
    return item, comp
end

local function build_timeline(resolve, quiz)
    local project_manager = resolve:GetProjectManager()
    local project = project_manager and project_manager:GetCurrentProject()
    if not project then
        fail("Open a Resolve project first")
    end
    local timeline = project:GetCurrentTimeline()
    if not timeline then
        fail("Open or create a timeline first")
    end

    resolve:OpenPage("edit")
    CANVAS_WIDTH = tonumber(timeline:GetSetting("timelineResolutionWidth")) or 1920
    CANVAS_HEIGHT = tonumber(timeline:GetSetting("timelineResolutionHeight")) or 1080
    local fps = nominal_fps(timeline)
    local start_timecode = timeline:GetCurrentTimecode()
    if not start_timecode or start_timecode == "" then
        start_timecode = timeline:GetStartTimecode()
    end
    local created = 0
    local timeline_start = tonumber(timeline:GetStartFrame()) or 0
    local media_pool, media_item = get_overlay_holder(project)
    local overlay_track = timeline:GetTrackCount("video") + 1
    if not timeline:AddTrack("video") then fail("Could not create the dedicated quiz overlay track") end
    timeline:SetTrackName("video", overlay_track, "Quiz Overlays")
    local next_frame = timecode_to_timeline_frame(start_timecode, timeline, fps)

    for index, question in ipairs(quiz.questions) do
        local states = { "question", "answer" }
        for _, state in ipairs(states) do
            local label = string.format("Q%02d %s", index, state:upper())
            local item, comp = append_overlay_item(
                media_pool, media_item, timeline, overlay_track, next_frame, label,
                state == "question" and "Blue" or "Green"
            )
            comp:StartUndo("Build " .. label)
            build_visual(comp, question, index, #quiz.questions, state)
            comp:EndUndo(true)

            local marker_frame = (tonumber(item:GetStart()) or timeline_start) - timeline_start
            timeline:AddMarker(
                marker_frame,
                state == "question" and "Blue" or "Green",
                label,
                state == "question" and question.question or ("Answer: " .. question.answer),
                1,
                string.format("quiz-builder:%02d:%s", index, state)
            )

            created = created + 1
            next_frame = tonumber(item:GetEnd()) or next_frame
        end
    end

    local end_timecode = frame_to_timecode(next_frame, timeline, fps)
    timeline:SetCurrentTimecode(end_timecode)
    project_manager:SaveProject()
    return created, start_timecode, end_timecode
end

local resolve = Resolve()
if not resolve then
    fail("Could not connect to DaVinci Resolve")
end

local headless_json = os.getenv("QUIZ_BUILDER_JSON")
if headless_json and headless_json ~= "" then
    local limit = tonumber(os.getenv("QUIZ_BUILDER_LIMIT")) or 9999
    local quiz = load_quiz(headless_json, limit)
    local created, start_tc, end_tc = build_timeline(resolve, quiz)
    print(string.format("QUIZ_BUILDER_OK clips=%d questions=%d start=%s end=%s", created, #quiz.questions, start_tc, end_tc))
    return
end

local fusion = resolve:Fusion()
if not fusion then
    fail("Could not access Fusion")
end
local ui = fusion.UIManager
local dispatcher = bmd.UIDispatcher(ui)

local existing = ui:FindWindow(APP_ID)
if existing then
    existing:Show()
    existing:Raise()
    return
end

local header_font = ui:Font({ Family = "Arial", PointSize = 16, Bold = true })
local window = dispatcher:AddWindow(
    {
        ID = APP_ID,
        WindowTitle = APP_NAME .. " " .. VERSION,
        -- Extra vertical room keeps wrapped help text and the action buttons
        -- visible at Windows display scaling above 100%.
        Geometry = { 180, 180, 760, 620 },
    },
    ui:VGroup({ Spacing = 10, Margin = 16 }, {
        ui:Label({
            Text = "Build paired QUESTION and ANSWER clips from quiz JSON",
            Font = header_font,
            Weight = 0,
        }),
        ui:Label({
            Text = "Place the playhead where Q01 should begin. A dedicated Quiz Overlays track is created above your talking-head edit.",
            WordWrap = true,
            Weight = 0,
        }),
        ui:HGroup({ Weight = 0 }, {
            ui:LineEdit({
                ID = "JsonPath",
                PlaceholderText = "Choose a QuizDataset .json file",
                ClearButtonEnabled = true,
                Weight = 1,
            }),
            ui:Button({ ID = "Browse", Text = "Browse…", Weight = 0 }),
        }),
        ui:HGroup({ Weight = 0 }, {
            ui:Label({ Text = "Questions to build", Weight = 0 }),
            ui:SpinBox({ ID = "Limit", Minimum = 1, Maximum = 100, Value = 15, Weight = 0 }),
            ui:HGap(0, 1),
        }),
        ui:Label({
            Text = "Each transparent lower overlay becomes two adjacent clips. Trim QUESTION for thinking time and ANSWER for explanation time.",
            WordWrap = true,
            Weight = 0,
        }),
        ui:HGroup({ Weight = 0, MinimumSize = { 0, 44 }, Spacing = 8 }, {
            ui:HGap(0, 1),
            ui:Button({ ID = "Build", Text = "Build Timeline Clips", MinimumSize = { 170, 34 }, Weight = 0 }),
            ui:Button({ ID = "Close", Text = "Close", MinimumSize = { 110, 34 }, Weight = 0 }),
        }),
        ui:TextEdit({
            ID = "Status",
            ReadOnly = true,
            PlainText = "Ready.",
            Weight = 1,
        }),
    })
)

local items = window:GetItems()

local function set_status(message)
    items.Status.PlainText = tostring(message)
    items.Status:Repaint()
end

local function on_browse()
    local selected = fusion:RequestFile("", "", { FReqB_Filter = "JSON files (*.json)|*.json" })
    if selected then
        items.JsonPath.Text = tostring(selected)
        set_status("Selected " .. tostring(selected))
    end
end

local function on_build()
    local path = trim(items.JsonPath.Text)
    if path == "" then
        set_status("Choose a quiz JSON file first.")
        return
    end
    items.Build.Enabled = false
    set_status("Validating JSON…")
    local ok, result_or_error = pcall(function()
        local quiz = load_quiz(path, items.Limit.Value)
        set_status(string.format("Building %d questions / %d Fusion clips…", #quiz.questions, #quiz.questions * 2))
        local created, start_tc, end_tc = build_timeline(resolve, quiz)
        return string.format(
            "Done. Created %d clips for %d questions.\nTimeline range: %s to %s\n\nTrim blue QUESTION clips for thinking time and green ANSWER clips for explanation time.",
            created,
            #quiz.questions,
            start_tc,
            end_tc
        )
    end)
    items.Build.Enabled = true
    if ok then
        set_status(result_or_error)
    else
        set_status("Build stopped:\n" .. tostring(result_or_error))
    end
end

local function on_close()
    dispatcher:ExitLoop()
end

window.On.Browse.Clicked = on_browse
window.On.Build.Clicked = on_build
window.On.Close.Clicked = on_close
window.On[APP_ID].Close = on_close

window:Show()
dispatcher:RunLoop()
window:Hide()
