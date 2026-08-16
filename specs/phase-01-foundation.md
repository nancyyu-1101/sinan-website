# Phase 01 Spec: Foundation

## Goal

建立可长期维护的 Next.js 作品集项目基础，让后续页面、内容和动效可以稳定扩展。

## Scope

本阶段完成：

- 初始化 Next.js App Router + TypeScript 项目。
- 配置 Tailwind CSS v4。
- 安装并接入 Framer Motion、Lenis、Lucide React。
- 建立基础目录结构。
- 建立全局布局、字体、基础 metadata。
- 建立固定 Navigation 和左上角 Logo 的代码入口。
- 建立页面路由占位：Home、Works、Photography、Contact、Works Detail。

## Required Structure

建议结构：

```text
app/
  layout.tsx
  page.tsx
  works/
    page.tsx
    [slug]/
      page.tsx
  photography/
    page.tsx
  contact/
    page.tsx
  not-found.tsx
components/
  layout/
  motion/
  ui/
content/
  works/
  photography/
  profile/
data/
lib/
public/
styles/
```

## Functional Requirements

- 全站使用 App Router。
- 全站 TypeScript，不使用 JavaScript 组件文件。
- 导航包含 `Home / Works / Photography / Contact`。
- 当前页面导航项要有高亮状态。
- Hover 下划线动效要预留。
- Home 首次进入时导航隐藏，第一次滚动后显示。此逻辑可以在本阶段先完成基础版本。
- Logo 组件始终位于左上角，点击返回 Home。
- 全局页面切换应预留 Fade 动效结构。
- Lenis 只负责平滑滚动，不承担叙事动画逻辑。

## Design Requirements

- 全局背景以 Warm White 为主。
- 字体使用 Inter / Geist 方向，保持现代、清晰。
- 不做装饰性渐变背景。
- 基础排版要有明显留白。
- 移动端导航要可用，不能遮挡主体内容。

## Non-Goals

本阶段不需要完成：

- 完整 Hero Scroll 叙事动画。
- 真实作品内容。
- Photography Lightbox。
- 完整 SEO 和部署配置。

## Acceptance Criteria

- 本地开发服务能启动。
- `Home / Works / Photography / Contact` 四个页面能访问。
- `/works/[slug]` 路由结构存在。
- 导航和 Logo 在各页面显示逻辑正确。
- Tailwind、Framer Motion、Lenis、Lucide React 可正常导入使用。
- TypeScript 检查和构建不报错。
