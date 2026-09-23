/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		opacity: Object.fromEntries(Array.from({ length: 101 }, (_, i) => [i, `${i / 100}`])),
  		borderRadius: {
  			lg: '0.75rem',
  			md: '0.5rem',
  			sm: '0.375rem'
  		},
  		colors: {
  			background: '#FFFFFF',
  			foreground: '#111111',
  			navy: { DEFAULT: '#111111', soft: '#1f1f1f', border: '#333333' },
  			gold: { DEFAULT: '#E5231B', hover: '#D91E18' },
  			green: { DEFAULT: '#E5231B', hover: '#D91E18' },
  			red: { DEFAULT: '#E5231B' },
  			card: '#FFFFFF',
  			muted: { DEFAULT: '#F5F5F5', foreground: '#666666' },
  			border: '#DDDDDD',
  			input: '#DDDDDD',
  			ring: '#E5231B',
  			primary: { DEFAULT: '#E5231B', foreground: '#FFFFFF' },
  			secondary: { DEFAULT: '#F5F5F5', foreground: '#111111' },
  			accent: { DEFAULT: '#E5231B', foreground: '#FFFFFF' },
  			destructive: { DEFAULT: '#E5231B', foreground: '#FFFFFF' }
  		},
  		fontFamily: {
  			heading: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  			body: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  			display: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  			mono: ['ui-monospace', 'monospace']
  		},
  		keyframes: {
  			'fade-up': { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
  			'fade-in': { from: { opacity: 0 }, to: { opacity: 1 } }
  		},
  		animation: {
  			'fade-up': 'fade-up 0.5s ease-out both',
  			'fade-in': 'fade-in 0.4s ease-out both'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
