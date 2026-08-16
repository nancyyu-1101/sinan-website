export type HeroStage = 1 | 2 | 3 | 4 | 5;

export type HeroBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type HeroLayerVisual = {
  bounds: HeroBounds;
  opacity: number;
  src: string;
};

export type HeroLayerTrack = {
  key: string;
  stage: Record<HeroStage, HeroLayerVisual>;
  zIndex: number;
};

export const HERO_FRAME_WIDTH = 2536;
export const HERO_FRAME_HEIGHT = 1398;

const fullFrame: HeroBounds = {
  x: 0,
  y: 0,
  width: HERO_FRAME_WIDTH,
  height: HERO_FRAME_HEIGHT,
};
const frameOneAvatar: HeroBounds = { x: 625, y: 184, width: 1286, height: 1000 };
const frameTwoAvatar: HeroBounds = { x: 486, y: 117, width: 1564.2, height: 1164.9 };

function fromInset(
  container: HeroBounds,
  [top, right, bottom, left]: [number, number, number, number],
): HeroBounds {
  return {
    x: container.x + container.width * (left / 100),
    y: container.y + container.height * (top / 100),
    width: container.width * ((100 - left - right) / 100),
    height: container.height * ((100 - top - bottom) / 100),
  };
}

function visual(bounds: HeroBounds, src: string, opacity = 1): HeroLayerVisual {
  return { bounds, opacity, src };
}

function hidden(base: HeroLayerVisual): HeroLayerVisual {
  return { ...base, opacity: 0 };
}

const asset = (frame: 1 | 2 | 3 | 4, file: string) =>
  `/brand/ip/hero-layers/frame-${frame}/${file}`;

const frameOne = {
  doodles: visual(fromInset(frameOneAvatar, [30.2, 13, 27.94, 13.92]), asset(1, "doodles.svg")),
  hatBase: visual(fromInset(frameOneAvatar, [10.54, 21.58, 44.03, 21.44]), asset(1, "hat-base.svg")),
  hatRibs: visual(fromInset(frameOneAvatar, [13.02, 24.14, 43.49, 24.47]), asset(1, "hat-ribs.svg")),
  hatFold: visual(fromInset(frameOneAvatar, [19.52, 25.04, 64.65, 23.56]), asset(1, "hat-fold.svg")),
  hairBack: visual(fromInset(frameOneAvatar, [40.05, 19.76, 11.64, 20.82]), asset(1, "hair-back.svg")),
  face: visual(fromInset(frameOneAvatar, [34.54, 26.44, 13.92, 26.3]), asset(1, "face.svg")),
  hairFront: visual(fromInset(frameOneAvatar, [28.5, 23.32, 28.39, 21.16]), asset(1, "hair-front.svg")),
  eyebrows: visual(fromInset(frameOneAvatar, [49.54, 36.78, 49.28, 34.53]), asset(1, "eyebrows.svg")),
  glasses: visual(fromInset(frameOneAvatar, [53.43, 27.5, 30.29, 27.43]), asset(1, "glasses.svg")),
  eyes: visual(fromInset(frameOneAvatar, [58.77, 37.76, 36.53, 38.12]), asset(1, "eyes.svg")),
  mouth: visual(fromInset(frameOneAvatar, [71.25, 47.89, 23.51, 48.03]), asset(1, "mouth.svg")),
};

const frameTwo = {
  doodles: visual(fromInset(frameTwoAvatar, [25.0456, 12.6514, 29.8341, 12.5177]), asset(2, "doodles.svg")),
  hatBase: visual(fromInset(frameTwoAvatar, [8.0564, 24.7889, 56.0324, 22.2047]), asset(2, "hat-base.svg")),
  hatRibs: visual(fromInset(frameTwoAvatar, [9.0545, 26.5793, 55.4008, 23.6622]), asset(2, "hat-ribs.svg")),
  hatFold: visual(fromInset(frameTwoAvatar, [12.7085, 29.377, 73.7423, 25.3443]), asset(2, "hat-fold.svg")),
  hairBack: visual(fromInset(frameTwoAvatar, [30.5606, 20.803, 5.3437, 19.7545]), asset(2, "hair-back.svg")),
  face: visual(fromInset(frameTwoAvatar, [25.9494, 26.2307, 9.132, 25.2461]), asset(2, "face.svg")),
  hairFront: visual(fromInset(frameTwoAvatar, [21.1177, 23.4113, 47.3775, 20.9692]), asset(2, "hair-front.svg")),
  glasses: visual(fromInset(frameTwoAvatar, [29.4446, 30.8311, 55.6639, 30.8145]), asset(2, "glasses.svg")),
  eyes: visual(fromInset(frameTwoAvatar, [34.6973, 38.8793, 61.6702, 38.9617]), asset(2, "eyes.svg")),
  mouth: visual(fromInset(frameTwoAvatar, [45.5833, 31.2748, 11.5705, 30.4309]), asset(2, "mouth-open.svg")),
};

const frameThree = {
  hairBack: visual(fromInset(fullFrame, [20.74, 23.54, 6.15, 23.46]), asset(2, "hair-back.svg")),

  hatBase: visual(fromInset(fullFrame, [5.51, 27.48, 61.86, 27.48]), asset(3, "hat-base.svg")),
  hatRibs: visual(fromInset(fullFrame, [6.45, 29.02, 61.22, 28.72]), asset(3, "hat-ribs.svg")),
  hatFold: visual(fromInset(fullFrame, [9.85, 31.3, 78.13, 30.14]), asset(3, "hat-fold.svg")),
  face: visual(fromInset(fullFrame, [11.09, 24.71, 11.06, 24.68]), asset(3, "face.svg")),
  mouth: visual(fromInset(fullFrame, [15.59, 27.41, 12.3, 27.56]), asset(3, "mouth-open.svg")),
  glasses: visual(fromInset(fullFrame, [8.3, 41.8, 82.77, 41.8]), asset(3, "glasses.svg")),
  eyes: visual(fromInset(fullFrame, [11.45, 45.06, 86.37, 45.1]), asset(3, "eyes.svg")),
};

const frameFourMouth = visual(
  { x: 368, y: 0, width: 1799, height: 1398 },
  asset(4, "mouth-window.svg"),
);

function track(
  key: string,
  zIndex: number,
  one: HeroLayerVisual,
  two: HeroLayerVisual,
  three: HeroLayerVisual,
  four = hidden(three),
  five = hidden(four),
): HeroLayerTrack {
  return { key, zIndex, stage: { 1: one, 2: two, 3: three, 4: four, 5: five } };
}

export const heroLayerTracks: HeroLayerTrack[] = [
  track("doodles", 1, frameOne.doodles, frameTwo.doodles, hidden(frameTwo.doodles)),
  track("hat-base", 2, frameOne.hatBase, frameTwo.hatBase, frameThree.hatBase, frameThree.hatBase),
  track("hat-ribs", 3, frameOne.hatRibs, frameTwo.hatRibs, frameThree.hatRibs, frameThree.hatRibs),
  track("hat-fold", 4, frameOne.hatFold, frameTwo.hatFold, frameThree.hatFold, frameThree.hatFold),
  track("hair-back", 5, frameOne.hairBack, frameTwo.hairBack, frameThree.hairBack, frameThree.hairBack),
  track("face", 6, frameOne.face, frameTwo.face, frameThree.face, frameThree.face),
  track("hair-front", 7, frameOne.hairFront, frameTwo.hairFront, hidden(frameTwo.hairFront)),
  track("eyebrows", 8, frameOne.eyebrows, hidden(frameOne.eyebrows), hidden(frameOne.eyebrows)),
  track("mouth", 9, frameOne.mouth, frameTwo.mouth, frameThree.mouth, frameFourMouth, frameFourMouth),
  track("glasses", 10, frameOne.glasses, frameTwo.glasses, frameThree.glasses, frameThree.glasses),
  track("eyes", 11, frameOne.eyes, frameTwo.eyes, frameThree.eyes, frameThree.eyes),
];