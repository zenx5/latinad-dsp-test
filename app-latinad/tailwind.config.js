/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary' : '#0096F5'
      },
      /*
            9.5rem is the sum of:
                h-10 = 2.5rem (header)
                py-4 = 2*1rem = 2rem (header padding)
                h-20 = 5rem (footer)
      */
      height: {
        'with-footer': 'calc(100vh - 9.5rem)',
        'without-footer': 'calc(100vh - 4.5rem)',
      }
    },
  },
  plugins: [],
}

