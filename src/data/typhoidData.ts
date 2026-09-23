import {
  BacteriumPart,
  PathogenesisStep,
  SymptomHotspot,
  TimelineWeek,
  DiagnosticMethod,
  QuizQuestion,
} from '../types/typhoid';

export const BACTERIUM_PARTS: BacteriumPart[] = [
  {
    id: 'flagella',
    name: {
      en: 'Peritrichous Flagella (H-Antigen)',
      gu: 'પેરિટ્રાઇકસ ફ્લેજેલા (H-એન્ટિજેન - પૂંછડી જેવા તંતુઓ)',
    },
    scientificName: 'FliC Flagellin Subunits',
    role: {
      en: 'Motility apparatus enabling bacteria to swim through gut mucus and reach epithelial cells.',
      gu: 'બદલાતા આકાર સાથે મુવમેન્ટ આપતું અંગ જે બેક્ટેરિયાને આંતરડાના મ્યુકસમાં તરીને કોષો સુધી પહોંચવામાં મદદ કરે છે.',
    },
    antigenType: 'H Antigen (Flagellar)',
    clinicalSignificance: {
      en: 'Target of the Widal test (TH titer). Essential for initial host colonization.',
      gu: 'વિડાલ ટેસ્ટ (TH ટાઈટર) માટેનું મુખ્ય લક્ષ્ય. રોગના પ્રારંભિક સંક્રમણ માટે અનિવાર્ય છે.',
    },
    color: '#06b6d4',
  },
  {
    id: 'capsule',
    name: {
      en: 'Vi Capsular Polysaccharide',
      gu: 'Vi કેપ્સ્યુલર પોલીસેકેરાઇડ (રક્ષણાત્મક કવચ)',
    },
    scientificName: 'Virulence (Vi) Antigen',
    role: {
      en: 'Inhibits complement-mediated lysis and conceals O-antigen from host neutrophils.',
      gu: 'શરીરની રોગપ્રતિકારક શક્તિથી બચાવે છે અને O-એન્ટિજેનને ન્યુટ્રોફિલ્સથી છુપાવે છે.',
    },
    antigenType: 'Vi Antigen (Capsular)',
    clinicalSignificance: {
      en: 'Primary component in modern Typhoid Conjugate Vaccines (TCV) and marker for chronic carrier state.',
      gu: 'આધુનિક ટાઈફોઈડ વેક્સિન (TCV) નો મુખ્ય ઘટક અને ક્રોનિક કેરિયર (વાહક) અવસ્થાની ઓળખ.',
    },
    color: '#8b5cf6',
  },
  {
    id: 'cell_wall',
    name: {
      en: 'Outer Membrane & O-Antigen (LPS)',
      gu: 'બાહ્ય પડ અને O-એન્ટિજેન (લિપોપોલીસેકેરાઇડ - LPS)',
    },
    scientificName: 'Lipopolysaccharide Endotoxin',
    role: {
      en: 'Structural integrity and endotoxin layer triggering severe inflammatory response.',
      gu: 'બેક્ટેરિયાની રચના જાળવે છે અને એન્ડોટોક્સિન મુક્ત કરી શરીરમાં તીવ્ર સોજો તથા તાવ લાવે છે.',
    },
    antigenType: 'O Antigen (Somatic)',
    clinicalSignificance: {
      en: 'Detected in Widal test (TO titer). LPS release causes sustained high fever and toxic shock symptoms.',
      gu: 'વિડાલ ટેસ્ટ (TO ટાઈટર) માં માપવામાં આવે છે. તેના વિષથી સતત ઊંચો તાવ અને નબળાઈ આવે છે.',
    },
    color: '#10b981',
  },
  {
    id: 'type3_secretion',
    name: {
      en: 'Type III Secretion System (T3SS / Molecular Syringe)',
      gu: 'ટાઈપ III સેક્રીશન સિસ્ટમ (ઈન્જેક્શન જેવી સોય)',
    },
    scientificName: 'SPI-1 & SPI-2 Pathogenicity Islands',
    role: {
      en: 'Molecular syringe injecting bacterial effector proteins directly into intestinal epithelial cells and macrophages.',
      gu: 'માનવ કોષોમાં સીધું વિષ દાખલ કરતું અણુ-ઈન્જેક્શન, જેનાથી બેક્ટેરિયા કોષની અંદર ઘૂસી શકે છે.',
    },
    antigenType: 'Virulence Effector Complex',
    clinicalSignificance: {
      en: 'Enables bacterial invasion and prevents lysosomal destruction inside immune macrophages.',
      gu: 'રોગપ્રતિકારક કોષો (મેક્રોફેજ) ની અંદર બેક્ટેરિયાને જીવંત રાખવા માટે જવાબદાર છે.',
    },
    color: '#f59e0b',
  },
  {
    id: 'nucleoid',
    name: {
      en: 'Bacterial Nucleoid DNA & Plasmids',
      gu: 'બેક્ટેરિયલ DNA અને પ્લાઝમિડ્સ (આનુવંશિક તત્વો)',
    },
    scientificName: 'Circular Chromosome (4.8 Mb)',
    role: {
      en: 'Carries genetic code for antimicrobial resistance (MDR / XDR strains) and persistence.',
      gu: 'એન્ટિબાયોટિક્સ સામે પ્રતિકાર શક્તિ (ડ્રગ રેઝિસ્ટન્સ) અને ગુણાકાર માટેના જીન્સ ધરાવે છે.',
    },
    antigenType: 'Genetic Core',
    clinicalSignificance: {
      en: 'Target of PCR molecular tests and fluoroquinolone/azithromycin action.',
      gu: 'PCR ટેસ્ટનું લક્ષ્ય અને એન્ટિબાયોટિક્સની અસર થવાનો કેન્દ્રબિંદુ.',
    },
    color: '#ec4899',
  },
];

export const PATHOGENESIS_STEPS: PathogenesisStep[] = [
  {
    step: 1,
    id: 'ingestion',
    title: {
      en: '1. Ingestion & Gastric Survival',
      gu: '૧. દૂષિત ખોરાક/પાણીનું સેવન અને જઠરમાંથી પસાર',
    },
    location: {
      en: 'Mouth & Stomach (Gastric Cavity)',
      gu: 'મોં અને જઠર (પેટ)',
    },
    timeframe: {
      en: 'Hour 0 – 2',
      gu: '૦ થી ૨ કલાક',
    },
    summary: {
      en: 'Contaminated food or water enters through oral-fecal transmission. Bacteria survive low gastric acid pH.',
      gu: 'દૂષિત પાણી કે ખોરાક દ્વારા સાલ્મોનેલા બેક્ટેરિયા પેટમાં પ્રવેશે છે અને જઠરના એસિડનો સામનો કરીને જીવિત રહે છે.',
    },
    mechanism: {
      en: 'An infectious dose of 10³ to 10⁵ organisms survives gastric acidity (especially if buffered by meals or antacids) and enters the proximal small intestine.',
      gu: 'આશરે ૧,૦૦૦ થી ૧,૦૦,૦૦૦ બેક્ટેરિયા પેટના એસિડ સામે બચીને નાના આંતરડા તરફ આગળ વધે છે.',
    },
    immuneResponse: {
      en: 'Gastric acid kills ~90% of bacteria, but acid tolerance response (ATR) genes permit survivors to navigate into duodenum.',
      gu: 'જઠરરસ મોટાભાગના કીટાણુઓને મારે છે, પરંતુ બચી ગયેલા બેક્ટેરિયા એસિડ રેઝિસ્ટન્સ સિસ્ટમથી સુરક્ષિત રહે છે.',
    },
    clinicalSign: {
      en: 'Asymptomatic incubation phase starts.',
      gu: 'કોઈ લક્ષણો નથી હોતા (ઈન્ક્યુબેશન સમયગાળો શરૂ).',
    },
  },
  {
    step: 2,
    id: 'invasion',
    title: {
      en: "2. M-Cell Invasion at Peyer's Patches",
      gu: "૨. આંતરડાના પેયર્સ પેચીસ (Peyer's Patches) પર હુમલો",
    },
    location: {
      en: "Terminal Ileum (Peyer's Patches)",
      gu: 'નાના આંતરડાનો છેલ્લો ભાગ (ઈલિયમ)',
    },
    timeframe: {
      en: 'Hours 6 – 24',
      gu: '૬ થી ૨૪ કલાક',
    },
    summary: {
      en: "Salmonella adheres to intestinal microvilli and invades specialized Microfold (M) cells overlying Peyer's lymphoid patches.",
      gu: "બેક્ટેરિયા આંતરડાની દીવાલના વિશિષ્ટ M-કોષો અને પેયર્સ પેચીસ લસિકા પેશીમાં ઘૂસણખોરી કરે છે.",
    },
    mechanism: {
      en: 'Using Type III Secretion (SPI-1), bacteria trigger membrane ruffling in epithelial cells and M-cells, entering via receptor-mediated endocytosis.',
      gu: 'મોલેક્યુલર સોય (T3SS) દ્વારા કોષોમાં કેમિકલ્સ છોડીને અંદર પ્રવેશ મેળવે છે.',
    },
    immuneResponse: {
      en: 'Submucosal macrophages are recruited to engulf the bacteria via phagocytosis.',
      gu: 'શરીરના રોગપ્રતિકારક સૈનિકો (મેક્રોફેજ) બેક્ટેરિયાને ગળી જવા પ્રયત્ન કરે છે.',
    },
    clinicalSign: {
      en: 'Mild abdominal discomfort, reduced appetite, nausea.',
      gu: 'હળવો પેટમાં દુખાવો, ભૂખ ઓછી થવી, ઉબકા.',
    },
  },
  {
    step: 3,
    id: 'macrophage_survival',
    title: {
      en: '3. Intracellular Trojan Horse & Lymphatic Spread',
      gu: '૩. મેક્રોફેજ કોષોની અંદર જીવિત રહેવું (ટ્રોજન હોર્સ અસર)',
    },
    location: {
      en: 'Mesenteric Lymph Nodes',
      gu: 'આંતરડાની લસિકાગ્રંથિઓ (Lymph Nodes)',
    },
    timeframe: {
      en: 'Days 1 – 5',
      gu: '૧ થી ૫ દિવસ',
    },
    summary: {
      en: 'Instead of being destroyed, Salmonella survives inside macrophage vacuoles and hitches a ride to mesenteric lymph nodes.',
      gu: 'નાશ પામવાને બદલે બેક્ટેરિયા મેક્રોફેજની અંદર જ જીવિત રહીને લસિકાગ્રંથિઓ સુધી ફેલાઈ જાય છે.',
    },
    mechanism: {
      en: 'SPI-2 pathogenicity island blocks lysosome fusion with Salmonella-containing vacuoles (SCV). Bacteria multiply exponentially intracellularly.',
      gu: 'એસપીઆઈ-૨ સિસ્ટમ દ્વારા કોષના પાચન ઉત્સેચકોને નિષ્ક્રિય કરી અંદર જ પોતાની સંખ્યા હજારો ગણી વધારે છે.',
    },
    immuneResponse: {
      en: 'Host fails to trigger early vigorous neutrophil recruitment due to Vi capsule concealment.',
      gu: 'કેપ્સ્યુલને લીધે શરીર શરૂઆતમાં તેને પકડી શકતું નથી અને ન્યુટ્રોફિલ્સ એલર્ટ થતા નથી.',
    },
    clinicalSign: {
      en: 'Subtle malaise, mild frontal headache, low-grade irregular fever.',
      gu: 'સાધારણ સુસ્તી, માથાનો દુખાવો, ધીમો તાવ શરૂ થવો.',
    },
  },
  {
    step: 4,
    id: 'bacteremia',
    title: {
      en: '4. Primary Bacteremia & Organ Colonization',
      gu: '૪. લોહીમાં પ્રવેશ (બેક્ટેરેમિયા) અને યકૃત-બરોળમાં ફેલાવો',
    },
    location: {
      en: 'Bloodstream, Liver, Spleen & Bone Marrow',
      gu: 'રક્તપ્રવાહ, યકૃત (લિવર), બરોળ (સ્પ્લીન), અસ્થિમજ્જા',
    },
    timeframe: {
      en: 'Days 7 – 14 (Week 1 to 2)',
      gu: '૭ થી ૧૪ દિવસ (પહેલું-બીજું અઠવાડિયું)',
    },
    summary: {
      en: 'Bacteria escape into thoracic duct, entering general circulation. Seeding occurs in liver, spleen, bone marrow, and gallbladder.',
      gu: 'બેક્ટેરિયા લોહીમાં ભળે છે અને લીવર, બરોળ તથા પિત્તાશય (ગૉલબ્લેડર) માં જઈને ઘર બનાવી લે છે.',
    },
    mechanism: {
      en: 'Endotoxin (LPS) release into blood triggers interleukin-1, TNF-alpha, inducing hypothalamic thermoregulatory elevation (step-ladder fever).',
      gu: 'એન્ડોટોક્સિન મુક્ત થવાથી મગજમાં તાવનું તાપમાન નિયંત્રિત કરતી સિસ્ટમ બગડે છે અને પગથિયા જેવો તાવ ચઢે છે.',
    },
    immuneResponse: {
      en: 'Hepatosplenomegaly results from reticuloendothelial cell hyperplasia; leukopenia develops.',
      gu: 'લીવર અને બરોળ મોટા થઈ જાય છે અને લોહીમાં શ્વેતકણો (WBC) ઘટવા લાગે છે.',
    },
    clinicalSign: {
      en: 'High step-ladder fever (103°F-104°F), relative bradycardia (Faget sign), rose spots rash.',
      gu: '૧૦૩-૧૦૪°F નો ઊંચો પગથિયા જેવો તાવ, ધીમા નાડીના ધબકારા, છાતી-પેટ પર ગુલાબી ચકામા.',
    },
  },
  {
    step: 5,
    id: 'secondary_invasion',
    title: {
      en: '5. Secondary Bowel Invasion & Complication Risk',
      gu: "૫. આંતરડામાં પુનઃપ્રવેશ, ચાંદા (Ulcers) અને છિદ્રનું જોખમ",
    },
    location: {
      en: "Gallbladder & Ileal Peyer's Patches",
      gu: 'પિત્તાશય અને આંતરડાના પેયર્સ પેચીસ',
    },
    timeframe: {
      en: 'Days 14 – 21 (Week 3)',
      gu: '૧૪ થી ૨૧ દિવસ (ત્રીજું અઠવાડિયું)',
    },
    summary: {
      en: "Bile-borne bacteria from gallbladder re-invade sensitized Peyer's patches, triggering severe necrosis, pea-soup diarrhea, and perforation risk.",
      gu: "પિત્તાશયમાંથી પિત્તરસ દ્વારા બેક્ટેરિયા ફરી આંતરડામાં આવી પેયર્સ પેચીસને સડાવી દે છે, જેનાથી રક્તસ્રાવ કે કાણું પડવાનું જોખમ રહે છે.",
    },
    mechanism: {
      en: 'Type IV hypersensitivity reaction causes ischemic necrosis of lymphoid tissue, creating longitudinal ulcers parallel to bowel axis.',
      gu: 'તીવ્ર એલર્જિક સોજો આવવાથી આંતરડામાં ઊંડા ચાંદા પડે છે જે ફાટી શકે છે.',
    },
    immuneResponse: {
      en: 'Exhaustive inflammatory storm, risk of endotoxic septic shock.',
      gu: 'શરીરમાં સેપ્ટિક શોક અને તીવ્ર ઝેરી અસર ફેલાઈ શકે છે.',
    },
    clinicalSign: {
      en: 'Pea-soup diarrhea, toxic delirium (typhoid state), abdominal rigidity, perforation peritonitis.',
      gu: 'વટાણાના સૂપ જેવા લીલા-પીળા ઝાડા, બેભાન અવસ્થા/બકબકાટ, પેટ કડક થઈ જવું.',
    },
  },
];

export const SYMPTOM_HOTSPOTS: SymptomHotspot[] = [
  {
    id: 'brain_fever',
    position: [0, 1.85, 0.2],
    title: {
      en: 'Step-Ladder Fever & Typhoid Stupor',
      gu: 'પગથિયા જેવો ઊંચો તાવ અને ચિત્તભ્રમ (ટાઈફોઈડ સ્ટેટ)',
    },
    organ: { en: 'Brain & Hypothalamus', gu: 'મગજ અને હાયપોથેલેમસ' },
    severity: 'critical',
    onsetWeek: 'Week 1 - 2',
    description: {
      en: 'Classic fever rising incrementally each evening like a step-ladder to 103°F-104°F (39.5°C-40°C), accompanied by severe throbbing frontal headache and "coma vigil" (delirium where eyes stare blankly).',
      gu: 'તાવ દરરોજ સાંજે અડધો-એક ડિગ્રી વધીને ૧૦૩-૧૦૪°F સુધી પહોંચે છે. માથામાં સખત દુખાવો થાય છે અને દર્દી અર્ધબેભાન જેવો થઈ જાય છે.',
    },
    mechanism: {
      en: 'Circulating LPS endotoxin stimulates macrophage release of IL-1 and TNF-alpha, elevating hypothalamic prostaglandin E2 set-point.',
      gu: 'બેક્ટેરિયાનું ઝેર મગજના તાપમાન કેન્દ્રને ઉત્તેજિત કરે છે જેથી સતત ઊંચો તાવ રહે છે.',
    },
    medicalTerm: 'Febris Typhosa & Typhoid Encephalopathy',
    gujaratiPhonetic: 'સ્ટેપ-લેડર તાવ અને ચિત્તભ્રમ',
  },
  {
    id: 'heart_bradycardia',
    position: [0.2, 1.35, 0.3],
    title: {
      en: "Relative Bradycardia (Faget's Sign)",
      gu: "ધીમા નાડીના ધબકારા (ફાગેટ્સ ચિહ્ન - Faget's Sign)",
    },
    organ: { en: 'Heart & Sinoatrial Node', gu: 'હૃદય અને કાર્ડિયાક નોડ' },
    severity: 'moderate',
    onsetWeek: 'Week 1',
    description: {
      en: 'Pulse is unusually slow relative to high fever. Normally, pulse rises 10 bpm per 1°F fever; in typhoid, pulse may stay 70-80 bpm even with 104°F fever.',
      gu: 'સામાન્ય રીતે તાવ વધવાથી નાડી ઝડપી બને છે, પરંતુ ટાઈફોઈડમાં ૧૦૪°F તાવ હોવા છતાં નાડીના ધબકારા ૭૦-૮૦ જેવા ધીમા જ રહે છે.',
    },
    mechanism: {
      en: 'Endotoxin stimulation of vagal tone and direct myocardial depressant effects from inflammatory mediators.',
      gu: 'વેગસ નર્વનું ઉત્તેજન અને ટોક્સિનની હૃદયની ગતિ પર મંદ અસર.',
    },
    medicalTerm: "Sphygmo-thermic dissociation (Faget's Sign)",
    gujaratiPhonetic: "ફાગેટ્સ સાઈન (ધીમા ધબકારા)",
  },
  {
    id: 'skin_rose_spots',
    position: [0, 1.05, 0.42],
    title: {
      en: 'Rose Spots (Erythematous Macules)',
      gu: 'રોઝ સ્પોટ્સ (છાતી અને પેટ પર ગુલાબી ચકામા)',
    },
    organ: { en: 'Skin of Trunk / Abdomen', gu: 'છાતી અને પેટની ચામડી' },
    severity: 'mild',
    onsetWeek: 'Day 7 – 12 (Week 2)',
    description: {
      en: 'Delicate, blanching, salmon-pink macules (2-4 mm in diameter) appearing in crops of 5 to 20 on upper abdomen and lower chest. Fade within 3-4 days.',
      gu: 'પેટ અને છાતીના ઉપરના ભાગે ૨ થી ૪ મિમી જેવા નાના ગુલાબી રંગના ચાઠા ઉપસી આવે છે જેને દબાવવાથી સફેદ પડી જાય છે.',
    },
    mechanism: {
      en: 'Bacterial emboli lodging in cutaneous papillary capillaries with localized dermal mononuclear infiltration.',
      gu: 'ચામડીની સૂક્ષ્મ રક્તવાહિનીઓમાં બેક્ટેરિયા ફસાઈ જવાથી હળવો સોજો અને લાલાશ ઉત્પન્ન થાય છે.',
    },
    medicalTerm: 'Roseola Typhosa',
    gujaratiPhonetic: 'રોઝ સ્પોટ્સ (ગુલાબી ધબ્બા)',
  },
  {
    id: 'liver_spleen',
    position: [-0.35, 0.9, 0.25],
    title: {
      en: 'Hepatosplenomegaly (Enlarged Liver & Spleen)',
      gu: 'યકૃત અને બરોળનો સોજો (Hepatosplenomegaly)',
    },
    organ: { en: 'Liver & Spleen', gu: 'યકૃત (લિવર) અને બરોળ (સ્પ્લીન)' },
    severity: 'moderate',
    onsetWeek: 'Week 2',
    description: {
      en: 'Enlarged, soft, and tender spleen (felt below left costal margin) along with hepatomegaly and elevated serum transaminases (SGOT/SGPT).',
      gu: 'ડાબી પાંસળી નીચે આવેલી બરોળ અને જમણી બાજુ આવેલું લિવર સોજી જાય છે. દર્દીને દબાવવાથી દુખાવો થાય છે.',
    },
    mechanism: {
      en: 'Proliferation of reticuloendothelial histiocytes clearing Salmonella-laden macrophages and cellular debris.',
      gu: 'રોગપ્રતિકારક કોષોનું બેક્ટેરિયા સામે લડવા માટે લીવર-બરોળમાં જમાવડો થવો.',
    },
    medicalTerm: 'Hepatosplenomegaly',
    gujaratiPhonetic: 'હિપેટોસ્પ્લીનોમેગલી',
  },
  {
    id: 'gallbladder_carrier',
    position: [0.25, 0.85, 0.3],
    title: {
      en: 'Gallbladder Colonization & Chronic Carrier State',
      gu: 'પિત્તાશયમાં સંક્રમણ અને વાહક (કેરિયર) અવસ્થા',
    },
    organ: { en: 'Gallbladder & Bile Ducts', gu: 'પિત્તાશય (ગૉલબ્લેડર)' },
    severity: 'moderate',
    onsetWeek: 'Week 2 - 3 (or years)',
    description: {
      en: 'Salmonella forms robust biofilms on cholesterol gallstones, resisting antibiotics. 3-5% of patients become chronic carriers shedding bacteria in feces (famous "Typhoid Mary" scenario).',
      gu: 'બેક્ટેરિયા પિત્તાશયની પથરી પર બાયોફિલ્મ બનાવી છુપાઈ જાય છે. સાજા થયા પછી પણ ૩-૫% દર્દીઓ વર્ષો સુધી મળ દ્વારા રોગ ફેલાવે છે (જેમ કે ટાઈફોઈડ મેરી).',
    },
    mechanism: {
      en: 'High bile salt resistance and flagellar adherence allow bacteria to persist in gallbladder mucosal crypts.',
      gu: 'પિત્તના કડવા રસ સામે લડીને બેક્ટેરિયા પિત્તાશયમાં લાંબો સમય ટકી રહે છે.',
    },
    medicalTerm: 'Chronic Typhoid Carrier Reservoir',
    gujaratiPhonetic: 'ક્રોનિક કેરિયર રીઝર્વોયર',
  },
  {
    id: 'bowel_ulcers',
    position: [0, 0.45, 0.32],
    title: {
      en: 'Intestinal Ulcers & "Pea-Soup" Diarrhea',
      gu: "આંતરડામાં ચાંદા અને વટાણાના સૂપ જેવા ઝાડા (Pea-soup Diarrhea)",
    },
    organ: { en: "Small Intestine (Peyer's Patches)", gu: 'નાનું આંતરડું' },
    severity: 'critical',
    onsetWeek: 'Week 2 – 3',
    description: {
      en: 'Initially constipation occurs in adults; by week 3, foul-smelling ochre-green "pea-soup" diarrhea begins. Necrosis of Peyer\'s patches leads to intestinal hemorrhage or life-threatening perforation.',
      gu: 'શરૂઆતમાં કબજિયાત અને પછી ત્રીજા અઠવાડિયે લીલા-પીળા વટાણાના સૂપ જેવા ઝાડા થાય છે. આંતરડામાં કાણું પડવાનું (પરફોરેશન) સૌથી મોટું જોખમ રહે છે.',
    },
    mechanism: {
      en: 'Hyperplastic Peyer\'s patches undergo ischemic necrosis and slough off, exposing mucosal arterioles and bowel wall.',
      gu: 'લસિકા પેશીઓ સડી જવાથી રક્તવાહિનીઓ ખુલ્લી પડી રક્તસ્રાવ થાય છે.',
    },
    medicalTerm: 'Ileal Ulceration & Enteric Perforation',
    gujaratiPhonetic: 'આંતરડાના અલ્સર અને પરફોરેશન',
  },
];

export const TIMELINE_WEEKS: TimelineWeek[] = [
  {
    week: 1,
    title: {
      en: 'Week 1: The Step-Ladder Fever Onset',
      gu: 'પ્રથમ સપ્તાહ: પગથિયા જેવો તાવ અને પ્રારંભિક લક્ષણો',
    },
    temperature: '101°F ➔ 103°F (38.3°C - 39.4°C)',
    keyFeatures: {
      en: [
        'Insidious onset of step-ladder rising evening fever',
        'Severe frontal headache and generalized myalgia',
        'Dry cough, coated tongue with red margins',
        'Relative bradycardia (pulse slow despite high fever)',
        'Constipation is more common than diarrhea in adults',
      ],
      gu: [
        'સાંજે ક્રમશઃ વધતો પગથિયા જેવો તાવ (Step-ladder fever)',
        'માથાના આગળના ભાગમાં સખત દુખાવો અને શરીર તૂટવું',
        'સૂકી ખાંસી, જીભ પર સફેદ છારી અને કિનારીઓ લાલ રહેવી',
        'તાવ ઊંચો હોવા છતાં નાડીના ધબકારા ધીમા રહેવા (Faget Sign)',
        'ઝાડા કરતાં કબજિયાત વધુ જોવા મળે છે',
      ],
    },
    pathology: {
      en: "Bacteria multiply in Peyer's patches and mesenteric lymph nodes; primary bacteremia spills into bloodstream.",
      gu: 'બેક્ટેરિયા પેયર્સ પેચીસમાં વધીને લોહીના પ્રવાહમાં પ્રથમ વખત ભળે છે.',
    },
    dangerSigns: {
      en: 'High fever spikes, severe dehydration, extreme lethargy.',
      gu: 'ખૂબ ઊંચો તાવ, શરીરમાં પાણી ખૂટી જવું, ભારે સુસ્તી.',
    },
    diagnosticYield: {
      en: 'Blood Culture has highest positivity (>85% sensitive in Week 1). Widal test is often negative at this stage.',
      gu: 'બ્લડ કલ્ચર ટેસ્ટ ૮૫% થી વધુ સચોટ પરિણામ આપે છે. આ સમયે વિડાલ ટેસ્ટ નેગેટિવ આવી શકે છે.',
    },
  },
  {
    week: 2,
    title: {
      en: 'Week 2: Sustained Plateau & Rose Spots',
      gu: 'બીજું સપ્તાહ: સતત ઊંચો તાવ અને ગુલાબી ચકામા (રોઝ સ્પોટ્સ)',
    },
    temperature: '103°F – 104°F (39.5°C - 40°C Continuous)',
    keyFeatures: {
      en: [
        'Sustained high plateau fever without morning remission',
        'Rose spots appear on trunk and lower chest (blanch on pressure)',
        'Abdominal distension, tenderness in right lower quadrant',
        'Hepatosplenomegaly becomes palpable',
        'Patient appears apathetic, dull, and profoundly toxic',
      ],
      gu: [
        'સતત ૧૦૩-૧૦૪°F નો ઊંચો તાવ (દિવસ-રાત ઉતરતો નથી)',
        'છાતી-પેટ પર ઝીણા ગુલાબી ચકામા (Rose Spots) દેખાય છે',
        'પેટ ફૂલી જવું, જમણી બાજુ નીચે દુખાવો થવો',
        'લીવર અને બરોળ સોજીને હાથથી તપાસતાં અનુભવાય છે',
        'દર્દી સાવ નિસ્તેજ અને અશક્ત બની જાય છે',
      ],
    },
    pathology: {
      en: "Massive seeding of liver, spleen, and bone marrow. Peyer's patches swell significantly into prominent plaques.",
      gu: 'બેક્ટેરિયા યકૃત, બરોળ અને અસ્થિમજ્જામાં સંપૂર્ણ રીતે ફેલાઈ જાય છે.',
    },
    dangerSigns: {
      en: 'Toxic delirium, severe abdominal tenderness, high heart rate suggesting secondary infection.',
      gu: 'બકબકાટ કરવો, પેટમાં અસહ્ય દુખાવો, ઝાડા શરૂ થવા.',
    },
    diagnosticYield: {
      en: 'Widal test becomes positive (TO & TH titers rise > 1:160). Blood & Stool cultures both positive.',
      gu: 'વિડાલ ટેસ્ટ પોઝિટિવ આવે છે (TO અને TH ટાઈટર ૧:૧૬૦ થી વધુ). મળ અને પેશાબ કલ્ચર પણ પોઝિટિવ મળે છે.',
    },
  },
  {
    week: 3,
    title: {
      en: 'Week 3: Complication Phase (Ulcers & Perforation)',
      gu: 'ત્રીજું સપ્તાહ: ગંભીર જોખમી તબક્કો (ચાંદા, રક્તસ્રાવ અને કાણું પડવું)',
    },
    temperature: '103°F – 105°F with septic fluctuations',
    keyFeatures: {
      en: [
        'Foul-smelling "pea-soup" green-yellow liquid diarrhea',
        '"Typhoid State": low muttering delirium, twitching (carphologia)',
        'Intestinal hemorrhage (sudden drop in temp and blood pressure, black stools)',
        'Intestinal perforation: sharp sudden abdominal pain, board-like rigidity',
        'Myocarditis and septic circulatory collapse risk',
      ],
      gu: [
        'વટાણાના સૂપ જેવા લીલા-પીળા વાસ મારતા ઝાડા (Pea-soup Diarrhea)',
        'ટાઈફોઈડ સ્ટેટ: આંખો ખુલ્લી રાખી બકબકાટ કરવો અને હાથ હવામાં હલાવવા',
        'આંતરડામાંથી લોહી વહેવું (બ્લડ પ્રેશર અચાનક ઘટી જવું અને કાળો મળ)',
        'આંતરડામાં કાણું પડવું (પરફોરેશન): પેટ લાકડા જેવું કડક થઈ જવું',
        'હૃદય પર સોજો આવવો અને સેપ્ટિક શોક લાગવો',
      ],
    },
    pathology: {
      en: "Necrosis and sloughing of Peyer's patches produce deep ulcers parallel to long axis of ileum, eroding into mesenteric vessels.",
      gu: 'આંતરડાના પેયર્સ પેચીસ સડીને ઉખડી જાય છે અને ઊંડા ચાંદા પડે છે.',
    },
    dangerSigns: {
      en: 'Emergency surgical indication: sudden peritonitis, tachycardia, hypotension, abdominal guarding.',
      gu: 'તાત્કાલિક ઓપરેશનની જરૂર પડી શકે છે: પેટ પથ્થર જેવું સખત થઈ જવું.',
    },
    diagnosticYield: {
      en: 'Stool and urine culture positive. Widal titers peak. Abdominal X-ray shows free air under diaphragm if perforated.',
      gu: 'મળ કલ્ચર ૧૦૦% પોઝિટિવ. જો કાણું પડે તો એક્સ-રે માં પેટમાં હવા દેખાય છે.',
    },
  },
  {
    week: 4,
    title: {
      en: 'Week 4: Convalescence, Relapse or Carrier State',
      gu: 'ચોથું સપ્તાહ: સુધારો, રોગનું પુનરાવર્તન કે કેરિયર અવસ્થા',
    },
    temperature: 'Gradual lysis back to 98.6°F (37°C)',
    keyFeatures: {
      en: [
        'Temperature slowly normalizes over 4-7 days if treated',
        'Appetite gradually returns and abdominal distension subsides',
        'Relapse can occur in 10-15% of patients 1-2 weeks later',
        '3-5% become chronic biliary carriers shedding bacteria for years',
        'Prolonged convalescence with weight loss and muscular weakness',
      ],
      gu: [
        'યોગ્ય સારવાર મળતા ધીમે ધીમે તાવ ઉતરી જાય છે',
        'ભૂખ પાછી આવે છે અને પેટનો સોજો ઓછો થાય છે',
        '૧૦-૧૫% દર્દીઓમાં ૧-૨ અઠવાડિયા પછી ફરી તાવ આવી શકે છે',
        '૩-૫% લોકો ક્રોનિક કેરિયર બની જાય છે જે અન્ય લોકોને રોગ ફેલાવે છે',
        'શરીરમાં ભારે નબળાઈ અને વજન ઘટી જવું લાંબો સમય રહે છે',
      ],
    },
    pathology: {
      en: 'Ulcers heal without scarring or strictures; persistent bacteria form biofilms in gallbladder or kidney.',
      gu: 'આંતરડાના ચાંદા રૂઝાઈ જાય છે પરંતુ પિત્તાશયમાં બેક્ટેરિયા લાંબા સમય સુધી સંગ્રહિત રહી શકે છે.',
    },
    dangerSigns: {
      en: 'Secondary bacterial infections, recurrence of fever spikes (relapse).',
      gu: 'ફરીથી તાવ આવવો (રીલેપ્સ) અથવા અન્ય ઈન્ફેક્શન થવું.',
    },
    diagnosticYield: {
      en: 'Negative blood cultures; stool cultures monitored to confirm clearance and prevent carrier transmission.',
      gu: 'દર્દી સાજો થયો છે કે કેરિયર બન્યો છે તે ચકાસવા મળનું નિયમિત પરીક્ષણ.',
    },
  },
];

export const DIAGNOSTIC_METHODS: DiagnosticMethod[] = [
  {
    id: 'blood_culture',
    name: {
      en: 'Blood Culture (Gold Standard)',
      gu: 'બ્લડ કલ્ચર ટેસ્ટ (સુવર્ણ માનક / Gold Standard)',
    },
    timing: {
      en: 'First week of fever (Best in Days 1-7)',
      gu: 'તાવના પ્રથમ અઠવાડિયામાં સૌથી વધુ સચોટ',
    },
    accuracy: '80% - 90% Sensitivity in Week 1',
    principle: {
      en: 'Inoculation of patient blood into bile broth to grow and identify living Salmonella Typhi bacteria.',
      gu: 'દર્દીના લોહીને ખાસ કલ્ચર મીડિયામાં રાખી સાલ્મોનેલા બેક્ટેરિયાને ઉગાડીને ઓળખવામાં આવે છે.',
    },
    positiveResult: {
      en: 'Confirms active bacteremia and allows antibiotic sensitivity testing to choose the correct drug.',
      gu: 'રોગની ૧૦૦% સાચી પુષ્ટિ કરે છે અને કઈ દવા અસર કરશે (એન્ટિબાયોટિક સેન્સિટિવિટી) તે નક્કી કરે છે.',
    },
  },
  {
    id: 'widal_test',
    name: {
      en: 'Widal Serological Agglutination Test',
      gu: 'વિડાલ ટેસ્ટ (એગ્લુટિનેશન એન્ટિબોડી ટેસ્ટ)',
    },
    timing: {
      en: 'End of 1st week onwards (Peak in Week 2-3)',
      gu: 'બીજા અને ત્રીજા અઠવાડિયામાં સૌથી વધુ ઉપયોગી',
    },
    accuracy: 'Requires pair of acute and convalescent sera',
    principle: {
      en: 'Detects agglutinating antibodies in patient serum against Salmonella Somatic (TO) and Flagellar (TH) antigens.',
      gu: 'દર્દીના લોહીમાં સાલ્મોનેલાના O (શરીર) અને H (પૂંછડી) એન્ટિજેન સામે બનેલા એન્ટિબોડીઝ તપાસે છે.',
    },
    positiveResult: {
      en: 'Significant diagnostic titer: TO > 1:160 and/or TH > 1:160 with a four-fold rise over 7 days.',
      gu: 'TO ટાઈટર > ૧:૧૬૦ અને TH ટાઈટર > ૧:૧૬૦ આવે તો ટાઈફોઈડ સંક્રમણ સૂચવે છે.',
    },
  },
  {
    id: 'stool_urine_culture',
    name: {
      en: 'Stool & Urine Culture',
      gu: 'મળ અને પેશાબ કલ્ચર (Stool & Urine Culture)',
    },
    timing: {
      en: 'Weeks 2, 3 and convalescence',
      gu: 'બીજા અને ત્રીજા અઠવાડિયામાં અને સાજા થયા પછી',
    },
    accuracy: '75% Sensitive in Week 3',
    principle: {
      en: 'Culture on selective media (MacConkey / DCA) to detect shedding of bacteria from bile and kidneys.',
      gu: 'મળ કે પેશાબમાંથી બેક્ટેરિયા બહાર નીકળે છે કે નહીં તે તપાસી ક્રોનિક કેરિયર શોધવામાં મદદ કરે છે.',
    },
    positiveResult: {
      en: 'Identifies intestinal shedding and crucial for clearing food handlers and identifying chronic carriers.',
      gu: 'રસોઈયા કે હોટલ સ્ટાફ સાલ્મોનેલા ફેલાવતા નથી તેની ખાતરી કરવા માટે અત્યંત જરૂરી.',
    },
  },
  {
    id: 'bone_marrow_culture',
    name: {
      en: 'Bone Marrow Aspirate Culture',
      gu: 'બોન મેરો કલ્ચર (અસ્થિમજ્જા પરીક્ષણ)',
    },
    timing: {
      en: 'Any stage, even after prior antibiotic therapy',
      gu: 'કોઈપણ સમયે, એન્ટિબાયોટિક લીધી હોય તો પણ',
    },
    accuracy: '>95% Sensitivity (Most sensitive test)',
    principle: {
      en: 'Salmonella concentrates densely in bone marrow reticuloendothelial cells, remaining viable despite blood sterilization.',
      gu: 'બેક્ટેરિયા હાડકાના પોલાણમાં લાંબા સમય સુધી સંગ્રહાયેલા રહે છે જેથી લોહીમાંથી દવા ગયા પછી પણ પકડાય છે.',
    },
    positiveResult: {
      en: 'Definitive diagnosis when blood culture and serology are indeterminate.',
      gu: 'અન્ય તમામ રિપોર્ટ ખોટા કે અસ્પષ્ટ હોય ત્યારે આખરી નિદાન આપે છે.',
    },
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: {
      en: 'Which bacterium is the primary causative organism of Typhoid fever?',
      gu: 'ટાઈફોઈડ તાવ માટે કયો બેક્ટેરિયા મુખ્યત્વે જવાબદાર છે?',
    },
    options: {
      en: [
        'Salmonella enterica serotype Typhi',
        'Vibrio cholerae',
        'Escherichia coli O157:H7',
        'Mycobacterium tuberculosis',
      ],
      gu: [
        'સાલ્મોનેલા એન્ટેરિકા સેરોટાઈપ ટાઈફી (Salmonella Typhi)',
        'વિબ્રિયો કોલેરી (Vibrio cholerae)',
        'ઈ-કોલાઈ (Escherichia coli)',
        'માયકોબેક્ટેરિયમ ટ્યુબરક્યુલોસિસ (TB)',
      ],
    },
    correctIndex: 0,
    explanation: {
      en: 'Salmonella enterica serovar Typhi is an exclusively human pathogen responsible for enteric (typhoid) fever.',
      gu: 'સાલ્મોનેલા ટાઈફી માત્ર મનુષ્યોમાં જ ચેપ ફેલાવતો ગ્રામ-નેગેટિવ બેક્ટેરિયા છે.',
    },
  },
  {
    id: 2,
    question: {
      en: "What is Faget's sign commonly observed in the first week of Typhoid fever?",
      gu: "ટાઈફોઈડ તાવના પ્રથમ સપ્તાહમાં જોવા મળતું 'ફાગેટ્સ ચિહ્ન' (Faget's Sign) શું દર્શાવે છે?",
    },
    options: {
      en: [
        'Relative bradycardia (slow pulse despite high fever)',
        'Extremely rapid pulse (>140 bpm)',
        'High blood pressure with chest pain',
        'Severe skin peeling on palms',
      ],
      gu: [
        'ઊંચા તાવ છતાં નાડીના ધબકારા ધીમા રહેવા (Relative bradycardia)',
        'ખૂબ જ ઝડપી નાડી ચાલવી (૧૪૦ થી વધુ)',
        'છાતીમાં દુખાવા સાથે હાઈ બ્લડ પ્રેશર',
        'હાથની હથેળીની ચામડી ઉખડવી',
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Faget's sign (sphygmo-thermic dissociation) is the paradoxical presence of relative bradycardia during high pyrexia.",
      gu: 'સામાન્ય રીતે ૧ ડિગ્રી તાવ વધે તો નાડી ૧૦ ધબકારા વધે છે, પણ ટાઈફોઈડમાં તાવ ૧૦૪°F હોવા છતાં નાડી ૭૦-૮૦ ની આસપાસ ધીમી રહે છે જેને ફાગેટ્સ સાઈન કહે છે.',
    },
  },
  {
    id: 3,
    question: {
      en: "Where do Salmonella bacteria primarily invade the intestinal wall?",
      gu: "સાલ્મોનેલા બેક્ટેરિયા આંતરડાના કયા ભાગમાં મુખ્યત્વે હુમલો કરે છે?",
    },
    options: {
      en: [
        "M-cells overlying Peyer's patches in the ileum",
        'Gastric antrum and pylorus',
        'Esophageal squamous mucosa',
        'Ascending colon haustra',
      ],
      gu: [
        "નાના આંતરડામાં આવેલા પેયર્સ પેચીસ (Peyer's Patches) ના M-કોષો પર",
        'જઠરના અંદરના પડ પર',
        'અન્નનળીના કોષો પર',
        'મોટા આંતરડાના ઉપરના ભાગ પર',
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Salmonella uses its SPI-1 Type III Secretion system to invade specialized Microfold (M) cells overlying Peyer's lymphoid patches.",
      gu: "નાના આંતરડાના છેડે આવેલા પેયર્સ પેચીસ લસિકા પેશીઓ પર બેક્ટેરિયા ચોંટીને શરીરની અંદર ઘૂસી જાય છે.",
    },
  },
  {
    id: 4,
    question: {
      en: 'Which diagnostic test is most sensitive and recommended during the FIRST week of typhoid fever?',
      gu: 'ટાઈફોઈડના પ્રથમ અઠવાડિયામાં સૌથી વિશ્વસનીય અને સચોટ પરીક્ષણ કયું છે?',
    },
    options: {
      en: [
        'Blood Culture',
        'Widal test alone',
        'Stool microscopy for ova/cysts',
        'Chest X-Ray',
      ],
      gu: [
        'બ્લડ કલ્ચર (Blood Culture)',
        'માત્ર વિડાલ ટેસ્ટ',
        'સામાન્ય મળ પરીક્ષણ',
        'છાતીનો એક્સ-રે',
      ],
    },
    correctIndex: 0,
    explanation: {
      en: 'Blood culture is >80-85% sensitive in Week 1 during primary bacteremia. Widal antibodies typically take 7-10 days to rise to diagnostic levels.',
      gu: 'પ્રથમ સપ્તાહમાં બેક્ટેરિયા સીધા લોહીમાં ફરતા હોવાથી બ્લડ કલ્ચર ૮૫% થી વધુ સાચું પરિણામ આપે છે, જ્યારે વિડાલ ટેસ્ટ બીજા અઠવાડિયે પોઝિટિવ બને છે.',
    },
  },
  {
    id: 5,
    question: {
      en: 'Where does Salmonella Typhi form persistent biofilms in chronic carriers (like "Typhoid Mary")?',
      gu: 'ટાઈફોઈડના ક્રોનિક કેરિયર (વાહક) દર્દીઓમાં સાલ્મોનેલા બેક્ટેરિયા મુખ્યત્વે કયા અંગમાં છુપાઈને રહે છે?',
    },
    options: {
      en: [
        'Gallbladder (biliary tract & gallstones)',
        'Alveoli of the lungs',
        'Thyroid gland',
        'Cornea of the eye',
      ],
      gu: [
        'પિત્તાશય (Gallbladder અને પિત્તાશયની પથરી પર)',
        'ફેફસાંની અંદર',
        'થાઈરોઈડ ગ્રંથિમાં',
        'આંખની કીકીમાં',
      ],
    },
    correctIndex: 0,
    explanation: {
      en: 'Salmonella survives in the bile-rich gallbladder, forming resilient biofilms on cholesterol gallstones, which sheds bacteria into feces for years.',
      gu: 'બેક્ટેરિયા પિત્તાશયની પથરી અને પિત્તરસમાં બાયોફિલ્મ બનાવીને વર્ષો સુધી જીવે છે અને અન્ય લોકોને બીમાર કરી શકે છે.',
    },
  },
];
