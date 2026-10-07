/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#F8FAFC', // soft cool off-white background
          900: '#F8FAFC', // main surface background
          850: '#F1F5F9', // subtle tonal surface
          800: '#FFFFFF', // clean white cards
          750: '#F8FAFC', // hover state
          700: '#E2E8F0', // thin neutral border
          600: '#CBD5E1', // stronger border
          500: '#94A3B8', // placeholder / muted
        },
        brand: {
          blue: '#2563EB',       // Confident Professional Blue
          primary: '#2563EB',
          primaryHover: '#1D4ED8',
          cyan: '#0284C7',
          teal: '#0D9488',       // Restrained Teal for positive insights & AI intelligence
          emerald: '#0D9488',
          green: '#0D9488',      // Soft accessible status green/teal
          amber: '#D97706',      // Accessible amber
          purple: '#4F46E5',     // Indigo / intelligence
          rose: '#E11D48',       // Accessible gap / alert red
        },
      },
      fontFamily: {
        sans: ['Figtree', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Outfit', 'Figtree', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'Cascadia Code', 'Consolas', 'monospace']
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'card-dark': '0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 6px 16px -2px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
        'glow-blue': '0 2px 8px -1px rgba(37, 99, 235, 0.16)',
        'glow-green': '0 2px 8px -1px rgba(13, 148, 136, 0.16)',
      },
      borderRadius: {
        'sm': '6px',
        'DEFAULT': '8px',
        'md': '8px',
        'lg': '10px',
        'xl': '12px',
      }
    },
  },
  plugins: [],
}
