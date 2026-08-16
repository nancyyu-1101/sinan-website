export type Award = {
  id: string;
  name: string;
  nameZh: string;
  year: number;
  organizer: string;
};

export const awards: Award[] = [
  {
    id: "if-design-award-2026",
    name: "iF Design Award, Design Concept",
    nameZh: "iF Design Award（设计概念奖）",
    year: 2026,
    organizer: "iF Design",
  },
  {
    id: "adventurex-hackathon-2026",
    name: "AdventureX 2026 Hackathon, 5th Place Globally in Track",
    nameZh: "AdventureX 2026 黑客松赛道全球第五名",
    year: 2026,
    organizer: "AdventureX",
  },
  {
    id: "london-design-awards-2025",
    name: "London Design Awards, Silver",
    nameZh: "伦敦设计大赛银奖",
    year: 2025,
    organizer: "London Design Awards",
  },
  {
    id: "hypak-design-award-2024",
    name: "Hypak Design Competition, Second Prize",
    nameZh: "Hypak™ Design 全国大学生设计大赛二等奖",
    year: 2024,
    organizer: "Hypak™ Design",
  },
];
