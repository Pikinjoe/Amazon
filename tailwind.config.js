/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./build/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  varients:{
    extend:{
      '@layer components': {
        '.is-editing-quantity .quantity-input': {
          display: 'flex'
        },
        '.is-editing-quantity .save-quantity-link': {
          display: 'flex'
        }
      },
    },
  },
  plugins: [],
}

