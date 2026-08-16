# Phase 03 Spec: Home

## Goal

完成网站最重要的叙事入口。Home 需要从个人 IP 形象开始，通过滚动逐步传达 `Design / Build / Taste`，让招聘者快速理解个人能力结构。

## Page Structure

Home 页面顺序：

1. Hero
2. Hero Scroll narrative
3. Personal Tags
4. Experience
5. Awards
6. About Me

## Hero Requirements

初始进入网站时：

- 页面中央只有个人 IP。
- 背景极简。
- 大量留白。
- 顶部 Navigation 隐藏。
- 左上角 Logo 保留。

## Hero Scroll Requirements

第一次滚动后：

- Navigation 滑入显示。
- 个人 IP 的嘴巴张开。
- 嘴巴成为展示窗口。
- 文案依次展示：

```text
Hi, I'm Sinan.
Industrial Designer.
Vibe Coder.
Creative Thinker.
```

实现原则：

- 动效使用 Framer Motion。
- 滚动状态可以使用 Framer Motion scroll hooks 或轻量自定义逻辑。
- 不使用 GSAP。
- 动效要自然、克制，避免高频晃动或复杂炫技。
- 如果最终 IP 资产还没有嘴巴分层，应先实现可替换的结构，并用占位形态演示窗口逻辑。

## Personal Tags

展示标签：

- Industrial Design
- AI
- Creative Coding
- Frontend
- Photography

要求：

- 标签有节奏地出现。
- 不做拥挤的胶囊堆叠。
- 移动端需要换行自然。

## Experience

展示字段：

- 公司
- 职位
- 时间
- 可选：地点、摘要

布局：

- 桌面端左右双栏。
- 移动端单列。
- 可使用 Scroll Reveal。

## Awards

采用 Award Card。

交互：

- Hover 轻微浮起。
- 点击展开详情。
- 支持键盘触发。
- 展开状态清晰，不造成布局剧烈跳动。

## About Me

采用 Icon + Text Grid。

示例条目：

- Industrial Design
- AI & Coding
- Photography
- Music
- Coffee
- Travel

要求：

- 使用 Lucide React 图标。
- 不使用过大的卡片堆叠。
- 文案简洁，有个人气质。

## Acceptance Criteria

- Home 首屏视觉聚焦个人 IP。
- 第一次滚动后导航显示。
- Hero 文案按滚动或顺序动效出现。
- Experience、Awards、About Me 都来自 `data/`。
- Award Card 可以展开和收起。
- 桌面端和移动端都无文字重叠、遮挡或明显跳动。
- 动效在减少动态偏好下应尽量降级为简单显隐。
