import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Download, Save } from 'lucide-react';
import { divisionMapFilename, divisionMapSvg, divisionTypeLabel, newDivisionMap, parseDivisionProject, validateDivisionCollection } from './subdivisionMap';
import type { DivisionCatalogEntry, DivisionCollection, DivisionMapProject } from './subdivisionMap';

type View = 'build' | 'import' | 'library';
const libraryKey = 'subdivision-map-library-v1';
const geometryCache = new Map<string, DivisionCollection>();
const errorText = (value: unknown) => value instanceof Error ? value.message : 'Something went wrong.';
const serif = { fontFamily: "Georgia, 'Times New Roman', serif" };

function download(content: BlobPart, name: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement('a');
  link.href = url; link.download = name; document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

async function getGeometry(country: string) {
  const cached = geometryCache.get(country);
  if (cached) return cached;
  const response = await fetch(new URL(`subdivision-maps/data/${country}.json`, document.baseURI));
  if (!response.ok) throw new Error(`Boundary data for ${country} could not be loaded.`);
  const data = validateDivisionCollection(await response.json());
  geometryCache.set(country, data);
  return data;
}

export default function SubdivisionMapStudio({ onExit }: { onExit: () => void }) {
  const [catalog, setCatalog] = useState<DivisionCatalogEntry[]>([]);
  const [project, setProject] = useState<DivisionMapProject>(() => ({ ...newDivisionMap('CZE', 'Czechia'), title: 'Czechia' }));
  const [geometryResult, setGeometryResult] = useState<{ country: string; data: DivisionCollection } | null>(null);
  const [view, setView] = useState<View>('build');
  const [library, setLibrary] = useState<DivisionMapProject[]>([]);
  const [raw, setRaw] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetch(new URL('subdivision-maps/catalog.json', document.baseURI)).then(async response => {
      if (!response.ok) throw new Error('Subdivision catalog could not be loaded.');
      const data = await response.json() as { countries?: DivisionCatalogEntry[] };
      if (!Array.isArray(data.countries)) throw new Error('Subdivision catalog is invalid.');
      setCatalog(data.countries);
      try {
        const stored: unknown = JSON.parse(localStorage.getItem(libraryKey) || '[]');
        if (Array.isArray(stored)) setLibrary(stored.flatMap(item => { try { return [parseDivisionProject(JSON.stringify(item), data.countries!, true)]; } catch { return []; } }));
      } catch { setError('Saved maps could not be read. You can still export maps.'); }
    }).catch(cause => setError(errorText(cause))).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!catalog.length) return;
    let active = true;
    setGeometryResult(null);
    void getGeometry(project.country).then(data => { if (active) setGeometryResult({ country: project.country, data }); }).catch(cause => { if (active) setError(errorText(cause)); });
    return () => { active = false; };
  }, [catalog.length, project.country]);

  const geometry = geometryResult?.country === project.country ? geometryResult.data : null;
  const entry = catalog.find(item => item.iso3 === project.country);
  const svg = useMemo(() => entry && geometry ? divisionMapSvg(project, entry, geometry) : '', [project, entry, geometry]);
  const fallbackNames = geometry?.features.filter(feature => feature.properties.nameSource === 'source') || [];
  const selectCountry = (iso3: string) => {
    const next = catalog.find(item => item.iso3 === iso3);
    if (!next) return;
    setProject({ ...newDivisionMap(next.iso3, next.country), title: next.country });
    setError(''); setNotice('');
  };
  const save = () => {
    try {
      const checked = parseDivisionProject(JSON.stringify(project), catalog, true);
      const next = [checked, ...library.filter(item => item.id !== checked.id)];
      localStorage.setItem(libraryKey, JSON.stringify(next));
      setLibrary(next); setNotice('Map saved in this browser.'); setError('');
    } catch (cause) { setError(errorText(cause)); }
  };
  const importProject = async () => {
    try {
      const imported = parseDivisionProject(raw, catalog);
      await getGeometry(imported.country);
      setProject(imported); setView('build'); setNotice('Map imported as a new draft.'); setError('');
    } catch (cause) { setError(errorText(cause)); }
  };
  const exportPng = async () => {
    try {
      const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
      try {
        const image = new Image();
        await new Promise<void>((resolve, reject) => { image.onload = () => resolve(); image.onerror = () => reject(new Error('Map image could not be rendered.')); image.src = url; });
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth; canvas.height = image.naturalHeight;
        const context = canvas.getContext('2d');
        if (!context) throw new Error('PNG export is unavailable.');
        context.drawImage(image, 0, 0);
        const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
        if (!blob) throw new Error('PNG export failed.');
        download(blob, `${divisionMapFilename(project.title)}-${project.showNames ? 'named' : 'blank'}.png`, 'image/png');
      } finally { URL.revokeObjectURL(url); }
    } catch (cause) { setError(errorText(cause)); }
  };

  const button = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50';
  const primary = `${button} border-[#51402a] bg-[#51402a] text-[#f5ebd6] hover:bg-[#382c1d]`;
  const secondary = `${button} border-[#ac9876] bg-[#f7f0df] text-[#453724] hover:bg-[#ede1c9]`;
  return <main className="min-h-screen bg-[#e8dfcc] px-3 py-5 text-[#332b20] sm:px-6 sm:py-8">
    <section className="mx-auto max-w-[1500px] border border-[#9d8968] bg-[#f5efdf] shadow-[0_18px_60px_#66563b40]">
      <header className="border-b border-[#b7a686] px-5 py-5 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div><p className="text-[11px] font-bold uppercase tracking-[.25em] text-[#796344]">YouTube Quiz Studio / Cartography</p><h1 className="mt-2 text-3xl font-bold text-[#352a1a] sm:text-4xl" style={serif}>Subdivision Atlas</h1><p className="mt-1 text-sm text-[#695942]">First-level regions, set on an old atlas page.</p></div>
          <button className={secondary} onClick={onExit}><ArrowLeft size={16} />Quiz modes</button>
        </div>
      </header>
      <nav className="flex gap-1 border-b border-[#c7b695] px-5 pt-3 sm:px-8" aria-label="Subdivision map sections">{(['build', 'import', 'library'] as const).map(item => <button key={item} className={`border-b-[3px] px-4 py-2 text-sm font-bold ${view === item ? 'border-[#624b2e] text-[#372a19]' : 'border-transparent text-[#78684e] hover:text-[#372a19]'}`} onClick={() => { setView(item); setError(''); setNotice(''); }}>{item === 'build' ? 'Create map' : item === 'import' ? 'Import' : 'Library'}</button>)}</nav>
      <div className="p-4 sm:p-7">
        {error && <p role="alert" className="mb-4 border border-[#a55b4f] bg-[#f8eae2] p-3 text-sm text-[#713b34]">{error}</p>}
        {notice && <p role="status" className="mb-4 border border-[#779070] bg-[#ebf0e4] p-3 text-sm text-[#40543a]">{notice}</p>}
        {loading ? <p role="status" className="py-12 text-center">Loading offline maps…</p> : view === 'build' ? <div className="grid gap-6 lg:grid-cols-[285px_minmax(0,1fr)]">
          <aside className="space-y-6">
            <div><span className="text-[11px] font-bold uppercase tracking-[.2em] text-[#8a7553]">01 / Place</span><label className="mt-2 block text-sm font-bold">Country<select aria-label="Country" className="mt-2 w-full rounded-md border border-[#ad9a77] bg-[#fffcf2] px-3 py-3 text-sm" value={project.country} onChange={event => selectCountry(event.target.value)}>{catalog.map(item => <option key={item.iso3} value={item.iso3}>{item.country}</option>)}</select></label><p className="mt-2 text-xs text-[#79694e]">{entry ? `${entry.count} ${divisionTypeLabel(entry)}` : ''} · Boundaries included offline</p></div>
            <div><span className="text-[11px] font-bold uppercase tracking-[.2em] text-[#8a7553]">02 / Caption</span><label className="mt-2 block text-sm font-bold">Map title<input aria-label="Map title" className="mt-2 w-full rounded-md border border-[#ad9a77] bg-[#fffcf2] px-3 py-3 text-sm" value={project.title} maxLength={120} onChange={event => setProject({ ...project, title: event.target.value })} /></label></div>
            <fieldset><legend className="text-[11px] font-bold uppercase tracking-[.2em] text-[#8a7553]">03 / Labels</legend><div className="mt-3 grid gap-2">
              <button type="button" aria-pressed={project.showNames} className={`border p-4 text-left ${project.showNames ? 'border-[#6d5432] bg-[#e7d6b2] shadow-[inset_4px_0_#6d5432]' : 'border-[#c5b493] bg-[#f7f0df] hover:bg-[#eee2c8]'}`} onClick={() => setProject({ ...project, showNames: true })}><strong className="block text-base" style={serif}>Names</strong><span className="mt-1 block text-xs text-[#66563e]">English region names on the map</span></button>
              <button type="button" aria-pressed={!project.showNames} className={`border p-4 text-left ${!project.showNames ? 'border-[#6d5432] bg-[#e7d6b2] shadow-[inset_4px_0_#6d5432]' : 'border-[#c5b493] bg-[#f7f0df] hover:bg-[#eee2c8]'}`} onClick={() => setProject({ ...project, showNames: false })}><strong className="block text-base" style={serif}>Blank</strong><span className="mt-1 block text-xs text-[#66563e]">Just the region outlines</span></button>
            </div></fieldset>
            {fallbackNames.length > 0 && <details className="border-t border-[#d0c1a5] pt-4 text-xs text-[#66563e]"><summary className="cursor-pointer font-bold">Name review · {fallbackNames.length} local spellings</summary><p className="mt-2">These labels use the source spelling where an English name was not matched:</p><p className="mt-1 leading-relaxed">{fallbackNames.map(item => item.properties.nameEn).join(' · ')}</p></details>}
          </aside>
          <section className="min-w-0">
            <div className="border border-[#b9a47e] bg-[#e9dfc9] p-2 shadow-[0_8px_20px_#69583d30]">{svg ? <div dangerouslySetInnerHTML={{ __html: svg }} /> : <p role="status" className="py-36 text-center text-sm">Loading {entry?.country || 'map'}…</p>}</div>
            <div className="mt-4 flex flex-wrap gap-2"><button className={primary} disabled={!svg} onClick={() => download(svg, `${divisionMapFilename(project.title)}-${project.showNames ? 'named' : 'blank'}.svg`, 'image/svg+xml;charset=utf-8')}><Download size={16} />Download SVG</button><button className={primary} disabled={!svg} onClick={() => void exportPng()}><Download size={16} />Download PNG</button><button className={secondary} disabled={!svg} onClick={save}><Save size={16} />Save draft</button><button className={secondary} onClick={() => download(JSON.stringify(project, null, 2), `${divisionMapFilename(project.title)}.json`, 'application/json')}><Download size={16} />Project JSON</button></div>
            <p className="mt-3 text-xs text-[#79694e]">Boundary data: geoBoundaries gbOpen ADM1 · {entry?.sourceLicense || 'open source'}.</p>
          </section>
        </div> : view === 'import' ? <section className="mx-auto max-w-3xl space-y-4"><h2 className="text-2xl font-bold" style={serif}>Import a map</h2><p className="text-sm text-[#695942]">Paste subdivision-map/v1 JSON exported from this studio.</p><textarea aria-label="Subdivision map project JSON" className="h-80 w-full border border-[#aa9672] bg-[#fffcf2] p-4 font-mono text-xs" value={raw} onChange={event => setRaw(event.target.value)} placeholder="Paste project JSON" /><button className={primary} disabled={!raw.trim()} onClick={() => void importProject()}>Import map</button></section>
        : <section className="mx-auto max-w-4xl"><h2 className="text-2xl font-bold" style={serif}>Saved maps</h2><p className="mt-2 text-sm text-[#695942]">Drafts stay in this browser. Download project JSON to move one elsewhere.</p>{library.length ? <div className="mt-5 grid gap-3 sm:grid-cols-2">{library.map(item => <button key={item.id} className="border border-[#bbaa89] bg-[#f7f0df] p-5 text-left hover:bg-[#ece0c4]" onClick={() => { setProject(item); setView('build'); }}><span className="text-[11px] font-bold uppercase tracking-widest text-[#796344]">{catalog.find(entry => entry.iso3 === item.country)?.country} · {item.showNames ? 'Named' : 'Blank'}</span><span className="mt-2 block text-xl font-bold" style={serif}>{item.title}</span></button>)}</div> : <p className="mt-5 border border-[#c7b695] p-5 text-sm">No saved maps yet.</p>}</section>}
      </div>
    </section>
  </main>;
}
