import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ✔ Enhanced color system with better organization
        black: {
          light: "#141414",
          medium: "#0A0A0A", // ✔ Fixed: was using blue color
          full: "#090909",
          background: "#141414",
        },
        
        green: {
          primary: "#036825",
          secondary: "#99FFAF",
        },
        
        // ✔ Additional utility colors
        gray: {
          custom: "#6B7280",
          light: "#9CA3AF",
          dark: "#374151",
        },
        
        // ✔ Message specific colors
        message: {
          background: "#090909",
          text: "#FFFFFF",
        },
        
        // ✔ Status colors
        success: "#10B981",
        error: "#EF4444",
        warning: "#F59E0B",
        info: "#3B82F6",
        
        // ✔ Keep original naming for backward compatibility
        black_light: "#141414",
        black_medium: "#0A0A0A", // ✔ Fixed
        black_full: "#090909",
        black_background: "#141414",
        message_background: "#090909",
        message_text: "#FFFFFF",
        green_primary: "#036825",
        green_secondary: "#99FFAF",
        
        muted: "#9ca3af",
        background: "#f9fafb",
        foreground: "#111827",
      },
      
      // ✔ Enhanced spacing system
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // ✔ Enhanced border radius
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      
      // ✔ Enhanced font families
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Consolas', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      
      // ✔ Custom font sizes
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      
      // ✔ Custom shadows
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'chat': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'sidebar': 'inset -1px 0 0 0 rgba(255, 255, 255, 0.1)',
      },
      
      // ✔ Custom animations
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-in-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      // ✔ Custom keyframes
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
      },
      
      // ✔ Custom transitions
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
      },
      
      // ✔ Custom backdrop blur
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      
      // ✔ Custom z-index values
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  
  // ✔ Enhanced plugins configuration
  plugins: [
    // ✔ Add custom utilities
    function({ addUtilities }: any) {
      const newUtilities = {
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.scrollbar-custom': {
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#141414',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#99FFAF',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#036825',
          },
        },
        '.gradient-text': {
          'background': 'linear-gradient(135deg, #99FFAF 0%, #036825 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
      }
      addUtilities(newUtilities)
    }
  ],
  
} satisfies Config