import React, { useState } from 'react';
import { FlowCanvas } from './components/FlowCanvas';
import { StepDetail } from './components/StepDetail';
import { FlowStep } from './types';
import { INITIAL_FLOW_DATA } from './constants';
import { LayoutGrid, Info, X } from 'lucide-react';

const App: React.FC = () => {
  const [steps, setSteps] = useState<FlowStep[]>(INITIAL_FLOW_DATA);
  const [activeStepId, setActiveStepId] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(true);

  const activeStep = steps.find(s => s.id === activeStepId);

  const handleStepUpdate = (updatedStep: FlowStep) => {
    setSteps(prev => prev.map(s => s.id === updatedStep.id ? updatedStep : s));
  };

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row overflow-hidden bg-rad-900">
      
      {/* Main Canvas Area */}
      <main className={`
        flex-1 relative transition-all duration-300 ease-in-out
        ${activeStep ? 'md:mr-[400px]' : ''}
      `}>
        
        {/* Navbar / Header */}
        <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20 pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            <div className="w-10 h-10 bg-gradient-to-br from-rad-500 to-blue-700 rounded-lg shadow-lg flex items-center justify-center text-white">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-white tracking-tight">RadFlow <span className="text-rad-400 font-light">Visualizer</span></h1>
              <p className="text-xs text-slate-400">Optimización de Flujo RIS/PACS</p>
            </div>
          </div>

          <button 
            onClick={() => setShowInfo(!showInfo)}
            className="pointer-events-auto p-2 hover:bg-white/10 rounded-full text-slate-400 transition-colors"
          >
            <Info className="w-5 h-5" />
          </button>
        </header>

        {/* Info Toast */}
        {showInfo && (
          <div className="absolute top-24 left-6 md:left-auto md:right-6 z-30 w-80 bg-slate-800/90 backdrop-blur border border-slate-700 p-4 rounded-xl shadow-2xl animate-fade-in">
             <div className="flex justify-between items-start mb-2">
               <h3 className="text-sm font-semibold text-white">Sobre este flujo</h3>
               <button onClick={() => setShowInfo(false)} className="text-slate-500 hover:text-white"><X className="w-3 h-3"/></button>
             </div>
             <p className="text-xs text-slate-400 leading-relaxed">
               Esta es una versión mejorada e interactiva del diagrama original. 
               Los pasos están categorizados por fases. Haz clic en cualquier nodo para ver detalles, actores y 
               utilizar IA para mejorar la redacción técnica.
             </p>
          </div>
        )}

        <FlowCanvas 
          steps={steps} 
          activeStepId={activeStepId} 
          onStepClick={(step) => setActiveStepId(step.id === activeStepId ? null : step.id)}
        />
      </main>

      {/* Sidebar Details Panel */}
      <aside className={`
        fixed inset-y-0 right-0 w-full md:w-[400px] z-40 
        transform transition-transform duration-300 ease-in-out shadow-2xl
        ${activeStep ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {activeStep && (
          <StepDetail 
            step={activeStep} 
            onUpdate={handleStepUpdate}
            onClose={() => setActiveStepId(null)} 
          />
        )}
      </aside>

    </div>
  );
};

export default App;