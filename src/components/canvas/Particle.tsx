import { useRef, useState } from 'react'
import { Group, Vector3 } from 'three'
import { useFrame } from '@react-three/fiber'
import { Text, Billboard, useCursor } from '@react-three/drei'
import { FoodItem, formatLabel } from '../../data/menuData'
import { useStore } from '../../store/useStore'

interface ParticleProps {
  data: FoodItem
  position: [number, number, number]
  initialRotation: number
}

export default function Particle({ data, position, initialRotation }: ParticleProps) {
  const groupRef = useRef<Group>(null)
  const [hovered, setHover] = useState(false)
  
  // 从 store 获取状态和方法
  const { stopGame, isDark } = useStore()
  
  // 1. 鼠标悬停时，改变鼠标样式为“手指”
  useCursor(hovered)

  // 3. 动画循环: 处理平滑放大和颜色过渡
  useFrame((state, delta) => {
    if (!groupRef.current) return

    const time = state.clock.elapsedTime
    const targetScale = hovered ? 1.8 : 1
    
    // --- 平滑缩放逻辑 (Lerp 插值) ---
    groupRef.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), delta * 12)

    // --- 悬停浮动逻辑 ---
    if (hovered) {
      // 更明显的浮动效果
      const floatAmount = Math.sin(time * 15) * 0.003
      groupRef.current.position.y += floatAmount
      
      // 轻微的左右摇摆
      const swayAmount = Math.sin(time * 10) * 0.002
      groupRef.current.position.x += swayAmount
    }
    
    // --- 持续旋转效果 ---
    // 每个粒子都有独特的旋转速度，增加多样性
    groupRef.current.rotation.y += 0.003
    groupRef.current.rotation.z += 0.002
  })

  // 4. 颜色配置策略
  // 黑白简约风格: 默认深灰/灰白，悬停变浅黄/米色
  const baseColor = isDark ? '#e5e5e5' : '#333333' // 浅灰 : 深灰
  const hoverColor = isDark ? '#fef3c7' : '#f59e0b' // 浅黄色 : 深黄色
  
  // 5. 材质配置
  const materialProps = {
    color: hovered ? hoverColor : baseColor,
    emissive: hovered ? hoverColor : 'black',
    emissiveIntensity: hovered ? 0.8 : 0,
    metalness: hovered ? 0.2 : 0,
    roughness: hovered ? 0.3 : 0.6,
    transparent: true,
    opacity: hovered ? 1 : 0.9
  }

  return (
    // Group 设置基础位置和初始旋转
    <group 
      position={position} 
      ref={groupRef}
      rotation={[initialRotation, initialRotation * 0.5, initialRotation * 0.3]}
    >
      {/* Billboard: 确保内部内容始终面向相机 */}
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        
        {/* 光晕效果：悬停时显示 */}
        {hovered && (
          <mesh>
            <circleGeometry args={[0.8, 32]} />
            <meshBasicMaterial 
              color={hoverColor}
              transparent
              opacity={0.3}
              blending={2} // AdditiveBlending
            />
          </mesh>
        )}
        
        {/* 文字组件 */}
        <Text
          fontSize={0.5}
          // 字体文件路径：这里使用 Google Fonts CDN 的 inter 字体，保证无需本地文件也能运行
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
          anchorX="center"
          anchorY="middle"
          // 事件监听
          onPointerOver={(e) => {
            e.stopPropagation() // 防止穿透到背后的粒子
            setHover(true)
          }}
          onPointerOut={() => setHover(false)}
          onClick={() => {
            // 直接调用 stopGame 选择当前粒子作为结果
            stopGame(data)
          }}
          // 添加描边效果，增强文字可读性
          strokeWidth={0.02}
          strokeColor={isDark ? '#1e293b' : '#f1f5f9'}
        >
          {formatLabel(data)}
          {/* 材质设置：根据悬停状态切换颜色 */}
          <meshStandardMaterial {...materialProps} />
        </Text>
        
        {/* 装饰点：文字下方的小光点，增加科技感 */}
        <mesh position={[0, -0.6, 0]} visible={hovered}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial 
              color={hoverColor}
              emissive={hoverColor}
              emissiveIntensity={1.5}
            />
        </mesh>

        {/* 装饰光环：环绕文字的圆环 */}
        {hovered && (
          <mesh position={[0, 0, -0.1]}>
            <torusGeometry args={[0.7, 0.01, 16, 32]} />
            <meshBasicMaterial 
              color={hoverColor}
              transparent
              opacity={0.7}
              blending={2} // AdditiveBlending
            />
          </mesh>
        )}

      </Billboard>
    </group>
  )
}