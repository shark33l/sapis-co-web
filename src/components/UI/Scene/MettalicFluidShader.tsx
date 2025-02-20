import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

const RainRippleMaterial = shaderMaterial(
  { time: 0, mouse: new THREE.Vector2() },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float time;
    uniform vec2 mouse;
    varying vec2 vUv;
    
    void main() {
      vec2 uv = vUv;
      float dist = distance(uv, mouse);
      float ripple = sin(10.0 * dist - time * 5.0) / (10.0 * dist + 1.0);
      vec3 color = vec3(0.1, 0.2, 0.5) + ripple;
      gl_FragColor = vec4(color, 1.0);
    }
  `
);

// Declare the JSX element for our custom material
declare global {
    namespace JSX {
      interface IntrinsicElements {
        rainRippleMaterial: any;
      }
    }
  }

const RainRippleEffect = () => {
  const ref = useRef<any>();
  const mouse = useRef(new THREE.Vector2());

  useFrame(({ clock, pointer }) => {
    if (ref.current) {
      ref.current.time = clock.getElapsedTime();
      ref.current.mouse.set(pointer.x, pointer.y);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <rainRippleMaterial ref={ref} />
    </mesh>
  );
};

const RippleCanvas = () => {
  return (
    <div className="fixed inset-0 z-[-1]">
      <canvas className="w-full h-full" />
      <Suspense fallback={null}>
        <RainRippleEffect />
      </Suspense>
    </div>
  );
};

export default RippleCanvas;
