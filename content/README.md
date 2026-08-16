# Content maintenance

内容分为 works、photography 和 profile。新增内容时复制同目录示例文件，并保持 frontmatter 字段完整。

当前轻量解析器支持：

- 单行字符串，建议使用双引号。
- 数字与布尔值。
- JSON 形式的单行字符串数组，例如 ["产品设计", "研究"]。
- 正文中的二级、三级标题、段落、有序/无序列表、引用、链接与图片。
- 项目图片可使用标准 Markdown 图片语法，或使用带尺寸和图注的 WorkImage。

作品分类只允许 industrial-design 与 vibecoding。只有 status 为 published 的项目会出现在 Works 列表和静态详情路由中；placeholder 与 draft 不会公开。

## Work frontmatter

必填字段：

- title
- year
- category
- cover
- coverAlt
- tags
- summary
- order
- status

可选字段：

- subtitle
- role
- duration
- team
- externalUrl
- externalLabel
- githubUrl
- githubLabel
- videoUrl

缺少 Demo、GitHub 或视频链接时，对应入口会自动隐藏。

## Work detail structure

工业设计项目正文建议统一使用：

```mdx
## Problem

问题与设计目标。

## Process

研究、概念、造型、结构、CMF 与验证过程。

<WorkImage
  src="/works/project-slug/process-01.webp"
  alt="说明图片中可见的内容"
  width={2400}
  height={1600}
  caption="可选图注"
/>

## Prototype / Demo

最终方案、样机、场景或测试结果。

## Reflection

复盘、取舍与后续方向。
```

Overview 由 frontmatter 的 summary 自动生成，不需要在正文重复。图片请放入 public/works/<project-slug>/，文件名使用小写英文与连字符。
