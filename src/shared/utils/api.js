import axios from 'axios';

import history from 'browserHistory';
import toast from 'shared/utils/toast';
import { objectToQueryString } from 'shared/utils/url';
import { getCookie, removeCookie, signout } from 'shared/utils/authToken';

const defaults = {
  baseURL: process.env.API_URL || 'http://localhost:8000',
  headers: () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getCookie('token')}`
  }),
  error: {
    code: 'INTERNAL_ERROR',
    message: 'Something went wrong. Please check your internet connection or contact our support.',
    status: 503,
    data: {},
  },
};

const api = (method, url, variables) =>
  new Promise((resolve, reject) => {
    axios({
      url: `${defaults.baseURL}${url}`,
      method,
      headers: defaults.headers(),
      params: method === 'get' ? variables : undefined,
      data: method !== 'get' ? variables : undefined,
      paramsSerializer: objectToQueryString,
    }).then(
      response => {        
        if (response.status === 401) {
          signout(() => {
            history.push('/signin');
            toast.message('Your session is expired. Please signin')
          });
        }
        resolve(response.data);
      },
      error => {
        if (error.response) {          
          if (error.response.status === 401) {
            removeCookie('token');
            history.push('/signin');
            if(error.response.data.error)
              toast.error(error.response.data.error);
            else  
              toast.message('Your session is expired. Please signin')
          } else {
            reject(error.response.data.error);
          }
        } else {
          reject(defaults.error);
        }
      },
    );
  });

const optimisticUpdate = async (url, { updatedFields, currentFields, setLocalData }) => {
  try {
    setLocalData(updatedFields);
    await api('put', url, updatedFields);
  } catch (error) {
    setLocalData(currentFields);
    toast.error(error);
  }
};

export default {
  get: (...args) => api('get', ...args),
  post: (...args) => api('post', ...args),
  put: (...args) => api('put', ...args),
  patch: (...args) => api('patch', ...args),
  delete: (...args) => api('delete', ...args),
  optimisticUpdate,
};
