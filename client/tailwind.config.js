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
          900: '#07090E', // Deep canvas
          850: '#0B0F19', // Main dashboard bg
          800: '#111827', // Card surface
          750: '#162032', // Elevated hover card
          700: '#1F293D', // Border subtle
          600: '#334155', // Border prominent
        },
        brand: {
          green: '#00EA64',    // HackerRank signature green
          darkgreen: '#059669',
          glow: '#00EA6433',
          emerald: '#10B981',
          cyan: '#06B6D4',
          blue: '#3B82F6',
          purple: '#8B5CF6',
          amber: '#F59E0B',
          rose: '#F43F5E'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', 'monospace']
      },
      boxShadow: {
        'glow-green': '0 0 20px -3px rgba(0, 234, 100, 0.25)',
        'glow-blue': '0 0 20px -3px rgba(59, 130, 246, 0.25)',
        'card-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
