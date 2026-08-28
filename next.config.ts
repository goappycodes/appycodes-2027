import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Canonical trailing-slash URLs, matching the existing appycodes.dev structure.
  trailingSlash: true,
  turbopack: {
    root: import.meta.dirname,
  },
  // The reviews page has been superseded by the fuller /testimonials wall of
  // verified Clutch reviews. Keep the old URL working and pass its authority on.
  async redirects() {
    return [
      { source: "/reviews", destination: "/testimonials", permanent: true },
      { source: "/reviews/", destination: "/testimonials/", permanent: true },
    ];
  },
};

export default nextConfig;
