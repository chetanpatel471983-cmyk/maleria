import React from 'react';
import { Language } from '../types/typhoid';
import { X, BookOpen, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

interface PresenterNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currentSlideIndex: number;
}

export const PresenterNotesModal: React.FC<PresenterNotesModalProps> = ({
  isOpen,
  onClose,
  language,
  currentSlideIndex,
}) => {
  if (!isOpen) return null;

  const notesBySlide = [
    {
      title: {
        en: 'Slide 1: Bacteriology & Antigens of Salmonella Typhi',
        gu: 'સ્લાઈડ ૧: સાલ્મોનેલા ટાઈફી બેક્ટેરિયાનું બંધારણ અને એન્ટિજેન',
      },
      points: {
        en: [
          'Salmonella enterica serovar Typhi is a Gram-negative, flagellated rod belonging to Enterobacteriaceae.',
          'Key Antigens: H-Antigen (Flagellar protein, subunit FliC), O-Antigen (Lipopolysaccharide core endotoxin), Vi-Antigen (Virulence capsular polysaccharide).',
          'Clinical Pearl: Vi antigen inhibits complement binding, acting as an antiphagocytic shield, making S. Typhi much more invasive than non-typhoidal Salmonella.',
          'Epidemiology: Exclusively human pathogen with no animal reservoir. Transmitted via fecal-oral route through contaminated drinking water and food.',
        ],
        gu: [
          'સાલ્મોનેલા ટાઈફી ગ્રામ-નેગેટિવ, પૂંછડીવાળો (ફ્લેજેલા) સળિયા જેવો બેક્ટેરિયા છે.',
          'મુખ્ય એન્ટિજેન: H-એન્ટિજેન (પૂંછડીનું પ્રોટીન), O-એન્ટિજેન (શરીરનું લિપોપોલીસેકેરાઇડ વિષ), Vi-એન્ટિજેન (રક્ષણાત્મક કેપ્સ્યુલ).',
          'તબીબી રહસ્ય: Vi એન્ટિજેન રોગપ્રતિકારક શક્તિથી બેક્ટેરિયાને છુપાવી રાખે છે, જેનાથી તે આંતરડામાંથી સીધો લોહીમાં પહોંચી જાય છે.',
          'રોગચાળો: આ બેક્ટેરિયા ફક્ત મનુષ્યોમાં જ રહે છે, પ્રાણીઓમાં નહીં. દૂષિત પાણી કે ખોરાક દ્વારા ફેલાય છે.',
        ],
      },
    },
    {
      title: {
        en: "Slide 2: 5-Step Pathogenesis & Peyer's Patch Invasion",
        gu: "સ્લાઈડ ૨: સંક્રમણની ૫-તબક્કાવાર પ્રક્રિયા અને પેયર્સ પેચીસ",
      },
      points: {
        en: [
          'Infectious Dose: 100,000 organisms, but reduced in patients with achlorhydria or taking PPI antacids.',
          'Cellular Invasion: Uses Salmonella Pathogenicity Island 1 (SPI-1) encoded Type III secretion system to inject invasion proteins into M-cells.',
          'Trojan Horse Survival: Inside macrophages, SPI-2 T3SS prevents phagosome-lysosome fusion. Bacteria replicate within Salmonella-containing vacuoles (SCV).',
          'Primary Bacteremia: Bacteria exit mesenteric nodes via thoracic duct to infect liver Kuppfer cells and splenic macrophages.',
        ],
        gu: [
          'સંક્રમણ માત્રા: આશરે ૧ લાખ બેક્ટેરિયા જરૂરી હોય છે, પરંતુ એસિડિટીની દવા લેતા દર્દીઓમાં ઓછી માત્રામાં પણ રોગ થઈ જાય છે.',
          'M-કોષોમાં પ્રવેશ: મોલેક્યુલર ઈન્જેક્શન (T3SS) દ્વારા આંતરડાના વિશિષ્ટ M-કોષોમાં ઘૂસી જાય છે.',
          'ટ્રોજન હોર્સ: શરીરના રક્ષક કોષો (મેક્રોફેજ) ની અંદર જ જીવિત રહી પોતાની સંખ્યા હજારો ગણી વધારે છે.',
          'રક્તપ્રવાહમાં ફેલાવો: લસિકા નળી દ્વારા સીધા લોહીમાં ભળી લીવર અને બરોળમાં ઘર બનાવી લે છે.',
        ],
      },
    },
    {
      title: {
        en: 'Slide 3: Cardinal Clinical Symptoms & Anatomical Signs',
        gu: 'સ્લાઈડ ૩: મુખ્ય તબીબી લક્ષણો અને શારીરિક ચિહ્નો',
      },
      points: {
        en: [
          "Step-Ladder Fever: High fever rising incrementally each evening by 1°F, plateauing around 103°F-104°F.",
          "Faget's Sign: Relative bradycardia (pulse rate is slower than expected for the degree of temperature).",
          "Rose Spots: Faint salmon-pink 2-4 mm macules on anterior trunk and abdomen (present in ~30% of patients).",
          "Pea-Soup Diarrhea: Greenish-yellow liquid stool seen in late stage due to ileal inflammatory exudates.",
          "Gallbladder Persistence: Biofilm formation on gallstones makes chronic carriage difficult to eradicate with standard antibiotics.",
        ],
        gu: [
          'પગથિયા જેવો તાવ (Step-Ladder Fever): દરરોજ સાંજે તાવ વધતો જઈને ૧૦૩-૧૦૪°F પર સ્થિર થાય છે.',
          'ફાગેટ્સ સાઈન (Faget Sign): ઊંચા તાવ હોવા છતાં નાડીના ધબકારા ધીમા રહેવા.',
          'રોઝ સ્પોટ્સ (Rose Spots): છાતી અને પેટ પર ઝીણા ગુલાબી રંગના ચાઠા.',
          'વટાણાના સૂપ જેવા ઝાડા: ત્રીજા અઠવાડિયે આંતરડામાં સોજો આવવાથી લીલા-પીળા ઝાડા થાય છે.',
          'પિત્તાશયમાં વાહક અવસ્થા: પિત્તાશયની પથરી પર બેક્ટેરિયા છુપાઈ રહે છે (ક્રોનિક કેરિયર).',
        ],
      },
    },
    {
      title: {
        en: 'Slide 4: Week-by-Week Natural Course & Surgical Complications',
        gu: 'સ્લાઈડ ૪: અઠવાડિયાવાર તબક્કા અને ઓપરેશનની ગૂંચવણો',
      },
      points: {
        en: [
          'Week 1: Insidious bacteremic onset, dry cough, frontal headache, constipation.',
          'Week 2: Continuous fever, rose spots, palpable hepatosplenomegaly, abdominal distension.',
          "Week 3: Critical complication stage — longitudinal ileal ulceration leads to gastrointestinal bleeding or free perforation causing peritonitis.",
          'Week 4: Defervescence with recovery, or relapse in 10-15%, or development of chronic biliary carriage (3-5%).',
        ],
        gu: [
          '૧લું અઠવાડિયું: ધીમો તાવ, સૂકી ખાંસી, માથાનો દુખાવો, કબજિયાત.',
          '૨જું અઠવાડિયું: સતત ઊંચો તાવ, ગુલાબી ચકામા, લીવર-બરોળનો સોજો.',
          '૩જું અઠવાડિયું: સૌથી ગંભીર તબક્કો - આંતરડાના ચાંદામાંથી લોહી વહેવું કે કાણું પડી જવું (પરફોરેશન).',
          '૪થું અઠવાડિયું: તાવ ઉતરવો અથવા ફરીથી બીમારી ઉથલો મારવો (રીલેપ્સ).',
        ],
      },
    },
    {
      title: {
        en: 'Slide 5: Laboratory Diagnostics, Therapeutics & Prevention',
        gu: 'સ્લાઈડ ૫: લેબોરેટરી નિદાન, દવાઓ અને રસીકરણ',
      },
      points: {
        en: [
          'Diagnostic Mnemonic: BASU (Blood in 1st week, Antibodies/Agglutination in 2nd, Stool in 3rd, Urine in 4th).',
          'Widal Test Interpretation: TO > 1:160 indicates recent acute infection, TH > 1:160 indicates past infection or immunization.',
          'Antibiotic Stewardship: Ceftriaxone or Azithromycin are first-line due to widespread fluoroquinolone and multidrug resistance (XDR strains).',
          'Prevention: Typhoid Conjugate Vaccine (TCV / Typbar-TCV) confers long-lasting protection from 6 months of age.',
        ],
        gu: [
          'યાદ રાખવાની રીત: BASU (પ્રથમ અઠવાડિયે Blood culture, બીજા અઠવાડિયે Antibodies/Widal, ત્રીજા અઠવાડિયે Stool, ચોથા અઠવાડિયે Urine).',
          'વિડાલ ટેસ્ટ: TO > ૧:૧૬૦ તાજો ચેપ દર્શાવે છે અને TH > ૧:૧૬૦ અગાઉનો ચેપ કે રસીકરણ દર્શાવે છે.',
          'દવાઓ: સેફ્ટ્રિએક્સોન અથવા એઝિથ્રોમાયસિન મુખ્ય દવાઓ છે, કારણ કે સામાન્ય દવાઓ સામે બેક્ટેરિયા પ્રતિરોધક બની ગયા છે.',
          'બચાવ: ટાઈફોઈડ કોન્જુગેટ વેક્સિન (TCV), ઉકાળેલું પાણી અને સ્વચ્છતા સૌથી મહત્વપૂર્ણ છે.',
        ],
      },
    },
  ];

  const currentNotes = notesBySlide[Math.min(currentSlideIndex, notesBySlide.length - 1)];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400">
            <BookOpen className="w-5 h-5" />
            <h3 className="font-bold text-base text-white">
              {language === 'gu' ? 'તબીબી પ્રસ્તુતિ સંદર્ભ (Presenter Notes)' : 'Clinical Presenter Notes & Medical Pearls'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="p-3 bg-cyan-950/40 border border-cyan-800/50 rounded-xl">
            <h4 className="font-bold text-cyan-300 text-sm">
              {currentNotes.title[language]}
            </h4>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              {language === 'gu' ? 'મુખ્ય તબીબી મુદ્દાઓ:' : 'Key Clinical Teaching Points:'}
            </span>
            <ul className="space-y-2.5">
              {currentNotes.points[language].map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>{language === 'gu' ? 'તબીબી શિક્ષણ અને પ્રસ્તુતિ માટે' : 'For Medical Education & Clinical Presentation'}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-md transition-colors"
          >
            {language === 'gu' ? 'બંધ કરો' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
