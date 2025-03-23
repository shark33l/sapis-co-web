import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrthographicCamera, Vector2 } from 'three';
import * as THREE from 'three';
import { rippleFragmentShader, rippleVertexShader, simulationFragmentShader, simulationVertexShader } from './Shader';

interface ShaderEffectProps {
  className?: string;
  isVisible: boolean;
  geometryArgs: [number, number];
}


export const ShaderEffect: React.FC<ShaderEffectProps> = ({
  // className,
  isVisible,
  geometryArgs
}) => {
  const { size, gl } = useThree();
  const frame = useRef(0);
  const mouse = useRef(new Vector2());
  const simScene = useRef(new THREE.Scene());
  const simMesh = useRef<THREE.Mesh>();
  const simmaterialUniforms = useRef({
    textureA: { value: null },
    mouse: { value: mouse.current },
    resolution: { value: new Vector2(size.width, size.height) },
    time: { value: 0 },
    frame: { value: 0 },
  })
  const camera = useRef(new OrthographicCamera(-1, 1, 1, -1, 0, 1));
  const renderTargets = useRef<[THREE.WebGLRenderTarget, THREE.WebGLRenderTarget]>();

  // Create shader material for the ripple effect
  const rippleBGMaterial = useRef<THREE.ShaderMaterial | null>(null);
  const rippleBGUniforms = useRef({
    textureA: { value: null },
    time: { value: 0 },
    resolution: { value: new THREE.Vector2(size.width, size.height) },
    mouse: { value: new THREE.Vector2() },
    colorA: { value: new THREE.Color("#1D1C4F") },
    colorB: { value: new THREE.Color("#0089CF") },
  })
  const currentMouse = useRef(new THREE.Vector2(size.width / 2, size.height / 2));
  const targetMouse = useRef(new THREE.Vector2(size.width / 2, size.height / 2));
  

  // Initialize render targets and meshes
  useMemo(() => {
    // Create render targets
    const width = size.width;
    const height = size.height;
    const options = {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      stencilBuffer: false,
      depthBuffer: false,
    };
    renderTargets.current = [
      new THREE.WebGLRenderTarget(width, height, options),
      new THREE.WebGLRenderTarget(width, height, options)
    ];

    // Create simulation mesh
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: simmaterialUniforms.current,
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    simScene.current.add(mesh);
    simMesh.current = mesh;

  }, [size]);

  useMemo(() => {
    rippleBGMaterial.current = new THREE.ShaderMaterial({
      uniforms: rippleBGUniforms.current,
      vertexShader: rippleVertexShader,
      fragmentShader: rippleFragmentShader,
      transparent: true,
    });
  }, [size]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = gl.domElement;
      const rect = canvas.getBoundingClientRect();

      // Get mouse position in pixels
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update mouse position
      mouse.current.x = x;
      mouse.current.y = rect.height - y; // Flip Y for WebGL
    };

    const handleMouseLeave = () => {
      mouse.current.set(-1000, -1000); // Move far off-screen
    };

    const canvas = gl.domElement;
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [gl]);

  useFrame((state) => {
    if (!isVisible) {
      return; // Skip frame rendering when the component is not visible
    }
    if (!renderTargets.current || !simMesh.current || !rippleBGMaterial.current) return;

    const [rtA, rtB] = renderTargets.current;

    // Update simulation uniforms
    const simMaterial = simMesh.current.material as THREE.ShaderMaterial;
    simMaterial.uniforms.frame.value = frame.current++;
    simMaterial.uniforms.time.value = performance.now() / 1000;
    simMaterial.uniforms.textureA.value = rtA.texture;
    simMaterial.uniforms.mouse.value = mouse.current;

    // Render simulation
    gl.setRenderTarget(rtB);
    gl.render(simScene.current, camera.current);

    // Update final render material
    // Update ripple background material dynamically
    // Ripple Related Only
    rippleBGMaterial.current.uniforms.time.value += 0.01;
    rippleBGMaterial.current.uniforms.resolution.value.set(size.width, size.height);
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

    rippleBGMaterial.current.uniforms.mouse.value.copy(currentMouse.current);
    rippleBGMaterial.current.uniforms.textureA.value = rtB.texture;

    // Render to screen
    gl.setRenderTarget(null);
    gl.render(simScene.current, camera.current);

    // Swap buffers
    renderTargets.current = [rtB, rtA];
  });

  return (
    <mesh>
      <planeGeometry args={geometryArgs} />
      {rippleBGMaterial.current && <primitive object={rippleBGMaterial.current} attach="material" />}
    </mesh>
  );
};

interface OilRippleSceneProps {
  className?: string;
}

const OilRippleScene: React.FC<OilRippleSceneProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [geometryArgs, setGeometryArgs] = useState<[number, number]>([2, 2]);

  const updateShaderAspectRatio = () => {
    if (canvasRef.current) {
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;

      // Calculate geometry args based on aspect ratio
      let newArgs: [number, number] = [2, 2]; // Default values

      if (width > height) {
        newArgs = [Math.round(width / height * 2), 2];
      } else {
        newArgs = [2, 2];
      }

      setGeometryArgs(newArgs);
    }
  };

  useEffect(() => {
    // Initial setup to call the function when the component is mounted
    updateShaderAspectRatio(); // Set initial aspect ratio on mount

    // Resize event listener
    const handleResize = () => {
      updateShaderAspectRatio();
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1 } // Trigger when at least 10% of the element is in view
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => {
      if (canvasRef.current) {
        observer.unobserve(canvasRef.current);
      }
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={canvasRef}>
      <Canvas

        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'transparent'
        }}
        gl={{
          antialias: false,
          alpha: true,
          preserveDrawingBuffer: true
        }}
        camera={{ position: [0, 0, 1] }}
      >
        <ShaderEffect isVisible={isVisible} geometryArgs={geometryArgs} />
      </Canvas>
    </div>
  );
};

export default OilRippleScene;