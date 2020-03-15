import { defineMessages } from 'react-intl.macro';

export const SimulationMessages = defineMessages({
  state: {
    id: 'simulation.state',
    defaultMessage: 'State',
    description: ''
  },
  learn: {
    id: 'simulation.learn',
    defaultMessage: 'Learn',
    description: ''
  },
  inCreationState: {
    id: 'simulation.state.IN_CREATION',
    defaultMessage: 'Creating.',
    description: ''
  },
  awaitingDataState: {
    id: 'simulation.state.AWAITING_DATA',
    defaultMessage: 'Waiting for data.',
    description: ''
  },
  gatheredDataState: {
    id: 'simulation.state.GATHERED_DATA',
    defaultMessage: 'Data ready. Waiting for training.',
    description: ''
  },
  lostDataState: {
    id: 'simulation.state.LOST_DATA',
    defaultMessage: 'Data corrupted. Please learn again.',
    description: ''
  },
  awaitingModelState: {
    id: 'simulation.state.AWAITING_MODEL',
    defaultMessage: 'Training...',
    description: ''
  },
  finishedState: {
    id: 'simulation.state.FINISHED',
    defaultMessage: 'Model ready.',
    description: ''
  },
  unknownState: {
    id: 'simulation.state.UNKNOWN',
    defaultMessage: "Unknown (shouldn't happen)",
    description: ''
  }
});
