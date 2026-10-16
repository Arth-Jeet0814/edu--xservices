/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--bg)',
        foreground: 'var(--text)',
        bg: 'var(--bg)',
        tint: 'var(--tint)',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        surface: 'var(--surface)',
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          foreground: 'var(--primary-foreground)',
          soft: 'var(--tint)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: '#dc2626',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--text-muted)',
        },
        accent: {
          DEFAULT: 'var(--primary-hover)',
          foreground: '#ffffff',
        },
        crimson: {
          DEFAULT: 'var(--primary)',
          foreground: '#ffffff',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        navy: {
          950: '#082f49',
          900: '#0c4a6e',
          850: '#0369a1',
          800: '#0369a1',
          700: '#0284c7',
          600: '#0ea5e9',
          500: '#38bdf8',
          400: '#7dd3fc',
          200: '#bae6fd',
          100: '#e0f2fe',
          50: '#f0f9ff',
        },
        gold: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#0ea5e9',
          500: '#0369a1',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#082f49',
        },
        offwhite: '#f0f9ff',
      },
      fontFamily: {
        sans: ['"Manrope"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Manrope"', 'system-ui', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', '"Manrope"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': 'var(--shadow-soft)',
        'card': 'var(--shadow-card)',
        'lift': 'var(--shadow-lift)',
        'card-hover': '0 18px 36px -12px rgba(8, 47, 73, 0.14)',
      },
      borderRadius: {
        'xl': 'calc(var(--radius) - 2px)',
        '2xl': 'var(--radius)',
        '3xl': 'calc(var(--radius) + 6px)',
        'card': 'var(--radius)',
      }
    },
  },
  plugins: [],
}
