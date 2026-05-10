/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#faf5ee',
        surface: '#ffffff',
        'surface-alt': '#f2ebe1',
        primary: '#c2652a',
        'primary-hover': '#a85522',
        tertiary: '#8c3c3c',
        success: '#2e7d32',
        danger: '#d32f2f',
        'warm-gray': '#d8d0c8',
        ink: {
          main: '#3a302a',
          muted: '#7a6a60'
        }
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        serif: ['"EB Garamond"', 'serif'],
      },
      boxShadow: {
        'soft': '0 2px 16px rgba(58, 48, 42, 0.04)',
        'soft-lg': '0 4px 24px rgba(58, 48, 42, 0.06)',
      },
      borderRadius: {
        DEFAULT: '8px',
        soft: '8px',
      }
    },
  },
  plugins: [],
};
