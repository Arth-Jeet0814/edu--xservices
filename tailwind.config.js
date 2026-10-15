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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
          soft: 'var(--primary-soft)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        crimson: {
          DEFAULT: 'var(--crimson)',
          foreground: 'var(--crimson-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        navy: {
          950: '#0B1E40', // Target footer / dark elements
          900: '#102A56',
          850: '#14346B',
          800: '#183F81', // --primary
          700: '#1E4E9E',
          600: '#2563EB',
          500: '#3B82F6',
          400: '#60A5FA',
          200: '#BFDBFE',
          100: '#E8EEF8', // --primary-soft
          50: '#F4F7FC',
        },
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#F59E0B', // --accent
          500: '#E68A00',
          600: '#C77300',
          700: '#92400E',
          800: '#78350F',
          900: '#451A03',
        },
        offwhite: '#F8FAFC',
        surface: '#FFFFFF',
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
        'card-hover': '0 18px 36px -12px oklch(34% 0.11 264 / 0.22)',
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
