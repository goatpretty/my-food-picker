import { Bloom } from '@react-three/postprocessing'
import { useStore } from '../../store/useStore'
import { EffectComposer } from '@react-three/postprocessing'

export default function Effects() {
  const { isDark } = useStore()

  return (
    // enableNormalPass: 优化性能，不需要法线通道，所以设为 false
    <EffectComposer enableNormalPass={false}>
      {/* Bloom: 发光特效
        luminanceThreshold: 亮度阈值 (只有超过这个亮度的像素才会发光)
        intensity: 发光强度 (深色模式强发光，浅色模式弱发光)
        mipmapBlur: 使用多级模糊，让光晕更柔和
      */}
      <Bloom 
        luminanceThreshold={isDark ? 0.2 : 0.6} 
        mipmapBlur 
        intensity={isDark ? 1.5 : 0.5} 
        radius={0.6}
      />
      
    </EffectComposer>
  )
}