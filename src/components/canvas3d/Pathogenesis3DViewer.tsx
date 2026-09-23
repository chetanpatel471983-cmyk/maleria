import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PATHOGENESIS_STEPS } from '../../data/typhoidData';
import { Language } from '../../types/typhoid';
import { Play, Pause, SkipForward, SkipBack, RefreshCw, Layers } from 'lucide-react';

interface Pathogenesis3DViewerProps {
  language: Language;
  currentStepIndex: number; // 0 to 4
  onStepChange: (index: number) => void;
}

export const Pathogenesis3DViewer: React.FC<Pathogenesis3DViewerProps> = ({
  language,
  currentStepIndex,
  onStepChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const bacteriaGroupRef = useRef<THREE.Group | null>(null);
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 3, 9));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Step camera presets
  const stepCameraPresets = [
    { cam: new THREE.Vector3(0, 4.5, 9.5), look: new THREE.Vector3(0, 2.5, 0) }, // Step 1: Lumen
    { cam: new THREE.Vector3(0, 2.5, 7.5), look: new THREE.Vector3(0, 1.2, 0) }, // Step 2: M-cell
    { cam: new THREE.Vector3(-0.5, 0.5, 6.5), look: new THREE.Vector3(0, -0.5, 0) }, // Step 3: Macrophage
    { cam: new THREE.Vector3(1.5, -1.5, 7.0), look: new THREE.Vector3(1, -2, 0) }, // Step 4: Lymphatics
    { cam: new THREE.Vector3(0, -0.5, 11), look: new THREE.Vector3(0, -1, 0) }, // Step 5: Dissemination
  ];

  useEffect(() => {
    const preset = stepCameraPresets[currentStepIndex];
    if (preset) {
      targetCamPosRef.current.copy(preset.cam);
      targetLookAtRef.current.copy(preset.look);
    }
  }, [currentStepIndex]);

  // Automated playback
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      onStepChange((currentStepIndex + 1) % PATHOGENESIS_STEPS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, currentStepIndex, onStepChange]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617); // Deep slate-950

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4, 10);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 3;
    controls.maxDistance = 18;
    controlsRef.current = controls;

    // Lighting
    const ambient = new THREE.AmbientLight(0x38bdf8, 0.7);
    scene.add(ambient);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight1.position.set(6, 10, 8);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf59e0b, 1.2);
    dirLight2.position.set(-6, -4, 4);
    scene.add(dirLight2);

    // --- ANATOMICAL GUT CROSS-SECTION ---
    const anatomyGroup = new THREE.Group();
    scene.add(anatomyGroup);

    // 1. Intestinal Lumen (Top area y = 2.5 to 5.0)
    // Translucent fluid volume
    const lumenGeo = new THREE.BoxGeometry(14, 3, 6);
    const lumenMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.08,
      wireframe: false,
    });
    const lumenMesh = new THREE.Mesh(lumenGeo, lumenMat);
    lumenMesh.position.set(0, 3.8, 0);
    anatomyGroup.add(lumenMesh);

    // 2. Epithelial Monolayer (y = 1.0 to 2.2)
    // Columnar epithelial cells with brush border / microvilli
    const cellCount = 14;
    const cellWidth = 0.85;
    const epithGroup = new THREE.Group();
    anatomyGroup.add(epithGroup);

    for (let i = 0; i < cellCount; i++) {
      const x = (i - cellCount / 2 + 0.5) * cellWidth;
      const isMCell = i === 6 || i === 7; // Center cells are the M-Cells

      // Columnar cell body
      const cellHeight = isMCell ? 1.0 : 1.35;
      const cellGeo = new THREE.BoxGeometry(cellWidth * 0.92, cellHeight, 1.6);
      const cellMat = new THREE.MeshStandardMaterial({
        color: isMCell ? 0xf59e0b : 0xe0e7ff, // M-cell stands out with amber hue
        roughness: 0.4,
        metalness: 0.1,
        transparent: true,
        opacity: isMCell ? 0.95 : 0.85,
      });
      const cellMesh = new THREE.Mesh(cellGeo, cellMat);
      cellMesh.position.set(x, isMCell ? 1.3 : 1.5, 0);
      epithGroup.add(cellMesh);

      // Microvilli (Brush border) on standard enterocytes
      if (!isMCell) {
        const villiCount = 12;
        const villiGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.25, 6);
        const villiMat = new THREE.MeshStandardMaterial({ color: 0x93c5fd });
        const villiInstanced = new THREE.InstancedMesh(villiGeo, villiMat, villiCount);
        const d = new THREE.Object3D();
        for (let v = 0; v < villiCount; v++) {
          d.position.set(
            (Math.random() - 0.5) * (cellWidth * 0.8),
            cellHeight / 2 + 0.12,
            (Math.random() - 0.5) * 1.4
          );
          d.updateMatrix();
          villiInstanced.setMatrixAt(v, d.matrix);
        }
        cellMesh.add(villiInstanced);
      } else {
        // M-Cell (Microfold cell) has folds, not brush border
        const foldGeo = new THREE.TorusGeometry(0.2, 0.05, 8, 16, Math.PI);
        const foldMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24 });
        const fold = new THREE.Mesh(foldGeo, foldMat);
        fold.rotation.x = Math.PI / 2;
        fold.position.set(0, cellHeight / 2 + 0.05, 0);
        cellMesh.add(fold);

        // M-Cell intraepithelial pocket below
        const pocketGeo = new THREE.SphereGeometry(0.35, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2);
        const pocketMat = new THREE.MeshStandardMaterial({
          color: 0x78350f,
          side: THREE.DoubleSide,
        });
        const pocket = new THREE.Mesh(pocketGeo, pocketMat);
        pocket.rotation.x = Math.PI;
        pocket.position.set(0, -cellHeight / 2 + 0.2, 0);
        cellMesh.add(pocket);
      }
    }

    // 3. Peyer's Patch Submucosal Lymphoid Follicle (y = -0.8 to 0.6)
    const peyerDomeGeo = new THREE.CylinderGeometry(4.5, 5.0, 1.4, 32);
    const peyerDomeMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.6,
      transparent: true,
      opacity: 0.45,
    });
    const peyerDome = new THREE.Mesh(peyerDomeGeo, peyerDomeMat);
    peyerDome.position.set(0, 0.1, 0);
    anatomyGroup.add(peyerDome);

    // Glowing Lymphoid Germinal Center (B and T cell clusters)
    const germinalCount = 6;
    for (let g = 0; g < germinalCount; g++) {
      const gGeo = new THREE.SphereGeometry(0.45, 16, 16);
      const gMat = new THREE.MeshStandardMaterial({
        color: 0x818cf8,
        emissive: 0x4338ca,
        emissiveIntensity: 0.4,
        roughness: 0.3,
      });
      const gMesh = new THREE.Mesh(gGeo, gMat);
      gMesh.position.set((g - 2.5) * 1.3, 0.1, (Math.random() - 0.5) * 1.2);
      anatomyGroup.add(gMesh);
    }

    // 4. Submucosal Macrophages (Large amoeboid immune cells)
    const macrophageGroup = new THREE.Group();
    anatomyGroup.add(macrophageGroup);

    const macroCount = 5;
    const macroMeshes: THREE.Mesh[] = [];
    for (let m = 0; m < macroCount; m++) {
      const macroGeo = new THREE.DodecahedronGeometry(0.42, 2);
      const macroMat = new THREE.MeshStandardMaterial({
        color: 0xec4899,
        emissive: 0x831843,
        emissiveIntensity: 0.3,
        roughness: 0.5,
      });
      const macroMesh = new THREE.Mesh(macroGeo, macroMat);
      macroMesh.position.set((m - 2) * 1.4, -0.6, (Math.random() - 0.5) * 0.8);
      macrophageGroup.add(macroMesh);
      macroMeshes.push(macroMesh);
    }

    // 5. Mesenteric Capillary & Lymphatic Vessel (y = -2.2)
    // Blood capillary (Red tube with pulsing RBCs)
    const vesselCurve = new THREE.LineCurve3(
      new THREE.Vector3(-6, -2.4, 0.5),
      new THREE.Vector3(6, -2.4, 0.5)
    );
    const vesselGeo = new THREE.TubeGeometry(vesselCurve, 20, 0.32, 16, false);
    const vesselMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.6,
      roughness: 0.2,
    });
    const vesselMesh = new THREE.Mesh(vesselGeo, vesselMat);
    anatomyGroup.add(vesselMesh);

    // Lymphatic vessel (Green tube)
    const lymphCurve = new THREE.LineCurve3(
      new THREE.Vector3(-6, -2.4, -0.8),
      new THREE.Vector3(6, -2.4, -0.8)
    );
    const lymphGeo = new THREE.TubeGeometry(lymphCurve, 20, 0.28, 16, false);
    const lymphMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.6,
      roughness: 0.2,
    });
    const lymphMesh = new THREE.Mesh(lymphGeo, lymphMat);
    anatomyGroup.add(lymphMesh);

    // Red Blood Cells flowing inside capillary
    const rbcCount = 25;
    const rbcGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.04, 12);
    const rbcMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.3 });
    const rbcInstanced = new THREE.InstancedMesh(rbcGeo, rbcMat, rbcCount);
    anatomyGroup.add(rbcInstanced);

    // 6. Salmonella Bacteria Fleet (Animated moving pathogens)
    const bacteriaGroup = new THREE.Group();
    scene.add(bacteriaGroup);
    bacteriaGroupRef.current = bacteriaGroup;

    const bCount = 20;
    const bacMeshes: {
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      speed: number;
      phase: number;
    }[] = [];

    const bacGeo = new THREE.CapsuleGeometry(0.08, 0.28, 8, 12);
    const bacMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.8,
      roughness: 0.2,
    });

    for (let b = 0; b < bCount; b++) {
      const bMesh = new THREE.Mesh(bacGeo, bacMat);
      bMesh.rotation.z = Math.PI / 2;
      bacteriaGroup.add(bMesh);

      bacMeshes.push({
        mesh: bMesh,
        baseX: (Math.random() - 0.5) * 5,
        baseY: 3.5,
        baseZ: (Math.random() - 0.5) * 2,
        speed: 0.8 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const dummy = new THREE.Object3D();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera interpolation toward step preset
      camera.position.lerp(targetCamPosRef.current, 0.04);
      controls.target.lerp(targetLookAtRef.current, 0.04);
      controls.update();

      // Flow Red Blood Cells
      for (let r = 0; r < rbcCount; r++) {
        const xPos = (((elapsed * 1.5 + r * 0.5) % 12) - 6);
        dummy.position.set(xPos, -2.4, 0.5);
        dummy.rotation.set(elapsed + r, r, 0);
        dummy.updateMatrix();
        rbcInstanced.setMatrixAt(r, dummy.matrix);
      }
      rbcInstanced.instanceMatrix.needsUpdate = true;

      // Animate Salmonella trajectory depending on current step
      bacMeshes.forEach((bac, idx) => {
        let targetX = bac.baseX;
        let targetY = 3.5;
        let targetZ = bac.baseZ;

        if (currentStepIndex === 0) {
          // Step 1: Ingestion & swimming in gut lumen
          targetY = 3.2 + Math.sin(elapsed * 2 + bac.phase) * 0.4;
          targetX = bac.baseX + Math.cos(elapsed * bac.speed + bac.phase) * 0.8;
        } else if (currentStepIndex === 1) {
          // Step 2: M-cell translocation
          targetX = (idx < 10 ? 0.2 : -0.2) + Math.sin(elapsed * 1.5 + idx) * 0.35;
          targetY = 1.35 + Math.sin(elapsed * 2 + bac.phase) * 0.2;
          targetZ = (Math.random() - 0.5) * 0.5;
        } else if (currentStepIndex === 2) {
          // Step 3: Macrophage phagocytosis & intracellular replication
          const macroTarget = macroMeshes[idx % macroMeshes.length];
          targetX = macroTarget.position.x + Math.sin(elapsed * 3 + idx) * 0.15;
          targetY = macroTarget.position.y + Math.cos(elapsed * 3 + idx) * 0.15;
          targetZ = macroTarget.position.z + Math.sin(elapsed * 2 + idx) * 0.1;
        } else if (currentStepIndex === 3) {
          // Step 4: Mesenteric lymph node migration
          targetX = ((elapsed * 0.6 + idx * 0.5) % 10) - 5;
          targetY = -1.5 + Math.sin(elapsed * 2 + idx) * 0.2;
          targetZ = -0.8;
        } else if (currentStepIndex === 4) {
          // Step 5: Systemic bacteremia into blood vessel & dissemination
          targetX = (((elapsed * 2.0 + idx * 0.6) % 12) - 6);
          targetY = -2.4;
          targetZ = 0.5;
        }

        bac.mesh.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05);
        bac.mesh.rotation.y += 0.02;
      });

      // Macrophages subtle respiration pulse
      macroMeshes.forEach((m, idx) => {
        const pulse = 1 + Math.sin(elapsed * 2 + idx) * 0.05;
        m.scale.set(pulse, pulse, pulse);
      });

      renderer.render(scene, camera);
    };

    animate();

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
  }, [currentStepIndex]);

  const activeStep = PATHOGENESIS_STEPS[currentStepIndex];

  return (
    <div className="relative w-full h-full min-h-[460px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col">
      {/* WebGL Canvas */}
      <div ref={containerRef} className="w-full flex-1 cursor-grab active:cursor-grabbing" />

      {/* Top HUD: Step Indicators & Anatomical Layer Labels */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="px-3 py-1 bg-slate-900/90 backdrop-blur-md border border-slate-700/60 rounded-md text-xs font-semibold text-emerald-400 flex items-center gap-1.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{activeStep.title[language]}</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono hidden md:inline-block">
            {activeStep.location[language]} · {activeStep.timeframe[language]}
          </span>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-1 pointer-events-auto bg-slate-900/90 backdrop-blur-md border border-slate-700/60 p-1 rounded-lg shadow-lg">
          <button
            onClick={() => onStepChange(Math.max(0, currentStepIndex - 1))}
            disabled={currentStepIndex === 0}
            className="p-1.5 rounded text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
            title="Previous Step"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1 ${
              isPlaying ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-300 hover:text-white'
            }`}
            title={isPlaying ? 'Pause Auto Progression' : 'Play Auto Progression'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => onStepChange((currentStepIndex + 1) % PATHOGENESIS_STEPS.length)}
            className="p-1.5 rounded text-slate-400 hover:text-white transition-colors"
            title="Next Step"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Anatomical Cross Section Legend Overlay (Floating on top-right) */}
      <div className="absolute top-14 right-3 pointer-events-none hidden lg:block">
        <div className="p-2 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-lg text-[10px] space-y-1 text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded bg-sky-400/80"></span>
            <span>{language === 'gu' ? 'આંતરડાનું પોલાણ (Lumen)' : 'Gut Lumen'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded bg-amber-400"></span>
            <span>{language === 'gu' ? 'M-સેલ (પેયર્સ પેચ)' : "M-Cell (Peyer's Patch)"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded bg-pink-500"></span>
            <span>{language === 'gu' ? 'મેક્રોફેજ કોષ' : 'Submucosal Macrophage'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded bg-red-500"></span>
            <span>{language === 'gu' ? 'રક્તવાહિની (કેશિકા)' : 'Blood Capillary'}</span>
          </div>
        </div>
      </div>

      {/* Bottom Step Selector Strip */}
      <div className="absolute bottom-3 left-3 right-3 pointer-events-auto">
        <div className="p-2.5 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {language === 'gu' ? 'સંક્રમણના ૫ મુખ્ય તબક્કા (પગલાં પસંદ કરો):' : '5-Stage Pathogenesis Cascade (Click step):'}
            </span>
            <span className="text-[11px] font-mono text-cyan-400">
              {currentStepIndex + 1} / {PATHOGENESIS_STEPS.length}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {PATHOGENESIS_STEPS.map((stepItem, idx) => {
              const isCurrent = currentStepIndex === idx;
              return (
                <button
                  key={stepItem.id}
                  onClick={() => onStepChange(idx)}
                  className={`px-2 py-1.5 rounded text-left transition-all flex flex-col ${
                    isCurrent
                      ? 'bg-emerald-950/80 border border-emerald-400/80 text-white shadow-md shadow-emerald-950'
                      : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold text-emerald-400">
                    STEP {stepItem.step}
                  </span>
                  <span className="text-[11px] font-medium truncate">
                    {stepItem.title[language].replace(/^\d+\.\s*/, '')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
