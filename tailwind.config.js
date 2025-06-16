/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2E7D32',
        secondary: '#F57C00',
        accent: '#1976D2',
        surface: '#FFFFFF',
        background: '#FFF8E1',
        success: '#43A047',
        warning: '#FFA726',
        error: '#E53935',
        info: '#29B6F6',
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        }
      },
      fontFamily: {
        'display': ['Fredoka One', 'cursive'],
        'body': ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '18px',
        'lg': '20px',
        'xl': '24px',
        '2xl': '30px',
        '3xl': '36px',
        '4xl': '48px',
        '5xl': '60px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'card': '0 8px 16px rgba(0, 0, 0, 0.1)',
        'elevated': '0 12px 24px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounce 1s infinite',
      }
    },
  },
  plugins: [],
}