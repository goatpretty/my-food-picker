import { useStore } from '../../store/useStore'
import { motion } from 'framer-motion'

export default function Header() {
  const { isDark, toggleTheme } = useStore()

  return (
    <header className="flex items-center justify-between w-full pointer-events-auto px-2 py-1">
      {/* 标题部分 */}
      <div className="flex flex-col space-y-0.5">
        <motion.h1 
          initial={{ y: -20, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-[clamp(1.5rem,6vw,2.75rem)] font-black tracking-tighter text-black dark:text-white transition-all duration-500"
        >
          今天吃什么
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="text-[clamp(0.625rem,2vw,0.875rem)] font-medium text-gray-600 dark:text-gray-300 transition-colors duration-500"
        >
          Food Decision Helper
        </motion.p>
      </div>

      {/* 深色模式切换按钮 */}
      <button
        onClick={toggleTheme}
        className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-white/80 p-2 shadow-md backdrop-blur-sm transition-all duration-500 hover:bg-white hover:shadow-lg dark:bg-gray-800/80 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
        aria-label="Toggle Dark Mode"
      >
        {/* 太阳图标 (浅色模式显示) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-5 w-5 text-amber-500 transition-transform duration-500 ${
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41-1.41" />
          <path d="m19.07 4.93-1.41-1.41" />
        </svg>

        {/* 月亮图标 (深色模式显示) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute h-5 w-5 text-indigo-400 transition-transform duration-500 ${
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </button>
    </header>
  )
}