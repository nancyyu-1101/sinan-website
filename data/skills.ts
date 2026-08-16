export type SkillItem = {
  labelZh: string;
  labelEn: string;
  valueZh: string;
  valueEn: string;
};

export type SkillGroup = {
  id: string;
  summaryZh: string;
  titleZh: string;
  titleEn: string;
  items: SkillItem[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "professional-skills",
    summaryZh: "产品设计类（Figma、Adobe Suite、Rhino），硬件原型（Arduino、3D 打印），数据分析类（SQL、Excel）",
    titleZh: "专业技能",
    titleEn: "Professional Skills",
    items: [
      {
        labelZh: "产品设计",
        labelEn: "Product Design",
        valueZh: "Figma、Adobe Suite、Rhino",
        valueEn: "Figma, Adobe Suite, Rhino",
      },
      {
        labelZh: "硬件原型",
        labelEn: "Hardware Prototyping",
        valueZh: "Arduino、3D 打印",
        valueEn: "Arduino, 3D Printing",
      },
      {
        labelZh: "数据分析",
        labelEn: "Data Analysis",
        valueZh: "SQL、Excel",
        valueEn: "SQL, Excel",
      },
    ],
  },
  {
    id: "ai-tools",
    summaryZh: "编程类（Codex、Workbuddy、Claude Code）；设计类（Google Stitch、Figma Make、Happyhorse）；知识管理（Notion、Obsidian、NotebookLM）",
    titleZh: "AI 工具使用",
    titleEn: "AI Tools",
    items: [
      {
        labelZh: "编程",
        labelEn: "Coding",
        valueZh: "Codex、Workbuddy、Claude Code",
        valueEn: "Codex, Workbuddy, Claude Code",
      },
      {
        labelZh: "设计",
        labelEn: "Design",
        valueZh: "Google Stitch、Figma Make、Happyhorse",
        valueEn: "Google Stitch, Figma Make, Happyhorse",
      },
      {
        labelZh: "知识管理",
        labelEn: "Knowledge Management",
        valueZh: "Notion、Obsidian、NotebookLM",
        valueEn: "Notion, Obsidian, NotebookLM",
      },
    ],
  },
  {
    id: "languages",
    summaryZh: "英语（TOEFL 96）；德语（B2）；均能作为工作语言",
    titleZh: "语言能力",
    titleEn: "Languages",
    items: [
      {
        labelZh: "英语",
        labelEn: "English",
        valueZh: "TOEFL 96，可作为工作语言",
        valueEn: "TOEFL 96, working proficiency",
      },
      {
        labelZh: "德语",
        labelEn: "German",
        valueZh: "B2，可作为工作语言",
        valueEn: "B2, working proficiency",
      },
    ],
  },
  {
    id: "interests",
    summaryZh: "电影、音乐、游泳、滑板、剧本杀",
    titleZh: "兴趣",
    titleEn: "Interests",
    items: [
      {
        labelZh: "日常兴趣",
        labelEn: "Outside Work",
        valueZh: "电影、音乐、游泳、滑板、剧本杀",
        valueEn:
          "Film, Music, Swimming, Skateboarding, Murder Mystery Games",
      },
    ],
  },
];
