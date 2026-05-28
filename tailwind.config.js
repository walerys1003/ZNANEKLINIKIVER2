/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        champagne: {
          50: '#FBF7F0', 100: '#F5ECD9', 200: '#EBDDB8', 300: '#DCC78A',
          400: '#CDB05F', 500: '#C9A961', 600: '#A8893F', 700: '#8B6F2E',
          800: '#6B5524', 900: '#4A3A18',
        },
        charcoal: {
          50: '#F4F4F4', 100: '#E5E5E5', 200: '#C4C4C4', 300: '#9A9A9A',
          400: '#6E6E6E', 500: '#4A4A4A', 600: '#2E2E2E', 700: '#1F1F1F',
          800: '#1A1A1A', 900: '#0D0D0D',
        },
        burgundy: {
          50: '#FAF2F3', 100: '#F2DCDF', 200: '#E2B0B7', 300: '#CC818C',
          400: '#A95764', 500: '#7A2E3E', 600: '#5F2330', 700: '#481A24',
          800: '#321218', 900: '#1E0A0E',
        },
        nude: {
          50: '#FDFBF7', 100: '#F8F4EE', 200: '#F1E9DC', 300: '#E8D5C4',
          400: '#D9BBA1', 500: '#C49A78', 600: '#A07956', 700: '#7A5A3F',
          800: '#523D2A', 900: '#2D2117',
        },
        rosegold: {
          50: '#FBF1EF', 100: '#F6DDD7', 200: '#EBBBB1', 300: '#DD9587',
          400: '#C97062', 500: '#B85A4E', 600: '#964538', 700: '#73342A',
          800: '#52251D', 900: '#311510',
        },
        surface: {
          page: '#F8F4EE',
          card: '#FDFBF7',
          elevated: '#FFFFFF',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Playfair Display', 'Didot', 'serif'],
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-hero': ['96px', { lineHeight: '1.05', letterSpacing: '-0.04em', fontWeight: '400' }],
        'h1': ['60px', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '400' }],
        'h2': ['48px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '400' }],
        'h3': ['36px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '400' }],
        'h4': ['30px', { lineHeight: '1.2', fontWeight: '400' }],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.02em',
        'tight': '-0.01em',
        'wide': '0.05em',
        'wider': '0.15em',
        'widest': '0.30em',
      },
      boxShadow: {
        'editorial-sm': '0 2px 4px -1px rgba(26,26,26,0.06), 0 1px 2px -1px rgba(26,26,26,0.04)',
        'editorial-md': '0 4px 12px -2px rgba(26,26,26,0.08), 0 2px 4px -2px rgba(26,26,26,0.04)',
        'editorial-lg': '0 12px 32px -8px rgba(26,26,26,0.12), 0 4px 12px -4px rgba(26,26,26,0.06)',
        'editorial-xl': '0 24px 60px -12px rgba(26,26,26,0.18), 0 8px 24px -8px rgba(26,26,26,0.08)',
        'gold-glow': '0 0 32px 0 rgba(201,169,97,0.24), 0 8px 24px -8px rgba(201,169,97,0.16)',
        'inner-card': 'inset 0 1px 0 0 rgba(255,255,255,0.6)',
      },
      borderRadius: {
        'xs': '2px',
        'sm': '4px',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'luxury': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      maxWidth: {
        'editorial': '1280px',
        'editorial-wide': '1440px',
        'prose-editorial': '680px',
      },
      animation: {
        'ai-orb-pulse': 'aiOrbPulse 4000ms ease-in-out infinite',
        'editorial-reveal': 'editorialReveal 800ms cubic-bezier(0.22,1,0.36,1) both',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        aiOrbPulse: {
          '0%,100%': { transform: 'scale(1)', opacity: '0.85' },
          '50%': { transform: 'scale(1.06)', opacity: '1' },
        },
        editorialReveal: {
          from: { opacity: '0', transform: 'translateY(12px) scale(0.98)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
