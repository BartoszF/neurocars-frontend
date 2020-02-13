//import { ACCESS_TOKEN } from '../constants';
import { request } from "./APIUtils";

const SimulationService = {
  getSimulation(simulationId) {
    // if (!localStorage.getItem(ACCESS_TOKEN)) {
    //   return Promise.reject('No access token set.');
    // }

    return request({
      url: `/simulations/${simulationId}`,
      method: "GET"
    });
  },

  createSimulation(playerId) {
    return request({
          url: `/simulations`,
          method: "POST",
          body: JSON.stringify(playerId)
      })
  },

  patchSimulation(simulationId,body) {
      console.log(body);
      return request({
          url: `/simulations/${simulationId}`,
          method: "PATCH",
          body: JSON.stringify(body)
      })
  }
};

export default SimulationService;
