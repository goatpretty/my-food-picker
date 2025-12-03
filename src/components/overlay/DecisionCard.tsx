import React from 'react'
import { motion } from 'framer-motion'
import { FoodItem } from '../../data/menuData'

interface DecisionCardProps {
  isRunning: boolean
  firstRun: boolean
  result: FoodItem | null
  onStart: () => void
}

const DecisionCard: React.FC<DecisionCardProps> = ({ isRunning, firstRun, result, onStart }) => {
  // 图标 SVG
  const sectorIcon = `<svg class="icon" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`
  const vendorIcon = `<svg class="icon" viewBox="0 0 24 24"><path d="M3 3h18v18H3zM12 8v8M8 12h8"></path></svg>`
  const choiceIcon = `<svg class="icon" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-5.82 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`
  const introIcon = `<svg class="intro-icon" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path><path d="M12 6v6l4 2"></path></svg>`

  return (
    <div className="relative p-9 text-center pointer-events-auto glass-panel">
      {/* 头部 */}
      <header>
        <h1>
          <div className="status-dot"></div>
          等会吃什么
        </h1>
      </header>

      {/* 内容区域 */}
      <div className="content-area">
        {/* 初始状态 */}
        <motion.div
          id="state-intro"
          className={`${firstRun ? '' : 'hidden'} absolute inset-0 flex flex-col items-center justify-center text-center`}
          initial={{ opacity: 1, y: 0 }}
          animate={{
            opacity: firstRun ? 1 : 0,
            y: firstRun ? 0 : -20,
            pointerEvents: firstRun ? 'auto' : 'none'
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div dangerouslySetInnerHTML={{ __html: introIcon }} />
          <p>初始化中...<br /><span style={{ fontSize: '0.8em', opacity: '0.6' }}>等待输入</span></p>
        </motion.div>

        {/* 结果状态 */}
        <motion.div
          id="state-result"
          className={`flex flex-col gap-3 ${!firstRun ? 'active' : ''}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: !firstRun ? 1 : 0,
            y: !firstRun ? 0 : 10,
            pointerEvents: !firstRun ? 'auto' : 'none'
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* 食堂/区域 */}
          <div className="data-row">
            <div className="label">
              <div dangerouslySetInnerHTML={{ __html: sectorIcon }} />
              目标区域
            </div>
            <div className="value" id="val-canteen">{result?.canteen || '---'}</div>
          </div>

          {/* 商铺 */}
          <div className="data-row">
            <div className="label">
              <div dangerouslySetInnerHTML={{ __html: vendorIcon }} />
              商铺名称
            </div>
            <div className="value" id="val-shop">{result?.shop || '---'}</div>
          </div>

          {/* 品名 (仅当存在时显示) */}
          <div 
            className={`data-row highlight-row ${!isRunning && result?.dish ? 'show' : ''}`}
            id="row-dish"
          >
            <div className="label">
              <div dangerouslySetInnerHTML={{ __html: choiceIcon }} />
              最佳选择
            </div>
            <div className="value" id="val-dish">{result?.dish || ''}</div>
          </div>
        </motion.div>
      </div>

      {/* 按钮 */}
      <button
        className="main-btn"
        id="start-btn"
        onClick={onStart}
        disabled={isRunning}
      >
        {isRunning ? '抽取中...' : firstRun ? '开始抽取' : '重新抽取'}
      </button>
    </div>
  )
}

export default DecisionCard