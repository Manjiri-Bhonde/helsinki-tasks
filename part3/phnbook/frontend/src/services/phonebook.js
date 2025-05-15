import axios from "axios";

const baseURL = "/api/persons";

const getAllPhones = () => {
  return axios.get(baseURL);
};

const addNewPhone = (newPhn) => {
  return axios.post(baseURL, newPhn);
};

const deletePhone = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

const updatePhone = (newPhn) => {
  return axios.put(`${baseURL}/${newPhn.id}`, newPhn);
};
export default { getAllPhones, addNewPhone, deletePhone, updatePhone };
