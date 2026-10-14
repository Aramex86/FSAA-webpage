/**
 * FSAA docs site — static export.
 * output: 'export' produces ./out — deployable to GitHub Pages / Netlify / Cloudflare Pages
 * with a single command and no server runtime.
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  reactStrictMode: true,
  images: { unoptimized: true }
};

export default nextConfig;