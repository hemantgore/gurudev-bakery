'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, useGLTF } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect, useLayoutEffect, Suspense, Component, type ReactNode } from 'react';
import * as THREE from 'three';

// Drop a realistic cake mesh here (e.g. a Sketchfab/CGTrader .glb) and it takes over
// the procedural cake automatically. If the file is missing or fails to load, the
// procedural cake below is rendered instead — the hero never breaks.
const CAKE_MODEL_URL = '/cake.glb';

const PALETTE = [
    new THREE.Color('#f59e0b'),
    new THREE.Color('#fbbf24'),
    new THREE.Color('#fef3c7'),
    new THREE.Color('#fde68a'),
];

type Sprinkle = { r: number; theta: number; phi: number; speed: number; color: THREE.Color };

function buildSprinkles(count: number): Sprinkle[] {
    const out: Sprinkle[] = [];
    let seed = 1337;
    const rand = () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    };
    for (let i = 0; i < count; i++) {
        out.push({
            r: 1.5 + rand() * 1.5,
            theta: rand() * Math.PI * 2,
            phi: Math.acos(2 * rand() - 1),
            speed: 0.2 + rand() * 0.4,
            color: PALETTE[Math.floor(rand() * PALETTE.length)],
        });
    }
    return out;
}

function Sprinkles({ count = 60 }: { count?: number }) {
    const ref = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const positions = useMemo(() => buildSprinkles(count), [count]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        positions.forEach((p, i) => {
            const theta = p.theta + t * p.speed * 0.2;
            const x = p.r * Math.sin(p.phi) * Math.cos(theta);
            const y = p.r * Math.cos(p.phi) + Math.sin(t * p.speed) * 0.15;
            const z = p.r * Math.sin(p.phi) * Math.sin(theta);
            dummy.position.set(x, y, z);
            dummy.rotation.set(t * p.speed, t * p.speed * 0.5, 0);
            dummy.scale.setScalar(0.06);
            dummy.updateMatrix();
            ref.current?.setMatrixAt(i, dummy.matrix);
            ref.current?.setColorAt(i, p.color);
        });
        if (ref.current) {
            ref.current.instanceMatrix.needsUpdate = true;
            if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
        }
    });

    return (
        <instancedMesh ref={ref} args={[undefined, undefined, count]}>
            <capsuleGeometry args={[0.4, 1.2, 4, 8]} />
            <meshStandardMaterial roughness={0.3} metalness={0.1} />
        </instancedMesh>
    );
}

// Auto-rotating, gently floating wrapper shared by both the GLTF and procedural cakes.
function RotatingFloat({ children }: { children: ReactNode }) {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!group.current) return;
        const t = state.clock.getElapsedTime();
        group.current.rotation.y = t * 0.25;
    });

    return (
        <group ref={group}>
            <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
                {children}
            </Float>
        </group>
    );
}

function ProceduralCake() {
    return (
        <RotatingFloat>
            <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[1.1, 1.15, 0.7, 64]} />
                <meshStandardMaterial color="#3a1f0d" roughness={0.55} />
            </mesh>
            <mesh position={[0, 0.05, 0]} castShadow>
                <cylinderGeometry args={[1.13, 1.13, 0.18, 64]} />
                <meshStandardMaterial color="#fef3c7" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.45, 0]} castShadow>
                <cylinderGeometry args={[0.8, 0.9, 0.45, 64]} />
                <meshPhysicalMaterial
                    color="#f59e0b"
                    roughness={0.18}
                    metalness={0.1}
                    clearcoat={0.8}
                    clearcoatRoughness={0.2}
                />
            </mesh>
            <mesh position={[0, 0.78, 0]} castShadow>
                <torusGeometry args={[0.32, 0.07, 16, 64]} />
                <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.4} />
            </mesh>
            <Sprinkles count={50} />
        </RotatingFloat>
    );
}

// Loads the real cake mesh, auto-centers it at the origin and scales it to a fixed
// target size so any asset (regardless of its native units) frames correctly.
function GLTFModel({ url }: { url: string }) {
    const { scene } = useGLTF(url, true);
    const ref = useRef<THREE.Group>(null);

    const cloned = useMemo(() => {
        const copy = scene.clone(true);
        copy.traverse((obj) => {
            if ((obj as THREE.Mesh).isMesh) {
                obj.castShadow = true;
                obj.receiveShadow = true;
            }
        });
        return copy;
    }, [scene]);

    useLayoutEffect(() => {
        if (!ref.current) return;
        const box = new THREE.Box3().setFromObject(ref.current);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scale = 2.4 / maxDim;
        ref.current.scale.setScalar(scale);
        ref.current.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    }, [cloned]);

    return <primitive ref={ref} object={cloned} />;
}

function GLTFCake() {
    return (
        <RotatingFloat>
            <GLTFModel url={CAKE_MODEL_URL} />
            <Sprinkles count={50} />
        </RotatingFloat>
    );
}

// Renders the realistic GLTF cake; if the model is missing or errors while loading,
// quietly falls back to the procedural cake instead of breaking the hero.
class ModelFallbackBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
    state = { hasError: false };
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error: Error) {
        console.warn('[HeroScene] cake model unavailable, using procedural cake:', error.message);
    }
    render() {
        if (this.state.hasError) return <ProceduralCake />;
        return this.props.children;
    }
}

function Cake() {
    return (
        <ModelFallbackBoundary>
            {/* Procedural cake shows instantly while the GLTF streams in. */}
            <Suspense fallback={<ProceduralCake />}>
                <GLTFCake />
            </Suspense>
        </ModelFallbackBoundary>
    );
}

// Pure-CSS fallback so we never show a white box even if WebGL is unavailable / lost.
function CSSFallback() {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-3/4 aspect-square">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 animate-pulse" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 opacity-70" />
                <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-amber-200 to-amber-400 opacity-60" />
                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background:
                            'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.45), transparent 40%)',
                    }}
                />
            </div>
        </div>
    );
}

class CanvasErrorBoundary extends Component<{ children: ReactNode; onError: () => void }, { hasError: boolean }> {
    state = { hasError: false };
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error: Error) {
        console.warn('[HeroScene] WebGL canvas error, falling back to CSS:', error.message);
        this.props.onError();
    }
    render() {
        if (this.state.hasError) return null;
        return this.props.children;
    }
}

export default function HeroScene() {
    // Detect WebGL availability once on mount; mount key forces a fresh canvas after context loss.
    const [webglOk, setWebglOk] = useState<boolean | null>(null);
    const [mountKey, setMountKey] = useState(0);

    useEffect(() => {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
            setWebglOk(!!gl);
        } catch {
            setWebglOk(false);
        }
    }, []);

    if (webglOk === false) return <CSSFallback />;
    if (webglOk === null) return null; // brief no-op while detecting; parent's dark bg shows

    return (
        <CanvasErrorBoundary onError={() => setWebglOk(false)}>
            <Canvas
                key={mountKey}
                dpr={[1, 1.5]}
                camera={{ position: [0, 0.6, 4.2], fov: 38 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                style={{ background: 'transparent' }}
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0); // ensure fully transparent clear
                    const canvasEl = gl.domElement;
                    const onLost = (e: Event) => {
                        e.preventDefault();
                        console.warn('[HeroScene] WebGL context lost, scheduling remount');
                        setTimeout(() => setMountKey((k) => k + 1), 400);
                    };
                    canvasEl.addEventListener('webglcontextlost', onLost, false);
                }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 6, 4]} intensity={1.4} />
                <directionalLight position={[-4, -2, -3]} intensity={0.5} color="#fbbf24" />
                <Cake />
                <Environment preset="sunset" />
            </Canvas>
        </CanvasErrorBoundary>
    );
}
