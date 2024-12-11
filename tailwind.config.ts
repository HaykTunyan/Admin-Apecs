import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      letterSpacing: {
        wider: "0.02em", /* 0.2rem */
      },
      lineHeight: {
        "3.5": "14px" /* 14px */,
        "4.5": "18px" /*  18px */,
        "5.5": "22px" /* 22px */,
      },
      colors: {
        "default-primary": "#101828", // Colors/Text/text-primary (900),
        "grey-light": "#667085", //  Colors/Text/text-placeholder,
        "orange-innter": "#FFE2A1", //
        "grey-secondary": "#FFC107", // Colors/Text/text-secondary (700),
        "grey-light-700" : "#344054", // Colors/Text/text-secondary (700)
        "grey-light-500" : "#201F27",
        "grey-light-400" : "#2C2F3B",
        "grey-border": "#D0D5DD",
        "error-primary": "#D92D20",  // error primary
        "brand-secondary" : "#887344", // Colors/Text/text-brand-secondary (700)
        "utility-gray": "#F9FAFB", // Component colors/Utility/Gray/utility-gray-50
        "utility-gray-200" : "#EAECF0", //  Component colors/Utility/Gray/utility-gray-200
        "tertiary" : "#475467", // Colors/Text/text-tertiary (600)
        "default-secondary" : "#FCFCFD", // Colors/Background/bg-secondary_subtle
        "utility-success" : "#067647" , // Component colors/Utility/Success/utility-success-700
        "utility-success-200": "#ABEFC6", // Component colors/Utility/Success/utility-success-200,
        "utility-success-500": "#17B26A", // Component colors/Utility/Success/utility-success-500
        "utility-success-700": "#47CD89", // Component colors/Utility/

        "utility-blue-700" : "#175CD3", // Component colors/Utility/Blue/utility-blue-700
        "utility-blue-50": "#175CD3", // Component colors/Utility/Blue/utility-blue-50
        "utility-success-50": "#ECFDF3", //  Component colors/Utility/Success/utility-success-50
        "utility-pink-700": "#C11574", // Component colors/Utility/Pink/utility-pink-700
        "utility-pink-50": "#FDF2FA", // Component colors/Utility/Pink/utility-pink-50
        "utility-orange-700": "#B93815", //  Component colors/Utility/Orange/utility-orange-700
        "utility-orange-200": "#F9DBAF", // Component colors/Utility/Orange/utility-orange-200
        "utility-gray-700": "#344054", // Component colors/Utility/Gray/utility-gray-700
        "utility-indigo-700": "#3538CD", //  Component colors/Utility/Indigo/utility-indigo-700
        "utility-indigo-200": "#C7D7FE", // Component colors/Utility/Indigo/utility-indigo-200
        "utility-gray-blue-700": "#363F72", // Component colors/Utility/Gray blue/utility-gray-blue-700
        "utility-gray-blue-200": "#D5D9EB", // Component colors/Utility/Gray blue/utility-gray-blue-200
        "utility-blue-200": "#B2DDFF", // Component colors/Utility/Blue/utility-blue-200
        "utility-blue": "#EFF8FF", // Component colors/Utility/Blue/utility-blue-50
        "utility-brand-50": "#FFECC2", // Component colors/Utility/Brand/utility-brand-50
        "utility-brand-200": "#E8D4B1", //  Component colors/Utility/Brand/utility-brand-200
        "utility-gray-blue-50": "#F8F9FC", // Component colors/Utility/Gray blue/utility-gray-blue-50
        "utility-orange-50": "#FEF6EE", // Component colors/Utility/Orange/utility-orange-50
        "utility-pink-200": "#FCCEEE", // Component colors/Utility/Pink/utility-pink-200
        "fg-disabled": "#98A2B3", //  Colors/Foreground/fg-disabled
        "secondary-hover": "#182230", //  Colors/Text/text-secondary_hover
        "disabled-subtle": "#F2F4F7", // Colors/Border/border-disabled_subtle
        "brand-solid": "#A58C52", // Colors/Background/bg-brand-solid
        "error-secondary": "#FEE4E2", // Colors/Background/bg-error-secondary
        "border-brand": "#DEC7A1", //
        "foreground-brand-primary": "#C8AD80", //
        "": "", //
        "": "", //
        

        "sidebar": "#F1EEEA",
        "hover-sidebar": "#F5F4F2",
        "hover-payment": "#3363af",
        "main" : "#F1EEEA",
        "secondary": "#2d3748",
        "accent": "#4fd1c5",
        "green": "#5D977B",
        "orange": "#FF3F32",
        "default": "#2B2A28",
        "lable-title": "#1C1E1E",
        "gray-light": "#d3dce6",
        "grey-extra-light": "#E8E5E1",
        "grey-exrta-ligth-extra": "#F8F8F7",
        "green-extra-dark" : "#365848",
        "grey-tertiary": "#868583",
        "grey-seccondary": "#686765",
        "modal-backdrop": "rgba(0, 0, 0, .4)",
        "error": "#F60909",
        "info-badge-orange": "#FEDB90",
        "chart-orange": "#FFB109",
        "chart-percent": "#D9F1DA",
        "info-badge": "rgba(43, 42, 40, 0.08)",
        "red-dark": "#B31D14",
        "orange-extra-light": "#EBEEE2",
        "sidebar-info": "rgba(29, 33, 38, 0.08)",
        "gray-40": "rgb(102 102 102 / 40%);",
        "leverage-dark": "#604201",
        "green-check": "#02272B",
        "chart-blue" : "#054354",
        // Color  blue Wep
        "blue-wep-80": "#00255D",
        "blue-wep-60": "#1A76FF",
        "blue-wep-40" : "#079FFF",
        "blue-wep-10" : "#F1FAFF",
        // Color Green
        "green-80": "#422300",
        "green-60": "#FFBD3D",
        "green-40": "#FF8904",
        "green-10": "#FFFCF5",
        // Color Yellow
        "yellow-80": "#0B3D03",
        "yellow-60": "#119200",
        "yellow-40": "#65DB4",
        "yellow-10": "#F2FDEF",
        // Color Blue
        "blue-80": "#27163C",
        "blue-60": "#7835CF",
        "blue-50": "#BC6DFB",
        "blue-20": "#E2E8EE",
        "blue-10": "#FAF4FF",
        // Color others
        "green-success" : "#B3ADFF",
        "red-error" : "#B3ADFF",
        // Grey
        "grey-100": "#1D2126",
        "grey-80" : "#505459",
        "grey-60" : "#86898C",
        "grey-40" : "#BFBEBA",
        "grey-20" : "#E8E7E2",
        "grey-10" : "#F7F6F4",
        "grey-profile": "#ACABAA",
        "warning": "#B54708",
        // Scroll Color.
        scrollbar: '#EAECF0',
      },
      spacing: {
        "0.5" : "0.125rem", /* 2px */
        "0.75" : "0.188rem", /* 3px */
        "1.25" : "0.313rem", /* 5px */
        "1.5": "0.375rem", /* 6px */
        "2.5" : "0.625rem", /* 10px */
        "3.5" : "0.875rem" , /* 14px */
        "16": "4rem",  /* 64px */
        "18": "4.5rem",  /* 72px */
        "24": "6rem",  /* 96px */
        "23.5": "5.875rem", /* 94px */
        "132": "8.25rem", /* 132px  */
        "128": "32rem",   /* 512px */
        "144": "36rem",  /* 576px */
      },
      height: {
        "132": "8.25rem",
        "148" : "9.25rem",
        "286" : "17.875rem",
        "375" : "23.438rem",
        "390": "24.375rem",
      },
      fontSize: {
        "xxs" : "11px",
        "3.5xl": "32px",
        "3.8xl": "38px",
        "4xl": "40px",
      },
      fontFamily: {
        'relative-cy': ['Relative_CY', 'sans-serif'],
        'relative-faux': ['RelativeFaux', 'sans-serif'],
        'pp-monument': ['PPMonument', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
export default config;
