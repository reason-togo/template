/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './src/entities/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/widgets/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          900: '#3A2410',
          700: '#70502E',
          600: '#8B7355',
          500: '#907857',
          400: '#AF9F7F',
          200: '#CFC7A8',
          100: '#E8E3D0',
        },
        cream: {
          50: '#FDFCF8',
        },
        app: {
          bg: '#EEEED0',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          'system-ui',
          'sans-serif',
        ],
      },
      borderRadius: {
        xs: '6px',
        sm: '8px',
        md: '10px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,0.06)',
        featured: '0 4px 20px rgba(0,0,0,0.08)',
        btn: '0 10px 32px rgba(112,80,46,0.3)',
        'btn-active': '0 5px 16px rgba(112,80,46,0.2)',
        light: '0 1px 6px rgba(0,0,0,0.05)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-dot': {
          '0%, 60%, 100%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-6px)' },
        },
        'spin-ring': {
          to: { transform: 'rotate(360deg)' },
        },
        ripple: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        'pulse-icon': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(112,80,46,0.3)' },
          '50%': { boxShadow: '0 0 0 6px rgba(112,80,46,0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 'var(--tw-opacity, 1)' },
          '50%': { opacity: '0.05' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.3s ease both',
        'bounce-dot': 'bounce-dot 0.9s ease-in-out infinite',
        'spin-ring': 'spin-ring 1.6s linear infinite',
        'spin-ring-slow': 'spin-ring 2.2s linear infinite reverse',
        'spin-ring-slower': 'spin-ring 3s linear infinite',
        ripple: 'ripple 2s ease-out infinite',
        blink: 'blink 1.5s ease-in-out infinite',
        'pulse-icon': 'pulse-icon 0.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
