/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // HTMLファイルのパス
    './search.js',  // JavaScriptファイルのパス
    './photo/**/*.{html,js}', // photoディレクトリ内の全HTMLおよびJavaScriptファイル
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 6s ease forwards', // 6秒のフェードインアニメーション
      },
    },
  },
  plugins: [],
}

