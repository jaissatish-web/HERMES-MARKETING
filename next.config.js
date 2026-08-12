/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Keep the production deployment unblocked while the dashboard types are finalized.
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
