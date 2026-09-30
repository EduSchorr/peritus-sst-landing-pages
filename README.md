> **Language:** English · [Português (Brasil)](README.pt-BR.md)

<div align="center">

# Peritus SST Landing Pages

### HTML · CSS · JavaScript · technical-service calculators · conversion flows

**Three focused SST landing pages for technical expert assistance, quantitative occupational assessments and FAP review.**

![HTML5](https://img.shields.io/badge/HTML5-20232A?style=for-the-badge&logo=html5&logoColor=E34F26)
![CSS3](https://img.shields.io/badge/CSS3-20232A?style=for-the-badge&logo=css3&logoColor=1572B6)
![JavaScript](https://img.shields.io/badge/JavaScript-20232A?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

</div>

---

## About

This repository contains three conversion-oriented web experiences for the SST domain:

- **Technical Expert Assistance** — preliminary scope and price simulation based on expertise type, sectors and deadline;
- **Quantitative Assessments** — estimation based on occupational agent, area, sampling points and mobilization;
- **FAP Review** — financial-impact simulation based on payroll, RAT and current FAP.

The public repository is a **sanitized portfolio edition**. Direct commercial contact values are demonstrative and no production lead data or private configuration is included.

## Structure

```text
peritus-sst/
├── avaliacoes-quantitativas.html
├── pericias-tecnicas.html
├── revisao-fap.html
└── assets/
    ├── css/styles.css
    ├── img/
    └── js/
        ├── shared.js
        ├── avaliacoes.js
        ├── pericias.js
        └── fap.js
```

## What it demonstrates

- responsive landing-page design;
- domain-specific interactive calculators;
- reusable shared UI helpers;
- Brazilian currency and number formatting;
- dynamic pricing and projections;
- validation and accessible form feedback;
- WhatsApp continuation flows;
- service-specific visual themes;
- responsive navigation and FAQ interactions.

## Run locally

No build step is required:

```bash
cd peritus-sst
python -m http.server 8080
```

Then open one of the three HTML pages.

## Portfolio sanitization

The public edition uses a demonstration WhatsApp number and excludes private campaign configuration, client leads and deployment-specific values.

See [`PORTFOLIO_EDITION.md`](PORTFOLIO_EDITION.md).

---

<div align="center">Built by **Eduardo Lima** · [GitHub](https://github.com/EduSchorr)</div>
