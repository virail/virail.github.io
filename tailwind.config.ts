import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        grey: "#3b3b3b",
        light: {
          grey: "#dbdbdb",
          white: "#f7f6ee",
        },
      },
      fontFamily: {
        serif: ["var(--font-dm-serif-text)"]
      },
      padding: {
        basic: "0.5rem 1rem",
      }
    },
  },
  plugins: [],
} satisfies Config;
