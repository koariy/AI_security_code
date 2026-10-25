# Security Research — Чи може ШІ знаходити вразливості краще за людину?

Україномовний інтерактивний технічний огляд, який порівнює ручний аудит безпеки з автоматизованим аналізом коду на основі ШІ.

## Запуск локально

```bash
npm ci
npm run dev
```

Для production-збірки:

```bash
npm run build
npm run preview
```

## Що є на сайті

- Анотація та зміст зі швидкою навігацією.
- Концептуальне порівняння ручного аудиту й автоматизованого аналізу.
- Інтерактивні навчальні приклади SQL-ін'єкції, XSS, обходу авторизації та RCE.
- Перегляд уразливого фрагмента та можливого виправлення.
- Висновки, методологія оцінювання та першоджерела.

## Важливо про дані

Це огляд опублікованих матеріалів і демонстраційний навчальний інтерфейс, а не власний контрольований експеримент. У сайті не заявляються непідтверджені універсальні показники точності чи швидкості. Логи та приклади — симульовані; вони не свідчать про запуск реального сканера.

## Джерела

- [SecLLMHolmes — IEEE Symposium on Security and Privacy (2024)](https://doi.org/10.1109/SP54263.2024.00210)
- [OWASP SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [NIST SP 800-218: Secure Software Development Framework](https://csrc.nist.gov/pubs/sp/800/218/final)
- [Tamberg & Bahsi — Harnessing LLMs for Software Vulnerability Detection (2024)](https://arxiv.org/abs/2405.15614)
