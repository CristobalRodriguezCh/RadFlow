import React, { useState } from 'react';
import { FlowStep } from '../types';
import { Sparkles, CheckCircle2, Users, ListChecks, ChevronRight, Loader2 } from 'lucide-react';
import { improveStepDescription } from '../services/geminiService';

interface StepDetailProps {
  step: FlowStep;
  onUpdate: (updatedStep: FlowStep) => void;
  onClose: () => void;
}

export const StepDetail: React.FC<StepDetailProps> = ({ step, onUpdate, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[] | null>(null);

  const handleOptimize = async () => {
    setIsLoading(true);
    try {
      const result = await improveStepDescription(step);
      onUpdate({
        ...step,
        title: result.title,
        description: result.description,
      });
      setAiSuggestions(result.suggestions);
    } catch (e) {
      console.error(e);
      alert("Error conectando con Gemini. Verifica tu API Key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-rad-800 border-l border-rad-700 shadow-2xl overflow-y-auto animate-slide-up sm:animate-none">
      {/* Header */}
      <div className="p-6 border-b border-rad-700 bg-rad-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-rad-400 bg-rad-900/80 px-2 py-1 rounded border border-rad-700">
            {step.phase}
          </span>
          <button onClick={onClose} className="text-slate-400 hover:text-white md:hidden">
            Close
          </button>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{step.title}</h2>
        <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8 flex-1">
        {/* Actors */}
        <div>
          <h3 className="flex items-center text-sm font-semibold text-slate-300 mb-3">
            <Users className="w-4 h-4 mr-2 text-rad-accent" />
            Actores Involucrados
          </h3>
          <div className="flex flex-wrap gap-2">
            {step.actors.map((actor, idx) => (
              <span key={idx} className="px-3 py-1 rounded-full bg-slate-700/50 text-slate-200 text-xs border border-slate-600">
                {actor}
              </span>
            ))}
          </div>
        </div>

        {/* Process Details */}
        <div>
          <h3 className="flex items-center text-sm font-semibold text-slate-300 mb-3">
            <ListChecks className="w-4 h-4 mr-2 text-rad-accent" />
            Detalles del Proceso
          </h3>
          <ul className="space-y-3">
            {step.details.map((detail, idx) => (
              <li key={idx} className="flex items-start text-sm text-slate-400 bg-rad-900/30 p-3 rounded-lg border border-rad-700/50">
                <ChevronRight className="w-4 h-4 mr-2 text-rad-500 shrink-0 mt-0.5" />
                {detail}
              </li>
            ))}
          </ul>
        </div>

        {/* AI Actions */}
        <div className="pt-6 border-t border-rad-700">
           {aiSuggestions ? (
             <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-4 animate-fade-in">
                <h3 className="flex items-center text-emerald-400 font-semibold mb-3">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Sugerencias de IA
                </h3>
                <ul className="space-y-2">
                  {aiSuggestions.map((sug, i) => (
                    <li key={i} className="flex items-start text-sm text-emerald-100/80">
                      <CheckCircle2 className="w-3 h-3 mr-2 mt-1 shrink-0 text-emerald-500" />
                      {sug}
                    </li>
                  ))}
                </ul>
             </div>
           ) : (
            <button
              onClick={handleOptimize}
              disabled={isLoading}
              className="w-full group relative flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-4 py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-900/20"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-5 h-5 group-hover:text-yellow-200 transition-colors" />
                  <span>Optimizar Texto con Gemini</span>
                </>
              )}
            </button>
           )}
           <p className="text-xs text-center text-slate-500 mt-3">
             Usa IA para reescribir el paso y obtener mejoras operativas.
           </p>
        </div>
      </div>
    </div>
  );
};