/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { esmExternals: "loose", serverActions: { allowedOrigins: ["curacorrosiva.com", "corrosivecure.com"] } },
  webpack: (config) => {
    config.module.rules.push({ test: /\.html$/, use: "raw-loader" });
    return config;
  },
};

export default nextConfig;
