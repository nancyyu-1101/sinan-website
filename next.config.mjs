/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  images: {
    qualities: [75, 100],
    unoptimized: process.env.NODE_ENV === "development",
  },
  experimental: {
    webpackBuildWorker: false,
    workerThreads: true,
  },
};

export default nextConfig;
