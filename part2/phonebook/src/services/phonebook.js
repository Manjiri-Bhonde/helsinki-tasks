import axios from "axios";

const baseURL = "http://localhost:3001/persons";

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
