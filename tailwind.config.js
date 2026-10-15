/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#07152B', // Deep Oxford Navy
          900: '#0B2044', // Royal Oxford Blue
          850: '#102E62', // Stately Royal Blue
          800: '#173D82', // Commanding Sapphire
          700: '#1D4ED8', // Vibrant Institutional Blue
          600: '#2563EB', // Cobalt Blue
          500: '#3B82F6',
          400: '#60A5FA',
          200: '#BFDBFE',
          100: '#DBEAFE', // Soft Ice Blue
          50: '#EFF6FF',  // Crisp Oxford Ice
        },
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#F59E0B', // Warm Cambridge Amber
          500: '#D97706', // Refined Royal Institutional Gold
          600: '#B45309',
          700: '#92400E',
          800: '#78350F',
          900: '#451A03',
        },
        offwhite: '#F8FAFC',
        surface: '#FFFFFF',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(7, 21, 43, 0.05), 0 1px 2px -1px rgba(7, 21, 43, 0.03)',
        'card': '0 8px 24px -4px rgba(7, 21, 43, 0.07), 0 4px 8px -4px rgba(7, 21, 43, 0.03)',
        'card-hover': '0 16px 32px -8px rgba(7, 21, 43, 0.12), 0 8px 16px -6px rgba(7, 21, 43, 0.04)',
        'gold-glow': '0 0 20px rgba(217, 119, 6, 0.25)',
      },
      borderRadius: {
        'card': '12px',
      }
    },
  },
  plugins: [],
}
