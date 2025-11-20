import React from 'react';
import { FlowStep } from '../types';
import * as Icons from 'lucide-react';

interface FlowCanvasProps {
  steps: FlowStep[];
  activeStepId: string | null;
  onStepClick: (step: FlowStep) => void;
}

export const FlowCanvas: React.FC<FlowCanvasProps> = ({ steps, activeStepId, onStepClick }) => {
  
  // Helper to dynamically render Lucide icon
  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.Activity;
    return <IconComponent className="w-6 h-6" />;
  };

  return (
    <div className="relative w-full h-full overflow-y-auto p-8 md:p-12 lg:p-20 flex flex-col items-center">
      
      {/* Title Overlay */}
      <div className="absolute top-6 left-8 md:left-12 z-0 opacity-50 pointer-events-none">
         <h1 className="text-6xl md:text-8xl font-black text-rad-800 tracking-tighter select-none">FLUJO RX</h1>
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        
        {/* Connecting Line (Desktop) */}
        <div className="absolute left-[29px] top-8 bottom-8 w-1 bg-rad-700 md:left-auto md:top-[29px] md:w-full md:h-1 md:bottom-auto -z-10 opacity-50"></div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-12 md:gap-6">
          {steps.map((step, index) => {
            const isActive = activeStepId === step.id;
            const isPast = activeStepId && parseInt(step.id) < parseInt(activeStepId);

            return (
              <div 
                key={step.id}
                className="relative group flex flex-row md:flex-col items-center md:text-center gap-6 md:gap-4"
              >
                {/* Node Circle */}
                <button
                  onClick={() => onStepClick(step)}
                  className={`
                    relative shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 shadow-xl
                    ${isActive 
                      ? 'bg-rad-500 border-rad-400 text-white scale-110 shadow-rad-500/50 ring-4 ring-rad-500/20' 
                      : isPast
                        ? 'bg-rad-800 border-rad-600 text-rad-400 hover:border-rad-500 hover:text-white'
                        : 'bg-rad-900 border-rad-800 text-slate-600 hover:border-rad-600 hover:text-slate-400'
                    }
                  `}
                >
                  {renderIcon(step.iconName)}
                  
                  {/* Number Badge */}
                  <div className={`
                    absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border
                    ${isActive ? 'bg-white text-rad-600 border-white' : 'bg-rad-900 border-rad-700 text-slate-500'}
                  `}>
                    {index + 1}
                  </div>
                </button>

                {/* Text Info */}
                <div className={`
                   flex-1 md:w-full transition-all duration-500
                   ${isActive ? 'opacity-100 translate-x-0' : 'opacity-70'}
                `}>
                  <h3 className={`text-lg font-bold mb-1 leading-tight ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 md:px-2">
                    {step.description}
                  </p>
                </div>

                {/* Active Indicator Arrow (Desktop only usually, visual flair) */}
                {isActive && (
                   <div className="hidden md:block absolute -bottom-8 left-1/2 -translate-x-1/2 text-rad-500 animate-bounce">
                     <Icons.ChevronDown className="w-5 h-5" />
                   </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend / Illustration Helper */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl opacity-60 hover:opacity-100 transition-opacity">
         <div className="bg-rad-800/50 p-4 rounded-lg border border-rad-700/50 text-center">
            <Icons.Scan className="w-8 h-8 mx-auto text-rad-400 mb-2" />
            <h4 className="text-sm font-bold text-slate-300">Adquisición</h4>
            <p className="text-xs text-slate-500">Generación de datos crudos</p>
         </div>
         <div className="bg-rad-800/50 p-4 rounded-lg border border-rad-700/50 text-center">
            <Icons.Server className="w-8 h-8 mx-auto text-purple-400 mb-2" />
            <h4 className="text-sm font-bold text-slate-300">Procesamiento (RIS/PACS)</h4>
            <p className="text-xs text-slate-500">Asociación de metadatos</p>
         </div>
         <div className="bg-rad-800/50 p-4 rounded-lg border border-rad-700/50 text-center">
            <Icons.MonitorPlay className="w-8 h-8 mx-auto text-emerald-400 mb-2" />
            <h4 className="text-sm font-bold text-slate-300">Distribución</h4>
            <p className="text-xs text-slate-500">Acceso a resultados</p>
         </div>
      </div>

    </div>
  );
};