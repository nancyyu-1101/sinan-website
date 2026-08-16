# Phase 02 Spec: Brand & Content System

## Goal

建立统一品牌识别和内容维护系统，让后续页面不依赖硬编码内容，并为个人 IP 形象留好替换入口。

## Scope

本阶段完成：

- 品牌设计 token。
- 个人 IP 小人物资产入口。
- favicon、Loading、404、页脚头像的资产规划。
- `data/` 下的结构化数据。
- `content/` 下的 MDX 内容结构。
- 作品、摄影、个人资料的读取工具。

## Brand Requirements

品牌关键词：

- Minimal
- Editorial
- Premium
- Clean
- Warm White
- Motion Design

基础视觉建议：

- 背景：温暖白色或浅灰白。
- 文字：接近黑色，但避免纯黑过硬。
- 辅助文字：中性灰。
- 强调色：克制使用，不让页面变成单一色块主题。
- 圆角：克制，常规卡片不超过 8px，除非视觉上确有必要。

## Personal IP Requirements

个人 IP 小人物需要作为统一品牌元素，应用于：

- Hero 主视觉。
- 左上角 Logo。
- favicon。
- Loading。
- 404。
- Footer 头像。

如果真实 IP 图片暂未提供，应使用清晰的占位资产接口，不要把最终形象画死在组件逻辑里。

## Data Requirements

建立以下数据文件：

```text
data/
  awards.ts
  contact.ts
  experience.ts
  profile.ts
```

每个文件需要导出明确类型与数据。建议包含：

- `profile.ts`: 姓名、身份标签、Hero 文案、个人标签、About Me 条目。
- `experience.ts`: 公司、职位、时间、描述、地点。
- `awards.ts`: 奖项名称、年份、组织方、摘要、详情。
- `contact.ts`: Email、WeChat、GitHub、LinkedIn、Instagram。

## MDX Requirements

建立：

```text
content/
  works/
  photography/
  profile/
```

作品 MDX frontmatter 至少包含：

```yaml
title:
year:
category:
cover:
tags:
summary:
order:
```

Works category 只允许：

- `industrial-design`
- `vibecoding`

## Content Utilities

在 `lib/` 中建立内容读取工具，支持：

- 获取所有作品。
- 按 category 分组作品。
- 按 slug 获取作品详情。
- 获取摄影图片元数据。

## Non-Goals

本阶段不需要完成：

- 最终个人 IP 绘制。
- 最终真实作品文案。
- 完整页面视觉。

## Acceptance Criteria

- 数据文件类型清晰，页面可以直接引用。
- 至少有示例作品 MDX 文件用于验证读取链路。
- 内容读取工具能返回排序后的作品列表。
- 后续新增作品时，只需新增 MDX 与图片资源即可进入列表。
- 品牌 token 和个人 IP 资产入口已被全局布局或组件引用。
