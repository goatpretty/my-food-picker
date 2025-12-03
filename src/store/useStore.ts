import { create } from 'zustand'
import { FoodItem } from '../data/menuData'

// 定义状态结构
interface AppState {
  // --- 外观设置 ---
  isDark: boolean
  toggleTheme: () => void

  // --- 抽奖逻辑 ---
  // idle: 空闲状态
  // spinning: 正在旋转抽取中
  // showing: 展示结果中
  gameStatus: 'idle' | 'spinning' | 'showing'
  
  // 选中的结果
  selectedItem: FoodItem | null
  
  // 动作: 开始抽奖
  startGame: () => void
  // 动作: 结束抽奖（算出结果）
  stopGame: (item: FoodItem) => void
  // 动作: 重置（关闭弹窗，回到空闲）
  resetGame: () => void
}

export const useStore = create<AppState>((set) => ({
  // 1. 初始化深色模式
  // 检查本地 localStorage 或系统偏好
  isDark: localStorage.getItem('theme') === 'dark' 
          || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches),

  toggleTheme: () => set((state) => {
    const nextDark = !state.isDark
    // 同步修改 HTML 的 class，以便 Tailwind 生效
    if (nextDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    return { isDark: nextDark }
  }),

  // 2. 初始游戏状态
  gameStatus: 'idle',
  selectedItem: null,

  startGame: () => set({ gameStatus: 'spinning', selectedItem: null }),

  stopGame: (item) => set({ gameStatus: 'showing', selectedItem: item }),

  resetGame: () => set({ gameStatus: 'idle', selectedItem: null }),
}))