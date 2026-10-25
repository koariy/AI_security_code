# AI Security Benchmark — Research Article

An interactive, research-led article comparing manual security review with AI-assisted code vulnerability analysis. The interface is currently in English and uses an editorial dark theme with restrained animated ambient lighting.

## Run locally

```bash
npm ci
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Features

- Sticky translucent top navigation and animated ambient background orbs, with reduced-motion support.
- Hero abstract and interactive visual walkthrough of a SQL-injection finding and suggested patch.
- Simulated human-review timeline and AI scan console with animated progress. These are UI demonstrations, not live scanner/model output.
- Vulnerability examples for SQL injection, XSS, authorization bypass, and command injection, with side-by-side and unified diffs.
- Interactive inline reference notes and academic/source cards linking to IEEE, OWASP, NIST, and arXiv materials.
- Benchmark methodology and language-specific evaluation considerations.

## Important data note

This site is an educational article and interface demonstration, not a newly conducted controlled experiment. It intentionally avoids unsupported universal accuracy/speed claims. Timings, progress, terminal output, and proposed patches are simulated. The examples should be reviewed in their real application context.

## Sources

- [SecLLMHolmes — IEEE Symposium on Security and Privacy (2024)](https://doi.org/10.1109/SP54263.2024.00210)
- [OWASP SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [NIST SP 800-218: Secure Software Development Framework](https://csrc.nist.gov/pubs/sp/800/218/final)
- [Tamberg & Bahsi — Harnessing LLMs for Software Vulnerability Detection (2024)](https://arxiv.org/abs/2405.15614)
