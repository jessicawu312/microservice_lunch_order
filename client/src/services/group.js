import axios from "axios";

const apiUrl = "http://localhost:8001/order";

export function getGroups() {
  return axios.get(`${apiUrl}/groups`);
}

export function getItems(data) {
  return axios.post(`${apiUrl}/groupItems`, data).then((res) => {
    return res;
  });
}

export function createGroups(data) {
  return axios.post(`${apiUrl}/group`, data).then((res) => {
    return res;
  });
}

export function createGroupItems(data) {
  return axios.post(`${apiUrl}/group/items`, data).then((res) => {
    return res;
  });
}

export function getUserGroups(data) {
  return axios.post(`${apiUrl}/usergroup`, data).then((res) => {
    return res;
  });
}
