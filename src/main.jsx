import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Code2,
  ScanLine,
  Cpu,
  UserRound,
  Menu,
  X,
  Play,
  RotateCcw,
  SkipForward,
  Check,
  CircleAlert,
  ChevronRight,
  ExternalLink,
  Video,
  Image,
  AudioLines,
  LockKeyhole,
  BookOpen,
  Target,
  Layers,
  Workflow,
  CheckCheck,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from "recharts";
import {
  nav,
  tools,
  vulnerabilities,
  participants,
  criteria,
  code,
  author,
} from "./data";
import "./styles.css";

function Icon({ icon: Component = ShieldCheck, ...props }) {
  return <Component size={22} strokeWidth={1.6} {...props} />;
}
function Section({
  id,
  number,
  label,
  title,
  description,
  children,
  className = "",
}) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="section-heading reveal">
        <div className="eyebrow">
          <span>{number} /</span> {label}
        </div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {children}
    </section>
  );
}
function App() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(".reveal, section[id]")
      .forEach((el) => observer.observe(el));
    const navigationObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );
    nav.forEach(([id]) => {
      const target = document.getElementById(id);
      if (target) navigationObserver.observe(target);
    });
    return () => {
      observer.disconnect();
      navigationObserver.disconnect();
    };
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Перейти до вмісту
      </a>
      <header>
        <div className="nav-wrap">
          <a href="#home" className="brand" aria-label="AI CODE — головна">
            <span className="brand-icon">
              <Code2 size={21} />
            </span>
            AI CODE<span className="brand-dot">.</span>
          </a>
          <nav className={menu ? "open" : ""} aria-label="Головна навігація">
            {nav.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={active === id ? "active" : ""}
                onClick={() => setMenu(false)}
              >
                {label}
              </a>
            ))}
          </nav>
          <a className="button nav-cta" href="#experiment">
            Розпочати <ArrowUpRight size={16} />
          </a>
          <button
            className="icon-button menu-button"
            aria-label={menu ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main">
        <section id="home" className="hero">
          <div className="hero-grid container">
            <div className="hero-copy">
              <div className="pill">
                <span className="status-dot" /> ДОСЛІДЖЕННЯ БЕЗПЕКИ КОДУ{" "}
                <span className="pill-year">PYTHON / AI</span>
              </div>
              <h1>
                Людина проти
                <br />
                штучного інтелекту
                <span>
                  Хто краще знаходить
                  <br />
                  вразливості?
                </span>
              </h1>
              <p>
                Інтерактивне дослідження можливостей генеративного штучного
                інтелекту в аналізі безпеки програмного коду.
              </p>
              <div className="actions">
                <a className="button primary" href="#experiment">
                  Переглянути експеримент <ArrowUpRight size={18} />
                </a>
                <a className="button secondary" href="#about">
                  Дізнатися більше <ArrowRight size={17} />
                </a>
              </div>
              <div className="hero-note">
                <ShieldCheck size={16} /> Навчальний експеримент <span />{" "}
                Відкритий до критичного аналізу
              </div>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit orbit-three" />
              <div className="orb">
                <div className="orb-grid" />
                <div className="orb-core">
                  <ScanLine size={62} strokeWidth={1} />
                </div>
              </div>
              <div className="float-card float-top">
                <span className="small-icon">
                  <Cpu size={18} />
                </span>
                <div>
                  Генеративний ШІ<small>Аналізує. Пояснює. Порівнює.</small>
                </div>
                <span className="status-dot" />
              </div>
              <div className="float-card float-bottom">
                <span className="small-icon blue">
                  <ShieldCheck size={18} />
                </span>
                <div>
                  Безпека починається з коду
                  <small>
                    <span className="purple">def</span> analyze(code):{" "}
                    <span className="green">think()</span>
                  </small>
                </div>
              </div>
              <span className="art-coordinate">АНАЛІЗ / 001</span>
              <span className="art-caption">
                ЛЮДСЬКЕ МИСЛЕННЯ × МОЖЛИВОСТІ ШІ
              </span>
            </div>
          </div>
          <div className="hero-bottom container">
            <span>ОДИН ЕКСПЕРИМЕНТ. РІЗНІ ПЕРСПЕКТИВИ.</span>
            <div>
              <span>Python</span>
              <i />
              <span>ChatGPT</span>
              <i />
              <span>Gemini</span>
              <i />
              <span>GitHub Copilot</span>
            </div>
            <a href="#about" aria-label="До дослідження">
              ↓
            </a>
          </div>
        </section>
        <div className="container">
          <Section
            id="about"
            number="01"
            label="КОНТЕКСТ"
            title={
              <>
                Код пишуть швидше.
                <br />
                <span className="muted">А чи стає він безпечнішим?</span>
              </>
            }
            description="Аналіз вразливостей програмного коду за допомогою генеративного штучного інтелекту — від першої знахідки до обґрунтованих висновків."
          >
            <div className="grid three">
              {[
                [
                  Target,
                  "Мета дослідження",
                  "Порівняти, як людина та три ШІ-сервіси знаходять і пояснюють вразливості в однаковому Python-коді.",
                ],
                [
                  ScanLine,
                  "Актуальність",
                  "Згенерований код потребує перевірки. Впевнена відповідь моделі ще не гарантує безпеки застосунку.",
                ],
                [
                  Layers,
                  "Практичне значення",
                  "Навчитися перевіряти рекомендації ШІ та поєднувати автоматизований аналіз із фаховим мисленням.",
                ],
              ].map(([icon, title, text]) => (
                <article className="card reveal" key={title}>
                  <span className="tile-icon">
                    <Icon icon={icon} />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
            <div className="workflow reveal">
              {[
                "Вихідний Python-код",
                "Самостійний аналіз та аналіз ШІ",
                "Порівняння",
                "Висновки",
              ].map((t, i) => (
                <React.Fragment key={t}>
                  <div>
                    <span>0{i + 1}</span>
                    {t}
                  </div>
                  {i < 3 && <ArrowRight size={18} />}
                </React.Fragment>
              ))}
            </div>
          </Section>
          <ToolCatalog />
          <Section
            id="preparation"
            number="03"
            label="МЕТОДИКА"
            title={
              <>
                Один код.
                <br />
                <span className="gradient-text">
                  Чотири підходи до аналізу.
                </span>
              </>
            }
            description="Однакові вхідні умови — основа коректного порівняння."
          >
            <div className="preparation card reveal">
              <div>
                <div className="eyebrow">ПРОТОКОЛ ЕКСПЕРИМЕНТУ</div>
                <h3>
                  Знайти слабкі місця.
                  <br />
                  Пояснити причини. Запропонувати захист.
                </h3>
                <a className="button primary" href="#experiment">
                  Запустити демонстрацію <Play size={16} />
                </a>
                <p className="fine">
                  Навчальний код навмисно містить вразливості.
                </p>
              </div>
              <dl>
                {[
                  ["Мова програмування", "Python"],
                  ["Об’єкт", "Навчальна система авторизації"],
                  ["Завдання", "Виявлення вразливостей"],
                  ["Учасники", "Людина, ChatGPT, Gemini, GitHub Copilot"],
                  [
                    "Критерії",
                    "Точність, повнота, швидкість, якість пояснення",
                  ],
                ].map(([key, val]) => (
                  <div key={key}>
                    <dt>{key}</dt>
                    <dd>{val}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Section>
          <Experiment />
          <Results />
          <Section
            id="human-ai"
            number="08"
            label="СПІВПРАЦЯ"
            title={
              <>
                Не суперники.
                <br />
                <span className="gradient-text">Сильніші разом.</span>
              </>
            }
          >
            <div className="grid two">
              <article className="card reveal">
                <span className="tile-icon">
                  <UserRound />
                </span>
                <h3>Переваги людини</h3>
                <ul className="check-list">
                  {[
                    "Розуміння бізнес-контексту та реальних ризиків",
                    "Критичне мислення й перевірка припущень",
                    "Відповідальність за рішення та пріоритети",
                    "Оцінка складних логічних вразливостей",
                  ].map((t) => (
                    <li key={t}>
                      <Check size={16} />
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
              <article className="card reveal ai-card">
                <span className="tile-icon">
                  <Cpu />
                </span>
                <h3>Переваги штучного інтелекту</h3>
                <ul className="check-list">
                  {[
                    "Швидкий пошук відомих небезпечних шаблонів",
                    "Масштабування рутинної перевірки",
                    "Генерація пояснень і варіантів виправлення",
                    "Допомога в навчанні та дослідженні коду",
                  ].map((t) => (
                    <li key={t}>
                      <Check size={16} />
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
            <blockquote className="reveal">
              «Найкращий результат досягається завдяки поєднанню
              автоматизованого аналізу та критичного мислення фахівця.»
            </blockquote>
          </Section>
          <Section
            id="media"
            number="09"
            label="МУЛЬТИМЕДІА"
            title="Дослідження в різних форматах."
            description="Місце для майбутніх матеріалів. Зображення, відео та аудіо ще не додані."
          >
            <div className="grid three">
              {[
                [
                  Video,
                  "Відеопояснення",
                  "Як ШІ аналізує програмний код",
                  "Runway / HeyGen / CapCut AI",
                ],
                [
                  Image,
                  "Візуалізації",
                  "Від ідеї до схеми дослідження",
                  "ChatGPT Images / Leonardo AI / Canva AI",
                ],
                [
                  AudioLines,
                  "Аудіопояснення",
                  "Ключові знахідки та висновки",
                  "ElevenLabs / Suno / TTSMaker",
                ],
              ].map(([icon, title, text, tool]) => (
                <article className="card media-card reveal" key={title}>
                  <div className="media-placeholder">
                    <Icon icon={icon} size={34} />
                    <span>МАТЕРІАЛ ГОТУЄТЬСЯ</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <small>Заплановані інструменти: {tool}</small>
                </article>
              ))}
            </div>
          </Section>
          <Section
            id="ethics"
            number="10"
            label="ВІДПОВІДАЛЬНІСТЬ"
            title="Можливості потребують принципів."
          >
            <div className="grid three">
              {[
                [
                  ShieldCheck,
                  "Допустиме використання",
                  "Використовуйте ШІ для навчання, пошуку гіпотез і перевірки власного коду з дозволу його власника.",
                ],
                [
                  LockKeyhole,
                  "Обмеження та ризики",
                  "Не передавайте конфіденційний код і секрети стороннім сервісам. Перевіряйте кожну рекомендацію та можливі хибні спрацювання.",
                ],
                [
                  BookOpen,
                  "Академічна доброчесність",
                  "Позначайте внесок ШІ, зберігайте запити й відповіді. Самостійно оцінюйте результати та посилайтеся на джерела.",
                ],
              ].map(([icon, title, text]) => (
                <article className="card reveal" key={title}>
                  <span className="tile-icon">
                    <Icon icon={icon} />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </Section>
          <Section
            id="conclusions"
            number="11"
            label="ВИСНОВКИ"
            className="conclusion"
            title={
              <>
                ШІ — інструмент фахівця,
                <br />
                <span className="gradient-text">
                  а не заміна його мислення.
                </span>
              </>
            }
            description="Безпечний код починається з правильних запитань. І з готовності перевірити відповідь."
          >
            <div className="conclusion-note">
              <span className="status-dot" /> Остаточні висновки буде додано
              після реального тестування.
            </div>
            <div className="actions">
              <a className="button primary" href="#experiment">
                Повернутися до експерименту <ArrowUpRight size={17} />
              </a>
              <a className="button secondary" href="#results">
                Переглянути результати <ArrowRight size={17} />
              </a>
            </div>
          </Section>
        </div>
      </main>
      <footer className="container">
        <div className="footer-top">
          <a href="#home" className="brand">
            <span className="brand-icon">
              <Code2 size={20} />
            </span>
            AI CODE<span className="brand-dot">.</span>
          </a>
          <p>
            Досліджуємо можливості.
            <br />
            Критично оцінюємо результати.
          </p>
          <div className="author">
            {author.name}
            <br />
            {author.group} · {author.university}
            <br />
            {author.year}
          </div>
        </div>
        <div className="footer-bottom">
          <span>Навчальний проєкт · Демонстраційна версія</span>
          <div>
            <a
              href="https://owasp.org/www-project-top-ten/"
              target="_blank"
              rel="noreferrer"
            >
              OWASP <ExternalLink size={12} />
            </a>
            <a
              href="https://docs.python.org/3/library/sqlite3.html"
              target="_blank"
              rel="noreferrer"
            >
              Python <ExternalLink size={12} />
            </a>
            <a href="#tools">Джерела та інструменти</a>
          </div>
        </div>
      </footer>
    </>
  );
}
function ToolCatalog() {
  const [category, setCategory] = useState("Текст і код");
  return (
    <Section
      id="tools"
      number="02"
      label="ІНСТРУМЕНТИ"
      title={
        <>
          Різні інструменти.
          <br />
          <span className="muted">Нові можливості.</span>
        </>
      }
      description="Від аналізу коду до мультимедіа: обирайте інструмент під завдання."
    >
      <div className="tabs" role="tablist" aria-label="Категорії інструментів">
        {Object.keys(tools).map((c, i) => (
          <button
            key={c}
            id={`tool-tab-${i}`}
            role="tab"
            aria-selected={category === c}
            aria-controls="tool-panel"
            tabIndex={category === c ? 0 : -1}
            className={category === c ? "selected" : ""}
            onClick={() => setCategory(c)}
            onKeyDown={(e) => {
              if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) {
                e.preventDefault();
                const keys = Object.keys(tools),
                  next =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? 3
                        : (i + (e.key === "ArrowRight" ? 1 : 3)) % 4;
                setCategory(keys[next]);
                document.getElementById(`tool-tab-${next}`).focus();
              }
            }}
          >
            <Icon icon={[Code2, Image, AudioLines, Video][i]} size={17} />
            {c}
          </button>
        ))}
      </div>
      <div
        className="grid three tools-grid"
        id="tool-panel"
        role="tabpanel"
        aria-labelledby={`tool-tab-${Object.keys(tools).indexOf(category)}`}
        key={category}
      >
        {tools[category].map(
          ([name, purpose, benefits, limits, best, url], i) => (
            <article className="card tool-card" key={name}>
              <div className="tool-top">
                <span className="tool-monogram">
                  {name === "GitHub Copilot" ? <Code2 /> : name.slice(0, 1)}
                </span>
                <span className="mono">0{i + 1}</span>
              </div>
              <h3>{name}</h3>
              <p>{purpose}</p>
              <div className="tool-details">
                <div>
                  <span>ПЕРЕВАГИ</span>
                  <p>{benefits}</p>
                </div>
                <div>
                  <span>БЕЗКОШТОВНИЙ ДОСТУП</span>
                  <p>{limits}</p>
                </div>
                <div>
                  <span>НАЙКРАЩЕ ДЛЯ</span>
                  <p>{best}</p>
                </div>
              </div>
              <a href={url} target="_blank" rel="noreferrer">
                Офіційний сайт <ArrowUpRight size={17} />
              </a>
            </article>
          ),
        )}
      </div>
      <p className="fine">
        Умови безкоштовного доступу змінюються. Актуальні квоти перевіряйте на
        офіційних сайтах.
      </p>
    </Section>
  );
}
function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
function highlight(line) {
  return line
    .split(/("[^"]*"|'[^']*'|\b(?:def|import|if|return|not)\b|#.*$)/g)
    .map((part, i) => (
      <span
        key={i}
        className={
          part.startsWith("#")
            ? "token-comment"
            : /^['"]/.test(part)
              ? "token-string"
              : /^(def|import|if|return|not)$/.test(part)
                ? "token-keyword"
                : ""
        }
      >
        {part}
      </span>
    ));
}
function Experiment() {
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(false);
  const reduced = useReducedMotion();
  const timer = useRef(null);
  const end = 38;
  const aiStart = 27;
  const foundCount = (p) =>
    p.id === "human"
      ? Math.min(p.found.length, Math.max(0, Math.floor((tick - 12) / 4)))
      : Math.min(
          p.found.length,
          Math.max(
            0,
            Math.floor(
              (tick - aiStart) /
                (p.id === "chatgpt" ? 1.6 : p.id === "gemini" ? 2 : 1.8),
            ),
          ),
        );
  const visibleLines = Math.min(code.length, tick || code.length);
  const stage =
    tick === 0
      ? "Готово до запуску"
      : tick <= 12
        ? "Поява коду"
        : tick < aiStart
          ? "Ручний аналіз"
          : tick < end
            ? "Аналіз трьох ШІ"
            : "Демонстрацію завершено";
  useEffect(() => {
    if (running) {
      timer.current = setInterval(
        () => setTick((t) => Math.min(end, t + 1)),
        reduced ? 40 : 450,
      );
    }
    return () => clearInterval(timer.current);
  }, [running, reduced]);
  useEffect(() => {
    if (tick === end) setRunning(false);
  }, [tick]);
  const start = () => {
    setTick(1);
    setRunning(true);
  };
  const detected = participants.flatMap((p) => p.found.slice(0, foundCount(p)));
  const selectedLines = vulnerabilities
    .filter((v) => detected.includes(v.id))
    .map((v) => v.line);
  return (
    <Section
      id="experiment"
      number="04—06"
      label="ІНТЕРАКТИВНИЙ ЕКСПЕРИМЕНТ"
      title={
        <>
          Від рядка коду
          <br />
          <span className="gradient-text">до знайденої вразливості.</span>
        </>
      }
      description="Спостерігайте за сценарієм аналізу. Програвач не надсилає код до ШІ та не виконує Python."
    >
      <div className="demo-label">
        <CircleAlert size={16} />
        <strong>Демонстраційні дані</strong>
        <span>Знахідки й час задані сценарієм, а не виміряні.</span>
      </div>
      <div className="experiment-toolbar">
        <div className="stage">
          <span className={running ? "status-dot pulse" : "status-dot"} />
          {stage}
        </div>
        <div className="controls">
          <button
            className="button primary small"
            onClick={
              tick === 0 || tick === end ? start : () => setRunning(!running)
            }
          >
            {running ? (
              <span className="pause-icon" aria-hidden="true">
                Ⅱ
              </span>
            ) : (
              <Play size={15} />
            )}{" "}
            {running
              ? "Пауза"
              : tick === 0
                ? "Запустити"
                : tick === end
                  ? "Повторити"
                  : "Продовжити"}
          </button>
          <button
            className="icon-button"
            onClick={start}
            aria-label="Повторити демонстрацію"
          >
            <RotateCcw size={18} />
          </button>
          <button
            className="icon-button"
            onClick={() => {
              setTick(end);
              setRunning(false);
            }}
            aria-label="Пропустити до результату"
          >
            <SkipForward size={18} />
          </button>
        </div>
      </div>
      <div className="steps">
        {[
          "Візуалізація коду",
          "Ручний аналіз",
          "Аналіз трьох ШІ",
          "Підсумок",
        ].map((s, i) => (
          <span className={tick >= [1, 13, 27, 38][i] ? "done" : ""} key={s}>
            <b>0{i + 1}</b>
            {s}
          </span>
        ))}
      </div>
      <div className="analysis-grid">
        <div className="editor">
          <div className="editor-bar">
            <div className="window-dots">
              <i />
              <i />
              <i />
            </div>
            <span>
              <Code2 size={14} /> login.py
            </span>
            <span className="mono">Python</span>
          </div>
          <div
            className="editor-code"
            tabIndex="0"
            role="region"
            aria-label="Навчальний Python-код"
          >
            {code.slice(0, visibleLines).map((line, i) => (
              <div
                key={i}
                className={`code-line ${selectedLines.includes(i + 1) ? "flagged" : ""} ${tick > 12 && tick < 27 && i === Math.floor((tick - 12) * 0.8) ? "scanning" : ""}`}
              >
                <span className="line-number">{i + 1}</span>
                <code>
                  {highlight(line)}
                  {running && i === visibleLines - 1 && tick <= 12 && (
                    <span className="cursor" />
                  )}
                </code>
                {selectedLines.includes(i + 1) && (
                  <CircleAlert className="line-alert" size={13} />
                )}
              </div>
            ))}
          </div>
          <div className="editor-status">
            <span>
              <span className="status-dot" /> Навчальне середовище
            </span>
            <span>UTF-8 · Python</span>
          </div>
        </div>
        <article className="card human-panel">
          <div className="participant-heading">
            <span className="tile-icon">
              <UserRound size={20} />
            </span>
            <div>
              <small>ПЕРШИЙ ЕТАП</small>
              <h3>Ручний аналіз коду</h3>
            </div>
          </div>
          <p className="analysis-message" aria-live="polite">
            {tick === 0
              ? "Запустіть демонстрацію, щоб спостерігати за аналізом."
              : tick <= 12
                ? "Готуємо код до перегляду…"
                : tick < 17
                  ? "Перевіряю роботу з паролями…"
                  : tick < 22
                    ? "Потрібно уважніше проаналізувати SQL-запит."
                    : tick < 27
                      ? "Потенційну вразливість виявлено."
                      : "Не всі проблеми вдалося помітити."}
          </p>
          <div className="participant-stats">
            <div>
              <b>
                {foundCount(participants[0])}
                <span> / 5</span>
              </b>
              <small>знахідок</small>
            </div>
            <div>
              <b>
                {Math.round(Math.min(1, Math.max(0, (tick - 12) / 14)) * 180)}
                <span> с</span>
              </b>
              <small>умовний час</small>
            </div>
          </div>
          <FindingList
            ids={participants[0].found.slice(0, foundCount(participants[0]))}
          />
          <p className="fine">
            Темп і пропуски — частина сценарію. Це не оцінка здібностей усіх
            фахівців.
          </p>
        </article>
      </div>
      <div className="ai-heading">
        <div className="eyebrow">НАСТУПНИЙ ЕТАП</div>
        <h3>Три ШІ. Один програмний код.</h3>
      </div>
      <div className="grid three ai-participants">
        {participants.slice(1).map((p) => {
          const count = foundCount(p),
            complete = tick === end;
          return (
            <article
              key={p.id}
              className="card ai-participant"
              style={{ "--participant": p.color }}
            >
              <div className="participant-heading">
                <span className="tile-icon">
                  <Cpu size={21} />
                </span>
                <h3>{p.name}</h3>
                <span className="mono">{count}/5</span>
              </div>
              <div className="progress-track">
                <div
                  style={{
                    width: `${Math.min(100, Math.max(0, ((tick - aiStart) / (end - aiStart)) * 100))}%`,
                  }}
                />
              </div>
              <div className="analysis-meta">
                <span>
                  {complete
                    ? "Аналіз завершено"
                    : tick >= aiStart
                      ? "Пошук вразливостей…"
                      : "Очікує запуску"}
                </span>
                <span>
                  {Math.round(
                    Math.min(
                      1,
                      Math.max(0, (tick - aiStart) / (end - aiStart)),
                    ) * p.seconds,
                  )}{" "}
                  с*
                </span>
              </div>
              <FindingList ids={p.found.slice(0, count)} />
              {count === 0 && (
                <p className="waiting">Знахідки з’являтимуться послідовно.</p>
              )}
              {complete && (
                <div className="complete">
                  <CheckCheck size={15} /> Сценарний результат готовий
                </div>
              )}
            </article>
          );
        })}
      </div>
      <p className="fine">
        * Умовний час у сценарії. Реальне порівняння потребує однакових запитів,
        фіксації версій моделей і перевірки кожної знахідки.
      </p>
    </Section>
  );
}
function FindingList({ ids }) {
  return (
    <ul className="findings">
      {ids.map((id) => (
        <li key={id}>
          <Check size={15} />
          {vulnerabilities.find((v) => v.id === id)?.name}
        </li>
      ))}
    </ul>
  );
}
function Results() {
  const [criterion, setCriterion] = useState(0);
  const [selected, setSelected] = useState("chatgpt");
  const p = participants.find((p) => p.id === selected);
  const reduced = useReducedMotion();
  return (
    <Section
      id="results"
      number="07"
      label="ПОРІВНЯННЯ"
      title={
        <>
          Дані, що допомагають
          <br />
          <span className="muted">поставити правильні запитання.</span>
        </>
      }
      description="Порівняйте учасників за різними критеріями та перегляньте кожну знахідку."
    >
      <div className="demo-label">
        <CircleAlert size={16} />
        <strong>Демонстраційні дані</strong>
        <span>Ілюстративні бали 0–100. Це не рейтинг сервісів.</span>
      </div>
      <div className="dashboard">
        <div className="card chart-card">
          <div className="chart-header">
            <h3>Порівняння підходів</h3>
            <label htmlFor="criterion">
              Критерій
              <select
                id="criterion"
                value={criterion}
                onChange={(e) => setCriterion(Number(e.target.value))}
              >
                {criteria.map((c, i) => (
                  <option key={c} value={i}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div
            className="chart"
            role="img"
            aria-label={`Демонстраційні бали: ${criteria[criterion]}. ${participants.map((p) => `${p.name}: ${p.scores[criterion]}`).join(", ")}`}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={participants.map((p) => ({
                  name: p.name,
                  value: p.scores[criterion],
                  color: p.color,
                }))}
                margin={{ top: 20, right: 0, left: -28, bottom: 0 }}
              >
                <CartesianGrid stroke="#262335" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#9CA3B5"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                  interval={0}
                />
                <YAxis
                  domain={[0, 100]}
                  stroke="#9CA3B5"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  cursor={{ fill: "#ffffff05" }}
                  contentStyle={{
                    background: "#161426",
                    border: "1px solid #403259",
                    borderRadius: 10,
                    color: "#F5F5FA",
                  }}
                  formatter={(v) => [`${v} / 100`, "Умовний бал"]}
                />
                <Bar
                  dataKey="value"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={65}
                  isAnimationActive={!reduced}
                >
                  {participants.map((p) => (
                    <Cell key={p.id} fill={p.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="fine">
            Усі критерії нормовано: вищий бал означає кращий сценарний
            результат, зокрема менше помилок і швидший аналіз.
          </p>
        </div>
        <div className="card summary-card">
          <span className="tile-icon">
            <Workflow />
          </span>
          <h3>За цифрами — перевірка.</h3>
          <p>
            Кількість знахідок не дорівнює якості аналізу. Важливі
            обґрунтування, відсутність хибних спрацювань і придатність
            виправлень.
          </p>
          <div className="summary-number">
            4 <span>підходи</span>
            <i />5 <span>вразливостей</span>
          </div>
          <p className="fine">
            Для реального дослідження: зберегти запити, відповіді, версії
            моделей, дату тесту та незалежну оцінку.
          </p>
        </div>
      </div>
      <div className="participant-selector" aria-label="Учасники">
        {participants.map((item) => (
          <button
            key={item.id}
            aria-pressed={selected === item.id}
            className={`card ${selected === item.id ? "selected" : ""}`}
            onClick={() => setSelected(item.id)}
            style={{ "--participant": item.color }}
          >
            <span>
              {item.id === "human" ? (
                <UserRound size={18} />
              ) : (
                <Cpu size={18} />
              )}{" "}
              {item.name}
            </span>
            <b>
              {item.found.length}
              <small> / 5 знахідок</small>
            </b>
            <span className="detail-link">
              Докладні результати <ChevronRight size={15} />
            </span>
          </button>
        ))}
      </div>
      <div className="card result-details" aria-live="polite">
        <div>
          <div className="eyebrow">СЦЕНАРНИЙ ЗВІТ</div>
          <h3>{p.name}</h3>
        </div>
        <div className="vulnerability-list">
          {vulnerabilities.map((v) => {
            const found = p.found.includes(v.id);
            return (
              <details key={v.id}>
                <summary>
                  <span className={found ? "found-badge" : "missed-badge"}>
                    {found ? <Check size={14} /> : <CircleAlert size={14} />}
                  </span>
                  <span>{v.name}</span>
                  <small>{found ? "Знайдено" : "Пропущено"}</small>
                  <ChevronRight size={16} />
                </summary>
                <div>
                  <p>{v.description}</p>
                  <p>
                    <strong>Рекомендація:</strong> {v.fix}
                  </p>
                  <span className="mono">login.py:{v.line}</span>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
