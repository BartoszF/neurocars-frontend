import { ACCESS_TOKEN } from '../constants';
import { BACKEND_URL } from '../constants';

export async function request(options, wantJSON = true) {
  const headers = new Headers({
    'Content-Type': 'application/json'
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      'Authorization',
      `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
    );
  }

  const defaults = { headers };
  options = { ...defaults, ...options };

  const response = await fetch(`${BACKEND_URL}/api${options.url}`, options);

  if (wantJSON) {
    const json = await response.json();
    if (!response.ok) {
      return Promise.reject(json);
    }
    return json;
  } else {
    if (!response.ok) {
      return Promise.reject(response);
    }
    return response;
  }
}

export async function login(options) {
  const headers = new Headers({
    'Content-Type': 'application/json'
  });

  const defaults = { headers };
  options = { ...defaults, ...options };

  const response = await fetch(`${BACKEND_URL}/login`, options);
  return response.headers.get('Authorization');
}
