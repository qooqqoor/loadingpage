/** @type {import('tailwindcss').Config} */

const pxToRem = (px) => `${px / 16}rem`; // 將 px 轉換為 rem


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // 包括 src 資料夾中的所有 JS 和 TS 文件
  ],
  theme: {
    extend: {
      colors: {
        g01: '#000000',
        e01:'#F8F8F6 ',
        e03: 'rgba(99, 101, 106, 0.06)',
        e10: 'rgba(0, 0, 0, 0.08)',
        e08:'#EFEFEE',
        e11:'#C8C8C8',
        'b02-1':'#FF724E',
        'b02-2':'#FF3A9A',
        a19:'#FCFBFB'

      },
      borderRadius:{
        '1': '0.125rem',
        '2': '0.5rem',
        '4': '1rem'
      },
      spacing:{
        '4.5':'1.125rem'
      },
      fontSize:{

      }
    },
  },
  plugins: [],
}

