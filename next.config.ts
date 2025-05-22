import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['food-order-api.test'], // Allow images from this domain
  },
};

export default withFlowbiteReact(nextConfig);