import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useStore } from '../../store/useStore'
import { randomPick } from '../../data/menuData'

export default function ActionBtn() {
  // 从 Store 获取状态和动作
  const { gameStatus, startGame, stopGame, resetGame } = useStore()
  
  // 按钮悬停状态
  const [groupHover, setGroupHover] = useState(false)

  // 处理点击逻辑
  const handleOnClick = () => {
    if (gameStatus === 'idle') {
      // 1. 空闲 -> 开始旋转
      startGame()
    } else if (gameStatus === 'spinning') {
      // 2. 旋转中 -> 停止 (计算结果)
      const winner = randomPick()
      stopGame(winner)
    } else if (gameStatus === 'showing') {
      // 3. 展示结果中 -> 重置
      resetGame()
    }
  }

  // 根据状态决定按钮文字和颜色
  const getButtonConfig = () => {
    switch (gameStatus) {
      case 'spinning':
        return { 
          text: '停止 . STOP', 
          bg: 'bg-black hover:bg-gray-800', 
          shadow: 'shadow-black/30',
          textColor: 'text-white'
        }
      case 'showing':
        return { 
          text: '再来一次 . RETRY', 
          bg: 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600', 
          shadow: 'shadow-gray-400/30 dark:shadow-gray-600/30',
          textColor: 'text-black dark:text-white'
        }
      case 'idle':
      default:
        return { 
          text: '开始决定 . START', 
          bg: 'bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:hover:bg-yellow-800/40', 
          shadow: 'shadow-yellow-300/30 dark:shadow-yellow-700/30',
          textColor: 'text-black dark:text-white'
        }
    }
  }

  const config = getButtonConfig()

  return (
    <div className="relative group pointer-events-auto">
      {/* 按钮外层的发光光晕 (装饰) */}
      <motion.div 
        className={`absolute -inset-1.5 rounded-full blur opacity-20 ${config.bg}`} 
        animate={{ 
          scale: groupHover ? 1.12 : 1,
          opacity: groupHover ? 0.5 : 0.2 
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* 内层光晕 */}
      <motion.div 
        className={`absolute -inset-0.5 rounded-full blur-sm opacity-30 ${config.bg}`} 
        animate={{ 
          scale: groupHover ? 1.08 : 1,
          opacity: groupHover ? 0.4 : 0.2 
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* 核心按钮 - 使用 Framer Motion 实现弹性点击效果 */}
      <motion.button
        whileHover={{ scale: 1.07, y: -3 }}
        whileTap={{ scale: 0.95, y: 0 }}
        onClick={handleOnClick}
        onHoverStart={() => setGroupHover(true)}
        onHoverEnd={() => setGroupHover(false)}
        className={`relative px-16 py-5.5 rounded-full font-bold tracking-widest uppercase transition-all duration-300 shadow-lg ${config.bg} ${config.shadow} ${config.textColor}`}
      >
        {/* 按钮背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
        
        <AnimatePresence mode="wait">
          <motion.span
            key={config.text} // key 变化时触发切换动画
            initial={{ y: 20, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 1.08 }}
            transition={{ 
              type: 'spring',
              stiffness: 250,
              damping: 18,
              duration: 0.3 
            }}
            className="relative z-10 block text-sm md:text-base"
          >
            {config.text}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  )
}