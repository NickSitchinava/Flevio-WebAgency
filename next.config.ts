import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return ["/images/:path*", "/videos/:path*"].map((source) => ({
      source,
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=3600, stale-while-revalidate=86400",
        },
      ],
    }));
  },
};

export default nextConfig;
