import axios from "axios";

const API = `${import.meta.env.VITE_SERVER_URL}/api/auth`;

export const loginUser = async (data) => {
  const res = await axios.post(`${API}/login`, data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await axios.post(`${API}/register`, data);
  return res.data;
};
