/** @type {import('tailwindcss').Config} */
export default {
  // ⚠️ 核心配置：使用 'class' 策略
  // 这允许我们通过 JS 动态给 <html> 标签添加 'dark' 类来控制主题，
  // 而不是只能跟随系统设置。
  darkMode: 'class',

  // 扫描所有相关文件，确保 Tailwind 能裁剪未使用的样式
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      // 你可以在这里扩展自定义颜色或字体
      // 目前项目使用的是 Tailwind 默认色板 (Slate, Indigo, Rose 等)，所以这里留空即可
    },
  },
  
  plugins: [],
}