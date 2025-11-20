import { LucideIcon } from 'lucide-react';

export enum FlowPhase {
  ACQUISITION = 'Adquisición',
  REGISTRATION = 'Registro',
  PROCESSING = 'Procesamiento',
  DIAGNOSIS = 'Diagnóstico',
  DISTRIBUTION = 'Distribución'
}

export interface FlowStep {
  id: string;
  title: string;
  description: string;
  phase: FlowPhase;
  iconName: string; // storing string name to map to actual icon component
  details: string[];
  actors: string[]; // Who performs the action
}

export interface AIResponse {
  improvedTitle: string;
  improvedDescription: string;
  suggestions: string[];
}