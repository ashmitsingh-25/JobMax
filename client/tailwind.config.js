const colors = require('tailwindcss/colors');

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
          900: '#FFFFFF', // was deepest dark, now white
          850: '#F8FAFC', // was dashboard bg, now Very Light Blue
          800: '#FFFFFF', // was card bg, now white
          750: '#EFF6FF', // was hover card, now Light Blue
          700: '#E2E8F0', // was border, now light border
          600: '#CBD5E1', // was prominent border
        },
        brand: {
          green: '#2563EB',    // Primary Blue
          darkgreen: '#1D4ED8', // Dark Blue
          glow: '#2563EB33',
          emerald: '#2563EB',
          cyan: '#3B82F6',
          blue: '#2563EB',
          purple: '#8B5CF6',
          amber: '#F59E0B',
          rose: '#F43F5E'
        },
        white: '#0F172A',
        black: '#FFFFFF',
        slate: {
          50: colors.slate[950],
          100: '#1E293B',
          200: '#334155',
          300: '#475569',
          400: '#64748B', // Secondary text
          500: '#94A3B8',
          600: '#CBD5E1',
          700: '#E2E8F0',
          800: '#F1F5F9',
          900: '#F8FAFC',
          950: colors.slate[50],
        },
        emerald: {
          50: colors.blue[950],
          100: colors.blue[900],
          200: colors.blue[800],
          300: colors.blue[700],
          400: colors.blue[600],
          500: colors.blue[500],
          600: colors.blue[400],
          700: colors.blue[300],
          800: colors.blue[200],
          900: colors.blue[100],
          950: '#EFF6FF',
        },
        rose: {
          50: colors.rose[950],
          100: colors.rose[900],
          200: colors.rose[800],
          300: colors.rose[700],
          400: colors.rose[600],
          500: colors.rose[500],
          600: colors.rose[400],
          700: colors.rose[300],
          800: colors.rose[200],
          900: colors.rose[100],
          950: '#FFF1F2',
        },
        amber: {
          50: colors.amber[950],
          100: colors.amber[900],
          200: colors.amber[800],
          300: colors.amber[700],
          400: colors.amber[600],
          500: colors.amber[500],
          600: colors.amber[400],
          700: colors.amber[300],
          800: colors.amber[200],
          900: colors.amber[100],
          950: '#FFFBEB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', 'monospace']
      },
      boxShadow: {
        'glow-green': '0 0 20px -3px rgba(37, 99, 235, 0.3)',
        'glow-blue': '0 0 20px -3px rgba(37, 99, 235, 0.3)',
        'card-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
