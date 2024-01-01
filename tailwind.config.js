/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        lg2: '1056px',
      },
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          dark: 'var(--primary-dark)',
          light: 'var(--primary-light)',
        },
        danger: {
          DEFAULT: 'var(--danger)',
          dark: 'var(--danger-dark)',
        },
        base: {
          100: 'var(--base-100)',
          200: 'var(--base-200)',
          300: 'var(--base-300)',
          400: 'var(--base-400)',
          500: 'var(--base-500)',
          600: 'var(--base-600)',
          700: 'var(--base-700)',
          800: 'var(--base-800)',
          900: 'var(--base-900)',
        },
        yellow: {
          500: 'var(--yellow-500)',
        },
      },
    },
    fontFamily: {
      mono: ['Roboto Mono', 'monospace'],
    },
  },
  plugins: [],
}
