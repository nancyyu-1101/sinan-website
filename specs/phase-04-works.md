# Phase 04 Spec: Works

## Goal

完成作品展示主页面和统一详情页，让招聘者能快速扫描工业设计能力与 Vibecoding 落地能力。

## Works Page Structure

Works 页面采用 One Page Scroll 的连续浏览体验，不设置 Filter。页面自然分为两个区域：

1. `INDUSTRIAL DESIGN WORKS`
2. `VIBECODING PROJECTS`

## Work Item Layout

每个作品项：

左侧：

- 大图。

右侧：

- 编号。
- 标题。
- 一句简介。
- 年份。
- 进入详情入口。

要求：

- 桌面端左右布局，图片优先。
- 移动端图片在上、文字在下。
- 每个作品点击进入 `/works/[slug]`。
- 图片使用 Next/Image。
- Hover 可以轻微放大图片或显示进入状态，但不要过度动画。

## Industrial Design Works

展示工业设计作品。

内容重点：

- 设计问题。
- 造型与结构思考。
- 使用场景。
- 过程与结果。

## Vibecoding Projects

展示 Coding 项目。

每个项目支持：

- 在线 Demo。
- GitHub。
- 视频演示。

如果某个链接暂缺，应隐藏对应入口，不显示坏链接或空按钮。

## Works Detail Template

统一结构：

```text
Hero
Overview
Problem
Process
Prototype / Demo
Reflection
```

详情页要求：

- 从 MDX 读取正文。
- Hero 展示标题、年份、标签、封面图。
- Overview 清晰说明项目背景。
- Problem 呈现核心问题。
- Process 支持图片、段落、列表。
- Prototype / Demo 对 Vibecoding 项目应支持外链或嵌入视频入口。
- Reflection 体现设计复盘与思考。

## Routing Requirements

- `/works` 展示所有作品，按 category 分区。
- `/works/[slug]` 展示详情。
- 不存在的 slug 进入 404。

## Acceptance Criteria

- Works 页面没有 Filter，但两个作品区域分隔清楚。
- 工业设计与 Vibecoding 项目来自 MDX frontmatter。
- 每个作品能进入独立详情页。
- 详情页使用统一模板，不为每个项目硬编码页面。
- Demo、GitHub、视频链接按数据有无显示。
- 桌面端和移动端扫描路径清晰。
