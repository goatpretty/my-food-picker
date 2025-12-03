import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Scene from './components/canvas/Scene'
import SimpleParticles from './components/canvas/SimpleParticles'
import ThemeToggle from './components/overlay/ThemeToggle'
import DecisionCard from './components/overlay/DecisionCard'
import { randomPick, FoodItem } from './data/menuData'

// 主题类型
type Theme = 'light' | 'dark'

export default function App() {
  // 主题管理
  const [theme, setTheme] = useState<Theme>('light')
  
  // 决策过程状态
  const [isRunning, setIsRunning] = useState(false)
  const [firstRun, setFirstRun] = useState(true)
  const [result, setResult] = useState<FoodItem | null>(null)
  
  // 初始化主题
  useEffect(() => {
    // 检查系统偏好
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
      document.body.setAttribute('data-theme', 'dark')
    }
  }, [])
  
  // 主题切换函数
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    
    // 遮罩位置计算
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
      const rect = themeBtn.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth * 100;
      const y = (rect.top + rect.height / 2) / window.innerHeight * 100;
      
      const themeOverlay = document.querySelector('.theme-overlay') as HTMLElement;
      if (themeOverlay) {
        themeOverlay.style.clipPath = `circle(0% at ${x}% ${y}%)`;
        themeOverlay.style.background = newTheme === 'dark' ? '#000' : '#f4f4f7';
        
        // 执行动画
        requestAnimationFrame(() => {
          themeOverlay.style.clipPath = `circle(150% at ${x}% ${y}%)`;
        });
        
        setTimeout(() => {
          setTheme(newTheme);
          document.body.setAttribute('data-theme', newTheme);
        }, 500);
        
        setTimeout(() => {
          themeOverlay.style.clipPath = `circle(0% at ${x}% ${y}%)`;
        }, 1000);
      } else {
        // 如果没有遮罩元素，直接切换主题
        setTheme(newTheme);
        document.body.setAttribute('data-theme', newTheme);
      }
    }
  }
  
  // 开始决策过程
  const startDecisionProcess = () => {
    if (isRunning) return
    
    setIsRunning(true)
    
    let steps = 0
    const maxSteps = 30
    let speed = 30
    
    function loop() {
      const pick = randomPick()
      setResult(pick)
      
      steps++
      if (steps < maxSteps) {
        speed += steps * 0.5
        setTimeout(loop, speed)
      } else {
        setIsRunning(false)
        setFirstRun(false)
      }
    }
    loop()
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {/* 主容器 */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* 遮罩动画 */}
        <div 
          className="theme-overlay absolute inset-0 z-9999 pointer-events-none bg-[#000]"
        ></div>
        
        {/* 主题切换按钮 */}
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        
        {/* 玻璃态卡片 */}
        <DecisionCard 
          isRunning={isRunning}
          firstRun={firstRun}
          result={result}
          onStart={startDecisionProcess}
        />
        
        {/* 粒子效果容器 */}
        <div id="canvas-container" className="absolute inset-0 z-0">
          {/* 简单粒子效果 */}
          <SimpleParticles />
          
          {/* 3D Canvas (深色模式) */}
          <div 
            id="three-canvas" 
            className="absolute inset-0"
          >
            <Canvas
              shadows
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
              camera={{ position: [0, 0, 1000], fov: 55, near: 1, far: 5000 }}
            >
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  )
}