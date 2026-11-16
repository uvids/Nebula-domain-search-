
import { useMemo, useState } from 'react'
import {
  Search,
  Sparkles,
  Globe2,
  Heart,
  Copy,
  Check,
  Moon,
  Sun,
  ArrowUpRight,
  Zap,
  ShieldCheck,
  Layers3,
  Command,
  Menu,
  X,
  WandSparkles,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
  ExternalLink,
  Lightbulb,
  TrendingUp,
  CircleHelp
} from 'lucide-react'

type Domain = {
  name: string
  extension: string
  category: string
  score: number
}

const extensions = [
  { name: '.com', label: 'Classic', color: 'violet' },
  { name: '.ai', label: 'Artificial Intelligence', color: 'cyan' },
  { name: '.io', label: 'Technology', color: 'blue' },
  { name: '.in', label: 'India', color: 'orange' },
  { name: '.co', label: 'Business', color: 'pink' },
  { name: '.app', label: 'Applications', color: 'green' },
  { name: '.dev', label: 'Developers', color: 'blue' },
  { name: '.tech', label: 'Technology', color: 'cyan' }
]

const sampleDomains: Domain[] = [
  { name: 'novaforge', extension: '.com', category: 'Brandable', score: 96 },
  { name: 'novaforge', extension: '.ai', category: 'AI & Tech', score: 94 },
  { name: 'getnova', extension: '.io', category: 'Startup', score: 91 },
  { name: 'trynova', extension: '.co', category: 'Brandable', score: 89 },
  { name: 'novaorbit', extension: '.app', category: 'Creative', score: 87 },
  { name: 'novawave', extension: '.in', category: 'Brandable', score: 85 }
]

const cleanName = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/^-+|-+$/g, '')

function createSuggestions(value: string): Domain[] {
  const base = cleanName(value)

  if (!base) return sampleDomains

  const suggestions = [
    base,
    `get${base}`,
    `try${base}`,
    `${base}hub`,
    `${base}lab`,
    `${base}world`,
    `${base}studio`,
    `${base}zone`
  ]

  const tlds = ['.com', '.ai', '.io', '.co', '.app', '.in', '.tech', '.dev']

  return suggestions.map((name, index) => ({
    name,
    extension: tlds[index],
    category: ['Brandable', 'Startup', 'Creative', 'Business'][index % 4],
    score: 98 - index * 3
  }))
}

function App() {
  const [query, setQuery] = useState('nova')
  const [searched, setSearched] = useState('nova')
  const [favorites, setFavorites] = useState<string[]>([])
  const [filter, setFilter] = useState('All')
  const [dark, setDark] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [bulkOpen, setBulkOpen] = useState(false)
  const [bulkText, setBulkText] = useState('')
  const [copied, setCopied] = useState('')
  const [showAll, setShowAll] = useState(false)

  const domains = useMemo(
    () => createSuggestions(searched),
    [searched]
  )

  const visibleDomains = domains.filter(domain => {
    if (filter === 'Favorites') {
      return favorites.includes(domain.name + domain.extension)
    }

    if (filter === 'AI & Tech') {
      return ['.ai', '.io', '.dev', '.tech'].includes(domain.extension)
    }

    if (filter === 'Business') {
      return ['.com', '.co', '.in'].includes(domain.extension)
    }

    return true
  })

  const displayedDomains = showAll
    ? visibleDomains
    : visibleDomains.slice(0, 6)

  const toggleFavorite = (domain: Domain) => {
    const key = domain.name + domain.extension

    setFavorites(current =>
      current.includes(key)
        ? current.filter(item => item !== key)
        : [...current, key]
    )
  }

  const copyDomain = async (domain: Domain) => {
    const value = domain.name + domain.extension

    try {
      await navigator.clipboard.writeText(value)
      setCopied(value)
      window.setTimeout(() => setCopied(''), 1800)
    } catch {
      setCopied('')
    }
  }

  const performSearch = () => {
    const value = cleanName(query)

    if (!value) return

    setQuery(value)
    setSearched(value)
    setFilter('All')
    setShowAll(false)
  }

  const runBulkSearch = () => {
    const first = bulkText
      .split(/[\n,]+/)
      .map(item => cleanName(item))
      .filter(Boolean)[0]

    if (first) {
      setQuery(first)
      setSearched(first)
      setBulkOpen(false)
      setFilter('All')
    }
  }

  return (
    <div className={dark ? 'app dark' : 'app light'}>

      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="navbar">
        <a href="#" className="brand">
          <span className="brand-symbol">
            <Globe2 size={23} />
            <span className="brand-dot" />
          </span>
          <span className="brand-name">
            Domain<span>Nova</span>
            <small>DOMAIN DISCOVERY ENGINE</small>
          </span>
        </a>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#explore" onClick={() => setMenuOpen(false)}>Explore</a>
          <a href="#extensions" onClick={() => setMenuOpen(false)}>Extensions</a>
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </nav>

        <div className="nav-actions">
          <button
            className="icon-button theme-button"
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <a href="#explore" className="nav-cta">
            Start Exploring <ArrowUpRight size={16} />
          </a>
        </div>
      </header>

      <main>

        <section className="hero" id="explore">

          <div className="hero-badge">
            <span className="live-dot" />
            THE NEXT GENERATION DOMAIN DISCOVERY ENGINE
            <Sparkles size={13} />
          </div>

          <h1>
            Your next big idea
            <br />
            deserves a <span>great name.</span>
          </h1>

          <p className="hero-description">
            Discover memorable domain names, explore creative extensions
            and find the perfect identity for your next big thing.
          </p>

          <div className="search-shell">
            <div className="search-icon">
              <Search size={23} />
            </div>

            <input
              type="text"
              value={query}
              onChange={event => setQuery(event.target.value)}
              onKeyDown={event => {
                if (event.key === 'Enter') performSearch()
              }}
              placeholder="Search your dream domain..."
              aria-label="Search domain name"
            />

            <div className="search-shortcut">
              <Command size={13} /> ENTER
            </div>

            <button className="search-button" onClick={performSearch}>
              Discover <ArrowUpRight size={17} />
            </button>
          </div>

          <div className="search-hints">
            <span>Try:</span>
            {['startup', 'pixel', 'future', 'nebula'].map(item => (
              <button
                key={item}
                onClick={() => {
                  setQuery(item)
                  setSearched(item)
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="hero-stats">
            <div>
              <strong><Zap size={16} /> Instant UX</strong>
              <span>Fast discovery interface</span>
            </div>
            <div>
              <strong><Layers3 size={16} /> Multiple TLDs</strong>
              <span>Explore extensions</span>
            </div>
            <div>
              <strong><ShieldCheck size={16} /> Transparent</strong>
              <span>No fake availability claims</span>
            </div>
          </div>

          <div className="orbital-scene">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="orbital-core">
              <Globe2 size={48} />
            </div>
            <div className="orbit-tag tag-one">.COM</div>
            <div className="orbit-tag tag-two">.AI</div>
            <div className="orbit-tag tag-three">.IO</div>
            <div className="orbit-tag tag-four">.APP</div>
          </div>

        </section>

        <section className="results-section" id="results">

          <div className="section-heading">
            <div>
              <span className="eyebrow">YOUR DISCOVERY SPACE</span>
              <h2>Explore possibilities<span>.</span></h2>
              <p>
                Creative ideas based on your search:
                <strong> {searched || 'your idea'}</strong>
              </p>
            </div>

            <button
              className="bulk-button"
              onClick={() => setBulkOpen(!bulkOpen)}
            >
              <SlidersHorizontal size={17} />
              Bulk Search
            </button>
          </div>

          {bulkOpen && (
            <div className="bulk-panel">
              <div className="bulk-title">
                <Layers3 size={19} />
                <div>
                  <strong>Bulk Domain Discovery</strong>
                  <span>Enter multiple names, one per line.</span>
                </div>
              </div>

              <textarea
                value={bulkText}
                onChange={event => setBulkText(event.target.value)}
                placeholder={'startup\nmybrand\nfuturetech'}
              />

              <button className="primary-button" onClick={runBulkSearch}>
                Explore Names <ArrowUpRight size={16} />
              </button>
            </div>
          )}

          <div className="filter-row">
            <div className="filters">
              {['All', 'AI & Tech', 'Business', 'Favorites'].map(item => (
                <button
                  key={item}
                  className={filter === item ? 'filter active' : 'filter'}
                  onClick={() => setFilter(item)}
                >
                  {item === 'Favorites' && <Heart size={14} />}
                  {item}
                  {item === 'Favorites' && favorites.length > 0
                    ? ` (${favorites.length})`
                    : ''}
                </button>
              ))}
            </div>

            <span className="result-count">
              {visibleDomains.length} ideas
            </span>
          </div>

          <div className="domain-grid">
            {displayedDomains.length > 0 ? (
              displayedDomains.map((domain, index) => {
                const key = domain.name + domain.extension
                const isFavorite = favorites.includes(key)

                return (
                  <article
                    className="domain-card"
                    key={key}
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <div className="card-top">
                      <span className="domain-category">
                        <Sparkles size={12} />
                        {domain.category}
                      </span>

                      <button
                        className={isFavorite ? 'favorite active' : 'favorite'}
                        onClick={() => toggleFavorite(domain)}
                        aria-label="Save favorite"
                      >
                        <Heart size={17} fill={isFavorite ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    <div className="domain-name">
                      {domain.name}
                      <span>{domain.extension}</span>
                    </div>

                    <div className="domain-meta">
                      <div className="brand-score">
                        <span>Brand potential</span>
                        <strong>{domain.score}/100</strong>
                      </div>

                      <div className="score-track">
                        <span style={{ width: `${domain.score}%` }} />
                      </div>
                    </div>

                    <div className="verification">
                      <CircleHelp size={14} />
                      Availability not verified
                    </div>

                    <div className="card-actions">
                      <button
                        className="copy-button"
                        onClick={() => copyDomain(domain)}
                      >
                        {copied === key ? <Check size={15} /> : <Copy size={15} />}
                        {copied === key ? 'Copied' : 'Copy'}
                      </button>

                      <button
                        className="inspect-button"
                        onClick={() => copyDomain(domain)}
                      >
                        Explore <ArrowUpRight size={15} />
                      </button>
                    </div>
                  </article>
                )
              })
            ) : (
              <div className="empty-state">
                <Heart size={30} />
                <h3>No saved domains yet</h3>
                <p>Tap the heart on any domain card to save it here.</p>
                <button onClick={() => setFilter('All')}>Explore domains</button>
              </div>
            )}
          </div>

          {visibleDomains.length > 6 && (
            <button
              className="view-more"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : 'View More Ideas'}
              <ChevronDown size={17} />
            </button>
          )}

          <div className="demo-note">
            <CircleHelp size={16} />
            <span>
              These are generated name suggestions, not live registry results.
              Domain availability and prices require verification.
            </span>
          </div>

        </section>

        <section className="extensions-section" id="extensions">
          <div className="section-heading">
            <div>
              <span className="eyebrow">GO BEYOND .COM</span>
              <h2>Explore extensions<span>.</span></h2>
              <p>Find the right digital identity for your idea.</p>
            </div>
            <Globe2 className="heading-icon" size={34} />
          </div>

          <div className="extension-grid">
            {extensions.map(extension => (
              <button
                className={`extension-card ${extension.color}`}
                key={extension.name}
                onClick={() => {
                  setQuery(searched)
                  setFilter('All')
                  document.getElementById('results')?.scrollIntoView({
                    behavior: 'smooth'
                  })
                }}
              >
                <span className="extension-name">{extension.name}</span>
                <span className="extension-label">{extension.label}</span>
                <ArrowUpRight size={17} />
              </button>
            ))}
          </div>
        </section>

        <section className="features-section" id="features">
          <div className="section-heading centered">
            <span className="eyebrow">BUILT FOR BIG IDEAS</span>
            <h2>More than a search box<span>.</span></h2>
            <p>A smarter place to discover your next digital identity.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon purple">
                <WandSparkles size={23} />
              </div>
              <h3>Smart Discovery</h3>
              <p>
                Explore creative name combinations and brandable ideas
                from a simple keyword.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon cyan">
                <Zap size={23} />
              </div>
              <h3>Fast Experience</h3>
              <p>
                Instant interface interactions with a lightweight,
                responsive experience.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon blue">
                <ShieldCheck size={23} />
              </div>
              <h3>Transparent Results</h3>
              <p>
                Clear distinction between generated suggestions
                and verified domain availability.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon pink">
                <Heart size={23} />
              </div>
              <h3>Your Shortlist</h3>
              <p>
                Save your favorite domain ideas and compare
                your discoveries.
              </p>
            </div>
          </div>
        </section>

        <section className="cta-section" id="about">
          <div className="cta-glow" />
          <div className="cta-content">
            <span className="eyebrow">
              <Lightbulb size={14} /> YOUR NEXT IDEA STARTS HERE
            </span>
            <h2>Think big. Name boldly.</h2>
            <p>
              Every great digital brand begins with a name.
              Find yours with DomainNova.
            </p>
            <button
              className="primary-button"
              onClick={() => {
                document.getElementById('explore')?.scrollIntoView({
                  behavior: 'smooth'
                })
              }}
            >
              Start Discovering <ArrowUpRight size={17} />
            </button>
          </div>
        </section>

      </main>

      <footer className="footer">
        <a href="#" className="brand footer-brand">
          <span className="brand-symbol">
            <Globe2 size={21} />
          </span>
          <span className="brand-name">
            Domain<span>Nova</span>
            <small>DOMAIN DISCOVERY ENGINE</small>
          </span>
        </a>

        <p>
          Discover possibilities. Build your identity.
        </p>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} DomainNova. All rights reserved.</span>
          <span>Built for the next generation of ideas.</span>
        </div>
      </footer>

    </div>
  )
}

export default App
