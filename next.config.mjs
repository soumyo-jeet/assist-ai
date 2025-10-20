/** @type {import('next').NextConfig} */
const nextConfig = {
//Enable React strict mode for highlighting potential issues
  reactStrictMode: true,

  //Allow optimized image loading from external domains
  images: {
    domains: ["images.unsplash.com", "cdn.pixabay.com"], 
  },
};
export default nextConfig;
