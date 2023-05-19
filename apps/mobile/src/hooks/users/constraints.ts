const API = {
  CURRENT_USER: {
    path: 'users/me',
    method: 'GET',
  },

  ALL_USERS: {
    path: 'users/all',
    method: 'GET',
  },

  CREATE_USER: {
    path: 'users/create',
    method: 'POST',
  },
};

export default API;
