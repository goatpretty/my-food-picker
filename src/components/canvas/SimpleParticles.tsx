import { useEffect, useRef } from 'react';

const SimpleParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;
    
    // 鼠标位置
    let mouseX = width / 2;
    let mouseY = height / 2;
    
    // 监听鼠标移动
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // 粒子类型定义
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      attracted: boolean;
      life: number;
      shape: 'circle' | 'square' | 'triangle' | 'star' | 'heart' | 'hexagon' | 'pentagon' | 'diamond' | 'plus' | 'cross'; // 更多粒子形状
      rotation: number; // 旋转角度
      rotationSpeed: number; // 旋转速度
    }
    
    // 创建粒子数组
    const particles: Particle[] = [];
    // 根据屏幕尺寸调整粒子数量和大小
    const isMobile = width < 640;
    const particleCount = isMobile ? 120 : 200; // 手机端减少粒子数量
    const baseSize = isMobile ? 0.8 : 1; // 手机端缩小粒子
    
    // 形状数组
    const shapes: Array<'circle' | 'square' | 'triangle' | 'star' | 'heart' | 'hexagon' | 'pentagon' | 'diamond' | 'plus' | 'cross'> = ['circle', 'square', 'triangle', 'star', 'heart', 'hexagon', 'pentagon', 'diamond', 'plus', 'cross'];
    
    // 初始化粒子
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: (Math.random() * 3 + 1) * baseSize, // 手机端缩小粒子
        color: `rgba(0, 0, 0, ${Math.random() * 0.3 + 0.1})`,
        attracted: Math.random() < 0.15, // 15%的粒子被吸引
        life: 1.0,
        shape: shapes[Math.floor(Math.random() * shapes.length)], // 随机形状
        rotation: Math.random() * Math.PI * 2, // 随机旋转角度
        rotationSpeed: (Math.random() - 0.5) * 0.05 // 随机旋转速度
      });
    }
    
    // 重置粒子
    const resetParticle = (particle: Particle) => {
      particle.x = Math.random() * width;
      particle.y = Math.random() * height;
      particle.vx = (Math.random() - 0.5) * 0.5;
      particle.vy = (Math.random() - 0.5) * 0.5;
      particle.size = (Math.random() * 3 + 1) * baseSize; // 重置时也考虑手机端粒子大小
      particle.attracted = Math.random() < 0.15;
      particle.life = 1.0;
      particle.shape = shapes[Math.floor(Math.random() * shapes.length)];
      particle.rotation = Math.random() * Math.PI * 2;
      particle.rotationSpeed = (Math.random() - 0.5) * 0.05;
    };
    
    // 绘制粒子
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(particle => {
        // 普通粒子运动 - 更柔和的随机运动
        const randomForce = 0.05; // 进一步减小随机力，使运动更柔和
        particle.vx += (Math.random() - 0.5) * randomForce;
        particle.vy += (Math.random() - 0.5) * randomForce;
        
        // 只有被吸引的粒子才响应鼠标
        if (particle.attracted) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // 粒子接近鼠标时消失
          if (distance < 50) {
            particle.life -= 0.03;
            
            if (particle.life <= 0) {
              resetParticle(particle);
              return;
            }
          } else if (distance < 400) { // 扩大吸引范围
            // 只有在一定范围内才吸引，且吸引力随距离增加而减弱
            const normalizedDx = dx / distance;
            const normalizedDy = dy / distance;
            // 增大吸引力，加快粒子往鼠标移动速度
            const force = 0.01 * Math.max(0, (400 - distance) / 400);
            particle.vx += normalizedDx * force;
            particle.vy += normalizedDy * force;
          }
        }
        
        // 限制速度 - 加快被吸引粒子的速度，使粒子更快响应鼠标
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        const maxSpeed = particle.attracted ? 2 : 1; // 加快被吸引粒子的速度限制
        if (speed > maxSpeed) {
          particle.vx = (particle.vx / speed) * maxSpeed;
          particle.vy = (particle.vy / speed) * maxSpeed;
        }
        
        // 更新位置
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // 边界检测
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;
        
        // 阻力 - 减小被吸引粒子的阻力，让它们更快接近鼠标
        const damping = particle.attracted ? 0.96 : 0.92; // 减小被吸引粒子的阻力
        particle.vx *= damping;
        particle.vy *= damping;
        
        // 更新旋转角度
        particle.rotation += particle.rotationSpeed;
        
        // 保存当前状态
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.globalAlpha = particle.life;
        ctx.fillStyle = particle.color;
        
        // 根据形状绘制粒子
        switch (particle.shape) {
          case 'circle':
            ctx.beginPath();
            ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
            ctx.fill();
            break;
            
          case 'square':
            ctx.fillRect(-particle.size, -particle.size, particle.size * 2, particle.size * 2);
            break;
            
          case 'triangle':
            ctx.beginPath();
            ctx.moveTo(0, -particle.size * 1.5);
            ctx.lineTo(particle.size, particle.size);
            ctx.lineTo(-particle.size, particle.size);
            ctx.closePath();
            ctx.fill();
            break;
            
          case 'star':
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
              const angle = (i * Math.PI * 2) / 5;
              const x = Math.cos(angle) * particle.size;
              const y = Math.sin(angle) * particle.size;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
              
              const innerAngle = ((i + 0.5) * Math.PI * 2) / 5;
              const innerX = Math.cos(innerAngle) * particle.size * 0.5;
              const innerY = Math.sin(innerAngle) * particle.size * 0.5;
              ctx.lineTo(innerX, innerY);
            }
            ctx.closePath();
            ctx.fill();
            break;
            
          case 'heart':
            ctx.beginPath();
            ctx.scale(0.8, 0.8);
            ctx.moveTo(0, -particle.size * 0.5);
            ctx.bezierCurveTo(-particle.size, -particle.size * 1.5, -particle.size * 2, 0, 0, particle.size);
            ctx.bezierCurveTo(particle.size * 2, 0, particle.size, -particle.size * 1.5, 0, -particle.size * 0.5);
            ctx.closePath();
            ctx.fill();
            break;
            
          case 'hexagon':
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = (i * Math.PI * 2) / 6;
              const x = Math.cos(angle) * particle.size;
              const y = Math.sin(angle) * particle.size;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
            break;
            
          case 'pentagon':
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
              const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
              const x = Math.cos(angle) * particle.size;
              const y = Math.sin(angle) * particle.size;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
            break;
            
          case 'diamond':
            ctx.beginPath();
            ctx.moveTo(0, -particle.size);
            ctx.lineTo(particle.size, 0);
            ctx.lineTo(0, particle.size);
            ctx.lineTo(-particle.size, 0);
            ctx.closePath();
            ctx.fill();
            break;
            
          case 'plus':
            ctx.fillRect(-particle.size * 0.3, -particle.size, particle.size * 0.6, particle.size * 2);
            ctx.fillRect(-particle.size, -particle.size * 0.3, particle.size * 2, particle.size * 0.6);
            break;
            
          case 'cross':
            ctx.beginPath();
            ctx.moveTo(-particle.size, -particle.size);
            ctx.lineTo(particle.size, particle.size);
            ctx.moveTo(particle.size, -particle.size);
            ctx.lineTo(-particle.size, particle.size);
            ctx.lineWidth = particle.size * 0.3;
            ctx.lineCap = 'round';
            ctx.strokeStyle = particle.color;
            ctx.stroke();
            break;
        }
        
        // 恢复状态
        ctx.restore();
        ctx.globalAlpha = 1.0;
      });
      
      requestAnimationFrame(draw);
    };
    
    // 窗口大小变化处理
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', handleResize);
    
    draw();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0" 
      style={{ opacity: 1, pointerEvents: 'none' }}
    />
  );
};

export default SimpleParticles;