/** @type {import('next').NextConfig} */
const nextConfig = {
   //Feature 1: React strict mode
  reactStrictMode: true,

  //Feature 2: Image optimization domains
  images: {
    domains: ["images.unsplash.com", "cdn.pixabay.com"],
  },

  //Feature 3: Custom redirects for SEO and usability
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/", // Redirect /home → /
        permanent: true,  // 308 redirect
      },
      {
        source: "/old-blog/:slug",
        destination: "/blog/:slug", // Redirect old blog URLs
        permanent: true,
      },
    ];
  },

  //Feature 4: Public environment variables
  env: {
    NEXT_PUBLIC_API_URL: "https://api.example.com", // Accessible on frontend
    NEXT_PUBLIC_APP_VERSION: "1.0.0",
  },
};

export default nextConfig;
