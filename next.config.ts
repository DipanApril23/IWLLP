import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Two directories on the Hostinger account, matching the two base URLs in
    // src/data/config/images.json: `images/` holds the photographs uploaded
    // for this rebuild, `static/media/` is what the original build left behind.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "innerworkadvisorsllp.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "innerworkadvisorsllp.com",
        pathname: "/static/media/**",
      },
    ],
  },
};

export default nextConfig;
