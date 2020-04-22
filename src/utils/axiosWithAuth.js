import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');

  return axios.create({
    baseURL: "https://inter-rural-school.herokuapp.com",
    headers: {
      authorization: token,
    },
  });
    // return axios.create({
    //   baseURL: "http://localhost:5000",
    //   headers: {
    //     authorization: token,
    //   },
    // });
};
