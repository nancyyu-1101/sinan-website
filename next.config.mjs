/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  images: {
    qualities: [75, 100],
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: false,
    workerThreads: true,
  },
  async headers() {
    return [
      {
        source: "/:asset(brand|works|photography|fonts)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
