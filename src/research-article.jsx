import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronRight, CircleAlert, Clock3, Code2, ExternalLink, FileCode2, GitBranch, Pause, Play, RotateCcw, Shield, ShieldCheck, Terminal, X } from "lucide-react";
import "./research-article.css";

const references = [
  {n:"01", org:"IEEE Symposium on Security and Privacy · 2024", title:"LLMs Cannot Reliably Identify and Reason About Security Vulnerabilities (Yet?)", description:"SecLLMHolmes evaluates vulnerability reasoning across multiple models and code scenarios, reporting reliability challenges and false positives.", url:"https://doi.org/10.1109/SP54263.2024.00210", tag:"Peer-reviewed research"},
  {n:"02", org:"OWASP Cheat Sheet Series", title:"SQL Injection Prevention Cheat Sheet", description:"Practical guidance on parameterized queries, safe data handling, and defense-in-depth against SQL injection.", url:"https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html", tag:"Security guidance"},
  {n:"03", org:"NIST · SP 800-218", title:"Secure Software Development Framework (SSDF)", description:"A framework for integrating secure development practices into the software development life cycle.", url:"https://csrc.nist.gov/pubs/sp/800/218/final", tag:"Standards guidance"},
  {n:"04", org:"Tamberg & Bahsi · 2024", title:"Harnessing Large Language Models for Software Vulnerability Detection", description:"A comparative review of LLM approaches and conventional static analysis; outcomes depend on the approach and evaluation setup.", url:"https://arxiv.org/abs/2405.15614", tag:"Research preprint"}
];

const samples = {
  SQLi: {
    label:"SQL injection", file:"app/auth.py", language:"Python", severity:"Critical",
    before:"query = f\"SELECT * FROM users WHERE name = '{username}'\"\ncursor.execute(query)",
    after:"query = \"SELECT * FROM users WHERE name = %s\"\ncursor.execute(query, (username,))",
    detail:"Parameterized queries separate SQL instructions from user-supplied values. Placeholder syntax depends on the database driver."
  },
  XSS: {
    label:"Cross-site scripting", file:"web/profile.js", language:"JavaScript", severity:"High",
    before:"profile.innerHTML = userProvidedBio;",
    after:"profile.textContent = userProvidedBio;",
    detail:"textContent treats the value as text rather than HTML. If rich HTML is required, use vetted sanitization and context-aware output encoding."
  },
  Auth: {
    label:"Authorization bypass", file:"api/admin.py", language:"Python", severity:"Critical",
    before:"if request.json.get('is_admin'):\n    grant_admin_access(user)",
    after:"if not authorization.can(user, 'admin:write'):\n    abort(403)\ngrant_admin_access(user)",
    detail:"Access decisions must use a trusted server-side identity and authorization policy, not a client-controlled field."
  },
  RCE: {
    label:"Command injection", file:"tools/convert.py", language:"Python", severity:"Critical",
    before:"os.system('convert ' + user_file)",
    after:"subprocess.run([\n    'convert', validated_path\n], check=True, shell=False)",
    detail:"Passing arguments as a list without a shell reduces shell-injection risk. Validate paths and file types against an allowlist too."
  }
};

const footnotes = {
  "1": {title:"SecLLMHolmes · IEEE S&P 2024", text:"A peer-reviewed evaluation that highlights reliability limits in LLM-based vulnerability reasoning.", url:references[0].url},
  "2": {title:"OWASP SQL Injection Prevention", text:"Recommends parameterized queries and layered defenses against SQL injection.", url:references[1].url},
  "3": {title:"NIST SP 800-218", text:"Describes secure software development practices across the software life cycle.", url:references[2].url}
};

function Footnote({n}) {
  const [open,setOpen] = useState(false);
  const item = footnotes[n];
  return <span className="ra-footnote-wrap"><button className="ra-footnote" aria-label={"Reference "+n} onClick={()=>setOpen(v=>!v)}>[{n}]</button>{open&&<span className="ra-footnote-pop"><button className="ra-footnote-close" onClick={()=>setOpen(false)} aria-label="Close reference"><X size={12}/></button><b>{item.title}</b><span>{item.text}</span><a href={item.url} target="_blank" rel="noreferrer">Read source <ArrowUpRight size={12}/></a></span>}</span>;
}

function CodeLines({text,kind}) {
  return <pre className={"ra-code-lines "+kind}>{text.split("\n").map((line,i)=><span className="ra-code-line" key={i}><i>{kind==="removed"?"−":kind==="added"?"+":String(i+1).padStart(2,"0")}</i><code>{line || " "}</code></span>)}</pre>;
}

function App() {
  const [activeDemo,setActiveDemo] = useState("ai");
  const [running,setRunning] = useState(false);
  const [humanStep,setHumanStep] = useState(0);
  const [aiStep,setAiStep] = useState(0);
  const [elapsed,setElapsed] = useState(0);
  const [sampleKey,setSampleKey] = useState("SQLi");
  const [diffMode,setDiffMode] = useState("side");
  const [videoPlaying,setVideoPlaying] = useState(false);
  const [videoProgress,setVideoProgress] = useState(0);
  const [showFootnote,setShowFootnote] = useState(false);
  const sample = samples[sampleKey];

  useEffect(()=>{
    if(!running) return;
    const started = Date.now();
    const timer = window.setInterval(()=>{
      const elapsedMs = Date.now()-started;
      setElapsed(elapsedMs);
      setHumanStep(Math.min(4,Math.floor(elapsedMs/1100)));
      setAiStep(Math.min(4,Math.floor(elapsedMs/180)));
      if(elapsedMs>=4600) { window.clearInterval(timer); setRunning(false); }
    },80);
    return ()=>window.clearInterval(timer);
  },[running]);

  useEffect(()=>{
    if(!videoPlaying) return;
    const timer=window.setInterval(()=>setVideoProgress(p=>{if(p>=100){setVideoPlaying(false);return 100;}return p+1;}),240);
    return ()=>window.clearInterval(timer);
  },[videoPlaying]);

  const runScan=()=>{setElapsed(0);setHumanStep(0);setAiStep(0);setRunning(true);setActiveDemo("ai");};
  const resetScan=()=>{setRunning(false);setElapsed(0);setHumanStep(0);setAiStep(0);};
  const jump=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"});
  const humanTime = (elapsed/1000*42).toFixed(0);
  const logItems = [
    {time:"00.004",text:"Зчитування файлів та імпортів",state:aiStep>=1?"done":"pending"},
    {time:"00.018",text:"Побудова дерева синтаксису (AST)",state:aiStep>=2?"done":"pending"},
    {time:"00.031",text:"Перевірка джерел даних і sink-викликів",state:aiStep>=3?"done":"pending"},
    {time:"00.044",text:"Можлива SQL-ін'єкція · app/auth.py:1",state:aiStep>=4?"alert":"pending"},
    {time:"00.051",text:"Патч запропоновано · потрібна перевірка",state:aiStep>=4?"patched":"pending"}
  ];
  return <div className="ra-site" id="top">
    <div className="ra-ambient ra-ambient-green"/><div className="ra-ambient ra-ambient-blue"/><div className="ra-ambient ra-ambient-slate"/>
    <header className="ra-header">
      <a className="ra-brand" href="#top"><span className="ra-brand-mark"><Shield size={17}/></span><span>AI Security <i>Benchmark</i></span></a>
      <nav className="ra-nav" aria-label="Main navigation"><a href="#abstract">Abstract</a><a href="#comparison">Comparison</a><a href="#demo">Live Demo</a><a href="#references">References</a></nav>
      <a className="ra-github" href="https://github.com/koariy/AI_security_code" target="_blank" rel="noreferrer"><GitBranch size={14}/> GitHub <ArrowUpRight size={13}/></a>
    </header>

    <main className="ra-main">
      <section className="ra-hero" id="abstract">
        <div className="ra-eyebrow"><span className="ra-eyebrow-dot"/> CYBERSECURITY RESEARCH <span className="ra-eyebrow-slash">/</span> BENCHMARK REPORT</div>
        <h1>Can AI detect vulnerabilities <span>better than humans?</span></h1>
        <p className="ra-deck">A research-led look at manual security review and AI-assisted code analysis — where automation helps, where it fails, and why expert judgment still matters.</p>
        <div className="ra-meta"><span className="ra-author"><span className="ra-avatar">SR</span><span><b>Security Research Desk</b><small>Technical report · Ukrainian / English interface</small></span></span><span><Clock3 size={14}/> 8 min read</span><span>Updated Oct 25, 2026</span></div>
        <div className="ra-hero-actions"><button className="ra-button-primary" onClick={()=>jump("comparison")}>Explore the findings <ArrowDownRight size={15}/></button><span className="ra-review-note"><ShieldCheck size={15}/> Evidence-led, not a certification test</span></div>
        <div className="ra-abstract"><div className="ra-abstract-label">ABSTRACT <span>01 / 04</span></div><p>AI can accelerate the discovery of common vulnerability patterns, summarize code paths, and suggest fixes. Published evaluations do not establish a universal accuracy advantage over human auditors. Results depend on the model, context, vulnerability class, and validation method. The strongest workflow combines automated checks with expert review.<Footnote n="1"/> <Footnote n="3"/></p></div>
      </section>

      <section className="ra-video-section" aria-labelledby="video-title">
        <div className="ra-section-kicker">FIELD NOTE <span>/</span> WALKTHROUGH</div>
        <div className="ra-video-frame">
          <div className="ra-video-top"><span><i/> RESEARCH PLAYBACK</span><span>DEMO · 00:{String(Math.floor(videoProgress*0.36)).padStart(2,"0")}</span></div>
          <div className="ra-video-scene">
            <div className="ra-video-code"><div className="ra-window-dots"><i/><i/><i/><span>auth.py</span></div><pre><span className="ra-token-muted">def</span> get_user(name):{"\n"}  query = <span className="ra-token-red">f"SELECT * FROM users</span>{"\n"}          <span className="ra-token-red">WHERE name = '{'{'}name{'}'}'"</span>{"\n"}  cursor.execute(query)</pre><div className="ra-video-alert"><CircleAlert size={14}/> Possible SQL injection <b>CWE-89</b></div></div>
            <div className="ra-video-arrow"><ArrowRight size={20}/></div>
            <div className="ra-video-code ra-video-patch"><div className="ra-window-dots"><i/><i/><i/><span>suggested-fix.diff</span></div><pre><span className="ra-token-muted">query</span> = <span className="ra-token-green">"SELECT * FROM users</span>{"\n"}        <span className="ra-token-green">WHERE name = %s"</span>{"\n"}cursor.execute(query, (name,))</pre><div className="ra-video-success"><Check size={14}/> Parameterized query <b>REVIEW PATCH</b></div></div>
          </div>
          <div className="ra-video-caption"><div><span className="ra-play-label">VOICEOVER WALKTHROUGH</span><h3 id="video-title">From vulnerable input to a safer query</h3><p>Follow the simulated detection, explainable finding, and proposed patch.</p></div><button className="ra-play-button" onClick={()=>{if(videoProgress>=100)setVideoProgress(0);setVideoPlaying(v=>!v);}}>{videoPlaying?<Pause size={15}/>:<Play size={15} fill="currentColor"/>}{videoPlaying?"Pause demo":"Watch video demonstration"}<span>WITH VOICEOVER</span></button></div>
          <div className="ra-video-progress"><span style={{width:videoProgress+"%"}}/></div>
        </div>
        <p className="ra-caption">Interactive visual walkthrough, not a recorded video or a live model inference. The voiceover is represented by on-screen explanatory steps.</p>
      </section>

      <section className="ra-section" id="comparison">
        <div className="ra-section-kicker">01 <span>/</span> COMPARISON</div><h2>Human judgment vs. machine scale</h2><p className="ra-section-intro">The two approaches solve overlapping but different problems. Manual review can interpret business context; automated scanning repeats checks quickly and consistently. Neither guarantees complete detection.</p>
        <div className="ra-comparison-grid">
          <article className="ra-compare-card">
            <div className="ra-card-heading"><span className="ra-card-icon"><Code2 size={17}/></span><div><span className="ra-card-eyebrow">MANUAL PROCESS</span><h3>Human security audit</h3></div><span className="ra-badge neutral">Expert-led</span></div>
            <div className="ra-status"><span className="ra-status-dot amber"/>Context-rich · time-intensive</div>
            <div className="ra-metric-grid"><div><small>Throughput</small><b>Scope-dependent</b><span>Architecture and review depth</span></div><div><small>Accuracy</small><b>Task-dependent</b><span>Skill, context, test design</span></div><div><small>Consistency</small><b>Can vary</b><span>Fatigue and review conditions</span></div><div><small>Business logic</small><b>Strong fit</b><span>Intent and risk interpretation</span></div></div>
            <div className="ra-timeline"><div className="ra-mini-heading"><span>SIMULATED AUDIT TIMELINE</span><span className="ra-mono">{running?Math.floor(humanTime)+"s elapsed":"WAITING"}</span></div><div className="ra-timeline-track"><span style={{width:(humanStep/4*100)+"%"}}/></div>{["Read architecture","Trace data flow","Inspect edge cases","Assess business impact"].map((label,i)=><div className={"ra-human-step "+(i<humanStep?"complete":i===humanStep&&running?"current":"")} key={label}><span>{i<humanStep?<Check size={12}/>:String(i+1).padStart(2,"0")}</span>{label}<small>{i<humanStep?"REVIEWED":i===humanStep&&running?"IN PROGRESS":"QUEUED"}</small></div>)}<div className="ra-warning"><CircleAlert size={14}/><span>Potential oversight: long reviews and context switching can contribute to missed edge cases.</span></div></div>
          </article>
          <article className="ra-compare-card featured">
            <div className="ra-card-heading"><span className="ra-card-icon green"><Terminal size={17}/></span><div><span className="ra-card-eyebrow green-text">AUTOMATED ENGINE</span><h3>AI-assisted code scan</h3></div><span className="ra-badge green">Repeatable</span></div>
            <div className="ra-status"><span className="ra-status-dot green-dot"/>Fast repeat runs · consistent workflow</div>
            <div className="ra-metric-grid"><div><small>Throughput</small><b>High for pattern checks</b><span>Machine-dependent</span></div><div><small>Accuracy</small><b>Not universal</b><span>Validate per benchmark</span></div><div><small>Consistency</small><b>Repeatable pipeline</b><span>Model output can vary</span></div><div><small>Business logic</small><b>Needs context</b><span>Human validation matters</span></div></div>
            <div className="ra-terminal"><div className="ra-terminal-head"><span><i/> SCAN CONSOLE</span><span>{running?"RUNNING":"SIMULATED OUTPUT"}</span></div>{logItems.map((item,i)=><div className={"ra-log "+item.state} key={item.text}><time>{item.time}</time><span className="ra-log-icon">{item.state==="done"||item.state==="patched"?<Check size={12}/>:item.state==="alert"?<CircleAlert size={12}/>:<span className="ra-log-pending"/>}</span><code>{item.text}</code><b>{item.state==="done"?"PASS":item.state==="alert"?"FINDING":item.state==="patched"?"PATCH":"WAIT"}</b></div>)}<div className="ra-terminal-footer"><span>AST · DATA FLOW · RULE CHECKS</span><span>{aiStep>=4?"1 finding · review required":running?"SCANNING…":"READY"}</span></div></div>
            <div className="ra-card-actions"><span><ShieldCheck size={14}/> Proposed fixes require review</span><button className="ra-button-run" onClick={running?resetScan:runScan} aria-label={running?"Reset scan":"Run scan demo"}>{running?<><RotateCcw size={13}/> Reset demo</>:<>Run scan demo <ArrowRight size={13}/></>}</button></div>
          </article>
        </div>
        <p className="ra-caption">Comparison is qualitative, not a measured head-to-head benchmark. Timings and console messages shown in the demo are simulated; no universal accuracy or speed figures are claimed.</p>
      </section>

      <section className="ra-section" id="demo">
        <div className="ra-section-kicker">02 <span>/</span> LIVE DEMO</div><h2>Inspect a finding and its proposed patch</h2><p className="ra-section-intro">Choose a vulnerability class to inspect an educational before/after example. The snippets are illustrative; the demo does not run a real scanner or prove the whole application is secure.</p>
        <div className="ra-demo-toolbar"><div className="ra-demo-tabs" role="tablist" aria-label="Vulnerability class">{Object.entries(samples).map(([key,value])=><button role="tab" aria-selected={sampleKey===key} className={sampleKey===key?"active":""} key={key} onClick={()=>setSampleKey(key)}>{value.label}</button>)}</div><span className={"ra-severity "+(sample.severity==="Critical"?"critical":"high")}>{sample.severity.toUpperCase()}</span></div>
        <div className="ra-diff-panel"><div className="ra-diff-head"><div><FileCode2 size={15}/><span><b>{sample.file}</b><small>{sample.language} <i>·</i> Example patch</small></span></div><div className="ra-diff-mode"><button className={diffMode==="side"?"active":""} onClick={()=>setDiffMode("side")}>Side by side</button><button className={diffMode==="unified"?"active":""} onClick={()=>setDiffMode("unified")}>Unified diff</button></div></div>
          {diffMode==="side"?<div className="ra-code-grid"><div className="ra-code-panel"><div className="ra-code-title removed-title"><span>− VULNERABLE PATTERN</span><span>BEFORE</span></div><CodeLines text={sample.before} kind="removed"/></div><div className="ra-code-panel"><div className="ra-code-title added-title"><span>+ PROPOSED PATCH</span><span>AFTER</span></div><CodeLines text={sample.after} kind="added"/></div></div>:<div className="ra-unified"><CodeLines text={sample.before} kind="removed"/><CodeLines text={sample.after} kind="added"/></div>}
          <div className="ra-patch-note"><ShieldCheck size={16}/><div><b>Why this matters</b><p>{sample.detail} <Footnote n={sampleKey==="SQLi"?"2":"3"}/></p></div></div>
        </div>
      </section>

      <section className="ra-section" id="findings">
        <div className="ra-section-kicker">03 <span>/</span> KEY FINDINGS</div><h2>What should a benchmark measure?</h2><p className="ra-section-intro">A credible comparison reports the test set, labels, threat model, tools, and uncertainty. A single accuracy number hides too much.</p>
        <div className="ra-bento">
          <article className="ra-bento-card ra-bento-large"><span className="ra-bento-index">01 / DETECTION</span><div className="ra-bento-visual"><div className="ra-detection-bars"><span/><span/><span/><span/><span/><span/><span/></div><div className="ra-bento-score"><b>Recall</b><small>Of known vulnerable cases found</small></div></div><h3>Detection rate is not the whole story</h3><p>Measure recall alongside precision, false positives, severity calibration, and whether findings can be reproduced. Report results by vulnerability class rather than hiding variation in one aggregate score. <Footnote n="1"/></p></article>
          <article className="ra-bento-card"><span className="ra-bento-index">02 / FALSE POSITIVES</span><div className="ra-bento-number rose">FP</div><h3>Noise has a cost</h3><p>Count safe code incorrectly flagged and the analyst time needed to triage each alert.</p></article>
          <article className="ra-bento-card"><span className="ra-bento-index">03 / TIME TO VALUE</span><div className="ra-bento-number green">↗</div><h3>Measure end-to-end time</h3><p>Include setup, context gathering, triage, validation, and patch review — not just model latency.</p></article>
          <article className="ra-bento-card ra-bento-wide"><span className="ra-bento-index">04 / LANGUAGE COVERAGE</span><div className="ra-language-list"><span><i className="lang-python"/>Python <small>AST + data flow</small></span><span><i className="lang-rust"/>Rust <small>ownership + unsafe blocks</small></span><span><i className="lang-cpp"/>C / C++ <small>memory safety + boundaries</small></span></div><h3>Evaluate by language and vulnerability class</h3><p>Results from Python snippets should not be assumed to transfer to Rust or C++. Use representative projects and a consistent, documented ground truth.</p></article>
        </div>
        <div className="ra-quote"><span>“</span><blockquote>Automation increases the reach of a security review. It does not remove the need to establish what is exploitable, what matters, and whether a fix is safe.</blockquote><small>RESEARCH SYNTHESIS · <Footnote n="1"/> <Footnote n="3"/></small></div>
      </section>

      <section className="ra-section" id="methodology">
        <div className="ra-section-kicker">04 <span>/</span> METHODOLOGY</div><h2>How to compare fairly</h2><p className="ra-section-intro">A reproducible study should make it possible for another team to repeat the same evaluation and challenge its conclusions.</p>
        <div className="ra-method-grid"><article><span>01</span><h3>Build a representative corpus</h3><p>Include vulnerable and clean examples, multiple languages, realistic project context, and clearly defined labels.</p></article><article><span>02</span><h3>Define the comparison</h3><p>Specify human auditor experience, model and prompt versions, tools enabled, time limits, and access to repository context.</p></article><article><span>03</span><h3>Track meaningful outcomes</h3><p>Report precision, recall, false-positive rate, severity accuracy, time-to-validated-finding, and patch correctness.</p></article><article><span>04</span><h3>Publish limitations</h3><p>Include sample sizes, confidence intervals where appropriate, exclusions, repeatability, and failure cases.</p></article></div>
        <div className="ra-method-callout"><CircleAlert size={17}/><div><b>Interpret the evidence carefully</b><p>The cards and console on this page are an educational UI demonstration, not a new controlled experiment. No head-to-head performance measurements were generated for this article.</p></div></div>
      </section>

      <section className="ra-section ra-references" id="references">
        <div className="ra-section-kicker">05 <span>/</span> REFERENCES</div><h2>Read the primary sources</h2><p className="ra-section-intro">Research papers and established security guidance used to frame this comparison.</p>
        <div className="ra-reference-grid">{references.map(ref=><a className="ra-reference-card" href={ref.url} key={ref.n} target="_blank" rel="noreferrer"><div className="ra-reference-top"><span>{ref.n}</span><span className="ra-reference-tag">{ref.tag}</span><ArrowUpRight size={15}/></div><small>{ref.org}</small><h3>{ref.title}</h3><p>{ref.description}</p><span className="ra-reference-link">Open source <ChevronRight size={13}/></span></a>)}</div>
      </section>

      <footer className="ra-footer"><a className="ra-brand" href="#top"><span className="ra-brand-mark"><Shield size={15}/></span><span>AI Security <i>Benchmark</i></span></a><p>Evidence first. Verify every finding.</p><button onClick={()=>jump("top")}>Back to top <ArrowUpRight size={13}/></button></footer>
    </main>
  </div>;
}

createRoot(document.getElementById("root")).render(<App/>);
