import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 根据屏幕尺寸调整粒子数量和大小
const isMobile = window.innerWidth < 640;
const PARTICLE_COUNT = isMobile ? 15000 : 30000;
const GALAXY_SIZE = isMobile ? 800 : 1200;

export default function Scene() {
  const particlesRef = useRef<THREE.Points | null>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const targetRotationXRef = useRef(0);
  const targetRotationYRef = useRef(0);
  const lastMorphTimeRef = useRef(0);
  
  // 定义形态类型
  type MorphType = 'sphere' | 'helix' | 'rose' | 'lemniscate';
  
  // 粒子目标位置存储
  const targetsRef = useRef<Record<MorphType, number[]>>({
    sphere: [],
    helix: [],
    rose: [],
    lemniscate: []
  });
  
  const currentTargetRef = useRef<MorphType>('helix');
  
  // 初始化粒子
  useEffect(() => {
    // 生成粒子几何体
    const geometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(PARTICLE_COUNT * 3);
    const colorArray = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    
    const color1 = new THREE.Color(0x40c9ff); // 蓝
    const color2 = new THREE.Color(0xe028ce); // 紫
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // 初始随机位置
      const x = (Math.random() - 0.5) * GALAXY_SIZE * 3;
      const y = (Math.random() - 0.5) * GALAXY_SIZE * 3;
      const z = (Math.random() - 0.5) * GALAXY_SIZE * 3;
      
      posArray[i * 3] = x;
      posArray[i * 3 + 1] = y;
      posArray[i * 3 + 2] = z;
      
      // 颜色混插
      const mixedColor = color1.clone().lerp(color2, Math.random());
      colorArray[i * 3] = mixedColor.r;
      colorArray[i * 3 + 1] = mixedColor.g;
      colorArray[i * 3 + 2] = mixedColor.b;
      
      sizes[i] = Math.random() * 3 + 1; // 增大粒子大小，从原来的0-2改为1-4
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // 粒子材质
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0xffffff) }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (400.0 / -mvPosition.z); // 增加点大小缩放因子，使粒子更大
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          // 圆形粒子
          float r = distance(gl_PointCoord, vec2(0.5, 0.5));
          if (r > 0.5) discard;
          // 增强辉光效果
          float strength = 1.0 - (r * 1.5); // 减少衰减，增强发光强度
          // 增加亮度，使粒子在深色背景下更明显
          vec3 brightColor = vColor * 1.5;
          gl_FragColor = vec4(brightColor, strength);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true
    });
    
    const particles = new THREE.Points(geometry, material);
    geometryRef.current = geometry;
    particlesRef.current = particles;
    
    // 计算不同形态的目标坐标
    generateMathTargets();
    
    // 鼠标交互
    const handleMouseMove = (event: MouseEvent) => {
      mouseXRef.current = (event.clientX - window.innerWidth / 2) * 0.2;
      mouseYRef.current = (event.clientY - window.innerHeight / 2) * 0.2;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      geometry.dispose();
      (material as THREE.ShaderMaterial).dispose();
    };
  }, []);
  
  // 生成不同形态的目标坐标
  const generateMathTargets = () => {
    const targets = targetsRef.current;
    
    // 1. 球体
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
      const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;
      const r = 800;
      targets.sphere.push(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      );
    }
    
    // 2. 旋涡 / 阿基米德螺旋
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = i * 0.005; // 紧密度
      const r = 5 + 0.3 * theta; // 扩散度
      // 加上厚度干扰
      const x = (r * 15) * Math.cos(theta);
      const y = (Math.random() - 0.5) * 200;
      const z = (r * 15) * Math.sin(theta);
      targets.helix.push(x, y, z);
    }
    
    // 3. 伯努利双纽线
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const t = (i / PARTICLE_COUNT) * Math.PI * 20; // 绕多圈
      const a = 1200;
      const denom = 1 + Math.sin(t) ** 2;
      const x = (a * Math.cos(t)) / denom;
      const y = (Math.random() - 0.5) * 300; // 厚度
      const z = (a * Math.sin(t) * Math.cos(t)) / denom;
      targets.lemniscate.push(x, y, z);
    }
    
    // 4. 玫瑰曲线 - k=4
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const k = 4;
      const theta = (i / PARTICLE_COUNT) * Math.PI * 12;
      const r = 1000 * Math.cos(k * theta);
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      const z = (Math.random() - 0.5) * 400; // Z轴厚度
      targets.rose.push(x, y, z);
    }
  };
  
  // 动画循环
  useFrame(() => {
    // 只有深色模式渲染
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    if (!isDark || !particlesRef.current || !geometryRef.current) return;
    
    const particles = particlesRef.current;
    const geometry = geometryRef.current;
    
    // 摄像机跟随鼠标 (平滑阻尼)
    targetRotationXRef.current += (mouseXRef.current - targetRotationXRef.current) * 0.05;
    targetRotationYRef.current += (-mouseYRef.current - targetRotationYRef.current) * 0.05;
    
    // 粒子整体旋转
    particles.rotation.y += 0.002; // 自转
    particles.rotation.x += (mouseYRef.current * 0.0001);
    particles.rotation.y += (mouseXRef.current * 0.0001);
    
    // 形态变换逻辑
    const time = Date.now();
    if (time - lastMorphTimeRef.current > 10000) {
      lastMorphTimeRef.current = time;
      const morphTypes: MorphType[] = ['sphere', 'helix', 'rose', 'lemniscate'];
      currentTargetRef.current = morphTypes[Math.floor(Math.random() * morphTypes.length)];
    }
    
    // 粒子插值移动
    const positionsAttribute = geometry.getAttribute('position') as THREE.BufferAttribute;
    const currentPositions = positionsAttribute.array as Float32Array;
    const targetPositions = targetsRef.current[currentTargetRef.current];
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;
      
      // 简单的弹性移动算法
      currentPositions[ix] += (targetPositions[ix] - currentPositions[ix]) * 0.03;
      currentPositions[iy] += (targetPositions[iy] - currentPositions[iy]) * 0.03;
      currentPositions[iz] += (targetPositions[iz] - currentPositions[iz]) * 0.03;
    }
    
    positionsAttribute.needsUpdate = true;
  });
  
  return (
    <>
      {particlesRef.current && <primitive object={particlesRef.current} />}
    </>
  );
}