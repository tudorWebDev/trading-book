import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const BOOKS = [
  {
    id: 'wyckoff',
    title: 'WYCKOFF METHOD',
    subtitle: 'The Complete Guide',
    desc: 'Composite Man theory, all 5 phases, accumulation & distribution schematics, Springs, Upthrusts, and volume analysis. Map institutional campaigns like a professional.',
    chapters: 12,
    accent: '#d4af37',
    tag: 'STRUCTURE',
    icon: '◉',
    topics: ['Composite Man', 'Phase A–E', 'Spring & Upthrust', 'Volume Logic', 'Cheat Sheet'],
    path: '/wyckoff',
  },
  {
    id: 'orderflow',
    title: 'ORDER FLOW',
    subtitle: 'Master the Tape',
    desc: 'Footprint charts, Delta & CVD, DOM & order book, Open Interest, Funding rates, Volume Profile — and how to build complete systems around all of them.',
    chapters: 13,
    accent: '#00ccff',
    tag: 'ORDER FLOW',
    icon: '△',
    topics: ['Footprint Charts', 'Delta & CVD', 'DOM & Tape', 'OI & Funding', 'System Building'],
    path: '/orderflow',
  },
  {
    id: 'sweeps',
    title: 'LIQUIDITY SWEEPS',
    subtitle: 'Stop Hunts & Traps',
    desc: 'BSL, SSL, internal and external liquidity, stop hunt mechanics, sweep vs real break, Asian session sweeps, PDH/PDL — paired with Wyckoff and order flow.',
    chapters: 12,
    accent: '#ff4444',
    tag: 'LIQUIDITY',
    icon: '⚡',
    topics: ['BSL & SSL', 'Sweep Mechanics', 'Sweep vs Break', '6 Patterns', 'Entry Systems'],
    path: '/sweeps',
  },
  {
    id: 'reversals',
    title: 'REVERSALS & RANGES',
    subtitle: 'With Order Flow',
    desc: 'V-reversals, complex reversals, climax events, range anatomy, rotation logic, breakout vs fakeout — all filtered through CVD, OI, and Volume Profile.',
    chapters: 12,
    accent: '#00ff99',
    tag: 'MARKET STATES',
    icon: '⟳',
    topics: ['3 Reversal Types', 'Climax Events', 'Range Anatomy', 'Rotation Logic', 'System A & B'],
    path: '/reversals',
  },
  {
    id: 'imbalances',
    title: 'IMBALANCES',
    subtitle: 'FVGs, OBs & More',
    desc: 'Fair Value Gaps, Order Blocks, Volume Voids, Breaker Blocks — exact definitions, scoring systems, mitigation logic, and pairing with every other concept.',
    chapters: 12,
    accent: '#8888ff',
    tag: 'PRICE ACTION',
    icon: '▣',
    topics: ['Fair Value Gaps', 'Order Blocks', 'Breaker Blocks', 'Scoring System', '5 Pairings'],
    path: '/imbalances',
  },
]

function GridLines() {
  return (
    <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.03 }} preserveAspectRatio="none">
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={`v${i}`} x1={`${i * 5.26}%`} y1="0" x2={`${i * 5.26}%`} y2="100%" stroke="#ffffff" strokeWidth="1" />
      ))}
      {Array.from({ length: 15 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={`${i * 7.14}%`} x2="100%" y2={`${i * 7.14}%`} stroke="#ffffff" strokeWidth="1" />
      ))}
    </svg>
  )
}

function Ticker() {
  const items = ['BTCUSDT', 'ETHUSDT', 'WYCKOFF', 'ORDER FLOW', 'LIQUIDITY SWEEPS', 'FVG', 'ORDER BLOCKS', 'CVD DELTA', 'OPEN INTEREST', 'FUNDING RATE', 'VOLUME PROFILE', 'SPRING', 'UPTHRUST', 'BSL', 'SSL', 'IMBALANCES']
  const repeated = [...items, ...items, ...items]
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid #ffffff10', borderBottom: '1px solid #ffffff10', padding: '8px 0', background: '#080812' }}>
      <div style={{ display: 'flex', gap: '3rem', animation: 'ticker 40s linear infinite', whiteSpace: 'nowrap' }}>
        {repeated.map((item, i) => (
          <span key={i} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: i % 2 === 0 ? '#ffffff20' : '#ffffff10' }}>{item}</span>
        ))}
      </div>
    </div>
  )
}

function BookCard({ book, index }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => navigate(book.path)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: hovered ? `${book.accent}08` : '#0a0a18',
        border: `1px solid ${hovered ? book.accent + '40' : '#1a1a2e'}`,
        borderRadius: 12,
        padding: '2rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 60px ${book.accent}15, 0 0 0 1px ${book.accent}20` : '0 4px 20px #00000040',
        animationDelay: `${index * 0.1}s`,
        animation: 'fadeUp 0.6s ease both',
      }}
    >
      {/* Top accent line */}
      <div style={{ position: 'absolute', top: 0, left: '2rem', right: '2rem', height: 2, background: `linear-gradient(90deg, ${book.accent}, transparent)`, borderRadius: '0 0 2px 2px', opacity: hovered ? 1 : 0.4, transition: 'opacity 0.3s' }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: book.accent + '90', marginBottom: 6 }}>{book.tag}</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 2, lineHeight: 1, color: '#ffffff' }}>{book.title}</div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic', fontSize: 14, color: book.accent + 'aa', marginTop: 4 }}>{book.subtitle}</div>
        </div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: book.accent + '20', lineHeight: 1, transition: 'color 0.3s', ...(hovered ? { color: book.accent + '40' } : {}) }}>{book.icon}</div>
      </div>

      {/* Description */}
      <p style={{ fontSize: 13, color: '#888', lineHeight: 1.75, marginBottom: '1.5rem', fontFamily: "'DM Serif Display', serif" }}>{book.desc}</p>

      {/* Topics */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
        {book.topics.map((t) => (
          <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 1, padding: '3px 10px', background: book.accent + '10', border: `1px solid ${book.accent}25`, borderRadius: 3, color: book.accent + '90' }}>{t}</span>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: `1px solid ${book.accent}15` }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#444', letterSpacing: 1 }}>{book.chapters} CHAPTERS</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: hovered ? book.accent : '#444', letterSpacing: 2, transition: 'color 0.3s' }}>OPEN →</span>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#06060e', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes pulse { 0%, 100% { opacity: 0.4 } 50% { opacity: 0.8 } }
        @keyframes scanline { from { transform: translateY(-100%) } to { transform: translateY(100vh) } }
      `}</style>

      <GridLines />

      {/* Ambient glow */}
      <div style={{ position: 'fixed', top: '20%', left: '10%', width: 400, height: 400, background: '#d4af3708', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', top: '60%', right: '5%', width: 300, height: 300, background: '#00ccff06', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '10%', left: '40%', width: 350, height: 350, background: '#8888ff05', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />

      {/* Scanline effect */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #ffffff05, transparent)', animation: 'scanline 8s linear infinite', pointerEvents: 'none' }} />

      {/* Top nav bar */}
      <div style={{ borderBottom: '1px solid #ffffff08', padding: '1rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#06060ecc', backdropFilter: 'blur(20px)', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#d4af37', animation: 'pulse 2s ease infinite' }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: '#d4af37' }}>THE TRADING LIBRARY</span>
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#333', letterSpacing: 2 }}>5 BOOKS · 61 CHAPTERS</div>
      </div>

      {/* Ticker */}
      <Ticker />

      {/* Hero section */}
      <div style={{ padding: '5rem 2.5rem 3rem', maxWidth: 1200, margin: '0 auto', animation: 'fadeIn 0.8s ease' }}>
        <div style={{ marginBottom: '0.5rem', fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 4, color: '#ffffff20' }}>
          INSTITUTIONAL TRADING METHODOLOGY
        </div>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(52px, 8vw, 100px)', letterSpacing: 4, lineHeight: 0.9, color: '#ffffff', marginBottom: '1.5rem' }}>
          THE<br />
          <span style={{ color: '#d4af37' }}>TRADING</span><br />
          LIBRARY
        </h1>
        <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: '#666', lineHeight: 1.7, maxWidth: 560, fontStyle: 'italic' }}>
          Five complete reference books on professional trading methodology. Wyckoff, Order Flow, Liquidity, Ranges, Imbalances — everything in one place.
        </p>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '2.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          {[
            { n: '5', label: 'Complete Books' },
            { n: '61', label: 'Chapters' },
            { n: '200+', label: 'Concepts Covered' },
            { n: '∞', label: 'Edge' },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, letterSpacing: 2, color: '#d4af37', lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#444', letterSpacing: 2, marginTop: 4 }}>{s.label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2.5rem' }}>
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #ffffff10, transparent)' }} />
      </div>

      {/* Books grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 2.5rem 5rem' }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 4, color: '#ffffff20', marginBottom: '2rem' }}>
          SELECT A BOOK TO BEGIN
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {BOOKS.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #ffffff08', padding: '2rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#222', letterSpacing: 2 }}>
          THE TRADING LIBRARY · INSTITUTIONAL METHODOLOGY
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#222', letterSpacing: 2 }}>
          WYCKOFF · ORDER FLOW · LIQUIDITY · RANGES · IMBALANCES
        </div>
      </div>
    </div>
  )
}
