import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Download, MapPinned, Palette, Save } from 'lucide-react';
import { buildMapShapes, mapProjectSvg } from './mapGeometry';
import { defaultMapProject, generateMapPrompt, loadMapLibrary, mapRegions, nextHighlightColor, parseMapProject, saveMapProject } from './mapStudio';
import type { MapCountry, MapProject, MapRegion } from './mapStudio';

type View = 'builder' | 'prompt' | 'import' | 'library';
const filename = (title: string) => title.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'country-map';
const message = (error: unknown) => error instanceof Error ? error.message : 'Something went wrong.';
function download(content: BlobPart, name: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement('a'); link.href = url; link.download = name; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function MapQuizStudio({ onExit }: { onExit: () => void }) {
  const [view, setView] = useState<View>('builder');
  const [countries, setCountries] = useState<MapCountry[]>([]);
  const [project, setProject] = useState<MapProject>(defaultMapProject);
  const [library, setLibrary] = useState<MapProject[]>([]);
  const [search, setSearch] = useState('');
  const [raw, setRaw] = useState('');
  const [topic, setTopic] = useState('Countries that are members of the European Union');
  const [maximum, setMaximum] = useState(12);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    void fetch(new URL('flag-card-studio/data/countries.json', document.baseURI)).then(response => {
      if (!response.ok) throw new Error('Country data could not be loaded.');
      return response.json();
    }).then((data: { countries?: MapCountry[] }) => {
      const valid = (data.countries || []).filter(item => item.iso2 && item.ccn3 && item.name && item.continent);
      setCountries(valid);
      try { setLibrary(loadMapLibrary(valid)); } catch { setError('Saved map projects could not be read. You can still create and export maps.'); }
    }).catch(err => setError(message(err))).finally(() => setLoading(false));
  }, []);
  const regionCountries = useMemo(() => countries.filter(country => project.region === 'World' || country.continent === project.region), [countries, project.region]);
  const filteredCountries = useMemo(() => regionCountries.filter(country => country.name.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())), [regionCountries, search]);
  const highlightMap = useMemo(() => new Map(project.highlights.map(item => [item.country, item])), [project.highlights]);
  const shapes = useMemo(() => buildMapShapes(countries, project), [countries, project]);
  const svg = useMemo(() => countries.length ? mapProjectSvg(project, countries) : '', [countries, project]);
  const prompt = useMemo(() => {
    if (!countries.length || !topic.trim() || !project.title.trim()) return '';
    try { return generateMapPrompt(topic, project.title, project.region, countries, maximum); } catch { return ''; }
  }, [countries, maximum, project.region, project.title, topic]);
  const navigate = (next: View) => { setNotice(''); setError(''); setView(next); };
  const changeRegion = (region: MapRegion) => {
    const valid = new Set(countries.filter(country => region === 'World' || country.continent === region).map(country => country.iso2));
    setProject(previous => ({ ...previous, region, highlights: previous.highlights.filter(item => valid.has(item.country)) }));
    setSearch('');
  };
  const toggleCountry = (country: MapCountry) => setProject(previous => {
    const selected = previous.highlights.some(item => item.country === country.iso2);
    return { ...previous, highlights: selected ? previous.highlights.filter(item => item.country !== country.iso2) : [...previous.highlights, { country: country.iso2, color: nextHighlightColor(previous.highlights), label: country.name }] };
  });
  const updateHighlight = (iso2: string, changes: Partial<MapProject['highlights'][number]>) => setProject(previous => ({ ...previous, highlights: previous.highlights.map(item => item.country === iso2 ? { ...item, ...changes } : item) }));
  const selectAllVisible = () => setProject(previous => {
    const existing = new Map(previous.highlights.map(item => [item.country, item]));
    for (const country of filteredCountries) if (!existing.has(country.iso2)) {
      const current = [...existing.values()];
      existing.set(country.iso2, { country: country.iso2, color: nextHighlightColor(current), label: country.name });
    }
    return { ...previous, highlights: [...existing.values()].slice(0, 80) };
  });
  const save = () => { try { setLibrary(saveMapProject(project, countries)); setNotice('Map project saved in this browser.'); } catch (err) { setError(message(err)); } };
  const importProject = () => { try { const imported = parseMapProject(raw, countries); setProject(imported); navigate('builder'); setNotice('Map imported as a new draft.'); } catch (err) { setError(message(err)); } };
  const exportSvg = () => download(svg, `${filename(project.title)}.svg`, 'image/svg+xml;charset=utf-8');
  const exportPng = async () => {
    try {
      const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
      const image = new Image();
      await new Promise<void>((resolve, reject) => { image.onload = () => resolve(); image.onerror = () => reject(new Error('The PNG preview could not be rendered.')); image.src = url; });
      const canvas = document.createElement('canvas'); canvas.width = 1800; canvas.height = 1140;
      const context = canvas.getContext('2d'); if (!context) throw new Error('Canvas export is unavailable.');
      context.drawImage(image, 0, 0, canvas.width, canvas.height); URL.revokeObjectURL(url);
      const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error('PNG export failed.');
      download(blob, `${filename(project.title)}.png`, 'image/png');
    } catch (err) { setError(message(err)); }
  };

  return <main className="min-h-screen bg-[#edf3f1] px-4 py-6 text-slate-900 sm:py-10">
    <section className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-teal-200 bg-white shadow-xl">
      <header className="border-t-[6px] border-teal-700 bg-teal-50 p-5 sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-widest text-teal-700">YouTube Quiz Studio</p><h1 className="mt-2 flex items-center gap-3 text-2xl font-black sm:text-3xl"><MapPinned aria-hidden="true" />Map Quiz Studio</h1></div><button className="studio-button studio-button-secondary" onClick={onExit}><ArrowLeft size={16} />Quiz modes</button></div><p className="mt-3 text-sm text-slate-600">Create continent maps and highlight countries with permanent individual colours. Build directly or import a researched Gemini selection.</p></header>
      <nav className="flex flex-wrap gap-2 border-b border-teal-100 px-5 py-4 sm:px-8" aria-label="Map studio sections"><Tab active={view === 'builder'} onClick={() => navigate('builder')}>Build map</Tab><Tab active={view === 'prompt'} onClick={() => navigate('prompt')}>Get Gemini prompt</Tab><Tab active={view === 'import'} onClick={() => navigate('import')}>Import</Tab><Tab active={view === 'library'} onClick={() => navigate('library')}>Library</Tab></nav>
      <div className="p-5 sm:p-8">{error && <p role="alert" className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">{error}</p>}{notice && <p role="status" className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">{notice}</p>}
        {loading ? <p role="status" className="py-12 text-center">Loading offline map geometry…</p> : view === 'builder' ? <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
          <aside className="space-y-5"><div className="grid gap-4"><label className="text-sm font-bold">Map title<input className="studio-input mt-1" value={project.title} onChange={event => setProject({ ...project, title: event.target.value })} /></label><label className="text-sm font-bold">Map view<select className="studio-input mt-1" value={project.region} onChange={event => changeRegion(event.target.value as MapRegion)}>{mapRegions.map(region => <option key={region}>{region}</option>)}</select></label></div>
            <fieldset className="rounded-2xl border border-teal-100 bg-teal-50 p-4"><legend className="px-1 text-sm font-black"><Palette className="mr-1 inline h-4 w-4" />Map colours</legend><div className="grid grid-cols-3 gap-3"><Color label="Water" value={project.backgroundColor} onChange={backgroundColor => setProject({ ...project, backgroundColor })} /><Color label="Land" value={project.landColor} onChange={landColor => setProject({ ...project, landColor })} /><Color label="Borders" value={project.borderColor} onChange={borderColor => setProject({ ...project, borderColor })} /></div><label className="mt-4 flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={project.showLabels} onChange={event => setProject({ ...project, showLabels: event.target.checked })} />Show labels on highlighted countries</label></fieldset>
            <section><div className="flex items-end justify-between gap-2"><label className="flex-1 text-sm font-bold">Countries<input className="studio-input mt-1" type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder={`Search ${project.region}`} /></label><button className="studio-button studio-button-secondary" onClick={selectAllVisible}>Select shown</button></div><p className="mt-2 text-xs text-slate-500">{project.highlights.length} highlighted · {regionCountries.length} countries in this view · {shapes.length} mapped shapes</p><div className="mt-3 max-h-[560px] space-y-2 overflow-y-auto pr-1">{filteredCountries.map(country => { const item = highlightMap.get(country.iso2); return <div key={country.iso2} className={`rounded-xl border p-3 ${item ? 'border-teal-300 bg-teal-50' : 'border-slate-200'}`}><label className="flex items-center gap-3 font-bold"><input type="checkbox" checked={!!item} onChange={() => toggleCountry(country)} /><span className="flex-1">{country.name}</span>{item && <input aria-label={`${country.name} highlight colour`} type="color" value={item.color} onChange={event => updateHighlight(country.iso2, { color: event.target.value })} />}</label>{item && project.showLabels && <input aria-label={`${country.name} map label`} className="studio-input mt-2" value={item.label} onChange={event => updateHighlight(country.iso2, { label: event.target.value })} />}</div>; })}</div></section>
          </aside>
          <section><div className="overflow-hidden rounded-3xl border border-teal-200 bg-slate-50 shadow-inner" dangerouslySetInnerHTML={{ __html: svg }} /><div className="mt-4 flex flex-wrap gap-2"><button className="studio-button studio-button-primary" onClick={exportSvg}><Download size={16} />Download SVG</button><button className="studio-button studio-button-primary" onClick={() => void exportPng()}><Download size={16} />Download PNG</button><button className="studio-button studio-button-secondary" onClick={() => download(JSON.stringify(project, null, 2), `${filename(project.title)}.json`, 'application/json')}><Download size={16} />Project JSON</button><button className="studio-button studio-button-secondary" onClick={save}><Save size={16} />Save draft</button></div></section>
        </div> : view === 'prompt' ? <div className="space-y-5"><div><h2 className="text-2xl font-black">Create a researched map prompt</h2><p className="mt-2 text-sm text-slate-600">Gemini chooses and verifies countries for your topic, then returns JSON that this studio maps and validates.</p></div><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-bold">Map title<input className="studio-input mt-1" value={project.title} onChange={event => setProject({ ...project, title: event.target.value })} /></label><label className="text-sm font-bold">Region<select className="studio-input mt-1" value={project.region} onChange={event => changeRegion(event.target.value as MapRegion)}>{mapRegions.map(region => <option key={region}>{region}</option>)}</select></label><label className="text-sm font-bold sm:col-span-2">Research topic<textarea className="studio-input mt-1 h-24" value={topic} onChange={event => setTopic(event.target.value)} /></label><label className="text-sm font-bold">Maximum highlighted countries<input className="studio-input mt-1" type="number" min={1} max={30} value={maximum} onChange={event => setMaximum(Math.min(30, Math.max(1, Math.round(Number(event.target.value) || 1))))} /></label></div><details className="rounded-xl border border-teal-200 p-4"><summary className="cursor-pointer font-bold">Preview generated Markdown</summary><textarea aria-label="Generated map prompt" className="mt-3 h-72 w-full rounded-lg bg-slate-950 p-3 font-mono text-xs text-white" readOnly value={prompt || 'Enter a title and research topic.'} /></details><div className="flex flex-wrap gap-2"><button className="studio-button studio-button-primary" disabled={!prompt} onClick={() => download(prompt, `${filename(project.title)}-map-prompt.md`, 'text/markdown;charset=utf-8')}><Download size={16} />Download prompt</button><button className="studio-button studio-button-secondary" disabled={!prompt} onClick={async () => { try { await navigator.clipboard.writeText(prompt); setNotice('Map prompt copied.'); } catch { setError('Copy was blocked. Download the prompt instead.'); } }}>Copy prompt</button><button className="studio-button studio-button-secondary" onClick={() => navigate('import')}>Import response</button></div></div>
        : view === 'import' ? <div className="space-y-4"><h2 className="text-2xl font-black">Import a country-highlight map</h2><p className="text-sm text-slate-600">Paste plain or fenced map-highlight/v1 JSON. The importer rejects unknown countries, continent mismatches, duplicates and invalid colours.</p><textarea aria-label="Map project JSON" className="h-80 w-full rounded-xl bg-slate-950 p-4 font-mono text-xs text-white" value={raw} onChange={event => setRaw(event.target.value)} placeholder="Paste map-highlight/v1 JSON here" /><button className="studio-button studio-button-primary" disabled={!raw.trim()} onClick={importProject}>Import & open map</button></div>
        : <section><h2 className="text-2xl font-black">Map library</h2><p className="mt-2 text-sm text-slate-600">Saved maps stay in this browser. Export JSON to move them to another device.</p>{library.length ? <div className="mt-5 grid gap-3 sm:grid-cols-2">{library.map(item => <button key={item.id} onClick={() => { setProject(item); navigate('builder'); }} className="rounded-2xl border-2 border-teal-200 bg-teal-50 p-5 text-left hover:border-teal-700"><span className="text-xs font-black uppercase text-teal-700">{item.region} · {item.highlights.length} highlighted</span><span className="mt-2 block text-xl font-black">{item.title}</span></button>)}</div> : <p className="mt-5 rounded-xl bg-slate-50 p-5 text-sm text-slate-600">No saved maps yet.</p>}</section>}
      </div>
    </section>
  </main>;
}

function Tab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) { return <button onClick={onClick} className={`rounded-full px-4 py-2 text-sm font-black ${active ? 'bg-teal-700 text-white' : 'bg-teal-50 text-teal-800 hover:bg-teal-100'}`}>{children}</button>; }
function Color({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="text-xs font-bold">{label}<input aria-label={`${label} colour`} className="mt-1 h-10 w-full cursor-pointer rounded-lg border border-teal-200 bg-white p-1" type="color" value={value} onChange={event => onChange(event.target.value)} /></label>; }
