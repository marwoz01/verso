import type { NextConfig } from "next";

import { DEFAULT_LOCALE } from "./src/lib/i18n";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: `/${DEFAULT_LOCALE}`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
