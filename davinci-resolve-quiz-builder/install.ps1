[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$source = Join-Path $PSScriptRoot 'Quiz Timeline Builder.lua'
$scriptsRoot = Join-Path $env:APPDATA 'Blackmagic Design\DaVinci Resolve\Support\Fusion\Scripts\Utility'
$destination = Join-Path $scriptsRoot 'Quiz Timeline Builder.lua'

if (-not (Test-Path -LiteralPath $source)) {
    throw "Missing source script: $source"
}

New-Item -ItemType Directory -Path $scriptsRoot -Force | Out-Null
Copy-Item -LiteralPath $source -Destination $destination -Force

Write-Host "Installed Quiz Timeline Builder to:"
Write-Host $destination
Write-Host ''
Write-Host 'Restart DaVinci Resolve, then open:'
Write-Host 'Workspace > Scripts > Quiz Timeline Builder'
