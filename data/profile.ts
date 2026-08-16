export type ProfileTag = {
  label: string;
  tone: "professional" | "personal";
};

export type AboutItem = {
  icon: "product" | "industrial" | "build" | "culture";
  title: string;
  description: string;
};

export type PersonalIpAssets = {
  heroClosed: string;
  heroOpen: string;
  heroFrames: string[];
  logo: string;
  favicon: string;
  loading: string;
  notFound: string;
  footer: string;
};

export type Profile = {
  name: {
    zh: string;
    en: string;
  };
  role: string;
  hero: {
    eyebrow: string;
    title: string;
    introduction: string;
  };
  tags: ProfileTag[];
  about: AboutItem[];
  assets: {
    personalIp: PersonalIpAssets;
    personalIpAlt: string;
  };
};

export const profile: Profile = {
  name: {
    zh: "郁思南",
    en: "Yu Sinan",
  },
  role: "产品设计师 / 工业设计师",
  hero: {
    eyebrow: "Product & Industrial Designer",
    title: "把洞察变成可以被使用的产品。",
    introduction:
      "我在工业设计、产品策略和 AI 原型之间工作，让研究、交互与落地形成完整闭环。",
  },
  tags: [
    { label: "产品设计师", tone: "professional" },
    { label: "工业设计师", tone: "professional" },
    { label: "重度影迷", tone: "personal" },
    { label: "滑板混子", tone: "personal" },
  ],
  about: [
    {
      icon: "product",
      title: "Product Design",
      description:
        "从用户研究与需求定义出发，把复杂问题整理成清晰、可验证的产品路径。",
    },
    {
      icon: "industrial",
      title: "Industrial Design",
      description:
        "关注真实使用情境、结构原型与软硬件协同，让概念能够走向落地。",
    },
    {
      icon: "build",
      title: "AI & Coding",
      description:
        "用 AI、Vibecoding 和前端工具快速完成从需求到可用原型的验证。",
    },
    {
      icon: "culture",
      title: "Film & Skateboarding",
      description:
        "用电影训练叙事与观察，也在滑板的反复摔跤里保留一点不安分的好奇心。",
    },
  ],
  assets: {
    personalIp: {
      heroClosed: "/brand/ip/sinan-closed.webp",
      heroOpen: "/brand/ip/sinan-open.webp",
      heroFrames: [
        "/brand/ip/hero-sequence/hero-frame-01.webp",
        "/brand/ip/hero-sequence/hero-frame-02.webp",
        "/brand/ip/hero-sequence/hero-frame-03.webp",
        "/brand/ip/hero-sequence/hero-frame-04.webp",
        "/brand/ip/hero-sequence/hero-frame-05.webp",
      ],
      logo: "/brand/ip/sinan-logo-transparent.webp",
      favicon: "/brand/ip/sinan-favicon.png",
      loading: "/brand/ip/ip-placeholder.svg",
      notFound: "/brand/ip/ip-placeholder.svg",
      footer: "/brand/ip/ip-placeholder.svg",
    },
    personalIpAlt: "郁思南戴针织帽和墨镜的个人 IP 形象",
  },
};
