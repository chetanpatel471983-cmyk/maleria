import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Language } from '../../types/typhoid';
import { TestTube, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

interface LabTest3DViewerProps {
  language: Language;
}

export const LabTest3DViewer: React.FC<LabTest3DViewerProps> = ({ language }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedAntigen, setSelectedAntigen] = useState<'TO' | 'TH'>('TO');
  const [patientTiterIndex, setPatientTiterIndex] = useState<number>(3); // 1:160 (Diagnostic threshold)
  const dilutions = ['1:20', '1:40', '1:80', '1:160', '1:320', '1:640'];

  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 7.5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 3;
    controls.maxDistance = 14;
    controls.target.set(0, 0.8, 0);
    controlsRef.current = controls;

    // Lights
    const ambient = new THREE.AmbientLight(0x38bdf8, 0.8);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(5, 8, 6);
    scene.add(dirLight);

    const blueBackLight = new THREE.DirectionalLight(0x0284c7, 1.8);
    blueBackLight.position.set(-5, 2, -5);
    scene.add(blueBackLight);

    const labGroup = new THREE.Group();
    scene.add(labGroup);

    // 1. Wooden / Metallic Test Tube Rack
    const rackBase = new THREE.Mesh(
      new THREE.BoxGeometry(7.2, 0.25, 1.8),
      new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.3, metalness: 0.4 })
    );
    rackBase.position.set(0, -0.6, 0);
    labGroup.add(rackBase);

    const rackTop = new THREE.Mesh(
      new THREE.BoxGeometry(7.2, 0.2, 1.8),
      new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.3, metalness: 0.4 })
    );
    rackTop.position.set(0, 1.0, 0);
    labGroup.add(rackTop);

    // Rack Pillars
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.7 });
    [-3.3, 3.3].forEach((x) => {
      [-0.7, 0.7].forEach((z) => {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.6, 12), pillarMat);
        pillar.position.set(x, 0.2, z);
        labGroup.add(pillar);
      });
    });

    // 2. Six Glass Test Tubes for Serial Dilutions
    const tubeCount = dilutions.length;
    const tubeMeshes: {
      glass: THREE.Mesh;
      fluid: THREE.Mesh;
      pellet: THREE.Mesh;
      floccules: THREE.Points;
    }[] = [];

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 0.4,
      depthWrite: false,
    });

    for (let i = 0; i < tubeCount; i++) {
      const x = (i - (tubeCount - 1) / 2) * 1.05;
      const isPositive = i <= patientTiterIndex; // Agglutination visible if titer <= patient level

      // Glass Tube
      const tubeGeo = new THREE.CylinderGeometry(0.32, 0.32, 2.2, 24, 1, true);
      const tube = new THREE.Mesh(tubeGeo, glassMat);
      tube.position.set(x, 0.7, 0);
      labGroup.add(tube);

      // Rounded bottom
      const bottomGeo = new THREE.SphereGeometry(0.32, 24, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
      const bottom = new THREE.Mesh(bottomGeo, glassMat);
      bottom.position.set(x, -0.4, 0);
      labGroup.add(bottom);

      // Serum Fluid inside
      const fluidHeight = 1.3;
      const fluidGeo = new THREE.CylinderGeometry(0.3, 0.3, fluidHeight, 16);
      const fluidMat = new THREE.MeshStandardMaterial({
        color: isPositive ? 0x0284c7 : 0x0ea5e9, // Clears up in positive tubes as antigen precipitates
        transparent: true,
        opacity: isPositive ? 0.45 : 0.75, // Turbid if negative, clear supernatant if positive
        roughness: 0.2,
      });
      const fluid = new THREE.Mesh(fluidGeo, fluidMat);
      fluid.position.set(x, 0.25, 0);
      labGroup.add(fluid);

      // Agglutinated pellet at tube bottom (O-antigen: granular chalky pellet)
      const pelletGeo = new THREE.CylinderGeometry(0.28, 0.25, 0.18, 16);
      const pelletMat = new THREE.MeshStandardMaterial({
        color: selectedAntigen === 'TO' ? 0xf8fafc : 0xfef08a,
        roughness: 0.5,
      });
      const pellet = new THREE.Mesh(pelletGeo, pelletMat);
      pellet.position.set(x, -0.32, 0);
      pellet.visible = isPositive;
      labGroup.add(pellet);

      // H-antigen fluffy floccules floating (TH produces loose wool-like clumps)
      const flocculeCount = 35;
      const flocGeo = new THREE.BufferGeometry();
      const flocPos = new Float32Array(flocculeCount * 3);
      for (let p = 0; p < flocculeCount * 3; p += 3) {
        flocPos[p] = (Math.random() - 0.5) * 0.4;
        flocPos[p + 1] = (Math.random() - 0.5) * 0.9;
        flocPos[p + 2] = (Math.random() - 0.5) * 0.4;
      }
      flocGeo.setAttribute('position', new THREE.BufferAttribute(flocPos, 3));
      const flocMat = new THREE.PointsMaterial({
        color: 0xfef08a,
        size: 0.05,
        transparent: true,
        opacity: isPositive && selectedAntigen === 'TH' ? 0.9 : 0.0,
      });
      const floccules = new THREE.Points(flocGeo, flocMat);
      floccules.position.set(x, 0.25, 0);
      labGroup.add(floccules);

      tubeMeshes.push({ glass: tube, fluid, pellet, floccules });
    }

    // Animation loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      controls.update();

      // Gentle floating animation of floccules
      tubeMeshes.forEach((tm, idx) => {
        if (tm.floccules.visible) {
          tm.floccules.rotation.y = elapsed * 0.3 + idx;
        }
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
  }, [selectedAntigen, patientTiterIndex]);

  const diagnosticCutoffIndex = 3; // 1:160
  const isTyphoidPositive = patientTiterIndex >= diagnosticCutoffIndex;

  return (
    <div className="relative w-full h-full min-h-[460px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col">
      {/* 3D Canvas */}
      <div ref={containerRef} className="w-full flex-1 cursor-grab active:cursor-grabbing" />

      {/* Top HUD: Antigen & Widal Test Principle */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="px-3 py-1 bg-slate-900/90 backdrop-blur-md border border-slate-700/60 rounded-md text-xs font-semibold text-cyan-400 flex items-center gap-1.5 shadow-lg">
            <TestTube className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              {language === 'gu'
                ? 'વિડાલ એગ્લુટિનેશન પરીક્ષણ'
                : 'Widal Serological Agglutination Reaction'}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono hidden md:inline-block">
            {language === 'gu'
              ? 'દર્દીના સીરમનું સિરિયલ ડાયલ્યુશન'
              : 'Serial Patient Serum Dilutions'}
          </span>
        </div>

        {/* Antigen Toggle Button */}
        <div className="flex items-center gap-1.5 pointer-events-auto bg-slate-900/90 backdrop-blur-md border border-slate-700/60 p-1 rounded-lg shadow-lg">
          <button
            onClick={() => setSelectedAntigen('TO')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
              selectedAntigen === 'TO'
                ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            TO (Somatic O)
          </button>
          <button
            onClick={() => setSelectedAntigen('TH')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
              selectedAntigen === 'TH'
                ? 'bg-amber-500/25 text-amber-300 border border-amber-400/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            TH (Flagellar H)
          </button>
        </div>
      </div>

      {/* Diagnostic Interpretation Overlay */}
      <div className="absolute top-16 left-3 max-w-sm pointer-events-auto hidden sm:block">
        <div
          className={`p-3 backdrop-blur-md border rounded-lg shadow-2xl text-xs space-y-1.5 ${
            isTyphoidPositive
              ? 'bg-rose-950/80 border-rose-600/70 text-rose-100'
              : 'bg-emerald-950/80 border-emerald-600/70 text-emerald-100'
          }`}
        >
          <div className="flex items-center gap-1.5 font-bold">
            {isTyphoidPositive ? (
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
            <span>
              {isTyphoidPositive
                ? language === 'gu'
                  ? 'પોઝિટિવ પરિણામ (સક્રિય ટાઈફોઈડ સંક્રમણ)'
                  : 'POSITIVE: Active Typhoid Enteric Fever'
                : language === 'gu'
                ? 'સામાન્ય / નેગેટિવ ટાઈટર'
                : 'NEGATIVE: Baseline Non-Diagnostic Titer'}
            </span>
          </div>
          <p className="text-[11px] leading-relaxed opacity-90">
            {language === 'gu'
              ? `દર્દીનો ${selectedAntigen} ટાઈટર ${dilutions[patientTiterIndex]} છે. ભારતીય પરિપ્રેક્ષ્યમાં ૧:૧૬૦ કે તેથી વધુ ટાઈટર રોગની પુષ્ટિ કરે છે.`
              : `Current ${selectedAntigen} antibody titer is ${dilutions[patientTiterIndex]}. A titer ≥ 1:160 signifies active S. Typhi infection in endemic regions.`}
          </p>
          <div className="text-[10px] opacity-80 pt-1 border-t border-white/10 flex justify-between font-mono">
            <span>
              {selectedAntigen === 'TO'
                ? language === 'gu'
                  ? 'દાણાદાર એગ્લુટિનેશન (Granular)'
                  : 'Compact Granular Clump'
                : language === 'gu'
                ? 'રૂ જેવા ફોફા (Fluffy)'
                : 'Loose Fluffy Flocculation'}
            </span>
            <span>Cutoff: ≥ 1:160</span>
          </div>
        </div>
      </div>

      {/* Bottom Titer Dilution Slider Strip */}
      <div className="absolute bottom-3 left-3 right-3 pointer-events-auto">
        <div className="p-2.5 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {language === 'gu'
                ? 'દર્દીનું એન્ટિબોડી ટાઈટર બદલો (Dilution Select):'
                : 'Simulate Patient Antibody Dilution Titer:'}
            </span>
            <span className="text-[11px] font-mono text-cyan-400 font-bold">
              Titer: {dilutions[patientTiterIndex]}
            </span>
          </div>

          <div className="grid grid-cols-6 gap-1.5">
            {dilutions.map((dil, idx) => {
              const isSelected = patientTiterIndex === idx;
              const isDiagnostic = idx >= 3;
              return (
                <button
                  key={dil}
                  onClick={() => setPatientTiterIndex(idx)}
                  className={`px-2 py-2 rounded text-center transition-all flex flex-col items-center ${
                    isSelected
                      ? isDiagnostic
                        ? 'bg-rose-950 border border-rose-400 text-white font-bold shadow-md shadow-rose-950'
                        : 'bg-emerald-950 border border-emerald-400 text-white font-bold'
                      : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <span className="text-[11px] font-mono">{dil}</span>
                  <span
                    className={`text-[9px] mt-0.5 ${
                      isDiagnostic ? 'text-rose-400 font-semibold' : 'text-slate-500'
                    }`}
                  >
                    {isDiagnostic
                      ? language === 'gu'
                        ? 'રોગકારક'
                        : 'Diagnostic'
                      : language === 'gu'
                      ? 'સામાન્ય'
                      : 'Sub-clinical'}
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
