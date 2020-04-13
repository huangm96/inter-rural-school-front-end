import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');

  // return axios.create({
  //   baseURL: 'https://internationalrsr.herokuapp.com/auth/',
  //   headers: {
  //     authorization: token
  //   }
  // });
    return axios.create({
      baseURL: "http://localhost:5000",
      headers: {
        authorization: token,
      },
    });
};
