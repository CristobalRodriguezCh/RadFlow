import { FlowStep, FlowPhase } from './types';

export const INITIAL_FLOW_DATA: FlowStep[] = [
  {
    id: '1',
    title: 'Captura de Imagen',
    description: 'La máquina de Rayos X genera el estudio y envía el archivo DICOM al sistema.',
    phase: FlowPhase.ACQUISITION,
    iconName: 'Scan',
    details: [
      'Paciente posicionado en equipo RX',
      'Disparo de rayos X',
      'Generación de archivo .dcm (DICOM)'
    ],
    actors: ['Técnico Radiólogo', 'Máquina RX']
  },
  {
    id: '2',
    title: 'Registro y Asociación',
    description: 'Se registra al paciente en el software de RX y se asocia con la imagen recibida.',
    phase: FlowPhase.REGISTRATION,
    iconName: 'UserPlus',
    details: [
      'Ingreso de datos demográficos',
      'Selección del estudio en la Worklist',
      'Vinculación manual o automática'
    ],
    actors: ['Recepcionista', 'Técnico']
  },
  {
    id: '3',
    title: 'Envío de Solicitud',
    description: 'Confirmación del estudio y envío de la solicitud al servidor central (PACS/RIS).',
    phase: FlowPhase.PROCESSING,
    iconName: 'Send',
    details: [
      'Click en "Enviar" en consola',
      'Validación de integridad de datos',
      'Creación de orden de trabajo'
    ],
    actors: ['Software RX', 'Servidor']
  },
  {
    id: '4',
    title: 'Consolidación de Datos',
    description: 'El sistema termina de registrar datos del proceso y detalles técnicos del estudio.',
    phase: FlowPhase.PROCESSING,
    iconName: 'Database',
    details: [
      'Registro de dosis de radiación',
      'Confirmación de facturación',
      'Cambio de estado a "Realizado"'
    ],
    actors: ['Sistema RIS']
  },
  {
    id: '5',
    title: 'Interpretación',
    description: 'El estudio queda en lista de espera para lectura del médico radiólogo.',
    phase: FlowPhase.DIAGNOSIS,
    iconName: 'Stethoscope',
    details: [
      'Médico accede al visor DICOM',
      'Análisis de hallazgos',
      'Dictado o escritura del informe'
    ],
    actors: ['Médico Radiólogo']
  },
  {
    id: '6',
    title: 'Entrega de Resultados',
    description: 'Se habilita en el Portal del Paciente el estudio (imágenes) y el informe PDF.',
    phase: FlowPhase.DISTRIBUTION,
    iconName: 'LayoutGlobe',
    details: [
      'Generación de PDF firmado',
      'Notificación al paciente (Email/SMS)',
      'Acceso seguro vía web'
    ],
    actors: ['Portal Web', 'Paciente']
  }
];