import { request } from './APIUtils';

export const TrackService = {
  getTrack(id) {
    return request({
      url: `/tracks/${id}`,
      method: 'GET',
    });
  },
  createTrack(data) {
    return request({
      url: '/tracks',
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  updateTrack(id, data) {
    return request({
        url: '/tracks',
        method: 'PATCH',
        body: JSON.stringify(data),
      });
  }
};
