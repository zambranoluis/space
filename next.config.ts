import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['github.com'], // Agrega aquí los dominios permitidos
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
