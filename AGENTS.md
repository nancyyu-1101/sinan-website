# Portfolio Project Agents Guide

本文件是这个个人作品集网站的项目级协作规范。任何后续 Codex / Agent 在本项目内工作时，都应先阅读本文件，再读取 `skills/portfolio-site-builder/SKILL.md` 和当前阶段对应的 `specs/*.md`。

## Project Intent

打造一个具有品牌感、故事性和设计感的个人 Portfolio 网站，用于简历投递和招聘浏览。网站要让 HR、设计主管和招聘人员在 2-3 分钟内形成三个明确印象：

- `Design`: 具备扎实的工业设计与产品设计能力。
- `Build`: 能利用 AI、Vibecoding 和前端技术快速完成产品原型与落地。
- `Taste`: 拥有成熟、统一、克制且高级的审美表达。

网站不是作品堆叠页，而是一张可以体现设计能力、产品思维和个人品牌的数字名片。

## Required Workflow

每次开始开发任务时：

1. 阅读 `AGENTS.md`。
2. 阅读 `skills/portfolio-site-builder/SKILL.md`。
3. 根据任务阶段读取对应 spec：
   - `specs/phase-01-foundation.md`
   - `specs/phase-02-brand-content.md`
   - `specs/phase-03-home.md`
   - `specs/phase-04-works.md`
   - `specs/phase-05-photography.md`
   - `specs/phase-06-contact-seo-polish.md`
4. 如果任务跨阶段，优先保持已完成阶段稳定，只做必要增量。
5. 修改完成后运行可用的检查命令，并在交付说明中写清验证结果。

## Tech Stack

- Framework: Next.js App Router
- Language: TypeScript
- Styling: Tailwind CSS v4
- Animation: Framer Motion
- Smooth scroll: Lenis
- Image: Next/Image
- Icons: Lucide React
- Content: MDX
- Data: TypeScript files under `data/`
- Deployment target: Vercel
- Analytics: Vercel Analytics
- SEO: Next.js Metadata API

不要引入额外 UI 框架，例如 shadcn/ui、MUI、Ant Design。不要同时引入 GSAP。组件应为项目定制，保持品牌一致性。

## Design Direction

关键词：

- Minimal
- Editorial
- Premium
- Clean
- Warm White
- Motion Design

参考气质：

- Sandra Creates
- Apple
- Linear
- Raycast

界面要大量留白、图片优先、排版有编辑感、动效自然克制。不要做营销站式的大量卡片堆叠，不要使用夸张渐变、过度装饰或复杂炫技动画。

## Information Architecture

主导航固定为：

- Home
- Works
- Photography
- Contact

项目采用多页面结构。Home 首次进入时 Navigation 隐藏，第一次滚动后显示。左上角始终保留个人 IP 小人物 Logo，点击返回 Home。

## Content Model

作品内容使用 MDX：

```text
content/
  works/
  photography/
  profile/
```

结构化数据使用 TypeScript：

```text
data/
  experience.ts
  awards.ts
  profile.ts
  contact.ts
```

新增作品时应尽量只增加 MDX 文件和必要图片，不改核心页面逻辑。

## Implementation Principles

- 优先实现真实可用体验，不做只有视觉外壳的页面。
- 保持组件简单、可维护、可复用，但不要过早抽象。
- 动效只服务叙事、层级和反馈，不做复杂炫技。
- 所有页面都要响应式，移动端不能出现文字溢出、按钮拥挤或图片遮挡。
- 图片和内容都应预留真实替换入口，不把占位内容写死在组件深处。
- 可访问性要过基本线：语义结构清晰、键盘可操作、图片有 alt、交互有 focus 状态。
- 页面性能要干净：懒加载图片、避免不必要客户端组件、动画不阻塞首屏。

## Phase Order

按以下顺序推进：

1. Foundation: 初始化项目、路由、布局、基础样式、工具链。
2. Brand & Content: 建立品牌 token、个人 IP 资产入口、数据与 MDX 内容模型。
3. Home: 完成 Hero、滚动叙事、经历、获奖、About Me。
4. Works: 完成工业设计作品、Vibecoding 项目和统一详情页。
5. Photography: 完成 Masonry Gallery、Lightbox 和图片浏览。
6. Contact, SEO & Polish: 完成联系方式、SEO、404、Loading、性能与上线验收。

如果用户明确要求跳过阶段，可以跳过，但应说明依赖风险。

## Verification

每个阶段完成后至少检查：

- TypeScript / lint / build 是否通过。
- 对应页面是否能在本地打开。
- 桌面端与移动端布局是否可用。
- 核心交互是否真实可点击、可关闭、可切换。
- 新增内容是否能通过数据或 MDX 维护。

涉及视觉或动效的阶段，应尽量使用浏览器预览截图进行人工检查。

## Delivery Style

交付说明使用中文，简洁说明：

- 完成了哪些文件或页面。
- 当前阶段是否满足 spec。
- 执行了哪些验证。
- 有哪些后续需要用户补充的真实素材，例如个人 IP 图片、作品图、摄影图、二维码等。
