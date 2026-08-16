export const photographyLocations = [
  {
    id: "shanghai",
    nameZh: "上海",
    nameEn: "Shanghai",
    countryZh: "中国",
    countryEn: "China",
    order: 1,
  },
  {
    id: "hong-kong",
    nameZh: "香港",
    nameEn: "Hong Kong",
    countryZh: "中国",
    countryEn: "China",
    order: 2,
  },
  {
    id: "paris",
    nameZh: "巴黎",
    nameEn: "Paris",
    countryZh: "法国",
    countryEn: "France",
    order: 3,
  },
  {
    id: "berlin",
    nameZh: "柏林",
    nameEn: "Berlin",
    countryZh: "德国",
    countryEn: "Germany",
    order: 4,
  },
  {
    id: "amsterdam",
    nameZh: "阿姆斯特丹",
    nameEn: "Amsterdam",
    countryZh: "荷兰",
    countryEn: "The Netherlands",
    order: 5,
  },
  {
    id: "brussels",
    nameZh: "布鲁塞尔",
    nameEn: "Brussels",
    countryZh: "比利时",
    countryEn: "Belgium",
    order: 6,
  },
  {
    id: "dolomites",
    nameZh: "多洛米蒂",
    nameEn: "Dolomites",
    countryZh: "意大利",
    countryEn: "Italy",
    order: 7,
  },
] as const;

export type PhotographyLocation = (typeof photographyLocations)[number];
export type PhotographyLocationId = PhotographyLocation["id"];

const photographyLocationIds = new Set<string>(
  photographyLocations.map((location) => location.id),
);

export function isPhotographyLocationId(
  value: string,
): value is PhotographyLocationId {
  return photographyLocationIds.has(value);
}
