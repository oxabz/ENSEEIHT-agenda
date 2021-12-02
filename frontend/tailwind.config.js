module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
  // daisyui: {
  //   themes: [
  //     {
  //       'mytheme': {
  //         'google-blue': '#4285f4',
  //         'button-active-blue': '#1669F2',
  //       },
  //     },
  //   ],
  // },
}
