import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const eslintConfig = [
  { ignores: [".next-dev/**", ".pip-temp/**", ".video-tools/**", ".video-frames/**"] },
  ...nextVitals,
  ...nextTypeScript,
];

export default eslintConfig;
