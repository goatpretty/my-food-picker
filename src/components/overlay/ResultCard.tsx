import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../../store/useStore'

export default function ResultCard() {
  // 从 Store 中获取当前状态和选中的物品
  const { gameStatus, selectedItem } = useStore()

  // 只有当状态为 'showing' 且确实有选中项时才显示
  const show = gameStatus === 'showing' && selectedItem !== null

  return (
    // AnimatePresence 用于处理组件卸载时的“离开动画”
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          
          {/* 背景遮罩 (Backdrop) - 增加一点黑色半透明背景，聚焦视线 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/25 backdrop-blur-sm"
          />

          {/* 核心卡片 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 50, rotateX: 10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              rotateX: 0,
              transition: { type: 'spring', stiffness: 200, damping: 20 } 
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.92, 
              y: 30,
              rotateX: -5,
              transition: { duration: 0.3 } 
            }}
            className="relative p-9 text-center pointer-events-auto glass-panel"
          >
            {/* 装饰图标 */}
            <motion.div 
              className="mx-auto mb-6 flex h-22 w-22 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-5xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            >
              🍽️
            </motion.div>

            <motion.p 
              className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              今天就吃这个！
            </motion.p>

            {/* 商铺名称 */}
            <motion.h2 
              className="mb-4 text-[clamp(2rem,8vw,3.5rem)] font-black text-black dark:text-white leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {selectedItem.shop}
            </motion.h2>

            {/* 菜品详情 (如果有) */}
            {selectedItem.dish && (
              <motion.p 
                className="mb-10 text-[clamp(1rem,4vw,1.5rem)] font-medium text-gray-600 dark:text-gray-300 italic leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                “{selectedItem.dish}”
              </motion.p>
            )}

            <motion.div 
              className="my-10 h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />

            {/* 食堂/区域标签 */}
            <motion.div 
              className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <span className="mr-2.5 h-2.5 w-2.5 rounded-full bg-yellow-500 animate-pulse"></span>
              {selectedItem.canteen}
            </motion.div>

            {/* 提示语 */}
            <motion.p 
              className="mt-10 text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              点击下方按钮可以再抽一次
            </motion.p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}