import { useMemo, useRef } from 'react'
import { Group } from 'three'
import { useFrame } from '@react-three/fiber'
import { MENU_DATA } from '../../data/menuData'
// 下一步我们将创建这个核心组件
import Particle from './Particle'
import { useStore } from '../../store/useStore'

export default function FoodCloud() {
  const groupRef = useRef<Group>(null)
  const { gameStatus } = useStore()

  // --- 1. 计算球面坐标 ---
  // 使用 useMemo 只在组件挂载时计算一次，避免每帧重复计算导致卡顿
  const particles = useMemo(() => {
    const temp = []
    // 转换数据结构，为每个店铺和菜品创建粒子
    const allItems = MENU_DATA.flatMap(shop => {
      if (shop.dishes.length > 0) {
        // 如果店铺有菜品，为每个菜品创建一个粒子
        return shop.dishes.map(dish => ({
          canteen: shop.canteen,
          shop: shop.name,
          dish: dish.name
        }));
      } else {
        // 如果店铺没有菜品，只为店铺创建一个粒子
        return [{ canteen: shop.canteen, shop: shop.name, dish: '' }];
      }
    });
    
    const count = allItems.length
    // 球体半径范围：增加随机性，让粒子分布更自然
    const baseRadius = 7
    const radiusVariation = 1.5
    
    // 黄金角度：用于斐波那契螺旋分布
    const goldenRatio = (1 + 5 ** 0.5) / 2
    const angleIncrement = Math.PI * 2 * goldenRatio

    for (let i = 0; i < count; i++) {
      // 1. 计算 y 坐标 (从 1 到 -1 均匀分布)
      const y = 1 - (i / (count - 1)) * 2
      
      // 2. 计算该 y 高度下的圆环半径
      const radiusAtY = Math.sqrt(1 - y * y)
      
      // 3. 计算角度 theta
      const theta = i * angleIncrement
      
      // 4. 转换为笛卡尔坐标 (x, y, z)
      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY

      // 5. 添加随机性，让粒子分布更自然
      const randomRadius = baseRadius + (Math.random() - 0.5) * radiusVariation
      const randomOffset = 0.5 // 增加微小的随机偏移
      const finalX = x * randomRadius + (Math.random() - 0.5) * randomOffset
      const finalY = y * randomRadius + (Math.random() - 0.5) * randomOffset
      const finalZ = z * randomRadius + (Math.random() - 0.5) * randomOffset

      // 6. 为每个粒子分配一个随机的初始旋转角度，增加多样性
      const initialRotation = Math.random() * Math.PI * 2

      // 7. 存入数组，并将坐标放大到设定的半径
      temp.push({
        data: allItems[i],
        position: [finalX, finalY, finalZ] as [number, number, number],
        initialRotation
      })
    }
    return temp
  }, [])

  // --- 2. 整体微动动画 --- 
  // 让整个球体除了被鼠标拖动外，自己也有不同状态下的旋转和漂浮感
  useFrame((state) => {
    if (groupRef.current) {
      // 1. 整体上下浮动，增加呼吸感
      const time = state.clock.elapsedTime
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.2 + Math.sin(time * 0.3) * 0.1
      
      // 2. 整体左右摆动，增加动态感
      groupRef.current.position.x = Math.sin(time * 0.4) * 0.1
      
      // 3. 根据游戏状态调整旋转速度
      let rotationSpeed = 0
      switch (gameStatus) {
        case 'spinning':
          rotationSpeed = 0.05 // 快速旋转
          break
        case 'idle':
          // 缓慢旋转，带有轻微的速度变化，增加自然感
          rotationSpeed = 0.008 + Math.sin(time * 0.2) * 0.002
          break
        case 'showing':
          // 停止旋转，但保持轻微的微动
          rotationSpeed = Math.sin(time * 0.3) * 0.001
          break
      }

      // 4. 应用旋转，x和y轴不同步，增加复杂性
      groupRef.current.rotation.y += rotationSpeed
      groupRef.current.rotation.x += rotationSpeed * 0.3
      groupRef.current.rotation.z += rotationSpeed * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {particles.map((item, index) => (
        <Particle 
          key={index} 
          data={item.data} 
          position={item.position} 
          initialRotation={item.initialRotation}
        />
      ))}
    </group>
  )
}