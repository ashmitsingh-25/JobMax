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
          950: '#060A13', // deepest background
          900: '#0A0F1D', // main page background
          850: '#0F172A', // elevated surface
          800: '#141E33', // card surface
          750: '#1B2844', // hover card
          700: '#233454', // border standard
          600: '#324770', // border prominent
          500: '#486294', // subtle detail
        },
        brand: {
          blue: '#0A66C2',       // LinkedIn Enterprise Blue
          primary: '#2563EB',    // Vibrant Royal Blue
          primaryHover: '#1D4ED8',
          cyan: '#0284C7',       // Sky Corporate Blue
          emerald: '#10B981',    // Freelancer Verified Green
          green: '#059669',      // Success / Verified
          glow: 'rgba(37, 99, 235, 0.25)',
          amber: '#F59E0B',      // Rating & Milestones
          purple: '#8B5CF6',     // AI & ML Models
          rose: '#F43F5E',       // Skill gaps & alerts
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'Cascadia Code', 'Consolas', 'monospace']
      },
      boxShadow: {
        'glow-blue': '0 0 25px -4px rgba(37, 99, 235, 0.35)',
        'glow-green': '0 0 25px -4px rgba(16, 185, 129, 0.35)',
        'glow-cyan': '0 0 25px -4px rgba(2, 132, 199, 0.35)',
        'card-dark': '0 10px 30px -5px rgba(2, 6, 23, 0.5), 0 4px 6px -4px rgba(2, 6, 23, 0.3)',
        'card-hover': '0 20px 40px -10px rgba(37, 99, 235, 0.2), 0 8px 16px -6px rgba(2, 6, 23, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'subtle-grid': 'radial-gradient(#1E293B 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
}
