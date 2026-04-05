import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CHAPTERS = [
  { id: "foundation", title: "Reversals vs Continuations", icon: "◈", tag: "FOUNDATION" },
  { id: "reversal_types", title: "Types of Reversals", icon: "⟳", tag: "FOUNDATION" },
  { id: "climax", title: "Climax & Exhaustion", icon: "⚡", tag: "REVERSAL" },
  { id: "of_reversals", title: "Order Flow in Reversals", icon: "△", tag: "REVERSAL" },
  { id: "range_def", title: "What Is a Range", icon: "≡", tag: "RANGE" },
  { id: "range_of", title: "Order Flow in Ranges", icon: "▣", tag: "RANGE" },
  { id: "range_entries", title: "Range Trading Entries", icon: "◎", tag: "RANGE" },
  { id: "rotation", title: "Range Rotation Logic", icon: "⊟", tag: "RANGE" },
  { id: "breakout", title: "Breakout vs Fakeout", icon: "⊞", tag: "RANGE" },
  { id: "systems", title: "Building Systems", icon: "⌬", tag: "SYSTEMS" },
  { id: "cheatsheet", title: "Cheat Sheet", icon: "✦", tag: "REFERENCE" },
  { id: "mistakes", title: "Critical Mistakes", icon: "⚠", tag: "REFERENCE" },
];

// ── DIAGRAMS ─────────────────────────────────────────────────────────────────

function ReversalTypesDiagram() {
  return (
    <svg viewBox="0 0 720 280" className="w-full" style={{ fontFamily: "monospace" }}>
      <rect width="720" height="280" fill="#07070f" rx="8" />
      <text x="360" y="20" fill="#ffffff40" fontSize="10" textAnchor="middle" letterSpacing="2">THREE REVERSAL STRUCTURES</text>

      {/* V-Reversal */}
      <text x="120" y="42" fill="#ff4444" fontSize="10" textAnchor="middle" letterSpacing="1">V-REVERSAL</text>
      <polyline points="40,220 120,80 200,220" fill="none" stroke="#ff4444" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="120" cy="80" r="5" fill="#ff4444" />
      <text x="120" y="240" fill="#ff444460" fontSize="9" textAnchor="middle">Fast, violent</text>
      <text x="120" y="252" fill="#ff444440" fontSize="9" textAnchor="middle">Climax driven</text>

      {/* Rounded Reversal */}
      <text x="360" y="42" fill="#ffaa00" fontSize="10" textAnchor="middle" letterSpacing="1">ROUNDED / COMPLEX</text>
      <path d="M 270,80 Q 290,200 360,220 Q 430,200 450,80" fill="none" stroke="#ffaa00" strokeWidth="2.5" />
      <text x="360" y="240" fill="#ffaa0060" fontSize="9" textAnchor="middle">Slow, structural</text>
      <text x="360" y="252" fill="#ffaa0040" fontSize="9" textAnchor="middle">Wyckoff schematic</text>

      {/* Failed Breakout Reversal */}
      <text x="600" y="42" fill="#00ff99" fontSize="10" textAnchor="middle" letterSpacing="1">FAILED BREAKOUT</text>
      <polyline points="520,180 560,160 580,140 590,100 600,80 610,105 620,145 640,175 660,185 680,188" fill="none" stroke="#00ff99" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="520" y1="140" x2="690" y2="140" stroke="#00ff9940" strokeWidth="1" strokeDasharray="4,3" />
      <text x="600" y="240" fill="#00ff9960" fontSize="9" textAnchor="middle">Sweep driven</text>
      <text x="600" y="252" fill="#00ff9940" fontSize="9" textAnchor="middle">Liquidity hunt</text>

      {/* Dividers */}
      <line x1="235" y1="35" x2="235" y2="265" stroke="#ffffff10" strokeWidth="1" />
      <line x1="485" y1="35" x2="485" y2="265" stroke="#ffffff10" strokeWidth="1" />
    </svg>
  );
}

function ClimaxDiagram() {
  return (
    <svg viewBox="0 0 720 300" className="w-full" style={{ fontFamily: "monospace" }}>
      <rect width="720" height="300" fill="#07070f" rx="8" />
      <text x="360" y="20" fill="#ffffff40" fontSize="10" textAnchor="middle" letterSpacing="2">CLIMAX REVERSAL — ORDER FLOW SIGNATURE</text>

      {/* Price */}
      <polyline points="40,220 100,200 160,175 200,155 240,130 275,105 300,85 315,65 320,50 330,75 345,105 370,140 410,175 460,200 520,215 580,222 640,225 700,228"
        fill="none" stroke="#d4af37" strokeWidth="2.5" strokeLinejoin="round" />

      {/* Climax point */}
      <circle cx="320" cy="50" r="7" fill="#ff000050" />
      <circle cx="320" cy="50" r="12" fill="none" stroke="#ff0000" strokeWidth="1.5" opacity="0.4" />
      <text x="320" y="36" fill="#ff4444" fontSize="10" textAnchor="middle" fontWeight="bold">CLIMAX</text>

      {/* Volume bars */}
      {[
        { x: 40, h: 20, c: "#d4af37" }, { x: 75, h: 25, c: "#d4af37" },
        { x: 110, h: 30, c: "#ffaa00" }, { x: 145, h: 35, c: "#ffaa00" },
        { x: 180, h: 40, c: "#ff8800" }, { x: 215, h: 50, c: "#ff6600" },
        { x: 250, h: 65, c: "#ff4400" }, { x: 285, h: 90, c: "#ff0000" },
        { x: 315, h: 80, c: "#ff000090" }, // climax bar
        { x: 345, h: 30, c: "#00ff99" }, { x: 380, h: 20, c: "#00ff99" },
        { x: 415, h: 18, c: "#00ff99" }, { x: 450, h: 15, c: "#00ff99" },
        { x: 485, h: 14, c: "#00ff9970" }, { x: 520, h: 12, c: "#00ff9960" },
      ].map((b, i) => (
        <rect key={i} x={b.x} y={290 - b.h} width="28" height={b.h} fill={b.c} opacity="0.5" rx="2" />
      ))}

      {/* CVD line */}
      <polyline points="40,195 100,185 160,172 200,158 250,138 285,112 315,88 340,110 370,135 410,160 460,178 520,188 580,192 640,195"
        fill="none" stroke="#00ccff" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.8" />

      {/* Annotations */}
      <text x="200" y="270" fill="#ff8800" fontSize="9" textAnchor="middle">Volume expanding</text>
      <text x="200" y="280" fill="#ff880060" fontSize="9" textAnchor="middle">into climax</text>

      <text x="470" y="270" fill="#00ff99" fontSize="9" textAnchor="middle">Volume collapses</text>
      <text x="470" y="280" fill="#00ff9960" fontSize="9" textAnchor="middle">post-climax</text>

      <text x="580" y="180" fill="#00ccff" fontSize="9">CVD diverging ↓</text>
      <text x="580" y="190" fill="#00ccff60" fontSize="9">while price flat</text>

      {/* Delta annotation */}
      <text x="320" y="115" fill="#ff4444" fontSize="9" textAnchor="middle">Delta reverses</text>
      <text x="320" y="127" fill="#ff444460" fontSize="9" textAnchor="middle">on climax bar</text>
    </svg>
  );
}

function RangeDiagram() {
  return (
    <svg viewBox="0 0 720 300" className="w-full" style={{ fontFamily: "monospace" }}>
      <rect width="720" height="300" fill="#07070f" rx="8" />
      <text x="360" y="20" fill="#ffffff40" fontSize="10" textAnchor="middle" letterSpacing="2">RANGE ANATOMY — ORDER FLOW ZONES</text>

      {/* Range box */}
      <rect x="60" y="70" width="600" height="180" fill="#ffffff04" stroke="#ffffff12" strokeWidth="1" rx="3" />

      {/* Range high - resistance */}
      <line x1="40" y1="70" x2="680" y2="70" stroke="#ff444460" strokeWidth="1.5" strokeDasharray="5,3" />
      <text x="48" y="62" fill="#ff4444" fontSize="10" fontWeight="bold">RANGE HIGH — BSL / RESISTANCE</text>

      {/* Range low - support */}
      <line x1="40" y1="250" x2="680" y2="250" stroke="#00ff9960" strokeWidth="1.5" strokeDasharray="5,3" />
      <text x="48" y="268" fill="#00ff99" fontSize="10" fontWeight="bold">RANGE LOW — SSL / SUPPORT</text>

      {/* POC / midpoint */}
      <line x1="40" y1="160" x2="680" y2="160" stroke="#d4af3760" strokeWidth="1" strokeDasharray="3,5" />
      <text x="48" y="155" fill="#d4af37" fontSize="9">MIDPOINT / POC</text>

      {/* VAH */}
      <line x1="40" y1="105" x2="680" y2="105" stroke="#8888ff40" strokeWidth="1" strokeDasharray="2,6" />
      <text x="600" y="100" fill="#8888ff" fontSize="9">VAH</text>

      {/* VAL */}
      <line x1="40" y1="215" x2="680" y2="215" stroke="#8888ff40" strokeWidth="1" strokeDasharray="2,6" />
      <text x="600" y="228" fill="#8888ff" fontSize="9">VAL</text>

      {/* Price oscillation */}
      <polyline points="60,160 120,110 180,195 240,85 300,170 360,220 420,100 480,185 540,75 590,160 650,225 680,160"
        fill="none" stroke="#ffffff60" strokeWidth="1.5" strokeLinejoin="round" />

      {/* Zone labels */}
      <rect x="580" y="70" width="90" height="35" fill="#ff444415" rx="3" />
      <text x="625" y="85" fill="#ff4444" fontSize="9" textAnchor="middle">SELL ZONE</text>
      <text x="625" y="97" fill="#ff444470" fontSize="8" textAnchor="middle">Fade rallies</text>

      <rect x="580" y="250" width="90" height="35" fill="#00ff9915" rx="3" />
      <text x="625" y="262" fill="#00ff99" fontSize="9" textAnchor="middle">BUY ZONE</text>
      <text x="625" y="274" fill="#00ff9970" fontSize="8" textAnchor="middle">Fade drops</text>
    </svg>
  );
}

function RotationDiagram() {
  return (
    <svg viewBox="0 0 720 280" className="w-full" style={{ fontFamily: "monospace" }}>
      <rect width="720" height="280" fill="#07070f" rx="8" />
      <text x="360" y="20" fill="#ffffff40" fontSize="10" textAnchor="middle" letterSpacing="2">RANGE ROTATION — CVD BEHAVIOR</text>

      {/* Price path - rotating */}
      <polyline points="40,220 120,200 200,100 280,180 360,90 440,200 520,100 600,195 680,105"
        fill="none" stroke="#d4af37" strokeWidth="2.5" strokeLinejoin="round" />

      {/* CVD - oscillating */}
      <polyline points="40,200 120,185 200,130 280,170 360,120 440,175 520,125 600,170 680,130"
        fill="none" stroke="#00ccff" strokeWidth="1.5" strokeDasharray="5,3" />

      {/* Range boundaries */}
      <line x1="30" y1="85" x2="700" y2="85" stroke="#ff444440" strokeWidth="1" strokeDasharray="4,4" />
      <line x1="30" y1="225" x2="700" y2="225" stroke="#00ff9940" strokeWidth="1" strokeDasharray="4,4" />

      {/* Rotation annotations */}
      {[
        { x: 200, y: 100, dir: "top", label: "CVD peaks", color: "#ff4444" },
        { x: 360, y: 90, dir: "top", label: "CVD lower high", color: "#ff4444" },
        { x: 280, y: 180, dir: "bot", label: "CVD holds", color: "#00ff99" },
        { x: 440, y: 200, dir: "bot", label: "CVD higher low", color: "#00ff99" },
      ].map((a, i) => (
        <g key={i}>
          <circle cx={a.x} cy={a.y} r="4" fill={a.color} opacity="0.6" />
          <text x={a.x} y={a.dir === "top" ? a.y - 10 : a.y + 18} fill={a.color} fontSize="9" textAnchor="middle">{a.label}</text>
        </g>
      ))}

      <text x="48" y="82" fill="#ff444480" fontSize="9">RANGE HIGH</text>
      <text x="48" y="240" fill="#00ff9980" fontSize="9">RANGE LOW</text>
      <text x="640" y="250" fill="#00ccff" fontSize="9">CVD (dashed)</text>
      <text x="640" y="262" fill="#d4af37" fontSize="9">PRICE (solid)</text>

      {/* Divergence arrow at top */}
      <text x="290" y="72" fill="#ff4444" fontSize="9" textAnchor="middle">Bearish CVD div → short</text>
      <text x="450" y="248" fill="#00ff99" fontSize="9" textAnchor="middle">Bullish CVD div → long</text>
    </svg>
  );
}

function BreakoutDiagram() {
  return (
    <svg viewBox="0 0 720 280" className="w-full" style={{ fontFamily: "monospace" }}>
      <rect width="720" height="280" fill="#07070f" rx="8" />

      {/* Left panel - Fakeout */}
      <rect x="10" y="28" width="340" height="245" fill="#ff000006" rx="5" stroke="#ff000020" strokeWidth="1" />
      <text x="180" y="46" fill="#ff4444" fontSize="11" textAnchor="middle" fontWeight="bold" letterSpacing="1">FAKEOUT BREAKOUT</text>
      <line x1="25" y1="120" x2="340" y2="120" stroke="#ff444440" strokeWidth="1.5" strokeDasharray="5,3" />
      <polyline points="25,200 80,185 130,165 175,140 210,115 230,90 245,68 252,115 260,145 270,170 290,195 320,215 345,225"
        fill="none" stroke="#d4af37" strokeWidth="2.5" strokeLinejoin="round" />
      <text x="248" y="60" fill="#ff4444" fontSize="9" textAnchor="middle">Wick</text>
      <text x="248" y="50" fill="#ff444460" fontSize="9" textAnchor="middle">above</text>
      <text x="160" y="250" fill="#ff6060" fontSize="9">• OI drops on break</text>
      <text x="160" y="262" fill="#ff6060" fontSize="9">• CVD peaks → rolls</text>
      <text x="160" y="274" fill="#ff6060" fontSize="9">• Close back below level</text>

      {/* Right panel - Real breakout */}
      <rect x="370" y="28" width="340" height="245" fill="#00ff9906" rx="5" stroke="#00ff9920" strokeWidth="1" />
      <text x="540" y="46" fill="#00ff99" fontSize="11" textAnchor="middle" fontWeight="bold" letterSpacing="1">REAL BREAKOUT</text>
      <line x1="385" y1="180" x2="700" y2="180" stroke="#00ff9940" strokeWidth="1.5" strokeDasharray="5,3" />
      <polyline points="385,240 430,230 470,215 510,195 545,175 570,155 600,130 635,105 660,85 685,65 705,50"
        fill="none" stroke="#00ff99" strokeWidth="2.5" strokeLinejoin="round" />
      <text x="600" y="175" fill="#00ff99" fontSize="9">Holds above</text>
      <text x="600" y="163" fill="#00ff9960" fontSize="9">on retest</text>
      <text x="540" y="250" fill="#60ff90" fontSize="9">• OI expands on break</text>
      <text x="540" y="262" fill="#60ff90" fontSize="9">• CVD accelerates</text>
      <text x="540" y="274" fill="#60ff90" fontSize="9">• Retest holds from above</text>
    </svg>
  );
}

// ── CONTENT ───────────────────────────────────────────────────────────────────

function ChapterFoundation() {
  return (
    <div>
      <p className="lead-text">Most traders lose money trying to pick reversals and trading ranges because they use the same tool for both without understanding which market condition they're in. Order flow tells you which one you're in before price makes it obvious.</p>
      <blockquote>"The market spends 70% of its time in balance. The remaining 30% creates all the trends. Know which one you're in before you trade."</blockquote>

      <div className="concept-grid">
        {[
          { title: "What a Reversal Actually Is", color: "#ff4444", body: "A reversal is a change in the dominant order flow. Aggressive buyers were winning — now aggressive sellers are winning. Or vice versa. It's not defined by a candle pattern or an indicator crossing. It's defined by a sustained shift in which side is more aggressive and whether price is accepting value at new levels." },
          { title: "What a Range Actually Is", color: "#00ccff", body: "A range is a state of balance. Neither aggressive buyers nor aggressive sellers dominate. Price oscillates between two accepted boundaries while both sides transact at near-equal aggression. Order flow in a range is characterized by absorption at extremes — not by one side overpowering the other." },
          { title: "What a Continuation Is", color: "#00ff99", body: "A continuation is a pause within a trend — a re-accumulation or re-distribution. It looks like a range but the dominant force hasn't changed. Order flow tells you: in a continuation, the pullbacks have weak counter-trend delta and the resumption has strong trend delta. In a real range, both directions show near-equal aggression." },
          { title: "Why Getting This Wrong Is Expensive", color: "#ffaa00", body: "Shorting a range bottom because 'it looks weak' when it's actually a re-accumulation. Buying a range top because 'it's recovering' when it's actually a distribution top. Fading a trend thinking 'it's due for a reversal.' Each mistake comes from misidentifying the market condition. Order flow resolves this." },
        ].map((c) => (
          <div key={c.title} className="concept-card" style={{ borderTop: `2px solid ${c.color}40` }}>
            <div className="concept-title" style={{ color: c.color }}>{c.title}</div>
            <div className="concept-body">{c.body}</div>
          </div>
        ))}
      </div>

      <div className="law-card" style={{ borderColor: "#d4af3740" }}>
        <div className="law-header"><span className="law-title" style={{ color: "#d4af37" }}>The Three Market States — How to Identify Each</span></div>
        <div className="table-container">
          <table className="of-table">
            <thead><tr><th>State</th><th>CVD Behavior</th><th>OI</th><th>Volume Profile</th><th>Action</th></tr></thead>
            <tbody>
              {[
                ["Trending Up", "Rising consistently with price", "Expanding", "HVN migrating higher", "Trade pullbacks, don't fade"],
                ["Trending Down", "Falling consistently with price", "Expanding", "HVN migrating lower", "Trade rallies short, don't fade"],
                ["Range (Balance)", "Oscillating — peaks at range high, troughs at low", "Stable/flat", "Balanced, fat VP bell curve", "Fade extremes with OF confirm"],
                ["Reversal", "Diverging from price repeatedly", "Contracting then expanding opposite", "Old POC being left behind", "Wait for structure break confirm"],
                ["Re-accumulation", "Weak pullback delta, strong resumption delta", "Stable during pause", "New VP forming above prior", "Hold longs through it"],
                ["Re-distribution", "Weak bounce delta, strong drop delta", "Stable during pause", "New VP forming below prior", "Hold shorts through it"],
              ].map((row, i) => (
                <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="key-insight">
        <span className="ki-label">THE STATE IDENTIFICATION SEQUENCE</span>
        <p>Before every trade, identify the state: (1) Is CVD trending or oscillating? Trending = trend state. Oscillating = range state. (2) Is OI expanding or stable? Expanding with price = trend conviction. Stable = balance. (3) Is Volume Profile developing a fat bell curve (range) or migrating directionally (trend)? These three questions eliminate most misidentification errors before you look at a single candle pattern.</p>
      </div>
    </div>
  );
}

function ChapterReversalTypes() {
  return (
    <div>
      <p className="lead-text">Not all reversals look the same. Each type has a different order flow signature, a different timing, and a different management approach. Treating them identically is the first mistake.</p>
      <ReversalTypesDiagram />
      <div style={{ marginTop: "1.5rem" }}>
        {[
          {
            type: "V-Reversal", color: "#ff4444",
            desc: "A violent, fast reversal driven by a climax event. Price drops (or rises) aggressively, hits a climax with maximum volume and delta, then instantly reverses with the same aggression in the opposite direction. There's no consolidation — just a sharp point and immediate reversal.",
            ofSignature: "Extreme delta on climax bar that immediately reverses direction. CVD makes extreme reading then reverses hard. Volume spike then instant collapse. OI drops sharply (forced liquidations fueling both directions).",
            context: "Occurs at: major external liquidity sweeps, panic events (news-driven), forced liquidation cascades in crypto, SC/BC events in Wyckoff.",
            management: "Entries: only on the reversal candle, not into the climax. Stop: beyond climax extreme. Targets: generous — V-reversals often retrace 50-80% of the prior move fast. Don't scale in — it's over fast.",
            risk: "Can look like a V-reversal but then fail (second leg lower/higher). If CVD doesn't hold its reversal after 2-3 candles — exit.",
          },
          {
            type: "Rounded / Complex Reversal", color: "#ffaa00",
            desc: "A slow, multi-week structural reversal. This IS the Wyckoff distribution or accumulation schematic. Price decelerates, forms a trading range, tests the extremes multiple times, and eventually breaks in the new direction. No single dramatic candle — a series of events over time.",
            ofSignature: "CVD divergence builds over multiple swings. Each rally (in distribution) has progressively less positive delta. Each drop (in accumulation) has progressively less negative delta. OI gradually shifts from one dominant side to the other.",
            context: "Occurs at: major HTF structural levels, after extended trends, at Wyckoff Phase A and B events. Weekly and monthly charts primarily.",
            management: "Patient entries at specific events (Spring, UT). Multiple entry opportunities. Larger stops but higher conviction. Hold through noise — this takes weeks.",
            risk: "Time-consuming. Many traders exit during Phase B (the long consolidation) because 'nothing is happening.' Phase B IS the work. Stay with the structure.",
          },
          {
            type: "Failed Breakout Reversal", color: "#00ff99",
            desc: "Price breaks above resistance or below support convincingly enough to trigger breakout traders, then fails and reverses hard. This is the sweep-driven reversal. The move that 'breaks out' is actually collecting the stops of the prior range participants before reversing.",
            ofSignature: "CVD peaks on the breakout then immediately rolls. OI drops as stops trigger (not new positions opening). Volume spike on the breakout bar, collapse on the reversal. Rejection candle closes back inside prior range.",
            context: "Occurs at: range extremes, obvious S/D zones, equal highs/lows, prior major swing levels. Most common intraday reversal type.",
            management: "Entry: on rejection candle close back inside range. Stop: beyond the failed breakout wick. Target: opposite side of range. Fast-moving — don't hesitate on entry.",
            risk: "Sometimes the second break is real. If price fails to make progress back into the range within 2-3 candles — the breakout might be genuine. Exit and reassess.",
          },
        ].map((t) => (
          <div key={t.type} className="tool-card" style={{ borderLeft: `3px solid ${t.color}` }}>
            <div className="tool-name" style={{ color: t.color, fontSize: 16, marginBottom: 6 }}>{t.type}</div>
            <p className="tool-desc">{t.desc}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div className="sw-col">
                <div className="sw-label" style={{ color: t.color }}>ORDER FLOW SIGNATURE</div>
                <div style={{ color: "#888", fontSize: 12, lineHeight: 1.6 }}>{t.ofSignature}</div>
              </div>
              <div className="sw-col">
                <div className="sw-label" style={{ color: t.color }}>CONTEXT</div>
                <div style={{ color: "#888", fontSize: 12, lineHeight: 1.6 }}>{t.context}</div>
              </div>
              <div className="sw-col">
                <div className="sw-label" style={{ color: t.color }}>MANAGEMENT</div>
                <div style={{ color: "#888", fontSize: 12, lineHeight: 1.6 }}>{t.management}</div>
              </div>
              <div className="sw-col" style={{ borderColor: "#ff444420" }}>
                <div className="sw-label" style={{ color: "#ff4444" }}>RISK</div>
                <div style={{ color: "#ff444480", fontSize: 12, lineHeight: 1.6 }}>{t.risk}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChapterClimax() {
  return (
    <div>
      <p className="lead-text">Climax events are the most reliable reversal signals in order flow trading. They're not subtle — they scream. But most traders react too early (buying into the climax) or too late (missing the reversal). The sequence matters.</p>
      <ClimaxDiagram />
      <div style={{ marginTop: "1.5rem" }}>
        {[
          {
            title: "Buying Climax (Upside)", color: "#ff4444",
            desc: "Occurs at the end of an uptrend or at a major resistance. Volume expands dramatically — often the largest volume bars in the entire move. Price accelerates upward, creates wide spread candles closing near their highs. Then a single candle reverses the trend. This is the BC in Wyckoff distribution.",
            signs: ["Largest volume candles in the trend appear back-to-back", "Price accelerates — moves faster than at any prior point in the trend", "CVD makes extreme positive reading", "Funding rate spikes to extreme positive (crypto)", "OI surges (new longs piling in at the top)", "Then: rejection candle appears with negative delta"],
            trap: "Buying the climax because 'it's so strong.' The strength IS the signal to prepare for reversal, not to enter long.",
          },
          {
            title: "Selling Climax (Downside)", color: "#00ff99",
            desc: "Mirror image. End of downtrend or major support. Maximum selling aggression. Panic volume. Price drops faster than at any prior point. Then immediate reversal. This is the SC in Wyckoff accumulation. The most explosive long setups come from selling climaxes.",
            signs: ["Largest volume candles in the downtrend", "Price acceleration downward — vertical drop", "CVD makes extreme negative reading", "Funding rate spikes to extreme negative (crypto) — shorts crowded", "OI drops sharply (forced liquidations)", "Then: absorption bar or immediate reversal candle with positive delta"],
            trap: "Shorting the selling climax because 'it's breaking down.' The climax exhaustion is about to produce the most violent reversal you'll see.",
          },
          {
            title: "Exhaustion (Non-Climax)", color: "#ffaa00",
            desc: "A quieter version. Price continues trending but volume and delta progressively shrink. Each new high (in uptrend) or low (in downtrend) is made on declining aggression. No single dramatic reversal — just the trend running out of fuel. CVD makes lower highs while price makes higher highs (or vice versa).",
            signs: ["Volume shrinking on each new price extreme", "Delta declining on trend candles", "CVD diverging progressively", "Spread of candles narrowing", "Increasing frequency of candles closing against trend direction", "OI stops expanding — positions being closed not opened"],
            trap: "Expecting the violent V-reversal when you see exhaustion. Exhaustion usually produces a rounded reversal, not an instant V. Be patient.",
          },
          {
            title: "False Climax / Second Leg", color: "#8888ff",
            desc: "Price appears to climax, reverses briefly, then extends to another climax. The 'first' reversal was actually just a pause in the climax move. This is the second leg. Extremely common in crypto. The second climax on LOWER volume than the first = true exhaustion. Second climax on HIGHER volume = fuel still present.",
            signs: ["First climax reversal fails within 5-10 candles", "Price resumes original direction", "Second climax bar volume LOWER than first = true reversal near", "Second climax bar volume HIGHER than first = still has fuel"],
            trap: "Going maximum size on the first climax reversal. Scale in — first reversal attempt gets 30-40% size, add on confirmation of the second or validated reversal.",
          },
        ].map((item) => (
          <div key={item.title} className="event-row" style={{ borderLeft: `3px solid ${item.color}`, marginBottom: "0.75rem" }}>
            <div className="event-header"><span className="event-code" style={{ color: item.color, fontSize: 15 }}>{item.title}</span></div>
            <p className="event-desc">{item.desc}</p>
            <div className="sw-col" style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
              <div className="sw-label" style={{ color: item.color }}>SIGNS</div>
              {item.signs.map((s, i) => <div key={i} style={{ fontSize: 12, color: "#888", marginBottom: 3 }}>› {s}</div>)}
            </div>
            <div className="event-spot">
              <span className="event-spot-label">TRAP:</span> {item.trap}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChapterOFReversals() {
  return (
    <div>
      <p className="lead-text">Order flow doesn't just confirm reversals — it gives you the reversal signal before price structure breaks. This is the edge. You're not waiting for a lower low to confirm a downtrend ended. You see the absorption before the reversal candle prints.</p>

      <div className="law-card" style={{ borderColor: "#00ff9940" }}>
        <div className="law-header"><span className="law-title" style={{ color: "#00ff99" }}>The Reversal Confirmation Sequence</span></div>
        <p style={{ color: "#888", fontSize: 13, lineHeight: 1.7, marginBottom: "1rem" }}>This is the exact order of events in a high-probability reversal. Each step must occur before the next to be valid:</p>
        {[
          { step: "1", title: "Trend Extension Into Key Level", desc: "Price pushes to a significant structural level (prior high/low, VP level, Wyckoff event zone, S/D zone). The trend has extended — it's arrived somewhere meaningful.", color: "#d4af37" },
          { step: "2", title: "Volume Climax or Exhaustion", desc: "At the level: either volume spikes dramatically (climax) or volume collapses progressively (exhaustion). Both signal the end of aggressor fuel. Which one occurs determines the reversal type (V or rounded).", color: "#ffaa00" },
          { step: "3", title: "Delta Divergence", desc: "CVD diverges from price at the level. In an uptrend: price makes new high but CVD makes a lower high — sellers absorbing the final rally. In a downtrend: price makes new low but CVD makes a higher low — buyers absorbing the final drop.", color: "#ff4444" },
          { step: "4", title: "Absorption Bar", desc: "A candle that prints high volume but moves price very little — one side is absorbing the other completely. Wide candle that closes in the middle, or a narrow candle with unusually high volume. This is the Composite Man completing his position.", color: "#8888ff" },
          { step: "5", title: "Reversal Candle", desc: "The first candle that moves against the prior trend with strong delta. Closes well away from the extreme. Volume remains elevated. This is the confirmation candle — your entry signal for the aggressive entry.", color: "#00ccff" },
          { step: "6", title: "Structure Break Confirmation", desc: "Price breaks below/above the most recent swing point in the opposite direction. This is your conservative entry — full structural confirmation that the trend has changed. Higher certainty, worse R:R.", color: "#00ff99" },
        ].map((s) => (
          <div key={s.step} style={{ display: "flex", gap: "1rem", marginBottom: "0.75rem", padding: "0.75rem", background: "#0a0a14", borderRadius: 6 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${s.color}40`, color: s.color, fontSize: 13, fontWeight: "bold", fontFamily: "monospace", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.step}</div>
            <div>
              <div style={{ color: s.color, fontWeight: "bold", fontSize: 13, marginBottom: 4 }}>{s.title}</div>
              <div style={{ color: "#888", fontSize: 12, lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="concept-grid" style={{ marginTop: "1.25rem" }}>
        {[
          { title: "CVD Reversal Signal", color: "#00ccff", body: "The most reliable single order flow reversal signal: CVD makes an extreme reading (new high or low for the move) then immediately starts reversing direction while price is still at or near its extreme. The gap between 'CVD peak' and 'price peak' tells you the reversal is imminent. The wider the gap — the more sellers/buyers absorbed the final move." },
          { title: "OI Reversal Signal (Crypto)", color: "#ff4444", body: "In the final push before a reversal: OI expands aggressively (everyone piling in at the worst time). Then immediately at the reversal: OI collapses (forced liquidations + position closures). This OI spike then collapse is the institutional fingerprint of a manipulation-driven reversal. Find it on Coinalyze in real-time." },
          { title: "Funding Extreme Reversal Signal", color: "#ffaa00", body: "Funding reaching extreme levels (0.10%+ positive for longs, strongly negative for shorts) at a structural level = maximum fuel for reversal. The crowded side gets forced out, and their closing orders accelerate the reversal. Track 8-hour funding rate on Coinalyze. Extremes above 0.08% per 8h historically precede significant reversals." },
          { title: "Volume Profile Reversal Signal", color: "#00ff99", body: "When price pushes into a Low Volume Node (LVN) and immediately finds opposition (high volume appears at the LVN on the reversal bar) = the LVN acted as a speed bump. The thin area attracted fast movement in, then institutional orders waiting there absorbed price and reversed it. LVN + high volume absorption = reversal confirmation." },
        ].map((c) => (
          <div key={c.title} className="concept-card" style={{ borderTop: `2px solid ${c.color}40` }}>
            <div className="concept-title" style={{ color: c.color }}>{c.title}</div>
            <div className="concept-body">{c.body}</div>
          </div>
        ))}
      </div>

      <div className="key-insight">
        <span className="ki-label">THE REVERSAL ENTRY DECISION</span>
        <p>Steps 1-3 = setup is forming. Step 4 = prepare entry. Step 5 = enter (aggressive). Step 6 = enter (conservative). Never enter at steps 1-3 — the reversal hasn't happened yet. Never skip straight to step 6 — you've missed half the move and your R:R is compromised. The sweet spot is always step 5: the reversal candle with delta confirmation. That's the order flow giving you permission to act.</p>
      </div>
    </div>
  );
}

function ChapterRangeDef() {
  return (
    <div>
      <p className="lead-text">A range is not "price going sideways." It's a state of auction balance where both buyers and sellers are actively transacting at similar aggression levels. Understanding this distinction changes how you trade every element within it.</p>
      <RangeDiagram />
      <div style={{ marginTop: "1.5rem" }}>
        {[
          {
            title: "Range Anatomy", color: "#d4af37",
            elements: [
              { name: "Range High", desc: "Where sellers consistently overwhelm buyers. BSL sits above this level. This is your sell zone. Not the exact price — the zone surrounding the prior high where absorption occurs.", color: "#ff4444" },
              { name: "Range Low", desc: "Where buyers consistently overwhelm sellers. SSL sits below this level. This is your buy zone. The zone surrounding the prior low where absorption occurs.", color: "#00ff99" },
              { name: "POC / Midpoint", desc: "The price level with the most volume during the range. Also approximately the range midpoint. Price gravitates here after extremes. Acts as a magnet during range rotation.", color: "#d4af37" },
              { name: "Value Area High (VAH)", desc: "Upper boundary of where 70% of trading occurred. Price above VAH is in rejection territory — sellers likely. Below VAH = in value, buyers/sellers balanced.", color: "#8888ff" },
              { name: "Value Area Low (VAL)", desc: "Lower boundary of the value area. Price below VAL is in rejection territory — buyers likely. The VAH/VAL brackets define the fairness zone.", color: "#8888ff" },
            ],
          },
        ].map((section) => (
          <div key={section.title} className="law-card" style={{ borderColor: "#d4af3740" }}>
            <div className="law-header"><span className="law-title" style={{ color: "#d4af37" }}>{section.title}</span></div>
            {section.elements.map((el) => (
              <div key={el.name} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", padding: "0.75rem", background: "#0a0a14", borderRadius: 6 }}>
                <div style={{ width: 4, background: el.color, borderRadius: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ color: el.color, fontFamily: "monospace", fontSize: 12, fontWeight: "bold", marginBottom: 4 }}>{el.name}</div>
                  <div style={{ color: "#888", fontSize: 12, lineHeight: 1.6 }}>{el.desc}</div>
                </div>
              </div>
            ))}
          </div>
        ))}

        <div className="concept-grid">
          {[
            { title: "Range Width Matters", color: "#00ccff", body: "A narrow range (less than 5% wide on crypto) offers poor R:R for range fades — the stop is too close to the target. Wide ranges (10%+ wide) provide excellent R:R for fade trades. Only trade ranges where the width allows minimum 2.5:1 R:R from the extreme entry to the POC target." },
            { title: "Time in Range Matters", color: "#ffaa00", body: "A range less than 10 candles old on your trading timeframe is not confirmed — it might just be a pullback. A range with 20+ candles on your primary TF has enough auction history to trade. More time = more stop accumulation at extremes = more reliable fades and more explosive breakouts." },
            { title: "Volume Profile Shape", color: "#00ff99", body: "A healthy range produces a fat, bell-shaped Volume Profile — most volume near the middle (POC/midpoint), tapering toward the extremes. If the VP is D-shaped (heavy at top) or P-shaped (heavy at bottom), one side is dominant — it's not a true range, it's potential distribution or accumulation." },
            { title: "How Ranges End", color: "#ff4444", body: "Ranges end in one of three ways: (1) Breakout with real order flow (OI expands, CVD accelerates). (2) Sweep of one extreme then reversal — the stop hunt breakout. (3) Absorption failure — the extreme keeps getting tested and holds less. The order flow in the final few tests tells you which ending is coming." },
          ].map((c) => (
            <div key={c.title} className="concept-card" style={{ borderTop: `2px solid ${c.color}40` }}>
              <div className="concept-title" style={{ color: c.color }}>{c.title}</div>
              <div className="concept-body">{c.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChapterRangeOF() {
  return (
    <div>
      <p className="lead-text">Order flow inside a range is fundamentally different from trending order flow. The signals are subtler, the context is everything, and the same delta reading means something completely different at a range extreme vs at the midpoint.</p>

      <div className="table-container">
        <table className="of-table">
          <thead><tr><th>Location in Range</th><th>Signal</th><th>Interpretation</th><th>Action</th></tr></thead>
          <tbody>
            {[
              ["At range HIGH", "High volume, price holds (doesn't break)", "Sellers absorbing buyers — supply zone active", "Short — sellers defending"],
              ["At range HIGH", "High volume, price breaks through", "Demand overwhelming supply — real breakout", "Long — don't fade"],
              ["At range HIGH", "Low volume, price approaches but stalls", "No demand — buyers exhausted before reaching high", "Short — weak demand confirmed"],
              ["At range LOW", "High volume, price holds (doesn't break)", "Buyers absorbing sellers — demand zone active", "Long — buyers defending"],
              ["At range LOW", "High volume, price breaks through", "Supply overwhelming demand — real breakdown", "Short — don't fade"],
              ["At range LOW", "Low volume, price approaches but stalls", "No supply — sellers exhausted before reaching low", "Long — weak supply confirmed"],
              ["At MIDPOINT", "CVD flat, price balanced", "Fair value — no edge here", "Wait for move to extreme"],
              ["At MIDPOINT", "CVD trending in one direction", "One side gaining dominance mid-range", "Bias toward that direction for next extreme"],
              ["At VAH from above", "Low volume pullback to VAH", "Old resistance becoming support — LPS", "Long — strong structure"],
              ["At VAL from below", "Low volume rally to VAL", "Old support becoming resistance — LPSY", "Short — strong structure"],
            ].map((row, i) => (
              <tr key={i}>{row.map((cell, j) => (
                <td key={j} style={{ color: j === 3 ? (cell.startsWith("Long") ? "#00ff99" : cell.startsWith("Short") ? "#ff4444" : "#888") : undefined }}>{cell}</td>
              ))}</tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="concept-grid" style={{ marginTop: "1.25rem" }}>
        {[
          { title: "Delta Divergence at Range Extremes", color: "#00ccff", body: "The most reliable range trading signal. Price reaches range high/low AND CVD diverges: price higher high but CVD lower high at range resistance = sellers absorbing each rally harder. Price lower low but CVD higher low at range support = buyers absorbing each drop harder. This is absorption building — not trend formation." },
          { title: "Volume at Range Extremes", color: "#d4af37", body: "Declining volume on each successive test of a range extreme = fewer orders at that level = the level is weakening. Increasing volume on tests = orders being filled but level still holds = strong absorption. If volume suddenly spikes AND price breaks = the extreme absorbed all it could and failed. Real breakout — don't fade." },
          { title: "OI Behavior in Ranges", color: "#ffaa00", body: "OI typically stays stable or slightly declining during a genuine range — no strong conviction from either side. When OI starts expanding significantly within the range, it means one side is building conviction for a directional move. OI expanding up = long bias for breakout. OI expanding down = short bias for breakdown. OI expansion inside range = range ending soon." },
          { title: "CVD Oscillation Pattern", color: "#8888ff", body: "In a healthy range, CVD oscillates rhythmically: rises as price approaches range high (buyers aggressive), peaks at the high, declines as price rotates down (sellers taking over), troughs at range low, rises again. This oscillation IS the range. When the oscillation breaks — when CVD doesn't recover at a low or doesn't peak at a high — the range is breaking." },
        ].map((c) => (
          <div key={c.title} className="concept-card" style={{ borderTop: `2px solid ${c.color}40` }}>
            <div className="concept-title" style={{ color: c.color }}>{c.title}</div>
            <div className="concept-body">{c.body}</div>
          </div>
        ))}
      </div>

      <div className="key-insight">
        <span className="ki-label">THE RANGE ORDER FLOW HEALTH CHECK</span>
        <p>Every 5-10 candles while inside a range, ask: (1) Is CVD still oscillating symmetrically? (2) Is volume still declining on tests of the extremes? (3) Is OI still stable? If yes to all three — the range is healthy, keep fading extremes. If any breaks — the range is weakening. Start preparing for the breakout and reduce fade trade size. The range tells you when it's done if you're watching the right things.</p>
      </div>
    </div>
  );
}

function ChapterRangeEntries() {
  return (
    <div>
      <p className="lead-text">Range trading has the highest win rate of any strategy when done correctly — because you're always trading toward the dominant force at the most defensible location. But execution precision is non-negotiable.</p>

      {[
        {
          num: "Range Entry #1", title: "Extreme Fade with OF Confirmation", color: "#00ff99",
          when: "Primary range trading entry. Price at range extreme with order flow confirming absorption.",
          trigger: "Price at range high/low + CVD diverging + rejection candle forming + volume absorbing not breaking",
          stop: "Beyond the range extreme (not beyond the zone — beyond the most recent wick at the extreme)",
          t1: "Range midpoint / POC (40% of position)",
          t2: "Opposite range extreme (40% of position)",
          runner: "Hold 20% for potential breakout in your direction",
          rr: "2:1 to 4:1 depending on range width",
          size: "Full conviction when: 3+ tests of extreme with declining delta, CVD divergence present, volume absorbing",
          notes: "Do NOT enter if: volume spikes AND price breaks through (real breakout). Do NOT enter if: this is the 4th+ test with weaker absorption each time (zone exhausted).",
        },
        {
          num: "Range Entry #2", title: "VAH/VAL Retest Entry", color: "#8888ff",
          when: "After a breakout from one side of the range, price retests the broken VAH or VAL from the other side. More conservative but higher certainty.",
          trigger: "Range VAH broken upward → price pulls back to VAH from above on low volume → hold with positive delta",
          stop: "Below the VAH (long) or above the VAL (short) — if it fails the retest, exit",
          t1: "Prior range high or next structural level",
          t2: "Measured move above the range",
          runner: "Trail using structure",
          rr: "2:1 to 3:1 — tighter than Entry #1 due to later entry",
          size: "1.5–2% risk — good certainty but smaller range",
          notes: "VAH/VAL retests are high probability when: volume on retest is LOW (no supply/demand at the level), CVD holds flat or improves, prior breakout had volume expansion.",
        },
        {
          num: "Range Entry #3", title: "Range Midpoint Rejection", color: "#d4af37",
          when: "Price moves from one extreme toward the midpoint but stalls before reaching the opposite extreme. CVD shifts direction at the midpoint. Trade the rejection back toward the far extreme.",
          trigger: "Price reaches midpoint/POC from one side → CVD reverses direction → rejection candle at POC",
          stop: "Beyond the midpoint rejection candle extreme",
          t1: "Range extreme that price came from (the nearer boundary)",
          t2: "No T2 — this is a short-duration trade",
          runner: "No runner — exit at the extreme",
          rr: "1.5:1 to 2.5:1 — shorter trade, tighter target",
          size: "0.75–1% risk — shorter R:R warrants smaller size",
          notes: "Only valid when midpoint is also a VP POC or VAH/VAL. Generic midpoints without volume context are weaker. Bias trades of this type with the HTF trend direction.",
        },
        {
          num: "Range Entry #4", title: "Failed Sweep Re-Entry", color: "#ff4444",
          when: "Range extreme is swept (stop hunt beyond the boundary) then price reverses back into the range. The sweep provides tighter stop, better R:R than the extreme fade.",
          trigger: "Price wicks beyond range extreme, closes back inside range → rejection candle → CVD reversal",
          stop: "Beyond the sweep wick (tighter than regular extreme fade)",
          t1: "Range midpoint",
          t2: "Opposite extreme",
          runner: "If sweep was of major external liquidity — runner to next structural level beyond opposite extreme",
          rr: "3:1 to 6:1 — sweep provides very tight stop",
          size: "Full conviction 2–2.5% risk — highest probability range setup",
          notes: "This is the best range trading setup. Combines range fade logic with liquidity sweep reversal logic. The sweep confirms the extreme is defended. Entry is precisely at the close back inside range.",
        },
      ].map((e) => (
        <div key={e.num} className="entry-card" style={{ marginBottom: "1rem" }}>
          <div className="entry-header">
            <span className="entry-num">{e.num}</span>
            <span style={{ color: e.color, fontFamily: "monospace", fontSize: 11 }}>R:R {e.rr.split(" ")[0]}</span>
          </div>
          <div className="entry-title" style={{ color: e.color }}>{e.title}</div>
          <div style={{ fontSize: 12, color: "#888", background: "#0a0a14", padding: "0.5rem 0.75rem", borderRadius: 5, marginBottom: "0.75rem" }}>
            <span style={{ color: "#d4af37", fontFamily: "monospace", fontSize: 10, letterSpacing: 1, marginRight: 6 }}>WHEN:</span>{e.when}
          </div>
          <div className="entry-details">
            <div className="entry-detail"><span className="ed-label">TRIGGER:</span> {e.trigger}</div>
            <div className="entry-detail"><span className="ed-label">STOP:</span> {e.stop}</div>
            <div className="entry-detail"><span className="ed-label">T1:</span> {e.t1}</div>
            <div className="entry-detail"><span className="ed-label">T2:</span> {e.t2}</div>
            <div className="entry-detail"><span className="ed-label">R:R:</span> {e.rr}</div>
            <div className="entry-detail"><span className="ed-label" style={{ color: "#00ff99" }}>SIZE:</span> {e.size}</div>
            <div className="entry-detail" style={{ color: "#ffaa0090" }}><span className="ed-label" style={{ color: "#ffaa00" }}>NOTES:</span> {e.notes}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ChapterRotation() {
  return (
    <div>
      <p className="lead-text">Range rotation is price moving from one extreme to the other. Most traders see rotation as "chop." Professional range traders see it as a predictable sequence of order flow events they can front-run.</p>
      <RotationDiagram />
      <div style={{ marginTop: "1.5rem" }}>
        <div className="law-card" style={{ borderColor: "#00ccff40" }}>
          <div className="law-header"><span className="law-title" style={{ color: "#00ccff" }}>The Rotation Sequence</span></div>
          {[
            { phase: "Phase A — Rejection at Extreme", desc: "Price arrives at range high. Sellers absorb buyers. CVD peaks. Rejection candle prints. This is your entry signal for the short side rotation.", color: "#ff4444" },
            { phase: "Phase B — Initial Rotation", desc: "Price moves away from the high toward the midpoint. CVD declining. Volume moderate. This is not your entry — it's confirmation the rejection worked.", color: "#ffaa00" },
            { phase: "Phase C — Midpoint Decision", desc: "Price reaches the POC/midpoint. CVD flattens. Two outcomes: (1) Price pauses briefly then continues to the other extreme (most common). (2) Price stalls here and reverses back up (failed rotation — range narrowing). Volume at midpoint tells you which: low volume = pass-through, high volume = potential stall.", color: "#d4af37" },
            { phase: "Phase D — Approach to Opposite Extreme", desc: "Price accelerates toward range low. CVD reaches its trough. Volume picks up slightly. If you missed the range high entry, this is NOT where to enter — too late, too little R:R remaining.", color: "#8888ff" },
            { phase: "Phase E — Rejection at Opposite Extreme", desc: "Price arrives at range low. Buyers absorb sellers. CVD troughs then reverses. Rejection candle prints. Entry for the long side rotation. Full R:R from here to range high.", color: "#00ff99" },
          ].map((p) => (
            <div key={p.phase} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", padding: "0.75rem", background: "#0a0a14", borderRadius: 6 }}>
              <div style={{ width: 4, background: p.color, borderRadius: 2, flexShrink: 0 }} />
              <div>
                <div style={{ color: p.color, fontWeight: "bold", fontSize: 13, marginBottom: 4 }}>{p.phase}</div>
                <div style={{ color: "#888", fontSize: 12, lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="key-insight">
          <span className="ki-label">THE ROTATION TIMING TRICK</span>
          <p>The midpoint (POC) acts as a natural acceleration point within rotation. When price crosses the midpoint WITH momentum (large candle, volume expanding, CVD continuing its direction), it signals the rotation will complete to the opposite extreme. When price crosses the midpoint but immediately slows (small candles, low volume, CVD flattening), the rotation is stalling — the range may be narrowing or about to break. Watch the candles just AFTER the midpoint cross — they tell you whether to stay in the rotation trade or exit early.</p>
        </div>

        <div className="table-container">
          <table className="of-table">
            <thead><tr><th>Rotation Signal</th><th>CVD</th><th>Volume</th><th>Meaning</th></tr></thead>
            <tbody>
              {[
                ["Price at range high, CVD diverges", "Lower high", "Declining on rally", "Sellers absorbing — full rotation likely"],
                ["Price crosses midpoint with momentum", "Trending down", "Expanding", "Rotation completing — stay short"],
                ["Price stalls at midpoint", "Flattening", "Declining", "Rotation failing — range narrowing"],
                ["Price at range low, CVD diverges", "Higher low", "Declining on drop", "Buyers absorbing — full rotation back up"],
                ["Price crosses midpoint back up", "Trending up", "Moderate", "Rotation completing bullish"],
                ["Range high tested but not reached", "Lower high mid-range", "Declining", "Range shifting down — bias short"],
                ["Range low tested but not reached", "Higher low mid-range", "Declining", "Range shifting up — bias long"],
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

function ChapterBreakout() {
  return (
    <div>
      <p className="lead-text">The breakout from a range is the highest-stakes event in range trading. Get it right and you capture the expansion move. Get it wrong and you're fading a genuine breakout into a trend. Order flow resolves this with high accuracy.</p>
      <BreakoutDiagram />
      <div style={{ marginTop: "1.5rem" }}>
        <div className="concept-grid">
          {[
            { title: "The Pre-Breakout Signs", color: "#d4af37", body: "Before a genuine breakout: CVD stops oscillating and starts trending in one direction even while price is still inside the range. OI starts expanding. Volume Profile develops a P or D shape (heavy on one side). The range extremes on one side start seeing progressively less absorption — the defenders are being overwhelmed. These signs appear 3-10 candles before the actual break." },
            { title: "Fakeout Signs", color: "#ff4444", body: "Before a fakeout: no change in CVD character — it's still oscillating. OI is stable or drops on the break. Volume spikes on the break bar then immediately collapses on the next. The break candle closes near the extreme of the range, not well beyond it. These are sweeps collecting stops, not genuine demand/supply overwhelming the opposite side." },
            { title: "The Conviction Retest", color: "#00ff99", body: "After a genuine breakout, price often retests the broken range boundary from the other side. This retest on LOW volume (no supply/demand at the broken level) = the strongest confirmation of a real break. The broken resistance becomes support. CVD holds its direction during the retest. This is the safest breakout entry with the best certainty." },
            { title: "Failed Breakout Recovery", color: "#00ccff", body: "A confirmed fakeout produces the fastest range mean-reversion trade available. Price sweeps the range boundary, returns inside, then accelerates toward the opposite extreme on momentum. The sweep provided the fuel (triggered stops = market orders for your direction). Size up on the failed breakout re-entry." },
          ].map((c) => (
            <div key={c.title} className="concept-card" style={{ borderTop: `2px solid ${c.color}40` }}>
              <div className="concept-title" style={{ color: c.color }}>{c.title}</div>
              <div className="concept-body">{c.body}</div>
            </div>
          ))}
        </div>

        <div className="law-card" style={{ borderColor: "#00ff9940", marginTop: "1.25rem" }}>
          <div className="law-header"><span className="law-title" style={{ color: "#00ff99" }}>Breakout vs Fakeout — Decision Framework</span></div>
          <div className="table-container">
            <table className="of-table">
              <thead>
                <tr><th>Check</th><th style={{ color: "#ff4444" }}>Fakeout</th><th style={{ color: "#00ff99" }}>Real Breakout</th></tr>
              </thead>
              <tbody>
                {[
                  ["Candle close location", "Closes near range boundary, barely beyond", "Closes well beyond range, body committed"],
                  ["CVD on break candle", "Peaks then rolls immediately", "Continues extending in break direction"],
                  ["Volume after break", "Collapses on next candle", "Stays elevated or expands"],
                  ["OI on break", "Drops (stops closing)", "Expands (new positions opening)"],
                  ["Number of prior tests", "3+ tests of this boundary", "1-2 tests — fresh zone"],
                  ["HTF alignment", "Against HTF trend", "With HTF trend"],
                  ["Funding (crypto)", "Extreme on break side", "Neutral to moderate"],
                  ["Volume Profile shape", "Still balanced bell curve", "P or D shape — dominant side visible"],
                  ["Next candle behavior", "Immediately reverses back inside", "Holds outside range or retests from far side"],
                  ["Your action", "Fade back into range — sweep trade", "Follow breakout — don't fade"],
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

        <div className="key-insight" style={{ marginTop: "1.25rem" }}>
          <span className="ki-label">THE WAITING RULE</span>
          <p>Never trade the breakout candle itself. Wait for the candle to CLOSE. A candle that's in the process of breaking out can still close back inside the range (fakeout). A candle that has already closed outside the range is committed. That one second of patience — waiting for the close — eliminates the most common breakout trading error. Every time. Without exception.</p>
        </div>
      </div>
    </div>
  );
}

function ChapterSystems() {
  return (
    <div>
      <p className="lead-text">A complete trading system handles both states (trend and range) without requiring you to constantly decide which mode you're in. The order flow tells you. Your rules respond automatically.</p>

      <div className="law-card" style={{ borderColor: "#d4af3740" }}>
        <div className="law-header"><span className="law-title" style={{ color: "#d4af37" }}>System A — Pure Range Trading</span></div>
        <p style={{ color: "#888", fontSize: 13, lineHeight: 1.7, marginBottom: "1rem" }}>For markets in confirmed balance. Highest win rate, lowest R:R per trade.</p>
        {[
          { label: "STEP 1 — Confirm Range State", desc: "CVD oscillating symmetrically for 20+ candles. OI stable. VP developing fat bell shape. No clearly trending candle series. Mark boundaries.", color: "#d4af37" },
          { label: "STEP 2 — Map Levels", desc: "Mark range high/low. Mark VAH/VAL. Mark POC. Mark any S/D zones within range. Note where external liquidity sits (BSL above range, SSL below range).", color: "#ffaa00" },
          { label: "STEP 3 — Wait for Extreme", desc: "Do nothing at the midpoint. Only act when price approaches range high (short setup) or range low (long setup). The midpoint is dead zone.", color: "#8888ff" },
          { label: "STEP 4 — Apply OF Filter", desc: "At extreme: does CVD diverge? Does volume absorb not break? Is delta reversing? Score 0-3. Score 2+ = enter. Score 0-1 = wait for sweep confirmation.", color: "#00ccff" },
          { label: "STEP 5 — Execute", desc: "Enter on rejection candle close. Stop beyond extreme wick. T1 at POC. T2 at opposite extreme. Scale out 50% at T1, trail remainder.", color: "#00ff99" },
          { label: "STEP 6 — Exit System", desc: "If CVD stops oscillating and starts trending persistently for 5+ candles = range is ending. Close all range fade positions. Prepare for breakout system.", color: "#ff4444" },
        ].map((s) => (
          <div key={s.label} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.5rem", padding: "0.6rem 0.75rem", background: "#0a0a14", borderRadius: 5 }}>
            <div style={{ color: s.color, fontFamily: "monospace", fontSize: 10, letterSpacing: 1, minWidth: 180, flexShrink: 0 }}>{s.label}</div>
            <div style={{ color: "#888", fontSize: 12, lineHeight: 1.5 }}>{s.desc}</div>
          </div>
        ))}
      </div>

      <div className="law-card" style={{ borderColor: "#00ff9940", marginTop: "1.25rem" }}>
        <div className="law-header"><span className="law-title" style={{ color: "#00ff99" }}>System B — Reversal Trading</span></div>
        <p style={{ color: "#888", fontSize: 13, lineHeight: 1.7, marginBottom: "1rem" }}>For identifying and trading major trend reversals. Lower frequency, highest R:R.</p>
        {[
          { label: "STEP 1 — Trend Exhaustion", desc: "Identify: is CVD diverging from price for 3+ swings? Is volume declining on trend extension? Is funding extreme (crypto)? Three yes = reversal candidate.", color: "#d4af37" },
          { label: "STEP 2 — Locate Reversal Zone", desc: "Is price at a major structural level? VP POC from prior range? Wyckoff event zone? External liquidity (old high/low)? Must have at least 2 structural confluences.", color: "#ffaa00" },
          { label: "STEP 3 — Wait for Climax or Sweep", desc: "Don't enter on exhaustion alone. Wait for: climax volume event, OR liquidity sweep (Spring/UT), OR absorption bar. This is the Phase C event.", color: "#8888ff" },
          { label: "STEP 4 — Reversal Candle Confirmation", desc: "A strong candle in the new direction with delta confirmation. CVD reverses hard. This is the entry trigger. Not the climax bar — the REVERSAL bar after it.", color: "#00ccff" },
          { label: "STEP 5 — Execute with Scale", desc: "Start at 40% size on reversal bar. Add 40% on first successful structure break (first lower high in uptrend, first higher low in downtrend). Runner 20% with wide trail.", color: "#00ff99" },
          { label: "STEP 6 — Trend Confirmation", desc: "After entry, monitor: is CVD now consistently trending in new direction? Is OI expanding in new direction? If yes after 5-10 candles = committed reversal. If no = exit 50% and reassess.", color: "#ff4444" },
        ].map((s) => (
          <div key={s.label} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.5rem", padding: "0.6rem 0.75rem", background: "#0a0a14", borderRadius: 5 }}>
            <div style={{ color: s.color, fontFamily: "monospace", fontSize: 10, letterSpacing: 1, minWidth: 180, flexShrink: 0 }}>{s.label}</div>
            <div style={{ color: "#888", fontSize: 12, lineHeight: 1.5 }}>{s.desc}</div>
          </div>
        ))}
      </div>

      <div className="table-container" style={{ marginTop: "1.25rem" }}>
        <table className="of-table">
          <thead><tr><th>Metric</th><th style={{ color: "#00ccff" }}>System A (Range)</th><th style={{ color: "#00ff99" }}>System B (Reversal)</th></tr></thead>
          <tbody>
            {[
              ["Win rate (realistic)", "60–70%", "45–55%"],
              ["Average R:R", "1.5:1 to 2.5:1", "3:1 to 8:1"],
              ["Expected value per trade", "+0.4R to +1.0R", "+0.5R to +2.0R"],
              ["Trade frequency", "Multiple per week", "1–3 per month"],
              ["Best market condition", "Low volatility, balanced OI", "After extended trends, extreme funding"],
              ["Primary tools", "CVD oscillation, VP extremes, volume", "CVD divergence, climax volume, OI spike/collapse"],
              ["Stop precision", "Tight (range extreme wick)", "Moderate (climax extreme)"],
              ["Patience required", "Low — range is active", "Very high — wait for the event"],
            ].map((row, i) => (
              <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="key-insight" style={{ marginTop: "1.25rem" }}>
        <span className="ki-label">SWITCHING BETWEEN SYSTEMS</span>
        <p>You run System A until CVD breaks its oscillation pattern and starts trending. Then you switch to System B (reversal/trend mode). But you don't know if a trend will continue or reverse — so initially position for both: take the breakout in the trend direction (System A exit into System B entry) AND watch for reversal signals if price reaches a major HTF level. The order flow at that HTF level tells you which stays active.</p>
      </div>
    </div>
  );
}

function ChapterCheatsheet() {
  return (
    <div>
      <p className="lead-text">Two-page reference. Market state identification first. Trade type second. Never the other way around.</p>

      <div className="cs-section">
        <div className="cs-title" style={{ color: "#d4af37" }}>MARKET STATE IDENTIFICATION — CHECK BEFORE EVERY SESSION</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
          {[
            { state: "RANGE", color: "#00ccff", checks: ["CVD oscillating symmetrically", "OI stable / flat", "VP bell curve developing", "20+ candles at same extremes", "Volume declining on extremes tests"], action: "Use System A — Fade extremes with OF" },
            { state: "TREND", color: "#00ff99", checks: ["CVD trending consistently with price", "OI expanding in trend direction", "VP HVN migrating directionally", "Pullbacks weak (low delta counter-trend)", "Volume expanding on trend candles"], action: "Trade pullbacks in trend direction only" },
            { state: "REVERSAL", color: "#ff4444", checks: ["CVD diverging from price 3+ swings", "Volume declining on trend extension", "Price at major structural level", "Funding extreme (crypto)", "OI spike then collapse"], action: "Use System B — Wait for climax/sweep confirmation" },
          ].map((s) => (
            <div key={s.state} style={{ background: "#0c0c1a", borderRadius: 8, padding: "1rem", border: `1px solid ${s.color}25` }}>
              <div style={{ color: s.color, fontFamily: "monospace", fontSize: 12, fontWeight: "bold", marginBottom: "0.75rem", letterSpacing: 1 }}>{s.state}</div>
              {s.checks.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 6, marginBottom: 4 }}>
                  <div style={{ width: 12, height: 12, border: `1px solid ${s.color}40`, borderRadius: 2, flexShrink: 0, marginTop: 1 }} />
                  <span style={{ color: "#888", fontSize: 11 }}>{c}</span>
                </div>
              ))}
              <div style={{ marginTop: "0.75rem", color: s.color, fontSize: 11, fontFamily: "monospace", background: s.color + "10", padding: "0.4rem 0.6rem", borderRadius: 4 }}>{s.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="cs-section" style={{ marginTop: "1.25rem" }}>
        <div className="cs-title" style={{ color: "#ff4444" }}>REVERSAL SIGNALS QUICK TABLE</div>
        <div className="table-container">
          <table className="of-table">
            <thead><tr><th>Signal</th><th>Tools</th><th>Reversal Type</th><th>Entry</th></tr></thead>
            <tbody>
              {[
                ["CVD swing divergence (3 swings)", "CVD + Price", "Complex / Rounded", "Wait for climax or sweep"],
                ["Volume climax + delta reversal", "Volume + Delta", "V-Reversal", "Reversal candle after climax"],
                ["Extreme funding + price at level", "Funding + Structure", "Any", "Wait for OI collapse confirmation"],
                ["OI spike then collapse", "OI", "V-Reversal", "On the collapse candle"],
                ["Failed breakout + CVD roll", "CVD + Structure", "Failed BO Reversal", "Rejection candle close inside range"],
                ["LVN approach + high vol rejection", "VP + Volume", "Any", "On the rejection candle"],
                ["Spring + low volume test", "Price + Volume", "Complex (Wyckoff)", "On the test, stop below Spring low"],
                ["UTAD + negative delta bar", "Price + Delta", "Complex (Wyckoff)", "On the rejection candle, stop above UT"],
              ].map((row, i) => (
                <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="cs-section" style={{ marginTop: "1.25rem" }}>
        <div className="cs-title" style={{ color: "#00ccff" }}>RANGE TRADE QUICK REFERENCE</div>
        <div className="table-container">
          <table className="of-table">
            <thead><tr><th>Situation</th><th>OF Confirmation Needed</th><th>Entry</th><th>Target</th></tr></thead>
            <tbody>
              {[
                ["Price at range HIGH", "CVD diverges + rejection candle", "Short on rejection close", "POC then range LOW"],
                ["Price at range LOW", "CVD diverges + rejection candle", "Long on rejection close", "POC then range HIGH"],
                ["Range high swept + returns", "CVD reversal + close back inside", "Short on close inside range", "POC then range LOW"],
                ["Range low swept + returns", "CVD reversal + close back inside", "Long on close inside range", "POC then range HIGH"],
                ["Price at midpoint/POC", "CVD flat — no edge here", "SKIP — wait for extreme", "—"],
                ["Range narrowing (tests not reaching extremes)", "CVD oscillating in smaller range", "Reduce size, prepare for breakout", "—"],
                ["VAH retest after breakout", "Low volume retest holding", "Long on hold confirmation", "Prior range high then measured move"],
                ["VAL retest after breakdown", "Low volume retest holding", "Short on hold confirmation", "Prior range low then measured move"],
              ].map((row, i) => (
                <tr key={i}>{row.map((cell, j) => <td key={j} style={{ color: j === 2 ? (cell.startsWith("Long") ? "#00ff99" : cell.startsWith("Short") ? "#ff4444" : cell === "SKIP — wait for extreme" ? "#ffaa00" : undefined) : undefined }}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="key-insight" style={{ marginTop: "1.25rem" }}>
        <span className="ki-label">THE ONE RULE THAT SAVES ACCOUNTS</span>
        <p>If you cannot clearly identify the market state in 30 seconds — you are not in a tradeable environment. "It might be ranging or it might be trending" = NO TRADE. The edge comes from clarity of context. Ambiguous market state = zero size until the state clarifies. This single rule prevents the three most expensive trading mistakes: fading trends, chasing breakouts in ranges, and reversing into re-accumulations.</p>
      </div>
    </div>
  );
}

function ChapterMistakes() {
  const mistakes = [
    { title: "Trading the Midpoint of the Range", severity: "CRITICAL", desc: "Entering long or short at the range midpoint / POC because 'price is coming from the high' or 'recovering from the low.' The midpoint has no edge — it's where both buyers and sellers are equally comfortable transacting. R:R from the midpoint to either extreme is 1:1 at best. This is not a trade, it's a coin flip.", fix: "Only enter at range extremes (high or low) with order flow confirmation. The midpoint is where you place profit targets, not entries. If you're watching price at the POC — you're watching, not trading." },
    { title: "Fading a Trend Thinking It's a Range", severity: "CRITICAL", desc: "Price makes a new high. You call it 'resistance.' Short. Price makes another new high. You add. This is the most expensive mistake in trading. A trending market has no upper boundary — fading it is fighting the dominant order flow.", fix: "Before any fade trade, confirm the range state: CVD must be oscillating, OI must be stable, VP must be balanced. A single trending CVD reading eliminates the fade trade idea entirely. No range confirmation = no fade." },
    { title: "Entering on the First Touch of a Range Extreme", severity: "HIGH", desc: "Price approaches range high for the first time in this session. No CVD divergence yet, no absorption confirmation — you just see 'resistance' and short. The first touch often doesn't produce the reversal. The market needs to test the level before sufficient stops accumulate for the sweep/rejection.", fix: "Wait for at least one prior rejection at the level during the current session before entering on OF confirmation. Alternatively, wait for the sweep (which provides the tightest stop and highest conviction)." },
    { title: "Ignoring Volume Profile When Range Trading", severity: "HIGH", desc: "Trading a range without knowing where the POC and value area are. You set your target at the opposite extreme but there's a massive HVN in the way at 60% of the range. Your target gets hit at the HVN, price stalls there, then reverses before reaching your intended target. You gave back profit.", fix: "Map the Volume Profile of the range before every trade. Know where HVNs sit between your entry and target. Your T1 is the first major HVN or POC. Your T2 is the opposite extreme only if no significant HVN blocks it." },
    { title: "Treating All Reversal Signals the Same", severity: "HIGH", desc: "Applying maximum size to every CVD divergence signal as if they're all equal. A candle-level divergence at a random midpoint vs a 3-swing CVD divergence at a weekly structural level with extreme funding are not the same signal. Sizing them equally destroys your edge.", fix: "Score every reversal signal: 1 point each for (1) structural level, (2) CVD divergence quality (candle vs swing vs session), (3) volume climax/exhaustion, (4) funding extreme, (5) OI confirmation. Score 4-5 = full size. Score 2-3 = half. Score 1 = skip." },
    { title: "Not Adjusting for Narrowing Ranges", severity: "HIGH", desc: "A range that started at 10% width narrows to 4% width over time as each swing fails to reach the prior extreme. You continue placing the same stop (beyond the original range boundary) with the same target (original opposite extreme). Your R:R is now 0.5:1 — you're losing edge with every trade.", fix: "Recalculate your range boundaries every 10 candles. If the current swing highs/lows are consistently failing to reach the original boundaries, you're now in a narrower range. Adjust entries, stops, and targets accordingly. Narrowing range = reduce size, prepare for squeeze breakout." },
    { title: "Missing the Context Switch (Range to Trend)", severity: "MEDIUM", desc: "You're running System A (range fades) beautifully. Then CVD stops oscillating and starts trending. You miss the signal. You short the next range 'high' — but it's now a breakout continuation. You're fading a trend with range trade sizing.", fix: "Set a hard rule: if CVD trends consistently in one direction for 5+ candles without reversing, System A is OFF. No more fades. Switch to watching for pullback entries in the CVD trend direction until the oscillation pattern resumes." },
    { title: "Taking Full Size on Climax Reversals Without Scale", severity: "MEDIUM", desc: "Seeing a climax event and going full size on the first reversal candle. Climax reversals have a second-leg risk — price often makes one more push after the first reversal attempt before the real reversal. Your full-size position gets stopped on the second leg.", fix: "Climax reversals get 40-50% size on the first reversal candle. Wait for the structure break (first lower high in bull climax, first higher low in bear climax) for the remaining 50-60% of size. The structure break is the confirmation that the second leg isn't coming." },
  ];
  const sc = { CRITICAL: "#ff0000", HIGH: "#ff4444", MEDIUM: "#ffaa00" };
  return (
    <div>
      <p className="lead-text">Range trading and reversal trading attract two types of mistakes: context misidentification (trading the wrong mode) and execution errors (correct mode, wrong timing). Both are expensive in different ways.</p>
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

export default function ReversalRangeBook() {
  const [active, setActive] = useState("foundation");
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(true);
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.scrollTop = 0; }, [active]);
  const current = CHAPTERS.find((c) => c.id === active);
  const idx = CHAPTERS.findIndex((c) => c.id === active);

  const content = {
    foundation: <ChapterFoundation />, reversal_types: <ChapterReversalTypes />,
    climax: <ChapterClimax />, of_reversals: <ChapterOFReversals />,
    range_def: <ChapterRangeDef />, range_of: <ChapterRangeOF />,
    range_entries: <ChapterRangeEntries />, rotation: <ChapterRotation />,
    breakout: <ChapterBreakout />, systems: <ChapterSystems />,
    cheatsheet: <ChapterCheatsheet />, mistakes: <ChapterMistakes />,
  };

  const tagColors = { FOUNDATION: "#d4af37", REVERSAL: "#ff4444", RANGE: "#00ccff", SYSTEMS: "#00ff99", REFERENCE: "#ffaa00" };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#06060e", color: "#e0e0e0", fontFamily: "'Georgia', serif", overflow: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #080810; } ::-webkit-scrollbar-thumb { background: #20203a; border-radius: 3px; }
        .lead-text { font-size: 15px; line-height: 1.85; color: #b0b0c0; margin-bottom: 1.5rem; border-left: 2px solid #00ccff40; padding-left: 1rem; }
        blockquote { border-left: 3px solid #d4af37; padding: 1rem 1.5rem; background: #0f0e0c; margin: 1.5rem 0; border-radius: 0 8px 8px 0; font-style: italic; color: #d4af37; font-size: 15px; }
        .concept-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 1.5rem 0; }
        .concept-card { background: #0c0c1c; border: 1px solid #1a1a30; border-radius: 8px; padding: 1.25rem; }
        .concept-title { font-size: 13px; font-weight: bold; margin-bottom: 0.5rem; font-family: monospace; letter-spacing: 0.5px; }
        .concept-body { font-size: 13px; color: #888; line-height: 1.7; }
        .key-insight { background: linear-gradient(135deg, #0c0c1c, #0f1020); border: 1px solid #d4af3725; border-radius: 8px; padding: 1.25rem 1.5rem; margin: 1.5rem 0; }
        .ki-label { font-size: 10px; font-family: monospace; letter-spacing: 2px; color: #d4af37; background: #d4af3715; padding: 3px 8px; border-radius: 3px; display: inline-block; margin-bottom: 0.75rem; }
        .key-insight p { font-size: 13px; color: #aaa; line-height: 1.7; }
        .law-card { background: #0c0c1c; border: 1px solid #1a1a30; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.25rem; }
        .law-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .law-title { font-size: 15px; font-weight: bold; font-family: monospace; }
        .table-container { overflow-x: auto; margin: 1rem 0; }
        .of-table { width: 100%; border-collapse: collapse; font-size: 12px; }
        .of-table th { background: #0e0e20; color: #d4af37; font-family: monospace; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid #2a2a45; }
        .of-table td { padding: 0.6rem 1rem; border-bottom: 1px solid #12121e; color: #999; vertical-align: top; }
        .of-table tr:hover td { background: #0c0c1a; }
        .tool-card { background: #0b0b1c; border-radius: 0 10px 10px 0; padding: 1.5rem; margin-bottom: 1.25rem; }
        .tool-name { font-size: 16px; font-weight: bold; font-family: monospace; }
        .tool-desc { font-size: 13px; color: #999; line-height: 1.7; margin-bottom: 1rem; }
        .sw-col { background: #0a0a16; padding: 0.75rem; border-radius: 6px; border: 1px solid #16162a; }
        .sw-label { font-size: 10px; font-family: monospace; letter-spacing: 1px; display: block; margin-bottom: 0.5rem; }
        .event-row { padding: 1.25rem; background: #0a0a1a; border-radius: 0 8px 8px 0; margin-bottom: 0.75rem; }
        .event-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }
        .event-code { font-size: 14px; font-weight: bold; font-family: monospace; }
        .event-desc { font-size: 13px; color: #999; line-height: 1.6; margin-bottom: 0.5rem; }
        .event-spot { font-size: 12px; color: #666; background: #0e0e1c; padding: 0.5rem 0.75rem; border-radius: 4px; border: 1px solid #18182c; }
        .event-spot-label { color: #d4af37; font-family: monospace; font-size: 10px; letter-spacing: 1px; margin-right: 6px; }
        .cs-section { background: #0a0a1a; border-radius: 10px; padding: 1.5rem; border: 1px solid #16162c; }
        .cs-title { font-size: 11px; font-family: monospace; letter-spacing: 2px; margin-bottom: 1.25rem; }
        .entry-card { background: #0c0c1c; border: 1px solid #1c1c30; border-radius: 10px; padding: 1.5rem; }
        .entry-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem; }
        .entry-num { font-size: 11px; font-family: monospace; letter-spacing: 1px; color: #555; }
        .entry-title { font-size: 16px; font-weight: bold; margin-bottom: 0.75rem; }
        .entry-desc { font-size: 13px; color: #999; line-height: 1.6; margin-bottom: 1rem; }
        .entry-details { display: flex; flex-direction: column; gap: 0.4rem; background: #090914; padding: 1rem; border-radius: 6px; }
        .entry-detail { font-size: 12px; color: #888; }
        .ed-label { font-family: monospace; font-size: 10px; letter-spacing: 1px; color: #d4af37; margin-right: 6px; }
        .trap-card { padding: 1.25rem; background: #0a0a1a; border-radius: 0 8px 8px 0; margin-bottom: 0.75rem; }
        .trap-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
        .trap-severity { font-size: 10px; font-family: monospace; letter-spacing: 1.5px; padding: 3px 10px; border-radius: 3px; }
        .trap-title { font-size: 14px; font-weight: bold; }
        .trap-desc { font-size: 13px; color: #999; line-height: 1.6; margin-bottom: 0.75rem; }
        .trap-fix { font-size: 12px; color: #8888bb; background: #0e0e1e; padding: 0.5rem 0.75rem; border-radius: 4px; border-left: 2px solid #5555aa; }
        .trap-fix-label { color: #9999ff; font-family: monospace; font-size: 10px; letter-spacing: 1px; margin-right: 6px; }
        @media (max-width: 640px) { .concept-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* SIDEBAR */}
      <div style={{ width: sidebar ? 270 : 0, minWidth: sidebar ? 270 : 0, transition: "all 0.3s", overflow: "hidden", background: "#07070f", borderRight: "1px solid #141428", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "1.5rem 1.25rem 1rem", borderBottom: "1px solid #141428" }}>
          <div style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: 3, color: "#d4af37", marginBottom: 6 }}>THE COMPLETE GUIDE TO</div>
          <div style={{ fontSize: 19, fontWeight: "bold", letterSpacing: 1, lineHeight: 1.2 }}>REVERSALS &</div>
          <div style={{ fontSize: 19, fontWeight: "bold", letterSpacing: 1, color: "#00ccff" }}>RANGE TRADING</div>
          <div style={{ fontSize: 9, color: "#22223a", marginTop: 6, fontFamily: "monospace", letterSpacing: 1 }}>WITH ORDER FLOW CONFIRMATION</div>
        </div>
        <nav style={{ flex: 1, overflowY: "auto", padding: "0.75rem 0" }}>
          {CHAPTERS.map((ch, i) => (
            <button key={ch.id} onClick={() => setActive(ch.id)} style={{
              display: "flex", alignItems: "center", gap: "0.75rem", width: "100%",
              padding: "0.6rem 1.25rem", background: active === ch.id ? "#d4af3710" : "transparent",
              border: "none", borderLeft: active === ch.id ? `2px solid ${tagColors[ch.tag]}` : "2px solid transparent",
              cursor: "pointer", color: active === ch.id ? tagColors[ch.tag] : "#444", textAlign: "left", transition: "all 0.15s",
            }}>
              <span style={{ fontSize: 13, minWidth: 20, textAlign: "center", opacity: 0.7 }}>{ch.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 1, color: active === ch.id ? tagColors[ch.tag] + "50" : "#1e1e38", marginBottom: 1 }}>{String(i + 1).padStart(2, "0")}</div>
                  <span style={{ fontSize: 8, fontFamily: "monospace", letterSpacing: 1, color: tagColors[ch.tag] + "70", background: tagColors[ch.tag] + "12", padding: "1px 5px", borderRadius: 2 }}>{ch.tag}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: active === ch.id ? "bold" : "normal" }}>{ch.title}</div>
              </div>
            </button>
          ))}
        </nav>
        <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid #141428", fontSize: 9, color: "#1e1e38", fontFamily: "monospace" }}>
          REVERSALS · RANGES · ORDER FLOW
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem 1.5rem", borderBottom: "1px solid #141428", background: "#07070f", flexShrink: 0 }}>
          <button onClick={() => navigate("/")} style={{ background: "none", border: "1px solid #1c1c2c", borderRadius: 4, color: "#555", cursor: "pointer", fontSize: 10, fontFamily: "monospace", letterSpacing: 1, padding: "4px 10px", marginRight: 4 }}>← HOME</button>
          <button onClick={() => setSidebar(!sidebar)} style={{ background: "none", border: "none", color: "#333", cursor: "pointer", fontSize: 18 }}>
            {sidebar ? "⊟" : "⊞"}
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: 11, color: "#22223a", fontFamily: "monospace" }}>
            <span>REVERSALS & RANGES</span><span style={{ color: "#141428" }}>›</span>
            <span style={{ color: tagColors[current?.tag] }}>{current?.title}</span>
            <span style={{ fontSize: 8, color: tagColors[current?.tag] + "80", background: tagColors[current?.tag] + "10", padding: "1px 6px", borderRadius: 2, fontFamily: "monospace", letterSpacing: 1, marginLeft: 4 }}>{current?.tag}</span>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem" }}>
            {["PREV", "NEXT"].map((dir) => {
              const t = dir === "PREV" ? CHAPTERS[idx - 1] : CHAPTERS[idx + 1];
              return <button key={dir} onClick={() => t && setActive(t.id)} disabled={!t} style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 1, padding: "4px 12px", background: "none", border: "1px solid #1c1c2c", borderRadius: 4, color: t ? "#555" : "#1e1e38", cursor: t ? "pointer" : "default" }}>{dir}</button>;
            })}
          </div>
        </div>

        <div ref={ref} style={{ flex: 1, overflowY: "auto", padding: "2rem 2.5rem" }}>
          <div style={{ marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid #141428" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: 8 }}>
              <div style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 3, color: tagColors[current?.tag] }}>CHAPTER {String(idx + 1).padStart(2, "0")}</div>
              <span style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: 1, color: tagColors[current?.tag], background: tagColors[current?.tag] + "15", padding: "2px 8px", borderRadius: 3 }}>{current?.tag}</span>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: "bold", letterSpacing: 0.5 }}>{current?.title}</h1>
            <div style={{ height: 2, width: 60, background: `linear-gradient(90deg, ${tagColors[current?.tag]}, transparent)`, borderRadius: 2, marginTop: 12 }} />
          </div>

          {content[active]}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid #141428" }}>
            {[CHAPTERS[idx - 1], CHAPTERS[idx + 1]].map((ch, i) => ch ? (
              <button key={i} onClick={() => setActive(ch.id)} style={{
                background: "#0c0c1c", border: `1px solid ${i === 1 ? tagColors[CHAPTERS[idx + 1]?.tag] + "30" : "#1c1c30"}`,
                borderRadius: 8, padding: "0.75rem 1.25rem", cursor: "pointer",
                color: i === 1 ? tagColors[CHAPTERS[idx + 1]?.tag] : "#777", fontSize: 12, fontFamily: "monospace",
                textAlign: i === 0 ? "left" : "right",
              }}>
                <div style={{ fontSize: 10, letterSpacing: 1, marginBottom: 3, color: i === 1 ? tagColors[CHAPTERS[idx + 1]?.tag] + "60" : "#22223a" }}>{i === 0 ? "‹ PREVIOUS" : "NEXT ›"}</div>
                {ch.title}
              </button>
            ) : <div key={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
