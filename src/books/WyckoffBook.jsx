import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CHAPTERS = [
  { id: "intro", title: "The Composite Man", icon: "◈" },
  { id: "laws", title: "The Three Laws", icon: "⌬" },
  { id: "phases", title: "Market Phases", icon: "◎" },
  { id: "accumulation", title: "Accumulation", icon: "↑" },
  { id: "distribution", title: "Distribution", icon: "↓" },
  { id: "reaccum", title: "Re-Accumulation & Re-Distribution", icon: "⟳" },
  { id: "spring", title: "Springs & Upthrusts", icon: "⚡" },
  { id: "volume", title: "Volume Analysis", icon: "▣" },
  { id: "cheatsheet", title: "Cheat Sheet", icon: "✦" },
  { id: "mapping", title: "How to Map It", icon: "⊕" },
  { id: "entries", title: "Entries & Exits", icon: "◉" },
  { id: "mistakes", title: "Common Traps", icon: "⚠" },
];

// ─── SVG DIAGRAMS ────────────────────────────────────────────────────────────

function AccumulationDiagram() {
  return (
    <svg viewBox="0 0 800 380" className="w-full" style={{ fontFamily: "monospace" }}>
      {/* Background */}
      <rect width="800" height="380" fill="#0a0a0f" rx="8" />
      {/* Grid lines */}
      {[80, 140, 200, 260, 320].map((y) => (
        <line key={y} x1="60" y1={y} x2="780" y2={y} stroke="#1a1a2e" strokeWidth="1" />
      ))}

      {/* Price path */}
      <polyline
        points="70,80 130,180 160,120 210,200 250,210 290,190 330,220 370,260 400,300 440,240 480,260 510,210 550,150 590,180 620,130 660,100 700,80 740,70"
        fill="none" stroke="#d4af37" strokeWidth="2.5" strokeLinejoin="round"
      />

      {/* Phase backgrounds */}
      <rect x="60" y="60" width="130" height="280" fill="#d4af3706" rx="2" />
      <rect x="190" y="60" width="180" height="280" fill="#ffffff04" rx="2" />
      <rect x="370" y="60" width="100" height="280" fill="#00ff9906" rx="2" />
      <rect x="470" y="60" width="130" height="280" fill="#00ccff06" rx="2" />
      <rect x="600" y="60" width="175" height="280" fill="#d4af3709" rx="2" />

      {/* Phase labels */}
      {[
        { x: 75, label: "A", color: "#d4af37" },
        { x: 245, label: "B", color: "#888" },
        { x: 395, label: "C", color: "#00ff99" },
        { x: 495, label: "D", color: "#00ccff" },
        { x: 650, label: "E", color: "#d4af37" },
      ].map((p) => (
        <text key={p.label} x={p.x} y={355} fill={p.color} fontSize="14" fontWeight="bold" textAnchor="middle">{`Phase ${p.label}`}</text>
      ))}

      {/* Event markers */}
      {[
        { x: 70, y: 80, label: "PS", desc: "Preliminary Support", color: "#d4af37" },
        { x: 130, y: 180, label: "SC", desc: "Selling Climax", color: "#ff4444" },
        { x: 160, y: 120, label: "AR", desc: "Automatic Rally", color: "#00ff99" },
        { x: 210, y: 200, label: "ST", desc: "Secondary Test", color: "#ffaa00" },
        { x: 400, y: 300, label: "SP", desc: "Spring", color: "#00ff99" },
        { x: 440, y: 240, label: "TST", desc: "Test", color: "#00ccff" },
        { x: 510, y: 210, label: "SOS", desc: "Sign of Strength", color: "#00ccff" },
        { x: 590, y: 180, label: "LPS", desc: "Last Point of Support", color: "#00ccff" },
        { x: 660, y: 100, label: "BU", desc: "Back Up", color: "#d4af37" },
      ].map((e) => (
        <g key={e.label}>
          <circle cx={e.x} cy={e.y} r="5" fill={e.color} opacity="0.9" />
          <circle cx={e.x} cy={e.y} r="9" fill="none" stroke={e.color} strokeWidth="1" opacity="0.4" />
          <text x={e.x} y={e.y - 14} fill={e.color} fontSize="10" textAnchor="middle" fontWeight="bold">{e.label}</text>
        </g>
      ))}

      {/* Trading range lines */}
      <line x1="60" y1="120" x2="460" y2="120" stroke="#ffffff20" strokeWidth="1" strokeDasharray="4,4" />
      <line x1="60" y1="200" x2="460" y2="200" stroke="#ffffff20" strokeWidth="1" strokeDasharray="4,4" />
      <text x="56" y="123" fill="#ffffff40" fontSize="9" textAnchor="end">AR high</text>
      <text x="56" y="203" fill="#ffffff40" fontSize="9" textAnchor="end">SC low</text>

      {/* Title */}
      <text x="420" y="24" fill="#d4af37" fontSize="13" textAnchor="middle" fontWeight="bold" letterSpacing="2">ACCUMULATION SCHEMATIC #1</text>
      <text x="420" y="40" fill="#ffffff40" fontSize="9" textAnchor="middle">Wyckoff Method — Richard D. Wyckoff</text>
    </svg>
  );
}

function DistributionDiagram() {
  return (
    <svg viewBox="0 0 800 380" className="w-full" style={{ fontFamily: "monospace" }}>
      <rect width="800" height="380" fill="#0a0a0f" rx="8" />
      {[80, 140, 200, 260, 320].map((y) => (
        <line key={y} x1="60" y1={y} x2="780" y2={y} stroke="#1a1a2e" strokeWidth="1" />
      ))}

      {/* Price path - inverse of accumulation */}
      <polyline
        points="70,300 130,200 160,260 210,180 250,170 290,190 330,160 370,120 400,80 440,150 480,140 510,180 550,230 590,200 620,250 660,290 700,310 740,330"
        fill="none" stroke="#ff4444" strokeWidth="2.5" strokeLinejoin="round"
      />

      {/* Phase backgrounds */}
      <rect x="60" y="60" width="130" height="280" fill="#ff444406" rx="2" />
      <rect x="190" y="60" width="180" height="280" fill="#ffffff04" rx="2" />
      <rect x="370" y="60" width="100" height="280" fill="#ff000009" rx="2" />
      <rect x="470" y="60" width="130" height="280" fill="#ff444406" rx="2" />
      <rect x="600" y="60" width="175" height="280" fill="#ff444409" rx="2" />

      {[
        { x: 75, label: "A", color: "#ff4444" },
        { x: 245, label: "B", color: "#888" },
        { x: 395, label: "C", color: "#ff0000" },
        { x: 495, label: "D", color: "#ff6666" },
        { x: 650, label: "E", color: "#ff4444" },
      ].map((p) => (
        <text key={p.label} x={p.x} y={355} fill={p.color} fontSize="14" fontWeight="bold" textAnchor="middle">{`Phase ${p.label}`}</text>
      ))}

      {[
        { x: 70, y: 300, label: "PSY", desc: "Preliminary Supply", color: "#ffaa00" },
        { x: 130, y: 200, label: "BC", desc: "Buying Climax", color: "#ff4444" },
        { x: 160, y: 260, label: "AR", desc: "Automatic Reaction", color: "#00ff99" },
        { x: 210, y: 180, label: "ST", desc: "Secondary Test", color: "#ffaa00" },
        { x: 400, y: 80, label: "UT", desc: "Upthrust", color: "#ff0000" },
        { x: 440, y: 150, label: "UTAD", desc: "UT After Distribution", color: "#ff4444" },
        { x: 510, y: 180, label: "SOW", desc: "Sign of Weakness", color: "#ff6666" },
        { x: 590, y: 200, label: "LPSY", desc: "Last Point of Supply", color: "#ff4444" },
        { x: 660, y: 290, label: "MD", desc: "Markdown", color: "#ff0000" },
      ].map((e) => (
        <g key={e.label}>
          <circle cx={e.x} cy={e.y} r="5" fill={e.color} opacity="0.9" />
          <circle cx={e.x} cy={e.y} r="9" fill="none" stroke={e.color} strokeWidth="1" opacity="0.4" />
          <text x={e.x} y={e.y - 14} fill={e.color} fontSize="10" textAnchor="middle" fontWeight="bold">{e.label}</text>
        </g>
      ))}

      <line x1="60" y1="200" x2="460" y2="200" stroke="#ffffff20" strokeWidth="1" strokeDasharray="4,4" />
      <line x1="60" y1="260" x2="460" y2="260" stroke="#ffffff20" strokeWidth="1" strokeDasharray="4,4" />
      <text x="56" y="203" fill="#ffffff40" fontSize="9" textAnchor="end">BC high</text>
      <text x="56" y="263" fill="#ffffff40" fontSize="9" textAnchor="end">AR low</text>

      <text x="420" y="24" fill="#ff4444" fontSize="13" textAnchor="middle" fontWeight="bold" letterSpacing="2">DISTRIBUTION SCHEMATIC #1</text>
      <text x="420" y="40" fill="#ffffff40" fontSize="9" textAnchor="middle">Wyckoff Method — Richard D. Wyckoff</text>
    </svg>
  );
}

function SpringDiagram() {
  return (
    <svg viewBox="0 0 500 250" className="w-full" style={{ fontFamily: "monospace" }}>
      <rect width="500" height="250" fill="#0a0a0f" rx="8" />
      {/* Support line */}
      <line x1="40" y1="160" x2="460" y2="160" stroke="#00ff99" strokeWidth="1.5" strokeDasharray="6,3" />
      <text x="50" y="155" fill="#00ff9980" fontSize="10">SUPPORT LEVEL</text>
      {/* Price */}
      <polyline points="40,100 100,120 160,140 200,158 240,200 270,170 310,140 360,120 420,90 460,80"
        fill="none" stroke="#d4af37" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Spring point */}
      <circle cx="240" cy="200" r="7" fill="#ff000060" />
      <circle cx="240" cy="200" r="12" fill="none" stroke="#ff0000" strokeWidth="1.5" opacity="0.5" />
      <text x="240" y="225" fill="#ff4444" fontSize="11" textAnchor="middle" fontWeight="bold">SPRING</text>
      <text x="240" y="238" fill="#ffffff50" fontSize="9" textAnchor="middle">Breaks support, reverses fast</text>
      {/* Test point */}
      <circle cx="310" cy="140" r="6" fill="#00ccff60" />
      <circle cx="310" cy="140" r="10" fill="none" stroke="#00ccff" strokeWidth="1.5" opacity="0.5" />
      <text x="310" y="125" fill="#00ccff" fontSize="11" textAnchor="middle" fontWeight="bold">TEST</text>
      {/* Volume bars */}
      {[
        { x: 40, h: 30, c: "#d4af37" }, { x: 70, h: 20, c: "#d4af37" },
        { x: 100, h: 25, c: "#ff4444" }, { x: 130, h: 22, c: "#ff4444" },
        { x: 160, h: 28, c: "#ff4444" }, { x: 190, h: 35, c: "#ff4444" },
        { x: 220, h: 60, c: "#ff0000" }, { x: 250, h: 15, c: "#00ff99" },
        { x: 280, h: 40, c: "#00ff99" }, { x: 310, h: 12, c: "#00ff99" },
        { x: 340, h: 45, c: "#00ff99" }, { x: 370, h: 50, c: "#00ff99" },
      ].map((b, i) => (
        <rect key={i} x={b.x} y={230 - b.h} width="22" height={b.h} fill={b.c} opacity="0.4" rx="2" />
      ))}
      <text x="250" y="24" fill="#00ff99" fontSize="12" textAnchor="middle" fontWeight="bold" letterSpacing="2">SPRING — PHASE C EVENT</text>
    </svg>
  );
}

function UpthrustDiagram() {
  return (
    <svg viewBox="0 0 500 250" className="w-full" style={{ fontFamily: "monospace" }}>
      <rect width="500" height="250" fill="#0a0a0f" rx="8" />
      <line x1="40" y1="100" x2="460" y2="100" stroke="#ff4444" strokeWidth="1.5" strokeDasharray="6,3" />
      <text x="50" y="95" fill="#ff444480" fontSize="10">RESISTANCE LEVEL</text>
      <polyline points="40,160 100,145 160,130 200,105 240,60 270,90 310,115 360,130 420,155 460,170"
        fill="none" stroke="#ff4444" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="240" cy="60" r="7" fill="#ff000060" />
      <circle cx="240" cy="60" r="12" fill="none" stroke="#ff0000" strokeWidth="1.5" opacity="0.5" />
      <text x="240" y="45" fill="#ff4444" fontSize="11" textAnchor="middle" fontWeight="bold">UPTHRUST (UT)</text>
      <text x="240" y="30" fill="#ffffff50" fontSize="9" textAnchor="middle">Breaks resistance, reverses fast</text>
      <circle cx="310" cy="115" r="6" fill="#ffaa0060" />
      <circle cx="310" cy="115" r="10" fill="none" stroke="#ffaa00" strokeWidth="1.5" opacity="0.5" />
      <text x="310" y="130" fill="#ffaa00" fontSize="11" textAnchor="middle" fontWeight="bold">TEST</text>
      {[
        { x: 40, h: 25, c: "#d4af37" }, { x: 70, h: 20, c: "#d4af37" },
        { x: 100, h: 22, c: "#d4af37" }, { x: 130, h: 28, c: "#d4af37" },
        { x: 160, h: 30, c: "#ffaa00" }, { x: 190, h: 38, c: "#ffaa00" },
        { x: 220, h: 65, c: "#ff0000" }, { x: 250, h: 18, c: "#ff4444" },
        { x: 280, h: 30, c: "#ff4444" }, { x: 310, h: 14, c: "#ff4444" },
        { x: 340, h: 40, c: "#ff4444" }, { x: 370, h: 45, c: "#ff4444" },
      ].map((b, i) => (
        <rect key={i} x={b.x} y={230 - b.h} width="22" height={b.h} fill={b.c} opacity="0.4" rx="2" />
      ))}
      <text x="250" y="215" fill="#ff4444" fontSize="12" textAnchor="middle" fontWeight="bold" letterSpacing="2">UPTHRUST — PHASE C EVENT</text>
    </svg>
  );
}

// ─── CONTENT SECTIONS ────────────────────────────────────────────────────────

function ChapterIntro() {
  return (
    <div>
      <p className="lead-text">Richard D. Wyckoff was not a theorist. He was a practitioner who spent decades observing how large operators — banks, institutions, syndicates — move markets. His insight was devastatingly simple:</p>
      <blockquote>
        "The market is a mechanism for transferring wealth from the many to the few. The few are the Composite Man. Learn to think like him."
      </blockquote>
      <div className="concept-grid">
        {[
          { title: "The Composite Man", body: "Wyckoff told you to imagine all supply and demand as the action of a single large operator — the Composite Man. He accumulates quietly, marks up, distributes quietly, marks down. Repeat forever." },
          { title: "Why It Works", body: "Large operators cannot hide their footprints. They need volume to build and exit positions. That volume leaves marks on price and volume bars. Wyckoff taught you to read those marks." },
          { title: "What It Predicts", body: "Wyckoff doesn't predict the future. It maps the probable cause-and-effect relationship between accumulation/distribution and the subsequent markup/markdown." },
          { title: "Time Frame Agnostic", body: "This works on 1-minute intraday charts and weekly macro charts. The patterns scale because human psychology and institutional mechanics don't change with time frame." },
        ].map((c) => (
          <div key={c.title} className="concept-card">
            <div className="concept-title">{c.title}</div>
            <div className="concept-body">{c.body}</div>
          </div>
        ))}
      </div>
      <div className="key-insight">
        <span className="ki-label">CORE TRUTH</span>
        <p>The Composite Man's goal is always the same: buy low from weak hands, sell high to weak hands. Every pattern in Wyckoff methodology maps to some phase of this cycle. Your job is to identify where in the cycle the market currently sits.</p>
      </div>
    </div>
  );
}

function ChapterLaws() {
  const laws = [
    {
      num: "01",
      title: "The Law of Supply and Demand",
      color: "#d4af37",
      body: "When demand exceeds supply, price rises. When supply exceeds demand, price falls. When they're equal, price moves sideways. This is not economics — this is mechanics. Volume tells you the intensity of each force. Wide spread up on high volume = strong demand. Wide spread down on high volume = strong supply.",
      signals: ["Narrow spread + high volume = absorption (one side dominating)", "Wide spread + low volume = no interest (weak move)", "Price rising + volume decreasing = effort vs result divergence"],
    },
    {
      num: "02",
      title: "The Law of Cause and Effect",
      color: "#00ccff",
      body: "You cannot get something from nothing. A campaign of accumulation (the cause) is required to produce a markup (the effect). The size of the markup is proportional to the size of the accumulation. This is how you use Point & Figure charts to project price targets — count the width of the base to estimate the extent of the move.",
      signals: ["Wide base = large subsequent move", "Narrow base = small subsequent move", "Re-accumulation = additional cause building mid-trend"],
    },
    {
      num: "03",
      title: "The Law of Effort vs. Result",
      color: "#ff4444",
      body: "The effort (volume) should produce a proportional result (price movement). When effort and result diverge, the trend is suspect. High volume with little price movement means one side is absorbing the other. This divergence signals an impending reversal or consolidation.",
      signals: ["High vol + small price bar = absorption, likely reversal zone", "Low vol + large price move = no resistance, trend likely continues", "Volume expanding against trend = counter-trend pressure building"],
    },
  ];

  return (
    <div>
      <p className="lead-text">Three laws underpin all of Wyckoff's methodology. Master these and you'll see the market as a machine, not a mystery.</p>
      {laws.map((law) => (
        <div key={law.num} className="law-card" style={{ borderColor: law.color + "40" }}>
          <div className="law-header">
            <span className="law-num" style={{ color: law.color }}>LAW {law.num}</span>
            <span className="law-title" style={{ color: law.color }}>{law.title}</span>
          </div>
          <p className="law-body">{law.body}</p>
          <div className="law-signals">
            {law.signals.map((s, i) => (
              <div key={i} className="law-signal">
                <span style={{ color: law.color, marginRight: 8 }}>›</span>{s}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ChapterPhases() {
  const phases = [
    {
      letter: "A", theme: "Stopping the Previous Trend", color: "#d4af37",
      accumDesc: "Demand appears after a prolonged downtrend. PS, SC, AR, and ST mark this phase. The downtrend is arrested. Institutions begin absorbing supply.",
      distribDesc: "Supply appears after a prolonged uptrend. PSY, BC, AR, and ST mark this phase. The uptrend is arrested. Institutions begin distributing holdings.",
      events: ["PS/PSY — First sign", "SC/BC — Climax event", "AR — Automatic reaction", "ST — Secondary test"],
    },
    {
      letter: "B", theme: "Building the Cause", color: "#8888ff",
      accumDesc: "The longest phase. Price oscillates inside the trading range. Institutions quietly accumulate on dips. Volume starts to decrease overall. STs test supply.",
      distribDesc: "The longest phase. Price oscillates inside the trading range. Institutions quietly distribute on rallies. Volume starts to show weakness on ups.",
      events: ["Multiple STs", "Minor SOW tests", "Volume profile shifting", "Range establishing"],
    },
    {
      letter: "C", theme: "The Test / The Trap", color: "#00ff99",
      accumDesc: "The Spring — price briefly violates the support, shakes out weak longs, absorbs final supply, then reverses. This is the highest conviction entry point in accumulation.",
      distribDesc: "The Upthrust — price briefly violates resistance, traps breakout buyers, hits buy-stops, then reverses. This is the highest conviction entry point in distribution.",
      events: ["Spring / Upthrust", "Stop hunt below/above range", "Reversal on volume", "Test of the extreme"],
    },
    {
      letter: "D", theme: "Dominance Shifts", color: "#00ccff",
      accumDesc: "Demand clearly overtakes supply. SOS (Sign of Strength) pushes price above the TR midpoint. LPS (Last Point of Support) pullbacks are shallow with low volume. This is the breakout phase.",
      distribDesc: "Supply clearly overtakes demand. SOW (Sign of Weakness) drops price below TR midpoint. LPSY rallies are weak with low volume. This is the breakdown phase.",
      events: ["SOS / SOW", "LPS / LPSY", "BU (Back Up)", "Volume expansion on direction"],
    },
    {
      letter: "E", theme: "The Move Out", color: "#ffaa00",
      accumDesc: "Price breaks out and begins the markup. Pullbacks are brief and shallow. New higher highs with volume. This phase may contain re-accumulation structures on shorter timeframes.",
      distribDesc: "Price breaks down and begins the markdown. Rallies are brief and weak. New lower lows with increasing volume. This phase may contain re-distribution structures.",
      events: ["Full markup/markdown", "Re-accumulation possible", "Trend continuation", "New trading ranges form"],
    },
  ];

  return (
    <div>
      <p className="lead-text">Both accumulation and distribution move through the same 5 phases. The difference is direction. Learn the phase logic first — then apply it to either scenario.</p>
      <div className="phase-grid">
        {phases.map((p) => (
          <div key={p.letter} className="phase-card" style={{ borderTop: `3px solid ${p.color}` }}>
            <div className="phase-header">
              <span className="phase-letter" style={{ color: p.color }}>Phase {p.letter}</span>
              <span className="phase-theme">{p.theme}</span>
            </div>
            <div className="phase-row">
              <div className="phase-col">
                <div className="phase-col-label" style={{ color: "#00ff99" }}>▲ ACCUMULATION</div>
                <p className="phase-col-text">{p.accumDesc}</p>
              </div>
              <div className="phase-divider" />
              <div className="phase-col">
                <div className="phase-col-label" style={{ color: "#ff4444" }}>▼ DISTRIBUTION</div>
                <p className="phase-col-text">{p.distribDesc}</p>
              </div>
            </div>
            <div className="phase-events">
              {p.events.map((e, i) => (
                <span key={i} className="phase-event" style={{ borderColor: p.color + "40", color: p.color }}>{e}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChapterAccumulation() {
  const events = [
    { code: "PS", name: "Preliminary Support", phase: "A", color: "#d4af37", desc: "First significant buying after a prolonged downtrend. Price decelerates. Volume increases but selling still dominates. Not a reversal — just a warning shot.", spot: "Look for increased volume + spread slowing. NOT a buy signal." },
    { code: "SC", name: "Selling Climax", phase: "A", color: "#ff4444", desc: "Panic selling exhaustion. Wide spread down bars with very high volume. Price closes off the lows often. This is where professionals absorb retail panic.", spot: "Largest volume bar in recent memory. Price closes in upper half of bar. Often a massive wick." },
    { code: "AR", name: "Automatic Rally", phase: "A", color: "#00ff99", desc: "Supply temporarily exhausted. Price rallies sharply from SC low. This defines the TOP of the Trading Range. The AR high is your resistance line.", spot: "Fast, strong rally after SC. Volume lighter than SC. This sets the upper boundary." },
    { code: "ST", name: "Secondary Test", phase: "A/B", color: "#ffaa00", desc: "Price retests the SC area on lighter volume. Confirms that supply is drying up at that level. Can have multiple STs in Phase B.", spot: "Lower volume than SC. Price holds above SC low. If it undercuts SC = still in Phase A." },
    { code: "SP", name: "Spring", phase: "C", color: "#00ff99", desc: "The shakeout. Price breaks below the TR support briefly, triggering stops, then reverses sharply. Traps shorts. The single best entry signal in all of Wyckoff.", spot: "Price dips below SC/ST low, volume spikes then drops, price reverses and closes back in range. Low volume test is strongest." },
    { code: "SOS", name: "Sign of Strength", phase: "D", color: "#00ccff", desc: "A strong upward price move on expanding volume after the Spring. Crosses above the midpoint of the TR. Confirms demand is in control.", spot: "Wide spread up bar, high volume, closes near top. Breaks above multiple resistance levels." },
    { code: "LPS", name: "Last Point of Support", phase: "D", color: "#00ccff", desc: "Pullback after SOS. Price holds at or above former resistance (now support). Volume dries up. This is the final entry before markup.", spot: "Shallow pullback, narrow spread, low volume. The less it falls, the more bullish." },
    { code: "BU", name: "Back Up", phase: "D/E", color: "#d4af37", desc: "Final test of the breakout. Price retests the top of the TR from above. Often the last chance to enter before the full markup. Not always present.", spot: "Light volume pullback to the breakout level. Should hold. If it fails back into TR = failed breakout." },
  ];

  return (
    <div>
      <p className="lead-text">Accumulation is where the Composite Man builds his long position — quietly, systematically, over weeks or months. Every event has a logical purpose in the campaign.</p>
      <AccumulationDiagram />
      <div style={{ marginTop: "2rem" }}>
        {events.map((e) => (
          <div key={e.code} className="event-row" style={{ borderLeft: `3px solid ${e.color}` }}>
            <div className="event-header">
              <span className="event-code" style={{ color: e.color }}>{e.code}</span>
              <span className="event-name">{e.name}</span>
              <span className="event-phase" style={{ borderColor: e.color + "60", color: e.color }}>Phase {e.phase}</span>
            </div>
            <p className="event-desc">{e.desc}</p>
            <div className="event-spot">
              <span className="event-spot-label">HOW TO SPOT:</span> {e.spot}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChapterDistribution() {
  const events = [
    { code: "PSY", name: "Preliminary Supply", phase: "A", color: "#ffaa00", desc: "First significant selling after a prolonged uptrend. Smart money begins offloading into strength. Volume increases but buying still dominates.", spot: "Volume increases but spread starts narrowing on up days. Market slowing but not stopped." },
    { code: "BC", name: "Buying Climax", phase: "A", color: "#ff4444", desc: "Euphoria buying, often news-driven. Wide spread up bar on the highest volume in the trend. Institutions are selling everything retail is buying. This defines the TOP of the TR.", spot: "Biggest volume candle in months. Wide spread. Price often closes mid-bar or lower. Feels like a breakout — it's not." },
    { code: "AR", name: "Automatic Reaction", phase: "A", color: "#00ff99", desc: "Sharp sell-off after BC as buying is exhausted. Defines the BOTTOM of the TR. AR low is your support line.", spot: "Fast drop after BC. Volume picks up. Sets the lower boundary of the distribution range." },
    { code: "ST", name: "Secondary Test", phase: "A/B", color: "#ffaa00", desc: "Price rallies back toward BC on lower volume. Supply re-appears. Confirms distribution at resistance. Multiple STs occur in Phase B.", spot: "Rally to BC area with lower volume than BC. Supply overwhelms. Price turns back down." },
    { code: "SOW", name: "Sign of Weakness", phase: "B/C", color: "#ff4444", desc: "A significant down move, often breaking below the AR low, showing that supply is overcoming demand. Warning shot before the markdown.", spot: "Wide spread down, high volume, closes near low. Breaks below support briefly or cleanly." },
    { code: "UT", name: "Upthrust", phase: "C", color: "#ff0000", desc: "The bull trap. Price breaks above the TR resistance briefly, triggers buy-stops and breakout buyers, then reverses sharply below resistance. Mirror of the Spring.", spot: "Price spikes above BC high, closes back below. Volume high on spike, drops on reversal. Shakeout of longs." },
    { code: "LPSY", name: "Last Point of Supply", phase: "D", color: "#ff4444", desc: "Weak rally after SOW. Volume dries up. Can't reclaim the midpoint. Last chance to exit longs or enter shorts before full markdown.", spot: "Narrow spread, low volume rally. Fails at former support (now resistance). Looks like a 'recovery' — it's a trap." },
    { code: "MD", name: "Markdown", phase: "E", color: "#ff0000", desc: "Full breakdown. Supply overwhelms all demand. Institutional shorts press. Retail capitulates late. Can contain re-distribution ranges mid-trend.", spot: "Consistent lower lows, lower highs. Volume expands on drops. Rallies are weak and brief." },
  ];

  return (
    <div>
      <p className="lead-text">Distribution is the mirror image of accumulation. The Composite Man is now selling his position into retail demand, preparing for markdown.</p>
      <DistributionDiagram />
      <div style={{ marginTop: "2rem" }}>
        {events.map((e) => (
          <div key={e.code} className="event-row" style={{ borderLeft: `3px solid ${e.color}` }}>
            <div className="event-header">
              <span className="event-code" style={{ color: e.color }}>{e.code}</span>
              <span className="event-name">{e.name}</span>
              <span className="event-phase" style={{ borderColor: e.color + "60", color: e.color }}>Phase {e.phase}</span>
            </div>
            <p className="event-desc">{e.desc}</p>
            <div className="event-spot">
              <span className="event-spot-label">HOW TO SPOT:</span> {e.spot}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChapterReaccum() {
  return (
    <div>
      <p className="lead-text">Trends don't go straight. They pause, consolidate, and continue. These mid-trend pauses are re-accumulation (in uptrends) or re-distribution (in downtrends). They look exactly like primary structures but occur INSIDE a trend.</p>
      <div className="concept-grid">
        <div className="concept-card" style={{ borderColor: "#00ff9930" }}>
          <div className="concept-title" style={{ color: "#00ff99" }}>Re-Accumulation</div>
          <div className="concept-body">Occurs during an uptrend when price pauses to build cause for the next leg up. Looks like a small accumulation structure. Key tells: higher low than primary accumulation, trend still up, LPS holds above prior breakout level.</div>
        </div>
        <div className="concept-card" style={{ borderColor: "#ff444430" }}>
          <div className="concept-title" style={{ color: "#ff4444" }}>Re-Distribution</div>
          <div className="concept-body">Occurs during a downtrend when price pauses before the next leg down. Looks like a small distribution structure. Key tells: lower high than primary distribution, trend still down, LPSY fails below prior breakdown level.</div>
        </div>
      </div>
      <div className="key-insight">
        <span className="ki-label">CRITICAL DISTINCTION</span>
        <p>The hardest problem in Wyckoff is: is this consolidation a re-accumulation (continue up) or a distribution (reverse down)? The answer lies in the position of the range relative to the prior trend, the volume character on rallies vs drops within the range, and whether the dominant force (supply or demand) is accelerating or decelerating. There is no guaranteed answer until Phase D plays out.</p>
      </div>
      <div className="table-container">
        <table className="wyckoff-table">
          <thead>
            <tr>
              <th>Signal</th>
              <th style={{ color: "#00ff99" }}>Re-Accumulation</th>
              <th style={{ color: "#ff4444" }}>Re-Distribution</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Range position", "At or above prior breakout", "Below prior breakdown or midpoint"],
              ["Volume on rallies", "Expanding, closes near top", "Declining, closes mid-bar"],
              ["Volume on drops", "Declining, holds higher", "Expanding, closes near low"],
              ["Spring/Upthrust", "Spring on low volume", "Upthrust on high volume rejection"],
              ["SOS/SOW", "SOS breaks above range on vol", "SOW breaks below range on vol"],
              ["Prior trend", "Uptrend context", "Downtrend context"],
            ].map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => <td key={j}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ChapterSpring() {
  return (
    <div>
      <p className="lead-text">The Spring and Upthrust are Phase C events — the most important single events in the entire Wyckoff methodology. Miss these and you miss the best entries. Misread these and you get trapped.</p>
      <div className="diagram-row">
        <div>
          <div className="diagram-label" style={{ color: "#00ff99" }}>SPRING (Accumulation Phase C)</div>
          <SpringDiagram />
        </div>
        <div>
          <div className="diagram-label" style={{ color: "#ff4444" }}>UPTHRUST (Distribution Phase C)</div>
          <UpthrustDiagram />
        </div>
      </div>

      <div className="law-card" style={{ borderColor: "#00ff9940", marginTop: "1.5rem" }}>
        <div className="law-header"><span className="law-title" style={{ color: "#00ff99" }}>Spring — 3 Types (Strength Ranked)</span></div>
        <div className="law-body">
          {[
            { type: "Type 1 Spring", desc: "Price drops well below support on high volume. Risky — supply still present. Wait for the test.", color: "#ffaa00" },
            { type: "Type 2 Spring", desc: "Price drops below support briefly. Moderate volume. Test is critical — needs to hold above.", color: "#00ccff" },
            { type: "Type 3 Spring", desc: "Price barely touches support, almost doesn't break it. Lowest volume. HIGHEST conviction. Best entry on test.", color: "#00ff99" },
          ].map((t) => (
            <div key={t.type} style={{ marginBottom: 12 }}>
              <span style={{ color: t.color, fontWeight: "bold", fontSize: 13 }}>{t.type}</span>
              <p style={{ margin: "4px 0 0", color: "#aaa", fontSize: 13 }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="key-insight">
        <span className="ki-label">THE TEST IS EVERYTHING</span>
        <p>The Spring alone is not the trade. The test after the Spring is the confirmation. A valid test should: return to the Spring low area on significantly lower volume, hold above the Spring low, and close near the high of the test bar. If volume surges on the test = supply still present = danger.</p>
      </div>

      <div className="law-card" style={{ borderColor: "#ff444440", marginTop: "1.5rem" }}>
        <div className="law-header"><span className="law-title" style={{ color: "#ff4444" }}>Upthrust After Distribution (UTAD)</span></div>
        <p className="law-body">The UTAD is a more powerful version of the basic Upthrust — it occurs later in distribution (Phase C or early D), after the trading range is well established. It's a more deliberate bull trap. The key tell: price breaks above ALL prior resistance levels in the TR, creates maximum bullish sentiment, then fails decisively. This is often the last structural high before major markdown.</p>
      </div>
    </div>
  );
}

function ChapterVolume() {
  const rules = [
    { title: "Volume Precedes Price", body: "Before a price reversal, volume behavior changes. In accumulation, volume on down bars starts to decrease while volume on up bars increases. This shift in volume character signals the transition in control.", color: "#d4af37" },
    { title: "Effort vs. Result", body: "High volume with small price movement = absorption (one side absorbing the other). This is climactic behavior — often happens at SC, BC, Springs, and Upthrusts.", color: "#00ccff" },
    { title: "No Demand Bar", body: "A narrow spread up bar on very low volume. Nobody is pushing price up — the move lacks conviction. In a distribution zone, this confirms weakness. Classic LPSY tell.", color: "#ff4444" },
    { title: "No Supply Bar", body: "A narrow spread down bar on very low volume. Sellers are exhausted. In an accumulation zone, this confirms strength. Classic LPS tell.", color: "#00ff99" },
    { title: "Stopping Volume", body: "Ultra-high volume on a down bar that closes off the lows. Someone is buying everything available. This is often SC or the Spring. The wide spread down + close off lows + massive volume = absorption.", color: "#ffaa00" },
    { title: "Test of Supply/Demand", body: "After a climax event, the test on low volume confirms exhaustion. SC followed by ST on lower volume = supply drying up. BC followed by ST on lower volume = demand drying up.", color: "#8888ff" },
  ];

  return (
    <div>
      <p className="lead-text">Volume is the lie detector of the market. Price can be manipulated for a bar or two — volume tells you what's actually happening behind the scenes.</p>
      <div className="concept-grid">
        {rules.map((r) => (
          <div key={r.title} className="concept-card" style={{ borderColor: r.color + "30" }}>
            <div className="concept-title" style={{ color: r.color }}>{r.title}</div>
            <div className="concept-body">{r.body}</div>
          </div>
        ))}
      </div>
      <div className="table-container" style={{ marginTop: "1.5rem" }}>
        <table className="wyckoff-table">
          <thead>
            <tr><th>Scenario</th><th>Volume</th><th>Spread</th><th>Close</th><th>Meaning</th></tr>
          </thead>
          <tbody>
            {[
              ["SC / BC", "Extreme high", "Wide", "Off extremes", "Climax — exhaustion, reversal zone"],
              ["Spring / UT Test", "Very low", "Narrow", "Near high/low", "No supply/demand — safe entry zone"],
              ["SOS", "High", "Wide up", "Near top", "Demand dominant — confirmed breakout"],
              ["SOW", "High", "Wide down", "Near bottom", "Supply dominant — confirmed breakdown"],
              ["No Demand (LPSY)", "Very low", "Narrow up", "Mid/low", "Bulls failing — distribution confirmed"],
              ["No Supply (LPS)", "Very low", "Narrow down", "Mid/high", "Bears failing — accumulation confirmed"],
              ["UTAD / Upthrust", "High spike", "Wide up", "Reverses fast", "Bull trap — markdown incoming"],
            ].map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => <td key={j}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ChapterCheatsheet() {
  return (
    <div>
      <p className="lead-text">Quick reference. Print this. Tattoo it. Keep it next to your trading screen.</p>

      <div className="cs-section">
        <div className="cs-title" style={{ color: "#00ff99" }}>ACCUMULATION — QUICK REFERENCE</div>
        <div className="cs-grid">
          {[
            { event: "PS", when: "After downtrend", volume: "Increasing", spread: "Slowing down", action: "Alert — reversal zone possible" },
            { event: "SC", when: "Panic low", volume: "Climax high", spread: "Wide down, closes off low", action: "Watch — do NOT buy yet" },
            { event: "AR", when: "After SC", volume: "Lower than SC", spread: "Sharp rally", action: "Mark as TR top" },
            { event: "ST", when: "Retest SC area", volume: "Lower than SC", spread: "Narrow, holds SC", action: "Mark as TR bottom" },
            { event: "Spring", when: "Breaks TR low", volume: "Spike then drops", spread: "Dip below, fast reversal", action: "ENTER or prepare entry" },
            { event: "Test", when: "After Spring", volume: "Low", spread: "Narrow, holds", action: "BEST ENTRY — stop below Spring" },
            { event: "SOS", when: "Phase D", volume: "High", spread: "Wide up, closes top", action: "Confirm bias — add on LPS" },
            { event: "LPS", when: "After SOS", volume: "Low", spread: "Shallow drop", action: "ADD — final entry before markup" },
          ].map((r) => (
            <div key={r.event} className="cs-row">
              <div className="cs-event">{r.event}</div>
              <div className="cs-details">
                <div><span className="cs-label">When:</span> {r.when}</div>
                <div><span className="cs-label">Volume:</span> {r.volume}</div>
                <div><span className="cs-label">Spread:</span> {r.spread}</div>
                <div className="cs-action" style={{ color: "#00ff99" }}>→ {r.action}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cs-section" style={{ marginTop: "1.5rem" }}>
        <div className="cs-title" style={{ color: "#ff4444" }}>DISTRIBUTION — QUICK REFERENCE</div>
        <div className="cs-grid">
          {[
            { event: "PSY", when: "After uptrend", volume: "Increasing", spread: "Slowing up", action: "Alert — reversal zone possible" },
            { event: "BC", when: "Euphoria high", volume: "Climax high", spread: "Wide up, closes mid/low", action: "Watch — do NOT short yet" },
            { event: "AR", when: "After BC", volume: "Lower than BC", spread: "Sharp drop", action: "Mark as TR bottom" },
            { event: "ST", when: "Retest BC area", volume: "Lower than BC", spread: "Narrow, fails at BC", action: "Mark as TR top" },
            { event: "UTAD/UT", when: "Breaks TR high", volume: "Spike then drops", spread: "Spike above, fast reversal", action: "ENTER SHORT or prepare entry" },
            { event: "Test", when: "After UT", volume: "Low", spread: "Weak rally, fails", action: "BEST SHORT — stop above UT" },
            { event: "SOW", when: "Phase D", volume: "High", spread: "Wide down, closes low", action: "Confirm bias — add on LPSY" },
            { event: "LPSY", when: "After SOW", volume: "Low", spread: "Weak rally", action: "ADD SHORT — final entry before markdown" },
          ].map((r) => (
            <div key={r.event} className="cs-row">
              <div className="cs-event" style={{ color: "#ff4444" }}>{r.event}</div>
              <div className="cs-details">
                <div><span className="cs-label">When:</span> {r.when}</div>
                <div><span className="cs-label">Volume:</span> {r.volume}</div>
                <div><span className="cs-label">Spread:</span> {r.spread}</div>
                <div className="cs-action" style={{ color: "#ff4444" }}>→ {r.action}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="key-insight" style={{ marginTop: "1.5rem" }}>
        <span className="ki-label">PHASE IDENTIFICATION SHORTCUT</span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginTop: "0.75rem" }}>
          {[
            { q: "Is there a prior trend?", a: "No → Not Wyckoff time yet" },
            { q: "Is there a climax event?", a: "No → Still in Phase A" },
            { q: "Did price form a range?", a: "No → Still in Phase A/B" },
            { q: "Did price test the extreme?", a: "No → Still in Phase B" },
            { q: "Was there a Spring or UT?", a: "Yes → Phase C complete" },
            { q: "Did SOS/SOW occur?", a: "Yes → Phase D, bias confirmed" },
          ].map((item, i) => (
            <div key={i} style={{ background: "#0f0f1a", padding: "10px 14px", borderRadius: 6, border: "1px solid #1f1f35" }}>
              <div style={{ color: "#888", fontSize: 11, marginBottom: 4 }}>Q: {item.q}</div>
              <div style={{ color: "#d4af37", fontSize: 12, fontWeight: "bold" }}>{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChapterMapping() {
  const steps = [
    { num: 1, title: "Identify the Prior Trend", body: "Wyckoff structures only matter after a significant move. For accumulation: there must be a clear downtrend. For distribution: a clear uptrend. No trend = no setup. Don't try to map Wyckoff on sideways choppy markets with no prior momentum.", color: "#d4af37" },
    { num: 2, title: "Find the Climax Event", body: "Look for the largest volume candle in the recent trend. Wide spread, closes off the extreme. In downtrends: SC. In uptrends: BC. This is the anchor of your structure. Draw your first key level here.", color: "#ff4444" },
    { num: 3, title: "Find the Automatic Reaction/Rally", body: "The sharp counter-move after the climax. This gives you the opposite boundary of the Trading Range. Draw a horizontal line at both the climax and the AR extreme — this is your Trading Range box.", color: "#00ff99" },
    { num: 4, title: "Draw the Trading Range Box", body: "Upper line = AR high (accumulation) or BC high (distribution). Lower line = SC low (accumulation) or AR low (distribution). Everything that happens inside this box is Phase B unless it violates and returns (Phase C).", color: "#8888ff" },
    { num: 5, title: "Mark the Midpoint", body: "Add a midline to the TR box. This is critical: price breaking and holding above the midpoint = accumulation likely. Price breaking and holding below = distribution likely. SOS/SOW must cross this line to confirm.", color: "#00ccff" },
    { num: 6, title: "Watch for Phase C", body: "The Spring or Upthrust — price briefly violates the TR boundary and reverses. This is the trap. Mark it. Wait for the test. Don't jump in on the Spring alone — wait for confirmation that price reclaims the boundary.", color: "#00ff99" },
    { num: 7, title: "Confirm with SOS or SOW", body: "After Phase C, look for a strong move that: (a) expands in spread, (b) has volume, (c) closes near the extreme, and (d) crosses the TR midpoint. This is your SOS (accumulation) or SOW (distribution). Your bias is now confirmed.", color: "#00ccff" },
    { num: 8, title: "Enter on LPS or LPSY", body: "The pullback after SOS/SOW on low volume. This is the highest R:R entry in the structure. Stop goes just below the Spring low (accumulation) or above the UT high (distribution). Target is measured by the width of the base.", color: "#ffaa00" },
  ];

  return (
    <div>
      <p className="lead-text">Step-by-step process for mapping Wyckoff on any chart, any timeframe. Follow this sequence every time — no shortcuts.</p>
      <div>
        {steps.map((s) => (
          <div key={s.num} className="step-card">
            <div className="step-number" style={{ color: s.color, borderColor: s.color + "40" }}>{s.num.toString().padStart(2, "0")}</div>
            <div className="step-content">
              <div className="step-title" style={{ color: s.color }}>{s.title}</div>
              <p className="step-body">{s.body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="key-insight">
        <span className="ki-label">COMMON MAPPING ERROR</span>
        <p>Traders try to map Wyckoff structures that are too small or don't have a clear prior trend. The minimum requirement: price must have moved at least 20-30% in the prior trend, and the Trading Range must be at least 10-15 candles wide (on your primary timeframe) to be meaningful. Anything smaller is noise that looks like signal.</p>
      </div>
    </div>
  );
}

function ChapterEntries() {
  return (
    <div>
      <p className="lead-text">There are exactly three high-probability entry windows in every Wyckoff structure. Everything else is noise.</p>
      <div className="entry-grid">
        {[
          {
            num: "Entry #1",
            title: "The Spring/Upthrust (Phase C)",
            quality: "Highest Risk / Highest Reward",
            qcolor: "#ffaa00",
            desc: "Enter on the reversal candle at the Spring or after a confirmed UT. The shakeout just happened. You're entering with the Composite Man.",
            trigger: "Closing bar reverses strongly back above/below the TR boundary",
            stop: "Below the Spring low / Above the UT high",
            target: "Top/bottom of the Trading Range initially, then full markup/markdown",
            risk: "If the test fails and revisits the extreme = you're wrong. Cut.",
          },
          {
            num: "Entry #2",
            title: "The Test After Spring/UT (Phase C/D)",
            quality: "Best Risk-Reward in Wyckoff",
            qcolor: "#00ff99",
            desc: "Wait for price to return to the Spring/UT area on low volume. This is the confirmation. You have a defined low, low volume, and the structure is intact.",
            trigger: "Low volume pullback holds above Spring low / below UT high",
            stop: "Just below the Spring low (tight) — any breach invalidates",
            target: "Measured move = width of Trading Range projected from breakout",
            risk: "Lower volume on test is non-negotiable. High volume = supply still present = skip",
          },
          {
            num: "Entry #3",
            title: "Last Point of Support/Supply (Phase D)",
            quality: "Highest Certainty / Lower Reward",
            qcolor: "#00ccff",
            desc: "After SOS/SOW confirmed, wait for the LPS/LPSY pullback. Structure is fully confirmed. You sacrifice some move for maximum certainty.",
            trigger: "Pullback on low volume holds above prior SOS/SOW level",
            stop: "Below the LPS low / Above the LPSY high",
            target: "Full markup/markdown. Add at subsequent LPS levels.",
            risk: "If pullback is deep and volume expands = distribution/accumulation failed",
          },
        ].map((e) => (
          <div key={e.num} className="entry-card">
            <div className="entry-header">
              <span className="entry-num">{e.num}</span>
              <span className="entry-quality" style={{ color: e.qcolor }}>{e.quality}</span>
            </div>
            <div className="entry-title">{e.title}</div>
            <p className="entry-desc">{e.desc}</p>
            <div className="entry-details">
              <div className="entry-detail"><span className="ed-label">TRIGGER:</span> {e.trigger}</div>
              <div className="entry-detail"><span className="ed-label">STOP:</span> {e.stop}</div>
              <div className="entry-detail"><span className="ed-label">TARGET:</span> {e.target}</div>
              <div className="entry-detail" style={{ color: "#ff444490" }}><span className="ed-label">INVALIDATION:</span> {e.risk}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="table-container">
        <div className="cs-title" style={{ color: "#d4af37", marginBottom: "1rem" }}>POSITION SIZING BY ENTRY TYPE</div>
        <table className="wyckoff-table">
          <thead><tr><th>Entry Type</th><th>Max Risk/Trade</th>  <th>Conviction Required</th><th>Typical RR</th></tr></thead>
          <tbody>
            {[
              ["Spring (unconfirmed)", "0.5–1%", "Spring + reversal bar only", "3:1 – 5:1"],
              ["Test of Spring", "1–2%", "Low volume + holds", "4:1 – 8:1"],
              ["LPS after SOS", "1.5–2%", "SOS confirmed + LPS drying vol", "2:1 – 4:1"],
              ["Breakout (BU test)", "1%", "TR broken + BU holds", "2:1 – 3:1"],
            ].map((row, i) => (
              <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ChapterMistakes() {
  const traps = [
    { title: "Labeling in Real-Time Without Confirmation", severity: "CRITICAL", desc: "You see a big down candle and immediately call it a SC. Then price falls another 40%. The SC isn't confirmed until you have the AR and at least one ST. Stop labeling events before they're complete. The label is retrospective. The action is forward-looking.", fix: "Only assign event labels after the next significant move confirms the prior event. SC is confirmed by the AR. AR is confirmed by the ST. Etc." },
    { title: "Ignoring the Prior Trend", severity: "CRITICAL", desc: "Wyckoff structures without a prior trend are just consolidation. If price has been sideways for months before your 'SC', it's not a selling climax — it's a random low. The Composite Man can only accumulate after selling has already happened.", fix: "Require at minimum a 20% directional move before the first climax event. No trend = no setup." },
    { title: "Buying/Shorting the Spring or UT Without a Test", severity: "HIGH", desc: "The Spring is a shakeout, not an entry signal. Price can continue through the Spring and keep going. You need the test to confirm that supply (or demand) is exhausted.", fix: "Always wait for the test. Enter on the test, not the initial Spring/UT candle." },
    { title: "Expecting Perfect Textbook Shapes", severity: "HIGH", desc: "Real markets don't produce clean textbook schematics. The AR might be weak. The Spring might be subtle. Phase B can last months. If you're waiting for a perfect Wyckoff drawing to appear on your chart, you'll never trade.", fix: "Focus on the logic (cause-and-effect, supply-demand balance) not the exact shape. The principles are universal. The shapes are approximate." },
    { title: "Using Wyckoff on Low-Timeframe Charts Without Context", severity: "HIGH", desc: "A 'Spring' on a 5-minute chart inside a distribution structure on the daily is a short entry, not a long. Timeframe context is everything. Always know the higher-timeframe structure first.", fix: "Map the weekly/daily first. Trade in the direction of the higher-timeframe Wyckoff phase. Lower TF entries within higher TF context." },
    { title: "Confusing Re-accumulation with Distribution", severity: "HIGH", desc: "The most expensive Wyckoff mistake. You see a sideways range mid-uptrend, label it re-accumulation, buy, and it's actually distribution and price collapses.", fix: "Volume character is the tiebreaker. In re-accumulation: volume on drops decreases, volume on rallies expands. In distribution: exact opposite. When in doubt, do nothing until Phase D confirms." },
    { title: "Wide Stops That Eliminate Edge", severity: "MEDIUM", desc: "Wyckoff gives you precise stop locations. The Spring low IS your stop. If you put a 'comfortable' stop 5% below that, you destroy the RR and the strategy's edge.", fix: "The stop for accumulation entries is just below the Spring low. If that distance is too large for your account, reduce position size — don't widen the stop." },
    { title: "Over-Labeling Every Consolidation", severity: "MEDIUM", desc: "Not every consolidation is a Wyckoff structure. Markets spend a lot of time in random noise. Seeing Wyckoff everywhere is how you lose money systematically.", fix: "Apply a strict checklist: prior trend ✓, climax event ✓, AR ✓, Trading Range ✓, Phase C event ✓. If any are missing, it's not a Wyckoff setup." },
  ];

  const severityColor = { CRITICAL: "#ff0000", HIGH: "#ff4444", MEDIUM: "#ffaa00" };

  return (
    <div>
      <p className="lead-text">These mistakes will cost you money. Every single one. The professionals make money partly because retail traders make these errors consistently.</p>
      {traps.map((t) => (
        <div key={t.title} className="trap-card" style={{ borderLeft: `3px solid ${severityColor[t.severity]}` }}>
          <div className="trap-header">
            <span className="trap-severity" style={{ background: severityColor[t.severity] + "20", color: severityColor[t.severity], border: `1px solid ${severityColor[t.severity]}40` }}>{t.severity}</span>
            <span className="trap-title">{t.title}</span>
          </div>
          <p className="trap-desc">{t.desc}</p>
          <div className="trap-fix">
            <span className="trap-fix-label">FIX:</span> {t.fix}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function WyckoffBook() {
  const [activeChapter, setActiveChapter] = useState("intro");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [activeChapter]);

  const chapterContent = {
    intro: <ChapterIntro />,
    laws: <ChapterLaws />,
    phases: <ChapterPhases />,
    accumulation: <ChapterAccumulation />,
    distribution: <ChapterDistribution />,
    reaccum: <ChapterReaccum />,
    spring: <ChapterSpring />,
    volume: <ChapterVolume />,
    cheatsheet: <ChapterCheatsheet />,
    mapping: <ChapterMapping />,
    entries: <ChapterEntries />,
    mistakes: <ChapterMistakes />,
  };

  const current = CHAPTERS.find((c) => c.id === activeChapter);

  return (
    <div style={{ display: "flex", height: "100vh", background: "#07070f", color: "#e0e0e0", fontFamily: "'Georgia', serif", overflow: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: #0a0a18; } ::-webkit-scrollbar-thumb { background: #2a2a4a; border-radius: 3px; }

        .lead-text { font-size: 15px; line-height: 1.8; color: #c0c0c0; margin-bottom: 1.5rem; border-left: 2px solid #d4af3740; padding-left: 1rem; }
        blockquote { border-left: 3px solid #d4af37; padding: 1rem 1.5rem; background: #0f0f1a; margin: 1.5rem 0; border-radius: 0 8px 8px 0; font-style: italic; color: #d4af37; font-size: 15px; }
        
        .concept-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin: 1.5rem 0; }
        .concept-card { background: #0c0c18; border: 1px solid #1f1f35; border-radius: 8px; padding: 1.25rem; }
        .concept-title { font-size: 14px; font-weight: bold; color: #d4af37; margin-bottom: 0.5rem; font-family: monospace; letter-spacing: 0.5px; }
        .concept-body { font-size: 13px; color: #999; line-height: 1.7; }
        
        .key-insight { background: linear-gradient(135deg, #0f0f1a, #12121f); border: 1px solid #d4af3730; border-radius: 8px; padding: 1.25rem 1.5rem; margin: 1.5rem 0; }
        .ki-label { font-size: 10px; font-family: monospace; letter-spacing: 2px; color: #d4af37; background: #d4af3715; padding: 3px 8px; border-radius: 3px; display: inline-block; margin-bottom: 0.75rem; }
        .key-insight p { font-size: 13px; color: #aaa; line-height: 1.7; }

        .law-card { background: #0c0c18; border: 1px solid #1f1f35; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.25rem; }
        .law-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .law-num { font-size: 10px; font-family: monospace; letter-spacing: 2px; color: #555; }
        .law-title { font-size: 16px; font-weight: bold; font-family: monospace; }
        .law-body { font-size: 13px; color: #999; line-height: 1.7; margin-bottom: 1rem; }
        .law-signals { display: flex; flex-direction: column; gap: 0.4rem; }
        .law-signal { font-size: 12px; color: #888; font-family: monospace; }

        .phase-grid { display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem; }
        .phase-card { background: #0c0c18; border-radius: 8px; padding: 1.25rem; }
        .phase-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .phase-letter { font-size: 18px; font-weight: bold; font-family: monospace; }
        .phase-theme { font-size: 12px; color: #666; font-family: monospace; letter-spacing: 1px; text-transform: uppercase; }
        .phase-row { display: grid; grid-template-columns: 1fr 1px 1fr; gap: 1rem; margin-bottom: 1rem; }
        .phase-divider { background: #1f1f35; }
        .phase-col-label { font-size: 10px; font-family: monospace; letter-spacing: 1.5px; margin-bottom: 0.5rem; }
        .phase-col-text { font-size: 13px; color: #888; line-height: 1.6; }
        .phase-events { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .phase-event { font-size: 11px; font-family: monospace; padding: 3px 10px; border-radius: 3px; border: 1px solid; }

        .event-row { padding: 1.25rem; background: #0b0b18; border-radius: 0 8px 8px 0; margin-bottom: 0.75rem; }
        .event-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }
        .event-code { font-size: 14px; font-weight: bold; font-family: monospace; }
        .event-name { font-size: 14px; font-weight: bold; }
        .event-phase { font-size: 10px; font-family: monospace; padding: 2px 8px; border-radius: 3px; border: 1px solid; margin-left: auto; }
        .event-desc { font-size: 13px; color: #999; line-height: 1.6; margin-bottom: 0.5rem; }
        .event-spot { font-size: 12px; color: #666; background: #0f0f1a; padding: 0.5rem 0.75rem; border-radius: 4px; }
        .event-spot-label { color: #d4af37; font-family: monospace; font-size: 10px; letter-spacing: 1px; margin-right: 6px; }

        .diagram-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1.5rem 0; }
        .diagram-label { font-size: 12px; font-family: monospace; letter-spacing: 1px; margin-bottom: 0.5rem; }

        .cs-section { background: #0a0a16; border-radius: 8px; padding: 1.5rem; border: 1px solid #1a1a30; }
        .cs-title { font-size: 12px; font-family: monospace; letter-spacing: 2px; margin-bottom: 1rem; }
        .cs-grid { display: flex; flex-direction: column; gap: 0.5rem; }
        .cs-row { display: flex; gap: 1rem; padding: 0.75rem; background: #0c0c1a; border-radius: 6px; border: 1px solid #15152a; }
        .cs-event { font-size: 14px; font-weight: bold; font-family: monospace; color: #d4af37; min-width: 55px; display: flex; align-items: center; }
        .cs-details { flex: 1; font-size: 12px; color: #888; display: flex; flex-wrap: wrap; gap: 0.25rem 1.5rem; }
        .cs-label { color: #555; font-family: monospace; font-size: 10px; letter-spacing: 1px; margin-right: 4px; }
        .cs-action { font-size: 12px; font-weight: bold; width: 100%; margin-top: 0.25rem; }

        .table-container { overflow-x: auto; margin: 1rem 0; }
        .wyckoff-table { width: 100%; border-collapse: collapse; font-size: 12px; }
        .wyckoff-table th { background: #0f0f1f; color: #d4af37; font-family: monospace; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid #2a2a45; }
        .wyckoff-table td { padding: 0.6rem 1rem; border-bottom: 1px solid #13131f; color: #999; vertical-align: top; }
        .wyckoff-table tr:hover td { background: #0c0c1a; }

        .step-card { display: flex; gap: 1.25rem; padding: 1.25rem; background: #0b0b18; border-radius: 8px; margin-bottom: 0.75rem; border: 1px solid #15152a; }
        .step-number { font-size: 28px; font-weight: bold; font-family: monospace; min-width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 8px; border: 1px solid; }
        .step-content { flex: 1; }
        .step-title { font-size: 15px; font-weight: bold; margin-bottom: 0.4rem; font-family: monospace; }
        .step-body { font-size: 13px; color: #999; line-height: 1.6; }

        .entry-grid { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
        .entry-card { background: #0c0c18; border: 1px solid #1f1f35; border-radius: 10px; padding: 1.5rem; }
        .entry-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem; }
        .entry-num { font-size: 11px; font-family: monospace; letter-spacing: 1px; color: #555; }
        .entry-quality { font-size: 11px; font-family: monospace; }
        .entry-title { font-size: 16px; font-weight: bold; margin-bottom: 0.75rem; }
        .entry-desc { font-size: 13px; color: #999; line-height: 1.6; margin-bottom: 1rem; }
        .entry-details { display: flex; flex-direction: column; gap: 0.4rem; background: #0a0a14; padding: 1rem; border-radius: 6px; }
        .entry-detail { font-size: 12px; color: #888; }
        .ed-label { font-family: monospace; font-size: 10px; letter-spacing: 1px; color: #d4af37; margin-right: 6px; }

        .trap-card { padding: 1.25rem; background: #0b0b18; border-radius: 0 8px 8px 0; margin-bottom: 0.75rem; }
        .trap-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
        .trap-severity { font-size: 10px; font-family: monospace; letter-spacing: 1.5px; padding: 3px 10px; border-radius: 3px; }
        .trap-title { font-size: 14px; font-weight: bold; }
        .trap-desc { font-size: 13px; color: #999; line-height: 1.6; margin-bottom: 0.75rem; }
        .trap-fix { font-size: 12px; color: #7a7aaa; background: #0f0f1a; padding: 0.5rem 0.75rem; border-radius: 4px; border-left: 2px solid #4a4a9a; }
        .trap-fix-label { color: #8888ff; font-family: monospace; font-size: 10px; letter-spacing: 1px; margin-right: 6px; }

        @media (max-width: 640px) {
          .diagram-row { grid-template-columns: 1fr; }
          .phase-row { grid-template-columns: 1fr; }
          .phase-divider { display: none; }
        }
      `}</style>

      {/* SIDEBAR */}
      <div style={{
        width: sidebarOpen ? 260 : 0, minWidth: sidebarOpen ? 260 : 0,
        transition: "all 0.3s ease", overflow: "hidden",
        background: "#080814", borderRight: "1px solid #1a1a2e",
        display: "flex", flexDirection: "column",
      }}>
        {/* Book title */}
        <div style={{ padding: "1.5rem 1.25rem 1rem", borderBottom: "1px solid #1a1a2e" }}>
          <div style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 3, color: "#d4af37", marginBottom: 6 }}>THE COMPLETE GUIDE TO</div>
          <div style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1, lineHeight: 1.2 }}>WYCKOFF</div>
          <div style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1, color: "#d4af37" }}>METHOD</div>
          <div style={{ fontSize: 10, color: "#444", marginTop: 6, fontFamily: "monospace" }}>MARKET STRUCTURE · VOLUME · PHASES</div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "0.75rem 0" }}>
          {CHAPTERS.map((ch, i) => (
            <button
              key={ch.id}
              onClick={() => setActiveChapter(ch.id)}
              style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                width: "100%", padding: "0.65rem 1.25rem",
                background: activeChapter === ch.id ? "#d4af3712" : "transparent",
                border: "none", borderLeft: activeChapter === ch.id ? "2px solid #d4af37" : "2px solid transparent",
                cursor: "pointer", color: activeChapter === ch.id ? "#d4af37" : "#666",
                textAlign: "left", transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 14, minWidth: 20, textAlign: "center", opacity: 0.7 }}>{ch.icon}</span>
              <div>
                <div style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 1, color: activeChapter === ch.id ? "#d4af3780" : "#333", marginBottom: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ fontSize: 12, fontWeight: activeChapter === ch.id ? "bold" : "normal" }}>{ch.title}</div>
              </div>
            </button>
          ))}
        </nav>

        <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid #1a1a2e", fontSize: 10, color: "#333", fontFamily: "monospace" }}>
          WYCKOFF · {new Date().getFullYear()} · ALL MARKETS
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem 1.5rem", borderBottom: "1px solid #1a1a2e", background: "#080814", flexShrink: 0 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 18, lineHeight: 1 }}>
            {sidebarOpen ? "⊟" : "⊞"}
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: 11, color: "#444", fontFamily: "monospace" }}>
            <span>WYCKOFF</span><span style={{ color: "#2a2a4a" }}>›</span>
            <span style={{ color: "#d4af37" }}>{current?.title}</span>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem" }}>
            {["PREV", "NEXT"].map((dir) => {
              const idx = CHAPTERS.findIndex((c) => c.id === activeChapter);
              const target = dir === "PREV" ? CHAPTERS[idx - 1] : CHAPTERS[idx + 1];
              return (
                <button key={dir} onClick={() => target && setActiveChapter(target.id)} disabled={!target}
                  style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 1, padding: "4px 12px", background: "none", border: "1px solid #2a2a3a", borderRadius: 4, color: target ? "#888" : "#333", cursor: target ? "pointer" : "default" }}>
                  {dir}
                </button>
              );
            })}
          </div>
        </div>

        {/* Chapter content */}
        <div ref={contentRef} style={{ flex: 1, overflowY: "auto", padding: "2rem 2.5rem" }}>
          {/* Chapter heading */}
          <div style={{ marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid #1a1a2e" }}>
            <div style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 3, color: "#d4af37", marginBottom: 8 }}>
              CHAPTER {String(CHAPTERS.findIndex((c) => c.id === activeChapter) + 1).padStart(2, "0")}
            </div>
            <h1 style={{ fontSize: 28, fontWeight: "bold", letterSpacing: 0.5, marginBottom: 4 }}>{current?.title}</h1>
            <div style={{ height: 2, width: 60, background: "linear-gradient(90deg, #d4af37, transparent)", borderRadius: 2, marginTop: 12 }} />
          </div>

          {chapterContent[activeChapter]}

          {/* Bottom nav */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid #1a1a2e" }}>
            {(() => {
              const idx = CHAPTERS.findIndex((c) => c.id === activeChapter);
              const prev = CHAPTERS[idx - 1]; const next = CHAPTERS[idx + 1];
              return (<>
                {prev ? (
                  <button onClick={() => setActiveChapter(prev.id)} style={{ background: "#0c0c18", border: "1px solid #1f1f35", borderRadius: 8, padding: "0.75rem 1.25rem", cursor: "pointer", color: "#999", fontSize: 12, fontFamily: "monospace", textAlign: "left" }}>
                    <div style={{ color: "#444", fontSize: 10, letterSpacing: 1, marginBottom: 3 }}>‹ PREVIOUS</div>
                    {prev.title}
                  </button>
                ) : <div />}
                {next ? (
                  <button onClick={() => setActiveChapter(next.id)} style={{ background: "#0c0c18", border: "1px solid #d4af3730", borderRadius: 8, padding: "0.75rem 1.25rem", cursor: "pointer", color: "#d4af37", fontSize: 12, fontFamily: "monospace", textAlign: "right" }}>
                    <div style={{ color: "#d4af3770", fontSize: 10, letterSpacing: 1, marginBottom: 3 }}>NEXT ›</div>
                    {next.title}
                  </button>
                ) : <div />}
              </>);
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
