import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/typhoidData';
import { Language } from '../types/typhoid';
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, Lightbulb } from 'lucide-react';

interface TyphoidQuizProps {
  language: Language;
}

export const TyphoidQuiz: React.FC<TyphoidQuizProps> = ({ language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setIsAnswerSubmitted(true);
    if (selectedAnswer === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="w-full h-full bg-slate-900/60 rounded-xl p-6 border border-slate-800 flex flex-col justify-between overflow-y-auto">
      {!isCompleted ? (
        <div className="space-y-6 max-w-3xl mx-auto w-full">
          {/* Progress Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                {language === 'gu' ? 'તબીબી જ્ઞાન કસોટી (Medical Quiz)' : 'Clinical Knowledge Quiz'}
              </span>
              <h3 className="text-lg font-bold text-white">
                {language === 'gu' ? `પ્રશ્ન ${currentIndex + 1} / ${QUIZ_QUESTIONS.length}` : `Question ${currentIndex + 1} of ${QUIZ_QUESTIONS.length}`}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">
                {language === 'gu' ? 'સ્કોર:' : 'Current Score:'}
              </span>
              <p className="text-lg font-mono font-bold text-emerald-400 tabular-nums">
                {score} / {currentIndex + (isAnswerSubmitted ? 1 : 0)}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
            <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
              {currentQ.question[language]}
            </p>
          </div>

          {/* Options Grid */}
          <div className="space-y-2.5">
            {currentQ.options[language].map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentQ.correctIndex;
              let btnClass = 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 font-medium';
                } else if (isSelected) {
                  btnClass = 'bg-rose-950/80 border-rose-500 text-rose-100';
                } else {
                  btnClass = 'bg-slate-950/40 border-slate-800/50 text-slate-500 opacity-60';
                }
              } else if (isSelected) {
                btnClass = 'bg-cyan-950/80 border-cyan-400 text-cyan-100 shadow-md shadow-cyan-950';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full p-3.5 rounded-lg border text-left transition-all flex items-center justify-between text-sm ${btnClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Callout */}
          {isAnswerSubmitted && (
            <div className="p-4 bg-slate-950/90 border border-slate-800 rounded-xl space-y-1.5 animate-fadeIn">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
                <Lightbulb className="w-4 h-4" />
                <span>{language === 'gu' ? 'તબીબી સમજૂતી (Rationale):' : 'Clinical Explanation:'}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentQ.explanation[language]}
              </p>
            </div>
          )}

          {/* Action Bar */}
          <div className="flex justify-end pt-2">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-cyan-950 flex items-center gap-2"
              >
                <span>{language === 'gu' ? 'જવાબ સબમિટ કરો' : 'Submit Answer'}</span>
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-emerald-950 flex items-center gap-2"
              >
                <span>
                  {currentIndex + 1 < QUIZ_QUESTIONS.length
                    ? language === 'gu'
                      ? 'આગળનો પ્રશ્ન'
                      : 'Next Question'
                    : language === 'gu'
                    ? 'પરિણામ જુઓ'
                    : 'View Final Results'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results Card */
        <div className="max-w-md mx-auto my-auto text-center space-y-5 p-8 bg-slate-950/80 border border-slate-800 rounded-2xl shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              {language === 'gu' ? 'ક્વિઝ પૂર્ણ થઈ!' : 'Assessment Complete!'}
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {language === 'gu'
                ? 'તમે ટાઈફોઈડ સંક્રમણ અને લક્ષણોની સમજ ચકાસી છે.'
                : 'You have completed the Typhoid 3D clinical evaluation.'}
            </p>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 uppercase font-mono tracking-wider">
              {language === 'gu' ? 'કુલ ગુણ' : 'Your Score'}
            </span>
            <div className="text-4xl font-extrabold text-cyan-400 font-mono mt-1">
              {score} / {QUIZ_QUESTIONS.length}
            </div>
            <p className="text-xs text-emerald-400 mt-2 font-medium">
              {score >= 4
                ? language === 'gu'
                  ? 'ઉત્કૃષ્ટ! તબીબી ખ્યાલો સ્પષ્ટ છે.'
                  : 'Mastery Level! Excellent comprehension.'
                : language === 'gu'
                ? 'સારું! સ્લાઈડ્સ ફરી જોઈને રિવિઝન કરી શકો છો.'
                : 'Good attempt! Review the 3D slides to sharpen your knowledge.'}
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{language === 'gu' ? 'ફરીથી પ્રયાસ કરો' : 'Retake Quiz'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
