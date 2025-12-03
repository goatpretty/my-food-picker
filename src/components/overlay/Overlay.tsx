import Header from './Header'
import ActionBtn from './ActionBtn'
import ResultCard from './ResultCard'

export default function Overlay() {
  return (
    // 布局容器：flex 布局，垂直排列，两端对齐 (Header 在顶，Button 在底)
    <div className="flex h-full w-full flex-col justify-between p-4 md:p-8">
      
      {/* 顶部栏 */}
      <div className="w-full">
        <Header />
      </div>

      {/* 结果弹窗 (虽然它是 fixed 定位，但放在这里渲染符合逻辑结构) */}
      <ResultCard />

      {/* 底部按钮区 */}
      <div className="flex w-full justify-center pb-4 md:pb-10">
        <ActionBtn />
      </div>
      
    </div>
  )
}