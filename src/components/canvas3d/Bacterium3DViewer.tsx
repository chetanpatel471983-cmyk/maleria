import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BACTERIUM_PARTS } from '../../data/typhoidData';
import { Language } from '../../types/typhoid';
import { RotateCw, Eye, Zap, Layers, RefreshCw } from 'lucide-react';

interface Bacterium3DViewerProps {
  language: Language;
  selectedPartId: string | null;
  onSelectPart: (id: string) => void;
}

export const Bacterium3DViewer: React.FC<Bacterium3DViewerProps> = ({
  language,
  selectedPartId,
  onSelectPart,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [xRayMode, setXRayMode] = useState(false);
  const [swimSpeed, setSwimSpeed] = useState(1);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030712); // Deep slate-950

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 7.5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 14;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.2;
    controlsRef.current = controls;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x38bdf8, 0.6); // Soft cyan-tinted ambient
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x06b6d4, 3.0);
    rimLight.position.set(-6, -4, -6);
    scene.add(rimLight);

    const bottomGlow = new THREE.PointLight(0x10b981, 1.8, 15);
    bottomGlow.position.set(0, -3, 2);
    scene.add(bottomGlow);

    // Root Group
    const bacteriumGroup = new THREE.Group();
    scene.add(bacteriumGroup);

    // 1. Bacterial Body (Capsule geometry)
    // Radius: 1.1, Length: 2.8 (Salmonella bacillus aspect ratio ~ 1:3)
    const bodyGeometry = new THREE.CapsuleGeometry(1.1, 2.8, 24, 32);
    
    // Outer Cell Wall & LPS Material
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.35,
      metalness: 0.15,
      emissive: 0x064e3b,
      emissiveIntensity: 0.25,
      transparent: true,
      opacity: xRayMode ? 0.25 : 0.95,
      wireframe: false,
    });
    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    bodyMesh.rotation.z = Math.PI / 2; // Horizontal rod orientation
    bacteriumGroup.add(bodyMesh);

    // 2. Vi Capsular Polysaccharide (Translucent Outer Protective Aura)
    const capsuleGeometry = new THREE.CapsuleGeometry(1.22, 2.85, 20, 28);
    const capsuleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: xRayMode ? 0.1 : 0.35,
      roughness: 0.1,
      transmission: 0.7,
      thickness: 0.5,
      emissive: 0x581c87,
      emissiveIntensity: 0.3,
      depthWrite: false,
    });
    const capsuleMesh = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
    capsuleMesh.rotation.z = Math.PI / 2;
    bacteriumGroup.add(capsuleMesh);

    // 3. O-Antigen Surface Spikes (Lipopolysaccharide surface studs)
    const spikeCount = 180;
    const spikeGeo = new THREE.ConeGeometry(0.04, 0.22, 6);
    const spikeMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      roughness: 0.4,
      emissive: 0x059669,
      emissiveIntensity: 0.4,
    });
    const spikesInstanced = new THREE.InstancedMesh(spikeGeo, spikeMat, spikeCount);
    
    const dummy = new THREE.Object3D();
    for (let i = 0; i < spikeCount; i++) {
      // Distribute randomly across capsule
      const t = (Math.random() - 0.5) * 2.6; // along cylinder axis
      const theta = Math.random() * Math.PI * 2;
      const radius = 1.12;
      const x = t;
      const y = radius * Math.cos(theta);
      const z = radius * Math.sin(theta);
      
      dummy.position.set(x, y, z);
      dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, y, z).normalize());
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      spikesInstanced.setMatrixAt(i, dummy.matrix);
    }
    bacteriumGroup.add(spikesInstanced);

    // 4. Type III Secretion Needle Complex (Molecular Syringes on poles and flank)
    const t3ssPositions = [
      { pos: new THREE.Vector3(2.5, 0.4, 0.3), dir: new THREE.Vector3(1, 0.2, 0.1).normalize() },
      { pos: new THREE.Vector3(-2.5, -0.3, 0.2), dir: new THREE.Vector3(-1, -0.1, 0.1).normalize() },
      { pos: new THREE.Vector3(0.5, 1.25, 0), dir: new THREE.Vector3(0.2, 1, 0).normalize() },
      { pos: new THREE.Vector3(-0.8, -1.25, 0.4), dir: new THREE.Vector3(-0.1, -1, 0.2).normalize() },
    ];
    t3ssPositions.forEach(({ pos, dir }) => {
      const needleBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.18, 0.25, 12),
        new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.6, roughness: 0.2 })
      );
      needleBase.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      needleBase.position.copy(pos);

      const needleTip = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.05, 0.65, 8),
        new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xf59e0b, emissiveIntensity: 0.6 })
      );
      needleTip.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      needleTip.position.copy(pos.clone().add(dir.clone().multiplyScalar(0.4)));

      bacteriumGroup.add(needleBase);
      bacteriumGroup.add(needleTip);
    });

    // 5. Peritrichous Flagella (Animated writhing sinusoidal long tails)
    const flagellaCount = 8;
    const flagellaSegments = 35;
    const flagellaMeshes: {
      line: THREE.Line;
      geometry: THREE.BufferGeometry;
      basePos: THREE.Vector3;
      baseDir: THREE.Vector3;
      phase: number;
      frequency: number;
      wavelength: number;
    }[] = [];

    const flagellaMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      linewidth: 3,
    });

    // Generate root anchoring positions spread peritrichously (all around the bacterium)
    for (let f = 0; f < flagellaCount; f++) {
      const angle = (f / flagellaCount) * Math.PI * 2;
      const xOffset = ((f % 4) - 1.5) * 0.9;
      const basePos = new THREE.Vector3(
        xOffset,
        Math.cos(angle) * 1.15,
        Math.sin(angle) * 1.15
      );
      const baseDir = new THREE.Vector3(
        (Math.random() - 0.5) * 0.5 - 0.8, // Tend to trail backward like swimming tails
        Math.cos(angle) * 0.6,
        Math.sin(angle) * 0.6
      ).normalize();

      const points: THREE.Vector3[] = [];
      for (let s = 0; s <= flagellaSegments; s++) {
        points.push(basePos.clone());
      }

      const flagellaGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(flagellaGeo, flagellaMat);
      bacteriumGroup.add(line);

      flagellaMeshes.push({
        line,
        geometry: flagellaGeo,
        basePos,
        baseDir,
        phase: Math.random() * Math.PI * 2,
        frequency: 3 + Math.random() * 2,
        wavelength: 0.18 + Math.random() * 0.05,
      });
    }

    // 6. Internal Structures (Visible in X-Ray mode): Chromosomal Nucleoid DNA & Ribosomes
    const internalGroup = new THREE.Group();
    bacteriumGroup.add(internalGroup);

    // Twisted Chromosome DNA loop
    const curvePoints: THREE.Vector3[] = [];
    const curveLoops = 70;
    for (let i = 0; i < curveLoops; i++) {
      const u = (i / curveLoops) * Math.PI * 6;
      const x = ((i / curveLoops) - 0.5) * 2.8 + Math.sin(u * 2) * 0.3;
      const y = Math.sin(u) * 0.5 + Math.cos(u * 3) * 0.2;
      const z = Math.cos(u) * 0.5 + Math.sin(u * 4) * 0.15;
      curvePoints.push(new THREE.Vector3(x, y, z));
    }
    const dnaCurve = new THREE.CatmullRomCurve3(curvePoints, true);
    const dnaGeo = new THREE.TubeGeometry(dnaCurve, 80, 0.06, 8, true);
    const dnaMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0xbe185d,
      emissiveIntensity: 0.7,
      roughness: 0.3,
    });
    const dnaMesh = new THREE.Mesh(dnaGeo, dnaMat);
    internalGroup.add(dnaMesh);

    // Ribosome particles
    const riboCount = 140;
    const riboGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const riboMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    const riboInstanced = new THREE.InstancedMesh(riboGeo, riboMat, riboCount);
    for (let i = 0; i < riboCount; i++) {
      const rx = (Math.random() - 0.5) * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.75;
      dummy.position.set(rx, Math.cos(theta) * r, Math.sin(theta) * r);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      riboInstanced.setMatrixAt(i, dummy.matrix);
    }
    internalGroup.add(riboInstanced);

    // Ambient floating nutrient/water dust particles in background
    const dustCount = 200;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 16;
      dustPositions[i + 1] = (Math.random() - 0.5) * 12;
      dustPositions[i + 2] = (Math.random() - 0.5) * 14;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x0ea5e9,
      size: 0.05,
      transparent: true,
      opacity: 0.4,
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Controls update
      controls.update();

      // Subtle natural floating & bacterial tumble motion
      bacteriumGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;
      bacteriumGroup.position.x = Math.cos(elapsedTime * 0.8) * 0.08;

      // Animate Flagella (sinusoidal waves traveling along each tail)
      flagellaMeshes.forEach((fl) => {
        const positions = fl.geometry.attributes.position.array as Float32Array;
        const totalLen = 3.6;

        for (let s = 0; s <= flagellaSegments; s++) {
          const frac = s / flagellaSegments;
          const dist = frac * totalLen;

          // Sinusoidal spiral wave
          const wavePhase = elapsedTime * fl.frequency * swimSpeed + frac * Math.PI * 4 + fl.phase;
          const amplitude = frac * 0.38; // Increases toward tail tip
          
          const waveY = Math.sin(wavePhase) * amplitude;
          const waveZ = Math.cos(wavePhase) * amplitude;

          const pointPos = fl.basePos.clone().add(
            fl.baseDir.clone().multiplyScalar(dist)
          );
          
          // Orthogonal deviation
          pointPos.y += waveY;
          pointPos.z += waveZ;

          positions[s * 3] = pointPos.x;
          positions[s * 3 + 1] = pointPos.y;
          positions[s * 3 + 2] = pointPos.z;
        }
        fl.geometry.attributes.position.needsUpdate = true;
      });

      // Slowly rotate DNA
      dnaMesh.rotation.x = elapsedTime * 0.4;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      controls.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [xRayMode, swimSpeed]);

  // Handle autoRotate update
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  const handleResetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 2.5, 7.5);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  return (
    <div className="relative w-full h-full min-h-[460px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col">
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="w-full flex-1 cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Controls HUD Bar */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="px-3 py-1 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-md text-xs font-semibold text-cyan-400 flex items-center gap-1.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>Salmonella enterica serovar Typhi</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono hidden sm:inline-block">
            Gram-Negative Bacillus · 2–3µm
          </span>
        </div>

        {/* Viewport Control Buttons */}
        <div className="flex items-center gap-1.5 pointer-events-auto bg-slate-900/85 backdrop-blur-md border border-slate-700/60 p-1 rounded-lg shadow-lg">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            title={autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
            className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1 ${
              autoRotate ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="text-[11px] hidden md:inline">
              {language === 'gu' ? 'રોટેશન' : 'Rotate'}
            </span>
          </button>

          <button
            onClick={() => setXRayMode(!xRayMode)}
            title={xRayMode ? 'Standard View' : 'X-Ray Internal View'}
            className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1 ${
              xRayMode ? 'bg-pink-500/20 text-pink-300' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="text-[11px] hidden md:inline">
              {xRayMode
                ? language === 'gu'
                  ? 'સામાન્ય'
                  : 'Solid'
                : language === 'gu'
                ? 'એક્સ-રે (અંદર)'
                : 'X-Ray'}
            </span>
          </button>

          <button
            onClick={handleResetCamera}
            title="Reset Camera"
            className="p-1.5 rounded text-xs text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Part Inspection Pill Selector / Legend */}
      <div className="absolute bottom-3 left-3 right-3 pointer-events-auto">
        <div className="p-2.5 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {language === 'gu' ? 'બેક્ટેરિયાના મુખ્ય ભાગો (તપાસવા માટે ક્લિક કરો):' : 'Bacterial Antigens & Structures (Click to inspect):'}
            </span>
            <span className="text-[11px] text-slate-400">
              {language === 'gu' ? 'માઉસથી 360° ફેરવો' : 'Drag to Orbit 360°'}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {BACTERIUM_PARTS.map((part) => {
              const isSelected = selectedPartId === part.id;
              return (
                <button
                  key={part.id}
                  onClick={() => onSelectPart(part.id)}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-all text-left flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-800 text-white border border-cyan-400 shadow-sm shadow-cyan-900/40'
                      : 'bg-slate-950/70 text-slate-300 hover:bg-slate-800/80 border border-slate-800'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: part.color }}
                  />
                  <span className="truncate max-w-[190px]">{part.name[language]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
