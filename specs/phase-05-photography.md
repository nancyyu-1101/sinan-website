# Phase 05 Spec: Photography

## Goal

完成摄影作品展示页面，用图片表达审美、观察力和个人生活感，强化 `Taste` 标签。

## Page Header

顶部文案：

```text
PHOTOGRAPHY
Moments I captured while exploring the world.
```

要求：

- 标题有编辑感。
- 副标题克制。
- 不做复杂介绍区。

## Gallery Requirements

采用 Masonry Gallery。

展示类别：

- 城市
- 建筑
- 风景
- 街头
- 日落
- 飞机窗外
- 日常

图片要求：

- 使用 Next/Image。
- 需要 alt 文案。
- 支持懒加载。
- 保持不同图片比例，不强行裁成统一卡片。
- 图片之间间距克制，页面有呼吸感。

## Hover Interaction

- 图片 Hover 轻微放大。
- 可以降低图片亮度或显示简短地点信息。
- 不要出现大面积遮罩文案。

## Lightbox Requirements

点击图片进入 Lightbox。

Lightbox 支持：

- 查看大图。
- 左右切换。
- 关闭。
- 键盘 Esc 关闭。
- 键盘左右方向切换。
- 背景过渡自然。

移动端：

- Lightbox 图片不能超出屏幕。
- 关闭按钮易点击。
- 左右切换手势可作为增强项，不作为第一版硬要求。

## Data Requirements

摄影数据可以来自 MDX 或 TypeScript 元数据，但需要至少包含：

- src
- alt
- category
- location 或 caption
- width / height 或可推导比例
- order

## Acceptance Criteria

- Photography 页面能展示 Masonry 图片流。
- 点击任意图片可以打开 Lightbox。
- Lightbox 支持关闭、左右切换和键盘操作。
- 图片加载性能合理，页面不因图片尺寸跳动严重。
- 移动端浏览可用。
