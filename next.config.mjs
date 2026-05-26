/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["better-sqlite3", "sqlite-vec"],
    serverActions: { bodySizeLimit: "25mb" },
  },
};

export default nextConfig;
