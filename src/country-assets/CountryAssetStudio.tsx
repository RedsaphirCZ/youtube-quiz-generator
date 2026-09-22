import { useEffect, useMemo, useState } from 'react';
import { Archive, ArrowLeft, Check, Database, Download, FileJson, Flag, Globe2, Image as ImageIcon, Map as MapIcon, Search } from 'lucide-react';
import { assetsForCountry, CountryAssetRecord, downloadCountryAsset, downloadCountryBundle, loadCountryAssetCatalog, publicAssetUrl } from './countryAssets';

type Props = { onExit: () => void };

const numberFormatter = new Intl.NumberFormat();

export default function CountryAssetStudio({ onExit }: Props) {
  const [countries, setCountries] = useState<CountryAssetRecord[]>([]);
  const [source, setSource] = useState('');
  const [snapshotDate, setSnapshotDate] = useState('');
  const [selectedCode, setSelectedCode] = useState('jp');
  const [query, setQuery] = useState('');
  const [continent, setContinent] = useState('All');
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadCountryAssetCatalog().then(catalog => {
      setCountries(catalog.countries);
      setSource(catalog.source);
      setSnapshotDate(catalog.sourceFetchedAt);
    }).catch(reason => setError(reason instanceof Error ? reason.message : 'Country catalog could not be loaded.'));
  }, []);

  const selected = countries.find(country => country.iso2 === selectedCode) ?? countries[0];
  const continents = useMemo(() => ['All', ...Array.from(new Set(countries.map(country => country.continent))).sort()], [countries]);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return countries.filter(country => (continent === 'All' || country.continent === continent) && (!normalized || [country.name, country.iso2, country.iso3, ...country.aliases].some(value => value.toLowerCase().includes(normalized))));
  }, [countries, query, continent]);
  const countryByIso3 = useMemo(() => new Map(countries.map(country => [country.iso3, country.name])), [countries]);

  async function runDownload(id: string, action: () => Promise<void>) {
    setBusy(id);
    setError('');
    setMessage('');
    try {
      await action();
      setMessage(id === 'bundle' ? `${selected.name} bundle downloaded.` : 'Asset downloaded.');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Download failed.');
    } finally {
      setBusy(null);
    }
  }

  function selectCountry(code: string) {
    setSelectedCode(code);
    setMessage('');
    setError('');
  }

  return <main className="country-assets-shell min-h-screen bg-[#f4f0e7] text-[#252019]">
    <header className="country-assets-header">
      <div className="mx-auto flex w-full max-w-[96rem] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-700 text-white"><Database size={23} /></span>
          <div className="min-w-0"><p className="text-[10px] font-black uppercase tracking-[.2em] text-amber-800">Central country library</p><h1 className="truncate text-xl font-black sm:text-2xl">Country Asset Hub</h1></div>
        </div>
        <button className="studio-button studio-button-secondary shrink-0" onClick={onExit}><ArrowLeft size={17} /> <span className="hidden sm:inline">All studios</span><span className="sm:hidden">Back</span></button>
      </div>
    </header>

    <div className="mx-auto grid w-full max-w-[96rem] gap-5 px-4 py-5 lg:grid-cols-[22rem_minmax(0,1fr)] lg:px-6">
      <aside className="country-browser" aria-label="Country browser">
        <div className="sticky top-[5.6rem]">
          <div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-black uppercase tracking-[.16em] text-amber-800">Browse</p><h2 className="text-2xl font-black">{countries.length || '—'} countries</h2></div><span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-bold text-amber-900">2 images each</span></div>
          <label className="relative block"><Search className="absolute left-3 top-3.5 text-stone-400" size={18} /><span className="sr-only">Search countries</span><input className="studio-input pl-10" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search Japan, JPN, Nippon…" /></label>
          <select className="studio-input mt-3" value={continent} onChange={event => setContinent(event.target.value)} aria-label="Filter by continent">{continents.map(value => <option key={value}>{value}</option>)}</select>
          <p className="mb-2 mt-4 text-xs font-bold text-stone-500">Showing {filtered.length}</p>
          <div className="country-list" role="listbox" aria-label="Countries">
            {filtered.map(country => <button key={country.iso2} role="option" aria-selected={country.iso2 === selected?.iso2} className={`country-list-item ${country.iso2 === selected?.iso2 ? 'country-list-item-active' : ''}`} onClick={() => selectCountry(country.iso2)}>
              <img src={publicAssetUrl(country.flag)} alt="" /><span><strong>{country.name}</strong><small>{country.iso2.toUpperCase()} · {country.iso3} · {country.continent}</small></span>
            </button>)}
            {filtered.length === 0 && <p className="p-5 text-center text-sm text-stone-500">No countries match that search.</p>}
          </div>
        </div>
      </aside>

      <section aria-live="polite">
        {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-800" role="alert">{error}</div>}
        {message && <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-bold text-emerald-800"><Check size={17} />{message}</div>}
        {!selected ? <div className="country-detail-card flex min-h-96 items-center justify-center text-stone-500">Loading the country library…</div> : <>
          <article className="country-hero">
            <div className="country-hero-flag"><img src={publicAssetUrl(selected.flag)} alt={`Flag of ${selected.name}`} /></div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-black uppercase tracking-[.18em] text-amber-200">{selected.continent} · {selected.subregion}</p>
              <h2 className="mt-1 text-4xl font-black tracking-tight sm:text-6xl">{selected.name}</h2>
              <p className="mt-2 text-sm font-bold text-amber-100">{selected.iso2.toUpperCase()} · {selected.iso3} · ISO numeric {selected.ccn3}</p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-200">Everything currently bundled for {selected.name}, collected in one place. Download one item or package the images, data and credits together.</p>
            </div>
            <button disabled={busy !== null} onClick={() => runDownload('bundle', () => downloadCountryBundle(selected))} className="country-download-all"><Archive size={20} />{busy === 'bundle' ? 'Building ZIP…' : 'Download all (.zip)'}</button>
          </article>

          <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(22rem,.85fr)]">
            <div className="space-y-5">
              <section className="country-detail-card">
                <div className="mb-4 flex items-center gap-3"><Globe2 className="text-amber-700" /><div><p className="text-xs font-black uppercase tracking-[.15em] text-amber-800">What the hub knows</p><h3 className="text-2xl font-black">Country profile</h3></div></div>
                <dl className="country-facts">
                  <Fact label="Capital" value={selected.capital} />
                  <Fact label="Population" value={numberFormatter.format(selected.population)} />
                  <Fact label="Area" value={`${numberFormatter.format(selected.areaKm2)} km²`} />
                  <Fact label="Position" value={`${selected.lat.toLocaleString()}°, ${selected.lng.toLocaleString()}°`} />
                  <Fact label="Access" value={selected.landlocked ? 'Landlocked' : 'Coastline'} />
                  <Fact label="Languages" value={selected.languages.join(', ') || 'Not listed'} wide />
                  <Fact label="Currencies" value={selected.currencies.join(', ') || 'Not listed'} wide />
                  <Fact label="Borders" value={selected.borders.map(code => countryByIso3.get(code) ?? code).join(', ') || 'No land borders'} wide />
                </dl>
                <div className="mt-5 border-t border-stone-200 pt-4"><p className="text-xs font-black uppercase tracking-[.15em] text-stone-500">Also recognized as</p><p className="mt-2 text-sm leading-relaxed text-stone-700">{selected.aliases.join(' · ')}</p></div>
              </section>

              <section className="country-detail-card">
                <div className="mb-4 flex items-center gap-3"><Download className="text-amber-700" /><div><p className="text-xs font-black uppercase tracking-[.15em] text-amber-800">Ready to use</p><h3 className="text-2xl font-black">Available downloads</h3></div></div>
                <div className="grid gap-3 sm:grid-cols-3">{assetsForCountry(selected).map(asset => <button key={asset.id} disabled={busy !== null} onClick={() => runDownload(asset.id, () => downloadCountryAsset(selected, asset))} className="asset-download-card">
                  <span className="asset-download-icon">{asset.id === 'flag' ? <Flag /> : asset.id === 'silhouette' ? <MapIcon /> : <FileJson />}</span><strong>{asset.title}</strong><span>{asset.description}</span><small><Download size={14} /> {busy === asset.id ? 'Downloading…' : asset.filename}</small>
                </button>)}</div>
              </section>
            </div>

            <div className="space-y-5">
              <AssetPreview title="Flag PNG" subtitle="Bundled raster flag" src={publicAssetUrl(selected.flag)} alt={`Flag of ${selected.name}`} icon={<Flag size={18} />} />
              <AssetPreview title="Silhouette PNG" subtitle="Transparent map shape" src={publicAssetUrl(selected.silhouette)} alt={`Silhouette map of ${selected.name}`} icon={<MapIcon size={18} />} contain />
              <section className="country-detail-card text-sm text-stone-600"><div className="flex items-center gap-2 font-black text-stone-900"><ImageIcon size={18} className="text-amber-700" />Sources and status</div><p className="mt-3 leading-relaxed">Flag: flag-icons / FlagCDN (MIT). Silhouette: Natural Earth (public domain; quiz illustration, not an authoritative boundary map).</p><p className="mt-2"><strong>Data:</strong> {source || 'Loading…'}{snapshotDate ? ` · snapshot ${new Date(snapshotDate).toLocaleDateString()}` : ''}</p><p className="mt-2 font-bold text-emerald-700">All assets work offline after the app is loaded.</p></section>
            </div>
          </div>
        </>}
      </section>
    </div>
  </main>;
}

function Fact({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return <div className={wide ? 'sm:col-span-2' : ''}><dt>{label}</dt><dd>{value}</dd></div>;
}

function AssetPreview({ title, subtitle, src, alt, icon, contain = false }: { title: string; subtitle: string; src: string; alt: string; icon: React.ReactNode; contain?: boolean }) {
  return <figure className="country-detail-card"><figcaption className="mb-3 flex items-center justify-between"><span className="flex items-center gap-2 font-black">{icon}{title}</span><span className="text-xs font-bold text-stone-500">{subtitle}</span></figcaption><div className={`country-preview ${contain ? 'country-preview-contain' : ''}`}><img src={src} alt={alt} /></div></figure>;
}
