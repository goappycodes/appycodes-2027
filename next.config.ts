import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Canonical trailing-slash URLs, matching the existing appycodes.dev structure.
  trailingSlash: true,
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
