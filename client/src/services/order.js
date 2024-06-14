import axios from "axios";

const apiUrl = "http://localhost:8002/order";

export function createOrder(data) {
  return axios.post(`${apiUrl}/groupOrders`, data).then((res) => {
    return res;
  });
}

export function createOrderItem(data) {
  return axios.post(`${apiUrl}/groupOrders/item`, data).then((res) => {
    return res;
  });
}

export function getGroupOrders(data) {
  return axios.post(`${apiUrl}/mygroupOrders`, data).then((res) => {
    return res;
  });
}
