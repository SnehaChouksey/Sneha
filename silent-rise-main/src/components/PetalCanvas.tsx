import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Petal({ position, rotation, speed, amplitude, phase }: {
  position: [number, number, number];
  rotation: [number, number, number];
  speed: number;
  amplitude: number;
  phase: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Petal shape: ellipse-like using a rounded plane
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.6);
    s.bezierCurveTo(0.25, 0.5, 0.3, 0.1, 0, -0.4);
    s.bezierCurveTo(-0.3, 0.1, -0.25, 0.5, 0, 0.6);
    return s;
  }, []);

  const geometry = useMemo(() => new THREE.ShapeGeometry(shape), [shape]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.position.y =
      position[1] + Math.sin(t * speed + phase) * amplitude;
    meshRef.current.position.x =
      position[0] + Math.cos(t * speed * 0.7 + phase) * 0.4;
    meshRef.current.rotation.z = rotation[2] + Math.sin(t * speed * 0.5 + phase) * 0.4;
    meshRef.current.rotation.y = t * speed * 0.3 + phase;
    // Slow fall
    meshRef.current.position.y -= (t * 0.015) % 20;
    if (meshRef.current.position.y < -8) {
      meshRef.current.position.y = 10;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} geometry={geometry}>
      <meshStandardMaterial
        color="#f5c542"
        emissive="#e89b1a"
        emissiveIntensity={0.25}
        side={THREE.DoubleSide}
        transparent
        opacity={0.75}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
}

function PetalField({ count = 30 }: { count?: number }) {
  const petals = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 5,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
      speed: 0.15 + Math.random() * 0.3,
      amplitude: 0.2 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    })),
  [count]);

  return (
    <>
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#ffd97a" />
      {petals.map((p) => (
        <Petal key={p.id} {...p} />
      ))}
    </>
  );
}

export function PetalCanvas({ className = "" }: { className?: string }) {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) setHasWebGL(false);
  }, []);

  if (!hasWebGL) return null;

  return (
    <div className={`pointer-events-none overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
        dpr={[1, 2]} // Limit DPR for performance
      >
        <PetalField count={30} />
      </Canvas>
    </div>
  );
}
