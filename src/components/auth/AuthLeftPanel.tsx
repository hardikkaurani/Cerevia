'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Logo } from '@/components/layout/Logo';
import { usePathname } from 'next/navigation';

export function AuthLeftPanel() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pathname = usePathname();

  // Get dynamic titles and subtitles based on route
  const getPanelText = () => {
    switch (pathname) {
      case '/register':
        return {
          title: 'Create your Account',
          subtitle: 'Track your learning streaks and rank up in our gamified platform!',
        };
      case '/forgot-password':
        return {
          title: 'Password Recovery',
          subtitle: 'Retrieve your account access and get back to your learning streak.',
        };
      case '/reset-password':
        return {
          title: 'Secure Account',
          subtitle: 'Create a new secure password to safeguard your achievements.',
        };
      case '/login':
      default:
        return {
          title: 'Welcome Back',
          subtitle: 'Keep your learning streak alive and climb the global leaderboard!',
        };
    }
  };

  const { title, subtitle } = getPanelText();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    let width = container.clientWidth;
    let height = container.clientHeight;
    
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 15);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Wave Grid / Particles
    const countX = 65;
    const countY = 65;
    const numParticles = countX * countY;

    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);

    // Initial positioning & styling
    let idx = 0;
    const colorCyan = new THREE.Color('#06b6d4');
    const colorBlue = new THREE.Color('#3b82f6');
    const colorIndigo = new THREE.Color('#6366f1');

    for (let x = 0; x < countX; x++) {
      for (let y = 0; y < countY; y++) {
        // Grid spacing centered around (0,0)
        const posX = (x - countX / 2) * 0.4;
        const posY = (y - countY / 2) * 0.4;

        positions[idx] = posX;
        positions[idx + 1] = posY;
        positions[idx + 2] = 0;

        // Blending colors based on coordinates
        const ratio = x / countX;
        const color = new THREE.Color();
        if (ratio < 0.5) {
          color.lerpColors(colorCyan, colorBlue, ratio * 2);
        } else {
          color.lerpColors(colorBlue, colorIndigo, (ratio - 0.5) * 2);
        }

        colors[idx] = color.r;
        colors[idx + 1] = color.g;
        colors[idx + 2] = color.b;

        idx += 3;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom shader material for glowing round points
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        varying vec3 vColor;
        varying float vElevation;

        void main() {
          vColor = color;
          
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          
          // Wave equations (multiple overlapping sine waves for organic fluid motion)
          float elevation = sin(modelPosition.x * 0.2 + uTime * 0.5) * 0.8;
          elevation += cos(modelPosition.y * 0.2 + uTime * 0.4) * 0.8;
          elevation += sin((modelPosition.x + modelPosition.y) * 0.1 + uTime * 0.6) * 0.5;
          
          // Mouse interaction (displace height based on proximity to mouse)
          float dist = distance(modelPosition.xy, uMouse * 10.0);
          if (dist < 8.0) {
            float strength = (8.0 - dist) / 8.0;
            elevation += sin(uTime * 2.0) * strength * 1.5;
          }

          modelPosition.z += elevation;
          vElevation = elevation;

          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          
          gl_Position = projectedPosition;
          
          // Size attenuation
          gl_PointSize = (12.0 + elevation * 4.0) * (1.0 / -viewPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vElevation;

        void main() {
          // Circular particle shape
          float dist = distance(gl_PointCoord, vec2(0.5));
          if (dist > 0.5) {
            discard;
          }
          
          // Soft glowing edges
          float glow = 1.0 - (dist * 2.0);
          glow = pow(glow, 1.5);
          
          // Brightness boost based on elevation
          vec3 finalColor = vColor * (1.0 + vElevation * 0.2);
          gl_FragColor = vec4(finalColor, glow * 0.85);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 3. Ambient / Background glowing orb meshes
    const backgroundGeo1 = new THREE.SphereGeometry(6, 32, 32);
    const backgroundMat1 = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
    });
    const orb1 = new THREE.Mesh(backgroundGeo1, backgroundMat1);
    orb1.position.set(-5, 3, -5);
    scene.add(orb1);

    const backgroundGeo2 = new THREE.SphereGeometry(8, 32, 32);
    const backgroundMat2 = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
    });
    const orb2 = new THREE.Mesh(backgroundGeo2, backgroundMat2);
    orb2.position.set(5, -4, -8);
    scene.add(orb2);

    // 4. Mouse tracking & interaction
    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -((e.clientY - rect.top) / height) * 2 + 1;
      targetMouse.set(x, y);
    };

    container.addEventListener('mousemove', handleMouseMove);

    // 5. Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 6. Animation Loop
    let time = 0;
    let animationFrameId: number;

    const animate = () => {
      time += 0.02;
      material.uniforms.uTime.value = time;

      // Smooth mouse interpolation
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;
      material.uniforms.uMouse.value.copy(mouse);

      // Rotate particles slightly for dynamic flow
      particles.rotation.z = time * 0.02;
      particles.rotation.x = Math.sin(time * 0.05) * 0.08;

      // Animate background orbs
      orb1.position.x = -5 + Math.sin(time * 0.2) * 2;
      orb1.position.y = 3 + Math.cos(time * 0.3) * 1.5;

      orb2.position.x = 5 + Math.cos(time * 0.15) * 2;
      orb2.position.y = -4 + Math.sin(time * 0.25) * 1.5;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      
      // Memory cleanup
      geometry.dispose();
      material.dispose();
      backgroundGeo1.dispose();
      backgroundMat1.dispose();
      backgroundGeo2.dispose();
      backgroundMat2.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative hidden md:flex md:w-1/2 bg-gray-950 overflow-hidden flex-col justify-between p-12 text-white select-none group animate-fade-in"
    >
      {/* Background canvas fluid WebGL/Three.js animation */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full pointer-events-none" />

      {/* Glossy mesh lighting layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.12),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.15),transparent_50%)] pointer-events-none" />

      {/* Top logo branding */}
      <div className="relative z-10 flex flex-col gap-1.5 animate-fade-in">
        <Logo showText={true} />
        <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest font-mono">
          Gamification Platform
        </span>
      </div>

      {/* Middle/Bottom typography message */}
      <div className="relative z-10 max-w-sm mt-auto animate-fade-in-up">
        <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight font-sans drop-shadow-sm">
          {title}
        </h2>
        <p className="mt-3 text-sm text-gray-300 font-medium leading-relaxed drop-shadow-sm">
          {subtitle}
        </p>
      </div>

      {/* Fine-grained border highlights for glassmorphic edge */}
      <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent" />
    </div>
  );
}
