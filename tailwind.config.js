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
        ivory: {
          DEFAULT: '#FDFBF7',
          dark: '#F6F1E9',
          card: '#FAF8F5',
        },
        champagne: {
          DEFAULT: '#F4EBE1',
          gold: '#D4AF37',
          deep: '#C5A059',
          light: '#FBF7F2',
        },
        gold: {
          DEFAULT: '#C5A059',
          light: '#E8D5B5',
          dark: '#A6823C',
          shimmer: '#E2C085',
        },
        charcoal: {
          DEFAULT: '#1C1B1A',
          light: '#2E2D2C',
          muted: '#5A5856',
          dark: '#121110',
        },
        blush: {
          DEFAULT: '#E8D3D1',
          soft: '#F6EAE8',
          deep: '#C99E9A',
        },
        sand: {
          DEFAULT: '#EAE3D9',
          muted: '#DDD4C7',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      letterSpacing: {
        widest: '.25em',
        ultra: '.35em',
      },
      animation: {
        'fade-in': 'fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(28, 27, 26, 0.07)',
        'luxury-hover': '0 30px 60px -20px rgba(28, 27, 26, 0.12)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
      }
    },
  },
  plugins: [],
}
