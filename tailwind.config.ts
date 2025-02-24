import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/feature/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          sm: "100%",
          md: "100%",
          lg: "100%",
          xl: "100%",
          xxl: "1680px",
        },
      },
      colors: {
        primary: "#1F90FF",
        text_shadow: "#A1A1A1",
        accent: "#31B3BA",
        secondary: "#0ACF83",
        title: "#290000",
        cardTitle: "#2B2B2B",
        subTitle: "#666666",
        bg_footer: "#090C1D",
        warning: "#F97066",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        dmSans: ["var(--font-dm-sans)", "sans-serif"],
        robotoFlex: ["var(--font-roboto-flex)", "sans-serif"],
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("tailwindcss-animate"),
    function ({ addComponents }: PluginAPI) {
      addComponents({
        ".section-gap": {
          paddingTop: "2rem", // Default padding for all screen sizes
          paddingBottom: "2rem", // Default padding for all screen sizes

          // For small screens (sm)
          "@screen sm": {
            paddingTop: "2rem", // Adjust padding for small screens
            paddingBottom: "2rem",
          },

          // For medium screens (md)
          "@screen md": {
            paddingTop: "3rem", // Adjust padding for medium screens
            paddingBottom: "3rem",
          },

          // For large screens (lg)
          "@screen lg": {
            paddingTop: "4rem", // Adjust padding for large screens
            paddingBottom: "4rem",
          },

          // For extra-large screens (xl)
          "@screen xl": {
            paddingTop: "5rem", // Adjust padding for extra-large screens
            paddingBottom: "5rem",
          },
          "@screen 2xl": {
            paddingTop: "6rem", // Adjust padding for extra-large screens
            paddingBottom: "6rem",
          },
        },
        ".container": {
          paddingLeft: "1rem", // Default horizontal padding
          paddingRight: "1rem",

          // For small screens (sm)
          "@screen sm": {
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
          },

          // For medium screens (md)
          "@screen md": {
            paddingLeft: "2rem",
            paddingRight: "2rem",
          },

          // For large screens (lg)
          "@screen lg": {
            paddingLeft: "2rem",
            paddingRight: "2rem",
          },

          // For extra-large screens (xl)
          "@screen xl": {
            paddingLeft: "120px",
            paddingRight: "120px",
          },
          "@screen 2xl": {
            paddingLeft: "4px",
            paddingRight: "4px",
          },
        },
        ".dashboard-containers": {
          maxWidth: "100%", // Default for all screen sizes
          paddingTop: "4rem", // Default padding for all screen sizes
          paddingBottom: "2rem", // Default padding for all screen sizes
          paddingRight: "1rem", // Default padding for all screen sizes
          paddingLeft: "1rem", // Default padding for all screen sizes
          margin: "0 auto", // Center the container

          // For small screens (sm)
          "@screen sm": {
            maxWidth: "100%", // Full width
            padding: "4rem", // Adjust padding for small screens
          },

          // For medium screens (md)
          "@screen md": {
            maxWidth: "100%", // Medium screen container width
            padding: "2rem", // Adjust padding for medium screens
          },

          // For large screens (lg)
          "@screen lg": {
            maxWidth: "100%", // Larger screen container width
            padding: "3rem",
          },

          // For extra-large screens (xl)
          "@screen xl": {
            maxWidth: "100%", // Maximum width for the container on extra-large screens
            padding: "4rem",
          },
        },
      });
    },
  ],
};
export default config;
