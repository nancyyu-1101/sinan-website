export type ExperienceKind = "work" | "education";

export type ExperienceDetail = {
  label: string;
  value: string;
};

export type Experience = {
  id: string;
  kind: ExperienceKind;
  organization: string;
  organizationEn: string;
  department?: string;
  departmentEn?: string;
  role: string;
  roleEn: string;
  period: {
    start: string;
    end: string;
  };
  location?: string;
  locationEn?: string;
  summary: string;
  summaryEn: string;
  highlights: string[];
  details?: ExperienceDetail[];
  image?: {
    src: string;
    alt: string;
  };
};

export const experience: Experience[] = [
  {
    id: "hoto-ai-product-manager",
    kind: "work",
    organization: "HOTO 小猴科技",
    organizationEn: "HOTO",
    department: "创新产品部",
    departmentEn: "Innovation Product Department",
    role: "AI 产品经理",
    roleEn: "AI Product Manager Intern",
    period: { start: "03.2026", end: "06.2026" },
    summary:
      "面向海外消费市场，以 AI 工具重构用户研究与竞品分析流程，并参与软硬结合新品定义。",
    summaryEn:
      "Reworked user research and competitive analysis with AI tools for overseas consumer markets, while contributing to new hardware and software product definition.",
    highlights: [
      "参与搭建海外用户调研流程，完成问卷设计、用户筛选与深度访谈，并整理工具使用文档，帮助团队形成可复用的 AI 访谈方法。",
      "将访谈内容结构化整理并导入 AI 工具构建用户画像，通过模拟不同场景下的用户反馈，进一步提炼需求洞察与产品卖点。",
      "参与智能风扇灯的软件功能定义，设计 App 控制与灯光调节交互，制作高保真页面，并与研发沟通软硬件协同方案。",
    ],
  },
  {
    id: "panasonic-hardware-product-manager",
    kind: "work",
    organization: "松下电器中国",
    organizationEn: "Panasonic China",
    department: "东北亚设计中心",
    departmentEn: "Northeast Asia Design Center",
    role: "硬件产品经理",
    roleEn: "Hardware Product Manager Intern",
    period: { start: "07.2025", end: "01.2026" },
    summary:
      "负责智能投放洗衣机的前期需求定义、核心结构探索与操作面板交互方案。",
    summaryEn:
      "Defined early product requirements, explored dispensing structures, and designed the control-panel interaction for an automatic-dosing washing machine.",
    highlights: [
      "走访线下门店并体验多款智能投放洗衣机，从投放舱、操作面板和使用方式等角度开展竞品研究，梳理产品迭代方向。",
      "围绕洗涤剂投放体验设计多种投放舱结构，通过建模、样机制作与内部测试验证方案，协助团队完成方向选择。",
      "负责操作面板的功能梳理、区域划分与布局设计，并根据相关部门的反馈持续调整，最终形成可交付的设计方案。",
    ],
  },
  {
    id: "tongji-industrial-design",
    kind: "education",
    organization: "同济大学",
    organizationEn: "Tongji University",
    role: "工业设计 | 本科",
    roleEn: "Industrial Design | Bachelor's Degree",
    period: { start: "09.2021", end: "06.2026" },
    location: "上海，中国",
    locationEn: "Shanghai, China",
    summary: "专业绩点 4.37/5.0，年级前 3%。",
    summaryEn: "Major GPA 4.37/5.0, ranked in the top 3% of the cohort.",
    highlights: [],
    details: [
      { label: "专业绩点", value: "4.37 / 5.0，年级前 3%" },
      {
        label: "荣誉奖项",
        value:
          "优秀本科生奖学金、柏丽俞峰奖学金、交流奖学金",
      },
      {
        label: "主修课程",
        value:
          "服务体验设计、用户研究、设计思维、开源硬件与编程、Human-AI 协同设计、声音设计",
      },
      {
        label: "备注",
        value: "额外学习一年德语，获得德语六级证书（B1-B2 水平）",
      },
    ],
  },
  {
    id: "ensci-exchange",
    kind: "education",
    organization: "巴黎国立高等工业设计学校",
    organizationEn: "ENSCI - Les Ateliers",
    role: "工业设计 | 交换项目",
    roleEn: "Industrial Design | Exchange Program",
    period: { start: "09.2024", end: "02.2025" },
    location: "巴黎，法国",
    locationEn: "Paris, France",
    summary: "在跨文化设计环境中继续工业设计学习与实践。",
    summaryEn:
      "Continued industrial design study and practice in a cross-cultural studio environment.",
    highlights: [],
    details: [
      { label: "专业成绩", value: "A" },
      {
        label: "项目成果",
        value:
          "项目受到法国红十字会的高度认可，并于学校开放日公开展出，获得公众与专业人士关注。",
      },
      {
        label: "主修课程",
        value: "工业设计、声音设计、材料工艺工作坊（木材、玻璃、金属）",
      },
    ],
    image: {
      src: "/brand/profile/ensci-class.webp",
      alt: "ENSCI - Les Ateliers 师生在巴黎工作室内合影",
    },
  },
];

export const workExperience = experience.filter((item) => item.kind === "work");
export const educationExperience = experience.filter(
  (item) => item.kind === "education",
);
