import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SYMPTOM_HOTSPOTS } from '../../data/typhoidData';
import { Language, SymptomHotspot } from '../../types/typhoid';
import { Thermometer, RotateCw, ZoomIn, Eye, Activity, Heart } from 'lucide-react';

interface AnatomySymptom3DViewerProps {
  language: Language;
  selectedSymptomId: string;
  onSelectSymptom: (id: string) => void;
}

export const AnatomySymptom3DViewer: React.FC<AnatomySymptom3DViewerProps> = ({
  language,
  selectedSymptomId,
  onSelectSymptom,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [feverTemp, setFeverTemp] = useState<number>(104.0); // Fahrenheit
  const [showHeatmap, setShowHeatmap] = useState(true);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const targetCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.2, 5.0));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.1, 0));

  // Camera focus positions for specific organs
  const organCameraFocus: Record<string, { cam: THREE.Vector3; look: THREE.Vector3 }> = {
    brain_fever: {
      cam: new THREE.Vector3(0, 2.0, 2.6),
      look: new THREE.Vector3(0, 1.85, 0),
    },
    heart_bradycardia: {
      cam: new THREE.Vector3(0.3, 1.45, 2.6),
      look: new THREE.Vector3(0.15, 1.35, 0),
    },
    skin_rose_spots: {
      cam: new THREE.Vector3(0, 1.1, 2.5),
      look: new THREE.Vector3(0, 1.05, 0),
    },
    liver_spleen: {
      cam: new THREE.Vector3(-0.4, 0.95, 2.8),
      look: new THREE.Vector3(-0.2, 0.9, 0),
    },
    gallbladder_carrier: {
      cam: new THREE.Vector3(0.35, 0.9, 2.6),
      look: new THREE.Vector3(0.2, 0.85, 0),
    },
    bowel_ulcers: {
      cam: new THREE.Vector3(0, 0.5, 2.8),
      look: new THREE.Vector3(0, 0.45, 0),
    },
  };

  useEffect(() => {
    const focus = organCameraFocus[selectedSymptomId];
    if (focus) {
      targetCameraPos.current.copy(focus.cam);
      targetLookAt.current.copy(focus.look);
    } else {
      targetCameraPos.current.set(0, 1.2, 5.0);
      targetLookAt.current.set(0, 1.1, 0);
    }
  }, [selectedSymptomId]);

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
    camera.position.set(0, 1.2, 5.0);
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
    controls.minDistance = 1.8;
    controls.maxDistance = 8;
    controls.target.set(0, 1.1, 0);
    controlsRef.current = controls;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x38bdf8, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight1.position.set(4, 6, 6);
    scene.add(dirLight1);

    const rimLight = new THREE.DirectionalLight(0x06b6d4, 2.4);
    rimLight.position.set(-4, 2, -4);
    scene.add(rimLight);

    const bodyGroup = new THREE.Group();
    scene.add(bodyGroup);

    // 1. Semi-transparent Holographic Human Silhouette
    // Head
    const headGeo = new THREE.SphereGeometry(0.38, 24, 24);
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
      roughness: 0.2,
      transmission: 0.6,
      thickness: 0.8,
      wireframe: false,
    });
    const headMesh = new THREE.Mesh(headGeo, bodyMat);
    headMesh.position.set(0, 1.85, 0);
    bodyGroup.add(headMesh);

    // Torso / Chest / Abdomen (Tapered geometry)
    const torsoGeo = new THREE.CylinderGeometry(0.7, 0.55, 1.6, 24);
    const torsoMesh = new THREE.Mesh(torsoGeo, bodyMat);
    torsoMesh.position.set(0, 0.9, 0);
    bodyGroup.add(torsoMesh);

    // Pelvis
    const pelvisGeo = new THREE.CylinderGeometry(0.55, 0.45, 0.5, 24);
    const pelvisMesh = new THREE.Mesh(pelvisGeo, bodyMat);
    pelvisMesh.position.set(0, -0.15, 0);
    bodyGroup.add(pelvisMesh);

    // Upper Arms & Legs (Subtle stylized limbs)
    const limbMat = new THREE.MeshBasicMaterial({
      color: 0x1e293b,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    // Left Arm
    const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.08, 1.4, 8), limbMat);
    leftArm.position.set(0.9, 0.8, 0);
    leftArm.rotation.z = -0.15;
    bodyGroup.add(leftArm);
    // Right Arm
    const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.08, 1.4, 8), limbMat);
    rightArm.position.set(-0.9, 0.8, 0);
    rightArm.rotation.z = 0.15;
    bodyGroup.add(rightArm);

    // 2. ORGANS:
    // A. Brain (Encephalopathy & step-ladder fever source)
    const brainGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const brainMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0xe11d48,
      emissiveIntensity: 0.6,
      roughness: 0.3,
    });
    const brainMesh = new THREE.Mesh(brainGeo, brainMat);
    brainMesh.position.set(0, 1.85, 0.05);
    bodyGroup.add(brainMesh);

    // B. Heart (Relative bradycardia - Faget's sign)
    const heartGeo = new THREE.DodecahedronGeometry(0.18, 1);
    const heartMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0x991b1b,
      emissiveIntensity: 0.5,
    });
    const heartMesh = new THREE.Mesh(heartGeo, heartMat);
    heartMesh.position.set(0.15, 1.35, 0.15);
    bodyGroup.add(heartMesh);

    // C. Liver (Enlarged hepatomegaly on right hypochondrium)
    const liverGeo = new THREE.BoxGeometry(0.55, 0.35, 0.3);
    const liverMat = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      emissive: 0x78350f,
      emissiveIntensity: 0.4,
      roughness: 0.4,
    });
    const liverMesh = new THREE.Mesh(liverGeo, liverMat);
    liverMesh.position.set(-0.25, 0.95, 0.12);
    liverMesh.rotation.z = -0.2;
    bodyGroup.add(liverMesh);

    // D. Gallbladder (Green-gold reservoir under liver)
    const gbGeo = new THREE.SphereGeometry(0.09, 12, 12);
    const gbMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.9,
    });
    const gbMesh = new THREE.Mesh(gbGeo, gbMat);
    gbMesh.position.set(-0.15, 0.8, 0.22);
    bodyGroup.add(gbMesh);

    // E. Spleen (Splenomegaly on left upper quadrant)
    const spleenGeo = new THREE.SphereGeometry(0.16, 14, 14);
    const spleenMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x6d28d9,
      emissiveIntensity: 0.6,
    });
    const spleenMesh = new THREE.Mesh(spleenGeo, spleenMat);
    spleenMesh.position.set(0.38, 0.9, 0.08);
    bodyGroup.add(spleenMesh);

    // F. Small Intestine & Peyer's Patches (Ileum loops)
    const gutGroup = new THREE.Group();
    bodyGroup.add(gutGroup);

    // Intestinal convoluted tube
    const gutPoints = [
      new THREE.Vector3(-0.2, 0.6, 0.15),
      new THREE.Vector3(0.2, 0.55, 0.18),
      new THREE.Vector3(0.15, 0.42, 0.2),
      new THREE.Vector3(-0.25, 0.38, 0.18),
      new THREE.Vector3(-0.15, 0.26, 0.2),
      new THREE.Vector3(0.2, 0.22, 0.18),
      new THREE.Vector3(0.0, 0.12, 0.15),
    ];
    const gutCurve = new THREE.CatmullRomCurve3(gutPoints);
    const gutGeo = new THREE.TubeGeometry(gutCurve, 40, 0.075, 12, false);
    const gutMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xb45309,
      emissiveIntensity: 0.4,
      roughness: 0.4,
    });
    const gutMesh = new THREE.Mesh(gutGeo, gutMat);
    gutGroup.add(gutMesh);

    // Inflamed Peyer's patch ulceration nodules on ileum
    const ulcerCount = 6;
    for (let u = 0; u < ulcerCount; u++) {
      const uMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xef4444 })
      );
      const t = 0.4 + (u / ulcerCount) * 0.5;
      const pt = gutCurve.getPoint(t);
      uMesh.position.copy(pt);
      gutGroup.add(uMesh);
    }

    // 3. Rose Spots on Trunk (Delicate salmon-pink circular macules)
    const roseSpotGroup = new THREE.Group();
    bodyGroup.add(roseSpotGroup);
    const spotCoords = [
      [-0.12, 1.15, 0.44],
      [0.08, 1.2, 0.43],
      [-0.05, 1.05, 0.45],
      [0.18, 1.02, 0.44],
      [-0.18, 0.95, 0.45],
      [0.05, 0.9, 0.46],
      [-0.08, 0.82, 0.45],
      [0.14, 0.78, 0.43],
    ];
    spotCoords.forEach(([x, y, z]) => {
      const spotMesh = new THREE.Mesh(
        new THREE.CircleGeometry(0.035, 16),
        new THREE.MeshBasicMaterial({
          color: 0xf472b6,
          side: THREE.DoubleSide,
        })
      );
      spotMesh.position.set(x, y, z);
      roseSpotGroup.add(spotMesh);
    });

    // 4. Interactive 3D Symptom Hotspots (Pulsing holographic target rings)
    const hotspotRings: { mesh: THREE.Group; id: string }[] = [];
    SYMPTOM_HOTSPOTS.forEach((spot) => {
      const ringGroup = new THREE.Group();
      ringGroup.position.set(spot.position[0], spot.position[1], spot.position[2]);

      const innerDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 12, 12),
        new THREE.MeshBasicMaterial({
          color: spot.severity === 'critical' ? 0xef4444 : 0x06b6d4,
        })
      );
      ringGroup.add(innerDot);

      const pulseRing = new THREE.Mesh(
        new THREE.RingGeometry(0.06, 0.085, 24),
        new THREE.MeshBasicMaterial({
          color: spot.severity === 'critical' ? 0xef4444 : 0x06b6d4,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8,
        })
      );
      ringGroup.add(pulseRing);

      bodyGroup.add(ringGroup);
      hotspotRings.push({ mesh: ringGroup, id: spot.id });
    });

    // Raycaster for 3D click interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(bodyGroup.children, true);

      if (intersects.length > 0) {
        // Find nearest hotspot
        const hitPoint = intersects[0].point;
        let closestSpot: SymptomHotspot | null = null;
        let minDist = 0.65;

        SYMPTOM_HOTSPOTS.forEach((spot) => {
          const sPos = new THREE.Vector3(spot.position[0], spot.position[1], spot.position[2]);
          const d = sPos.distanceTo(hitPoint);
          if (d < minDist) {
            minDist = d;
            closestSpot = spot;
          }
        });

        if (closestSpot) {
          onSelectSymptom((closestSpot as SymptomHotspot).id);
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera interpolation
      camera.position.lerp(targetCameraPos.current, 0.04);
      controls.target.lerp(targetLookAt.current, 0.04);
      controls.update();

      // Relative Bradycardia simulation:
      // In typhoid, heartbeat is slow despite high fever (~65-75 bpm instead of 110 bpm)
      const heartPulse = 1 + Math.sin(elapsed * 4.2) * 0.08;
      heartMesh.scale.set(heartPulse, heartPulse, heartPulse);

      // Pulse brain fever aura
      const brainPulse = 1 + Math.sin(elapsed * 2.5) * 0.04;
      brainMesh.scale.set(brainPulse, brainPulse, brainPulse);

      // Animate hotspot target rings
      hotspotRings.forEach((hr) => {
        const isSelected = hr.id === selectedSymptomId;
        const scale = isSelected ? 1.4 + Math.sin(elapsed * 6) * 0.15 : 1 + Math.sin(elapsed * 3) * 0.08;
        hr.mesh.scale.set(scale, scale, scale);
        hr.mesh.quaternion.copy(camera.quaternion); // Always billboard face the camera
      });

      // Update Thermographic Heatmap Color according to feverTemp
      if (showHeatmap) {
        const feverRatio = Math.max(0, Math.min(1, (feverTemp - 98.6) / (105 - 98.6)));
        // Interpolate between healthy cyan/blue (0x38bdf8) and high fever amber/crimson (0xf43f5e)
        bodyMat.color.setHSL(0.55 - feverRatio * 0.55, 0.85, 0.55);
        bodyMat.emissive.setHSL(0.55 - feverRatio * 0.55, 0.9, 0.25 * feverRatio);
      } else {
        bodyMat.color.setHex(0x38bdf8);
        bodyMat.emissive.setHex(0x000000);
      }

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
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.dispose();
      controls.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [showHeatmap, feverTemp, onSelectSymptom]);

  const activeHotspot =
    SYMPTOM_HOTSPOTS.find((s) => s.id === selectedSymptomId) || SYMPTOM_HOTSPOTS[0];

  return (
    <div className="relative w-full h-full min-h-[480px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col">
      {/* 3D Canvas */}
      <div ref={containerRef} className="w-full flex-1 cursor-grab active:cursor-grabbing" />

      {/* Top HUD: Fever Temperature Simulator & Organ Mode */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="px-3 py-1 bg-slate-900/90 backdrop-blur-md border border-slate-700/60 rounded-md text-xs font-semibold text-rose-400 flex items-center gap-1.5 shadow-lg">
            <Thermometer className="w-3.5 h-3.5 text-rose-400" />
            <span>
              {language === 'gu' ? 'તાપમાન સિમ્યુલેટર:' : 'Pyrexia Simulator:'} {feverTemp.toFixed(1)}°F (
              {(((feverTemp - 32) * 5) / 9).toFixed(1)}°C)
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono hidden md:inline-block">
            {feverTemp >= 103
              ? language === 'gu'
                ? 'સતત ઊંચો તાવ (High Plateau)'
                : 'Sustained High Pyrexia'
              : feverTemp >= 100
              ? language === 'gu'
                ? 'પગથિયા જેવો વધતો તાવ'
                : 'Step-Ladder Rising'
              : language === 'gu'
              ? 'સામાન્ય તાપમાન'
              : 'Euthermic (Normal)'}
          </span>
        </div>

        {/* Temperature Drag Slider */}
        <div className="flex items-center gap-2 pointer-events-auto bg-slate-900/90 backdrop-blur-md border border-slate-700/60 px-3 py-1.5 rounded-lg shadow-lg">
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            {language === 'gu' ? 'તાવ એડજસ્ટ કરો:' : 'Adjust Fever:'}
          </span>
          <input
            type="range"
            min="98.6"
            max="105.0"
            step="0.2"
            value={feverTemp}
            onChange={(e) => setFeverTemp(parseFloat(e.target.value))}
            className="w-24 sm:w-32 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />
        </div>
      </div>

      {/* Floating Organ Highlight Card when selected */}
      {activeHotspot && (
        <div className="absolute top-16 right-3 max-w-xs pointer-events-auto hidden md:block">
          <div className="p-3 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-lg shadow-2xl space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                {activeHotspot.organ[language]}
              </span>
              <span
                className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                  activeHotspot.severity === 'critical'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}
              >
                {activeHotspot.severity.toUpperCase()}
              </span>
            </div>
            <h4 className="font-semibold text-slate-100 text-sm">
              {activeHotspot.title[language]}
            </h4>
            <p className="text-slate-300 text-[11px] leading-relaxed line-clamp-3">
              {activeHotspot.description[language]}
            </p>
            <div className="pt-1 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
              <span>{activeHotspot.medicalTerm}</span>
              <span className="font-mono text-emerald-400">{activeHotspot.onsetWeek}</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Symptom Hotspots Selector */}
      <div className="absolute bottom-3 left-3 right-3 pointer-events-auto">
        <div className="p-2.5 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {language === 'gu'
                ? 'શરીરના લક્ષણો (અંગ પર ક્લિક કરો):'
                : 'Interactive Anatomical Symptoms (Click to focus):'}
            </span>
            <span className="text-[11px] text-slate-400">
              {language === 'gu' ? '3D શરીર પર ક્લિક કરી શકો છો' : 'Click in 3D to inspect'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5">
            {SYMPTOM_HOTSPOTS.map((spot) => {
              const isSelected = selectedSymptomId === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => onSelectSymptom(spot.id)}
                  className={`px-2 py-1.5 rounded text-left transition-all flex flex-col ${
                    isSelected
                      ? 'bg-rose-950/80 border border-rose-400/80 text-white shadow-md shadow-rose-950'
                      : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <span className="text-[9px] font-mono text-cyan-400 uppercase truncate">
                    {spot.organ[language]}
                  </span>
                  <span className="text-[11px] font-medium truncate">
                    {spot.title[language]}
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
