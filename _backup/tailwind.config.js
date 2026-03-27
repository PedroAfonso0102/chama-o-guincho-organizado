/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./assets/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(25 95% 53%)", // #FF7A1A
          foreground: "hsl(0 0% 98%)",
        },
        secondary: {
          DEFAULT: "hsl(240 5.9% 10%)", // #18181B
          foreground: "hsl(0 0% 98%)",
        },
        background: "hsl(0 0% 100%)",
        foreground: "hsl(240 10% 3.9%)",
        muted: {
          DEFAULT: "hsl(240 4.8% 95.9%)",
          foreground: "hsl(240 3.8% 46.1%)",
        },
        success: {
          DEFAULT: "hsl(142 76% 36%)",
          foreground: "hsl(355 100% 97%)",
        },
        warning: {
          DEFAULT: "hsl(38 92% 50%)",
          foreground: "hsl(48 96% 89%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84.2% 60.2%)",
          foreground: "hsl(0 0% 98%)",
        },
        whatsapp: {
          DEFAULT: "hsl(142 70% 49%)",
          foreground: "hsl(0 0% 100%)",
        },
        card: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(240 10% 3.9%)",
        },
        border: "hsl(240 5.9% 90%)",
        input: "hsl(240 5.9% 90%)",
        ring: "hsl(25 95% 53%)",
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      boxShadow: {
        primary: "0 4px 14px 0 rgba(255, 122, 26, 0.39)",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#FF7A1A",
          secondary: "#18181B",
          accent: "#F4F4F5",
          neutral: "#18181B",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#16A34A",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
    ],
  },
};
