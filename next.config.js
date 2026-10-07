const { PHASE_PRODUCTION_BUILD } = require("next/constants");

/** @type {(phase: string) => import('next').NextConfig} */
const nextConfig = (phase) => ({
  output: "export",
  // Cloudflare Pages expects the static output in this directory
  ...(phase === PHASE_PRODUCTION_BUILD && { distDir: ".vercel/output/static" }),
});

module.exports = nextConfig;
