import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';
import type { ShaderMaterial } from 'three';

type LiquidMaterialImpl = ShaderMaterial & {
  time: number;
  resolution: THREE.Vector2;
  mouse: THREE.Vector2;
  colorA: THREE.Color;
  colorB: THREE.Color;
};

// Create custom shader material
const LiquidMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector2(0, 0),
    mouse: new THREE.Vector2(0, 0),
    colorA: new THREE.Color('#1D1C4F'),
    colorB: new THREE.Color('#0089CF')
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
      vec2 mouse_norm = mouse.xy / resolution.xy;
      
      float dist = distance(uv, mouse) * 2.0;
      
      float noise1 = sin(uv.x * 10.0 + time) * 0.5 + 0.5;
      float noise2 = cos(uv.y * 8.0 - time * 0.5) * 0.5 + 0.5;
      float noise3 = sin((uv.x + uv.y) * 5.0 + time * 0.7) * 0.5 + 0.5;
      
      float mouseEffect = smoothstep(0.5, 0.0, dist) * 0.5;
      
      float mixValue = noise1 * noise2 * noise3 + mouseEffect;
      mixValue = smoothstep(0.2, 0.8, mixValue);
      
      vec3 color = mix(colorA, colorB, mixValue);
      gl_FragColor = vec4(color, 1.0);
    }
  `
);

// Extend drei with our custom material
extend({ LiquidMaterial });

// Declare the JSX element for our custom material
declare global {
  namespace JSX {
    interface IntrinsicElements {
      liquidMaterial: any;
    }
  }
}

const LiquidPlane: React.FC = () => {
  const materialRef = useRef<LiquidMaterialImpl>(null);
  const { viewport, size } = useThree();
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time += 0.01;
      materialRef.current.resolution.set(size.width, size.height);
    }
  });

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (materialRef.current) {
      const x = (e.point.x + viewport.width / 2);
      const y = (viewport.height / 2 - e.point.y);
      materialRef.current.mouse.set(x, y);
      console.log(e)
    }
  };

  return (
    <mesh onPointerMove={handlePointerMove}>
      <planeGeometry args={[10,10]} />
      <liquidMaterial ref={materialRef} />
    </mesh>
  );
};

interface LiquidSceneProps {
  className?: string;
}

const LiquidScene: React.FC<LiquidSceneProps> = ({ className }) => {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'transparent'
        }}
        camera={{ position: [0, 0, 1] }}
      >
        <LiquidPlane />
      </Canvas>
    </div>
  );
};

export default LiquidScene;