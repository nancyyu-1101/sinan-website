# Phase 06 Spec: Contact, SEO & Polish

## Goal

完成联系页面、全站品牌收尾、SEO、性能和上线前质量检查，让网站可以正式用于简历投递。

## Contact Page

标题：

```text
Let's Create Something Together.
```

联系方式：

- Email
- WeChat
- GitHub
- LinkedIn
- Instagram

要求：

- Email 可点击打开邮件客户端。
- WeChat 点击显示二维码。
- GitHub、LinkedIn、Instagram 使用外链并在新标签页打开。
- 不存在或暂未提供的联系方式应隐藏或标为待补充，不显示空链接。
- 图标使用 Lucide React 或品牌一致的轻量方案。

## WeChat QR

- 二维码以弹窗或展开层显示。
- 支持关闭。
- 移动端尺寸合适。
- 如果真实二维码未提供，使用清晰占位并标注数据入口。

## Global Brand Polish

统一个人 IP 应用于：

- Hero
- Logo
- favicon
- Loading
- 404
- Footer 头像

要求：

- Loading 不应拖慢真实加载。
- 404 页面应简洁、有品牌感，并提供返回 Home。
- Footer 低调，不抢主体内容。

## SEO Requirements

使用 Next.js Metadata API。

需要配置：

- 首页 title / description。
- Works、Photography、Contact 页面 metadata。
- Open Graph。
- Twitter Card。
- favicon。
- robots。
- sitemap。

SEO 文案重点：

- Industrial Designer。
- AI / Vibecoding。
- Portfolio。
- Photography。
- Product Design。

## Analytics

接入 Vercel Analytics。

只用于：

- PV
- 来源
- 页面访问

不接入 Google Analytics。

## Performance & Accessibility

上线前检查：

- 图片使用 Next/Image。
- 首屏不加载过多大图。
- 交互元素有 focus 状态。
- Lightbox、二维码弹层支持键盘关闭。
- 页面文字在移动端不溢出。
- 减少动态偏好下动效不过度。
- 无明显 CLS 或首屏闪烁。

## Deployment

目标平台：Vercel。

要求：

- Git Push 可自动部署。
- Preview Deployment 可用于检查。
- 构建命令通过。
- 生产环境页面路由可访问。

## Acceptance Criteria

- Contact 页面所有已有联系方式可点击或可打开。
- WeChat 二维码交互可用。
- 404、Loading、Footer 都体现统一品牌。
- sitemap、robots、metadata、OG 图配置完成。
- Vercel Analytics 接入。
- 构建通过。
- 桌面端和移动端完成最终视觉检查。
