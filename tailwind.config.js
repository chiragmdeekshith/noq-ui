module.exports = {
  content: [
    "./src/**/*.{html,ts}", 
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {},
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    }
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ]
}