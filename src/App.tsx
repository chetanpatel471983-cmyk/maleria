import React, { useState, useEffect } from 'react';
import { Language, SlideId } from './types/typhoid';
import {
  BACTERIUM_PARTS,
  PATHOGENESIS_STEPS,
  SYMPTOM_HOTSPOTS,
  TIMELINE_WEEKS,
  DIAGNOSTIC_METHODS,
} from './data/typhoidData';
import { Bacterium3DViewer } from './components/canvas3d/Bacterium3DViewer';
import { Pathogenesis3DViewer } from './components/canvas3d/Pathogenesis3DViewer';
import { AnatomySymptom3DViewer } from './components/canvas3d/AnatomySymptom3DViewer';
import { LabTest3DViewer } from './components/canvas3d/LabTest3DViewer';
import { TyphoidQuiz } from './components/TyphoidQuiz';
import { PresenterNotesModal } from './components/PresenterNotesModal';
import { useTyphoidSpeech } from './hooks/useTyphoidSpeech';
import {
  ChevronLeft,
  ChevronRight,
  Languages,
  BookOpen,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ShieldCheck,
  AlertCircle,
  Activity,
  Microscope,
  Info,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

// Generated medical images
const HERO_IMAGE = '/src/assets/images/typhoid_medical_hero_1790179507943.jpg';
const PEYERS_PATCH_IMAGE = '/src/assets/images/typhoid_peyers_patch_1790179521676.jpg';
const WIDAL_TEST_IMAGE = '/src/assets/images/typhoid_widal_test_1790179534313.jpg';

export default function App() {
  const [language, setLanguage] = useState<Language>('gu'); // Default to Gujarati as requested in prompt!
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [selectedBacteriumPartId, setSelectedBacteriumPartId] = useState<string>('cell_wall');
  const [pathogenesisStepIndex, setPathogenesisStepIndex] = useState<number>(0);
  const [selectedSymptomId, setSelectedSymptomId] = useState<string>('brain_fever');
  const [selectedTimelineWeek, setSelectedTimelineWeek] = useState<number>(1);
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const { isSpeaking, isSupported, speak, stop } = useTyphoidSpeech();

  const slides = [
    {
      id: 'overview',
      navLabel: { en: 'Bacterium 3D', gu: 'બેક્ટેરિયા 3D' },
      title: {
        en: 'Definition & 3D Anatomy of Salmonella Typhi',
        gu: 'ટાઈફોઈડ પરિચય અને સાલ્મોનેલા બેક્ટેરિયાનું 3D બંધારણ',
      },
      subtitle: {
        en: 'Microbiological morphology, antigenic factors (H, O, Vi), and structural virulence',
        gu: 'સૂક્ષ્મ જીવવિજ્ઞાન, એન્ટિજેન ઘટકો (H, O, Vi) અને રોગ ફેલાવવાની ક્ષમતા',
      },
    },
    {
      id: 'pathogenesis',
      navLabel: { en: 'Infection 3D', gu: 'ચેપની પ્રક્રિયા' },
      title: {
        en: "Infection Mechanism & 5-Stage Pathogenesis",
        gu: "સંક્રમણ પ્રક્રિયા અને ૫ તબક્કાવાર 3D સિમ્યુલેશન",
      },
      subtitle: {
        en: "From ingestion and M-cell invasion in Peyer's patches to systemic organ bacteremia",
        gu: 'જઠરના એસિડથી લઈને પેયર્સ પેચીસ, મેક્રોફેજ અને રક્તપ્રવાહમાં ફેલાવો',
      },
    },
    {
      id: 'symptoms',
      navLabel: { en: 'Symptoms 3D', gu: 'શારીરિક લક્ષણો' },
      title: {
        en: 'Interactive 3D Anatomical Symptoms & Signs',
        gu: 'માનવ શરીર અને ટાઈફોઈડના મુખ્ય લક્ષણો (Interactive 3D)',
      },
      subtitle: {
        en: "Step-ladder fever, Faget's sign relative bradycardia, rose spots, and hepatosplenomegaly",
        gu: 'પગથિયા જેવો તાવ, ધીમી નાડી (ફાગેટ્સ સાઈન), ગુલાબી ચકામા અને લીવર-બરોળનો સોજો',
      },
    },
    {
      id: 'timeline',
      navLabel: { en: 'Weekly Timeline', gu: 'અઠવાડિયાવાર તબક્કા' },
      title: {
        en: 'Clinical Natural Course & 4-Week Progression',
        gu: '૪ સપ્તાહનો રોગનો કુદરતી પ્રવાહ અને ગૂંચવણો',
      },
      subtitle: {
        en: 'Week 1 onset to Week 3 bowel perforation risks and Week 4 carrier state',
        gu: 'પ્રથમ સપ્તાહથી લઈને ત્રીજા સપ્તાહના રક્તસ્રાવ/કાણું પડવાના જોખમો',
      },
    },
    {
      id: 'diagnosis',
      navLabel: { en: 'Diagnosis & Prevention', gu: 'નિદાન અને બચાવ' },
      title: {
        en: 'Diagnostic Assays, Antimicrobial Therapy & Vaccines',
        gu: 'લેબોરેટરી નિદાન (વિડાલ અને કલ્ચર), સારવાર અને રસીકરણ',
      },
      subtitle: {
        en: 'Blood culture gold standard, 3D Widal agglutination rack, antibiotics & TCV prevention',
        gu: 'બ્લડ કલ્ચર, 3D વિડાલ ટેસ્ટ, દવાઓ અને ટાઈફોઈડ કોન્જુગેટ વેક્સિન',
      },
    },
    {
      id: 'quiz',
      navLabel: { en: 'Medical Quiz', gu: 'જ્ઞાન કસોટી' },
      title: {
        en: 'Interactive Clinical Assessment & Knowledge Review',
        gu: 'તબીબી મૂલ્યાંકન અને જ્ઞાન કસોટી (Interactive Quiz)',
      },
      subtitle: {
        en: 'Test comprehension with instant clinical rationales in Gujarati & English',
        gu: 'તમારી સમજ ચકાસો અને દરેક પ્રશ્ન પાછળનું વૈજ્ઞાનિક કારણ જાણો',
      },
    },
  ];

  const currentSlide = slides[currentSlideIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  const toggleLanguage = () => {
    stop();
    setLanguage((prev) => (prev === 'gu' ? 'en' : 'gu'));
  };

  const handleAudioNarration = () => {
    if (isSpeaking) {
      stop();
      return;
    }

    let textToSpeak = `${currentSlide.title[language]}. ${currentSlide.subtitle[language]}.`;
    if (currentSlide.id === 'overview') {
      const part = BACTERIUM_PARTS.find((p) => p.id === selectedBacteriumPartId);
      if (part) {
        textToSpeak += ` ${part.name[language]}. ${part.role[language]}. ${part.clinicalSignificance[language]}`;
      }
    } else if (currentSlide.id === 'pathogenesis') {
      const step = PATHOGENESIS_STEPS[pathogenesisStepIndex];
      if (step) {
        textToSpeak += ` ${step.title[language]}. ${step.summary[language]}. ${step.mechanism[language]}`;
      }
    } else if (currentSlide.id === 'symptoms') {
      const sym = SYMPTOM_HOTSPOTS.find((s) => s.id === selectedSymptomId);
      if (sym) {
        textToSpeak += ` ${sym.title[language]}. ${sym.description[language]}`;
      }
    }

    speak(textToSpeak, language);
  };

  const selectedPart =
    BACTERIUM_PARTS.find((p) => p.id === selectedBacteriumPartId) || BACTERIUM_PARTS[0];
  const activePathStep = PATHOGENESIS_STEPS[pathogenesisStepIndex];
  const activeSymptom =
    SYMPTOM_HOTSPOTS.find((s) => s.id === selectedSymptomId) || SYMPTOM_HOTSPOTS[0];
  const activeWeekData =
    TIMELINE_WEEKS.find((w) => w.week === selectedTimelineWeek) || TIMELINE_WEEKS[0];

  return (
    <div
      className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white ${
        isFullscreen ? 'p-0' : ''
      }`}
    >
      {/* =========================================================================
          TOP BAR CONTRACT (Exact 1-row, 3-zone contract as per Section 2)
          [Brand title, one line] — [4-6 nav links, single-line] — [1-2 primary actions]
         ========================================================================= */}
      <header className="h-16 px-4 md:px-8 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md flex items-center justify-between sticky top-0 z-40 shrink-0">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-cyan-900/40">
            T3D
          </span>
          <a
            href="/"
            className="text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap"
          >
            Typho3D
          </a>
          <span className="text-[11px] text-slate-500 font-mono hidden xl:inline">
            · S. Typhi Pathogenesis Atlas
          </span>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          {slides.map((s, idx) => {
            const isActive = currentSlideIndex === idx;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  isActive
                    ? 'text-cyan-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                <span>{s.navLabel[language]}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          {/* Audio narration button */}
          {isSupported && (
            <button
              onClick={handleAudioNarration}
              className={`p-2 rounded-lg border transition-colors flex items-center gap-1.5 text-xs font-medium ${
                isSpeaking
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 animate-pulse'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white hover:bg-slate-800'
              }`}
              title={isSpeaking ? 'Stop Audio' : 'Listen to Explanation (Audio Guide)'}
            >
              {isSpeaking ? (
                <VolumeX className="w-4 h-4 text-cyan-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-slate-400" />
              )}
              <span className="hidden sm:inline">
                {isSpeaking
                  ? language === 'gu'
                    ? 'બંધ કરો'
                    : 'Stop'
                  : language === 'gu'
                  ? 'ઓડિયો ગાઇડ'
                  : 'Listen'}
              </span>
            </button>
          )}

          {/* Presenter Notes Button */}
          <button
            onClick={() => setIsNotesOpen(true)}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
            title="Presenter Notes & Teaching Pearls"
          >
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">
              {language === 'gu' ? 'નોટ્સ' : 'Notes'}
            </span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{language === 'gu' ? 'English' : 'ગુજરાતી'}</span>
          </button>
        </div>
      </header>

      {/* Main Slide Deck Viewport */}
      <main className="flex-1 flex flex-col max-w-[1560px] w-full mx-auto px-4 md:px-8 py-4 sm:py-6 gap-4">
        {/* Slide Header & Breadcrumb Info */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-3 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span>SLIDE 0{currentSlideIndex + 1} / 0{slides.length}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400 uppercase">
                {currentSlide.id.toUpperCase()} MODULE
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {currentSlide.title[language]}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              {currentSlide.subtitle[language]}
            </p>
          </div>

          {/* Slide Navigation Buttons */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentSlideIndex === 0}
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{language === 'gu' ? 'પાછળ' : 'Previous'}</span>
            </button>
            <button
              onClick={() => setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))}
              disabled={currentSlideIndex === slides.length - 1}
              className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 shadow-md shadow-cyan-950"
            >
              <span>{language === 'gu' ? 'આગળ' : 'Next Slide'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            TWO-ZONE INTERACTIVE LEARNING STAGE
            65% Left Stage (3D Canvas) + 35% Right Deck (Concept Breakdown & Controls)
           ========================================================================= */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[550px]">
          {/* LEFT ZONE: Dynamic 3D Medical Visualizer (7-8 cols on lg screen) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col h-full min-h-[480px]">
            {currentSlide.id === 'overview' && (
              <Bacterium3DViewer
                language={language}
                selectedPartId={selectedBacteriumPartId}
                onSelectPart={(id) => setSelectedBacteriumPartId(id)}
              />
            )}

            {currentSlide.id === 'pathogenesis' && (
              <Pathogenesis3DViewer
                language={language}
                currentStepIndex={pathogenesisStepIndex}
                onStepChange={(idx) => setPathogenesisStepIndex(idx)}
              />
            )}

            {currentSlide.id === 'symptoms' && (
              <AnatomySymptom3DViewer
                language={language}
                selectedSymptomId={selectedSymptomId}
                onSelectSymptom={(id) => setSelectedSymptomId(id)}
              />
            )}

            {currentSlide.id === 'timeline' && (
              /* High-impact Weekly Visualizer Stage with Anatomy & Organ Involvement */
              <div className="w-full h-full min-h-[460px] bg-slate-900/60 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Week Tabs */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                      {language === 'gu' ? 'સમયરેખા પસંદ કરો:' : 'Select Infection Week:'}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      {activeWeekData.temperature}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {TIMELINE_WEEKS.map((w) => {
                      const isActive = selectedTimelineWeek === w.week;
                      return (
                        <button
                          key={w.week}
                          onClick={() => setSelectedTimelineWeek(w.week)}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            isActive
                              ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-950/50'
                              : 'bg-slate-950/70 border-slate-800 hover:bg-slate-900/80 text-slate-400'
                          }`}
                        >
                          <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                            WEEK 0{w.week}
                          </div>
                          <div className="text-xs font-bold text-white truncate mt-0.5">
                            {w.title[language].split(':')[1] || w.title[language]}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Temperature Curve & Step-Ladder Graph representation */}
                  <div className="p-4 bg-slate-950/90 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                        <Activity className="w-4 h-4 text-rose-400" />
                        <span>
                          {language === 'gu'
                            ? 'સ્ટેપ-લેડર તાવનું તાપમાન ચાર્ટ'
                            : 'Step-Ladder Pyrexia Trajectory'}
                        </span>
                      </span>
                      <span className="font-mono text-rose-400 font-bold">
                        {activeWeekData.temperature}
                      </span>
                    </div>

                    {/* Step-ladder visual staircase */}
                    <div className="h-28 w-full bg-slate-900/60 rounded-lg p-2 flex items-end justify-between gap-2 border border-slate-800/80 relative">
                      {[
                        { day: 'Day 1-3', temp: '100.5°F', height: '35%', week: 1 },
                        { day: 'Day 4-7', temp: '102.5°F', height: '55%', week: 1 },
                        { day: 'Day 8-10', temp: '103.8°F', height: '80%', week: 2 },
                        { day: 'Day 11-14', temp: '104.2°F', height: '90%', week: 2 },
                        { day: 'Day 15-18', temp: '104.5°F', height: '98%', week: 3 },
                        { day: 'Day 19-21', temp: '103.0°F', height: '70%', week: 3 },
                        { day: 'Day 22-28', temp: '99.0°F', height: '25%', week: 4 },
                      ].map((item, idx) => {
                        const isCurrentWeek = item.week === selectedTimelineWeek;
                        return (
                          <div
                            key={idx}
                            className="flex-1 flex flex-col items-center justify-end h-full gap-1"
                          >
                            <span
                              className={`text-[9px] font-mono ${
                                isCurrentWeek ? 'text-rose-300 font-bold' : 'text-slate-600'
                              }`}
                            >
                              {item.temp}
                            </span>
                            <div
                              style={{ height: item.height }}
                              className={`w-full rounded-t transition-all ${
                                isCurrentWeek
                                  ? 'bg-gradient-to-t from-rose-600 to-amber-400 shadow-md shadow-rose-900'
                                  : 'bg-slate-800 opacity-40'
                              }`}
                            />
                            <span
                              className={`text-[9px] font-mono ${
                                isCurrentWeek ? 'text-cyan-400' : 'text-slate-600'
                              }`}
                            >
                              {item.day}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Microscopic & Histological Real Evidence Image */}
                  <div className="relative rounded-xl overflow-hidden border border-slate-800 h-44 bg-slate-950 flex items-center justify-center">
                    <img
                      src={PEYERS_PATCH_IMAGE}
                      alt="Intestinal Pathology and Peyer's patch"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-3">
                      <span className="text-[10px] font-mono text-cyan-300 uppercase">
                        {language === 'gu'
                          ? 'પેથોલોજીકલ ક્રોસ-સેક્શન દર્શન'
                          : 'Pathological Cross-Section'}
                      </span>
                      <p className="text-xs text-white font-medium line-clamp-1">
                        {activeWeekData.pathology[language]}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>
                    {language === 'gu'
                      ? 'ઓપરેશન અને તાત્કાલિક જોખમ સંકેત:'
                      : 'Emergency Danger Indicator:'}
                  </span>
                  <span className="text-rose-400 font-semibold truncate max-w-md">
                    {activeWeekData.dangerSigns[language]}
                  </span>
                </div>
              </div>
            )}

            {currentSlide.id === 'diagnosis' && (
              <LabTest3DViewer language={language} />
            )}

            {currentSlide.id === 'quiz' && (
              <TyphoidQuiz language={language} />
            )}
          </div>

          {/* RIGHT ZONE: Deep Concept Breakdown Deck (4-5 cols on lg screen) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4">
            {/* Slide 1 Concept Deck: Bacterium Structure */}
            {currentSlide.id === 'overview' && (
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 flex flex-col justify-between flex-1 overflow-y-auto space-y-4">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
                      {language === 'gu' ? 'બેક્ટેરિયાનું બંધારણ' : 'Structural Antigen Analysis'}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {selectedPart.antigenType}
                    </span>
                  </div>

                  <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: selectedPart.color }}
                      />
                      <h3 className="font-bold text-white text-base">
                        {selectedPart.name[language]}
                      </h3>
                    </div>
                    {selectedPart.scientificName && (
                      <p className="text-xs font-mono text-cyan-300">
                        {selectedPart.scientificName}
                      </p>
                    )}
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {selectedPart.role[language]}
                    </p>
                  </div>

                  {/* Clinical Significance Card */}
                  <div className="p-3.5 bg-cyan-950/30 border border-cyan-800/40 rounded-xl space-y-1">
                    <span className="text-[11px] font-bold text-cyan-400 uppercase flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{language === 'gu' ? 'તબીબી મહત્વ (Clinical Pearl):' : 'Clinical Significance:'}</span>
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedPart.clinicalSignificance[language]}
                    </p>
                  </div>

                  {/* Microscopic Evidence Banner */}
                  <div className="relative rounded-xl overflow-hidden border border-slate-800 h-32 bg-slate-950">
                    <img
                      src={HERO_IMAGE}
                      alt="Salmonella Typhi Microscopic 3D"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-2.5">
                      <span className="text-[11px] font-semibold text-slate-200">
                        {language === 'gu'
                          ? 'સાલ્મોનેલા એન્ટેરિકા - માનવ આંતરડાના મ્યુકોસા પાસે'
                          : 'Salmonella enterica approaching human gut mucosa'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{language === 'gu' ? 'ઇન્ટરેક્ટિવ 3D મોડલ' : 'Interactive 3D Viewer'}</span>
                  <span>{language === 'gu' ? 'પાર્ટ્સ બદલવા નીચે ક્લિક કરો' : 'Select parts below'}</span>
                </div>
              </div>
            )}

            {/* Slide 2 Concept Deck: Pathogenesis Steps */}
            {currentSlide.id === 'pathogenesis' && (
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 flex flex-col justify-between flex-1 overflow-y-auto space-y-4">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      STAGE {activePathStep.step} / {PATHOGENESIS_STEPS.length}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {activePathStep.timeframe[language]}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-white">
                    {activePathStep.title[language]}
                  </h3>

                  {/* Mechanism Box */}
                  <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1.5">
                    <span className="text-[11px] font-mono text-cyan-400 uppercase font-bold">
                      {language === 'gu' ? 'કોષીય પ્રક્રિયા (Cellular Mechanism):' : 'Cellular Mechanism:'}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activePathStep.mechanism[language]}
                    </p>
                  </div>

                  {/* Immune System Response */}
                  <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1.5">
                    <span className="text-[11px] font-mono text-amber-400 uppercase font-bold">
                      {language === 'gu' ? 'રોગપ્રતિકારક પ્રતિક્રિયા:' : 'Host Immune Response:'}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activePathStep.immuneResponse[language]}
                    </p>
                  </div>

                  {/* Clinical Sign */}
                  <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl space-y-1">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase">
                      {language === 'gu' ? 'દર્દીમાં દેખાતા ચિહ્નો:' : 'Observable Clinical Sign:'}
                    </span>
                    <p className="text-xs text-emerald-200">
                      {activePathStep.clinicalSign[language]}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between font-mono">
                  <span>{activePathStep.location[language]}</span>
                  <span>Step {activePathStep.step} of 5</span>
                </div>
              </div>
            )}

            {/* Slide 3 Concept Deck: Symptoms & Anatomy */}
            {currentSlide.id === 'symptoms' && (
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 flex flex-col justify-between flex-1 overflow-y-auto space-y-4">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-rose-400 font-bold uppercase">
                      {activeSymptom.organ[language]}
                    </span>
                    <span className="text-xs font-mono text-cyan-400">
                      Onset: {activeSymptom.onsetWeek}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-white">
                    {activeSymptom.title[language]}
                  </h3>

                  <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeSymptom.description[language]}
                    </p>
                    <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-cyan-300">
                      Term: {activeSymptom.medicalTerm}
                    </div>
                  </div>

                  {/* Pathophysiology Box */}
                  <div className="p-3.5 bg-rose-950/30 border border-rose-800/40 rounded-xl space-y-1">
                    <span className="text-[11px] font-bold text-rose-400 uppercase">
                      {language === 'gu' ? 'પેથોફિઝિયોલોજી (કેમ થાય છે?):' : 'Pathophysiological Mechanism:'}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeSymptom.mechanism[language]}
                    </p>
                  </div>

                  {/* Special Highlight for Carrier State or Faget's Sign */}
                  <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-xl text-xs space-y-1">
                    <span className="font-bold text-amber-300">
                      {language === 'gu' ? 'તબીબી વિશેષતા:' : 'Special Clinical Fact:'}
                    </span>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      {activeSymptom.id === 'heart_bradycardia'
                        ? language === 'gu'
                          ? 'સામાન્ય રીતે તાવમાં નાડી ઝડપી બને છે. પરંતુ ટાઈફોઈડમાં ઊંચો તાવ છતાં નાડી ધીમી રહે છે (ફાગેટ્સ સાઈન).'
                          : "Normally heart rate rises ~10 bpm per degree of fever. Typhoid exhibits relative bradycardia (sphygmo-thermic dissociation)."
                        : activeSymptom.id === 'gallbladder_carrier'
                        ? language === 'gu'
                          ? 'ટાઈફોઈડ મેરી (Mary Mallon) પિત્તાશયમાં બેક્ટેરિયા ધરાવતી હોવાથી સ્વસ્થ હોવા છતાં ડઝનેક લોકોને ચેપ લગાડ્યો હતો.'
                          : 'Mary Mallon ("Typhoid Mary") was a healthy carrier whose gallbladder shed Salmonella to dozens of households.'
                        : language === 'gu'
                        ? 'રોઝ સ્પોટ્સ ચામડીમાં બેક્ટેરિયાના સૂક્ષ્મ ગઠ્ઠા જામવાથી બને છે અને દબાવવાથી સફેદ પડે છે.'
                        : 'Rose spots blanch on pressure and indicate bacteremic emboli lodging in papillary dermis.'}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between font-mono">
                  <span>{activeSymptom.gujaratiPhonetic}</span>
                  <span className="text-rose-400 uppercase">{activeSymptom.severity}</span>
                </div>
              </div>
            )}

            {/* Slide 4 Concept Deck: Weekly Clinical Manifestations */}
            {currentSlide.id === 'timeline' && (
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 flex flex-col justify-between flex-1 overflow-y-auto space-y-4">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
                      WEEK 0{activeWeekData.week} CLINICAL COURSE
                    </span>
                    <span className="text-xs font-mono text-rose-400 font-bold">
                      {activeWeekData.temperature}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-white">
                    {activeWeekData.title[language]}
                  </h3>

                  {/* Bullet points */}
                  <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase font-bold">
                      {language === 'gu' ? 'મુખ્ય લક્ષણો અને અનુભવો:' : 'Key Clinical Manifestations:'}
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {activeWeekData.keyFeatures[language].map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Diagnostic yield */}
                  <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl space-y-1">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase">
                      {language === 'gu' ? 'આ અઠવાડિયે કયો ટેસ્ટ કરવો?:' : 'Diagnostic Test Recommendation:'}
                    </span>
                    <p className="text-xs text-slate-300">
                      {activeWeekData.diagnosticYield[language]}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between font-mono">
                  <span>Week {activeWeekData.week} of 4</span>
                  <span className="text-cyan-400">{activeWeekData.temperature}</span>
                </div>
              </div>
            )}

            {/* Slide 5 Concept Deck: Diagnostics, Treatment & Vaccines */}
            {currentSlide.id === 'diagnosis' && (
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 flex flex-col justify-between flex-1 overflow-y-auto space-y-4">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
                      {language === 'gu' ? 'નિદાન પદ્ધતિઓ' : 'Diagnostic Protocols'}
                    </span>
                    <span className="text-xs font-mono text-emerald-400">
                      BASU Mnemonic
                    </span>
                  </div>

                  {/* Real Lab Image Card */}
                  <div className="relative rounded-xl overflow-hidden border border-slate-800 h-28 bg-slate-950">
                    <img
                      src={WIDAL_TEST_IMAGE}
                      alt="Laboratory Widal Test Tubes"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-2.5">
                      <span className="text-[11px] font-semibold text-white">
                        {language === 'gu'
                          ? 'વિડાલ એગ્લુટિનેશન એસે અને બ્લડ કલ્ચર પરીક્ષણ'
                          : 'Widal Agglutination & Bacterial Culture Laboratory'}
                      </span>
                    </div>
                  </div>

                  {/* Diagnostic Table Overview */}
                  <div className="space-y-2">
                    {DIAGNOSTIC_METHODS.slice(0, 2).map((diag) => (
                      <div
                        key={diag.id}
                        className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between font-bold text-white">
                          <span>{diag.name[language]}</span>
                          <span className="text-[10px] font-mono text-cyan-400">{diag.accuracy}</span>
                        </div>
                        <p className="text-slate-400 text-[11px]">{diag.principle[language]}</p>
                        <div className="text-emerald-400 text-[10px] pt-1 border-t border-slate-850">
                          {diag.positiveResult[language]}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Treatment & Vaccine Protocol */}
                  <div className="p-3.5 bg-cyan-950/30 border border-cyan-800/40 rounded-xl space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-cyan-400 font-bold uppercase text-[11px]">
                      <ShieldCheck className="w-4 h-4" />
                      <span>{language === 'gu' ? 'સારવાર અને રસીકરણ (Prevention):' : 'Therapeutics & Vaccination:'}</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {language === 'gu'
                        ? '• દવાઓ: સેફ્ટ્રિએક્સોન (Ceftriaxone) અથવા એઝિથ્રોમાયસિન (Azithromycin).\n• રસી: TCV (ટાઈફોઈડ કોન્જુગેટ વેક્સિન - ૬ મહિનાથી વધુ ઉંમરના બાળકો માટે લાંબા ગાળાનું રક્ષણ).\n• ઉકાળેલું પીવાનું પાણી અને હાથની સ્વચ્છતા.'
                        : '• 1st Line: Ceftriaxone or Azithromycin (due to fluoroquinolone XDR resistance).\n• Vaccine: Typhoid Conjugate Vaccine (TCV) single dose provides lasting immunity from 6 months of age.\n• Safe food hygiene and potable boiled drinking water.'}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between font-mono">
                  <span>{language === 'gu' ? 'વિડાલ ટ્યુબ સિમ્યુલેશન' : '3D Dilution Tubes'}</span>
                  <span className="text-cyan-400">Cutoff: 1:160</span>
                </div>
              </div>
            )}

            {/* Slide 6 Concept Deck: Quiz summary */}
            {currentSlide.id === 'quiz' && (
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 flex flex-col justify-between flex-1 overflow-y-auto space-y-4">
                <div className="space-y-3.5">
                  <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
                    {language === 'gu' ? 'તબીબી સારાંશ' : 'Clinical Summary & Takeaways'}
                  </span>

                  <h3 className="font-bold text-lg text-white">
                    {language === 'gu'
                      ? 'ટાઈફોઈડ વિશે મુખ્ય યાદ રાખવાની બાબતો'
                      : 'Essential Typhoid Clinical Pearls'}
                  </h3>

                  <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
                    <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                      <strong className="text-cyan-400 block mb-0.5">
                        {language === 'gu' ? '૧. કારક જીવાણુ:' : '1. Etiology:'}
                      </strong>
                      {language === 'gu'
                        ? 'સાલ્મોનેલા એન્ટેરિકા સેરોટાઈપ ટાઈફી (Salmonella Typhi), ગ્રામ-નેગેટિવ, મોટાઈલ સળિયા આકારનો બેક્ટેરિયા.'
                        : 'Salmonella enterica serotype Typhi, a motile flagellated Gram-negative rod.'}
                    </div>

                    <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                      <strong className="text-emerald-400 block mb-0.5">
                        {language === 'gu' ? '૨. સંક્રમણ માર્ગ:' : '2. Transmission:'}
                      </strong>
                      {language === 'gu'
                        ? 'દૂષિત પાણી અને ખોરાક દ્વારા (Fecal-oral route). પેયર્સ પેચીસમાંથી લોહીમાં પ્રવેશે છે.'
                        : "Oral-fecal route. Crosses M-cells into Peyer's patches, hijacking macrophages."}
                    </div>

                    <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                      <strong className="text-rose-400 block mb-0.5">
                        {language === 'gu' ? '૩. મુખ્ય લક્ષણો:' : '3. Hallmarks:'}
                      </strong>
                      {language === 'gu'
                        ? 'સ્ટેપ-લેડર તાવ, ફાગેટ્સ સાઈન (ધીમી નાડી), રોઝ સ્પોટ્સ, લીવર-બરોળનો સોજો અને વટાણાના સૂપ જેવા ઝાડા.'
                        : 'Step-ladder fever, relative bradycardia, rose spots, and pea-soup diarrhea.'}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between font-mono">
                  <span>{language === 'gu' ? '૫ પ્રશ્નોની કસોટી' : '5-Question Evaluation'}</span>
                  <span className="text-emerald-400">Score Tracker</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Slide Strip & Quick Navigation */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2 overflow-x-auto py-1">
          <div className="flex items-center gap-1.5">
            {slides.map((s, idx) => {
              const isCurrent = currentSlideIndex === idx;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isCurrent
                      ? 'bg-slate-800 text-cyan-400 border border-cyan-500/50 shadow-sm'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-850'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-70">0{idx + 1}</span>
                  <span>{s.navLabel[language]}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span>{language === 'gu' ? 'કીબોર્ડ:' : 'Keyboard:'}</span>
            <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded text-[10px]">
              ←
            </kbd>
            <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded text-[10px]">
              →
            </kbd>
          </div>
        </div>
      </main>

      {/* Presenter Notes & Medical Pearls Modal */}
      <PresenterNotesModal
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        language={language}
        currentSlideIndex={currentSlideIndex}
      />
    </div>
  );
}
