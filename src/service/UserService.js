//import { ACCESS_TOKEN } from '../constants';
import { request, login } from "./APIUtils";

const UserService = {
  getPlayerByUsername(username) {
    // if (!localStorage.getItem(ACCESS_TOKEN)) {
    //   return Promise.reject('No access token set.');
    // }

    return request({
      url: `/players/${username}`,
      method: "GET"
    });
  },

  me() {
    return request({
      url: `/players/me`,
      method: "GET"
    });
  },

  createUser(data) {
    return request({
      url: '/players',
      method: 'POST',
      body: JSON.stringify(data)
    })
  },

  login(user) {
    return login({
      method: 'POST',
      body: JSON.stringify(user)
    })
  }
};

export default UserService;
