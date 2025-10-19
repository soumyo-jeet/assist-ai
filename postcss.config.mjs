import autoprefixer from "autoprefixer";

const config = {
  plugins: ["@tailwindcss/postcss",
  autoprefixer(),         //New Feature: Automatically add vendor prefixes
  ],
};

export default config;
