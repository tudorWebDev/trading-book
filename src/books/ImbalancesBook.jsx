import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CHAPTERS = [
  { id: "foundation", title: "What Is an Imbalance", icon: "◈", tag: "FOUNDATION" },
  { id: "types", title: "Types of Imbalances", icon: "⊞", tag: "FOUNDATION" },
  { id: "fvg", title: "Fair Value Gaps", icon: "▣", tag: "IMBALANCES" },
  { id: "orderblock", title: "Order Blocks", icon: "⌬", tag: "IMBALANCES" },
  { id: "singleprint", title: "Single Prints & Gaps", icon: "≡", tag: "IMBALANCES" },
  { id: "voidzone", title: "Volume Voids", icon: "◎", tag: "IMBALANCES" },
  { id: "of_confirm", title: "Order Flow Confirmation", icon: "△", tag: "EXECUTION" },
  { id: "mitigation", title: "Mitigation & Filling", icon: "⟳", tag: "EXECUTION" },
  { id: "pairing", title: "Pairing With Other Concepts", icon: "⊟", tag: "SYSTEMS" },
  { id: "stacking", title: "Stacking Imbalances", icon: "◉", tag: "SYSTEMS" },
  { id: "cheatsheet", title: "Cheat Sheet", icon: "✦", tag: "REFERENCE" },
  { id: "mistakes", title: "Critical Mistakes", icon: "⚠", tag: "REFERENCE" },
];

function FVGDiagram() {
  return (
    <svg viewBox="0 0 720 320" className="w-full" style={{ fontFamily: "monospace" }}>
      <rect width="720" height="320" fill="#07070f" rx="8" />
      <text x="360" y="20" fill="#ffffff40" fontSize="10" textAnchor="middle" letterSpacing="2">FAIR VALUE GAP — FORMATION AND ANATOMY</text>
      <rect x="10" y="28" width="340" height="285" fill="#00ff9906" rx="5" stroke="#00ff9918" strokeWidth="1" />
      <text x="180" y="46" fill="#00ff99" fontSize="11" textAnchor="middle" fontWeight="bold" letterSpacing="1">BULLISH FVG</text>
      <rect x="60" y="160" width="28" height="80" fill="#ff444440" stroke="#ff4444" strokeWidth="1" rx="1" />
      <line x1="74" y1="150" x2="74" y2="160" stroke="#ff4444" strokeWidth="1.5" />
      <line x1="74" y1="240" x2="74" y2="255" stroke="#ff4444" strokeWidth="1.5" />
      <text x="74" y="272" fill="#ff444470" fontSize="9" textAnchor="middle">C1</text>
      <rect x="130" y="90" width="28" height="150" fill="#00ff9940" stroke="#00ff99" strokeWidth="1.5" rx="1" />
      <line x1="144" y1="65" x2="144" y2="90" stroke="#00ff99" strokeWidth="1.5" />
      <line x1="144" y1="240" x2="144" y2="258" stroke="#00ff99" strokeWidth="1.5" />
      <text x="144" y="272" fill="#00ff9970" fontSize="9" textAnchor="middle">C2 (impulse)</text>
      <rect x="200" y="70" width="28" height="70" fill="#00ff9930" stroke="#00ff9980" strokeWidth="1" rx="1" />
      <line x1="214" y1="55" x2="214" y2="70" stroke="#00ff99" strokeWidth="1.5" />
      <line x1="214" y1="140" x2="214" y2="155" stroke="#00ff99" strokeWidth="1.5" />
      <text x="214" y="272" fill="#00ff9970" fontSize="9" textAnchor="middle">C3</text>
      <rect x="55" y="155" width="200" height="15" fill="#00ff9925" stroke="#00ff9960" strokeWidth="1" strokeDasharray="3,3" />
      <text x="30" y="159" fill="#00ff9980" fontSize="9" textAnchor="end">C1 low</text>
      <text x="30" y="171" fill="#00ff9980" fontSize="9" textAnchor="end">C3 high</text>
      <text x="180" y="150" fill="#00ff99" fontSize="10" textAnchor="middle" fontWeight="bold">FVG ZONE</text>
      <text x="180" y="195" fill="#00ff9960" fontSize="9" textAnchor="middle">Price never traded here</text>
      <text x="180" y="207" fill="#00ff9950" fontSize="9" textAnchor="middle">Auction incomplete</text>
      <text x="295" y="118" fill="#00ff99" fontSize="9">Price returns</text>
      <text x="295" y="130" fill="#00ff9960" fontSize="9">to fill FVG</text>
      <rect x="370" y="28" width="340" height="285" fill="#ff444406" rx="5" stroke="#ff444418" strokeWidth="1" />
      <text x="540" y="46" fill="#ff4444" fontSize="11" textAnchor="middle" fontWeight="bold" letterSpacing="1">BEARISH FVG</text>
      <rect x="420" y="80" width="28" height="80" fill="#00ff9930" stroke="#00ff9980" strokeWidth="1" rx="1" />
      <line x1="434" y1="65" x2="434" y2="80" stroke="#00ff99" strokeWidth="1.5" />
      <line x1="434" y1="160" x2="434" y2="175" stroke="#00ff99" strokeWidth="1.5" />
      <text x="434" y="272" fill="#00ff9970" fontSize="9" textAnchor="middle">C1</text>
      <rect x="490" y="110" width="28" height="160" fill="#ff444440" stroke="#ff4444" strokeWidth="1.5" rx="1" />
      <line x1="504" y1="80" x2="504" y2="110" stroke="#ff4444" strokeWidth="1.5" />
      <line x1="504" y1="270" x2="504" y2="285" stroke="#ff4444" strokeWidth="1.5" />
      <text x="504" y="300" fill="#ff444470" fontSize="8" textAnchor="middle">C2 (impulse)</text>
      <rect x="560" y="210" width="28" height="60" fill="#ff444430" stroke="#ff444480" strokeWidth="1" rx="1" />
      <line x1="574" y1="198" x2="574" y2="210" stroke="#ff4444" strokeWidth="1.5" />
      <line x1="574" y1="270" x2="574" y2="282" stroke="#ff4444" strokeWidth="1.5" />
      <text x="574" y="300" fill="#ff444470" fontSize="8" textAnchor="middle">C3</text>
      <rect x="415" y="160" width="200" height="15" fill="#ff444420" stroke="#ff444460" strokeWidth="1" strokeDasharray="3,3" />
      <text x="380" y="165" fill="#ff444480" fontSize="9" textAnchor="end">C1 high</text>
      <text x="380" y="177" fill="#ff444480" fontSize="9" textAnchor="end">C3 low</text>
      <text x="540" y="155" fill="#ff4444" fontSize="10" textAnchor="middle" fontWeight="bold">FVG ZONE</text>
      <text x="540" y="195" fill="#ff444460" fontSize="9" textAnchor="middle">Price never traded here</text>
      <text x="645" y="228" fill="#ff4444" fontSize="9">Returns</text>
      <text x="645" y="240" fill="#ff444460" fontSize="9">to fill</text>
    </svg>
  );
}

function OrderBlockDiagram() {
  return (
    <svg viewBox="0 0 720 300" className="w-full" style={{ fontFamily: "monospace" }}>
      <rect width="720" height="300" fill="#07070f" rx="8" />
      <text x="360" y="20" fill="#ffffff40" fontSize="10" textAnchor="middle" letterSpacing="2">ORDER BLOCK — ORIGIN AND RETURN</text>
      <rect x="10" y="28" width="340" height="265" fill="#00ff9906" rx="5" stroke="#00ff9918" strokeWidth="1" />
      <text x="180" y="46" fill="#00ff99" fontSize="11" textAnchor="middle" fontWeight="bold">BULLISH ORDER BLOCK</text>
      <rect x="50" y="190" width="22" height="50" fill="#ff444440" stroke="#ff4444" strokeWidth="1" rx="1" />
      <rect x="80" y="195" width="22" height="45" fill="#ff444435" stroke="#ff444470" strokeWidth="1" rx="1" />
      <rect x="110" y="185" width="22" height="40" fill="#ff444430" stroke="#ff444460" strokeWidth="1" rx="1" />
      <rect x="140" y="175" width="22" height="65" fill="#ff444460" stroke="#ff4444" strokeWidth="2" rx="1" />
      <text x="151" y="258" fill="#ff4444" fontSize="8" textAnchor="middle">OB</text>
      <rect x="170" y="80" width="22" height="95" fill="#00ff9950" stroke="#00ff99" strokeWidth="2" rx="1" />
      <line x1="181" y1="65" x2="181" y2="80" stroke="#00ff99" strokeWidth="1.5" />
      <line x1="181" y1="175" x2="181" y2="185" stroke="#00ff99" strokeWidth="1.5" />
      <rect x="200" y="60" width="22" height="50" fill="#00ff9940" stroke="#00ff9980" strokeWidth="1" rx="1" />
      <rect x="230" y="45" width="22" height="45" fill="#00ff9940" stroke="#00ff9980" strokeWidth="1" rx="1" />
      <rect x="260" y="35" width="22" height="40" fill="#00ff9940" stroke="#00ff9980" strokeWidth="1" rx="1" />
      <rect x="45" y="175" width="125" height="65" fill="none" stroke="#00ff99" strokeWidth="1.5" strokeDasharray="4,3" rx="3" />
      <text x="108" y="170" fill="#00ff99" fontSize="9" textAnchor="middle">OB ZONE</text>
      <text x="108" y="290" fill="#00ff9960" fontSize="9" textAnchor="middle">Last bearish candle before impulse</text>
      <rect x="370" y="28" width="340" height="265" fill="#ff444406" rx="5" stroke="#ff444418" strokeWidth="1" />
      <text x="540" y="46" fill="#ff4444" fontSize="11" textAnchor="middle" fontWeight="bold">BEARISH ORDER BLOCK</text>
      <rect x="400" y="60" width="22" height="50" fill="#00ff9930" stroke="#00ff9970" strokeWidth="1" rx="1" />
      <rect x="430" y="55" width="22" height="45" fill="#00ff9930" stroke="#00ff9970" strokeWidth="1" rx="1" />
      <rect x="460" y="50" width="22" height="50" fill="#00ff9930" stroke="#00ff9970" strokeWidth="1" rx="1" />
      <rect x="490" y="45" width="22" height="65" fill="#00ff9950" stroke="#00ff99" strokeWidth="2" rx="1" />
      <text x="501" y="128" fill="#00ff99" fontSize="8" textAnchor="middle">OB</text>
      <rect x="520" y="110" width="22" height="120" fill="#ff444450" stroke="#ff4444" strokeWidth="2" rx="1" />
      <line x1="531" y1="95" x2="531" y2="110" stroke="#ff4444" strokeWidth="1.5" />
      <line x1="531" y1="230" x2="531" y2="248" stroke="#ff4444" strokeWidth="1.5" />
      <rect x="550" y="210" width="22" height="50" fill="#ff444440" stroke="#ff444480" strokeWidth="1" rx="1" />
      <rect x="580" y="230" width="22" height="45" fill="#ff444440" stroke="#ff444480" strokeWidth="1" rx="1" />
      <rect x="610" y="245" width="22" height="40" fill="#ff444440" stroke="#ff444480" strokeWidth="1" rx="1" />
      <rect x="385" y="45" width="135" height="65" fill="none" stroke="#ff4444" strokeWidth="1.5" strokeDasharray="4,3" rx="3" />
      <text x="453" y="40" fill="#ff4444" fontSize="9" textAnchor="middle">OB ZONE</text>
      <text x="453" y="290" fill="#ff444460" fontSize="9" textAnchor="middle">Last bullish candle before impulse</text>
    </svg>
  );
}

function MitigationDiagram() {
  return (
    <svg viewBox="0 0 720 280" className="w-full" style={{ fontFamily: "monospace" }}>
      <rect width="720" height="280" fill="#07070f" rx="8" />
      <text x="360" y="20" fill="#ffffff40" fontSize="10" textAnchor="middle" letterSpacing="2">MITIGATION — FULL vs PARTIAL vs FAILED</text>
      {[
        { x: 20, label: "FULL MITIGATION", color: "#00ff99", path: "M 30,200 L 80,180 L 120,145 L 145,105 L 152,88 L 162,120 L 175,155 L 195,170", zy: 85, zh: 60, desc: "Fills entire zone — consumed" },
        { x: 260, label: "PARTIAL MITIGATION", color: "#ffaa00", path: "M 270,200 L 320,175 L 355,140 L 375,110 L 380,90 L 395,110 L 420,80 L 450,60", zy: 88, zh: 60, desc: "Fills 50%+ then bounces" },
        { x: 500, label: "FAILED MITIGATION", color: "#ff4444", path: "M 510,200 L 555,178 L 580,155 L 592,135 L 596,122 L 600,135 L 620,165 L 655,195 L 690,215", zy: 90, zh: 60, desc: "Rejects before full touch" },
      ].map((item) => (
        <g key={item.label}>
          <rect x={item.x} y="28" width="220" height="245" fill={item.color + "05"} rx="5" stroke={item.color + "18"} strokeWidth="1" />
          <text x={item.x + 110} y="46" fill={item.color} fontSize="10" textAnchor="middle" fontWeight="bold">{item.label}</text>
          <polyline points={item.path} fill="none" stroke={item.color} strokeWidth="2.5" strokeLinejoin="round" />
          <rect x={item.x + 5} y={item.zy} width="210" height={item.zh} fill={item.color + "18"} stroke={item.color + "50"} strokeWidth="1" strokeDasharray="3,3" rx="2" />
          <text x={item.x + 110} y={item.zy + item.zh + 18} fill={item.color + "80"} fontSize="9" textAnchor="middle">{item.desc}</text>
        </g>
      ))}
    </svg>
  );
}

function StackingDiagram() {
  return (
    <svg viewBox="0 0 720 300" className="w-full" style={{ fontFamily: "monospace" }}>
      <rect width="720" height="300" fill="#07070f" rx="8" />
      <text x="360" y="20" fill="#ffffff40" fontSize="10" textAnchor="middle" letterSpacing="2">STACKED IMBALANCES — CONFLUENCE ZONES</text>
      <polyline points="40,240 100,220 160,195 210,165 240,130 260,100 268,68 274,48 282,72 298,108 322,142 362,172 412,192 472,202 532,207 592,210 652,212 702,214"
        fill="none" stroke="#d4af37" strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="35" y="155" width="245" height="35" fill="#00ff9910" stroke="#00ff9940" strokeWidth="1" strokeDasharray="4,3" rx="3" />
      <text x="20" y="170" fill="#00ff99" fontSize="9" textAnchor="end">OB</text>
      <rect x="35" y="98" width="245" height="30" fill="#00ccff10" stroke="#00ccff40" strokeWidth="1" strokeDasharray="4,3" rx="3" />
      <text x="20" y="116" fill="#00ccff" fontSize="9" textAnchor="end">FVG</text>
      <rect x="35" y="58" width="245" height="26" fill="#ffaa0010" stroke="#ffaa0040" strokeWidth="1" strokeDasharray="4,3" rx="3" />
      <text x="20" y="74" fill="#ffaa00" fontSize="9" textAnchor="end">SP</text>
      <rect x="285" y="44" width="155" height="152" fill="none" stroke="#d4af3740" strokeWidth="1.5" rx="4" strokeDasharray="5,3" />
      <text x="362" y="38" fill="#d4af37" fontSize="10" textAnchor="middle" fontWeight="bold">STACKED ZONE</text>
      <text x="362" y="212" fill="#d4af3770" fontSize="9" textAnchor="middle">OB + FVG + SP overlap</text>
      <text x="362" y="224" fill="#d4af3750" fontSize="9" textAnchor="middle">Maximum conviction</text>
      <rect x="595" y="220" width="115" height="68" fill="#0c0c1c" rx="5" stroke="#d4af3730" strokeWidth="1" />
      <text x="653" y="237" fill="#d4af37" fontSize="10" textAnchor="middle" fontWeight="bold">SCORE</text>
      <text x="653" y="252" fill="#00ff99" fontSize="11" textAnchor="middle">OB ✓</text>
      <text x="653" y="264" fill="#00ccff" fontSize="11" textAnchor="middle">FVG ✓</text>
      <text x="653" y="278" fill="#ffaa00" fontSize="11" textAnchor="middle">SP ✓  →  3/3</text>
    </svg>
  );
}

// ── CONTENT ───────────────────────────────────────────────────────────────────

function ChapterFoundation() {
  return (
    <div>
      <p className="lead-text">An imbalance is a price level where the market only traded one-sided. Buyers OR sellers transacted — not both. The auction was incomplete. Markets have a structural drive to return to these areas and finish the transaction that was skipped.</p>
      <blockquote>"Every gap, every void, every single print is an IOU from the market. It will be paid eventually."</blockquote>
      <div className="concept-grid">
        {[
          { title: "Why Imbalances Form", color: "#d4af37", body: "Imbalances form when one side is so aggressive that price skips past levels without giving the other side a chance to respond. A panic sell sends price through 20 levels in one candle — buyers at those 20 levels never got to participate. Those levels are now imbalanced. The market knows, and it will return." },
          { title: "The Auction Market Principle", color: "#00ccff", body: "Markets function as two-sided auctions. Every price level seeks to facilitate transactions for BOTH buyers and sellers. When a level is visited one-sidedly, the auction at that level is incomplete. The market has an inherent drive to return to incomplete auctions and allow the missing side to transact. This is mechanical, not theoretical." },
          { title: "What Drives the Return", color: "#00ff99", body: "Institutional algorithms are programmed to place orders at imbalance zones. When price returns, those orders create the reaction you see. Additionally, traders who missed the initial move place limit orders at the imbalance expecting the fill before continuation. The imbalance is the magnet — the orders placed there are the force that creates the reaction." },
          { title: "Not All Imbalances Are Equal", color: "#ff4444", body: "An imbalance on a 1-minute chart during Asian session is not the same as an imbalance on a daily chart during a major structural move. Size, timeframe, context (Wyckoff phase, trend direction), and how many times it's been tested all determine significance. Treat them differently." },
        ].map((c) => (
          <div key={c.title} className="concept-card" style={{ borderTop: `2px solid ${c.color}40` }}>
            <div className="concept-title" style={{ color: c.color }}>{c.title}</div>
            <div className="concept-body">{c.body}</div>
          </div>
        ))}
      </div>
      <div className="law-card" style={{ borderColor: "#d4af3740" }}>
        <div className="law-header"><span className="law-title" style={{ color: "#d4af37" }}>The Imbalance Ecosystem — Overview</span></div>
        <div className="table-container">
          <table className="of-table">
            <thead><tr><th>Type</th><th>What It Is</th><th>Timeframe</th><th>Reliability</th><th>Primary Use</th></tr></thead>
            <tbody>
              {[
                ["Fair Value Gap (FVG)", "3-candle gap where middle candle leaves space", "All TFs", "HIGH", "Entry zone, target, S/R"],
                ["Order Block (OB)", "Last opposing candle before impulse move", "All TFs", "VERY HIGH", "Entry zone, stops, targets"],
                ["Single Print", "Price level with only one side of footprint", "Micro (footprint)", "HIGH", "Micro entry precision"],
                ["Volume Void", "Price range with near-zero VP volume", "All TFs", "HIGH", "Target, speed indicator"],
                ["Price Gap", "Open above/below prior close", "Daily+", "MEDIUM", "Target, support/resistance"],
                ["Liquidity Void", "Area swept through in one candle", "All TFs", "HIGH", "Target after sweep"],
              ].map((row, i) => (
                <tr key={i}>{row.map((cell, j) => <td key={j} style={{ color: cell === "VERY HIGH" ? "#00ff99" : cell === "HIGH" ? "#d4af37" : cell === "MEDIUM" ? "#ffaa00" : undefined }}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="key-insight">
        <span className="ki-label">THE CORE RULE</span>
        <p>Every imbalance is eventually mitigated. The question is not IF price returns — it's WHEN, and whether you trade the return (counter-trend) or trade in the direction of the move that created it (with-trend after mitigation). Both are valid. Context determines which is correct.</p>
      </div>
    </div>
  );
}

function ChapterTypes() {
  return (
    <div>
      <p className="lead-text">Each imbalance type has a different formation logic, visual signature, and trading approach. Learn them separately before combining them.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        {[
          { title: "Fair Value Gap (FVG)", color: "#00ccff", icon: "▣",
            formation: "Three consecutive candles where the middle candle's range doesn't overlap with candles 1 or 3. The gap between C1's extreme and C3's extreme is the FVG. Price never traded in that zone.",
            significance: "The FVG represents the most aggressive part of a move. The middle candle was so powerful it skipped prices. Those skipped prices are the imbalance.",
            strength: "Larger gaps stronger. FVG on HTF more significant. Fresh FVG (untested) most reliable. HTF-aligned FVG highest conviction." },
          { title: "Order Block (OB)", color: "#00ff99", icon: "⌬",
            formation: "The last opposing candle before a significant impulse move. Last bearish candle before bullish impulse = bullish OB. Last bullish candle before bearish impulse = bearish OB.",
            significance: "The OB candle is where institutional orders were placed. When price left that level, those orders weren't fully filled. Return = market filling remaining orders.",
            strength: "OB with FVG inside = maximum strength. OB at structural level = strong. Fresh OB (0 tests) = strong. 2+ tests = weakened." },
          { title: "Single Print", color: "#ffaa00", icon: "≡",
            formation: "In footprint: a price tick with volume on only one side (bid or ask = 0). In standard charts: a price level visible only in one candle's wick with no other candle touching it.",
            significance: "Transaction at that level was entirely one-sided. Market moved through so fast the other side never participated. Completion requires a return.",
            strength: "Multiple consecutive single prints = high significance. At structural levels = very significant. Isolated single prints mid-range = lower significance." },
          { title: "Volume Void", color: "#8888ff", icon: "◎",
            formation: "A price range on VP with significantly below-average volume. Price moved through so quickly that few transactions occurred. Near-zero volume memory at those levels.",
            significance: "No historical volume = no institutional memory = no natural S/R. Price travels through voids at maximum speed. Voids predict where price moves fast, not where it stops.",
            strength: "Wider void = faster move. Void between two major HVNs = reliable speed channel. Void during off-hours = may fill faster during main session." },
          { title: "Price Gap (Open Gap)", color: "#d4af37", icon: "◈",
            formation: "Session opens significantly above or below the prior close. Common in equities. In crypto: occurs after weekends or major events. No price data exists in the gap range.",
            significance: "One-sided price discovery during off-hours. The gap is an imbalance by definition — nobody could transact there during the gap. Strong statistical tendency to fill.",
            strength: "Gap within Value Area = higher fill probability. Exhaustion gaps (at trend extremes) often fill. Breakaway gaps (from consolidation) may not fill for extended time." },
          { title: "Liquidity Void", color: "#ff4444", icon: "◉",
            formation: "The price range swept through during a stop hunt or cascade liquidation. The entire range becomes a void because the move was mechanical and one-sided, not genuine two-sided trading.",
            significance: "The trail left by a sweep. After the sweep reverses, price often fills this void on the way back — because genuine two-sided discovery never occurred there.",
            strength: "Liquidity void toward external liquidity = high fill probability. After sweep reversal = high velocity move through void. Use as targets after sweep entries." },
        ].map((t) => (
          <div key={t.title} className="concept-card" style={{ borderTop: `3px solid ${t.color}40` }}>
            <div className="concept-title" style={{ color: t.color, fontSize: 14 }}>{t.icon} {t.title}</div>
            <div style={{ fontSize: 10, color: "#555", fontFamily: "monospace", marginBottom: 6, letterSpacing: 1 }}>FORMATION</div>
            <div className="concept-body" style={{ marginBottom: 8 }}>{t.formation}</div>
            <div style={{ fontSize: 10, color: "#555", fontFamily: "monospace", marginBottom: 4, letterSpacing: 1 }}>SIGNIFICANCE</div>
            <div className="concept-body" style={{ marginBottom: 8 }}>{t.significance}</div>
            <div style={{ fontSize: 10, color: t.color + "70", fontFamily: "monospace", marginBottom: 4, letterSpacing: 1 }}>STRENGTH</div>
            <div style={{ fontSize: 11, color: "#777", lineHeight: 1.6 }}>{t.strength}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChapterFVG() {
  return (
    <div>
      <p className="lead-text">The Fair Value Gap is the most widely used imbalance concept in modern price action. It's also the most misused. Most traders draw FVGs everywhere and treat them all equally. Here's how to filter for the ones that actually matter.</p>
      <FVGDiagram />
      <div style={{ marginTop: "1.5rem" }}>
        <div className="law-card" style={{ borderColor: "#00ccff40" }}>
          <div className="law-header"><span className="law-title" style={{ color: "#00ccff" }}>FVG Rules — How to Draw Them Correctly</span></div>
          {[
            { rule: "The 3-Candle Rule", desc: "An FVG requires exactly 3 candles. C1's wick extreme must NOT touch C3's wick extreme. If any part overlaps — it's not an FVG. The gap must be clean.", color: "#00ccff" },
            { rule: "Bodies or Wicks?", desc: "Conservative: gap between C1 close and C3 open (body-to-body, smaller). Standard: gap between C1 wick extreme and C3 wick extreme (larger zone). Most traders use wick-to-wick. Pick one and be consistent.", color: "#d4af37" },
            { rule: "The 50% Level", desc: "The midpoint of the FVG is the most critical level within it. Price often reacts at 50% rather than fully filling. Institutional orders cluster near the 50% (equilibrium of the gap).", color: "#ffaa00" },
            { rule: "Fresh vs Visited", desc: "Fresh FVG (untested) = maximum strength. Once price touches it, some orders fill — weakens. Once price trades through the entire FVG — mitigated. Don't trade mitigated FVGs.", color: "#ff4444" },
            { rule: "HTF FVGs Override LTF", desc: "A Daily FVG beats a 15M FVG every time. If they conflict, the Daily FVG wins. Only trade LTF FVGs when they align with the HTF context, never against it.", color: "#00ff99" },
          ].map((r) => (
            <div key={r.rule} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", padding: "0.75rem", background: "#0a0a14", borderRadius: 6 }}>
              <div style={{ width: 4, background: r.color, borderRadius: 2, flexShrink: 0 }} />
              <div>
                <div style={{ color: r.color, fontFamily: "monospace", fontSize: 12, fontWeight: "bold", marginBottom: 4 }}>{r.rule}</div>
                <div style={{ color: "#888", fontSize: 12, lineHeight: 1.6 }}>{r.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="concept-grid" style={{ marginTop: "1.25rem" }}>
          {[
            { title: "High Quality FVG", color: "#00ff99", items: ["Formed during significant impulse (large candle)", "On HTF (4H, Daily, Weekly)", "Aligns with structural level or Wyckoff event", "Fresh — never returned to yet", "In direction of HTF trend", "Overlaps with an Order Block"] },
            { title: "Low Quality FVG — Skip", color: "#ff4444", items: ["Tiny gap on micro timeframe", "Already tested 2+ times (orders consumed)", "Against the HTF trend", "Formed during low-volume session", "No structural confluence", "Between very small candles (no real impulse)"] },
          ].map((c) => (
            <div key={c.title} className="concept-card" style={{ borderTop: `2px solid ${c.color}40` }}>
              <div className="concept-title" style={{ color: c.color }}>{c.title}</div>
              {c.items.map((item, i) => (
                <div key={i} style={{ fontSize: 12, color: c.color + "70", marginBottom: 4, display: "flex", gap: 6 }}>
                  <span>{c.color === "#00ff99" ? "✓" : "✗"}</span>{item}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="key-insight">
          <span className="ki-label">THE FVG 50% RULE</span>
          <p>When price enters a FVG, it commonly reacts at the 50% level — not at the full fill. Institutional limit orders concentrate at the midpoint. Trade management: if entering at the FVG top (bullish), place first profit target at the 50% then see if price accelerates for a full fill. The 50% is also your partial exit before the continuation target.</p>
        </div>
      </div>
    </div>
  );
}

function ChapterOrderBlock() {
  return (
    <div>
      <p className="lead-text">The Order Block is the most institutionally relevant imbalance. It's not just a gap — it's the specific candle where large orders were placed. When price returns, those orders defend the level. It's the closest you get to seeing the Composite Man's entry point.</p>
      <OrderBlockDiagram />
      <div style={{ marginTop: "1.5rem" }}>
        {[
          {
            title: "How to Identify a Valid Order Block", color: "#00ff99",
            rules: [
              { r: "Find the impulse first", d: "Start by identifying a strong impulsive move (large candle, wide spread, closes near extreme). The OB preceded this move." },
              { r: "Count back one candle", d: "The OB is the last candle in the OPPOSITE direction before the impulse. Last bearish before bullish impulse = bullish OB. Last bullish before bearish impulse = bearish OB." },
              { r: "OB zone = the candle body", d: "Draw a box from open to close of the OB candle. The body is where institutional orders were — not the wicks." },
              { r: "Impulse must be significant", d: "A 0.2% move doesn't create a meaningful OB. The impulse should be minimum 3x the average candle size on that timeframe. Bigger impulse = more significant OB." },
              { r: "Track test count", d: "First return = maximum strength. Second = still valid but weaker. Third = likely broken. Always know how many times an OB has been tested." },
            ],
          },
          {
            title: "Advanced OB Concepts", color: "#d4af37",
            rules: [
              { r: "Breaker Block", d: "When a bullish OB is broken decisively, it flips to a bearish OB. Old support becomes resistance. The Breaker Block is often more reliable than the original OB after the flip." },
              { r: "OB within FVG", d: "When the OB candle is inside an FVG, or creates one simultaneously — this is your highest conviction setup. Both point to the same level from different angles." },
              { r: "Institutional Candle (IC)", d: "A large candle that sweeps liquidity on one side and closes on the other. It IS the OB AND creates an FVG simultaneously. One candle triggering multiple imbalance signals = extremely significant." },
              { r: "Propulsion Block", d: "Multiple small same-direction candles preceding an impulse. The entire cluster = OB zone (not just the last candle). Wider zone, slightly wider stop required." },
              { r: "Mitigation Block", d: "OB fully traded through = consumed. Mark as invalidated. Do not trade an OB after price has closed a candle through its entire body." },
            ],
          },
        ].map((section) => (
          <div key={section.title} className="law-card" style={{ borderColor: section.color + "40" }}>
            <div className="law-header"><span className="law-title" style={{ color: section.color }}>{section.title}</span></div>
            {section.rules.map((r) => (
              <div key={r.r} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.6rem", padding: "0.6rem 0.75rem", background: "#0a0a14", borderRadius: 5 }}>
                <div style={{ width: 4, background: section.color, borderRadius: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ color: section.color, fontFamily: "monospace", fontSize: 12, fontWeight: "bold", marginBottom: 3 }}>{r.r}</div>
                  <div style={{ color: "#888", fontSize: 12, lineHeight: 1.6 }}>{r.d}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ChapterSinglePrint() {
  return (
    <div>
      <p className="lead-text">Single prints are the most granular imbalance concept. They represent the most precise version of the same logic: one-sided auction = incomplete = will be revisited.</p>
      {[
        { title: "What a Single Print Is", color: "#ffaa00", body: "In a footprint chart: each row represents one price tick. Left = bid volume (sellers hitting bids). Right = ask volume (buyers lifting asks). A single print = one side shows 0. Only buyers OR sellers transacted at that tick. The other side had no opportunity to participate. Bullish: ask volume present, bid = 0. Bearish: bid volume present, ask = 0.", action: "Mark single print levels. Price returns to complete the two-sided auction. Multiple consecutive single prints = single print cluster = FVG equivalent at micro level." },
        { title: "Single Prints Without Footprint", color: "#d4af37", body: "On standard candle charts: price levels that appear in only one candle's wick, with no other candle body or wick touching that level. Price moved through so fast the level only appears once. Use Volume Profile LVNs as the equivalent — thin VP nodes between HVNs represent the same concept at a larger scale.", action: "On TradingView without footprint: identify LVNs on VP. These are your single print equivalents. Price will move through LVN zones fast in both directions — use as targets not entries." },
        { title: "Price Gaps", color: "#00ccff", body: "In equities and futures: daily open significantly above/below prior close. Gap = price range where literally zero trading occurred. In crypto: occurs between Sunday and Monday opens, after major announcements, or low-liquidity periods.", action: "Rule: most gaps fill. Exceptions — breakaway gaps at the start of strong trends may stay open weeks. Measure gap fill distance and use as intraday target. Reliable and mechanical." },
        { title: "Single Print Clusters", color: "#00ff99", body: "Multiple consecutive single print levels in the same direction. Equivalent to a FVG at the micro level. The full cluster range = imbalance zone. Larger clusters (more ticks, more price range) produce more significant reactions on return.", action: "Mark the full range of the cluster as a box. Expect price to revisit the entire zone. Enter at the cluster boundary with OF confirmation. Target the opposite cluster boundary." },
      ].map((item) => (
        <div key={item.title} className="event-row" style={{ borderLeft: `3px solid ${item.color}`, marginBottom: "0.75rem" }}>
          <div className="event-header"><span className="event-code" style={{ color: item.color, fontSize: 15 }}>{item.title}</span></div>
          <p className="event-desc">{item.body}</p>
          <div className="event-spot"><span className="event-spot-label">APPLICATION:</span> {item.action}</div>
        </div>
      ))}
    </div>
  );
}

function ChapterVoidZone() {
  return (
    <div>
      <p className="lead-text">Volume voids don't tell you WHERE price will stop. They tell you WHERE it won't stop — and how fast it will move. That's a different and underappreciated type of edge.</p>
      {[
        { title: "How to Identify a Volume Void", color: "#8888ff", body: "On VP: look for a price range where histogram bars are significantly thinner than average — approaching zero. The void = full range from start to end of thin volume. On TradingView: Fixed Range or Session VP, look for narrow LVN bars. Mark the full void range with a box. Note HVNs on either side — those are your deceleration zones.", action: "Mark void ranges. Use them as transit zones for target placement, never as entry zones. Price accelerates through voids — don't set entries inside them." },
        { title: "Trading With Volume Voids", color: "#d4af37", body: "Voids are transit zones, not entry zones. When price enters a void, expect acceleration. Place profit targets at the opposite HVN boundary. Don't move stops into a void — let the trade run to the HVN.", action: "After confirming direction (OB, FVG, Wyckoff): check if a void exists between entry and target. If yes — target achievable fast, size up. If HVNs block path — target takes longer, may stall at each HVN." },
        { title: "Void + Imbalance Combination", color: "#00ccff", body: "FVG or OB at the edge of a volume void = extremely powerful setup. Price returns to the FVG/OB at the void's edge, reacts, then accelerates through the void to the next HVN.", action: "Sequence: Price at FVG/OB at void boundary → OF confirmation → enter → target opposite void HVN → expect fast move with minimal pullbacks through the void." },
        { title: "Void Formation", color: "#ffaa00", body: "Voids form during fast one-directional moves: stop cascades, news events, climax moves, sweep sequences. The faster and more one-directional the move — the thinner the VP. Sweeps create liquidity voids: mechanical one-sided move = void the market will naturally revisit.", action: "After a sweep reversal: map the void created by the sweep move. That void = your target range. Price fills it fast (no friction). Target the HVN at the other end of the void." },
      ].map((item) => (
        <div key={item.title} className="event-row" style={{ borderLeft: `3px solid ${item.color}`, marginBottom: "0.75rem" }}>
          <div className="event-header"><span className="event-code" style={{ color: item.color, fontSize: 15 }}>{item.title}</span></div>
          <p className="event-desc">{item.body}</p>
          <div className="event-spot"><span className="event-spot-label">APPLICATION:</span> {item.action}</div>
        </div>
      ))}
    </div>
  );
}

function ChapterOFConfirm() {
  return (
    <div>
      <p className="lead-text">Imbalances tell you WHERE to watch. Order flow tells you WHETHER to act. A price arriving at an FVG or OB without order flow confirmation is just a location — not a trade.</p>
      <div className="concept-grid">
        {[
          { title: "CVD at the Imbalance Zone", color: "#d4af37", body: "When price enters a bullish imbalance: CVD should show buying aggression arriving — positive delta, CVD rising. If CVD continues falling into the zone — buyers aren't showing up. Either wait or skip. The imbalance only becomes a trade when CVD starts diverging in your favor at that exact price level." },
          { title: "Delta Reversal on Touch", color: "#00ccff", body: "The most precise signal: the first candle entering the imbalance has opposite delta (negative in bullish OB). The NEXT candle has strong positive delta — buyers absorbing sellers at the imbalance. That delta reversal candle is your entry trigger. Not the touch candle — the reversal after it." },
          { title: "Volume Behavior at Imbalance", color: "#00ff99", body: "Healthy reaction: volume increases as price enters (opposition arriving at their zone), then decreases as price exits — one side absorbed the other. Unhealthy: volume keeps increasing as price trades through = opposition overwhelming defenders = zone being consumed, not defended." },
          { title: "OI at Imbalance Zones (Crypto)", color: "#ffaa00", body: "Price at major OB or FVG: watch OI. OI rising = new positions opening — someone committing at this level. OI rising at bullish OB with positive delta = institutions building longs at their own order block. Strongest possible confirmation. OI dropping = stops being hit (sweep of zone stops)." },
        ].map((c) => (
          <div key={c.title} className="concept-card" style={{ borderTop: `2px solid ${c.color}40` }}>
            <div className="concept-title" style={{ color: c.color }}>{c.title}</div>
            <div className="concept-body">{c.body}</div>
          </div>
        ))}
      </div>
      <div className="table-container" style={{ marginTop: "1.25rem" }}>
        <table className="of-table">
          <thead><tr><th>Imbalance Zone</th><th>OF Signal</th><th>Enter?</th><th>Stop</th></tr></thead>
          <tbody>
            {[
              ["Bullish FVG / OB", "CVD diverges bullish + positive delta reversal candle", "YES — full conviction", "Below OB body / below FVG zone"],
              ["Bullish FVG / OB", "CVD continues falling, no delta reversal", "NO — wait or skip", "—"],
              ["Bullish FVG / OB", "High volume absorption (holds with volume)", "YES — strong signal", "Below absorption candle low"],
              ["Bearish FVG / OB", "CVD diverges bearish + negative delta reversal candle", "YES — full conviction", "Above OB body / above FVG zone"],
              ["Bearish FVG / OB", "CVD continues rising into zone", "NO — wait or skip", "—"],
              ["Any imbalance", "High volume pushing THROUGH zone", "NO — zone being consumed", "Exit existing positions"],
              ["Single print zone", "CVD slows / reverses on approach", "YES — scale in carefully", "Beyond the zone"],
            ].map((row, i) => (
              <tr key={i}>{row.map((cell, j) => (
                <td key={j} style={{ color: j === 2 ? (cell.startsWith("YES") ? "#00ff99" : cell.startsWith("NO") ? "#ff4444" : undefined) : undefined }}>{cell}</td>
              ))}</tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="key-insight">
        <span className="ki-label">THE CONFIRMATION SEQUENCE</span>
        <p>Step 1: Price approaches pre-marked imbalance. Step 2: Watch CVD — decelerating or reversing on arrival? Step 3: Watch the touch candle — what is its delta? Step 4: Wait for the next candle. If it has delta supporting the imbalance direction — that's your trigger. Step 5: Enter on that confirmation candle's close. Stop beyond the zone. This sequence turns a 50/50 (zone touch alone) into a 65%+ probability trade.</p>
      </div>
    </div>
  );
}

function ChapterMitigation() {
  return (
    <div>
      <p className="lead-text">Mitigation is price returning to an imbalance and filling it. Understanding the type of mitigation tells you whether the imbalance is still active, partially used, or completely gone — and whether to trade it or delete it.</p>
      <MitigationDiagram />
      <div style={{ marginTop: "1.5rem" }}>
        {[
          { type: "Full Mitigation", color: "#00ff99", desc: "Price returns and trades through the ENTIRE imbalance zone. Every price level within has now been traded two-sidedly. The auction is complete. The imbalance no longer exists as S/R.", after: "Delete the zone from your chart. If price continues through, look for the next imbalance beyond it. The fully mitigated FVG/OB is dead — never trade it again.", signal: "Candle closes beyond the far boundary with volume. CVD confirms. No reversal within the zone." },
          { type: "Partial Mitigation (50% rule)", color: "#ffaa00", desc: "Price enters the zone and reaches at least 50% but doesn't trade through completely. Zone partially consumed but still active — remaining unfilled portion still has institutional orders.", after: "Adjust your zone. Consumed half is gone. Remaining half still tradeable. Update stop to reflect new zone boundary. 50% is often where the bounce occurs — partial mitigation entry zone.", signal: "Price enters zone, reaches 50%, CVD reverses, reversal candle forms. Entry at 50% level with stop beyond the full zone." },
          { type: "Failed Mitigation (Strongest Signal)", color: "#ff4444", desc: "Price approaches the zone but fails to enter it — rejects BEFORE touching the zone boundary. The imbalance is so strongly defended that price can't even reach the institutional orders inside it.", after: "Zone is at maximum strength. Add to position or enter fresh. The failed mitigation confirms the zone is fully loaded. This is your re-entry opportunity with tightest stop.", signal: "Price approaches, CVD reverses before zone is touched, reversal candle appears near but outside the zone boundary." },
          { type: "Mitigation + Continuation", color: "#00ccff", desc: "Price mitigates (partially or fully) the imbalance, then continues in the ORIGINAL direction that created it. The imbalance was the re-entry point — it absorbed the counter-trend move and launched price in the original direction again.", after: "This is your primary imbalance trading pattern. Wait for return, confirm OF, enter in original imbalance direction, target next structural level.", signal: "Price pulls back to OB/FVG → CVD diverges → reversal candle → enter in impulse direction → target prior high/low and beyond." },
        ].map((item) => (
          <div key={item.type} className="event-row" style={{ borderLeft: `3px solid ${item.color}`, marginBottom: "0.75rem" }}>
            <div className="event-header"><span className="event-code" style={{ color: item.color, fontSize: 15 }}>{item.type}</span></div>
            <p className="event-desc">{item.desc}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginTop: "0.5rem" }}>
              <div className="event-spot"><span className="event-spot-label">AFTER:</span> {item.after}</div>
              <div className="event-spot"><span className="event-spot-label" style={{ color: item.color }}>SIGNAL:</span> {item.signal}</div>
            </div>
          </div>
        ))}
        <div className="key-insight">
          <span className="ki-label">THE IMBALANCE LIFECYCLE</span>
          <p>Every imbalance: (1) Formation — impulse creates zone. (2) Fresh — maximum strength. (3) First touch — some orders filled, still strong. (4) Second touch — weakened, reduce size. (5) Full mitigation — consumed, delete. This lifecycle determines position size: fresh = full, first touch = 75%, second touch = 50%, approaching mitigation = skip. Track lifecycle for every imbalance you're watching.</p>
        </div>
      </div>
    </div>
  );
}

function ChapterPairing() {
  return (
    <div>
      <p className="lead-text">Imbalances are most powerful when aligned with other concepts. An isolated FVG is interesting. An FVG at a Wyckoff Spring level inside a demand zone at a VP POC with a liquidity sweep = highest conviction trade of the month.</p>
      {[
        { concept: "Imbalance + Wyckoff", color: "#d4af37", pairs: [
          { event: "SC creates OB + FVG", desc: "The Selling Climax candle is a massive bearish OB that simultaneously creates a bullish FVG. The SC = last bearish candle before the AR. This OB + FVG at the SC level = foundation of the entire accumulation structure." },
          { event: "Spring = FVG + SSL sweep", desc: "A Spring often creates a bullish FVG as it sweeps down and reverses. The FVG forms in the wick of the Spring candle. This FVG becomes the target for the first return during the LPS phase — and the entry zone for the LPS trade." },
          { event: "SOS creates OB for LPS", desc: "The SOS candle = large bullish candle preceded by a small bearish candle. On the LPS pullback, price returns to the OB formed by that SOS. The OB is your LPS entry zone." },
          { event: "UTAD creates bearish OB + FVG", desc: "The Upthrust After Distribution sweeps BSL and reverses. The reversal creates a bearish OB at the UT extreme. The sweep candle creates a bearish FVG. Both point to the same short entry zone." },
        ]},
        { concept: "Imbalance + Liquidity Sweeps", color: "#ff4444", pairs: [
          { event: "Sweep into imbalance zone", desc: "Most powerful setup: liquidity sweep terminating exactly at a fresh FVG or OB. The sweep provides fuel (stops). The imbalance provides the institutional order fill location. Maximum reversal force at that exact level." },
          { event: "FVG created by sweep candle", desc: "The sweep candle itself often creates an FVG in its wick. As price sweeps and reverses, the fast move creates a single-sided imbalance. This FVG = target for the reversal move to revisit on the way back." },
          { event: "OB at BSL/SSL level", desc: "OB sitting exactly at a BSL or SSL level — institutional orders in the OB placed precisely where stops will be hit. The sweep triggers stops, the OB absorbs resulting market orders. The Composite Man using the imbalance as his fill location." },
        ]},
        { concept: "Imbalance + Volume Profile", color: "#8888ff", pairs: [
          { event: "FVG overlaps with LVN", desc: "FVG inside a Low Volume Node — both point to same price range as a fast-travel zone. Price accelerates through this overlap in either direction. Use as target zone beyond which there's a natural HVN to stop the move." },
          { event: "OB at VP POC", desc: "OB sitting at the Volume Profile Point of Control. POC attracts price. OB defends it when it arrives. Price returns to POC, OB absorbs the move, price bounces with dual-layer support. Highest conviction fade location." },
          { event: "FVG + HVN layered support", desc: "Bullish FVG just above a major HVN. Price finds HVN first (decelerates), then potentially the FVG (absorbs if HVN fails). Two defense layers = wider stop but much higher probability of holding." },
        ]},
        { concept: "Imbalance + S/D Zones", color: "#00ff99", pairs: [
          { event: "OB IS the S/D zone origin", desc: "Order Block and Supply/Demand zone describe the same thing from different perspectives. The OB is the specific last opposing candle. The S/D zone is the full base. They overlap almost perfectly. Use OB for entry precision, S/D for broader context." },
          { event: "FVG inside S/D zone", desc: "FVG forming inside a larger Supply or Demand zone. The FVG provides entry precision within the zone. Instead of entering at the zone boundary (wide risk), enter at the FVG within the zone (tight risk). Same thesis, better execution." },
          { event: "Breaker = flipped S/D zone", desc: "When an OB is broken, the Breaker Block and 'flipped S/D zone' are identical. Old demand becomes supply. The breaker is just more precise — it identifies the exact candle rather than the full zone cluster." },
        ]},
      ].map((section) => (
        <div key={section.concept} className="law-card" style={{ borderColor: section.color + "40" }}>
          <div className="law-header"><span className="law-title" style={{ color: section.color }}>{section.concept}</span></div>
          {section.pairs.map((p) => (
            <div key={p.event} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.6rem", padding: "0.6rem 0.75rem", background: "#0a0a14", borderRadius: 5 }}>
              <div style={{ width: 4, background: section.color, borderRadius: 2, flexShrink: 0 }} />
              <div>
                <div style={{ color: section.color, fontFamily: "monospace", fontSize: 12, fontWeight: "bold", marginBottom: 3 }}>{p.event}</div>
                <div style={{ color: "#888", fontSize: 12, lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ChapterStacking() {
  return (
    <div>
      <p className="lead-text">Stacking is identifying when multiple imbalance types converge at the same price level. A single FVG is worth trading. Three different imbalance types at the same level is worth maximum size.</p>
      <StackingDiagram />
      <div style={{ marginTop: "1.5rem" }}>
        <div className="law-card" style={{ borderColor: "#d4af3740" }}>
          <div className="law-header"><span className="law-title" style={{ color: "#d4af37" }}>The Imbalance Stack Scoring System</span></div>
          <div className="table-container">
            <table className="of-table">
              <thead><tr><th>Component</th><th>Points</th><th>Notes</th></tr></thead>
              <tbody>
                {[
                  ["Fresh Order Block", "2", "Add 1 if OB from Daily+ timeframe"],
                  ["FVG overlapping OB", "2", "FVG inside or adjacent to OB"],
                  ["Volume Void at/beyond level", "1", "Fast travel zone beyond imbalance"],
                  ["VP Low Volume Node", "1", "VP confirmation of imbalance significance"],
                  ["Liquidity sweep terminated here", "2", "Institutional fill confirmed"],
                  ["Wyckoff event at same level", "2", "Spring, UT, SC, BC at the imbalance"],
                  ["HTF trend aligned", "1", "Trading in direction of HTF trend"],
                  ["S/D zone overlapping", "1", "Supply/demand confluence"],
                  ["CVD + OI confirmation", "1", "Real-time OF supporting imbalance"],
                ].map((row, i) => (
                  <tr key={i}>{row.map((cell, j) => <td key={j} style={{ color: j === 1 ? "#d4af37" : undefined }}>{cell}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem", marginTop: "1rem" }}>
            {[
              { score: "1–3", label: "SKIP", color: "#ff4444", desc: "Not enough confluence" },
              { score: "4–5", label: "SMALL", color: "#ffaa00", desc: "0.75–1% risk" },
              { score: "6–8", label: "STANDARD", color: "#00ccff", desc: "1.5–2% risk" },
              { score: "9+", label: "MAXIMUM", color: "#00ff99", desc: "2–3% risk" },
            ].map((s) => (
              <div key={s.score} style={{ background: "#0a0a14", borderRadius: 8, padding: "0.75rem", textAlign: "center", border: `1px solid ${s.color}30` }}>
                <div style={{ color: s.color, fontFamily: "monospace", fontSize: 18, fontWeight: "bold" }}>{s.score}</div>
                <div style={{ color: s.color, fontFamily: "monospace", fontSize: 10, letterSpacing: 1, marginBottom: 4 }}>{s.label}</div>
                <div style={{ color: "#777", fontSize: 11 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="concept-grid" style={{ marginTop: "1.25rem" }}>
          {[
            { title: "How to Scan for Stacks", color: "#d4af37", body: "Start HTF (weekly/daily): mark all OBs and FVGs. Then 4H: add 4H OBs and FVGs. Look for price levels where multiple markings from different timeframes cluster within 0.5%. That clustering IS the stack. Add VP levels and S/D zones. The more markings within 0.5% price band — the higher the stack score." },
            { title: "Timeframe Stacking", color: "#00ccff", body: "The most powerful version: the same imbalance visible on multiple timeframes. Bullish FVG on the weekly contains a bullish FVG on the daily, which contains a bullish OB on the 4H. All three pointing to the same price zone. This means the level matters to traders at every timeframe simultaneously." },
            { title: "The Perfect Stack", color: "#00ff99", body: "Fresh OB + FVG inside + at a Wyckoff Spring level + SSL sweep terminated here + VP LVN beyond + CVD reversing = score 10+. You'll see this 2-3 times per month on BTC 4H/Daily. When it appears — highest priority trade of the month. Don't miss it from over-analysis." },
            { title: "Managing Stacked Trades", color: "#ffaa00", body: "High stack score = wider entry zone (enter anywhere within the stacked cluster). Stop goes BELOW ALL imbalances in the stack — if entire stack fails, thesis is wrong. Target: next major imbalance in trade direction (often another stack on opposite side of range or at structural level)." },
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

function ChapterCheatsheet() {
  return (
    <div>
      <p className="lead-text">Pre-session mapping process and real-time decision framework for imbalances.</p>
      <div className="cs-section">
        <div className="cs-title" style={{ color: "#d4af37" }}>PRE-SESSION IMBALANCE MAPPING</div>
        {[
          { step: "WEEKLY CHART", items: ["Mark all visible OBs above and below price", "Mark all visible FVGs above and below price", "Note which are fresh vs tested", "These are macro imbalance targets for the week"], color: "#d4af37" },
          { step: "DAILY CHART", items: ["Mark all visible OBs (last 4 weeks)", "Mark all visible FVGs (last 4 weeks)", "Check for overlap with weekly = stack (score up)", "Mark prior day high/low imbalances"], color: "#ffaa00" },
          { step: "4H CHART", items: ["Mark 4H OBs (last 10 days)", "Mark 4H FVGs (last 10 days)", "Check VP LVNs between key HVNs", "Score overlapping zones using stack scoring"], color: "#8888ff" },
          { step: "1H/15M (EXECUTION ONLY)", items: ["Micro OBs and FVGs near key levels only", "Entry precision tools — not signal generators", "Never trade 15M imbalances without HTF context", "Asian session high/low = daily FVG equivalent"], color: "#00ccff" },
        ].map((section) => (
          <div key={section.step} style={{ marginBottom: "1rem" }}>
            <div style={{ color: section.color, fontFamily: "monospace", fontSize: 11, letterSpacing: 2, marginBottom: "0.5rem" }}>{section.step}</div>
            {section.items.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "0.75rem", padding: "0.5rem 0.75rem", background: "#0c0c1a", borderRadius: 4, marginBottom: 3 }}>
                <div style={{ width: 13, height: 13, border: `1px solid ${section.color}50`, borderRadius: 3, flexShrink: 0, marginTop: 1 }} />
                <span style={{ color: "#999", fontSize: 12 }}>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="cs-section" style={{ marginTop: "1.25rem" }}>
        <div className="cs-title" style={{ color: "#00ccff" }}>REAL-TIME DECISION TABLE</div>
        <div className="table-container">
          <table className="of-table">
            <thead><tr><th>Situation</th><th>OF Confirmation</th><th>Action</th><th>Stop</th></tr></thead>
            <tbody>
              {[
                ["Price entering bullish FVG/OB", "CVD diverges bullish + positive delta candle", "Long on confirmation candle close", "Below zone"],
                ["Price entering bullish FVG/OB", "CVD continues falling through zone", "WAIT or skip entirely", "—"],
                ["Price entering bearish FVG/OB", "CVD diverges bearish + negative delta candle", "Short on confirmation candle close", "Above zone"],
                ["Price entering bearish FVG/OB", "High volume pushing through zone", "Zone consumed — NO ENTRY", "—"],
                ["Price stalls before touching zone", "CVD reverses before zone touched", "Enter — failed mitigation = maximum strength", "Beyond zone boundary"],
                ["FVG + OB stack approached", "CVD decelerating + volume dropping", "Full size at stack zone boundary", "Below entire stack"],
                ["Imbalance touched 3rd time", "Any", "SKIP — likely exhausted", "—"],
                ["Price in volume void", "CVD trending through void", "No entry — hold position, target next HVN", "—"],
                ["OB broken decisively", "High volume + CVD accelerates through", "Breaker block — reverse direction", "Beyond the breaker"],
                ["OB + FVG at Wyckoff Spring", "Low volume test + CVD bullish divergence", "Maximum conviction long entry", "Below Spring wick"],
              ].map((row, i) => (
                <tr key={i}>{row.map((cell, j) => (
                  <td key={j} style={{ color: j === 2 ? (cell.startsWith("Long") || cell.includes("full size") || cell.includes("failed") || cell.includes("Maximum") ? "#00ff99" : cell.startsWith("Short") || cell.startsWith("Breaker") ? "#ff4444" : cell.startsWith("WAIT") || cell.startsWith("SKIP") || cell.includes("consumed") ? "#ffaa00" : undefined) : undefined }}>{cell}</td>
                ))}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="cs-section" style={{ marginTop: "1.25rem" }}>
        <div className="cs-title" style={{ color: "#00ff99" }}>STRENGTH QUICK REFERENCE</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
          {[
            { label: "MAX STRENGTH", color: "#00ff99", items: ["Fresh (0 tests)", "OB + FVG overlap", "Daily or Weekly TF", "Wyckoff event here", "Sweep terminated here", "HTF trend aligned"] },
            { label: "MEDIUM STRENGTH", color: "#ffaa00", items: ["1 prior test", "Single imbalance type", "4H timeframe", "Minor structural level", "No sweep context", "Neutral HTF trend"] },
            { label: "SKIP / AVOID", color: "#ff4444", items: ["3+ prior tests", "Fully mitigated", "15M only, no context", "Against HTF trend", "Low volume session", "No OF confirmation"] },
          ].map((col) => (
            <div key={col.label} style={{ background: "#0c0c1a", borderRadius: 8, padding: "1rem", border: `1px solid ${col.color}20` }}>
              <div style={{ color: col.color, fontFamily: "monospace", fontSize: 10, letterSpacing: 1.5, marginBottom: "0.75rem" }}>{col.label}</div>
              {col.items.map((item, i) => (
                <div key={i} style={{ fontSize: 12, color: col.color + "70", marginBottom: 4 }}>
                  {col.color === "#00ff99" ? "✓" : col.color === "#ff4444" ? "✗" : "○"} {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChapterMistakes() {
  const mistakes = [
    { title: "Drawing FVGs on Every Timeframe Without Hierarchy", severity: "CRITICAL", desc: "Marking hundreds of FVGs on 1M through Daily charts and treating them all equally. Your chart becomes a sea of boxes. You'll enter every trade at 'an imbalance' while ignoring that the dominant Daily imbalance points the other way.", fix: "Start weekly. Mark only significant imbalances. Work down to daily, then 4H. The 15M imbalances are only for entry precision — never override the HTF imbalance thesis. If 15M FVG is against the daily OB, skip the 15M trade." },
    { title: "Trading Mitigated Imbalances", severity: "CRITICAL", desc: "Price came back to your OB, traded through the entire zone, and you still have your long order there because 'it's a strong level.' The imbalance was consumed. Those institutional orders are gone.", fix: "Ironclad rule: once price closes a candle THROUGH the far boundary of an OB or FVG — delete it. Mark as consumed. Never trade it again. The level that broke through is now more significant (the breaker)." },
    { title: "Entering at the Touch Without OF Confirmation", severity: "HIGH", desc: "Price enters your OB and you immediately buy. No delta check, no CVD, no volume analysis. Half the time the zone holds. Half the time it's consumed. 50/50 is not an edge.", fix: "The touch is interesting. The confirmation candle is the entry. Wait for: CVD to show reversal, delta to flip, rejection candle to close. Those three turn 50/50 into 65%+. The extra patience is worth more than any indicator." },
    { title: "Using the OB Zone for Stop Placement", severity: "HIGH", desc: "Placing stop at the OB boundary. Price sweeps the OB boundary (common — institutions test their own OB), your stop gets hit, then price reverses. Right about direction, wrong about stop.", fix: "Stop goes BELOW the OB including any wick at the OB level. For bullish OB: stop below the wick low of the entire OB area, not just the body. Give room for the boundary to be tested without your stop being the liquidity." },
    { title: "Ignoring the Imbalance Lifecycle", severity: "HIGH", desc: "Trading an OB that was strong 3 months ago on its first test. You've been trading it every return. Third and fourth tests found progressively less reaction. Fifth test today broke right through it.", fix: "Every test weakens the zone. First = full size. Second = 60%. Third = 30% or skip. Fourth = delete. Track test count explicitly for every imbalance. Write the test count on the zone label." },
    { title: "Confusing OB with S/D Zone", severity: "MEDIUM", desc: "Drawing your box around the whole base (S/D zone) instead of just the last opposing candle (OB). Your entry zone is wider than necessary — stop is too wide for good R:R.", fix: "OB = the single candle. S/D zone = the full base. Use OB for entry precision, S/D zone for broader context. The OB inside the S/D zone is where you actually put the limit order." },
    { title: "Trading Volume Voids as Support/Resistance", severity: "MEDIUM", desc: "Placing buy orders inside a volume void because 'price stopped here before.' Price didn't stop there — it traveled through fast. The void is a fast-travel zone by definition. No support or resistance inside a void.", fix: "Voids = targets and speed indicators. HVNs on either side = support/resistance. Never place a limit order inside a void expecting support. Place it at the next HVN beyond the void." },
    { title: "Not Updating Imbalances After Structure Changes", severity: "MEDIUM", desc: "Mapped OBs and FVGs on Sunday. By Wednesday price broke through several. Still watching the broken ones, missing new imbalances that formed this week.", fix: "Re-map every session open. Mark new OBs and FVGs from the prior session. Delete fully mitigated ones. Your imbalance map is a living document, not a static picture. 15 minutes of re-mapping per session prevents trading dead zones." },
  ];
  const sc = { CRITICAL: "#ff0000", HIGH: "#ff4444", MEDIUM: "#ffaa00" };
  return (
    <div>
      <p className="lead-text">Imbalance trading is conceptually simple. Execution is where it falls apart. These specific errors convert a valid edge into consistent losses.</p>
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

export default function ImbalancesBook() {
  const [active, setActive] = useState("foundation");
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(true);
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.scrollTop = 0; }, [active]);
  const current = CHAPTERS.find((c) => c.id === active);
  const idx = CHAPTERS.findIndex((c) => c.id === active);
  const content = {
    foundation: <ChapterFoundation />, types: <ChapterTypes />, fvg: <ChapterFVG />,
    orderblock: <ChapterOrderBlock />, singleprint: <ChapterSinglePrint />, voidzone: <ChapterVoidZone />,
    of_confirm: <ChapterOFConfirm />, mitigation: <ChapterMitigation />, pairing: <ChapterPairing />,
    stacking: <ChapterStacking />, cheatsheet: <ChapterCheatsheet />, mistakes: <ChapterMistakes />,
  };
  const tagColors = { FOUNDATION: "#d4af37", IMBALANCES: "#8888ff", EXECUTION: "#00ccff", SYSTEMS: "#00ff99", REFERENCE: "#ffaa00" };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#06060e", color: "#e0e0e0", fontFamily: "'Georgia', serif", overflow: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #080810; } ::-webkit-scrollbar-thumb { background: #20203a; border-radius: 3px; }
        .lead-text { font-size: 15px; line-height: 1.85; color: #b0b0c0; margin-bottom: 1.5rem; border-left: 2px solid #8888ff40; padding-left: 1rem; }
        blockquote { border-left: 3px solid #8888ff; padding: 1rem 1.5rem; background: #0e0c18; margin: 1.5rem 0; border-radius: 0 8px 8px 0; font-style: italic; color: #aaaaff; font-size: 15px; }
        .concept-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin: 1.5rem 0; }
        .concept-card { background: #0c0c1c; border: 1px solid #1a1a30; border-radius: 8px; padding: 1.25rem; }
        .concept-title { font-size: 13px; font-weight: bold; margin-bottom: 0.5rem; font-family: monospace; letter-spacing: 0.5px; }
        .concept-body { font-size: 13px; color: #888; line-height: 1.7; }
        .key-insight { background: linear-gradient(135deg, #0c0c1c, #10101e); border: 1px solid #8888ff25; border-radius: 8px; padding: 1.25rem 1.5rem; margin: 1.5rem 0; }
        .ki-label { font-size: 10px; font-family: monospace; letter-spacing: 2px; color: #8888ff; background: #8888ff15; padding: 3px 8px; border-radius: 3px; display: inline-block; margin-bottom: 0.75rem; }
        .key-insight p { font-size: 13px; color: #aaa; line-height: 1.7; }
        .law-card { background: #0c0c1c; border: 1px solid #1a1a30; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.25rem; }
        .law-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .law-title { font-size: 15px; font-weight: bold; font-family: monospace; }
        .table-container { overflow-x: auto; margin: 1rem 0; }
        .of-table { width: 100%; border-collapse: collapse; font-size: 12px; }
        .of-table th { background: #0e0e20; color: #8888ff; font-family: monospace; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid #2a2a45; }
        .of-table td { padding: 0.6rem 1rem; border-bottom: 1px solid #12121e; color: #999; vertical-align: top; }
        .of-table tr:hover td { background: #0c0c1a; }
        .event-row { padding: 1.25rem; background: #0a0a1a; border-radius: 0 8px 8px 0; }
        .event-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }
        .event-code { font-size: 14px; font-weight: bold; font-family: monospace; }
        .event-desc { font-size: 13px; color: #999; line-height: 1.6; margin-bottom: 0.5rem; }
        .event-spot { font-size: 12px; color: #666; background: #0e0e1c; padding: 0.5rem 0.75rem; border-radius: 4px; border: 1px solid #18182c; }
        .event-spot-label { color: #8888ff; font-family: monospace; font-size: 10px; letter-spacing: 1px; margin-right: 6px; }
        .cs-section { background: #0a0a1a; border-radius: 10px; padding: 1.5rem; border: 1px solid #16162c; }
        .cs-title { font-size: 11px; font-family: monospace; letter-spacing: 2px; margin-bottom: 1.25rem; }
        .trap-card { padding: 1.25rem; background: #0a0a1a; border-radius: 0 8px 8px 0; margin-bottom: 0.75rem; }
        .trap-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
        .trap-severity { font-size: 10px; font-family: monospace; letter-spacing: 1.5px; padding: 3px 10px; border-radius: 3px; }
        .trap-title { font-size: 14px; font-weight: bold; }
        .trap-desc { font-size: 13px; color: #999; line-height: 1.6; margin-bottom: 0.75rem; }
        .trap-fix { font-size: 12px; color: #9090bb; background: #0e0e1e; padding: 0.5rem 0.75rem; border-radius: 4px; border-left: 2px solid #6666aa; }
        .trap-fix-label { color: #9999ff; font-family: monospace; font-size: 10px; letter-spacing: 1px; margin-right: 6px; }
        @media (max-width: 640px) { .concept-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ width: sidebar ? 270 : 0, minWidth: sidebar ? 270 : 0, transition: "all 0.3s", overflow: "hidden", background: "#07070f", borderRight: "1px solid #141428", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "1.5rem 1.25rem 1rem", borderBottom: "1px solid #141428" }}>
          <div style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: 3, color: "#8888ff", marginBottom: 6 }}>THE COMPLETE GUIDE TO</div>
          <div style={{ fontSize: 22, fontWeight: "bold", letterSpacing: 1, lineHeight: 1.2 }}>MARKET</div>
          <div style={{ fontSize: 22, fontWeight: "bold", letterSpacing: 1, color: "#8888ff" }}>IMBALANCES</div>
          <div style={{ fontSize: 9, color: "#22223a", marginTop: 6, fontFamily: "monospace", letterSpacing: 1 }}>FVG · ORDER BLOCKS · VOIDS · STACKING</div>
        </div>
        <nav style={{ flex: 1, overflowY: "auto", padding: "0.75rem 0" }}>
          {CHAPTERS.map((ch, i) => (
            <button key={ch.id} onClick={() => setActive(ch.id)} style={{
              display: "flex", alignItems: "center", gap: "0.75rem", width: "100%",
              padding: "0.6rem 1.25rem", background: active === ch.id ? "#8888ff10" : "transparent",
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
        <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid #141428", fontSize: 9, color: "#1e1e38", fontFamily: "monospace" }}>IMBALANCES · ALL MARKETS · ALL TF</div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem 1.5rem", borderBottom: "1px solid #141428", background: "#07070f", flexShrink: 0 }}>
          <button onClick={() => navigate("/")} style={{ background: "none", border: "1px solid #1c1c2c", borderRadius: 4, color: "#555", cursor: "pointer", fontSize: 10, fontFamily: "monospace", letterSpacing: 1, padding: "4px 10px", marginRight: 4 }}>← HOME</button>
          <button onClick={() => setSidebar(!sidebar)} style={{ background: "none", border: "none", color: "#333", cursor: "pointer", fontSize: 18 }}>{sidebar ? "⊟" : "⊞"}</button>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: 11, color: "#22223a", fontFamily: "monospace" }}>
            <span>IMBALANCES</span><span style={{ color: "#141428" }}>›</span>
            <span style={{ color: tagColors[current?.tag] }}>{current?.title}</span>
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
                background: "#0c0c1c", border: `1px solid ${i === 1 ? tagColors[ch.tag] + "30" : "#1c1c30"}`,
                borderRadius: 8, padding: "0.75rem 1.25rem", cursor: "pointer",
                color: i === 1 ? tagColors[ch.tag] : "#777", fontSize: 12, fontFamily: "monospace",
                textAlign: i === 0 ? "left" : "right",
              }}>
                <div style={{ fontSize: 10, letterSpacing: 1, marginBottom: 3, color: i === 1 ? tagColors[ch.tag] + "60" : "#22223a" }}>{i === 0 ? "‹ PREVIOUS" : "NEXT ›"}</div>
                {ch.title}
              </button>
            ) : <div key={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
