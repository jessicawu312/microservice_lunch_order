import axios from "axios";

const apiUrl = "http://localhost:8000/order";

export async function userLogin(data) {
  try {
    return await axios.post(`${apiUrl}/login`, data);
  } catch (err) {
    return {
      data: {
        success: false,
      },
    };
  }
}

export function createUser(data) {
  return axios.post(`${apiUrl}/user`, data).then((res) => {
    return res;
  });
}
