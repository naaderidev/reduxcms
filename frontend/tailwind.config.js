/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Lalezar: "Lalezar",
        VazirRegular: "Vazir Regular",
        VazirMedium: "Vazir Medium",
      },
      letterSpacing: {
        tightest: "-.065em",
      },
      boxShadow: {
        custom: "0px 1px 10px rgba(0, 0, 0, 0.05)",
      },
      backgroundImage: {
        "login-baner": "url('/src/assets/images/leaf.jpg')",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          lg: "0.625rem",
        },
      },
      screens: {
        xxs: "360px",
        xs: "480px",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "&>*");
      addVariant("child-hover", "&>*:hover");
    },
  ],
};
