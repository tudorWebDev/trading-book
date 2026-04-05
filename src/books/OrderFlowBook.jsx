import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CHAPTERS = [
  { id: "foundation", title: "What Is Order Flow", icon: "◈", tag: "FOUNDATION" },
  { id: "tools", title: "The Toolbox", icon: "⊞", tag: "TOOLS" },
  { id: "footprint", title: "Footprint Charts", icon: "▣", tag: "TOOLS" },
  { id: "delta", title: "Delta & CVD", icon: "△", tag: "TOOLS" },
  { id: "dom", title: "DOM & Order Book", icon: "≡", tag: "TOOLS" },
  { id: "oi", title: "Open Interest & Funding", icon: "◎", tag: "TOOLS" },
  { id: "vp", title: "Volume Profile", icon: "⊟", tag: "TOOLS" },
  { id: "pairing", title: "Pairing With Structure", icon: "⌬", tag: "SYSTEMS" },
  { id: "wyckoff", title: "Order Flow + Wyckoff", icon: "◉", tag: "SYSTEMS" },
  { id: "systems", title: "Building Systems", icon: "⟳", tag: "SYSTEMS" },
  { id: "entries", title: "Entries & Execution", icon: "⚡", tag: "EXECUTION" },
  { id: "cheatsheet", title: "Cheat Sheet", icon: "✦", tag: "REFERENCE" },
  { id: "mistakes", title: "Critical Mistakes", icon: "⚠", tag: "REFERENCE" },
];

// ── SVG DIAGRAMS ─────────────────────────────────────────────────────────────

function FootprintDiagram() {
  const cells = [
    // [x, y, bid, ask, delta, imbalance]
    { x: 40, y: 60, bid: 142, ask: 89, delta: 53, color: "#00ff99" },
    { x: 180, y: 60, bid: 98, ask: 203, delta: -105, color: "#ff4444" },
    { x: 320, y: 60, bid: 67, ask: 45, delta: 22, color: "#00ff99" },
    { x: 40, y: 160, bid: 234, ask: 178, delta: 56, color: "#00ff99" },
    { x: 180, y: 160, bid: 445, ask: 89, delta: 356, color: "#00ff9940", outline: "#00ff99", bold: true },
    { x: 320, y: 160, bid: 112, ask: 134, delta: -22, color: "#ff444430", outline: "#ff4444" },
    { x: 40, y: 260, bid: 78, ask: 156, delta: -78, color: "#ff4444" },
    { x: 180, y: 260, bid: 567, ask: 34, delta: 533, color: "#00ff9950", outline: "#00ff99", bold: true },
    { x: 320, y: 260, bid: 89, ask: 201, delta: -112, color: "#ff4444" },
  ];
  return (
    <svg viewBox="0 0 480 360" className="w-full" style={{ fontFamily: "monospace" }}>
      <rect width="480" height="360" fill="#080810" rx="8" />
      {/* Header */}
      <text x="240" y="22" fill="#00ccff" fontSize="11" textAnchor="middle" letterSpacing="2" fontWeight="bold">FOOTPRINT CANDLE — BID × ASK STRUCTURE</text>
      <rect x="20" y="32" width="440" height="310" fill="none" stroke="#1a1a30" strokeWidth="1" rx="4" />
      {/* Price levels */}
      {["84,250", "84,200", "84,150"].map((p, i) => (
        <text key={i} x="14" y={100 + i * 100} fill="#333" fontSize="9" textAnchor="end">{p}</text>
      ))}
      {/* Cells */}
      {cells.map((c, i) => (
        <g key={i}>
          <rect x={c.x} y={c.y} width="125" height="80" fill={c.color + (c.bold ? "" : "15")} stroke={c.outline || c.color + "30"} strokeWidth={c.bold ? 1.5 : 0.5} rx="3" />
          <text x={c.x + 18} y={c.y + 28} fill="#ff6060" fontSize="13" fontWeight="bold">{c.bid}</text>
          <line x1={c.x + 62} y1={c.y + 10} x2={c.x + 62} y2={c.y + 70} stroke="#ffffff15" strokeWidth="1" />
          <text x={c.x + 107} y={c.y + 28} fill="#60ff90" fontSize="13" fontWeight="bold">{c.ask}</text>
          <text x={c.x + 62} y={c.y + 55} fill={c.delta > 0 ? "#00ff99" : "#ff4444"} fontSize="11" textAnchor="middle">Δ {c.delta > 0 ? "+" : ""}{c.delta}</text>
          {c.bold && <text x={c.x + 62} y={c.y + 72} fill="#d4af37" fontSize="8" textAnchor="middle" letterSpacing="1">ABSORPTION</text>}
        </g>
      ))}
      {/* Legend */}
      <rect x="20" y="328" width="440" height="22" fill="#0c0c18" rx="3" />
      <text x="30" y="343" fill="#ff6060" fontSize="10">BID (sellers hit)</text>
      <text x="160" y="343" fill="#60ff90" fontSize="10">ASK (buyers hit)</text>
      <text x="300" y="343" fill="#d4af37" fontSize="10">Δ DELTA = ASK − BID</text>
    </svg>
  );
}

function CVDDiagram() {
  return (
    <svg viewBox="0 0 700 280" className="w-full" style={{ fontFamily: "monospace" }}>
      <rect width="700" height="280" fill="#080810" rx="8" />
      <text x="350" y="22" fill="#d4af37" fontSize="11" textAnchor="middle" letterSpacing="2" fontWeight="bold">CVD DIVERGENCE — PRICE vs CUMULATIVE DELTA</text>
      {/* Price line - going up */}
      <polyline points="60,200 120,180 180,160 240,150 300,135 360,120 420,110 480,105 540,115 600,130 640,140"
        fill="none" stroke="#d4af37" strokeWidth="2.5" />
      {/* CVD line - diverging (going down while price goes up) */}
      <polyline points="60,130 120,125 180,120 240,118 300,115 360,118 420,125 480,135 540,150 600,165 640,175"
        fill="none" stroke="#ff4444" strokeWidth="2" strokeDasharray="5,3" />
      {/* Divergence arrow zone */}
      <rect x="420" y="95" width="220" height="95" fill="#ff000008" stroke="#ff000025" strokeWidth="1" rx="4" />
      <text x="530" y="88" fill="#ff4444" fontSize="10" textAnchor="middle" letterSpacing="1">BEARISH DIVERGENCE ZONE</text>
      {/* Labels */}
      <text x="50" y="208" fill="#d4af37" fontSize="11" fontWeight="bold">PRICE</text>
      <text x="50" y="128" fill="#ff4444" fontSize="11" fontWeight="bold">CVD</text>
      {/* Arrows */}
      <text x="645" y="138" fill="#d4af37" fontSize="14">↗</text>
      <text x="645" y="178" fill="#ff4444" fontSize="14">↘</text>
      <text x="350" y="260" fill="#ffffff40" fontSize="10" textAnchor="middle">Price making higher highs — CVD making lower highs = sellers absorbing rallies</text>
      {/* Zero line for CVD reference */}
      <line x1="60" y1="145" x2="650" y2="145" stroke="#ffffff10" strokeWidth="1" strokeDasharray="3,5" />
    </svg>
  );
}

function DOMDiagram() {
  const asks = [
    { price: "84,350", size: 12, pct: 15 }, { price: "84,300", size: 45, pct: 56 },
    { price: "84,275", size: 8, pct: 10 }, { price: "84,260", size: 28, pct: 35 },
    { price: "84,255", size: 5, pct: 6 },
  ];
  const bids = [
    { price: "84,245", size: 6, pct: 7 }, { price: "84,240", size: 31, pct: 39 },
    { price: "84,225", size: 89, pct: 100, iceberg: true }, { price: "84,200", size: 15, pct: 19 },
    { price: "84,150", size: 9, pct: 11 },
  ];
  return (
    <svg viewBox="0 0 460 340" className="w-full" style={{ fontFamily: "monospace" }}>
      <rect width="460" height="340" fill="#080810" rx="8" />
      <text x="230" y="22" fill="#00ccff" fontSize="11" textAnchor="middle" letterSpacing="2" fontWeight="bold">DEPTH OF MARKET (DOM)</text>
      {/* Headers */}
      <text x="80" y="42" fill="#555" fontSize="9" textAnchor="middle" letterSpacing="1">SIZE</text>
      <text x="230" y="42" fill="#555" fontSize="9" textAnchor="middle" letterSpacing="1">PRICE</text>
      <text x="380" y="42" fill="#555" fontSize="9" textAnchor="middle" letterSpacing="1">VISUAL DEPTH</text>
      {/* Asks */}
      {asks.map((a, i) => (
        <g key={i}>
          <rect x="10" y={48 + i * 26} width="440" height="24" fill={`#ff444408`} />
          <rect x="280" y={48 + i * 26} width={a.pct * 1.4} height="24" fill="#ff444420" />
          <text x="80" y={64 + i * 26} fill="#ff6060" fontSize="12" textAnchor="middle" fontWeight="bold">{a.size}K</text>
          <text x="230" y={64 + i * 26} fill="#ff8080" fontSize="12" textAnchor="middle">{a.price}</text>
        </g>
      ))}
      {/* Spread */}
      <rect x="10" y="178" width="440" height="18" fill="#d4af3715" />
      <text x="230" y="191" fill="#d4af37" fontSize="10" textAnchor="middle" letterSpacing="2">— SPREAD — LAST: 84,250 —</text>
      {/* Bids */}
      {bids.map((b, i) => (
        <g key={i}>
          <rect x="10" y={196 + i * 26} width="440" height="24" fill="#00ff9908" />
          <rect x="280" y={196 + i * 26} width={b.pct * 1.4} height="24" fill="#00ff9920" />
          <text x="80" y={212 + i * 26} fill="#60ff90" fontSize="12" textAnchor="middle" fontWeight={b.iceberg ? "bold" : "normal"}>{b.size}K{b.iceberg ? " 🧊" : ""}</text>
          <text x="230" y={212 + i * 26} fill="#80ff80" fontSize="12" textAnchor="middle">{b.price}</text>
          {b.iceberg && <text x="410" y={212 + i * 26} fill="#00ff9980" fontSize="9">← ICEBERG?</text>}
        </g>
      ))}
      <text x="230" y="330" fill="#ffffff30" fontSize="10" textAnchor="middle">Large bid at 84,225 — test it or fade it</text>
    </svg>
  );
}

function VPDiagram() {
  const levels = [
    { price: "85,000", vol: 12, type: "low" }, { price: "84,800", vol: 28, type: "low" },
    { price: "84,600", vol: 45, type: "mid" }, { price: "84,400", vol: 67, type: "mid" },
    { price: "84,200", vol: 100, type: "poc" }, { price: "84,000", vol: 82, type: "vah" },
    { price: "83,800", vol: 55, type: "val" }, { price: "83,600", vol: 31, type: "low" },
    { price: "83,400", vol: 18, type: "low" }, { price: "83,200", vol: 9, type: "low" },
  ];
  const colors = { poc: "#d4af37", vah: "#00ccff", val: "#00ccff", mid: "#ffffff20", low: "#ffffff10" };
  const labels = { poc: "POC", vah: "VAH", val: "VAL" };
  return (
    <svg viewBox="0 0 500 320" className="w-full" style={{ fontFamily: "monospace" }}>
      <rect width="500" height="320" fill="#080810" rx="8" />
      <text x="250" y="22" fill="#d4af37" fontSize="11" textAnchor="middle" letterSpacing="2" fontWeight="bold">VOLUME PROFILE — KEY LEVELS</text>
      {levels.map((l, i) => (
        <g key={i}>
          <rect x="120" y={30 + i * 27} width={l.vol * 2.8} height="22" fill={colors[l.type]} rx="2" />
          <text x="115" y={46 + i * 27} fill={l.type === "poc" || l.type === "vah" || l.type === "val" ? colors[l.type] : "#555"} fontSize="10" textAnchor="end">{l.price}</text>
          {labels[l.type] && (
            <>
              <line x1="10" y1={41 + i * 27} x2="500" y2={41 + i * 27} stroke={colors[l.type]} strokeWidth="1" strokeDasharray="4,3" opacity="0.4" />
              <text x="490" y={38 + i * 27} fill={colors[l.type]} fontSize="10" textAnchor="end" fontWeight="bold">{labels[l.type]}</text>
            </>
          )}
        </g>
      ))}
      {/* Value area bracket */}
      <rect x="6" y={138} width="4" height={81} fill="#00ccff" opacity="0.3" rx="2" />
      <text x="5" y={183} fill="#00ccff" fontSize="9" textAnchor="end" transform="rotate(-90, 5, 183)">VALUE AREA (70%)</text>
    </svg>
  );
}

function SystemDiagram() {
  const layers = [
    { label: "MACRO / NARRATIVE", color: "#d4af37", items: ["Funding rate regime", "OI trend (expanding/contracting)", "HTF Wyckoff phase", "Market structure bias"] },
    { label: "STRUCTURE CONTEXT", color: "#8888ff", items: ["Daily/4H key levels", "Volume Profile POC/VAH/VAL", "Supply & demand zones", "Liquidity pools above/below"] },
    { label: "ORDER FLOW CONFIRMATION", color: "#00ccff", items: ["Delta divergence", "Absorption at key level", "CVD trending with price?", "DOM iceberg / spoofing?"] },
    { label: "TRIGGER & EXECUTION", color: "#00ff99", items: ["Footprint entry signal", "Stack of confluence", "Stop placement (structure)", "R:R minimum 2.5:1"] },
  ];
  return (
    <svg viewBox="0 0 600 300" className="w-full" style={{ fontFamily: "monospace" }}>
      <rect width="600" height="300" fill="#080810" rx="8" />
      <text x="300" y="22" fill="#ffffff80" fontSize="11" textAnchor="middle" letterSpacing="2">ORDER FLOW TRADING SYSTEM — LAYER STACK</text>
      {layers.map((l, i) => (
        <g key={i}>
          <rect x={20 + i * 8} y={35 + i * 55} width={560 - i * 16} height="48" fill={l.color + "12"} stroke={l.color + "40"} strokeWidth="1" rx="5" />
          <text x={30 + i * 8} y={54 + i * 55} fill={l.color} fontSize="10" fontWeight="bold" letterSpacing="1.5">LAYER {i + 1} — {l.label}</text>
          <text x={30 + i * 8} y={71 + i * 55} fill="#777" fontSize="9">{l.items.join("  ·  ")}</text>
          {i < 3 && <text x="300" y={88 + i * 55} fill={l.color + "60"} fontSize="14" textAnchor="middle">↓</text>}
        </g>
      ))}
      <rect x="20" y="265" width="560" height="26" fill="#d4af3715" stroke="#d4af3740" strokeWidth="1" rx="4" />
      <text x="300" y="282" fill="#d4af37" fontSize="10" textAnchor="middle" letterSpacing="1">ALL 4 LAYERS ALIGNED = HIGH CONVICTION TRADE · FEWER LAYERS = REDUCE SIZE OR SKIP</text>
    </svg>
  );
}

// ── CONTENT ───────────────────────────────────────────────────────────────────

function ChapterFoundation() {
  return (
    <div>
      <p className="lead-text">Order flow is the only thing that actually moves markets. Everything else — indicators, patterns, news — is a derivative of order flow. You're not predicting. You're reading what's already happening at the most granular level possible.</p>
      <blockquote>"Price is the last piece of information. Order flow is the first."</blockquote>
      <div className="concept-grid">
        {[
          { title: "What Order Flow Actually Is", body: "Order flow is the real-time record of buy and sell orders being executed in the market. Specifically: which side is the aggressor — the buyer hitting the ask, or the seller hitting the bid. Every transaction has a passive side and an aggressive side. Order flow tracks the aggressive side.", color: "#d4af37" },
          { title: "Why It Matters", body: "Price moves when aggressive orders overwhelm the passive orders at a level. A large seller hitting bids forces price down. A large buyer lifting offers forces price up. Order flow shows you WHERE this is happening and HOW MUCH force is behind it — before the candle closes.", color: "#00ccff" },
          { title: "What It's Not", body: "Order flow is NOT a magic signal generator. It doesn't tell you 'buy here, sell here.' It tells you the current balance of aggressive buying vs selling at specific prices. You still need context, structure, and judgment to translate that into trades.", color: "#ff4444" },
          { title: "The Information Hierarchy", body: "HTF structure tells you the battlefield. Volume Profile shows you where value was established. Wyckoff tells you what phase the Composite Man is in. Order flow tells you what's happening RIGHT NOW at the level you're watching. Use all four.", color: "#00ff99" },
        ].map((c) => (
          <div key={c.title} className="concept-card" style={{ borderTop: `2px solid ${c.color}40` }}>
            <div className="concept-title" style={{ color: c.color }}>{c.title}</div>
            <div className="concept-body">{c.body}</div>
          </div>
        ))}
      </div>
      <div className="key-insight">
        <span className="ki-label">THE CORE PRINCIPLE</span>
        <p>Every price move is caused by an imbalance between aggressive buyers and aggressive sellers. Your job as an order flow trader is to identify: (1) WHERE that imbalance is most likely to appear next, and (2) CONFIRM that it's actually happening when price reaches that level. Structure gives you the WHERE. Order flow gives you the confirmation.</p>
      </div>
      <div className="law-card" style={{ borderColor: "#d4af3740", marginTop: "1.5rem" }}>
        <div className="law-header"><span className="law-title" style={{ color: "#d4af37" }}>The Order Flow Ecosystem — What You're Actually Watching</span></div>
        <div className="table-container">
          <table className="of-table">
            <thead><tr><th>Tool</th><th>What It Shows</th><th>Time Frame</th><th>Primary Use</th></tr></thead>
            <tbody>
              {[
                ["Footprint Chart", "Bid/Ask volume at each price tick within a candle", "Micro (seconds–minutes)", "Absorption, imbalance, unfinished auctions"],
                ["Delta / CVD", "Net aggressive buying vs selling (cumulative over time)", "Micro to macro", "Divergence, trend confirmation, exhaustion"],
                ["DOM / Order Book", "Passive orders waiting to be hit at each level", "Real-time (milliseconds)", "Support/resistance strength, spoofing, icebergs"],
                ["Volume Profile", "Total volume traded at each price level over a period", "Macro (sessions/weeks)", "Value area, POC, high/low volume nodes"],
                ["Open Interest", "Total open contracts — expanding vs contracting", "Macro (hours–days)", "Trend conviction, squeeze potential, liquidation"],
                ["Funding Rate", "Cost of holding perpetual futures positions", "Macro (hours–days)", "Crowded trade detection, mean-reversion signal"],
              ].map((row, i) => (
                <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ChapterTools() {
  return (
    <div>
      <p className="lead-text">Each order flow tool answers a different question. Master each in isolation before combining them. Using five tools badly is worse than using one tool well.</p>
      {[
        {
          title: "Footprint Chart", color: "#00ff99", icon: "▣",
          question: "What did buyers and sellers do INSIDE each candle?",
          desc: "Shows bid volume (sellers hitting bids) and ask volume (buyers lifting asks) at each price tick within a candle. The most granular order flow view available. Reveals absorption, imbalances, and unfinished business that standard candles hide.",
          strengths: ["Shows exact price levels where absorption occurred", "Reveals delta imbalances within each candle", "Identifies unfinished auctions (single prints)", "Best for entry precision and stop placement"],
          weaknesses: ["Overwhelming on higher TFs without filtering", "Requires practice to read quickly in real-time", "Noisy in low-volume periods"],
          platform: "Bookmap, Sierra Chart, NinjaTrader, ATAS",
        },
        {
          title: "Delta & CVD", color: "#d4af37", icon: "△",
          question: "Are buyers or sellers currently MORE aggressive? Is it accelerating or fading?",
          desc: "Delta = ask volume minus bid volume in a single candle. CVD (Cumulative Volume Delta) = running total of delta over time. This is your primary trend-confirmation and divergence tool. When CVD trends with price = healthy trend. When they diverge = reversal warning.",
          strengths: ["Clear trend confirmation or denial", "Divergence signals before price reversal", "Works on all timeframes", "Easy to read once understood"],
          weaknesses: ["Can give false divergences in trending markets", "CVD resets at session open — context dependent", "Doesn't show WHERE volume occurred (no price level info)"],
          platform: "TradingView, ATAS, Sierra Chart, Bookmap",
        },
        {
          title: "DOM (Depth of Market)", color: "#00ccff", icon: "≡",
          question: "Where are the large passive orders sitting RIGHT NOW?",
          desc: "The order book — real-time display of pending limit orders at each price level above and below current price. Asks are above (supply), bids are below (demand). The DOM is live and constantly changing. In crypto, it's heavily gamed — learn to spot spoofing and icebergs.",
          strengths: ["Real-time view of near-term supply/demand", "Identifies large passive orders as S/R targets", "Tape reading (watching order fills in real-time)", "Detects institutional icebergs over time"],
          weaknesses: ["Heavily spoofed in crypto — many large orders disappear", "Requires fast cognitive processing", "Less useful on higher timeframes", "Flash orders can mislead"],
          platform: "Bookmap (best visualization), Jigsaw, NinjaTrader",
        },
        {
          title: "Volume Profile", color: "#8888ff", icon: "⊟",
          question: "Where did the MOST trading happen? Where is price likely to seek value?",
          desc: "Plots total volume traded at each price level over a defined period. The Point of Control (POC) is the price with the most volume. Value Area High/Low (VAH/VAL) contain 70% of total volume. High Volume Nodes (HVN) are price magnets. Low Volume Nodes (LVN) are areas of fast movement.",
          strengths: ["Objective, mathematical support/resistance", "POC acts as magnet for price repeatedly", "LVNs predict fast moves through thin zones", "Works on any timeframe"],
          weaknesses: ["Historical — doesn't predict future", "Needs meaningful volume sample (thin profiles misleading)", "Multiple profiles can create conflicting levels"],
          platform: "TradingView, Sierra Chart, ATAS, MarketDelta",
        },
        {
          title: "Open Interest", color: "#ff4444", icon: "◎",
          question: "Are traders ADDING new positions or CLOSING old ones?",
          desc: "OI = total open contracts. Rising OI = new money entering (conviction). Falling OI = positions closing (profit-taking or stops). The most important combination: Price direction + OI direction + volume direction. These three together define whether a move is real or exhausting.",
          strengths: ["Confirms trend conviction vs exhaustion", "Squeeze setups: short OI + rising price = violent unwind", "Liquidation cascades visible in OI drops", "Combined with funding = crowded trade detector"],
          weaknesses: ["Aggregated — harder to parse direction", "Derivatives-specific (not available for spot)", "Delayed data on some platforms"],
          platform: "Coinalyze, Velo Data, Glassnode, CryptoQuant",
        },
        {
          title: "Funding Rate", color: "#ffaa00", icon: "◉",
          question: "Is the perpetual futures market overly crowded on one side?",
          desc: "In perpetual futures, funding is paid between longs and shorts every 8 hours to keep perp price near spot. Positive funding = longs paying shorts (market bullish/crowded long). Negative funding = shorts paying longs (market bearish/crowded short). Extreme readings = mean-reversion warning.",
          strengths: ["Crowded trade detector — extreme funding = setup", "Historically reliable contrarian signal at extremes", "Funding flips signal real sentiment shifts", "Combines well with OI for squeeze identification"],
          weaknesses: ["Mean-reversion tool only — don't fade trends just on funding", "Requires extreme reading to be actionable", "Manipulation possible in low-liquidity windows"],
          platform: "Coinalyze, Bybit/Binance directly, Velo, CoinGlass",
        },
      ].map((t) => (
        <div key={t.title} className="tool-card" style={{ borderLeft: `3px solid ${t.color}` }}>
          <div className="tool-header">
            <span className="tool-icon" style={{ color: t.color }}>{t.icon}</span>
            <div>
              <div className="tool-name" style={{ color: t.color }}>{t.title}</div>
              <div className="tool-question">"{t.question}"</div>
            </div>
          </div>
          <p className="tool-desc">{t.desc}</p>
          <div className="tool-sw">
            <div className="sw-col">
              <div className="sw-label" style={{ color: "#00ff99" }}>STRENGTHS</div>
              {t.strengths.map((s, i) => <div key={i} className="sw-item" style={{ color: "#00ff9980" }}>+ {s}</div>)}
            </div>
            <div className="sw-col">
              <div className="sw-label" style={{ color: "#ff4444" }}>WEAKNESSES</div>
              {t.weaknesses.map((w, i) => <div key={i} className="sw-item" style={{ color: "#ff444480" }}>− {w}</div>)}
            </div>
          </div>
          <div className="tool-platform">
            <span className="tp-label">PLATFORMS:</span> {t.platform}
          </div>
        </div>
      ))}
    </div>
  );
}

function ChapterFootprint() {
  return (
    <div>
      <p className="lead-text">The footprint chart is the most powerful tool in order flow trading. It's also the most misread. Most traders see the numbers and react. Professionals see the story the numbers tell at specific locations.</p>
      <FootprintDiagram />
      <div style={{ marginTop: "1.5rem" }}>
        {[
          {
            title: "Delta Imbalance", color: "#00ff99",
            desc: "When one side of the footprint row is significantly larger than the other (typically 3:1 or more), it signals aggressive directional flow at that price tick. Bullish imbalance = large ask volume dwarfs bid volume at a level. Bearish imbalance = large bid volume dwarfs ask volume.",
            action: "Mark imbalance rows. Price tends to return to unfilled imbalances (similar to gaps). Stack of 3+ consecutive imbalances in same direction = strong directional pressure.",
          },
          {
            title: "Absorption", color: "#d4af37",
            desc: "High volume on BOTH bid and ask side at the same price level, with price failing to move through. This is the Composite Man absorbing everything thrown at them. Bullish absorption: massive bid volume at support, price holds. Bearish absorption: massive ask volume at resistance, price holds.",
            action: "Absorption at key structure levels is your highest conviction order flow signal. Combined with Wyckoff Spring or BC = extremely high probability.",
          },
          {
            title: "Exhaustion", color: "#ff4444",
            desc: "When delta is strongly negative (sellers aggressive) but price STOPS falling, or when delta is strongly positive but price STOPS rising. The aggressive side ran out of ammunition. The passive side absorbed it all. This is climactic behavior at its most granular level.",
            action: "Look for: high volume bar, large negative delta, but price closes near its high. In accumulation = bullish exhaustion. Reverse for bearish.",
          },
          {
            title: "Unfinished Auction (Single Prints)", color: "#00ccff",
            desc: "Price levels with very low volume on the footprint — price moved through so fast that only one side transacted. These are 'unfilled' auction areas. Markets have a structural tendency to return to these areas to complete the auction.",
            action: "Mark single-print zones. They act like gaps — price is drawn back to them. In a trending market, single prints in the direction of the trend confirm strength. Against the trend = warning.",
          },
          {
            title: "Delta Divergence (Candle Level)", color: "#ffaa00",
            desc: "Price makes a new high but the candle's delta is negative (sellers were more aggressive inside the move). Or price makes a new low but delta is positive. This micro-level divergence warns of reversal before price confirms it.",
            action: "Bearish divergence: candle closes high, delta is negative — aggressive selling inside the move up. Short bias on this candle's close area. Requires structural context to be tradeable.",
          },
          {
            title: "Volume Clusters vs. Volume Voids", color: "#8888ff",
            desc: "Within a footprint candle, price levels with high total volume are value nodes (price accepted here). Low volume levels are transition zones (price moved fast). These micro-level clusters are the building blocks of Volume Profile.",
            action: "High volume cluster = micro POC — expect price to revisit. Volume void = fast travel zone — place targets through voids, expect quick moves.",
          },
        ].map((item) => (
          <div key={item.title} className="event-row" style={{ borderLeft: `3px solid ${item.color}`, marginBottom: "0.75rem" }}>
            <div className="event-header">
              <span className="event-code" style={{ color: item.color }}>{item.title}</span>
            </div>
            <p className="event-desc">{item.desc}</p>
            <div className="event-spot">
              <span className="event-spot-label">TRADE APPLICATION:</span> {item.action}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChapterDelta() {
  return (
    <div>
      <p className="lead-text">Delta is the net aggression score. CVD is the running total. Together they're your trend validity meter — and your divergence detector. They're simple concepts that most traders get wrong because they don't understand context.</p>
      <CVDDiagram />
      <div style={{ marginTop: "1.5rem" }}>
        <div className="law-card" style={{ borderColor: "#d4af3740" }}>
          <div className="law-header"><span className="law-title" style={{ color: "#d4af37" }}>Delta Fundamentals</span></div>
          <div className="table-container">
            <table className="of-table">
              <thead><tr><th>Delta Reading</th><th>Price Action</th><th>Interpretation</th><th>Bias</th></tr></thead>
              <tbody>
                {[
                  ["Positive (buyers aggressive)", "Price rising", "Healthy uptrend — aggression matches direction", "Bullish ✓"],
                  ["Positive (buyers aggressive)", "Price falling", "Buyers absorbing — potential reversal zone", "Bullish divergence"],
                  ["Negative (sellers aggressive)", "Price falling", "Healthy downtrend — aggression matches direction", "Bearish ✓"],
                  ["Negative (sellers aggressive)", "Price rising", "Sellers absorbing rally — potential top", "Bearish divergence"],
                  ["Near zero (balanced)", "Price trending", "Trend likely ending — exhaustion of aggressor", "Caution / reversal"],
                  ["Near zero (balanced)", "Price ranging", "Value area — wait for breakout", "Neutral"],
                ].map((row, i) => (
                  <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="concept-grid" style={{ marginTop: "1.25rem" }}>
          {[
            { title: "CVD Trending With Price", color: "#00ff99", body: "CVD rising with price = healthy uptrend. Aggressive buyers are driving the move. Stay long, trail stops. CVD falling with price = healthy downtrend. Stay short. This is trend confirmation, not a signal by itself." },
            { title: "CVD Bearish Divergence", color: "#ff4444", body: "Price making higher highs, CVD making lower highs. Sellers are absorbing the rallies. This is a distribution signal. The longer the divergence persists, the more significant the eventual reversal. DON'T short immediately — wait for structure to break." },
            { title: "CVD Bullish Divergence", color: "#00ff99", body: "Price making lower lows, CVD making higher lows. Buyers are absorbing the dips. This is an accumulation signal. Persistent bullish CVD divergence at a key structure level = Spring territory. Combine with Wyckoff context." },
            { title: "CVD Reset Warning", color: "#ffaa00", body: "CVD resets at session open, daily open, or at the discretion of your platform. Always know what period your CVD is measuring. Comparing CVD across sessions without resetting can create false signals. Use anchored CVD from key events (session open, major high/low)." },
          ].map((c) => (
            <div key={c.title} className="concept-card" style={{ borderTop: `2px solid ${c.color}40` }}>
              <div className="concept-title" style={{ color: c.color }}>{c.title}</div>
              <div className="concept-body">{c.body}</div>
            </div>
          ))}
        </div>

        <div className="key-insight">
          <span className="ki-label">CVD ANCHOR TECHNIQUE</span>
          <p>Instead of using session-reset CVD, anchor your CVD to a significant market event: the most recent swing high, the SC in an accumulation structure, or the BC in distribution. This gives you a context-specific aggression reading from the moment the structure began. An anchored CVD that stays positive from a Spring = buyers controlling since the shakeout. Powerful context.</p>
        </div>

        <div className="law-card" style={{ borderColor: "#ff444440", marginTop: "1.25rem" }}>
          <div className="law-header"><span className="law-title" style={{ color: "#ff4444" }}>Delta Divergence — The 3 Types That Matter</span></div>
          {[
            { name: "Candle-Level Divergence", desc: "Delta disagrees with candle direction. Bearish: candle closes up but delta is negative. High-probability reversal signal when at key structure. Low-probability in isolation.", urgency: "CONTEXT REQUIRED" },
            { name: "Swing-Level Divergence", desc: "Series of swings where price makes new high/low but CVD fails to confirm. This is the most tradeable divergence type. Watch for 2-3 swing divergences at resistance/support.", urgency: "HIGH PROBABILITY" },
            { name: "Session Divergence", desc: "Multiple sessions of price rising but CVD declining session over session. Macro-level distribution signal. This is weeks of smart money fading retail buying. Very significant — precedes major reversals.", urgency: "MACRO SIGNAL" },
          ].map((d) => (
            <div key={d.name} style={{ marginBottom: 14, padding: "0.75rem 1rem", background: "#0a0a14", borderRadius: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: "#ff4444", fontWeight: "bold", fontSize: 13 }}>{d.name}</span>
                <span style={{ fontSize: 9, fontFamily: "monospace", color: "#ff444480", border: "1px solid #ff444430", padding: "2px 8px", borderRadius: 3 }}>{d.urgency}</span>
              </div>
              <p style={{ color: "#999", fontSize: 13, lineHeight: 1.6 }}>{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChapterDOM() {
  return (
    <div>
      <p className="lead-text">The DOM is the most gamed tool in trading. In crypto especially, large orders appear and disappear to manipulate sentiment. Learn to see through the deception — the DOM is still useful when you know what to ignore.</p>
      <DOMDiagram />
      <div style={{ marginTop: "1.5rem" }}>
        {[
          { title: "Real Orders vs. Spoof Orders", color: "#ff4444", desc: "Spoof orders: large limit orders placed with no intent to fill — they're there to create the illusion of support or resistance, then pulled when price approaches. Real orders: absorb the market orders and REDUCE as price hits them. How to distinguish: watch whether the large order HOLDS when price hits it or DISAPPEARS before being filled.", action: "Time your attention at the level, not before. A 500-lot bid that vanishes when price touches it = spoof. A 500-lot bid that absorbs 200 lots and holds = real institutional support." },
          { title: "Iceberg Orders", color: "#00ccff", desc: "Large institutional orders split into small chunks to avoid moving the market. You see a 10-lot bid, it fills, another 10-lot appears at the same price. Over time, the cumulative fill is massive. The footprint will show unusually high volume at that price level despite the DOM showing only small orders.", action: "Cross-reference DOM with footprint. If footprint shows 800 lots traded at a level but DOM never showed more than 20 lots at a time — iceberg. This is where the real institutional activity is." },
          { title: "DOM for Stop Hunting", color: "#ffaa00", desc: "Liquidity clusters form just above obvious resistance and below obvious support — that's where stops are placed. The Composite Man knows where they are. Thin DOM above resistance = fast move through it (stop hunt). Watch for the DOM to clear above a key level, price spikes through fast, then reverses.", action: "The stop hunt pattern: DOM thins rapidly above resistance → price spikes through → DOM refills below the level → price reverses. This IS the upthrust on the order flow level." },
          { title: "Tape Reading (Time & Sales)", color: "#00ff99", desc: "The tape (time & sales) shows every individual trade: price, size, direction. Large aggressive market orders (prints) show conviction. Rapid small prints = algo activity, low conviction. A single 500-lot market buy print = institutional aggression. That's different from 500 one-lot prints.", action: "Filter your T&S for minimum size (e.g., 10+ lots in BTC). Large aggressive prints at key levels confirm your order flow thesis. They're the Composite Man showing his hand." },
        ].map((item) => (
          <div key={item.title} className="event-row" style={{ borderLeft: `3px solid ${item.color}`, marginBottom: "0.75rem" }}>
            <div className="event-header"><span className="event-code" style={{ color: item.color }}>{item.title}</span></div>
            <p className="event-desc">{item.desc}</p>
            <div className="event-spot"><span className="event-spot-label">HOW TO USE:</span> {item.action}</div>
          </div>
        ))}
        <div className="key-insight">
          <span className="ki-label">DOM TRADING REALITY CHECK</span>
          <p>DOM trading in crypto is notoriously difficult because of spoofing and HFT manipulation. The DOM is most reliable: (1) at specific key levels you've pre-identified from structure, (2) in the seconds/minutes AFTER a major print happens in the footprint, (3) when combined with a stack of other confirmations. Never trade off DOM in isolation. It's a confirmation tool, not a primary signal.</p>
        </div>
      </div>
    </div>
  );
}

function ChapterOI() {
  const combos = [
    { price: "↑ Rising", oi: "↑ Rising", volume: "↑ High", interpretation: "New longs entering — strong uptrend", bias: "BULLISH", color: "#00ff99" },
    { price: "↓ Falling", oi: "↑ Rising", volume: "↑ High", interpretation: "New shorts entering — strong downtrend", bias: "BEARISH", color: "#ff4444" },
    { price: "↑ Rising", oi: "↓ Falling", volume: "↑ High", interpretation: "Shorts covering (short squeeze unwind)", bias: "BULLISH ⚠", color: "#ffaa00" },
    { price: "↓ Falling", oi: "↓ Falling", volume: "↑ High", interpretation: "Longs closing / liquidation cascade", bias: "BEARISH ⚠", color: "#ff4444" },
    { price: "↑ Rising", oi: "↓ Falling", volume: "↓ Low", interpretation: "Weak rally — no conviction, likely fails", bias: "FADE", color: "#ff4444" },
    { price: "↓ Falling", oi: "↓ Falling", volume: "↓ Low", interpretation: "Weak drop — profit taking, not panic", bias: "FADE", color: "#00ff99" },
  ];
  return (
    <div>
      <p className="lead-text">Open Interest tells you whether traders are opening new positions or closing old ones. This distinction changes everything about how you interpret a price move.</p>
      <div className="table-container">
        <table className="of-table">
          <thead><tr><th>Price</th><th>Open Interest</th><th>Volume</th><th>Interpretation</th><th>Bias</th></tr></thead>
          <tbody>
            {combos.map((c, i) => (
              <tr key={i}>
                <td>{c.price}</td><td>{c.oi}</td><td>{c.volume}</td><td>{c.interpretation}</td>
                <td><span style={{ color: c.color, fontWeight: "bold", fontFamily: "monospace", fontSize: 11 }}>{c.bias}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="concept-grid" style={{ marginTop: "1.25rem" }}>
        {[
          { title: "Funding Rate — Extreme Readings", color: "#ffaa00", body: "When funding is extremely positive (+0.1% per 8h or higher), longs are paying shorts dearly to hold. The market is crowded long. Even a small negative catalyst can trigger a cascade of long liquidations. This is not a signal to short immediately — it's a warning that the long-side trade is crowded and the squeeze risk is high." },
          { title: "Negative Funding Setups", color: "#00ff99", body: "Consistently negative funding = market is bearish and paying shorts to hold. This creates a coiled spring: any positive catalyst triggers short-covering (short squeeze). Combined with bullish Wyckoff structure (Spring + SOS) = the highest probability bullish setups in crypto. The shorts are your fuel." },
          { title: "OI Spikes on Breakouts", color: "#00ccff", body: "When price breaks a key level AND OI spikes up simultaneously, new money is entering — the breakout has conviction. When price breaks a level but OI falls, it's shorts or longs covering — the move lacks new conviction and often reverses. This single check saves you from chasing fake breakouts." },
          { title: "Liquidation Cascades", color: "#ff4444", body: "When price drops rapidly and OI drops rapidly simultaneously with high volume = forced liquidations. These moves are not 'real' selling pressure — they're mechanical. They often overshoot massively then revert. The footprint will show climactic delta divergence at the bottom. This IS the Spring setup." },
        ].map((c) => (
          <div key={c.title} className="concept-card" style={{ borderTop: `2px solid ${c.color}40` }}>
            <div className="concept-title" style={{ color: c.color }}>{c.title}</div>
            <div className="concept-body">{c.body}</div>
          </div>
        ))}
      </div>
      <div className="key-insight">
        <span className="ki-label">THE SQUEEZE SETUP</span>
        <p>The highest-probability crypto trade that combines order flow with OI/funding: (1) Price has been falling for weeks. (2) Funding is consistently negative (shorts paying). (3) OI is elevated — many shorts open. (4) Wyckoff shows a Spring or Phase C event at a key structure level. (5) CVD starts showing bullish divergence. (6) Footprint shows absorption at the low. This stack = short squeeze potential. Shorts become your fuel for the markup.</p>
      </div>
    </div>
  );
}

function ChapterVP() {
  return (
    <div>
      <p className="lead-text">Volume Profile is where order flow meets structure. It tells you where value was established — and markets obsessively return to value. Combined with real-time order flow, it tells you not just WHERE price will react, but HOW it will react.</p>
      <VPDiagram />
      <div style={{ marginTop: "1.5rem" }}>
        {[
          { title: "Point of Control (POC)", color: "#d4af37", desc: "The price level with the highest volume traded over the period. This is where the market spent the most time and found the most agreement. Price has a gravitational pull toward the POC.", action: "When price is above POC → POC is a magnet below. When price is below POC → POC is a magnet above. Use as target placement. Watch for aggressive order flow (absorption) when price reaches POC from either direction." },
          { title: "Value Area (VAH / VAL)", color: "#00ccff", desc: "70% of total volume occurs between VAH and VAL. This is where the market found 'fair value' for the period. Price outside the VA is in 'rejection territory' — the market considers it unfair and tends to revert.", action: "VAH rejection: price rises into VAH, sellers absorb with negative delta → short entry. VAL bounce: price drops to VAL, buyers absorb with positive delta → long entry. Break and hold THROUGH VA levels = strong directional signal." },
          { title: "High Volume Nodes (HVN)", color: "#8888ff", desc: "Price levels with significantly above-average volume. These are consolidation zones — price decelerates here, often reverses or ranges. They form strong support and resistance.", action: "Treat HVNs as speed bumps. Price approaching an HVN from either direction will slow. Don't place profit targets IN an HVN. Place them just before the HVN or look for a level-by-level footprint assessment when price enters one." },
          { title: "Low Volume Nodes (LVN)", color: "#ff4444", desc: "Price levels with very little volume — price moved through quickly. These are 'thin ice' zones. Once price enters an LVN, it tends to move through it fast because there's no historical trade memory (support/resistance) there.", action: "LVNs predict fast moves. If price breaks into an LVN, it will likely travel the full distance to the next HVN or POC rapidly. Use LVNs to size up targets. The footprint in LVN areas will show single prints and extreme imbalances." },
          { title: "Developing POC vs. Historical POC", color: "#00ff99", desc: "Current session POC (developing in real-time) and prior session POC are both significant. The developing POC migrating up or down during a session tells you whether value is being established higher or lower. Institutions position around POC migration.", action: "Developing POC moving higher = buyers establishing value higher = bullish session. POC sticking in place while price oscillates = balance (accumulation or distribution). POC migrating down = bearish. Watch direction of migration, not just location." },
        ].map((item) => (
          <div key={item.title} className="event-row" style={{ borderLeft: `3px solid ${item.color}`, marginBottom: "0.75rem" }}>
            <div className="event-header"><span className="event-code" style={{ color: item.color }}>{item.title}</span></div>
            <p className="event-desc">{item.desc}</p>
            <div className="event-spot"><span className="event-spot-label">APPLICATION:</span> {item.action}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChapterPairing() {
  return (
    <div>
      <p className="lead-text">Order flow in isolation is noise. Price structure in isolation is lagging. Together they're the most complete market analysis framework available to a retail trader.</p>
      <div className="law-card" style={{ borderColor: "#d4af3740" }}>
        <div className="law-header"><span className="law-title" style={{ color: "#d4af37" }}>The Confluence Stack</span></div>
        <p className="law-body">Every trade should have a minimum of 3 confirmations from different analysis types. The more confirmations, the larger the position. Single-factor trades are gambling. Here's how each layer adds probability:</p>
        <div className="table-container">
          <table className="of-table">
            <thead><tr><th>Analysis Layer</th><th>What It Confirms</th><th>Weight</th></tr></thead>
            <tbody>
              {[
                ["HTF Trend (Daily/Weekly)", "Direction bias — only trade in this direction unless counter-trend specialist", "HIGH"],
                ["Market Structure (Swing H/L)", "Key levels — where price will react", "HIGH"],
                ["Volume Profile (POC/VAH/VAL/HVN)", "Probability zones — where volume memory exists", "HIGH"],
                ["Wyckoff Phase", "What the Composite Man is doing", "HIGH"],
                ["Delta / CVD", "Current aggression balance — is price move supported?", "MEDIUM"],
                ["Footprint Absorption", "Is a major player absorbing at your level right now?", "HIGH (at key level)"],
                ["OI + Funding", "Is the trade crowded? Squeeze potential?", "MEDIUM"],
                ["DOM", "Where is near-term passive resistance/support?", "LOW (alone) / HIGH (with others)"],
              ].map((row, i) => (
                <tr key={i}>{row.map((cell, j) => <td key={j} style={{ color: cell === "HIGH" ? "#00ff99" : cell === "MEDIUM" ? "#ffaa00" : cell === "LOW (alone) / HIGH (with others)" ? "#00ccff" : undefined }}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="concept-grid" style={{ marginTop: "1.25rem" }}>
        {[
          {
            title: "Structure + Order Flow", color: "#00ff99",
            body: "Structure identifies where to look. Order flow confirms whether to act. The sequence: (1) Mark key level from structure. (2) Wait for price to arrive at that level. (3) Watch the footprint/delta/DOM AT that level. (4) Enter only when order flow confirms absorption or rejection. Structure without order flow = guessing. Order flow without structure = random signals.",
          },
          {
            title: "Volume Profile + Footprint", color: "#8888ff",
            body: "VP POC/VAH/VAL gives you the price levels. Footprint tells you what's happening when price arrives at those levels. At the POC: is there absorption (big players transacting) or is price slicing through on thin volume? At the VAH: are sellers showing up with aggressive order flow? The combination makes S/R go from static to dynamic.",
          },
          {
            title: "HTF Bias + LTF Entry", color: "#00ccff",
            body: "The most powerful pairing. Daily/4H shows you the Wyckoff phase and directional bias. 15M/5M footprint gives you the entry precision. You're never fighting the macro trend, but you're using micro order flow to enter at the optimal point within it. This is where R:R ratios of 5:1+ become achievable.",
          },
          {
            title: "Imbalance Zones + Order Flow", color: "#d4af37",
            body: "Supply/Demand zones (institutional order blocks from price action) mark areas of prior imbalance. When price returns to these zones, watch the footprint for the same imbalance pattern to re-emerge. A bullish OB from a prior demand imbalance + bullish footprint absorption on the return = the original buyers defending their position.",
          },
        ].map((c) => (
          <div key={c.title} className="concept-card" style={{ borderTop: `2px solid ${c.color}40` }}>
            <div className="concept-title" style={{ color: c.color }}>{c.title}</div>
            <div className="concept-body">{c.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChapterWyckoff() {
  const pairs = [
    { event: "Selling Climax (SC)", of_signal: "Extreme negative delta that REVERSES — delta goes from massively negative to suddenly positive within the bar. Footprint shows absorption on bid side. Volume spike.", action: "This is the SC confirmation on the order flow level. The footprint is showing the institutional buyer absorbing panic sellers. Don't buy here — mark the level." },
    { event: "Spring", of_signal: "Price breaks below SC low on LOW delta (weak sellers — no real follow-through). Quick reversal with sudden positive delta on recovery. Footprint shows very low ask volume at the low tick (nobody selling there).", action: "Low volume Spring + footprint showing thin selling = highest conviction accumulation signal. Enter on the test of the Spring low." },
    { event: "Test of Spring", of_signal: "Footprint shows dramatically LOWER volume than Spring itself. Near-zero delta. No absorption needed — just exhaustion of sellers. Price holds above Spring low.", action: "Enter long here. Stop below Spring low. This is your Entry #2 from Wyckoff — order flow confirms the test." },
    { event: "SOS (Sign of Strength)", of_signal: "Expanding positive delta. CVD breaks out to new high. Footprint shows imbalances stacking upward. DOM clears above resistance then refills with bids.", action: "Confirms Phase D. Add position. Trail stop to LPS." },
    { event: "LPS (Last Point of Support)", of_signal: "Pullback on very low delta (neither buyers nor sellers aggressive). CVD stays relatively flat — no selling pressure. Footprint shows no supply (no large ask volumes).", action: "Final entry. Stop below LPS. Low volume pullback = no supply = Phase D holding." },
    { event: "Buying Climax (BC) / Distribution", of_signal: "Extreme positive delta that FAILS — delta positive but price fails to advance. Large ASK volume absorbed. CVD makes new high but price turns. Footprint shows institutional sellers absorbing retail FOMO buyers.", action: "Mark the level. Don't short yet — wait for UT/UTAD confirmation from order flow." },
    { event: "Upthrust (UT/UTAD)", of_signal: "Price spikes above resistance on high volume (buying panic), then REVERSAL BAR has very negative delta — aggressive sellers appear immediately. Footprint at the high shows large ask absorption.", action: "Enter short on UT confirmation. Stop above UT high. CVD divergence should be present." },
    { event: "SOW (Sign of Weakness)", of_signal: "Expanding negative delta. CVD breaks to new low. Footprint shows stacking bearish imbalances. DOM thins below support, refills with asks.", action: "Confirms Phase D in distribution. Add short. Trail stop to LPSY." },
  ];
  return (
    <div>
      <p className="lead-text">Wyckoff tells you the story. Order flow tells you the current sentence. When you can read both simultaneously, you operate at a fundamentally different level than traders using either alone.</p>
      <div className="key-insight">
        <span className="ki-label">THE SYNERGY PRINCIPLE</span>
        <p>Wyckoff identifies the CONTEXT (what phase, what probable direction). Order flow provides the CONFIRMATION (is the Composite Man actually doing what the structure suggests right now?). You should never act on Wyckoff structure alone without order flow confirmation at the entry point. And you should never act on isolated order flow signals without Wyckoff telling you whether you're with or against the institutional campaign.</p>
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        {pairs.map((p) => (
          <div key={p.event} className="wyckoff-of-row">
            <div className="wof-event">{p.event}</div>
            <div className="wof-signal">
              <div className="wof-label">ORDER FLOW SIGNATURE</div>
              <p>{p.of_signal}</p>
            </div>
            <div className="wof-action">
              <div className="wof-label" style={{ color: "#d4af37" }}>ACTION</div>
              <p>{p.action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChapterSystems() {
  return (
    <div>
      <p className="lead-text">A system is not a set of rules — it's a decision tree that removes emotion and produces consistent decisions. Here's how to build a complete order flow trading system from scratch.</p>
      <SystemDiagram />
      <div style={{ marginTop: "1.5rem" }}>
        <div className="law-card" style={{ borderColor: "#00ff9940" }}>
          <div className="law-header"><span className="law-title" style={{ color: "#00ff99" }}>System Architecture — 4 Modules</span></div>
          {[
            {
              module: "MODULE 1: BIAS ENGINE",
              color: "#d4af37",
              items: [
                "Check HTF (weekly/daily) Wyckoff phase — what is the Composite Man doing?",
                "Check OI trend — is money entering or exiting the market?",
                "Check funding rate — which side is crowded?",
                "Output: LONG BIAS / SHORT BIAS / NO BIAS (neutral, avoid)",
                "Rule: If no clear HTF bias, reduce to 50% size maximum on any trade",
              ],
            },
            {
              module: "MODULE 2: LEVEL SELECTION",
              color: "#8888ff",
              items: [
                "Mark all Volume Profile POC, VAH, VAL from prior sessions and week",
                "Mark all key structure swing highs/lows on 4H and daily",
                "Mark Wyckoff event levels (SC low, BC high, Spring low, UT high, etc.)",
                "Mark demand/supply zones (imbalance origins)",
                "Output: Ranked list of levels — HIGH priority (3+ confluences) / MEDIUM / LOW",
                "Rule: Only trade HIGH priority levels unless structure is perfect",
              ],
            },
            {
              module: "MODULE 3: ORDER FLOW FILTER",
              color: "#00ccff",
              items: [
                "When price reaches HIGH priority level → switch to 5M or 3M footprint",
                "Check: Is delta showing absorption at this level?",
                "Check: Is CVD diverging from price at this level?",
                "Check: Is DOM showing large passive order at this level?",
                "Check: Does volume profile show HVN here (confirms acceptance)?",
                "Score 0-4. Score 3-4 = HIGH conviction entry. Score 1-2 = reduce size. Score 0 = skip.",
                "Rule: NEVER enter without at least 2 order flow confirmations at the level",
              ],
            },
            {
              module: "MODULE 4: EXECUTION",
              color: "#00ff99",
              items: [
                "Entry: On the order flow confirmation candle (absorption bar, delta reversal)",
                "Stop: 1 tick below Spring low (long) / 1 tick above UT high (short) — NEVER wider",
                "Target 1 (50% position): First significant structure level or HVN (R:R ≥ 2:1)",
                "Target 2 (30% position): POC of Trading Range or next major structure (R:R ≥ 4:1)",
                "Runner (20% position): Trail using LPS/LPSY dots or daily structure",
                "Rule: Minimum R:R = 2.5:1. If structure doesn't allow it at this level, skip the trade",
              ],
            },
          ].map((m) => (
            <div key={m.module} style={{ marginBottom: 16, background: "#0a0a14", borderRadius: 6, padding: "1rem" }}>
              <div style={{ color: m.color, fontFamily: "monospace", fontSize: 12, fontWeight: "bold", marginBottom: 10, letterSpacing: 1 }}>{m.module}</div>
              {m.items.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
                  <span style={{ color: m.color + "80", fontSize: 12, minWidth: 16 }}>{i + 1}.</span>
                  <span style={{ color: "#999", fontSize: 12, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="law-card" style={{ borderColor: "#ff444440", marginTop: "1.25rem" }}>
          <div className="law-header"><span className="law-title" style={{ color: "#ff4444" }}>Position Sizing by Conviction Score</span></div>
          <div className="table-container">
            <table className="of-table">
              <thead><tr><th>Confluences Present</th><th>Max Risk/Trade</th><th>Entry Type</th><th>Note</th></tr></thead>
              <tbody>
                {[
                  ["5+ (HTF + Structure + VP + Wyckoff + OF + OI)", "2–3%", "Full size at LPS/Test", "Highest probability — press this"],
                  ["4 (missing one major confluence)", "1.5–2%", "Scale in (2 entries)", "Solid setup — normal execution"],
                  ["3 (minimum threshold)", "0.75–1%", "Single entry, tight stop", "Acceptable — don't force size"],
                  ["2 or fewer", "0% — SKIP", "No entry", "This is gambling dressed as trading"],
                ].map((row, i) => (
                  <tr key={i}>{row.map((cell, j) => <td key={j} style={{ color: j === 1 && i === 3 ? "#ff4444" : j === 1 && i === 0 ? "#00ff99" : undefined }}>{cell}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChapterEntries() {
  return (
    <div>
      <p className="lead-text">Precision in entry is not vanity — it's the difference between a 2:1 and 5:1 trade. Order flow gives you the tool to enter ON the event, not after it.</p>
      {[
        {
          num: "Entry Type A", title: "Absorption Entry", color: "#00ff99",
          desc: "Price arrives at your pre-identified key level. Footprint shows large volume at the level with price HOLDING (not pushing through). Delta either reverses or shows divergence. This is the institutional player showing up exactly where you expected them.",
          trigger: "Footprint shows 3:1+ volume imbalance or absorption at your level with price reversal",
          stop: "1–3 ticks beyond the level being tested (Spring low, UT high, or VP HVN boundary)",
          target: "Next significant structure level, VP POC, or HVN",
          rr: "Typically 3:1 to 6:1 if level is well-chosen",
          size: "Full conviction size (2–3% risk)",
        },
        {
          num: "Entry Type B", title: "CVD Divergence + Level", color: "#d4af37",
          desc: "Price pushes to a new high/low at a key structure level. CVD fails to confirm — it makes a lower high (while price makes higher high) or higher low (while price makes lower low). The aggressor is losing steam while price is still moving on momentum alone.",
          trigger: "New price extreme + CVD divergence + at pre-identified structure level",
          stop: "Beyond the new price extreme (the divergence high/low)",
          target: "Return to prior swing level or TR midpoint (initial), then structure-defined",
          rr: "3:1 to 5:1 — stop is tight because you're placing it at the swing extreme",
          size: "Medium conviction (1.5–2% risk) — confirm with footprint before going full size",
        },
        {
          num: "Entry Type C", title: "Pullback to Broken Level (OF Confirm)", color: "#00ccff",
          desc: "Price breaks above resistance or below support with order flow confirmation (volume expansion, positive delta). Price then pulls back to test the broken level. Order flow on the pullback: low volume, low delta — no supply (or demand) on the test. Classic BU or LPS confirmation.",
          trigger: "Breakout confirmed by OF → pullback on low volume/delta → holds at broken level",
          stop: "Below the breakout level (pullback must hold above it)",
          target: "Measured move from base width, next HTF structure",
          rr: "2:1 to 4:1 — less than Type A because you sacrifice some entry price for confirmation",
          size: "High conviction after confirmation (2–2.5% risk)",
        },
        {
          num: "Entry Type D", title: "Liquidation Cascade Reversal", color: "#ffaa00",
          desc: "Crypto-specific. Price drops violently, OI drops simultaneously (forced liquidations), footprint shows massive negative delta that suddenly REVERSES to strongly positive while price is at or below a key structural level. This is mechanical stop-hitting followed by smart money absorption. Spring on a macro level.",
          trigger: "OI drops sharply + footprint delta reversal + price at key level + low funding (shorts crowded)",
          stop: "Below the cascade low (3–5 ticks margin for final stop-out)",
          target: "Return to pre-cascade level initially, then VPOC of range",
          rr: "Highly variable — the cascade creates overshoots that produce 5:1–10:1 setups",
          size: "Scale in — start with 1% on first absorption signal, add on OF confirmation",
        },
      ].map((e) => (
        <div key={e.num} className="entry-card" style={{ marginBottom: "1rem" }}>
          <div className="entry-header">
            <span className="entry-num">{e.num}</span>
            <span style={{ color: e.color, fontSize: 11, fontFamily: "monospace" }}>R:R {e.rr.split(" ")[0]}</span>
          </div>
          <div className="entry-title" style={{ color: e.color }}>{e.title}</div>
          <p className="entry-desc">{e.desc}</p>
          <div className="entry-details">
            <div className="entry-detail"><span className="ed-label">TRIGGER:</span> {e.trigger}</div>
            <div className="entry-detail"><span className="ed-label">STOP:</span> {e.stop}</div>
            <div className="entry-detail"><span className="ed-label">TARGET:</span> {e.target}</div>
            <div className="entry-detail"><span className="ed-label">R:R RANGE:</span> {e.rr}</div>
            <div className="entry-detail"><span className="ed-label" style={{ color: "#00ff99" }}>SIZING:</span> {e.size}</div>
          </div>
        </div>
      ))}
      <div className="key-insight">
        <span className="ki-label">EXIT MANAGEMENT</span>
        <p>Exits are where most order flow traders give back edge. Rules: (1) NEVER move stop against you after entry. (2) Take partial (40-50%) at first significant level — this is non-negotiable. (3) Trail the runner using the order flow itself: exit when you see delta divergence against your trade at a key level. Not on a timer, not on a feeling. On order flow. (4) Exit immediately if the original entry thesis is invalidated — absorption broken, CVD reversing against you.</p>
      </div>
    </div>
  );
}

function ChapterCheatsheet() {
  return (
    <div>
      <p className="lead-text">Your pre-trade checklist. Run through this before every single trade.</p>
      <div className="cs-section">
        <div className="cs-title" style={{ color: "#d4af37" }}>PRE-TRADE CHECKLIST — ANSWER ALL BEFORE ENTRY</div>
        {[
          { category: "MACRO BIAS", questions: [
            { q: "What is the HTF (daily/weekly) Wyckoff phase?", must: "Know the phase" },
            { q: "Is OI expanding or contracting?", must: "Expanding = conviction in trend" },
            { q: "Is funding extreme?", must: "Extreme = crowded = caution or fade setup" },
            { q: "Is CVD trending with price on HTF?", must: "Divergence = trend warning" },
          ], color: "#d4af37" },
          { category: "LEVEL QUALITY", questions: [
            { q: "Is this level a VP POC / VAH / VAL?", must: "Yes preferred" },
            { q: "Is this a Wyckoff event level (SC, Spring, UT, LPS)?", must: "Yes = higher probability" },
            { q: "Does structure (swing H/L) align with this level?", must: "Yes required" },
            { q: "How many prior confluences at this level?", must: "Minimum 2" },
          ], color: "#8888ff" },
          { category: "ORDER FLOW CONFIRMATION", questions: [
            { q: "Is footprint showing absorption or imbalance at the level?", must: "At least one required" },
            { q: "Is delta/CVD diverging or aligning at this level?", must: "Divergence = entry signal" },
            { q: "Is DOM showing a significant passive order at/near the level?", must: "Bonus — not required" },
            { q: "What is the volume on this candle vs recent average?", must: "Climax or drying = informative" },
          ], color: "#00ccff" },
          { category: "EXECUTION", questions: [
            { q: "Where is my stop?", must: "MUST be structural (beyond the level)" },
            { q: "What is my R:R at this stop?", must: "Minimum 2.5:1" },
            { q: "What % of account am I risking?", must: "Maximum 2-3% based on conviction" },
            { q: "What is my Target 1 / Target 2 / Runner?", must: "All three defined before entry" },
          ], color: "#00ff99" },
        ].map((section) => (
          <div key={section.category} style={{ marginBottom: "1rem" }}>
            <div style={{ color: section.color, fontFamily: "monospace", fontSize: 11, letterSpacing: 2, marginBottom: "0.5rem" }}>{section.category}</div>
            {section.questions.map((q, i) => (
              <div key={i} style={{ display: "flex", gap: "0.75rem", padding: "0.6rem 0.75rem", background: "#0c0c1a", borderRadius: 5, marginBottom: 4, alignItems: "flex-start" }}>
                <div style={{ width: 16, height: 16, border: `1px solid ${section.color}60`, borderRadius: 3, flexShrink: 0, marginTop: 1 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#ccc", fontSize: 12 }}>{q.q}</div>
                  <div style={{ color: section.color, fontSize: 11, marginTop: 2, fontFamily: "monospace" }}>→ {q.must}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="cs-section" style={{ marginTop: "1.25rem" }}>
        <div className="cs-title" style={{ color: "#00ccff" }}>QUICK SIGNAL REFERENCE</div>
        <div className="table-container">
          <table className="of-table">
            <thead><tr><th>Signal</th><th>Tools</th><th>Meaning</th><th>Action</th></tr></thead>
            <tbody>
              {[
                ["Absorption at support", "Footprint + DOM", "Buyer stopping price drop", "Long bias at level"],
                ["Negative delta + price holds", "Delta + Price", "Bearish aggression exhausted", "Potential reversal long"],
                ["CVD bearish divergence", "CVD + Price", "Sellers absorbing rallies", "Reduce longs, look for short setup"],
                ["Positive delta + price falling", "Delta + Price", "Buyers absorbing drop", "Potential reversal long — wait for confirmation"],
                ["OI up + price up + positive funding", "OI + Funding", "New longs crowding in", "Long BUT watch for squeeze risk"],
                ["Negative funding + price at support", "Funding + Structure", "Shorts crowded — squeeze ready", "Bullish bias, look for Spring/LPS entry"],
                ["LVN break with expanding delta", "VP + Delta", "Price entering fast zone", "Expand targets — momentum move"],
                ["Price at POC + neutral delta", "VP + Delta", "Balanced market at value", "Wait — no edge until one side dominates"],
                ["Footprint stack of bullish imbalances", "Footprint", "Consistent buying aggression", "Strong bullish confirmation — trend continuation"],
                ["DOM large order pulled before fill", "DOM", "Spoof — fake support/resistance", "Ignore that level — thin DOM beneath"],
              ].map((row, i) => (
                <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ChapterMistakes() {
  const mistakes = [
    { title: "Trading Order Flow Without Structure Context", severity: "CRITICAL", desc: "Seeing absorption on a footprint and buying without knowing where price is in the macro structure. Absorption at a Supply Zone in Distribution = the Composite Man selling into retail buyers. You just bought exactly what he's selling.", fix: "Structure first. Always. Know the HTF Wyckoff phase and key levels BEFORE looking at order flow. Order flow only confirms — it never generates trade ideas in isolation." },
    { title: "Reacting to Delta Without Price Location", severity: "CRITICAL", desc: "Seeing large negative delta and shorting immediately. Negative delta at a Spring low in accumulation = the exact opposite of a short signal. Large delta values are meaningless without knowing WHERE price is when that delta occurs.", fix: "Delta and CVD only matter at key levels. Everywhere else is noise. Build your levels first, then watch order flow only when price is at those levels." },
    { title: "DOM Trading Spoofs in Crypto", severity: "CRITICAL", desc: "Seeing a 500-lot bid in the DOM, assuming it's real support, and buying. 80% of large DOM orders in crypto are spoofed — placed with no intention of filling. They're there to create the illusion of support to attract buyers so the spoofer can sell into you.", fix: "Never trade off DOM order size in crypto without watching whether it actually holds when hit. Cross-reference with footprint prints. Real orders show in the tape. Spoofs don't." },
    { title: "Chasing Absorption — Entering at the Level Instead of After Confirmation", severity: "HIGH", desc: "Seeing absorption happening and buying mid-process. The absorption might fail — the passive buyer gets overwhelmed and price drops through anyway. Your stop gets hit before the pattern completes.", fix: "Wait for the reversal bar. The absorption is the setup. The reversal candle (closes away from the level, delta shifts direction) is the trigger. The test on low volume is the optimal entry." },
    { title: "Using CVD Without Defining the Anchor Point", severity: "HIGH", desc: "Looking at session-reset CVD without knowing what event it's measuring from. CVD starting from an arbitrary open vs anchored from the Spring gives completely different readings. Comparing CVD across sessions without adjustment creates systematic false signals.", fix: "Always define your CVD anchor. Anchor from: session open (for intraday), or from the most recent significant high/low (for structural analysis). Annotate your chart with the anchor point." },
    { title: "Treating Order Flow as a Stand-Alone Signal Generator", severity: "HIGH", desc: "Building a system that just says 'positive delta = buy.' This will fail. Order flow is a filter and confirmation tool, not a signal generator. It reduces false entries at key levels — it doesn't create them.", fix: "The signal is generated by structure (price at a key level). Order flow confirms whether to act at that level. This sequencing is non-negotiable." },
    { title: "Ignoring Volume Profile When Setting Targets", severity: "MEDIUM", desc: "Setting profit targets at 'clean air' without checking whether there's a major HVN or POC in the way. Price will decelerate massively at HVNs — your target will be hit partially then price stalls, reverses, and you exit in the wrong direction.", fix: "Before finalizing any trade, map the VP between entry and target. If a significant HVN sits in the middle, your target goes just before it. Or you scale out there and let the runner go." },
    { title: "Sizing Up on Low-Conviction OF Signals", severity: "MEDIUM", desc: "Getting excited about a signal and doubling size because it 'feels strong.' Order flow signals feel strong right before they fail. Emotional position sizing is the same as no system.", fix: "Position size is determined by the number of confirmed confluences — always, without exception. Build a rubric (like the 0-4 score system in the Systems chapter) and stick to it mechanically." },
  ];
  const sc = { CRITICAL: "#ff0000", HIGH: "#ff4444", MEDIUM: "#ffaa00" };
  return (
    <div>
      <p className="lead-text">These are not theoretical mistakes. They are the specific, repeatable ways order flow traders lose money. Learn each one before the market teaches you the expensive version.</p>
      {mistakes.map((m) => (
        <div key={m.title} className="trap-card" style={{ borderLeft: `3px solid ${sc[m.severity]}` }}>
          <div className="trap-header">
            <span className="trap-severity" style={{ background: sc[m.severity] + "20", color: sc[m.severity], border: `1px solid ${sc[m.severity]}40` }}>{m.severity}</span>
            <span className="trap-title">{m.title}</span>
          </div>
          <p className="trap-desc">{m.desc}</p>
          <div className="trap-fix"><span className="trap-fix-label">FIX:</span> {m.fix}</div>
        </div>
      ))}
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────

export default function OrderFlowBook() {
  const [active, setActive] = useState("foundation");
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(true);
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.scrollTop = 0; }, [active]);
  const current = CHAPTERS.find((c) => c.id === active);
  const idx = CHAPTERS.findIndex((c) => c.id === active);

  const content = {
    foundation: <ChapterFoundation />, tools: <ChapterTools />, footprint: <ChapterFootprint />,
    delta: <ChapterDelta />, dom: <ChapterDOM />, oi: <ChapterOI />, vp: <ChapterVP />,
    pairing: <ChapterPairing />, wyckoff: <ChapterWyckoff />, systems: <ChapterSystems />,
    entries: <ChapterEntries />, cheatsheet: <ChapterCheatsheet />, mistakes: <ChapterMistakes />,
  };

  const tagColors = { FOUNDATION: "#d4af37", TOOLS: "#00ccff", SYSTEMS: "#8888ff", EXECUTION: "#00ff99", REFERENCE: "#ff4444" };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#06060e", color: "#e0e0e0", fontFamily: "'Georgia', serif", overflow: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #090912; } ::-webkit-scrollbar-thumb { background: #22223a; border-radius: 3px; }
        .lead-text { font-size: 15px; line-height: 1.85; color: #b0b0c8; margin-bottom: 1.5rem; border-left: 2px solid #00ccff40; padding-left: 1rem; }
        blockquote { border-left: 3px solid #00ccff; padding: 1rem 1.5rem; background: #0c0c1c; margin: 1.5rem 0; border-radius: 0 8px 8px 0; font-style: italic; color: #00ccff; font-size: 15px; }
        .concept-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 1.5rem 0; }
        .concept-card { background: #0c0c1c; border: 1px solid #1a1a30; border-radius: 8px; padding: 1.25rem; }
        .concept-title { font-size: 13px; font-weight: bold; margin-bottom: 0.5rem; font-family: monospace; letter-spacing: 0.5px; }
        .concept-body { font-size: 13px; color: #888; line-height: 1.7; }
        .key-insight { background: linear-gradient(135deg, #0c0c1c, #0f0f22); border: 1px solid #00ccff25; border-radius: 8px; padding: 1.25rem 1.5rem; margin: 1.5rem 0; }
        .ki-label { font-size: 10px; font-family: monospace; letter-spacing: 2px; color: #00ccff; background: #00ccff15; padding: 3px 8px; border-radius: 3px; display: inline-block; margin-bottom: 0.75rem; }
        .key-insight p { font-size: 13px; color: #aaa; line-height: 1.7; }
        .law-card { background: #0c0c1c; border: 1px solid #1a1a30; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.25rem; }
        .law-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .law-title { font-size: 15px; font-weight: bold; font-family: monospace; }
        .law-body { font-size: 13px; color: #999; line-height: 1.7; margin-bottom: 1rem; }
        .table-container { overflow-x: auto; margin: 1rem 0; }
        .of-table { width: 100%; border-collapse: collapse; font-size: 12px; }
        .of-table th { background: #0e0e1e; color: #00ccff; font-family: monospace; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid #2a2a45; }
        .of-table td { padding: 0.6rem 1rem; border-bottom: 1px solid #12121e; color: #999; vertical-align: top; }
        .of-table tr:hover td { background: #0c0c1a; }
        .tool-card { background: #0b0b1a; border-radius: 0 10px 10px 0; padding: 1.5rem; margin-bottom: 1.25rem; }
        .tool-header { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 0.75rem; }
        .tool-icon { font-size: 24px; margin-top: 2px; }
        .tool-name { font-size: 16px; font-weight: bold; margin-bottom: 3px; font-family: monospace; }
        .tool-question { font-size: 12px; color: #666; font-style: italic; }
        .tool-desc { font-size: 13px; color: #999; line-height: 1.7; margin-bottom: 1rem; }
        .tool-sw { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 0.75rem; }
        .sw-col { background: #0a0a16; padding: 0.75rem; border-radius: 6px; }
        .sw-label { font-size: 10px; font-family: monospace; letter-spacing: 1px; display: block; margin-bottom: 0.5rem; }
        .sw-item { font-size: 11px; line-height: 1.6; margin-bottom: 3px; }
        .tool-platform { font-size: 11px; color: #555; font-family: monospace; }
        .tp-label { color: #333; margin-right: 6px; }
        .event-row { padding: 1.25rem; background: #0a0a18; border-radius: 0 8px 8px 0; margin-bottom: 0.75rem; }
        .event-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }
        .event-code { font-size: 14px; font-weight: bold; font-family: monospace; }
        .event-desc { font-size: 13px; color: #999; line-height: 1.6; margin-bottom: 0.5rem; }
        .event-spot { font-size: 12px; color: #666; background: #0e0e1c; padding: 0.5rem 0.75rem; border-radius: 4px; }
        .event-spot-label { color: #00ccff; font-family: monospace; font-size: 10px; letter-spacing: 1px; margin-right: 6px; }
        .wyckoff-of-row { display: grid; grid-template-columns: 180px 1fr 1fr; gap: 1rem; padding: 1rem; background: #0a0a18; border-radius: 8px; margin-bottom: 0.5rem; border: 1px solid #1a1a2c; }
        .wof-event { font-size: 13px; font-weight: bold; color: #d4af37; font-family: monospace; display: flex; align-items: center; }
        .wof-signal, .wof-action { font-size: 12px; color: #888; line-height: 1.6; }
        .wof-label { font-size: 10px; font-family: monospace; letter-spacing: 1px; color: #555; margin-bottom: 4px; }
        .cs-section { background: #0a0a18; border-radius: 10px; padding: 1.5rem; border: 1px solid #1a1a2c; }
        .cs-title { font-size: 11px; font-family: monospace; letter-spacing: 2px; margin-bottom: 1.25rem; }
        .entry-card { background: #0c0c1c; border: 1px solid #1c1c30; border-radius: 10px; padding: 1.5rem; }
        .entry-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem; }
        .entry-num { font-size: 11px; font-family: monospace; letter-spacing: 1px; color: #555; }
        .entry-title { font-size: 16px; font-weight: bold; margin-bottom: 0.75rem; }
        .entry-desc { font-size: 13px; color: #999; line-height: 1.6; margin-bottom: 1rem; }
        .entry-details { display: flex; flex-direction: column; gap: 0.4rem; background: #090914; padding: 1rem; border-radius: 6px; }
        .entry-detail { font-size: 12px; color: #888; }
        .ed-label { font-family: monospace; font-size: 10px; letter-spacing: 1px; color: #00ccff; margin-right: 6px; }
        .trap-card { padding: 1.25rem; background: #0a0a18; border-radius: 0 8px 8px 0; margin-bottom: 0.75rem; }
        .trap-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
        .trap-severity { font-size: 10px; font-family: monospace; letter-spacing: 1.5px; padding: 3px 10px; border-radius: 3px; }
        .trap-title { font-size: 14px; font-weight: bold; }
        .trap-desc { font-size: 13px; color: #999; line-height: 1.6; margin-bottom: 0.75rem; }
        .trap-fix { font-size: 12px; color: #7a7abb; background: #0e0e1c; padding: 0.5rem 0.75rem; border-radius: 4px; border-left: 2px solid #5555aa; }
        .trap-fix-label { color: #8888ff; font-family: monospace; font-size: 10px; letter-spacing: 1px; margin-right: 6px; }
        @media (max-width: 640px) { .wyckoff-of-row { grid-template-columns: 1fr; } .tool-sw { grid-template-columns: 1fr; } }
      `}</style>

      {/* SIDEBAR */}
      <div style={{ width: sidebar ? 270 : 0, minWidth: sidebar ? 270 : 0, transition: "all 0.3s", overflow: "hidden", background: "#080812", borderRight: "1px solid #14142a", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "1.5rem 1.25rem 1rem", borderBottom: "1px solid #14142a" }}>
          <div style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: 3, color: "#00ccff", marginBottom: 6 }}>THE COMPLETE GUIDE TO</div>
          <div style={{ fontSize: 22, fontWeight: "bold", letterSpacing: 1, lineHeight: 1.2 }}>ORDER</div>
          <div style={{ fontSize: 22, fontWeight: "bold", letterSpacing: 1, color: "#00ccff" }}>FLOW</div>
          <div style={{ fontSize: 9, color: "#333", marginTop: 6, fontFamily: "monospace", letterSpacing: 1 }}>FOOTPRINT · DELTA · DOM · VP · OI · FUNDING</div>
        </div>
        <nav style={{ flex: 1, overflowY: "auto", padding: "0.75rem 0" }}>
          {CHAPTERS.map((ch, i) => (
            <button key={ch.id} onClick={() => setActive(ch.id)} style={{
              display: "flex", alignItems: "center", gap: "0.75rem", width: "100%",
              padding: "0.6rem 1.25rem", background: active === ch.id ? "#00ccff10" : "transparent",
              border: "none", borderLeft: active === ch.id ? "2px solid #00ccff" : "2px solid transparent",
              cursor: "pointer", color: active === ch.id ? "#00ccff" : "#555", textAlign: "left", transition: "all 0.15s",
            }}>
              <span style={{ fontSize: 13, minWidth: 20, textAlign: "center", opacity: 0.7 }}>{ch.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 1, color: active === ch.id ? "#00ccff60" : "#222", marginBottom: 1 }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <span style={{ fontSize: 8, fontFamily: "monospace", letterSpacing: 1, color: tagColors[ch.tag] + "60", background: tagColors[ch.tag] + "10", padding: "1px 5px", borderRadius: 2 }}>{ch.tag}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: active === ch.id ? "bold" : "normal" }}>{ch.title}</div>
              </div>
            </button>
          ))}
        </nav>
        <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid #14142a", fontSize: 9, color: "#222", fontFamily: "monospace" }}>
          ORDER FLOW · CRYPTO / FUTURES · ALL TF
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem 1.5rem", borderBottom: "1px solid #14142a", background: "#080812", flexShrink: 0 }}>
          <button onClick={() => setSidebar(!sidebar)} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: 18 }}>
            {sidebar ? "⊟" : "⊞"}
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: 11, color: "#333", fontFamily: "monospace" }}>
            <span>ORDER FLOW</span><span style={{ color: "#1a1a2a" }}>›</span>
            <span style={{ color: "#00ccff" }}>{current?.title}</span>
            <span style={{ fontSize: 8, color: tagColors[current?.tag] + "80", background: tagColors[current?.tag] + "10", padding: "1px 6px", borderRadius: 2, fontFamily: "monospace", letterSpacing: 1, marginLeft: 4 }}>{current?.tag}</span>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem" }}>
            {["PREV", "NEXT"].map((dir) => {
              const t = dir === "PREV" ? CHAPTERS[idx - 1] : CHAPTERS[idx + 1];
              return <button key={dir} onClick={() => t && setActive(t.id)} disabled={!t} style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 1, padding: "4px 12px", background: "none", border: "1px solid #1c1c2c", borderRadius: 4, color: t ? "#666" : "#222", cursor: t ? "pointer" : "default" }}>{dir}</button>;
            })}
          </div>
        </div>

        <div ref={ref} style={{ flex: 1, overflowY: "auto", padding: "2rem 2.5rem" }}>
          <div style={{ marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid #14142a" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: 8 }}>
              <div style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 3, color: "#00ccff" }}>
                CHAPTER {String(idx + 1).padStart(2, "0")}
              </div>
              <span style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: 1, color: tagColors[current?.tag], background: tagColors[current?.tag] + "15", padding: "2px 8px", borderRadius: 3 }}>{current?.tag}</span>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: "bold", letterSpacing: 0.5 }}>{current?.title}</h1>
            <div style={{ height: 2, width: 60, background: "linear-gradient(90deg, #00ccff, transparent)", borderRadius: 2, marginTop: 12 }} />
          </div>

          {content[active]}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid #14142a" }}>
            {[CHAPTERS[idx - 1], CHAPTERS[idx + 1]].map((ch, i) => ch ? (
              <button key={i} onClick={() => setActive(ch.id)} style={{
                background: "#0c0c1c", border: `1px solid ${i === 1 ? "#00ccff30" : "#1c1c2c"}`,
                borderRadius: 8, padding: "0.75rem 1.25rem", cursor: "pointer",
                color: i === 1 ? "#00ccff" : "#888", fontSize: 12, fontFamily: "monospace",
                textAlign: i === 0 ? "left" : "right",
              }}>
                <div style={{ fontSize: 10, letterSpacing: 1, marginBottom: 3, color: i === 1 ? "#00ccff60" : "#333" }}>{i === 0 ? "‹ PREVIOUS" : "NEXT ›"}</div>
                {ch.title}
              </button>
            ) : <div key={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
