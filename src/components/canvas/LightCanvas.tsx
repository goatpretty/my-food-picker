import { useEffect, useRef } from 'react';

const LightCanvas: React.FC = () => {
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
    
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
    }
    
    let particles: Particle[] = [];
    
    // 初始化粒子
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        });
      }
    };
    
    // 绘制粒子
    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // 更新位置
        p.x += p.vx;
        p.y += p.vy;
        
        // 边界检测
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        
        // 绘制粒子
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.fill();
        
        // 绘制连接线
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = dx * dx + dy * dy;
          
          if (dist < 15000) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 0, 0, ${0.08 - dist / 15000})`;
            ctx.stroke();
          }
        }
      }
    };
    
    // 动画循环
    const animate = () => {
      const isLight = document.body.getAttribute('data-theme') === 'light';
      if (isLight) {
        drawParticles();
      }
      requestAnimationFrame(animate);
    };
    
    // 窗口大小变化处理
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };
    
    window.addEventListener('resize', handleResize);
    
    initParticles();
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <canvas ref={canvasRef} id="light-canvas" className="absolute inset-0 block" style={{ opacity: 1, pointerEvents: 'auto' }} />;
};

export default LightCanvas;