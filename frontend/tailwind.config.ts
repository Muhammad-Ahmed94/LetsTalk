export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      colors: {
        black_light: "#141414",
        black_medium: "#6366f1",
        black_full: "#090909",
        black_background: "#141414",

        message_backgorund: "#090909",
        message_text: "#FFFFFF",

        green_primary: "#036825",
        green_secondary: "#99FFAF",
        
        muted: "#9ca3af",
        background: "#f9fafb",
        foreground: "#111827",
      },
      borderRadius: {
        xl: "1rem",
        '2xl': "1.5rem",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
