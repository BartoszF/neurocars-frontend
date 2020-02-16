//import { ACCESS_TOKEN } from '../constants';
import { request } from "./APIUtils";

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
};

export default UserService;
