# Portfolio Specs Index

这些 spec 文件按阶段定义个人作品集网站的功能范围、实现要求和验收标准。后续开发应从 `AGENTS.md` 和 `skills/portfolio-site-builder/SKILL.md` 开始，再读取当前阶段 spec。

## Phase Specs

1. `phase-01-foundation.md`  
   项目初始化、技术栈、路由、全局布局、基础工具链。

2. `phase-02-brand-content.md`  
   品牌系统、个人 IP 资产入口、内容模型、MDX 与数据文件。

3. `phase-03-home.md`  
   Home 页面叙事体验、Hero Scroll、经历、获奖、About Me。

4. `phase-04-works.md`  
   Works 页面、工业设计作品、Vibecoding 项目、作品详情模板。

5. `phase-05-photography.md`  
   Photography 页面、Masonry Gallery、Lightbox、图片切换。

6. `phase-06-contact-seo-polish.md`  
   Contact 页面、SEO、Loading、404、性能、响应式与上线验收。

## Global Acceptance

最终网站应满足：

- 招聘者能按 `Home -> Works -> Photography -> Contact` 顺畅浏览。
- 2-3 分钟内清晰理解 `Design / Build / Taste` 三个能力标签。
- 页面风格极简、现代、温暖、高级且克制。
- 内容可通过 MDX 和 TypeScript 数据文件长期维护。
- 不依赖后台、数据库或重型 UI 框架。
