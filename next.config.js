const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
};

module.exports = withContentlayer(nextConfig);

module.exports = {
  async redirects() {
    return [
      {
        source: '/tags/reading_diary',
        destination: '/tags/%E8%AA%AD%E6%9B%B8%E6%97%A5%E8%A8%98',
        permanent: true
      }
    ]
  }
}