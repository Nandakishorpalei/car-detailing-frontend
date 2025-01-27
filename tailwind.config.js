/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      spacing: {
        header: "55px",
      },
      gridTemplateColumns: {
        book: "1fr 2fr",
      },
      dropShadow: {
        bubble: "0px 8px 20px rgba(45, 18, 133, 0.2)",
        toggle:
          "0px 3px 1px rgba(0, 0, 0, 0.06), 0px 2.4px 6.4px rgba(0, 0, 0, 0.15)",
        dropdown: "0px 0px 12px rgba(0, 0, 0, 0.08)",
        drawer: "0px -4px 12px rgba(206, 206, 206, 0.25)",
        button: "0px 1px 1px rgba(0, 0, 0, 0.09)",
        tab: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        card: "0px 4px 12px rgba(51, 51, 51, 0.08)",
        "text-shadow": "0px 4px 4px rgba(0, 0, 0, 0.25)",
        "i-dropdown": "0px 2px 4px rgba(0, 0, 0, 0.08)",
      },
      keyframes: {
        "spin-forward": {
          from: { transform: "rotate(0deg);" },
          to: { transform: "rotate(-360deg)" },
        },
        "bounce-transform": {
          "0%, 100%": {
            transform: "translate(-50%, -25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translate(-50%, 0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        accordianSlideDown: {
          from: {
            height: 0,
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        accordianSlideUp: {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: 0,
          },
        },
      },
      animation: {
        "spin-forward": "spin-forward 1s linear infinite",
        "bounce-faster": "bounce-transform .7s infinite",
      },
      boxShadow: {
        "calendar-questions":
          "0px 22px 24px rgba(239, 239, 253, 0.32), 0px 9px 22px rgba(228, 228, 234, 0.22)",
        "top-shadow": "0px 0px 12px 0px rgba(51, 51, 51, 0.08)",
        card: "0px 4px 12px rgba(51, 51, 51, 0.08)",
        "hover-card-shadow": "0px 4px 16px rgba(0, 0, 0, 0.2)",
        "box-shadow": "0px 4px 12px rgba(51, 51, 51, 0.08)",
        "i-card": "0px 2px 4px rgba(0, 0, 0, 0.1)",
        "active-tab": "0px 5px 10px rgba(0, 0, 0, 0.1)",
        "task-templates": "0px 4px 10px rgba(41, 3, 70, 0.06)",
        "table-shodow": "0px 2px 8px rgba(19, 4, 64, 0.05)",
        "map-shadow": "0px 4px 4px 0px rgba(17, 7, 51, 0.04);",
        "entity-card": "0px 1px 12px 0px rgba(174, 147, 255, 0.05);",
        "tasks-slider-bottom": "0px 0px 5px 0px rgba(51, 51, 51, 0.10);",
      },
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(107.2deg, #B9BEF5 0%, #DEDFEC 32.81%, #EAE0D5 67.19%, #F2CFC8 100%)",
        "overlay-buttons":
          "linear-gradient(360deg, #5622FF -31.43%, rgba(0, 0, 0, 0) 100%)",
        "tp-gradient":
          "linear-gradient(212.74deg, #E0D7FF -35.11%, #E4D7FF 28.57%, #FFEED5 103.38%, #FFEED0 187.19%)",
        "credit-gradient":
          "linear-gradient(104.27deg, #734BF7 0.01%, #3A1D99 100%);",
        "pre-incorp-gradient":
          "linear-gradient(135deg, #F7F4FF 0%, #F7F4FF 0.01%, #C3B0FD 100%)",
        "aggregate-account":
          "linear-gradient(120deg, rgba(238, 233, 255, 0.54) 0%, rgba(187, 167, 255, 0.82) 100%)",

        "image-preview-overlay":
          "linear-gradient(180deg, #110733 0%, rgba(17, 7, 51, 0.90) 11.46%, rgba(17, 7, 51, 0.50) 35.42%, rgba(17, 7, 51, 0.35) 100%)",
      },
      screens: { sm: { max: "640px" } },
      minWidth: ({ theme }) => ({
        ...theme("spacing"),
      }),
      maxWidth: ({ theme }) => ({
        ...theme("spacing"),
      }),
      minHeight: ({ theme }) => ({
        ...theme("spacing"),
      }),
      maxHeight: ({ theme }) => ({
        ...theme("spacing"),
      }),
      zIndex: {
        header: 700,
        sidebar: 800,
        "sidebar-arrow": 810,
        overlay: 1100,
        modal: 1150,
        dropdown: 1160,
        toast: 1170,
        tooltip: 1180,
      },
    },
    colors: {
      i: {
        surface: {
          "light-purple": "#F0F0FE",
          grey: "#F2F2F5",
        },
        text: {
          light: "#808099",
          dark: "#030334",
          purple: "#6868F7",
        },
        neutral: {
          70: "#4D4D5C",
          50: "#808099",
          10: "#E6E6EB",
        },
        primary: {
          20: "#D2D2FD",
          100: "#030334",
        },
        green: { 50: "#5E9E70" },
        red: { 50: "#BD5959" },
      },
      surface: {
        DEFAULT: "#FFFFFF",
        purple: "#F7F4FF",
        grey: "#F3F3F5",
        "lighter-grey": "#FAFAFB",
        transparent: "transparent",
        btnColor: "#156f5b",
        background: "#f3f8f9",
        pageTitle: "#212121",
        navbarText: "#424242",
        pageText: "#6b6b6b",
        customerFeedbackName: "#f4c67f",
      },
      text: {
        DEFAULT: "#FFFFFF",
        black: "#000000",
        100: "#110733",
        60: "#41395C",
        30: "#706A85",
      },
      white: "#ffffff",
      neutral: {
        100: "#110730",
        90: "#292047",
        80: "#41395C",
        70: "#585170",
        DEFAULT: "#706A85",
        50: "#888399",
        40: "#A09CAD",
        30: "#B8B5C2",
        20: "#CFCDD6",
        10: "#E7E6EB",
        0: "#F3F3F5",
      },
      red: {
        100: "#340B32",
        90: "#570F31",
        80: "#791231",
        70: "#9C1630",
        DEFAULT: "#BF1A2F",
        50: "#CC4859",
        40: "#D97682",
        30: "#E5A3AC",
        20: "#F2D1D5",
        10: "#F9E8EA",
      },
      orange: {
        100: "#3E252C",
        90: "#6B4326",
        80: "#99601F",
        70: "#C67E19",
        DEFAULT: "#F39C12",
        50: "#F5B041",
        40: "#F8C471",
        30: "#FAD7A0",
        20: "#FDEBD0",
        10: "#FEF5E7",
      },
      yellow: {
        100: "#412E29",
        90: "#70561F",
        80: "#A07D14",
        70: "#CFA50A",
        DEFAULT: "#FFCC00",
        50: "#FFD633",
        40: "#FFE066",
        30: "#FFEB99",
        20: "#FFF5CC",
        10: "#FFFAE5",
      },
      dark_green: {
        100: "#152035",
        90: "#193938",
        80: "#1C523A",
        70: "#206B3D",
        DEFAULT: "#24843F",
        50: "#509D65",
        40: "#7CB58C",
        30: "#A7CEB2",
        20: "#D3E6D9",
        10: "#E9F3EC",
      },
      blue: {
        100: "#182455",
        90: "#1F4176",
        80: "#265E98",
        70: "#2D7BB9",
        DEFAULT: "#3498DB",
        50: "#5DADE2",
        40: "#85C1E9",
        30: "#AED6F1",
        20: "#D6EAF8",
        10: "#EBF5FB",
        0: "#F5FAFD",
      },
      green: {
        100: "#273040",
        90: "#3C5A4D",
        80: "#52835A",
        70: "#67AD67",
        DEFAULT: "#7DD674",
        50: "#97DE90",
        40: "#B1E6AC",
        30: "#CBEFC7",
        20: "#E5F7E3",
        10: "#F2FBF1",
      },
      pink: {
        100: "#3C1945",
        90: "#682C57",
        80: "#933E68",
        70: "#BF517A",
        DEFAULT: "#EA638C",
        50: "#EE82A3",
        40: "#F2A1BA",
        30: "#F7C1D1",
        20: "#FBE0E8",
        10: "#FDEFF3",
      },
      purple: {
        100: "#1F0C5C",
        90: "#2D1285",
        80: "#3A17AD",
        70: "#481DD6",
        DEFAULT: "#5622FF",
        50: "#784EFF",
        40: "#9A7AFF",
        30: "#BBA7FF",
        20: "#DDD3FF",
        10: "#EEE9FF",
        0: "#F7F4FF",
      },
    },
    fontFamily: {
      sans: ["Be Vietnam Pro", "sans-serif"],
    },
    fontSize: {
      h1: [
        "3.75rem",
        {
          fontWeight: 300,
          letterSpacing: "-0.5px",
        },
      ],
      h2: [
        "3rem",
        {
          fontWeight: 400,
          letterSpacing: "0px",
        },
      ],
      h3: [
        "2.125rem",
        {
          fontWeight: 400,
          letterSpacing: "0.25px",
        },
      ],
      h4: [
        "1.375rem",
        {
          fontWeight: 700,
          letterSpacing: "0px",
        },
      ],
      h5: [
        "1.25rem",
        {
          fontWeight: 600,
          letterSpacing: "0.15",
        },
      ],
      // Same as h5, kept here for legacy purpose
      h6: [
        "1.25rem",
        {
          fontWeight: 600,
          letterSpacing: "0.15px",
        },
      ],
      subtitle: [
        "1rem",
        {
          fontWeight: 600,
          letterSpacing: "0.15px",
        },
      ],
      "subtitle-sm": [
        "0.875rem",
        {
          fontWeight: 600,
          letterSpacing: "0.1px",
        },
      ],
      subtext: [
        "0.875rem",
        {
          fontWeight: 500,
          letterSpacing: "0.1px",
        },
      ],
      "subtext-sm": [
        "0.75rem",
        {
          fontWeight: 500,
          letterSpacing: "0.1px",
        },
      ],
      "body-lg": [
        "1rem",
        {
          fontWeight: 400,
          letterSpacing: "0.5px",
        },
      ],
      body: [
        "0.875rem",
        {
          fontWeight: 400,
          letterSpacing: "0.25px",
        },
      ],
      "body-sm": [
        "0.75rem",
        {
          fontWeight: 400,
          letterSpacing: "0.25px",
        },
      ],
      button: [
        "0.875rem",
        {
          fontWeight: 400,
          letterSpacing: "0.4px",
        },
      ],
      // Same as body-sm, kept here for legacy purpose
      caption: [
        "0.75rem",
        {
          fontWeight: 400,
          letterSpacing: "0.25px",
        },
      ],
      overline: [
        "0.625rem",
        {
          fontWeight: 400,
          letterSpacing: "1.5px",
        },
      ],
    },
  },
  plugins: [],
};
