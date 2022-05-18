// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: { domains: ["res.cloudinary.com"] },
//   publicRuntimeConfig: process.env.API_URL || "http://localhost:1337",
// };

// module.exports = nextConfig;

// module.exports = {
//   serverRuntimeConfig: {
//     apiUrl: process.env.DOCKER_API_URL, // http://your-strapi-docker-container-name:1337
//   },
//   publicRuntimeConfig: {
//     apiUrl: process.env.CLIENT_API_URL, // http://localhost:1337
//   },
// };
// Git original strapi 3
module.exports = {
  images: {
    domains: ["res.cloudinary.com"],
  },
};
