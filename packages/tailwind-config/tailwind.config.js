/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    // packages content
    "../../packages/**/*{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blurple: "#7289DA",
        "dark-not-black": "#202225",
        "not-quite-black": "#2F3136",
        "not-dark-gray": "#36393F",
        "quite-light-gray": "#40444B",
        crimson: "#DC143C",
        "dark-salmon": "#E9967A",
        "light-coral": "#F08080",
        pink: "	#FFC0CB",
        "hot-pink": "#FF69B4",
        "deep-pink": "#FF1493",
        tomato: "#FF6347",
        gold: "#FFD700",
        lemonchiffon: "#FFFACD",
        papayawhip: "#FFEFD5",
        moccasin: "#FFE4B5",
        darkkhaki: "#BDB76B",
        violet: "#EE82EE",
        mediumorchid: "#BA55D3",
        indigo: "#4B0082",
        slateblue: "#6A5ACD",
        chartreuse: "#7FFF00",
        seagreen: "#2E8B57",
        aqua: "#00FFFF",
        steelblue: "#4682B4",
        maroon: "#800000",
        teal: "#008080",
        "midnight-blue": "#191970",
        chocolate: "#D2691E",
      },
    },
  },
  plugins: [],
};
