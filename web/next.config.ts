import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
