import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import type { ShaderMaterial } from "three";

type LiquidMaterialImpl = ShaderMaterial & {
  time: number;
  resolution: THREE.Vector2;
  mouse: THREE.Vector2;
  colorA: THREE.Color;
  colorB: THREE.Color;
};

const LiquidMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector2(0, 0),
    mouse: new THREE.Vector2(0, 0),
    colorA: new THREE.Color("#1D1C4F"),
    colorB: new THREE.Color("#0089CF"),
  },
  // Vertex Shader
  `
    void main() {
      gl_Position = vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    uniform vec2 resolution;
    uniform vec2 mouse;
    uniform vec3 colorA;
    uniform vec3 colorB;
    
    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      vec2 mouse_norm = mouse / resolution;  // Convert mouse to normalized UV space

      // Calculate distance from current pixel to mouse position
      float dist = length(uv - mouse_norm);
      
      // Create a smoother ripple effect
      float ripple = sin(dist * 40.0 - time * 3.0) * 0.5 + 0.5;
      ripple *= exp(-dist * 1.0); // Softer distance falloff
      
      // Base liquid movement
      float noise1 = sin(uv.x * 10.0 + time) * 0.5 + 0.5;
      float noise2 = cos(uv.y * 8.0 - time * 0.5) * 0.5 + 0.5;
      float noise3 = sin((uv.x + uv.y) * 5.0 + time * 0.7) * 0.5 + 0.5;
      
      float mixValue = noise1 * noise2 * noise3;
      mixValue = mixValue + ripple * 0.8; // Enhance ripple effect
      mixValue = smoothstep(0.2, 0.8, mixValue);
      
      vec3 color = mix(colorA, colorB, mixValue);
      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ LiquidMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      liquidMaterial: any;
    }
  }
}

const LiquidPlane = () => {
  const materialRef = useRef<LiquidMaterialImpl>(null);
  const { size } = useThree();
  const currentMouse = useRef(new THREE.Vector2(size.width / 2, size.height / 2));
  const targetMouse = useRef(new THREE.Vector2(size.width / 2, size.height / 2));
  const isMouseOver = useRef(false);

  // Smooth movement
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time += 0.01;
      materialRef.current.resolution.set(size.width, size.height);
  
      // Convert Three.js pointer coordinates to screen coordinates
      const x = (state.pointer.x * 0.5 + 0.5) * size.width;
      const y = (1 - (state.pointer.y * -0.5 + 0.6)) * size.height; // Flip Y-axis properly
  
      // Compute mouse velocity (speed)
      const dx = x - targetMouse.current.x;
      const dy = y - targetMouse.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
  
      // Dynamic easing function for a more organic lag
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3); // Cubic ease-out
  
      // Map speed to an adaptive smoothing factor
      const minLerp = 0.01; // Minimum smoothness (very slow catch-up)
      const maxLerp = 0.05; // Maximum smoothness (when moving fast)
      const normalizedSpeed = Math.min(speed / 200, 1); // Clamp speed normalization
      const lerpFactor = minLerp + easeOutCubic(normalizedSpeed) * (maxLerp - minLerp);
  
      // Update target mouse position
      targetMouse.current.set(x, y);
  
      // Apply smoother interpolation
      currentMouse.current.lerp(targetMouse.current, lerpFactor);
      materialRef.current.mouse.copy(currentMouse.current);
    }
  });
  

  const handlePointerMove = () => {
    isMouseOver.current = true;
  };

  const handlePointerLeave = () => {
    isMouseOver.current = false;
    targetMouse.current.set(size.width / 2, size.height / 2);
  };

  return (
    <mesh onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <planeGeometry args={[10, 10]} />
      <liquidMaterial ref={materialRef} />
    </mesh>
  );
};

interface LiquidShaderProps {
  className?: string;
}

const LiquidShader: React.FC<LiquidShaderProps> = ({ className }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        camera={{ position: [0, 0, 1] }}
      >
        <LiquidPlane />
      </Canvas>
    </div>
  );
};

export default LiquidShader;
