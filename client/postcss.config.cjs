// postcss.config.cjs
module.exports = {
  plugins: {
    'postcss-nested': {},   // ← ADD THIS FIRST
    tailwindcss: {},
    autoprefixer: {},
  },
}