---
name: portfolio-site-builder
description: Project-specific workflow for building Sinan's premium personal portfolio website. Use when implementing, reviewing, planning, or polishing this Next.js portfolio project, especially tasks involving AGENTS.md, phase specs, Home, Works, Photography, Contact, MDX content, brand system, motion, SEO, or Vercel deployment.
---

# Portfolio Site Builder

## Overview

Use this skill to keep every implementation step aligned with the portfolio's product intent: a minimal, editorial, premium personal site that communicates `Design`, `Build`, and `Taste`.

Always treat `AGENTS.md` as the project contract and the phase specs in `specs/` as the delivery checklist.

## Operating Workflow

1. Read `AGENTS.md`.
2. Identify the current phase or user-requested feature.
3. Read the relevant file in `specs/`.
4. Inspect existing implementation before changing code.
5. Implement the smallest complete slice that satisfies the current spec.
6. Verify with the available checks and, for visual work, a browser preview when possible.
7. Report what changed, what passed verification, and what real assets are still needed.

## Phase Map

- Phase 01: `specs/phase-01-foundation.md`
  - Initialize Next.js App Router, TypeScript, Tailwind CSS v4, global layout, navigation, routes, and tooling.
- Phase 02: `specs/phase-02-brand-content.md`
  - Establish brand tokens, personal IP asset slots, `data/`, MDX content, and content utilities.
- Phase 03: `specs/phase-03-home.md`
  - Build the Home narrative: IP Hero, scroll sequence, tags, experience, awards, and About Me.
- Phase 04: `specs/phase-04-works.md`
  - Build Works listing and MDX-driven detail pages for industrial design and Vibecoding projects.
- Phase 05: `specs/phase-05-photography.md`
  - Build Masonry photography gallery and Lightbox browsing.
- Phase 06: `specs/phase-06-contact-seo-polish.md`
  - Build Contact, WeChat QR interaction, SEO, Loading, 404, analytics, and final QA.

## Design Rules

- Keep the visual direction minimal, editorial, premium, clean, warm white, and motion-aware.
- Favor large whitespace, strong typography, image-first layouts, and restrained interaction.
- Do not introduce shadcn/ui, MUI, Ant Design, Bootstrap, GSAP, or decorative animation libraries.
- Use Framer Motion for page transitions, scroll reveal, Hero animation, hover feedback, and card motion.
- Use Lenis only for smooth scrolling.
- Use Lucide React for interface icons.
- Use Next/Image for all meaningful images.
- Avoid heavy gradients, decorative blobs, nested cards, and generic SaaS landing-page composition.

## Content Rules

- Put structured profile, contact, experience, and awards data in `data/`.
- Put works and long-form content in `content/` as MDX.
- Keep components content-driven: avoid burying final text, links, or image paths inside layout code.
- Hide optional links when data is missing instead of rendering empty buttons.
- Preserve the two Works categories: `industrial-design` and `vibecoding`.

## Motion Rules

- Motion must feel natural, premium, and restrained.
- Honor reduced-motion preferences where practical.
- Do not let animation block content access.
- Make hover states subtle: slight lift, slight scale, or underline motion is enough.
- For the Home mouth-window animation, implement a replaceable structure if final layered IP art is not available yet.

## Quality Gate

Before considering a phase complete:

- Run the project's available type, lint, and build checks.
- Confirm affected routes load.
- Check desktop and mobile layouts.
- Verify core interactions are real: navigation, detail links, award expansion, lightbox, QR modal, or external links as applicable.
- Make sure new content can be maintained through MDX or `data/`.
