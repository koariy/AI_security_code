import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Activity, ArrowDownRight, ArrowRight, Check, CheckCircle2, ChevronDown, CircleAlert, Clock3, Code2, Command, Cpu, FileCode2, Filter, Gauge, GitCompareArrows, Menu, Play, RotateCcw, Search, ShieldAlert, ShieldCheck, Terminal, X, Zap } from "lucide-react";
import "./dashboard.css";

const initialTests = [
  { id: 1, file: "src/auth/login.py", language: "Python", status: "critical", issue: "SQL injection", duration: "0.84s", lines: "L42–48", score: "Critical", before: "query = f\"SELECT * FROM users WHERE name = '{username}'\"", after: "query = \"SELECT * FROM users WHERE name = %s\"\ncursor.execute(query, (username,))" },
  { id: 2, file: "api/session.js", language: "JavaScript", status: "warning", issue: "Missing rate limiting", duration: "0.62s", lines: "L18–25", score: "Warning", before: "app.post('/login', async (req, res) => {", after: "app.post('/login', rateLimit(loginLimiter), async (req, res) => {" },
  { id: 3, file: "core/token.rs", language: "Rust", status: "passed", issue: "No issues detected", duration: "0.91s", lines: "—", score: "Passed", before: "let token = generate_token(&user);", after: "let token = generate_token(&user);" },
  { id: 4, file: "src/storage.py", language: "Python", status: "critical", issue: "Hardcoded secret", duration: "0.73s", lines: "L11", score: "Critical", before: "SECRET_KEY = \"dev-secret-123\" ", after: "SECRET_KEY = os.environ[\"SECRET_KEY\"]" },
  { id: 5, file: "web/render.js", language: "JavaScript", status: "passed", issue: "No issues detected", duration: "0.48s", lines: "—", score: "Passed", before: "element.textContent = userInput;", after: "element.textContent = userInput;" },
];
const logs = [
  ["17:42:01.014", "INFO", "Initializing static analysis engine v2.8.1"],
  ["17:42:01.083", "INFO", "Indexing 5 files · 3 languages detected"],
  ["17:42:01.216", "SCAN", "Parsing AST and mapping data flow"],
  ["17:42:01.498", "WARN", "Potential SQL injection · src/auth/login.py:45"],
  ["17:42:01.671", "FAIL", "Hardcoded secret · src/storage.py:11"],
  ["17:42:01.902", "PASS", "No exploitable patterns · core/token.rs"],
  ["17:42:02.184", "DONE", "Scan completed · 2 findings · 5 files"],
];

function App() {
  const [filter, setFilter] = useState("All Tests");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(1);
  const [showDiff, setShowDiff] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [running, setRunning] = useState(false);
  const [runCount, setRunCount] = useState(1);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [layout, setLayout] = useState("Side by side");
  const current = initialTests.find(t => t.id === selected) || initialTests[0];
  const filtered = useMemo(() => initialTests.filter(t => {
    const matchesFilter = filter === "All Tests" || (filter === "Critical Vulnerabilities" && t.status === "critical") || (filter === "Performance Metrics" && true) || (filter === "Passed" && t.status === "passed");
    const matchesQuery = (t.file + " " + t.language + " " + t.issue).toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  }), [filter, query]);

  useEffect(() => {
    const onKey = e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearchOpen(v => !v); }
      if (e.key === "Escape") { setSearchOpen(false); setDrawerOpen(false); }
      if (e.key.toLowerCase() === "r" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) runScan();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  function runScan() {
    setRunning(true);
    setRunCount(n => n + 1);
    window.setTimeout(() => setRunning(false), 1100);
  }

  return <div className="benchmark">
    <aside className="sidebar">
      <a className="brand" href="#top"><span className="brand-mark"><Code2 size={18}/></span><span>sec<span className="brand-muted">bench</span></span><span className="version">BETA</span></a>
      <div className="workspace-label">WORKSPACE</div>
      <button className="workspace"><span className="workspace-icon">A</span><span><b>Acme Engineering</b><small>Security workspace</small></span><ChevronDown size={14}/></button>
      <div className="side-label">ANALYSIS</div>
      <a className="side-link active" href="#overview"><Activity size={16}/> Overview <span className="side-count">01</span></a>
      <a className="side-link" href="#results"><FileCode2 size={16}/> Scan results <span className="side-count">05</span></a>
      <a className="side-link" href="#comparison"><GitCompareArrows size={16}/> Human vs AI</a>
      <a className="side-link" href="#terminal"><Terminal size={16}/> Execution logs</a>
      <div className="side-label side-label-bottom">PROJECT</div>
      <div className="project-row"><span className="project-dot green-dot"/> <span>api-gateway</span><span className="project-branch">main</span></div>
      <div className="project-row"><span className="project-dot amber-dot"/> <span>auth-service</span><span className="project-branch">main</span></div>
      <div className="sidebar-bottom"><div className="avatar">KS</div><div><b>Koariy Studio</b><small>Free plan</small></div><Menu size={16}/></div>
    </aside>

    <main className="main-panel" id="top">
      <header className="topbar"><div className="breadcrumbs"><span>Projects</span><span className="crumb-slash">/</span><b>AI Security Benchmark</b><span className="live-status"><i/> Live</span></div><div className="top-actions"><button className="search-trigger" onClick={() => setSearchOpen(true)}><Search size={15}/><span>Search anything...</span><kbd>⌘ K</kbd></button><button className="icon-action" title="Open execution logs" onClick={() => setTerminalOpen(v => !v)}><Terminal size={16}/></button><div className="avatar avatar-small">KS</div></div></header>

      <div className="content">
        <section className="page-intro" id="overview"><div><div className="eyebrow"><span className="eyebrow-dot"/> SECURITY POSTURE <span className="eyebrow-sep">/</span> OCT 25, 2026</div><h1>AI Security Benchmark</h1><p>Automated code analysis, vulnerability triage, and remediation insights.</p></div><div className="intro-actions"><button className="button button-quiet" onClick={() => setDrawerOpen(true)}><Terminal size={15}/> View logs <kbd>Esc</kbd></button><button className="button button-primary" onClick={runScan} disabled={running}><RotateCcw size={15} className={running ? "spin" : ""}/>{running ? "Running scan…" : "Re-run analysis"}<kbd>R</kbd></button></div></section>

        <section className="stats-grid" aria-label="Scan summary">
          <article className="stat-card"><div className="stat-top"><span>Files analyzed</span><FileCode2 size={16}/></div><div className="stat-value">1,284 <span className="stat-trend"><ArrowDownRight size={13}/> +12%</span></div><div className="stat-foot">Across 3 languages</div><div className="mini-bars">{[35,52,42,68,47,75,57,84,66,92,72,100].map((v,i)=><i key={i} style={{height:v+"%"}}/>)}</div></article>
          <article className="stat-card"><div className="stat-top"><span>Critical findings</span><ShieldAlert size={16}/></div><div className="stat-value">02 <span className="stat-chip danger">Needs attention</span></div><div className="stat-foot">2 unresolved vulnerabilities</div><div className="stat-progress"><i className="progress-red" style={{width:"24%"}}/></div></article>
          <article className="stat-card"><div className="stat-top"><span>Median scan time</span><Gauge size={16}/></div><div className="stat-value">0.72<span className="unit">s</span> <span className="stat-trend"><Zap size={13}/> −18%</span></div><div className="stat-foot">Compared to previous run</div><div className="stat-progress"><i className="progress-green" style={{width:"72%"}}/></div></article>
          <article className="stat-card"><div className="stat-top"><span>Security score</span><ShieldCheck size={16}/></div><div className="stat-value">94<span className="unit">/100</span></div><div className="stat-foot"><span className="green-text">↑ 4 points</span> since last scan</div><div className="score-track"><i/></div></article>
        </section>

        <section className="comparison-section" id="comparison"><div className="section-title-row"><div><div className="section-kicker">BENCHMARK / 01</div><h2>Human Audit vs. AI Automated Security Scan</h2><p>A side-by-side look at review speed, repeatability, and coverage.</p></div><span className="sample-label">ILLUSTRATIVE BENCHMARK</span></div>
          <div className="compare-grid">
            <article className="compare-card human-card"><div className="compare-head"><div className="compare-icon neutral"><Search size={17}/></div><div><h3>Manual Human Code Review</h3><p>Experience-dependent · Reviewer-led</p></div><span className="badge neutral-badge">Manual process</span></div><div className="status-line"><span className="status-indicator amber-indicator"/>Slow / prone to fatigue</div><div className="metric-grid"><div><span>Speed</span><b>~45 min <small>/ 100 LOC</small></b></div><div><span>Accuracy</span><b>~68<small>%</small></b></div><div><span>Consistency</span><b className="metric-muted">Variable</b></div><div><span>Cost</span><b> $120<small>+/hr</small></b></div></div><div className="timeline"><div className="timeline-label"><span>Review timeline</span><span>45:00 elapsed</span></div><div className="timeline-track"><i/></div><div className="timeline-steps"><span><i/>Read code</span><span><i/>Trace paths</span><span><i/>Verify</span><span className="timeline-pending"><i/>Report</span></div></div><div className="warning-note"><CircleAlert size={15}/><span>Missed SQL injection vulnerability after 3+ hours of manual review.</span></div></article>
            <article className="compare-card ai-card"><div className="compare-head"><div className="compare-icon safe"><Cpu size={17}/></div><div><h3>AI-Powered Automated Scan</h3><p>AST analysis · Deterministic checks</p></div><span className="badge automated-badge">Automated engine</span></div><div className="status-line"><span className="status-indicator green-indicator"/>Real-time / instant verification</div><div className="metric-grid"><div><span>Speed</span><b>&lt; 1.2 sec <small>/ 10k LOC</small></b></div><div><span>Accuracy</span><b>99.4<small>%*</small></b></div><div><span>Consistency</span><b className="green-text">Deterministic</b></div><div><span>Cost</span><b className="green-text">Automated</b></div></div><div className="ai-output"><div className="output-top"><span><span className="terminal-dot"/> scan_output.log</span><span>3 checks passed</span></div><div className="output-line"><CheckCircle2 size={13}/><code>AST parser initialized</code><span>12ms</span></div><div className="output-line"><CheckCircle2 size={13}/><code>Dependency graph built</code><span>84ms</span></div><div className="output-line output-alert"><CircleAlert size={13}/><code>SQL injection detected · L45</code><span>+1 finding</span></div><button className="text-button" onClick={() => {setSelected(1); document.getElementById("results")?.scrollIntoView({behavior:"smooth"});}}>Inspect finding <ArrowRight size={13}/></button></div><div className="ai-card-foot"><span><span className="status-indicator green-indicator"/> Scan engine ready</span><button className="button button-primary button-run" onClick={runScan} disabled={running}><Play size={13} fill="currentColor"/>{running ? "Running…" : "Run analysis"}<kbd>R</kbd></button></div></article>
          </div><p className="method-note">* Accuracy and performance figures are illustrative UI demo values, not independently validated benchmark results.</p>
        </section>

        <section className="results-section" id="results"><div className="section-title-row results-heading"><div><div className="section-kicker">BENCHMARK / 02</div><h2>Code & scan results</h2><p>Review findings, inspect remediation, and filter by status.</p></div><div className="results-meta"><span className="run-id">RUN #{String(runCount).padStart(4,"0")}</span><span className="completed-dot"/> Completed just now</div></div>
          <div className="results-toolbar"><div className="segmented">{["All Tests","Critical Vulnerabilities","Performance Metrics","Passed"].map(label=><button key={label} className={filter===label?"selected":""} onClick={()=>setFilter(label)}>{label}{label==="Critical Vulnerabilities"&&<span className="filter-count">2</span>}</button>)}</div><div className="table-search"><Search size={14}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Filter files…"/><Filter size={14}/></div></div>
          <div className="results-table-wrap"><table className="results-table"><thead><tr><th>FILE</th><th>LANGUAGE</th><th>FINDING</th><th>STATUS</th><th>DURATION</th><th></th></tr></thead><tbody>{filtered.map(test=><tr key={test.id} className={selected===test.id?"row-selected":""} onClick={()=>{setSelected(test.id);setShowDiff(true);}}><td><span className="file-icon"><FileCode2 size={15}/></span><span className="file-name">{test.file}</span></td><td><span className={"language-tag "+test.language.toLowerCase()}>{test.language}</span></td><td><span className={test.status==="critical"?"finding-critical":test.status==="warning"?"finding-warning":"finding-passed"}>{test.issue}</span></td><td><span className={"status-badge "+test.status}>{test.status==="critical"?"Critical":test.status==="warning"?"Warning":"Passed"}</span></td><td className="duration">{test.duration}</td><td><button className="row-open" aria-label={"Inspect "+test.file} onClick={e=>{e.stopPropagation();setSelected(test.id);setShowDiff(true);}}><ArrowRight size={15}/></button></td></tr>)}</tbody></table>{filtered.length===0&&<div className="empty-state">No results match this filter.</div>}</div>
          <div className="diff-panel"><div className="diff-heading"><div><GitCompareArrows size={16}/><b>Remediation diff</b><span className="diff-file">{current.file}</span></div><div className="diff-actions"><div className="view-switch"><button className={layout==="Side by side"?"active":""} onClick={()=>setLayout("Side by side")}>Split</button><button className={layout==="Unified"?"active":""} onClick={()=>setLayout("Unified")}>Unified</button></div><button className="icon-action compact" onClick={()=>setShowDiff(v=>!v)} aria-label={showDiff?"Collapse diff":"Expand diff"}>{showDiff?<ChevronDown size={15}/>:<ArrowRight size={15}/>}</button></div></div>
            {showDiff&&<div className={"diff-code "+(layout==="Unified"?"unified":"")}>{layout==="Side by side"?<><div className="code-pane removed"><div className="code-pane-head"><span>− Original code</span><span>VULNERABLE</span></div><pre><span className="line-no">42</span><code>{current.before}</code></pre><div className="code-explain"><CircleAlert size={13}/> Unsafe string interpolation</div></div><div className="code-pane added"><div className="code-pane-head"><span>+ Suggested fix</span><span>PATCHED</span></div><pre><span className="line-no">42</span><code>{current.after}</code></pre><div className="code-explain"><CheckCircle2 size={13}/> Parameterized query</div></div></>:<div className="unified-pane"><pre className="diff-minus">− {current.before}</pre><pre className="diff-plus">+ {current.after}</pre><div className="code-explain"><CheckCircle2 size={13}/> Suggested remediation · validate before merging</div></div>}</div>}
          </div>
        </section>

        <section className="terminal-section" id="terminal"><button className="terminal-toggle" onClick={()=>setTerminalOpen(v=>!v)}><span><Terminal size={16}/><b>Execution log</b><span className="terminal-live"><i/> LIVE STREAM</span></span><span className="terminal-toggle-right">{terminalOpen?"Collapse":"Expand"} <kbd>Esc</kbd><ChevronDown size={15} className={terminalOpen?"chevron-open":""}/></span></button>{terminalOpen&&<div className="terminal-body"><div className="terminal-toolbar"><span><i/> scan-session-{String(runCount).padStart(4,"0")}</span><span>JetBrains Mono <span className="terminal-sep">·</span> UTF-8</span></div>{logs.map((log,i)=><div className="log-line" key={log[0]+i}><time>{log[0]}</time><span className={"log-level "+log[1].toLowerCase()}>{log[1]}</span><code>{log[2]}</code></div>)}<div className="terminal-cursor"><span/> waiting for next event…</div></div>}</section>
        <footer className="footer"><span>© 2026 SECBENCH <span className="footer-sep">/</span> SECURITY ENGINEERING</span><span>Built for review, not blind trust. <ShieldCheck size={13}/></span></footer>
      </div>
    </main>

    {searchOpen&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setSearchOpen(false);}}><div className="command-modal"><div className="command-input"><Search size={17}/><input autoFocus placeholder="Search files, findings, commands…" value={query} onChange={e=>setQuery(e.target.value)}/><kbd>ESC</kbd></div><div className="command-label">QUICK ACTIONS</div><button onClick={()=>{setSearchOpen(false);runScan();}}><RotateCcw size={15}/> Re-run security analysis <kbd>R</kbd></button><button onClick={()=>{setSearchOpen(false);setTerminalOpen(true);document.getElementById("terminal")?.scrollIntoView({behavior:"smooth"});}}><Terminal size={15}/> Open execution logs <kbd>↵</kbd></button><button onClick={()=>{setSearchOpen(false);document.getElementById("results")?.scrollIntoView({behavior:"smooth"});}}><FileCode2 size={15}/> Jump to scan results <kbd>↵</kbd></button><div className="command-footer"><span><Command size={12}/> K to toggle search</span><span>↑↓ to navigate</span></div></div></div>}
    {drawerOpen&&<div className="drawer-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setDrawerOpen(false);}}><aside className="log-drawer"><div className="drawer-head"><div><Terminal size={17}/><b>Execution details</b></div><button className="icon-action" onClick={()=>setDrawerOpen(false)}><X size={16}/></button></div><p className="drawer-subtitle">Latest scan session · run #{String(runCount).padStart(4,"0")}</p><div className="drawer-summary"><span>STATUS</span><b><CheckCircle2 size={14}/> Completed</b><span>DURATION</span><b>2.18s</b><span>FILES SCANNED</span><b>5 / 5</b><span>FINDINGS</span><b className="red-text">2 critical · 1 warning</b></div><div className="drawer-log">{logs.map((log,i)=><div className="log-line" key={log[0]+i}><time>{log[0]}</time><span className={"log-level "+log[1].toLowerCase()}>{log[1]}</span><code>{log[2]}</code></div>)}</div><div className="drawer-foot">Press <kbd>ESC</kbd> to close this drawer</div></aside></div>}
  </div>;
}

createRoot(document.getElementById("root")).render(<App />);
