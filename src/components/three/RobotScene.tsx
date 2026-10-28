"use client";
/* eslint-disable react-hooks/immutability -- three.js objects are mutated imperatively inside useFrame, which is the intended R3F pattern */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------
   Shared materials & helpers
------------------------------------------------------------------- */

const BLUE = new THREE.Color("#3d9bff");
const BLUE_HOT = new THREE.Color("#7cc4ff");

function useMaterials() {
  return useMemo(
    () => ({
      shell: new THREE.MeshPhysicalMaterial({
        color: "#e8edf6",
        roughness: 0.22,
        metalness: 0.18,
        clearcoat: 0.9,
        clearcoatRoughness: 0.12,
      }),
      shellShade: new THREE.MeshPhysicalMaterial({ color: "#b9c3d4", roughness: 0.38, metalness: 0.2, clearcoat: 0.5 }),
      metal: new THREE.MeshStandardMaterial({ color: "#151b29", roughness: 0.32, metalness: 0.85 }),
      metalLight: new THREE.MeshStandardMaterial({ color: "#3a4357", roughness: 0.3, metalness: 0.9 }),
      visor: new THREE.MeshPhysicalMaterial({
        color: "#02040a",
        roughness: 0.06,
        metalness: 0.7,
        clearcoat: 1,
        clearcoatRoughness: 0.02,
      }),
      glow: new THREE.MeshBasicMaterial({ color: BLUE, toneMapped: false }),
      glowSoft: new THREE.MeshBasicMaterial({ color: "#1d5cff", toneMapped: false, transparent: true, opacity: 0.55 }),
    }),
    [],
  );
}

type Mats = ReturnType<typeof useMaterials>;

function useGlowTexture() {
  return useMemo(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.2, "rgba(140,200,255,0.65)");
    g.addColorStop(0.5, "rgba(40,110,255,0.18)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function Glow({ texture, scale = 1, opacity = 1, color = "#5aa8ff", position }: { texture: THREE.Texture; scale?: number; opacity?: number; color?: string; position?: [number, number, number] }) {
  return (
    <sprite position={position} scale={[scale, scale, 1]}>
      <spriteMaterial map={texture} color={color} transparent opacity={opacity} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
    </sprite>
  );
}

/** A capsule spanning two points. */
function Limb({ from, to, radius, material }: { from: THREE.Vector3; to: THREE.Vector3; radius: number; material: THREE.Material }) {
  const { position, quaternion, length } = useMemo(() => {
    const dir = new THREE.Vector3().subVectors(to, from);
    const len = dir.length();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    return { position: from.clone().add(to).multiplyScalar(0.5), quaternion: q, length: len };
  }, [from, to]);
  return (
    <mesh position={position} quaternion={quaternion} material={material} castShadow>
      <capsuleGeometry args={[radius, Math.max(0.01, length - radius * 2), 10, 32]} />
    </mesh>
  );
}

/** A tube cable through points. */
function Cable({ points, radius = 0.025, material }: { points: [number, number, number][]; radius?: number; material: THREE.Material }) {
  const geo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
    return new THREE.TubeGeometry(curve, 40, radius, 10, false);
  }, [points, radius]);
  return <mesh geometry={geo} material={material} />;
}

/* ------------------------------------------------------------------
   Head
------------------------------------------------------------------- */

function Head({ mats, glowTex, pointer, reduced }: { mats: Mats; glowTex: THREE.Texture; pointer: MutableRefObject<{ x: number; y: number }>; reduced: boolean }) {
  const pivot = useRef<THREE.Group>(null);
  const eye = useRef<THREE.Mesh>(null);
  const earOuter = useRef<THREE.Mesh>(null);
  const earInner = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const glowAmt = useRef(0);

  const eyeMat = useMemo(() => mats.glow.clone(), [mats]);
  const visorGeo = useMemo(
    () => new THREE.SphereGeometry(0.6, 64, 40, Math.PI / 2 - 1.12, 2.12, 0.88, 1.08),
    [],
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (!pivot.current) return;
    const baseYaw = -0.82;
    const basePitch = 0.2;
    const targetYaw = baseYaw + pointer.current.x * 0.38;
    const targetPitch = basePitch - pointer.current.y * 0.22 + (reduced ? 0 : Math.sin(t * 0.6) * 0.02);
    const k = 1 - Math.exp(-delta * 3.2);
    pivot.current.rotation.y += (targetYaw - pivot.current.rotation.y) * k;
    pivot.current.rotation.x += (targetPitch - pivot.current.rotation.x) * k;
    pivot.current.rotation.z += (-pointer.current.x * 0.06 - pivot.current.rotation.z) * k;

    glowAmt.current += ((hovered ? 1 : 0) - glowAmt.current) * k;
    if (eye.current) {
      // Occasional blink
      const blink = reduced ? 1 : Math.abs(Math.sin(t * 0.37)) > 0.995 ? 0.15 : 1;
      eye.current.scale.y += (blink - eye.current.scale.y) * 0.5;
      (eye.current.material as THREE.MeshBasicMaterial).color.lerpColors(BLUE, BLUE_HOT, glowAmt.current);
    }
    if (earOuter.current && !reduced) earOuter.current.rotation.z = t * (0.6 + glowAmt.current * 2.5);
    if (earInner.current && !reduced) earInner.current.rotation.z = -t * (1 + glowAmt.current * 3);
  });

  return (
    <group position={[1.42, 0.78, 0]} scale={1.12}>
      <group
        ref={pivot}
        rotation={[0.2, -0.82, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        {/* Cranium */}
        <mesh material={mats.shell} scale={[0.9, 1.0, 1.0]}>
          <sphereGeometry args={[0.62, 64, 64]} />
        </mesh>
        {/* Panel seams */}
        <mesh material={mats.metal} rotation={[0, Math.PI / 2, 0]} position={[0.2, 0, -0.05]} scale={[1, 1.0, 0.9]}>
          <torusGeometry args={[0.575, 0.007, 8, 96]} />
        </mesh>
        <mesh material={mats.metal} rotation={[Math.PI / 2 - 0.25, 0, 0]} position={[0, 0.18, 0]} scale={[0.9, 1, 1]}>
          <torusGeometry args={[0.6, 0.006, 8, 96]} />
        </mesh>
        {/* Crown fin */}
        <mesh material={mats.shellShade} position={[0, 0.52, -0.12]} rotation={[0.5, 0, 0]} scale={[0.22, 0.12, 0.55]}>
          <sphereGeometry args={[0.5, 32, 32]} />
        </mesh>

        {/* Visor */}
        <mesh geometry={visorGeo} material={mats.visor} scale={[0.93, 1.03, 1.06]} />
        {/* Visor glint */}
        <mesh position={[-0.05, 0.12, 0.6]} rotation={[0, 0, -0.5]}>
          <planeGeometry args={[0.32, 0.015]} />
          <meshBasicMaterial color="#9fc8ff" transparent opacity={0.35} toneMapped={false} />
        </mesh>
        {/* Eye: a soft "C" arc of light */}
        <mesh ref={eye} position={[0.13, 0.06, 0.615]} rotation={[0, 0.25, Math.PI * 0.85]} material={eyeMat}>
          <torusGeometry args={[0.085, 0.017, 12, 48, Math.PI * 1.25]} />
        </mesh>
        <Glow texture={glowTex} position={[0.13, 0.06, 0.66]} scale={0.55} opacity={0.75} />
        {/* Second, dimmer eye on far side */}
        <mesh position={[-0.2, 0.06, 0.6]} rotation={[0, -0.5, Math.PI * 0.85]} material={mats.glowSoft}>
          <torusGeometry args={[0.06, 0.012, 10, 32, Math.PI * 1.2]} />
        </mesh>

        {/* Jaw */}
        <mesh material={mats.shell} position={[0, -0.36, 0.2]} scale={[0.72, 0.5, 0.78]}>
          <sphereGeometry args={[0.45, 48, 48]} />
        </mesh>
        <mesh material={mats.metal} position={[0.02, -0.42, 0.42]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[0.16, 0.02, 0.06]} />
        </mesh>

        {/* Ear module with glowing rings */}
        <group position={[0.53, 0.0, -0.02]} rotation={[0, Math.PI / 2, 0]}>
          <mesh material={mats.shell} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.32, 0.08, 64]} />
          </mesh>
          <mesh material={mats.metal} position={[0, 0, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.24, 0.25, 0.06, 64]} />
          </mesh>
          <mesh ref={earOuter} position={[0, 0, 0.085]} material={mats.glow}>
            <torusGeometry args={[0.19, 0.016, 12, 72, Math.PI * 1.7]} />
          </mesh>
          <mesh ref={earInner} position={[0, 0, 0.09]} material={mats.glow}>
            <torusGeometry args={[0.105, 0.012, 10, 56, Math.PI * 1.4]} />
          </mesh>
          <mesh position={[0, 0, 0.088]} material={mats.glowSoft}>
            <circleGeometry args={[0.05, 32]} />
          </mesh>
          <Glow texture={glowTex} position={[0, 0, 0.16]} scale={0.9} opacity={0.6} />
        </group>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------
   Body, arm and hand
------------------------------------------------------------------- */

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

function Finger({ mats, length, curl, position, rotation, radius = 0.032 }: { mats: Mats; length: number; curl: number; position: [number, number, number]; rotation?: [number, number, number]; radius?: number }) {
  const seg = [length * 0.42, length * 0.32, length * 0.26];
  return (
    <group position={position} rotation={rotation}>
      <mesh material={mats.metal}>
        <sphereGeometry args={[radius * 1.15, 16, 16]} />
      </mesh>
      <group rotation={[0, 0, -curl * 0.6]}>
        <mesh material={mats.shell} position={[-seg[0] / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[radius, seg[0] - radius, 6, 16]} />
        </mesh>
        <group position={[-seg[0], 0, 0]} rotation={[0, 0, -curl]}>
          <mesh material={mats.metal}>
            <sphereGeometry args={[radius * 0.95, 14, 14]} />
          </mesh>
          <mesh material={mats.shell} position={[-seg[1] / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <capsuleGeometry args={[radius * 0.92, seg[1] - radius, 6, 16]} />
          </mesh>
          <group position={[-seg[1], 0, 0]} rotation={[0, 0, -curl * 1.1]}>
            <mesh material={mats.metal}>
              <sphereGeometry args={[radius * 0.85, 12, 12]} />
            </mesh>
            <mesh material={mats.shell} position={[-seg[2] / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <capsuleGeometry args={[radius * 0.85, seg[2] - radius * 0.8, 6, 16]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

function Hand({ mats, glowTex }: { mats: Mats; glowTex: THREE.Texture }) {
  return (
    <group position={[-0.38, -1.2, 0.98]} rotation={[0.42, 0.15, 0.08]} scale={1.4}>
      {/* Palm */}
      <RoundedBox args={[0.44, 0.1, 0.4]} radius={0.045} smoothness={4} material={mats.shell} />
      <mesh material={mats.metal} position={[0, 0.052, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.12, 40]} />
      </mesh>
      <mesh material={mats.glow} position={[0, 0.056, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.085, 0.1, 48]} />
      </mesh>
      <Glow texture={glowTex} position={[0, 0.1, 0]} scale={0.7} opacity={0.7} />
      {/* Fingers */}
      <Finger mats={mats} length={0.36} curl={0.32} position={[-0.23, 0.01, -0.14]} rotation={[0, -0.12, 0]} radius={0.03} />
      <Finger mats={mats} length={0.42} curl={0.26} position={[-0.24, 0.01, -0.048]} rotation={[0, -0.04, 0]} />
      <Finger mats={mats} length={0.44} curl={0.22} position={[-0.24, 0.01, 0.048]} rotation={[0, 0.05, 0]} />
      <Finger mats={mats} length={0.38} curl={0.3} position={[-0.23, 0.01, 0.14]} rotation={[0, 0.16, 0]} radius={0.029} />
      {/* Thumb */}
      <Finger mats={mats} length={0.3} curl={0.25} position={[-0.02, 0.0, 0.2]} rotation={[0.2, 1.25, 0.2]} radius={0.034} />
    </group>
  );
}

function Body({ mats, glowTex }: { mats: Mats; glowTex: THREE.Texture }) {
  const shoulder = v(1.86, -0.86, 0.36);
  const elbow = v(1.22, -1.78, 0.78);
  const wrist = v(0.08, -1.3, 0.98);
  return (
    <group>
      {/* Neck: layered mechanical column */}
      <mesh material={mats.metal} position={[1.56, -0.1, -0.05]} rotation={[0, 0, 0.16]}>
        <cylinderGeometry args={[0.15, 0.21, 0.75, 32]} />
      </mesh>
      {[-0.32, -0.18, -0.04, 0.1].map((y, i) => (
        <mesh key={y} material={i % 2 ? mats.metalLight : mats.metal} position={[1.56 - y * 0.16, y, -0.05]} rotation={[0, 0, 0.16]}>
          <torusGeometry args={[0.19 + i * -0.008, 0.026, 10, 40]} />
        </mesh>
      ))}
      <Cable material={mats.metal} radius={0.034} points={[[1.22, 0.36, 0.22], [1.3, 0.0, 0.26], [1.42, -0.32, 0.3], [1.6, -0.55, 0.28]]} />
      <Cable material={mats.metalLight} radius={0.024} points={[[1.33, 0.32, 0.3], [1.4, -0.02, 0.36], [1.52, -0.36, 0.38]]} />
      <Cable material={mats.glowSoft} radius={0.009} points={[[1.28, 0.3, 0.36], [1.36, -0.02, 0.41], [1.48, -0.34, 0.43]]} />
      <Cable material={mats.metal} radius={0.04} points={[[1.82, 0.32, -0.32], [1.84, -0.06, -0.28], [1.95, -0.45, -0.22]]} />

      {/* Collar */}
      <mesh material={mats.shellShade} position={[1.72, -0.58, -0.1]} rotation={[Math.PI / 2 - 0.15, 0.2, 0]}>
        <torusGeometry args={[0.3, 0.07, 16, 48]} />
      </mesh>

      {/* Torso */}
      <mesh material={mats.shell} position={[2.38, -1.78, -0.45]} scale={[0.95, 1.12, 0.72]}>
        <sphereGeometry args={[1.0, 64, 64]} />
      </mesh>
      {/* Chest plate with seams */}
      <mesh material={mats.shellShade} position={[1.85, -1.55, 0.02]} rotation={[0, -0.75, 0]} scale={[0.6, 0.62, 0.22]}>
        <sphereGeometry args={[0.8, 48, 48]} />
      </mesh>
      <mesh material={mats.metal} position={[1.86, -1.55, 0.02]} rotation={[0, -0.75, 0]} scale={[0.6, 0.62, 0.22]}>
        <torusGeometry args={[0.8, 0.012, 8, 80]} />
      </mesh>
      {/* Chest light */}
      <group position={[1.6, -1.55, 0.36]} rotation={[0, -0.75, 0]}>
        <mesh material={mats.metal} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.05, 40]} />
        </mesh>
        <mesh material={mats.glow} position={[0, 0, 0.03]}>
          <torusGeometry args={[0.09, 0.015, 10, 40]} />
        </mesh>
        <Glow texture={glowTex} position={[0, 0, 0.12]} scale={0.75} opacity={0.65} />
      </group>

      {/* Shoulder */}
      <mesh material={mats.shell} position={[2.0, -0.86, 0.2]} scale={[1, 0.86, 0.95]}>
        <sphereGeometry args={[0.5, 48, 48]} />
      </mesh>
      <mesh material={mats.metal} position={[1.98, -0.86, 0.2]} rotation={[0, 0.9, 0.5]}>
        <torusGeometry args={[0.43, 0.012, 8, 64]} />
      </mesh>
      <mesh material={mats.metal} position={shoulder}>
        <sphereGeometry args={[0.24, 32, 32]} />
      </mesh>

      {/* Arm */}
      <Limb from={shoulder} to={elbow} radius={0.185} material={mats.shell} />
      <mesh material={mats.metal} position={elbow}>
        <sphereGeometry args={[0.175, 32, 32]} />
      </mesh>
      <mesh material={mats.glow} position={elbow} rotation={[0.3, 1.1, 0]}>
        <torusGeometry args={[0.18, 0.012, 10, 48]} />
      </mesh>
      <Limb from={elbow} to={wrist} radius={0.14} material={mats.shell} />
      <Limb from={elbow.clone().lerp(wrist, 0.3)} to={elbow.clone().lerp(wrist, 0.7)} radius={0.147} material={mats.shellShade} />
      <mesh material={mats.metal} position={wrist}>
        <sphereGeometry args={[0.115, 24, 24]} />
      </mesh>
      <mesh material={mats.glow} position={wrist} rotation={[0.2, 1.4, 0]}>
        <torusGeometry args={[0.118, 0.01, 8, 40]} />
      </mesh>
      <Hand mats={mats} glowTex={glowTex} />
    </group>
  );
}

/* ------------------------------------------------------------------
   Holographic globe
------------------------------------------------------------------- */

// Rough continent blobs (lat, lon, radius in degrees) for the dotted earth.
const CONTINENTS: [number, number, number][] = [
  [48, -100, 22], [62, -112, 16], [22, -100, 9], [70, -45, 9], [-12, -58, 17], [-32, -66, 10],
  [50, 12, 11], [62, 25, 9], [6, 20, 20], [-18, 26, 13], [24, 45, 9], [52, 85, 26], [32, 100, 18],
  [62, 128, 18], [20, 78, 9], [-24, 134, 12], [-2, 113, 7], [36, 138, 5],
];

function earthPoints(count: number, radius: number) {
  const pts: number[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    const x = Math.cos(th) * r;
    const z = Math.sin(th) * r;
    const lat = (Math.asin(y) * 180) / Math.PI;
    const lon = (Math.atan2(z, x) * 180) / Math.PI;
    const jitter = Math.sin(lat * 0.35) * 3 + Math.cos(lon * 0.3) * 3;
    const land = CONTINENTS.some(([la, lo, rad]) => {
      const dLat = lat - la;
      let dLon = lon - lo;
      if (dLon > 180) dLon -= 360;
      if (dLon < -180) dLon += 360;
      return Math.hypot(dLat, dLon * Math.cos((lat * Math.PI) / 180)) < rad + jitter;
    });
    if (land) pts.push(x * radius, y * radius, z * radius);
  }
  return new Float32Array(pts);
}

function Globe({ glowTex, reduced }: { glowTex: THREE.Texture; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);
  const sats = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const energy = useRef(0);
  const R = 0.66;

  const landGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(earthPoints(5200, R * 1.002), 3));
    return g;
  }, []);

  const gridGeo = useMemo(() => {
    const pts: number[] = [];
    const seg = 72;
    for (let lat = -60; lat <= 60; lat += 30) {
      const phi = (lat * Math.PI) / 180;
      for (let i = 0; i < seg; i++) {
        const a = (i / seg) * Math.PI * 2;
        const b = ((i + 1) / seg) * Math.PI * 2;
        pts.push(Math.cos(a) * Math.cos(phi) * R, Math.sin(phi) * R, Math.sin(a) * Math.cos(phi) * R);
        pts.push(Math.cos(b) * Math.cos(phi) * R, Math.sin(phi) * R, Math.sin(b) * Math.cos(phi) * R);
      }
    }
    for (let lon = 0; lon < 180; lon += 30) {
      const th = (lon * Math.PI) / 180;
      for (let i = 0; i < seg; i++) {
        const a = (i / seg) * Math.PI * 2;
        const b = ((i + 1) / seg) * Math.PI * 2;
        pts.push(Math.cos(a) * Math.cos(th) * R, Math.sin(a) * R, Math.cos(a) * Math.sin(th) * R);
        pts.push(Math.cos(b) * Math.cos(th) * R, Math.sin(b) * R, Math.cos(b) * Math.sin(th) * R);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, []);

  // Connection arcs between "cities"
  const arcs = useMemo(() => {
    const toVec = (lat: number, lon: number) => {
      const p = (lat * Math.PI) / 180;
      const l = (lon * Math.PI) / 180;
      return new THREE.Vector3(Math.cos(p) * Math.cos(l), Math.sin(p), Math.cos(p) * Math.sin(l)).multiplyScalar(R);
    };
    const pairs: [number, number, number, number][] = [
      [40, -74, 51, 0], [51, 0, 19, 73], [19, 73, 1, 104], [1, 104, 35, 139], [37, -122, 35, 139], [-23, -46, 40, -74], [19, 73, -33, 151],
    ];
    return pairs.map(([a, b, c, d]) => {
      const s = toVec(a, b);
      const e = toVec(c, d);
      const mid = s.clone().add(e).multiplyScalar(0.5);
      mid.setLength(R + s.distanceTo(e) * 0.35);
      const curve = new THREE.QuadraticBezierCurve3(s, mid, e);
      const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(48));
      return new THREE.Line(geo, new THREE.LineBasicMaterial({ color: "#7cc4ff", transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }));
    });
  }, []);

  const fresnel = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color("#2f7dff") }, uPower: { value: 2.2 }, uIntensity: { value: 1.1 } },
        vertexShader: /* glsl */ `
          varying vec3 vN; varying vec3 vV;
          void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }`,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor; uniform float uPower; uniform float uIntensity; varying vec3 vN; varying vec3 vV;
          void main(){ float f = pow(1.0 - max(dot(vN, vV), 0.0), uPower); vec3 c = uColor * (0.18 + f * 1.6) * uIntensity; gl_FragColor = vec4(c, 0.35 + f * 0.65); }`,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  const pointsMat = useMemo(
    () => new THREE.PointsMaterial({ color: "#8cc6ff", size: 0.014, sizeAttenuation: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }),
    [],
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    energy.current += ((hovered ? 1 : 0) - energy.current) * (1 - Math.exp(-delta * 4));
    const e = energy.current;
    if (!reduced) {
      if (spin.current) spin.current.rotation.y += delta * (0.18 + e * 0.9);
      if (rings.current) rings.current.rotation.y += delta * (0.12 + e * 0.5);
      if (sats.current) sats.current.rotation.y -= delta * (0.5 + e * 1.2);
      if (group.current) group.current.position.y = -0.3 + Math.sin(t * 1.1) * 0.035;
    }
    fresnel.uniforms.uIntensity.value = 1.1 + e * 0.8;
    pointsMat.size = 0.014 + e * 0.004;
    if (group.current) {
      const s = 1 + e * 0.05;
      group.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group} position={[-0.5, -0.3, 0.98]}>
      {/* Hit area for hover */}
      <mesh
        visible={false}
        onPointerOver={(ev) => {
          ev.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[R * 1.15, 16, 16]} />
      </mesh>
      <Glow texture={glowTex} scale={3.4} opacity={0.55} color="#2a6bff" />
      <group ref={spin} rotation={[0.35, 0, 0.18]}>
        <mesh>
          <sphereGeometry args={[R * 0.985, 48, 48]} />
          <meshBasicMaterial color="#020a24" transparent opacity={0.88} />
        </mesh>
        <mesh material={fresnel}>
          <sphereGeometry args={[R, 64, 64]} />
        </mesh>
        <lineSegments geometry={gridGeo}>
          <lineBasicMaterial color="#3d7bff" transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} />
        </lineSegments>
        <points geometry={landGeo} material={pointsMat} />
        {arcs.map((line, i) => (
          <primitive key={i} object={line} />
        ))}
      </group>
      {/* Atmosphere */}
      <mesh scale={1.12}>
        <sphereGeometry args={[R, 48, 48]} />
        <meshBasicMaterial color="#1d5cff" transparent opacity={0.06} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Orbit rings */}
      <group ref={rings}>
        {[
          { r: 1.0, rot: [1.3, 0.2, 0.3] as [number, number, number], o: 0.55 },
          { r: 1.18, rot: [1.15, -0.4, -0.2] as [number, number, number], o: 0.3 },
          { r: 1.45, rot: [1.4, 0.1, 0.55] as [number, number, number], o: 0.18 },
        ].map((ring, i) => (
          <mesh key={i} rotation={ring.rot}>
            <torusGeometry args={[ring.r, 0.004, 6, 160]} />
            <meshBasicMaterial color="#5aa8ff" transparent opacity={ring.o} toneMapped={false} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        ))}
      </group>
      <group ref={sats} rotation={[1.3, 0.2, 0.3]}>
        {[0, 2.1, 4.2].map((a) => (
          <group key={a} position={[Math.cos(a) * 1.0, Math.sin(a) * 1.0, 0]}>
            <mesh>
              <sphereGeometry args={[0.022, 12, 12]} />
              <meshBasicMaterial color="#cfe6ff" toneMapped={false} />
            </mesh>
            <Glow texture={glowTex} scale={0.22} opacity={0.9} />
          </group>
        ))}
      </group>
      <pointLight color="#3d8bff" intensity={7} distance={3.2} decay={2} />
    </group>
  );
}

/* ------------------------------------------------------------------
   Background particles
------------------------------------------------------------------- */

function Particles({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const n = 700;
    const arr = new Float32Array(n * 3);
    // Deterministic pseudo-random so the layout is stable between renders
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (rand() - 0.5) * 12;
      arr[i * 3 + 1] = (rand() - 0.5) * 7;
      arr[i * 3 + 2] = -rand() * 6 - 0.5;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);
  useFrame((_, d) => {
    if (ref.current && !reduced) ref.current.rotation.y += d * 0.01;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#6fa8ff" size={0.018} sizeAttenuation transparent opacity={0.6} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

/* ------------------------------------------------------------------
   Rig: positions the whole composition and adds idle motion/parallax
------------------------------------------------------------------- */

function Rig({ pointer, reduced }: { pointer: MutableRefObject<{ x: number; y: number }>; reduced: boolean }) {
  const mats = useMaterials();
  const glowTex = useGlowTexture();
  const root = useRef<THREE.Group>(null);
  const robot = useRef<THREE.Group>(null);
  const { viewport, camera } = useThree();

  const narrow = viewport.aspect < 0.95;
  const s = narrow ? Math.min(1, viewport.width / 4.4) : Math.min(1.08, Math.max(0.72, viewport.width / 5));
  const offsetX = narrow ? -0.55 * s : -0.62 * s + 0.15;

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const k = 1 - Math.exp(-delta * 2.5);
    if (root.current) {
      root.current.rotation.y += (pointer.current.x * 0.08 - root.current.rotation.y) * k;
      root.current.rotation.x += (-pointer.current.y * 0.04 - root.current.rotation.x) * k;
    }
    if (robot.current && !reduced) robot.current.position.y = Math.sin(t * 0.8) * 0.025;
    camera.position.x += (pointer.current.x * 0.15 - camera.position.x) * k;
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={root} position={[offsetX, narrow ? 0.05 : -0.05, 0]} scale={s}>
      <group ref={robot}>
        <Head mats={mats} glowTex={glowTex} pointer={pointer} reduced={reduced} />
        <Body mats={mats} glowTex={glowTex} />
      </group>
      <Globe glowTex={glowTex} reduced={reduced} />
      <Particles reduced={reduced} />
      {/* Energy swirl behind the robot */}
      <mesh position={[0.4, 0.2, -1.5]} rotation={[1.2, 0.2, 0.4]}>
        <torusGeometry args={[2.6, 0.006, 6, 200]} />
        <meshBasicMaterial color="#2a6bff" transparent opacity={0.25} toneMapped={false} />
      </mesh>
      <mesh position={[0.2, 0.0, -2]} rotation={[1.35, -0.3, 0.2]}>
        <torusGeometry args={[3.2, 0.005, 6, 200]} />
        <meshBasicMaterial color="#2a6bff" transparent opacity={0.15} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function RobotScene({ className = "" }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    if (wrap.current) io.observe(wrap.current);
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrap} className={className}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 7], fov: 36 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={visible ? (reduced ? "demand" : "always") : "never"}
        aria-hidden
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 5]} intensity={1.7} />
        <directionalLight position={[-4, 2, -3]} intensity={2.2} color="#3d7bff" />
        <pointLight position={[3.5, 1.5, -1.5]} intensity={18} color="#2a6bff" distance={8} />
        <pointLight position={[0, -3, 2]} intensity={4} color="#1d4fff" distance={6} />
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={2.4} position={[2, 4, 4]} scale={[6, 2, 1]} color="#ffffff" />
          <Lightformer form="rect" intensity={3} position={[-5, 1, -2]} scale={[2, 6, 1]} color="#2f7dff" />
          <Lightformer form="ring" intensity={2} position={[4, 0, 2]} scale={2} color="#9fc8ff" />
          <Lightformer form="rect" intensity={0.6} position={[0, -4, 1]} scale={[8, 1, 1]} color="#1d4fff" />
        </Environment>
        <Rig pointer={pointer} reduced={reduced} />
      </Canvas>
    </div>
  );
}
