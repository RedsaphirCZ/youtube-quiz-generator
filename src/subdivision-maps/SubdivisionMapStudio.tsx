import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Download, Save } from 'lucide-react';
import { divisionDisplayName, divisionMapFilename, divisionMapSvg, divisionTypeLabel, newDivisionMap, parseDivisionProject, validateDivisionCollection } from './subdivisionMap';
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
  const [nameSearch, setNameSearch] = useState('');
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
  const filteredNames = geometry?.features.filter(feature => (feature.properties.nameEn || feature.properties.name).toLocaleLowerCase().includes(nameSearch.toLocaleLowerCase())) || [];
  const editName = (id: string, value: string) => {
    const labelOverrides = { ...project.labelOverrides };
    if (value.trim()) labelOverrides[id] = value;
    else delete labelOverrides[id];
    setProject({ ...project, labelOverrides });
  };
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
      const importedGeometry = await getGeometry(imported.country);
      const validIds = new Set(importedGeometry.features.map(feature => feature.properties.id));
      if (Object.keys(imported.labelOverrides).some(id => !validIds.has(id))) throw new Error('An edited name refers to an unknown division.');
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
  const primary = `${button} border-[#171717] bg-[#171717] text-[#ffffff] hover:bg-[#111111]`;
  const secondary = `${button} border-[#aaaaaa] bg-[#fafafa] text-[#222222] hover:bg-[#eeeeee]`;
  return <main className="min-h-screen bg-[#f2f2f2] px-3 py-5 text-[#171717] sm:px-6 sm:py-8">
    <section className="mx-auto max-w-[1500px] border border-[#cccccc] bg-[#ffffff] shadow-[0_18px_60px_#00000040]">
      <header className="border-b border-[#d0d0d0] px-5 py-5 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="text-3xl font-bold text-[#111111] sm:text-4xl" style={serif}>Subdivision Atlas</h1>
          <button className={secondary} onClick={onExit}><ArrowLeft size={16} />Quiz modes</button>
        </div>
      </header>
      <nav className="flex gap-1 border-b border-[#dddddd] px-5 pt-3 sm:px-8" aria-label="Subdivision map sections">{(['build', 'import', 'library'] as const).map(item => <button key={item} className={`border-b-[3px] px-4 py-2 text-sm font-bold ${view === item ? 'border-[#222222] text-[#111111]' : 'border-transparent text-[#666666] hover:text-[#111111]'}`} onClick={() => { setView(item); setError(''); setNotice(''); }}>{item === 'build' ? 'Create map' : item === 'import' ? 'Import' : 'Library'}</button>)}</nav>
      <div className="p-4 sm:p-7">
        {error && <p role="alert" className="mb-4 border border-[#777777] bg-[#f5f5f5] p-3 text-sm text-[#333333]">{error}</p>}
        {notice && <p role="status" className="mb-4 border border-[#777777] bg-[#f4f4f4] p-3 text-sm text-[#333333]">{notice}</p>}
        {loading ? <p role="status" className="py-12 text-center">Loading offline maps…</p> : view === 'build' ? <div className="grid gap-6 lg:grid-cols-[285px_minmax(0,1fr)]">
          <aside className="space-y-6">
            <div><label className="block text-sm font-bold">Country<select aria-label="Country" className="mt-2 w-full rounded-md border border-[#bbbbbb] bg-[#ffffff] px-3 py-3 text-sm" value={project.country} onChange={event => selectCountry(event.target.value)}>{catalog.map(item => <option key={item.iso3} value={item.iso3}>{item.country}</option>)}</select></label><p className="mt-2 text-xs text-[#666666]">{entry ? `${entry.count} ${divisionTypeLabel(entry)}` : ''} · Available offline</p></div>
            <div><label className="block text-sm font-bold">File name<input aria-label="File name" className="mt-2 w-full rounded-md border border-[#bbbbbb] bg-[#ffffff] px-3 py-3 text-sm" value={project.title} maxLength={120} onChange={event => setProject({ ...project, title: event.target.value })} /></label></div>
            <fieldset><legend className="text-[11px] font-bold uppercase tracking-[.2em] text-[#777777]">Labels</legend><div className="mt-3 grid gap-2">
              <button type="button" aria-pressed={project.showNames} className={`border p-4 text-left ${project.showNames ? 'border-[#222222] bg-[#e7e7e7] shadow-[inset_4px_0_#222222]' : 'border-[#cccccc] bg-[#fafafa] hover:bg-[#f1f1f1]'}`} onClick={() => setProject({ ...project, showNames: true })}><strong className="block text-base" style={serif}>Names</strong><span className="mt-1 block text-xs text-[#555555]">English region names on the map</span></button>
              <button type="button" aria-pressed={!project.showNames} className={`border p-4 text-left ${!project.showNames ? 'border-[#222222] bg-[#e7e7e7] shadow-[inset_4px_0_#222222]' : 'border-[#cccccc] bg-[#fafafa] hover:bg-[#f1f1f1]'}`} onClick={() => setProject({ ...project, showNames: false })}><strong className="block text-base" style={serif}>Blank</strong><span className="mt-1 block text-xs text-[#555555]">Just the region outlines</span></button>
            </div></fieldset>
            <details className="border-t border-[#dddddd] pt-4 text-xs text-[#555555]">
              <summary className="cursor-pointer font-bold">Edit map names</summary>
              <p className="mt-2">Map labels can be shortened or corrected. Leave an edit empty to use the default.</p>
              {fallbackNames.length > 0 && <p className="mt-2">{fallbackNames.length} names use their source spelling because no English match was found.</p>}
              <input aria-label="Find a region name" placeholder="Find a region" className="mt-3 w-full rounded border border-[#bbbbbb] bg-white px-2 py-2 text-sm" value={nameSearch} onChange={event => setNameSearch(event.target.value)} />
              <div className="mt-2 max-h-80 space-y-3 overflow-y-auto pr-1">{filteredNames.map(feature => {
                const original = feature.properties.nameEn || feature.properties.name;
                const displayed = divisionDisplayName(feature, project.country, project.labelOverrides);
                return <label key={feature.properties.id} className="block border-b border-[#dddddd] pb-3">
                  <span className="block font-bold text-[#171717]">{original}</span>
                  <input aria-label={`Map name for ${original}`} className="mt-1 w-full rounded border border-[#bbbbbb] bg-white px-2 py-2 text-sm" maxLength={80} value={project.labelOverrides[feature.properties.id] || ''} placeholder={displayed} onChange={event => editName(feature.properties.id, event.target.value)} />
                </label>;
              })}</div>
            </details>
          </aside>
          <section className="min-w-0">
            <div className="border border-[#cccccc] bg-[#f5f5f5] p-2 shadow-[0_8px_20px_#00000030]">{svg ? <div dangerouslySetInnerHTML={{ __html: svg }} /> : <p role="status" className="py-36 text-center text-sm">Loading {entry?.country || 'map'}…</p>}</div>
            <div className="mt-4 flex flex-wrap gap-2"><button className={primary} disabled={!svg} onClick={() => download(svg, `${divisionMapFilename(project.title)}-${project.showNames ? 'named' : 'blank'}.svg`, 'image/svg+xml;charset=utf-8')}><Download size={16} />Download SVG</button><button className={primary} disabled={!svg} onClick={() => void exportPng()}><Download size={16} />Download PNG</button><button className={secondary} disabled={!svg} onClick={save}><Save size={16} />Save draft</button><button className={secondary} onClick={() => download(JSON.stringify(project, null, 2), `${divisionMapFilename(project.title)}.json`, 'application/json')}><Download size={16} />Project JSON</button></div>
            <details className="mt-3 text-xs text-[#555555]"><summary className="cursor-pointer font-bold">Data sources</summary><p className="mt-2">Boundaries: geoBoundaries gbOpen ADM1; original source: {entry?.source || 'unknown'} ({entry?.year || 'year unspecified'}), {entry?.sourceLicense || 'license unspecified'}.</p><p className="mt-1">English names: Natural Earth and Unicode CLDR where matched, plus selected corrections. Unmatched names retain the geoBoundaries spelling.</p></details>
          </section>
        </div> : view === 'import' ? <section className="mx-auto max-w-3xl space-y-4"><h2 className="text-2xl font-bold" style={serif}>Import a map</h2><p className="text-sm text-[#555555]">Paste subdivision-map/v1 JSON exported from this studio.</p><textarea aria-label="Subdivision map project JSON" className="h-80 w-full border border-[#cccccc] bg-[#ffffff] p-4 font-mono text-xs" value={raw} onChange={event => setRaw(event.target.value)} placeholder="Paste project JSON" /><button className={primary} disabled={!raw.trim()} onClick={() => void importProject()}>Import map</button></section>
        : <section className="mx-auto max-w-4xl"><h2 className="text-2xl font-bold" style={serif}>Saved maps</h2><p className="mt-2 text-sm text-[#555555]">Drafts stay in this browser. Download project JSON to move one elsewhere.</p>{library.length ? <div className="mt-5 grid gap-3 sm:grid-cols-2">{library.map(item => <button key={item.id} className="border border-[#cccccc] bg-[#fafafa] p-5 text-left hover:bg-[#eeeeee]" onClick={() => { setProject(item); setView('build'); }}><span className="text-[11px] font-bold uppercase tracking-widest text-[#555555]">{catalog.find(entry => entry.iso3 === item.country)?.country} · {item.showNames ? 'Named' : 'Blank'}</span><span className="mt-2 block text-xl font-bold" style={serif}>{item.title}</span></button>)}</div> : <p className="mt-5 border border-[#dddddd] p-5 text-sm">No saved maps yet.</p>}</section>}
      </div>
    </section>
  </main>;
}
