export type PhotographyGalleryItem = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  order: number;
};

export type PhotographyGroup = {
  id: string;
  location: string;
  date: string;
  layout:
    | "center-single"
    | "left-single"
    | "right-single"
    | "left-pair"
    | "right-pair";
  imageIds: string[];
  order: number;
};

export const photographyGallery: PhotographyGalleryItem[] = [
  {
    id: "paris-2024-10",
    src: "/photography/paris-2024-10.jpg",
    alt: "巴黎杜乐丽花园水池与远处的埃菲尔铁塔",
    width: 1600,
    height: 2400,
    order: 1,
  },
  {
    id: "paris-2024-11",
    src: "/photography/paris-2024-11.jpg",
    alt: "巴黎建筑屋顶的蓝色通风管道",
    width: 2400,
    height: 1600,
    order: 2,
  },
  {
    id: "etretat-2024-10-01",
    src: "/photography/etretat-2024-10-01.jpg",
    alt: "夕阳映照下的埃特勒塔海蚀拱门",
    width: 1600,
    height: 2400,
    order: 3,
  },
  {
    id: "etretat-2024-10-02",
    src: "/photography/etretat-2024-10-02.jpg",
    alt: "俯瞰埃特勒塔海面与悬崖",
    width: 1600,
    height: 2400,
    order: 4,
  },
  {
    id: "amsterdam-2024-12-01",
    src: "/photography/amsterdam-2024-12-01.jpg",
    alt: "阿姆斯特丹室内灯光下的粉色与紫色花束",
    width: 1600,
    height: 2400,
    order: 5,
  },
  {
    id: "amsterdam-2024-12-02",
    src: "/photography/amsterdam-2024-12-02.jpg",
    alt: "阿姆斯特丹夜色中映在水面的红色霓虹灯",
    width: 1600,
    height: 2400,
    order: 6,
  },
  {
    id: "dolomites-2025-01",
    src: "/photography/dolomites-2025-01.jpg",
    alt: "多洛米蒂冬季雪山与晴朗蓝天",
    width: 2400,
    height: 1600,
    order: 7,
  },
  {
    id: "berlin-2025-02-01",
    src: "/photography/berlin-2025-02-01.jpg",
    alt: "柏林混凝土建筑内部的天窗与楼梯",
    width: 1600,
    height: 2400,
    order: 8,
  },
  {
    id: "berlin-2025-02-02",
    src: "/photography/berlin-2025-02-02.jpg",
    alt: "柏林城市建筑与混凝土立柱",
    width: 1600,
    height: 2400,
    order: 9,
  },
  {
    id: "tokyo-2025-06-01",
    src: "/photography/tokyo-2025-06-01.jpg",
    alt: "东京傍晚天空下的绿色紧急出口标志",
    width: 1600,
    height: 2400,
    order: 10,
  },
  {
    id: "tokyo-2025-06-02",
    src: "/photography/tokyo-2025-06-02.jpg",
    alt: "东京夜色中亮起橙色灯光的东京塔",
    width: 1600,
    height: 2400,
    order: 11,
  },
];

export const photographyGroups: PhotographyGroup[] = [
  {
    id: "paris-october",
    location: "巴黎",
    date: "2024.10",
    layout: "center-single",
    imageIds: ["paris-2024-10"],
    order: 1,
  },
  {
    id: "paris-november",
    location: "巴黎",
    date: "2024.11",
    layout: "left-single",
    imageIds: ["paris-2024-11"],
    order: 2,
  },
  {
    id: "etretat-october",
    location: "埃特勒塔",
    date: "2024.10",
    layout: "right-pair",
    imageIds: ["etretat-2024-10-01", "etretat-2024-10-02"],
    order: 3,
  },
  {
    id: "amsterdam-december",
    location: "阿姆斯特丹",
    date: "2024.12",
    layout: "left-pair",
    imageIds: ["amsterdam-2024-12-01", "amsterdam-2024-12-02"],
    order: 4,
  },
  {
    id: "dolomites-january",
    location: "多洛米蒂",
    date: "2025.01",
    layout: "right-single",
    imageIds: ["dolomites-2025-01"],
    order: 5,
  },
  {
    id: "berlin-february",
    location: "柏林",
    date: "2025.02",
    layout: "left-pair",
    imageIds: ["berlin-2025-02-01", "berlin-2025-02-02"],
    order: 6,
  },
  {
    id: "tokyo-june",
    location: "东京",
    date: "2025.06",
    layout: "right-pair",
    imageIds: ["tokyo-2025-06-01", "tokyo-2025-06-02"],
    order: 7,
  },
];
