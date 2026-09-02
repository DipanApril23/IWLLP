import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Hero carousel images are hosted on Hostinger under public_html/images.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "innerworkadvisorsllp.com",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
