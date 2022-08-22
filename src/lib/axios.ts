import axios from 'axios';
import { useNotificationStore } from '@/stores/notifications';

export const apiClient = axios.create({
  baseURL: '/api',
});

apiClient.defaults.headers.common['Content-Type'] = 'application/json';

apiClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers!.Accept = 'application/json';
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const message = error.response?.data?.message || error.message;
    useNotificationStore.getState().addNotification({
      type: 'error',
      title: 'Error',
      message,
    });

    return Promise.reject(error);
  },
);
