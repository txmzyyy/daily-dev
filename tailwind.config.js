import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#09090b',
          card: '#18181b',
          border: '#27272a',
          accent: '#6366f1',
          emerald: '#10b981'
        }
      }
    },
  },
  plugins: [typography],
}