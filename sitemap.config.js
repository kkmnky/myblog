module.exports = {
  siteUrl: "https://kmnky.dev",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/' ,
        disallow: '/_next/'
      }
    ],
  },
  sitemapSize: 7000,
  outDir: "./out",
};
