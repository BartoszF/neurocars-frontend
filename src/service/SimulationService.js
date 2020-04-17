import { ACCESS_TOKEN } from '../constants';
import { request } from './APIUtils';

const SimulationService = {
  getSimulation(simulationId) {
    return request({
      url: `/simulations/${simulationId}`,
      method: 'GET',
      authenticated: true
    });
  },

  getAiModel(simulationId) {
    return request({
      url: `/simulations/${simulationId}/aimodel`,
      method: 'GET',
      authenticated: true
    });
  },

  createSimulation(simulation) {
    return request({
      url: `/simulations`,
      method: 'POST',
      body: JSON.stringify(simulation),
      authenticated: true
    });
  },

  patchSimulation(simulationId, body) {
    return request(
      {
        url: `/simulations/${simulationId}`,
        method: 'PATCH',
        body: JSON.stringify(body),
        authenticated: true
      },
      false
    );
  }
};

export default SimulationService;
