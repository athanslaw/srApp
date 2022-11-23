import axios from 'axios';

const baseApiCall = async (attrs="") => {
  const token = attrs;
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const axiosInstance = axios.create({
    headers,
  });
  return axiosInstance;
};

export const logout = async () => {
  //await localStorage.clear();
};

const apiCall = async (token, url, httpMethod, body, additionalParams) => {
  const axiosInstance = await baseApiCall(token);
  switch (httpMethod) {
    case 'post':
    case 'put':
    case 'patch':
      return axiosInstance[httpMethod](url, body, additionalParams);
    case 'get':
      return axiosInstance[httpMethod](url, body);
    case 'delete':
      return axiosInstance[httpMethod](url);
    default:
      return axiosInstance[httpMethod](url);
  }
};

const apiRequest = async ( token, url, httpMethod, body = {}, additionalParams = {} ) => {
  return new Promise(function (resolve, reject) {
    apiCall(token, url, httpMethod, body, additionalParams)
      .then((response) => {
        if (response.data.status === 401) {
          return;
        }
        if (response.status < 400) {
          if (response.data.status !== 400) {
            resolve(response.data);
          } else {
            reject(response.data);
          }
        } else {
          reject(response.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          reject(err.response.data);
        }
        else{
          reject(err);
        }
      });
  });
};

export { apiRequest };

