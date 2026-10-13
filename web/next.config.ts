import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
  redirects() {
    return [
      // "Specialized Panels" was renamed "Practice Areas"; keep old links working.
      {
        source: "/dispute-resolution/panels/:slug*",
        destination: "/dispute-resolution/practice-areas/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
