import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CHAPTERS = [
  { id: "foundation", title: "What Is Liquidity", icon: "◈", tag: "FOUNDATION" },
  { id: "types", title: "Types of Liquidity", icon: "⊞", tag: "FOUNDATION" },
  { id: "mechanics", title: "How Sweeps Work", icon: "⌬", tag: "MECHANICS" },
  { id: "identification", title: "Identifying Liquidity", icon: "◎", tag: "MECHANICS" },
  { id: "sweepvbreak", title: "Sweep vs Real Break", icon: "≡", tag: "MECHANICS" },
  { id: "patterns", title: "Sweep Patterns", icon: "▣", tag: "PATTERNS" },
  { id: "orderflow", title: "Order Flow Confirmation", icon: "△", tag: "PATTERNS" },
  { id: "pairing", title: "Pairing With Wyckoff", icon: "⟳", tag: "SYSTEMS" },
  { id: "sdz", title: "Sweeps + S/D Zones", icon: "⊟", tag: "SYSTEMS" },
  { id: "entries", title: "Entry Systems", icon: "⚡", tag: "EXECUTION" },
  { id: "cheatsheet", title: "Cheat Sheet", icon: "✦", tag: "REFERENCE" },
  { id: "mistakes", title: "Critical Mistakes", icon: "⚠", tag: "REFERENCE" },
];

// ── DIAGRAMS ──────────────────────────────────────────────────────────────────

function LiquidityMapDiagram() {
  return (
    <svg viewBox="0 0 720 360" className="w-full" style={{ fontFamily: "monospace" }}>
      <rect width="720" height="360" fill="#07070f" rx="8" />
      <text x="360" y="22" fill="#ffffff50" fontSize="11" textAnchor="middle" letterSpacing="2">LIQUIDITY MAP — WHERE STOPS CLUSTER</text>

      {/* Price candles - simplified */}
      <polyline points="60,280 100,260 140,240 180,270 220,230 260,200 300,220 340,180 380,160 420,190 460,170 500,200 540,230 580,260 620,290 660,310"
        fill="none" stroke="#ffffff30" strokeWidth="1.5" />

      {/* Equal Highs - BSL */}
      <line x1="320" y1="180" x2="480" y2="180" stroke="#ff4444" strokeWidth="1.5" strokeDasharray="5,3" />
      <line x1="320" y1="180" x2="320" y2="175" stroke="#ff4444" strokeWidth="2" />
      <line x1="460" y1="170" x2="460" y2="175" stroke="#ff4444" strokeWidth="2" />
      <text x="390" y="168" fill="#ff4444" fontSize="10" textAnchor="middle" fontWeight="bold">BSL — BUY STOPS</text>
      <text x="390" y="155" fill="#ff444470" fontSize="9" textAnchor="middle">Equal highs / Prior highs = stop cluster</text>

      {/* Trendline liquidity above */}
      <line x1="60" y1="250" x2="380" y2="150" stroke="#ffaa0060" strokeWidth="1" strokeDasharray="3,4" />
      <text x="160" y="195" fill="#ffaa00" fontSize="9" transform="rotate(-15, 160, 195)">TRENDLINE BSL</text>

      {/* Equal Lows - SSL */}
      <line x1="100" y1="260" x2="300" y2="260" stroke="#00ff99" strokeWidth="1.5" strokeDasharray="5,3" />
      <line x1="100" y1="260" x2="100" y2="265" stroke="#00ff99" strokeWidth="2" />
      <line x1="300" y1="260" x2="300" y2="265" stroke="#00ff99" strokeWidth="2" />
      <text x="200" y="278" fill="#00ff99" fontSize="10" textAnchor="middle" fontWeight="bold">SSL — SELL STOPS</text>
      <text x="200" y="291" fill="#00ff9970" fontSize="9" textAnchor="middle">Equal lows / Prior lows = stop cluster</text>

      {/* Range highs - liquidity pool */}
      <rect x="220" y="155" width="260" height="130" fill="none" stroke="#ffffff10" strokeWidth="1" strokeDasharray="3,6" rx="4" />
      <text x="350" y="300" fill="#ffffff30" fontSize="9" textAnchor="middle">TRADING RANGE</text>

      {/* Sweep arrows */}
      <path d="M 460 170 Q 490 140 510 155" fill="none" stroke="#ff4444" strokeWidth="1.5" markerEnd="url(#arr)" />
      <text x="510" y="140" fill="#ff4444" fontSize="9">SWEEP ↑ then reverse</text>

      {/* Internal liquidity */}
      <line x1="220" y1="220" x2="540" y2="220" stroke="#8888ff50" strokeWidth="1" strokeDasharray="2,4" />
      <text x="390" y="215" fill="#8888ff" fontSize="9" textAnchor="middle">INTERNAL LIQ (range midpoint)</text>

      {/* Legend */}
      <rect x="540" y="300" width="170" height="50" fill="#0a0a18" rx="4" stroke="#1a1a30" strokeWidth="1" />
      <line x1="550" y1="315" x2="575" y2="315" stroke="#ff4444" strokeWidth="2" strokeDasharray="4,2" />
      <text x="580" y="318" fill="#ff4444" fontSize="9">Buy Side Liquidity (BSL)</text>
      <line x1="550" y1="332" x2="575" y2="332" stroke="#00ff99" strokeWidth="2" strokeDasharray="4,2" />
      <text x="580" y="335" fill="#00ff99" fontSize="9">Sell Side Liquidity (SSL)</text>
    </svg>
  );
}

function SweepMechanicsDiagram() {
  return (
    <svg viewBox="0 0 720 300" className="w-full" style={{ fontFamily: "monospace" }}>
      <rect width="720" height="300" fill="#07070f" rx="8" />
      <text x="360" y="22" fill="#ffffff50" fontSize="11" textAnchor="middle" letterSpacing="2">SWEEP MECHANICS — STOP HUNT SEQUENCE</text>

      {/* Phase labels */}
      {["PHASE 1\nBuildup", "PHASE 2\nApproach", "PHASE 3\nSweep", "PHASE 4\nReversal", "PHASE 5\nExpansion"].map((p, i) => (
        <text key={i} x={80 + i * 130} y={280} fill="#ffffff30" fontSize="9" textAnchor="middle">{p.split("\n")[0]}</text>
      ))}
      {["PHASE 1\nBuildup", "PHASE 2\nApproach", "PHASE 3\nSweep", "PHASE 4\nReversal", "PHASE 5\nExpansion"].map((p, i) => (
        <text key={i} x={80 + i * 130} y={292} fill="#ffffff20" fontSize="8" textAnchor="middle">{p.split("\n")[1]}</text>
      ))}

      {/* Price path */}
      <polyline
        points="40,200 80,195 120,190 160,185 200,180 240,170 280,165 320,160 355,130 370,100 385,85 395,105 410,130 440,160 480,175 520,185 560,190 600,195 650,200 690,205"
        fill="none" stroke="#d4af37" strokeWidth="2.5" strokeLinejoin="round" />

      {/* Stop level */}
      <line x1="40" y1="160" x2="720" y2="160" stroke="#ff444450" strokeWidth="1.5" strokeDasharray="6,3" />
      <text x="48" y="155" fill="#ff4444" fontSize="9">STOP LEVEL (prior high)</text>

      {/* Sweep wick */}
      <line x1="385" y1="85" x2="385" y2="60" stroke="#ff4444" strokeWidth="2" />
      <circle cx="385" cy="60" r="5" fill="#ff000060" />
      <circle cx="385" cy="60" r="9" fill="none" stroke="#ff0000" strokeWidth="1" opacity="0.5" />
      <text x="385" y="48" fill="#ff4444" fontSize="10" textAnchor="middle" fontWeight="bold">STOPS HIT</text>
      <text x="385" y="36" fill="#ff444470" fontSize="9" textAnchor="middle">buy stops triggered</text>

      {/* Reversal zone */}
      <rect x="370" y="55" width="60" height="80" fill="#ff000008" stroke="#ff000020" rx="3" />

      {/* OI/Delta annotations */}
      <text x="320" y="145" fill="#00ff99" fontSize="8">CVD rising ↑</text>
      <text x="320" y="155" fill="#00ff9960" fontSize="8">price approaching</text>

      <text x="390" y="145" fill="#ff4444" fontSize="8">CVD peaks</text>
      <text x="390" y="155" fill="#ff444460" fontSize="8">then rolls</text>

      <text x="460" y="145" fill="#00ccff" fontSize="8">CVD declining</text>
      <text x="460" y="155" fill="#00ccff60" fontSize="8">sellers emerge</text>

      {/* Annotations */}
      <text x="80" y="175" fill="#ffffff40" fontSize="9" textAnchor="middle">Retail longs</text>
      <text x="80" y="185" fill="#ffffff30" fontSize="9" textAnchor="middle">stop here</text>

      <text x="500" y="170" fill="#00ff99" fontSize="9" textAnchor="middle">Smart money</text>
      <text x="500" y="180" fill="#00ff9970" fontSize="9" textAnchor="middle">expansion down</text>
    </svg>
  );
}

function SweepVsBreakDiagram() {
  return (
    <svg viewBox="0 0 720 300" className="w-full" style={{ fontFamily: "monospace" }}>
      <rect width="720" height="300" fill="#07070f" rx="8" />

      {/* Left - Sweep */}
      <rect x="10" y="30" width="340" height="260" fill="#ff000008" rx="6" stroke="#ff000025" strokeWidth="1" />
      <text x="180" y="50" fill="#ff4444" fontSize="12" textAnchor="middle" fontWeight="bold" letterSpacing="1">SWEEP (False Break)</text>

      <line x1="30" y1="130" x2="340" y2="130" stroke="#ff444450" strokeWidth="1.5" strokeDasharray="5,3" />
      <text x="38" y="122" fill="#ff444470" fontSize="9">RESISTANCE</text>

      <polyline points="30,220 80,210 130,200 180,185 230,165 260,140 280,110 295,85 305,120 315,145 325,170 335,200 345,225"
        fill="none" stroke="#d4af37" strokeWidth="2.5" strokeLinejoin="round" />

      {/* Sweep labels */}
      <text x="295" y="75" fill="#ff4444" fontSize="10" textAnchor="middle">WICK</text>
      <text x="295" y="63" fill="#ff444470" fontSize="9" textAnchor="middle">above resistance</text>
      <line x1="295" y1="78" x2="295" y2="88" stroke="#ff4444" strokeWidth="1" />

      <text x="335" y="195" fill="#d4af37" fontSize="9" textAnchor="middle">Back inside</text>
      <text x="335" y="207" fill="#d4af3780" fontSize="9" textAnchor="middle">range fast</text>

      {/* Sweep characteristics */}
      <text x="60" y="250" fill="#ff6060" fontSize="9">• Spike above, close BELOW resistance</text>
      <text x="60" y="263" fill="#ff6060" fontSize="9">• Volume spike then dies</text>
      <text x="60" y="276" fill="#ff6060" fontSize="9">• CVD peaks then rolls immediately</text>

      {/* Right - Real Break */}
      <rect x="370" y="30" width="340" height="260" fill="#00ff9908" rx="6" stroke="#00ff9925" strokeWidth="1" />
      <text x="540" y="50" fill="#00ff99" fontSize="12" textAnchor="middle" fontWeight="bold" letterSpacing="1">REAL BREAK</text>

      <line x1="390" y1="130" x2="700" y2="130" stroke="#00ff9950" strokeWidth="1.5" strokeDasharray="5,3" />
      <text x="398" y="122" fill="#00ff9970" fontSize="9">RESISTANCE</text>

      <polyline points="390,220 430,210 470,195 510,175 545,150 570,125 595,105 620,85 640,70 660,60 680,55 700,50"
        fill="none" stroke="#00ff99" strokeWidth="2.5" strokeLinejoin="round" />

      {/* Break labels */}
      <text x="600" y="100" fill="#00ff99" fontSize="10" textAnchor="middle">HOLDS</text>
      <text x="600" y="88" fill="#00ff9970" fontSize="9" textAnchor="middle">above resistance</text>

      {/* Break characteristics */}
      <text x="420" y="250" fill="#60ff90" fontSize="9">• Candle CLOSES above resistance</text>
      <text x="420" y="263" fill="#60ff90" fontSize="9">• Volume stays elevated</text>
      <text x="420" y="276" fill="#60ff90" fontSize="9">• CVD continues rising / holds</text>
    </svg>
  );
}

function EqualHighsLowsDiagram() {
  return (
    <svg viewBox="0 0 720 280" className="w-full" style={{ fontFamily: "monospace" }}>
      <rect width="720" height="280" fill="#07070f" rx="8" />
      <text x="360" y="22" fill="#ffffff50" fontSize="11" textAnchor="middle" letterSpacing="2">EQUAL HIGHS / LOWS — STOP CLUSTERS</text>

      {/* Equal highs */}
      <line x1="80" y1="100" x2="680" y2="100" stroke="#ff444440" strokeWidth="1" strokeDasharray="4,4" />
      <text x="360" y="90" fill="#ff4444" fontSize="10" textAnchor="middle" letterSpacing="1">EQUAL HIGHS — BUY STOPS RESTING ABOVE</text>

      {/* Equal lows */}
      <line x1="80" y1="200" x2="680" y2="200" stroke="#00ff9940" strokeWidth="1" strokeDasharray="4,4" />
      <text x="360" y="220" fill="#00ff99" fontSize="10" textAnchor="middle" letterSpacing="1">EQUAL LOWS — SELL STOPS RESTING BELOW</text>

      {/* Candles forming equal highs */}
      {[100, 200, 320, 450, 560].map((x, i) => (
        <g key={i}>
          <rect x={x - 8} y={105} width="16" height={30 + i * 8} fill="#d4af3730" stroke="#d4af3760" strokeWidth="1" rx="1" />
          <line x1={x} y1={100} x2={x} y2={96} stroke="#d4af37" strokeWidth="1.5" />
          <line x1={x} y1={135 + i * 8} x2={x} y2={145 + i * 8} stroke="#d4af37" strokeWidth="1.5" />
          <circle cx={x} cy={99} r="3" fill="#ff4444" opacity="0.6" />
        </g>
      ))}

      {/* Stop annotations */}
      <text x="80" y="78" fill="#ff444480" fontSize="9">Retail longs</text>
      <text x="80" y="88" fill="#ff444460" fontSize="9">stop here</text>

      <text x="80" y="240" fill="#00ff9980" fontSize="9">Retail shorts</text>
      <text x="80" y="252" fill="#00ff9960" fontSize="9">stop here</text>

      {/* Smart money arrow */}
      <text x="620" y="68" fill="#d4af37" fontSize="9" textAnchor="middle">Smart money</text>
      <text x="620" y="78" fill="#d4af3780" fontSize="9" textAnchor="middle">sweeps here →</text>
      <text x="620" y="88" fill="#d4af3760" fontSize="9" textAnchor="middle">collects stops</text>
    </svg>
  );
}

function InternalExternalDiagram() {
  return (
    <svg viewBox="0 0 720 300" className="w-full" style={{ fontFamily: "monospace" }}>
      <rect width="720" height="300" fill="#07070f" rx="8" />
      <text x="360" y="22" fill="#ffffff50" fontSize="11" textAnchor="middle" letterSpacing="2">INTERNAL vs EXTERNAL LIQUIDITY</text>

      {/* Range box */}
      <rect x="160" y="80" width="400" height="180" fill="#ffffff05" stroke="#ffffff15" strokeWidth="1" strokeDasharray="4,4" rx="4" />
      <text x="360" y="275" fill="#ffffff30" fontSize="9" textAnchor="middle">TRADING RANGE</text>

      {/* External - BSL above range */}
      <line x1="100" y1="80" x2="620" y2="80" stroke="#ff444460" strokeWidth="1.5" strokeDasharray="5,3" />
      <text x="100" y="68" fill="#ff4444" fontSize="10" fontWeight="bold">EXTERNAL BSL</text>
      <text x="100" y="58" fill="#ff444460" fontSize="9">Range highs — buy stops above</text>

      {/* External - SSL below range */}
      <line x1="100" y1="260" x2="620" y2="260" stroke="#00ff9960" strokeWidth="1.5" strokeDasharray="5,3" />
      <text x="100" y="278" fill="#00ff99" fontSize="10" fontWeight="bold">EXTERNAL SSL</text>
      <text x="100" y="290" fill="#00ff9960" fontSize="9">Range lows — sell stops below</text>

      {/* Internal liquidity */}
      <line x1="160" y1="170" x2="560" y2="170" stroke="#8888ff60" strokeWidth="1" strokeDasharray="3,5" />
      <text x="360" y="163" fill="#8888ff" fontSize="10" textAnchor="middle">INTERNAL LIQUIDITY</text>
      <text x="360" y="153" fill="#8888ff60" fontSize="9" textAnchor="middle">Equal highs/lows within range · Swing points inside</text>

      {/* Price oscillating inside range */}
      <polyline points="160,170 210,140 260,190 310,130 360,175 410,125 460,180 510,135 560,170"
        fill="none" stroke="#d4af37" strokeWidth="2" strokeLinejoin="round" />

      {/* Equal highs inside range */}
      {[210, 310, 410].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={i === 0 ? 140 : i === 1 ? 130 : 125} r="3" fill="#ff4444" opacity="0.5" />
        </g>
      ))}

      {/* Arrows showing sweep direction */}
      <text x="630" y="84" fill="#ff4444" fontSize="12">↑</text>
      <text x="630" y="96" fill="#ff444460" fontSize="9">sweep</text>
      <text x="630" y="256" fill="#00ff99" fontSize="12">↓</text>
      <text x="630" y="268" fill="#00ff9960" fontSize="9">sweep</text>
    </svg>
  );
}

// ── CONTENT ───────────────────────────────────────────────────────────────────

function ChapterFoundation() {
  return (
    <div>
      <p className="lead-text">Liquidity is not a concept — it's a physical thing. It's the pile of stop orders sitting at predictable levels, waiting to be triggered. Understanding where that pile is and who wants to trigger it is the foundation of professional trading.</p>
      <blockquote>"The market doesn't move to find buyers and sellers. It moves to find liquidity. That's a different thing entirely."</blockquote>

      <div className="concept-grid">
        {[
          { title: "What Liquidity Actually Is", color: "#d4af37", body: "Every stop loss is a pending order. A long position with a stop below a swing low is a pending sell order sitting at that level. A short position with a stop above a swing high is a pending buy order sitting there. These pending orders ARE liquidity — they're the fuel that large operators need to fill their own positions without moving price against themselves." },
          { title: "Why Large Players Need It", color: "#00ccff", body: "Institutions move billions. You can't buy $500M of BTC without moving the market significantly against you. The solution: engineer a price move to a level where enough opposing orders exist (stops = market orders), fill your position against those orders, then let price reverse. The stops are your counterparty. This is not manipulation — it's mechanics." },
          { title: "Retail Provides the Liquidity", color: "#ff4444", body: "Retail traders are predictable. They place stops in the same places: below swing lows, above swing highs, below round numbers, behind obvious trendlines. This predictability is what makes liquidity pools foreseeable. You're not smarter than institutions. But you can learn to read where they need to go and position yourself with them — not against them." },
          { title: "Sweeps vs Genuine Moves", color: "#00ff99", body: "Not every break of a level is a sweep. Sometimes the break is real and price continues. The job is distinguishing engineered moves (sweeps designed to collect stops then reverse) from genuine breakouts (real imbalance of supply and demand driving price through a level). This single distinction separates profitable traders from everyone else." },
        ].map((c) => (
          <div key={c.title} className="concept-card" style={{ borderTop: `2px solid ${c.color}40` }}>
            <div className="concept-title" style={{ color: c.color }}>{c.title}</div>
            <div className="concept-body">{c.body}</div>
          </div>
        ))}
      </div>

      <LiquidityMapDiagram />

      <div className="key-insight">
        <span className="ki-label">THE FUNDAMENTAL TRUTH</span>
        <p>Markets move from liquidity pool to liquidity pool. Before every significant move, price almost always sweeps a nearby liquidity pool first. That sweep serves two purposes: it fills the institutional position, and it triggers the stops that fuel the move. Once you see this pattern, you cannot unsee it. It's on every chart, every timeframe, every market.</p>
      </div>
    </div>
  );
}

function ChapterTypes() {
  return (
    <div>
      <p className="lead-text">Not all liquidity is equal. Each type has a different probability of being swept, a different magnitude of reaction, and a different context. Learn to rank them before you trade them.</p>

      <EqualHighsLowsDiagram />

      <div style={{ marginTop: "1.5rem" }}>
        {[
          {
            title: "Buy Side Liquidity (BSL)", color: "#ff4444",
            desc: "Stop orders resting ABOVE price. These are: stops of short sellers, buy stop orders of breakout traders, take profit orders of longs from lower prices. BSL is the fuel for downward moves — the institution needs to buy at high prices to fill short positions, then reverse down. The sweep takes price up, collects these orders as counterparty fills, then reverses.",
            locations: ["Above swing highs (obvious and equal highs especially)", "Above resistance levels that have held multiple times", "Above round numbers ($70K, $80K, $100K)", "Above descending trendlines", "Above prior all-time highs"],
            probability: "Higher when: multiple equal highs at same level, clean obvious level, untested for long time",
          },
          {
            title: "Sell Side Liquidity (SSL)", color: "#00ff99",
            desc: "Stop orders resting BELOW price. These are: stops of long holders, sell stop orders of breakdown traders, take profit orders of shorts from higher prices. SSL is the fuel for upward moves. Institution needs to sell at low prices to fill long positions, then reverse up. The sweep takes price down, collects stops, reverses.",
            locations: ["Below swing lows (equal lows especially)", "Below support levels that have held multiple times", "Below round numbers", "Below ascending trendlines", "Below prior all-time lows or major lows"],
            probability: "Higher when: multiple equal lows at exact same level, clean obvious level, untested for weeks",
          },
          {
            title: "Internal Liquidity", color: "#8888ff",
            desc: "Liquidity pools WITHIN the current trading range or trend. These are the swing highs and lows that form within a move — short-term equal highs inside a downtrend, equal lows inside an uptrend. Internal liquidity is swept MORE frequently than external, as it's closer and requires less engineering. It's the intraday and short-term target.",
            locations: ["Swing highs/lows within a range", "Equal highs/lows between the main boundaries", "Previous session highs/lows", "Overnight highs/lows (crypto)", "Gap fills"],
            probability: "Very high — internal liq gets swept almost every session",
          },
          {
            title: "External Liquidity", color: "#d4af37",
            desc: "Liquidity pools OUTSIDE the current range — the major highs and lows that define the structure. External liquidity sweeps are less frequent but more significant. They represent the major campaign of the Composite Man. When external SSL is swept and holds — it's a Spring. When external BSL is swept and holds — it's an Upthrust.",
            locations: ["Range highs/lows (the obvious boundaries)", "Major structure highs/lows from prior weeks", "All-time highs/lows", "Previous month/quarter highs/lows"],
            probability: "Lower frequency but highest magnitude reaction when it occurs",
          },
          {
            title: "Trendline Liquidity", color: "#ffaa00",
            desc: "Stops cluster along obvious trendlines because retail traders use them as dynamic support/resistance. Long positions have stops below ascending trendlines. Short positions have stops above descending trendlines. When price breaks a trendline that 'everyone' is watching — it's often sweeping those stops before reversing back.",
            locations: ["Below uptrend lines (ascending)", "Above downtrend lines (descending)", "Along channel boundaries"],
            probability: "High — the more widely watched the trendline, the more stops behind it",
          },
          {
            title: "Old Highs / Old Lows (HTF)", color: "#00ccff",
            desc: "Weekly and monthly highs/lows are the most significant liquidity pools. They represent massive accumulations of stops from positions held for weeks or months. When price sweeps a weekly high or low — the reaction is often violent and sustained. These are the setups worth waiting weeks for.",
            locations: ["Prior week high/low", "Prior month high/low", "Quarterly highs/lows", "Annual highs/lows"],
            probability: "Lower frequency, highest magnitude, most reliable when they occur",
          },
        ].map((t) => (
          <div key={t.title} className="tool-card" style={{ borderLeft: `3px solid ${t.color}` }}>
            <div className="tool-name" style={{ color: t.color, marginBottom: 4 }}>{t.title}</div>
            <p className="tool-desc">{t.desc}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginTop: "0.75rem" }}>
              <div style={{ background: "#0a0a16", padding: "0.75rem", borderRadius: 6 }}>
                <div style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 1, color: t.color, marginBottom: 6 }}>WHERE IT FORMS</div>
                {t.locations.map((l, i) => <div key={i} style={{ fontSize: 11, color: "#888", marginBottom: 3 }}>› {l}</div>)}
              </div>
              <div style={{ background: "#0a0a16", padding: "0.75rem", borderRadius: 6 }}>
                <div style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 1, color: t.color, marginBottom: 6 }}>PROBABILITY</div>
                <div style={{ fontSize: 12, color: "#aaa", lineHeight: 1.6 }}>{t.probability}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <InternalExternalDiagram />
    </div>
  );
}

function ChapterMechanics() {
  return (
    <div>
      <p className="lead-text">Understanding the mechanics of a sweep removes the mystery. It's not random. It's a deliberate, sequential process with identifiable stages. Once you can see the stages, you can position yourself within them.</p>

      <SweepMechanicsDiagram />

      <div style={{ marginTop: "1.5rem" }}>
        {[
          { num: "01", title: "The Buildup Phase", color: "#d4af37", desc: "Price oscillates in a range, creating visible swing highs or lows. Each time price bounces from a level, more stop orders accumulate just beyond it. Equal highs mean more stops at the same level. The longer the buildup, the larger the stop cluster. This is the institution letting stops accumulate — they're building their counterparty.", tell: "Multiple touches of a level without breaking. Each touch = more stops placed. 3+ touches = significant liquidity pool." },
          { num: "02", title: "The Approach Phase", color: "#ffaa00", desc: "Price begins moving decisively toward the liquidity pool. Volume may increase. CVD trends in the direction of the move. Retail traders who aren't already positioned start chasing — adding fuel. This is the trap being set. The move toward the level looks and feels like a real breakout.", tell: "Strong momentum candles approaching the level. Retail breakout traders entering. Volume expanding. This is designed to look real." },
          { num: "03", title: "The Sweep Phase", color: "#ff4444", desc: "Price breaches the level — just enough to trigger the stops. Sometimes it's a single wick, sometimes a candle close beyond. The key: price doesn't spend time above/below the level. It spikes, collects the orders (stops triggered = market orders = instant fills for the institution), then immediately reacts.", tell: "Spike beyond the level with fast rejection. High volume on the spike bar. The spike candle often has a large wick and closes back within the prior range." },
          { num: "04", title: "The Reversal Phase", color: "#00ccff", desc: "Price reverses sharply from the sweep level. The stops that were just triggered become market orders that the institution used to build their position. Now price moves against those triggered stops — accelerating the move. This is why sweeps produce sharp reversals: the triggered stops ADD to the institutional position momentum.", tell: "Strong reversal candle after the spike. CVD reverses hard. Volume remains elevated but now in the opposite direction. This is your confirmation." },
          { num: "05", title: "The Expansion Phase", color: "#00ff99", desc: "Price expands away from the sweep level with conviction. The institution has its position, the stops have been collected, and now the market moves in the intended direction. This is the phase where the trade runs. Volume may moderate but price movement is smooth — no opposition.", tell: "Consistent directional movement away from sweep level. Pullbacks are shallow and on low volume. CVD trends with price direction." },
        ].map((s) => (
          <div key={s.num} className="step-card">
            <div className="step-number" style={{ color: s.color, borderColor: s.color + "40" }}>{s.num}</div>
            <div className="step-content">
              <div className="step-title" style={{ color: s.color }}>{s.title}</div>
              <p className="step-body">{s.desc}</p>
              <div className="event-spot" style={{ marginTop: "0.5rem" }}>
                <span className="event-spot-label">TELL:</span> {s.tell}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="key-insight">
        <span className="ki-label">WHY THE REVERSAL IS SO SHARP</span>
        <p>When stops are triggered, they become market orders that fill instantly at whatever price is available. If 1,000 long stops are hit below a swing low, those become 1,000 sell market orders. The institution is on the other side buying every single one. The moment the stop cascade exhausts itself, there are no more sellers — and the institution has a fully filled long position. Price has nowhere to go but up. The violence of the reversal is proportional to the size of the stop cluster swept.</p>
      </div>
    </div>
  );
}

function ChapterIdentification() {
  return (
    <div>
      <p className="lead-text">Identifying liquidity before it's swept is the skill. It requires systematic mapping of your chart before price reaches those levels — not reactive recognition after the sweep already happened.</p>

      <div className="law-card" style={{ borderColor: "#d4af3740" }}>
        <div className="law-header"><span className="law-title" style={{ color: "#d4af37" }}>The Mapping Process — Do This Before Every Session</span></div>
        {[
          { step: "1", title: "Start on the Weekly Chart", desc: "Identify the 2-3 most significant liquidity pools on the weekly: prior week high/low, major swing highs/lows from the past 4-8 weeks, obvious equal highs or lows. These are your macro targets. Mark them with horizontal lines. These are the most significant destinations price will seek.", color: "#d4af37" },
          { step: "2", title: "Move to Daily", desc: "Add the prior day high/low (PDH/PDL), any equal highs/lows visible on the daily, and the current session range boundaries. These are your intermediate targets for the next 1-5 days.", color: "#ffaa00" },
          { step: "3", title: "Add the 4H Structure", desc: "Mark the most recent swing highs and lows on 4H. These form internal liquidity pools. Equal highs/lows at the same price across multiple 4H candles = significant stop cluster. Note if these align with daily or weekly levels — confluence makes them high priority.", color: "#8888ff" },
          { step: "4", title: "Rank By Priority", desc: "Weekly level + Daily level + 4H level at same price = CRITICAL. Any two aligning = HIGH. Single timeframe only = MEDIUM. This ranking tells you which levels the market is most likely to target first and react from most significantly.", color: "#00ccff" },
          { step: "5", title: "Note Which Side Is Targeted", desc: "Based on the current trend and Wyckoff phase: if in accumulation → BSL above is the target (markup). If in distribution → SSL below is the target (markdown). This tells you which direction the sweep will come from and where price is ultimately going.", color: "#00ff99" },
        ].map((s) => (
          <div key={s.step} style={{ display: "flex", gap: "1rem", marginBottom: "1rem", padding: "0.75rem", background: "#0a0a14", borderRadius: 6 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${s.color}40`, color: s.color, fontSize: 13, fontWeight: "bold", fontFamily: "monospace", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.step}</div>
            <div>
              <div style={{ color: s.color, fontWeight: "bold", fontSize: 13, marginBottom: 4 }}>{s.title}</div>
              <div style={{ color: "#888", fontSize: 12, lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="table-container" style={{ marginTop: "1.25rem" }}>
        <table className="of-table">
          <thead><tr><th>Liquidity Type</th><th>How to Spot It</th><th>Priority</th><th>Notes</th></tr></thead>
          <tbody>
            {[
              ["Equal Highs (2+)", "Two or more wicks/closes at exact same level", "CRITICAL", "More touches = more stops = larger reaction"],
              ["Prior Day High/Low", "Horizontal line at PDH and PDL", "HIGH", "Most active retail stop level"],
              ["Prior Week High/Low", "Horizontal line at PWH and PWL", "CRITICAL", "Larger stop cluster, more significant reaction"],
              ["Round Numbers", "$65K, $70K, $75K, etc.", "HIGH", "Psychological clusters, always watch"],
              ["Trendline Touch Points", "Where price has bounced from a trendline 2+ times", "HIGH", "More bounces = more stops behind it"],
              ["Range High/Low", "The obvious boundaries of current consolidation", "CRITICAL", "External liquidity — major sweep target"],
              ["Single Swing High/Low (1 touch)", "One-off swing point", "MEDIUM", "Less stop accumulation, weaker reaction"],
              ["Order Block Origins", "Where a strong move originated", "MEDIUM-HIGH", "Combine with S/D zone analysis"],
            ].map((row, i) => (
              <tr key={i}>{row.map((cell, j) => (
                <td key={j} style={{ color: j === 2 ? (cell === "CRITICAL" ? "#ff4444" : cell === "HIGH" ? "#ffaa00" : "#888") : undefined }}>{cell}</td>
              ))}</tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="key-insight">
        <span className="ki-label">THE EQUAL HIGHS/LOWS RULE</span>
        <p>Equal highs or equal lows are the clearest liquidity signal on any chart. Every retail trader sees a double top or double bottom as a reversal pattern. They place their stops just beyond it. But the Composite Man sees it as a stop cluster waiting to be swept. The more "obvious" and "textbook" the double top/bottom looks, the more likely it's being engineered to collect those stops before the real move begins in the opposite direction.</p>
      </div>
    </div>
  );
}

function ChapterSweepVsBreak() {
  return (
    <div>
      <p className="lead-text">This is the most expensive distinction in trading. Getting it wrong means shorting breakouts and buying breakdowns. Getting it right means trading with the institutional flow instead of being the stop that funds their position.</p>

      <SweepVsBreakDiagram />

      <div style={{ marginTop: "1.5rem" }}>
        <div className="table-container">
          <table className="of-table">
            <thead>
              <tr>
                <th>Factor</th>
                <th style={{ color: "#ff4444" }}>SWEEP (Fade It)</th>
                <th style={{ color: "#00ff99" }}>REAL BREAK (Follow It)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Candle close", "Closes BACK inside prior range", "Closes BEYOND the level with body"],
                ["Volume behavior", "Spike on break, dies immediately after", "Stays elevated or expands further"],
                ["CVD", "Peaks then rolls over immediately", "Continues rising / holds elevated"],
                ["OI (crypto)", "Drops (stops = position closures)", "Expands (new positions opening)"],
                ["Speed of move", "Fast spike, fast reversal", "Deliberate, sustained movement"],
                ["Time spent beyond", "Seconds to minutes — fast rejection", "Holds beyond the level for multiple candles"],
                ["Retest behavior", "Returns to broken level from outside fast", "Retests from the other side (old resistance = new support)"],
                ["HTF context", "Against the HTF trend or at major S/R", "Aligned with HTF trend and structure"],
                ["Prior touches", "Level touched 3+ times — likely swept", "Fresh level, 1-2 prior touches"],
                ["Funding/Sentiment", "Extreme sentiment on one side", "Neutral to moderate — real conviction"],
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ color: "#d4af37" }}>{row[0]}</td>
                  <td style={{ color: "#ff444490" }}>{row[1]}</td>
                  <td style={{ color: "#00ff9990" }}>{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1.5rem" }}>
        <div className="law-card" style={{ borderColor: "#ff444440" }}>
          <div className="law-header"><span className="law-title" style={{ color: "#ff4444" }}>Sweep Confirmation Checklist</span></div>
          {[
            "Candle closes back within prior range ✓",
            "Volume spike on the wick only ✓",
            "CVD peaks then reverses direction ✓",
            "Price returns fast — no consolidation beyond ✓",
            "Level is obvious and heavily watched ✓",
            "Multiple equal highs/lows at this exact level ✓",
            "HTF context: S/D zone or Wyckoff event here ✓",
          ].map((item, i) => (
            <div key={i} style={{ fontSize: 12, color: "#ff444480", marginBottom: 5, display: "flex", gap: 8 }}>
              <span>›</span>{item}
            </div>
          ))}
          <div style={{ marginTop: "0.75rem", fontSize: 11, color: "#ff444450", fontFamily: "monospace" }}>3+ checks = fade the break (trade the sweep reversal)</div>
        </div>
        <div className="law-card" style={{ borderColor: "#00ff9940" }}>
          <div className="law-header"><span className="law-title" style={{ color: "#00ff99" }}>Real Break Confirmation Checklist</span></div>
          {[
            "Candle body closes beyond the level ✓",
            "Volume stays elevated after break ✓",
            "CVD continues in break direction ✓",
            "OI expanding (new positions) ✓",
            "Retest holds from other side ✓",
            "HTF trend aligned with break direction ✓",
            "Fresh level — not heavily retested ✓",
          ].map((item, i) => (
            <div key={i} style={{ fontSize: 12, color: "#00ff9980", marginBottom: 5, display: "flex", gap: 8 }}>
              <span>›</span>{item}
            </div>
          ))}
          <div style={{ marginTop: "0.75rem", fontSize: 11, color: "#00ff9950", fontFamily: "monospace" }}>3+ checks = follow the break (don't fade it)</div>
        </div>
      </div>

      <div className="key-insight" style={{ marginTop: "1.25rem" }}>
        <span className="ki-label">THE SINGLE MOST RELIABLE TELL</span>
        <p>Candle close location is the most reliable single factor. A wick that spikes beyond a level but closes back inside = sweep. A candle body that closes beyond a level = real break. This single rule, applied consistently, eliminates 70% of the ambiguity between sweeps and real breaks. Everything else is confirmation — the close is the verdict.</p>
      </div>
    </div>
  );
}

function ChapterPatterns() {
  const patterns = [
    {
      name: "Classic Stop Hunt", color: "#ff4444",
      setup: "Price approaches an obvious level (equal highs/lows, round number, prior swing). A single aggressive candle spikes through, then closes back within range. Often accompanied by news or a volatility event.",
      entry: "Short: Enter on the close of the rejection candle below the sweep high. Long: Enter on the close of the reversal candle above the sweep low.",
      stop: "Beyond the sweep wick extreme — if swept at $68,200, stop at $68,400+",
      target: "Internal liquidity on the other side of the range, then external SSL/BSL",
      notes: "Most common sweep pattern. Works best at obvious levels with multiple prior touches.",
    },
    {
      name: "Double Top / Bottom Sweep", color: "#ffaa00",
      setup: "Classic double top or double bottom forms. Retail traders position for the reversal pattern. Price sweeps the second high (double top) or second low (double bottom) on the third touch, triggering all the stops placed behind the pattern, then reverses.",
      entry: "On the third touch reversal — NOT on the second touch (that's where you get swept). Wait for the sweep of the pattern extreme, then enter on the rejection.",
      stop: "Beyond the sweep of the third touch",
      target: "Measured move from the pattern height/depth (standard technical target)",
      notes: "This is why double tops/bottoms fail so often — they're engineered to sweep the obvious stops before reversing from a different level.",
    },
    {
      name: "Trendline Sweep", color: "#8888ff",
      setup: "An obvious trendline that has been respected multiple times. Retail traders use it as dynamic support/resistance with stops placed behind it. Price breaks the trendline, triggering those stops, then immediately reclaims it.",
      entry: "On the reclaim candle — when price closes back above (ascending TL) or below (descending TL) the trendline after the sweep",
      stop: "Below the sweep low (ascending TL sweep) or above sweep high (descending TL sweep)",
      target: "Prior swing level in trend direction, then trend continuation targets",
      notes: "The more widely watched and cleanly drawn the trendline, the more reliable the sweep. Very common in trending markets.",
    },
    {
      name: "Range Expansion Sweep", color: "#00ccff",
      setup: "Price has been in a defined range for extended time. Breakout traders position on breaks of range high/low. Price breaks ONE side of the range (sweeping those stops), then immediately reverses and breaks the OTHER side of the range for the real move.",
      entry: "After the false break of one side: position in direction of the opposite boundary break",
      stop: "Beyond the false break extreme",
      target: "Other side of the range initially, then measured move beyond",
      notes: "This is the classic 'stop both sides' institutional maneuver. Price sweeps BSL, reverses, sweeps SSL, then makes the real move. Or vice versa.",
    },
    {
      name: "Asian Session Sweep (Crypto)", color: "#00ff99",
      setup: "Asian session (low volume, 00:00–08:00 UTC) creates a range. The high and low of Asian session accumulate stops. London or New York session opens and sweeps one or both sides before the real directional move begins.",
      entry: "After Asian range high/low is swept in early London session — enter in reversal direction",
      stop: "Beyond the Asian session sweep extreme",
      target: "Other side of Asian range, then session continuation",
      notes: "Extremely consistent in crypto. Track Asian session highs/lows every day. They get swept with very high frequency.",
    },
    {
      name: "Previous Day High/Low Sweep", color: "#d4af37",
      setup: "Prior day high (PDH) and prior day low (PDL) are the most widely watched levels by day traders. Massive stop clusters just beyond both. Price frequently sweeps one or both during the first 2-3 hours of the active session.",
      entry: "After sweep and rejection of PDH or PDL — enter in direction of reversal",
      stop: "Beyond the PDH/PDL sweep wick",
      target: "Opposite PDH/PDL (intraday), or continuation with trend",
      notes: "Most reliable intraday sweep setup. Check PDH and PDL every single morning. Mark them before the session opens.",
    },
  ];

  return (
    <div>
      <p className="lead-text">Six recurring sweep patterns appear across all markets and timeframes. Each has a specific signature, entry, and management approach. Specialize in two or three before adding more.</p>
      {patterns.map((p) => (
        <div key={p.name} className="event-row" style={{ borderLeft: `3px solid ${p.color}`, marginBottom: "0.75rem" }}>
          <div className="event-header">
            <span className="event-code" style={{ color: p.color, fontSize: 15 }}>{p.name}</span>
          </div>
          <p className="event-desc">{p.setup}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginTop: "0.5rem" }}>
            <div className="event-spot"><span className="event-spot-label">ENTRY:</span> {p.entry}</div>
            <div className="event-spot"><span className="event-spot-label">STOP:</span> {p.stop}</div>
            <div className="event-spot"><span className="event-spot-label">TARGET:</span> {p.target}</div>
            <div className="event-spot" style={{ borderColor: p.color + "30" }}><span className="event-spot-label" style={{ color: p.color }}>NOTE:</span> {p.notes}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ChapterOrderFlow() {
  return (
    <div>
      <p className="lead-text">Price structure identifies the sweep. Order flow confirms whether it's real. Without order flow confirmation, you're trading wicks on a chart — with it, you're trading institutional mechanics.</p>

      <div className="concept-grid">
        {[
          { title: "CVD at the Sweep Point", color: "#d4af37", body: "As price approaches a liquidity level: CVD should be trending in that direction (confirming the move looks real — retail chasing). At the sweep: CVD spikes to extreme then IMMEDIATELY reverses. That reversal of CVD while price is still at the wick extreme is your signal. The buying/selling aggression just died at the exact moment it should be strongest if the break were real." },
          { title: "OI at the Sweep", color: "#ff4444", body: "In crypto: if OI DROPS during the spike through the level, it means existing positions are being closed (stops triggered = position closures). This confirms the sweep — the level break was stop orders executing, not new positions opening. If OI rises on the break, it may be real breakout with new conviction." },
          { title: "Volume Signature", color: "#00ff99", body: "Sweep volume pattern: volume spikes aggressively on the sweep candle (stops triggering = large market orders), then drops sharply on the next candle. This volume pattern — spike then immediate collapse — is the fingerprint of a stop hunt. Real breaks maintain elevated volume over multiple candles." },
          { title: "Funding at Sweeps", color: "#00ccff", body: "In crypto: extreme positive funding before a sweep of BSL (upside) means longs are crowded. The sweep of BSL (upside) into extreme funding = longs getting stopped AND new shorts entering into the overcrowded long side. Maximum reversal fuel. Same logic for extreme negative funding before SSL sweep." },
        ].map((c) => (
          <div key={c.title} className="concept-card" style={{ borderTop: `2px solid ${c.color}40` }}>
            <div className="concept-title" style={{ color: c.color }}>{c.title}</div>
            <div className="concept-body">{c.body}</div>
          </div>
        ))}
      </div>

      <div className="table-container" style={{ marginTop: "1.25rem" }}>
        <table className="of-table">
          <thead>
            <tr><th>Order Flow Signal</th><th>At BSL Sweep (short setup)</th><th>At SSL Sweep (long setup)</th></tr>
          </thead>
          <tbody>
            {[
              ["CVD behavior", "Spikes high then rolls negative immediately", "Drops low then reverses positive immediately"],
              ["Delta on sweep candle", "Positive (buyers aggressive) then next candle negative", "Negative (sellers aggressive) then next candle positive"],
              ["OI (crypto)", "Drops — existing longs stopped out", "Drops — existing shorts stopped out"],
              ["Volume", "Spike on sweep wick, collapses after", "Spike on sweep wick, collapses after"],
              ["Funding (crypto)", "Positive extreme = more short fuel", "Negative extreme = more long fuel"],
              ["DOM", "Large bid pulled after sweep = spoof support gone", "Large ask pulled after sweep = spoof resistance gone"],
              ["Footprint", "Bearish delta on candle that closes back below", "Bullish delta on candle that closes back above"],
            ].map((row, i) => (
              <tr key={i}>
                <td style={{ color: "#d4af37" }}>{row[0]}</td>
                <td style={{ color: "#ff444490" }}>{row[1]}</td>
                <td style={{ color: "#00ff9990" }}>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="key-insight" style={{ marginTop: "1.25rem" }}>
        <span className="ki-label">THE CONFIRMATION SEQUENCE</span>
        <p>The correct order of events for a confirmed sweep trade: (1) Price arrives at pre-identified liquidity level. (2) Price spikes beyond the level — wick forms. (3) CVD peaks/troughs and IMMEDIATELY reverses direction. (4) Rejection candle closes back within range. (5) Next candle opens in reversal direction with confirming delta. Enter on step 4 or 5. Waiting for all five reduces entries but eliminates most false signals. Never enter at step 1 or 2 — that's front-running the sweep, not trading the confirmation.</p>
      </div>
    </div>
  );
}

function ChapterPairing() {
  const pairs = [
    { wyckoff: "Selling Climax (SC)", sweep: "SSL Sweep", desc: "The SC IS an SSL sweep. Price drives down to collect sell stops below prior lows, triggering panic sellers, which the institution absorbs. The SC wick is the sweep. The AR is the confirmation reversal. Same event, two frameworks.", trade: "Don't buy the SC wick. Wait for AR + ST confirmation. The Spring later is a second, smaller SSL sweep — that's your entry." },
    { wyckoff: "Spring", sweep: "Secondary SSL Sweep", desc: "The Spring is a deliberate sweep of the support (SSL zone at the bottom of the Trading Range). It's engineered to flush the final weak longs and collect remaining stops before markup. The Spring wick is the sweep. Low volume = few stops left = SSL pool nearly exhausted.", trade: "Spring = SSL sweep + low volume = highest conviction long. Enter on test. Stop below Spring wick." },
    { wyckoff: "Buying Climax (BC)", sweep: "BSL Sweep", desc: "The BC sweeps buy stops above prior highs. Retail breakout buyers all buy the new high — the institution is selling into every single one of them. The BC candle body often closes well off the wick high = sweep signature.", trade: "Don't short the BC wick. Wait for AR + ST confirmation. The UTAD later is the second BSL sweep — that's your entry." },
    { wyckoff: "Upthrust (UT/UTAD)", sweep: "Secondary BSL Sweep", desc: "The Upthrust sweeps BSL at the top of the Distribution Trading Range. Same mechanics as Spring but in reverse. Price spikes above TR resistance, collects buy stops, reverses. Bearish CVD on the rejection candle confirms.", trade: "UT = BSL sweep. Enter short on rejection candle close back below resistance. Stop above UT wick." },
    { wyckoff: "SOS (Sign of Strength)", sweep: "BSL Collection for Markdown Setup", desc: "After the Spring, the SOS sweeps internal BSL (highs within the range) on the way up. This is not a reversal setup — it's the market clearing internal liquidity to allow the sustained markup. Expect brief pauses at internal BSL levels.", trade: "Don't fade SOS when it sweeps internal BSL. It's clearing the path upward. Stay long, add on LPS after the sweep." },
    { wyckoff: "LPS (Last Point of Support)", sweep: "Failed SSL Sweep Attempt", desc: "During Phase D, pullbacks test former resistance (now support). Any weak attempt to sweep below this level that fails immediately is a failed SSL sweep — it confirms demand is too strong. Low volume on the attempt = no stops behind it = strong.", trade: "Failed sweep attempt at LPS on low volume = add to long position. The market tried to find sell stops and couldn't — that's bullish." },
  ];

  return (
    <div>
      <p className="lead-text">Wyckoff and liquidity sweeps are the same market reality described in different languages. When you map them together, every Wyckoff event has a sweep interpretation — and every sweep has a Wyckoff context.</p>
      <div className="key-insight">
        <span className="ki-label">THE UNIFICATION PRINCIPLE</span>
        <p>Wyckoff gives you the campaign context. Liquidity sweeps give you the mechanical explanation for why each Wyckoff event occurs where it does. The Spring happens at SSL because that's where stops accumulate — Wyckoff knew this in 1910 without calling it liquidity. The Upthrust happens at BSL for the same reason. They're the same thing.</p>
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        {pairs.map((p) => (
          <div key={p.wyckoff} className="wyckoff-of-row">
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ color: "#d4af37", fontFamily: "monospace", fontSize: 12, fontWeight: "bold" }}>{p.wyckoff}</div>
              <div style={{ color: "#ff4444", fontFamily: "monospace", fontSize: 11 }}>= {p.sweep}</div>
            </div>
            <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>
              <div style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 1, color: "#555", marginBottom: 4 }}>EXPLANATION</div>
              {p.desc}
            </div>
            <div style={{ fontSize: 12, color: "#aaa", lineHeight: 1.6 }}>
              <div style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 1, color: "#d4af37", marginBottom: 4 }}>TRADE</div>
              {p.trade}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChapterSDZ() {
  return (
    <div>
      <p className="lead-text">Supply/demand zones mark WHERE imbalances happened. Liquidity sweeps explain WHY price moves to those zones. Together they define the highest-probability trade locations on any chart.</p>

      {[
        {
          title: "Demand Zone + SSL Sweep", color: "#00ff99",
          desc: "A demand zone sits below current price (prior bullish imbalance). SSL (sell stops) accumulates at obvious lows near or within that zone. When price sweeps the SSL INTO the demand zone, you have the most powerful long setup possible: the stop hunt engineered to fill the institutional long position exactly where prior demand was established.",
          setup: "Price drops into demand zone → sweeps SSL (equal lows or prior low) → rejection candle forms → CVD reverses bullish",
          entry: "On the rejection candle close back above the swept level",
          stop: "Below the sweep wick (below the demand zone)",
          why: "Two institutional signals confirm simultaneously: the original demand zone buyers defending their level, AND stop hunt mechanics providing fresh fuel for the rally.",
        },
        {
          title: "Supply Zone + BSL Sweep", color: "#ff4444",
          desc: "Mirror image. A supply zone sits above current price (prior bearish imbalance). BSL (buy stops) accumulates at obvious highs near or within the supply zone. When price sweeps the BSL INTO the supply zone, the institution fills their short exactly where prior supply was established.",
          setup: "Price rallies into supply zone → sweeps BSL (equal highs or prior high) → rejection candle forms → CVD reverses bearish",
          entry: "On the rejection candle close back below the swept level",
          stop: "Above the sweep wick (above the supply zone)",
          why: "Original supply zone sellers re-entering, PLUS fresh short fuel from stopped-out breakout buyers = maximum downside pressure.",
        },
        {
          title: "Zone Consumption vs Zone Defense", color: "#ffaa00",
          desc: "Not every zone lasts forever. Each time a zone is tested, some orders within it get filled — the zone weakens. A zone tested and held once = strong. Tested twice = moderate. Tested three or more times = likely exhausted, don't trade it. Combine this with sweep analysis: a third sweep of the same SSL level with decreasing reaction each time = zone consumed = don't long there.",
          setup: "Track how many times a zone has been tested and what the reaction was each time",
          entry: "Only trade zones on first or second test. Third test = skip or reverse bias",
          stop: "N/A — this is a filtering rule not an entry",
          why: "Every test fills more orders from the zone. By the third test there are no significant orders left — it will break, not hold.",
        },
        {
          title: "Zone + Sweep = Refined Entry", color: "#00ccff",
          desc: "Using both together resolves the entry problem that both frameworks have individually. S/D zones tell you where to watch but not exactly when to enter (zone can be wide). Sweeps tell you the stop hunt happened but not if this is the right zone. Combined: wait for the sweep to occur at the zone, then enter on confirmation.",
          setup: "Mark zone. Wait for price to arrive. Wait for sweep of obvious level within or near zone. Enter on reversal.",
          entry: "The sweep rejection candle closing back within the zone = entry trigger",
          stop: "Beyond the sweep wick — tighter than a zone-only entry",
          why: "The sweep gives you a specific price point (the wick extreme) for your stop — much tighter than stopping below the whole zone.",
        },
      ].map((item) => (
        <div key={item.title} className="event-row" style={{ borderLeft: `3px solid ${item.color}`, marginBottom: "1rem" }}>
          <div className="event-header"><span className="event-code" style={{ color: item.color, fontSize: 15 }}>{item.title}</span></div>
          <p className="event-desc">{item.desc}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginTop: "0.5rem" }}>
            <div className="event-spot"><span className="event-spot-label">SETUP:</span> {item.setup}</div>
            <div className="event-spot"><span className="event-spot-label">ENTRY:</span> {item.entry}</div>
            <div className="event-spot"><span className="event-spot-label">STOP:</span> {item.stop}</div>
            <div className="event-spot" style={{ borderColor: item.color + "30" }}><span className="event-spot-label" style={{ color: item.color }}>WHY IT WORKS:</span> {item.why}</div>
          </div>
        </div>
      ))}

      <div className="key-insight">
        <span className="ki-label">THE TRIPLE CONFLUENCE SETUP</span>
        <p>When you have: (1) a fresh S/D zone, (2) an obvious liquidity pool (equal highs/lows or round number) at or near the zone, and (3) order flow confirmation (CVD reversal, OI drop, rejection candle) at the sweep — you have a triple confluence setup. These are rare. When they appear, they deserve your maximum allowable position size. The rest of the time you're trading with one or two of these — reduce size accordingly.</p>
      </div>
    </div>
  );
}

function ChapterEntries() {
  return (
    <div>
      <p className="lead-text">Three entry approaches for sweep setups — each with a different risk/reward profile. Know all three. Use each in the right context.</p>

      {[
        {
          num: "Entry A", title: "Aggressive — On The Wick (Limit Order)", color: "#ffaa00",
          desc: "Place a limit order AT the liquidity level BEFORE price arrives. You're anticipating the sweep will occur and reversefrom exactly that level. Lowest risk, highest reward — but lowest certainty.",
          when: "Use when: level is CRITICAL confluence (weekly + daily + zone), equal highs/lows at exact level, you have strong HTF context, you're comfortable with higher failure rate.",
          trigger: "Pre-placed limit at the liquidity level",
          stop: "Fixed distance beyond the level (e.g., 0.5% beyond for crypto)",
          target: "Internal liquidity on the opposite side, then full structural target",
          rr: "5:1 to 10:1+ if it works. Fails 40-50% — the level might not hold.",
          size: "Maximum 0.5–1% risk — you're anticipating, not confirming",
          risk: "Price can run straight through the level without sweeping. Your limit fills and keeps going against you.",
        },
        {
          num: "Entry B", title: "Standard — On The Rejection Candle", color: "#00ff99",
          desc: "Wait for price to sweep the level AND the rejection candle to CLOSE back within the prior range. Enter on the close of that candle or the open of the next. This is the primary sweep entry.",
          when: "Use when: any sweep setup with clear rejection candle, CVD confirming, OI dropping (crypto). This is your default entry for all sweep setups.",
          trigger: "Close of rejection candle back inside range after sweep",
          stop: "Just beyond the sweep wick extreme (not the zone — the wick)",
          target: "Internal liquidity first (40-50%), then full structural target (runner)",
          rr: "3:1 to 6:1 typically — better certainty than Entry A",
          size: "Full conviction size (1.5–2.5% risk) when 3+ confluences align",
          risk: "Second push through the level can stop you out. Candle close can be far from wick — stop is wider than Entry A.",
        },
        {
          num: "Entry C", title: "Conservative — On The Retest", color: "#00ccff",
          desc: "After the sweep and initial reversal, wait for price to return and RETEST the swept level from the other side. This is the highest certainty entry — the level has already proved itself. You sacrifice reward for near-certainty.",
          when: "Use when: you missed the sweep entry, the level is a major one you really want to trade, or the initial reversal move was too fast to enter safely.",
          trigger: "Pullback to swept level from reversal side, on low volume",
          stop: "Just beyond the original sweep wick",
          target: "Continuation of the reversal move — same targets as Entry B",
          rr: "2:1 to 4:1 — tighter because you entered later with less room",
          size: "1–2% risk — high certainty but smaller reward justifies slightly smaller size",
          risk: "Sometimes the retest never comes and you miss the entire move. Level might not hold on retest.",
        },
      ].map((e) => (
        <div key={e.num} className="entry-card" style={{ marginBottom: "1rem" }}>
          <div className="entry-header">
            <span className="entry-num">{e.num}</span>
            <span style={{ color: e.color, fontFamily: "monospace", fontSize: 11 }}>R:R {e.rr.split(" ")[0]}</span>
          </div>
          <div className="entry-title" style={{ color: e.color }}>{e.title}</div>
          <p className="entry-desc">{e.desc}</p>
          <div style={{ fontSize: 12, color: "#888", background: "#0a0a14", padding: "0.5rem 0.75rem", borderRadius: 5, marginBottom: "0.75rem" }}>
            <span style={{ color: "#d4af37", fontFamily: "monospace", fontSize: 10, letterSpacing: 1, marginRight: 6 }}>WHEN TO USE:</span>{e.when}
          </div>
          <div className="entry-details">
            <div className="entry-detail"><span className="ed-label">TRIGGER:</span> {e.trigger}</div>
            <div className="entry-detail"><span className="ed-label">STOP:</span> {e.stop}</div>
            <div className="entry-detail"><span className="ed-label">TARGET:</span> {e.target}</div>
            <div className="entry-detail"><span className="ed-label">R:R:</span> {e.rr}</div>
            <div className="entry-detail"><span className="ed-label" style={{ color: "#00ff99" }}>SIZE:</span> {e.size}</div>
            <div className="entry-detail" style={{ color: "#ff444480" }}><span className="ed-label">RISK:</span> {e.risk}</div>
          </div>
        </div>
      ))}

      <div className="law-card" style={{ borderColor: "#d4af3740", marginTop: "1.25rem" }}>
        <div className="law-header"><span className="law-title" style={{ color: "#d4af37" }}>Target Selection — Internal Then External</span></div>
        <p className="law-body">After entering a sweep reversal, targets follow a logical sequence:</p>
        <div className="table-container">
          <table className="of-table">
            <thead><tr><th>Target</th><th>Description</th><th>Action</th></tr></thead>
            <tbody>
              {[
                ["T1 (40% position)", "First internal liquidity pool in direction of trade", "Take partial — lock in profit, remove pressure"],
                ["T2 (35% position)", "Opposite side of range or next major structure", "Take second partial — trail stop to breakeven"],
                ["Runner (25%)", "External liquidity on higher timeframe", "Trail using structure, let it run"],
                ["Stop adjustment", "Move to breakeven after T1 hit", "Eliminates risk on remaining position"],
                ["Exit rule", "If CVD diverges against trade at T1/T2 level", "Exit full position — order flow says done"],
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

function ChapterCheatsheet() {
  return (
    <div>
      <p className="lead-text">Reference this before every session. Map your liquidity before price reaches it — not after.</p>

      <div className="cs-section">
        <div className="cs-title" style={{ color: "#d4af37" }}>PRE-SESSION LIQUIDITY MAP CHECKLIST</div>
        {[
          { label: "Mark prior week high/low (PWH/PWL)", color: "#ff4444" },
          { label: "Mark prior day high/low (PDH/PDL)", color: "#ff4444" },
          { label: "Mark equal highs/lows on 4H chart", color: "#ffaa00" },
          { label: "Mark equal highs/lows on 1H chart", color: "#ffaa00" },
          { label: "Mark any obvious round numbers near price", color: "#8888ff" },
          { label: "Mark current range high/low (if in range)", color: "#00ccff" },
          { label: "Mark overnight/Asian session high/low", color: "#00ff99" },
          { label: "Identify which side has MORE stops (BSL vs SSL)", color: "#d4af37" },
          { label: "Check HTF Wyckoff phase — which liquidity is target?", color: "#d4af37" },
          { label: "Check current funding — which side is crowded?", color: "#d4af37" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: "0.75rem", padding: "0.55rem 0.75rem", background: "#0c0c1a", borderRadius: 4, marginBottom: 3, alignItems: "center" }}>
            <div style={{ width: 14, height: 14, border: `1px solid ${item.color}50`, borderRadius: 3, flexShrink: 0 }} />
            <span style={{ color: "#999", fontSize: 12 }}>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="cs-section" style={{ marginTop: "1.25rem" }}>
        <div className="cs-title" style={{ color: "#ff4444" }}>SWEEP CONFIRMATION — REAL-TIME CHECKLIST</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <div style={{ color: "#00ff99", fontSize: 11, fontFamily: "monospace", letterSpacing: 1, marginBottom: "0.75rem" }}>SSL SWEEP → LONG SETUP</div>
            {["Price wicked below obvious low/equal lows", "Candle closed BACK ABOVE the swept level", "CVD made lower low then reversed upward", "OI dropped during the sweep (stops closed)", "Volume spiked on sweep, declining now", "Rejection candle delta is positive", "HTF context: accumulation / demand zone here"].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                <div style={{ width: 13, height: 13, border: "1px solid #00ff9940", borderRadius: 3, flexShrink: 0, marginTop: 1 }} />
                <span style={{ color: "#888", fontSize: 11 }}>{item}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: "#ff4444", fontSize: 11, fontFamily: "monospace", letterSpacing: 1, marginBottom: "0.75rem" }}>BSL SWEEP → SHORT SETUP</div>
            {["Price wicked above obvious high/equal highs", "Candle closed BACK BELOW the swept level", "CVD made higher high then reversed downward", "OI dropped during the sweep (stops closed)", "Volume spiked on sweep, declining now", "Rejection candle delta is negative", "HTF context: distribution / supply zone here"].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                <div style={{ width: 13, height: 13, border: "1px solid #ff444440", borderRadius: 3, flexShrink: 0, marginTop: 1 }} />
                <span style={{ color: "#888", fontSize: 11 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cs-section" style={{ marginTop: "1.25rem" }}>
        <div className="cs-title" style={{ color: "#00ccff" }}>QUICK REFERENCE TABLE</div>
        <div className="table-container">
          <table className="of-table">
            <thead><tr><th>Scenario</th><th>What It Is</th><th>Action</th></tr></thead>
            <tbody>
              {[
                ["Wick above equal highs + close below", "BSL sweep", "Short on close, stop above wick"],
                ["Wick below equal lows + close above", "SSL sweep", "Long on close, stop below wick"],
                ["Break above + holds + volume expands", "Real breakout", "Long — don't fade it"],
                ["Break below + holds + volume expands", "Real breakdown", "Short — don't fade it"],
                ["Third touch of same level + weak reaction", "Zone exhaustion", "Skip it or reverse bias"],
                ["Asian session low swept in London open", "Asia range SSL sweep", "Long on rejection — consistent setup"],
                ["PDH swept in first hour + rejection", "Prior day BSL sweep", "Short on rejection candle"],
                ["Spring wick + low volume test", "Wyckoff Spring = SSL sweep", "Long on test — best accumulation entry"],
                ["UTAD wick + CVD bearish reversal", "Wyckoff UT = BSL sweep", "Short on rejection — best distribution entry"],
                ["Price sweeps both sides of range same day", "Double sweep", "Trade direction of second sweep reversal"],
              ].map((row, i) => (
                <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="key-insight" style={{ marginTop: "1.25rem" }}>
        <span className="ki-label">THE DECISION TREE</span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginTop: "0.75rem" }}>
          {[
            { q: "Is there a prior trend before this level?", a: "No → skip, no context for sweep direction" },
            { q: "Is this an obvious, widely-watched level?", a: "No → less stop accumulation, lower probability" },
            { q: "Did the candle close back inside range?", a: "No → might be real break, don't fade yet" },
            { q: "Did CVD reverse at the sweep?", a: "No → no order flow confirmation, reduce size or skip" },
            { q: "Did OI drop during the sweep (crypto)?", a: "No → stops not being triggered, suspicious" },
            { q: "Is R:R minimum 2.5:1 from entry to stop?", a: "No → skip this specific entry, wait for retest" },
          ].map((item, i) => (
            <div key={i} style={{ background: "#0c0c1a", padding: "0.75rem", borderRadius: 6, border: "1px solid #1a1a2a" }}>
              <div style={{ color: "#666", fontSize: 11, marginBottom: 4 }}>Q: {item.q}</div>
              <div style={{ color: "#d4af37", fontSize: 11, fontWeight: "bold" }}>{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChapterMistakes() {
  const mistakes = [
    { title: "Fading Every Break of Every Level", severity: "CRITICAL", desc: "Seeing a break of any support or resistance and immediately calling it a sweep. Not every break is a sweep. Real breakouts happen. If you automatically fade every break, you'll consistently be short in bull markets and long in bear markets — exactly wrong.", fix: "Apply the sweep confirmation checklist every time. Candle close location is the most important filter. No body close back inside range = don't fade. Non-negotiable." },
    { title: "Not Pre-Marking Liquidity Before the Session", severity: "CRITICAL", desc: "Identifying liquidity in real-time as price is already sweeping it. By the time you recognize the sweep, the entry candle has already closed. You chase, enter late, get a poor R:R, and the trade doesn't work from a bad entry. This mistake compounds daily.", fix: "Liquidity mapping is pre-session work, done before the market opens. PDH/PDL, equal highs/lows, prior week levels, Asian session range — all marked before you touch a single trade." },
    { title: "Entering ON the Sweep Wick (Not After Confirmation)", severity: "HIGH", desc: "Price hits your pre-marked level and you immediately enter long/short because 'the sweep is happening.' The sweep might not be done. Price can keep going through your level, extending the wick or breaking through entirely. Your stop gets hit and then price reverses without you.", fix: "Wait for the candle to CLOSE. The close is the verdict. A wick reaching your level is interesting. A candle closing back inside the range after the wick is your entry signal." },
    { title: "Using the Same Stop for All Entry Types", severity: "HIGH", desc: "Entry A (limit at level) and Entry B (rejection candle) have different stop placements. If you use Entry B stop sizing for Entry A, your stop is too wide. If you use Entry A stop sizing for Entry B, your stop is too tight. Each entry type has specific stop logic.", fix: "Entry A stop = fixed distance beyond level. Entry B stop = beyond sweep wick. Entry C stop = beyond original sweep wick. Always match the stop to the entry type, not to a standard percentage." },
    { title: "Trading the Third or Fourth Test of a Level", severity: "HIGH", desc: "A level that has been swept/tested three or more times is likely exhausted — the stops behind it have already been collected in prior sweeps. The fourth 'sweep' might just be a real break because there are no more stops to collect.", fix: "Track how many times each level has been tested. First sweep = maximum stops. Second test/sweep = reduced stops. Third+ = likely exhausted, skip or reverse bias to expect a break through." },
    { title: "Ignoring the HTF Trend", severity: "HIGH", desc: "Taking long trades on every SSL sweep regardless of the macro trend. In a strong downtrend, SSL sweeps produce small bounces, not reversals. The sweep happened, the bounce occurs, then price continues lower. You made 1R when the real trade was short the bounce.", fix: "Only trade sweep reversals in the direction of the HTF trend, or at major external liquidity where a full trend reversal is plausible. Counter-trend sweep trades require significantly reduced size and tighter targets." },
    { title: "Confusing Internal and External Liquidity Targets", severity: "MEDIUM", desc: "Taking a full-size position on an internal liquidity sweep expecting an external liquidity target move. Internal sweeps produce smaller reactions — they're within the range, not at its boundaries. Sizing up expecting a major move from a minor sweep = oversized risk for the actual potential.", fix: "Internal sweep = smaller target (other side of range or next internal level). External sweep = larger target (full structural move). Match position size and targets to the TYPE of liquidity being swept." },
    { title: "Not Accounting for the Funding Rate in Crypto Sweeps", severity: "MEDIUM", desc: "Taking a long on an SSL sweep when funding is extremely positive (longs crowded). You're buying into a market where longs are already crowded — the sweep might produce a bounce but the underlying crowded positioning means any bounce is likely to be sold into hard.", fix: "Check funding before every sweep trade in crypto. SSL sweep + negative funding = maximum bullish setup. SSL sweep + positive extreme funding = caution, the bounce will likely be sold. Size down or skip." },
  ];
  const sc = { CRITICAL: "#ff0000", HIGH: "#ff4444", MEDIUM: "#ffaa00" };
  return (
    <div>
      <p className="lead-text">Liquidity sweep trading has specific failure modes. Each one below represents money reliably lost until the pattern is recognized and corrected.</p>
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

export default function SweepsBook() {
  const [active, setActive] = useState("foundation");
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(true);
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.scrollTop = 0; }, [active]);
  const current = CHAPTERS.find((c) => c.id === active);
  const idx = CHAPTERS.findIndex((c) => c.id === active);

  const content = {
    foundation: <ChapterFoundation />, types: <ChapterTypes />, mechanics: <ChapterMechanics />,
    identification: <ChapterIdentification />, sweepvbreak: <ChapterSweepVsBreak />,
    patterns: <ChapterPatterns />, orderflow: <ChapterOrderFlow />, pairing: <ChapterPairing />,
    sdz: <ChapterSDZ />, entries: <ChapterEntries />, cheatsheet: <ChapterCheatsheet />,
    mistakes: <ChapterMistakes />,
  };

  const tagColors = { FOUNDATION: "#d4af37", MECHANICS: "#ff4444", PATTERNS: "#8888ff", SYSTEMS: "#00ccff", EXECUTION: "#00ff99", REFERENCE: "#ffaa00" };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#06060d", color: "#e0e0e0", fontFamily: "'Georgia', serif", overflow: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #080810; } ::-webkit-scrollbar-thumb { background: #1e1e38; border-radius: 3px; }
        .lead-text { font-size: 15px; line-height: 1.85; color: #b0b0c0; margin-bottom: 1.5rem; border-left: 2px solid #ff444440; padding-left: 1rem; }
        blockquote { border-left: 3px solid #ff4444; padding: 1rem 1.5rem; background: #0e0c0c; margin: 1.5rem 0; border-radius: 0 8px 8px 0; font-style: italic; color: #ff8080; font-size: 15px; }
        .concept-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 1.5rem 0; }
        .concept-card { background: #0c0b18; border: 1px solid #1a1828; border-radius: 8px; padding: 1.25rem; }
        .concept-title { font-size: 13px; font-weight: bold; margin-bottom: 0.5rem; font-family: monospace; letter-spacing: 0.5px; }
        .concept-body { font-size: 13px; color: #888; line-height: 1.7; }
        .key-insight { background: linear-gradient(135deg, #0e0c10, #10101c); border: 1px solid #ff444420; border-radius: 8px; padding: 1.25rem 1.5rem; margin: 1.5rem 0; }
        .ki-label { font-size: 10px; font-family: monospace; letter-spacing: 2px; color: #ff4444; background: #ff444415; padding: 3px 8px; border-radius: 3px; display: inline-block; margin-bottom: 0.75rem; }
        .key-insight p { font-size: 13px; color: #aaa; line-height: 1.7; }
        .law-card { background: #0c0b18; border: 1px solid #1a1828; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.25rem; }
        .law-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .law-title { font-size: 15px; font-weight: bold; font-family: monospace; }
        .table-container { overflow-x: auto; margin: 1rem 0; }
        .of-table { width: 100%; border-collapse: collapse; font-size: 12px; }
        .of-table th { background: #0e0c14; color: #ff4444; font-family: monospace; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid #2a2040; }
        .of-table td { padding: 0.6rem 1rem; border-bottom: 1px solid #120f1c; color: #999; vertical-align: top; }
        .of-table tr:hover td { background: #0c0a18; }
        .tool-card { background: #0a0918; border-radius: 0 10px 10px 0; padding: 1.5rem; margin-bottom: 1.25rem; }
        .tool-name { font-size: 16px; font-weight: bold; font-family: monospace; }
        .tool-desc { font-size: 13px; color: #999; line-height: 1.7; margin-bottom: 1rem; }
        .event-row { padding: 1.25rem; background: #0a0918; border-radius: 0 8px 8px 0; }
        .event-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }
        .event-code { font-size: 14px; font-weight: bold; font-family: monospace; }
        .event-desc { font-size: 13px; color: #999; line-height: 1.6; margin-bottom: 0.5rem; }
        .event-spot { font-size: 12px; color: #666; background: #0e0c18; padding: 0.5rem 0.75rem; border-radius: 4px; border: 1px solid #18152a; }
        .event-spot-label { color: #ff4444; font-family: monospace; font-size: 10px; letter-spacing: 1px; margin-right: 6px; }
        .step-card { display: flex; gap: 1.25rem; padding: 1.25rem; background: #0a0918; border-radius: 8px; margin-bottom: 0.75rem; border: 1px solid #14102a; }
        .step-number { font-size: 22px; font-weight: bold; font-family: monospace; min-width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 8px; border: 1px solid; }
        .step-content { flex: 1; }
        .step-title { font-size: 15px; font-weight: bold; margin-bottom: 0.4rem; font-family: monospace; }
        .step-body { font-size: 13px; color: #999; line-height: 1.6; }
        .wyckoff-of-row { display: grid; grid-template-columns: 160px 1fr 1fr; gap: 1rem; padding: 1rem; background: #0a0918; border-radius: 8px; margin-bottom: 0.5rem; border: 1px solid #14102a; }
        .cs-section { background: #0a0918; border-radius: 10px; padding: 1.5rem; border: 1px solid #16122a; }
        .cs-title { font-size: 11px; font-family: monospace; letter-spacing: 2px; margin-bottom: 1.25rem; }
        .entry-card { background: #0c0b18; border: 1px solid #1c1828; border-radius: 10px; padding: 1.5rem; }
        .entry-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem; }
        .entry-num { font-size: 11px; font-family: monospace; letter-spacing: 1px; color: #555; }
        .entry-title { font-size: 16px; font-weight: bold; margin-bottom: 0.75rem; }
        .entry-desc { font-size: 13px; color: #999; line-height: 1.6; margin-bottom: 1rem; }
        .entry-details { display: flex; flex-direction: column; gap: 0.4rem; background: #080812; padding: 1rem; border-radius: 6px; }
        .entry-detail { font-size: 12px; color: #888; }
        .ed-label { font-family: monospace; font-size: 10px; letter-spacing: 1px; color: #ff4444; margin-right: 6px; }
        .trap-card { padding: 1.25rem; background: #0a0918; border-radius: 0 8px 8px 0; margin-bottom: 0.75rem; }
        .trap-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
        .trap-severity { font-size: 10px; font-family: monospace; letter-spacing: 1.5px; padding: 3px 10px; border-radius: 3px; }
        .trap-title { font-size: 14px; font-weight: bold; }
        .trap-desc { font-size: 13px; color: #999; line-height: 1.6; margin-bottom: 0.75rem; }
        .trap-fix { font-size: 12px; color: #9090bb; background: #0e0c1c; padding: 0.5rem 0.75rem; border-radius: 4px; border-left: 2px solid #5550aa; }
        .trap-fix-label { color: #9988ff; font-family: monospace; font-size: 10px; letter-spacing: 1px; margin-right: 6px; }
        @media (max-width: 640px) { .wyckoff-of-row { grid-template-columns: 1fr; } }
      `}</style>

      {/* SIDEBAR */}
      <div style={{ width: sidebar ? 270 : 0, minWidth: sidebar ? 270 : 0, transition: "all 0.3s", overflow: "hidden", background: "#07060f", borderRight: "1px solid #14102a", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "1.5rem 1.25rem 1rem", borderBottom: "1px solid #14102a" }}>
          <div style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: 3, color: "#ff4444", marginBottom: 6 }}>THE COMPLETE GUIDE TO</div>
          <div style={{ fontSize: 22, fontWeight: "bold", letterSpacing: 1, lineHeight: 1.2 }}>LIQUIDITY</div>
          <div style={{ fontSize: 22, fontWeight: "bold", letterSpacing: 1, color: "#ff4444" }}>SWEEPS</div>
          <div style={{ fontSize: 9, color: "#2a2030", marginTop: 6, fontFamily: "monospace", letterSpacing: 1 }}>BSL · SSL · STOP HUNTS · INSTITUTIONAL FLOW</div>
        </div>
        <nav style={{ flex: 1, overflowY: "auto", padding: "0.75rem 0" }}>
          {CHAPTERS.map((ch, i) => (
            <button key={ch.id} onClick={() => setActive(ch.id)} style={{
              display: "flex", alignItems: "center", gap: "0.75rem", width: "100%",
              padding: "0.6rem 1.25rem", background: active === ch.id ? "#ff444410" : "transparent",
              border: "none", borderLeft: active === ch.id ? "2px solid #ff4444" : "2px solid transparent",
              cursor: "pointer", color: active === ch.id ? "#ff6060" : "#444", textAlign: "left", transition: "all 0.15s",
            }}>
              <span style={{ fontSize: 13, minWidth: 20, textAlign: "center", opacity: 0.7 }}>{ch.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 1, color: active === ch.id ? "#ff444450" : "#1e1830", marginBottom: 1 }}>{String(i + 1).padStart(2, "0")}</div>
                  <span style={{ fontSize: 8, fontFamily: "monospace", letterSpacing: 1, color: tagColors[ch.tag] + "70", background: tagColors[ch.tag] + "12", padding: "1px 5px", borderRadius: 2 }}>{ch.tag}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: active === ch.id ? "bold" : "normal" }}>{ch.title}</div>
              </div>
            </button>
          ))}
        </nav>
        <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid #14102a", fontSize: 9, color: "#1e1830", fontFamily: "monospace" }}>
          LIQUIDITY · ALL MARKETS · ALL TIMEFRAMES
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem 1.5rem", borderBottom: "1px solid #14102a", background: "#07060f", flexShrink: 0 }}>
          <button onClick={() => navigate("/")} style={{ background: "none", border: "1px solid #1c1c2c", borderRadius: 4, color: "#555", cursor: "pointer", fontSize: 10, fontFamily: "monospace", letterSpacing: 1, padding: "4px 10px", marginRight: 4 }}>← HOME</button>
          <button onClick={() => setSidebar(!sidebar)} style={{ background: "none", border: "none", color: "#333", cursor: "pointer", fontSize: 18 }}>
            {sidebar ? "⊟" : "⊞"}
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: 11, color: "#2a2040", fontFamily: "monospace" }}>
            <span>SWEEPS</span><span style={{ color: "#14102a" }}>›</span>
            <span style={{ color: "#ff6060" }}>{current?.title}</span>
            <span style={{ fontSize: 8, color: tagColors[current?.tag] + "80", background: tagColors[current?.tag] + "10", padding: "1px 6px", borderRadius: 2, fontFamily: "monospace", letterSpacing: 1, marginLeft: 4 }}>{current?.tag}</span>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem" }}>
            {["PREV", "NEXT"].map((dir) => {
              const t = dir === "PREV" ? CHAPTERS[idx - 1] : CHAPTERS[idx + 1];
              return <button key={dir} onClick={() => t && setActive(t.id)} disabled={!t} style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 1, padding: "4px 12px", background: "none", border: "1px solid #1c1828", borderRadius: 4, color: t ? "#555" : "#1e1a2a", cursor: t ? "pointer" : "default" }}>{dir}</button>;
            })}
          </div>
        </div>

        <div ref={ref} style={{ flex: 1, overflowY: "auto", padding: "2rem 2.5rem" }}>
          <div style={{ marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid #14102a" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: 8 }}>
              <div style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 3, color: "#ff4444" }}>CHAPTER {String(idx + 1).padStart(2, "0")}</div>
              <span style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: 1, color: tagColors[current?.tag], background: tagColors[current?.tag] + "15", padding: "2px 8px", borderRadius: 3 }}>{current?.tag}</span>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: "bold", letterSpacing: 0.5 }}>{current?.title}</h1>
            <div style={{ height: 2, width: 60, background: "linear-gradient(90deg, #ff4444, transparent)", borderRadius: 2, marginTop: 12 }} />
          </div>

          {content[active]}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid #14102a" }}>
            {[CHAPTERS[idx - 1], CHAPTERS[idx + 1]].map((ch, i) => ch ? (
              <button key={i} onClick={() => setActive(ch.id)} style={{
                background: "#0c0b18", border: `1px solid ${i === 1 ? "#ff444430" : "#1c1828"}`,
                borderRadius: 8, padding: "0.75rem 1.25rem", cursor: "pointer",
                color: i === 1 ? "#ff6060" : "#777", fontSize: 12, fontFamily: "monospace",
                textAlign: i === 0 ? "left" : "right",
              }}>
                <div style={{ fontSize: 10, letterSpacing: 1, marginBottom: 3, color: i === 1 ? "#ff444460" : "#2a2040" }}>{i === 0 ? "‹ PREVIOUS" : "NEXT ›"}</div>
                {ch.title}
              </button>
            ) : <div key={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
