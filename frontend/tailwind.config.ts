export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",
        secondary: "#6366f1",
        accent: "#22d3ee",
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
