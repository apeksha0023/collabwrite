import axios from "axios";

const API = `${import.meta.env.VITE_SERVER_URL}/api/documents`;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("No token found in localStorage");
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getDocuments = async () => {
  try {
    const res = await axios.get(API, getAuthHeader());
    return res.data;
  } catch (error) {
    console.error("Error fetching documents:", error.response?.data || error.message);
    throw error;
  }
};

export const createDocument = async () => {
  try {
    const res = await axios.post(API, {}, getAuthHeader());
    return res.data;
  } catch (error) {
    console.error("Error creating document:", error.response?.data || error.message);
    throw error;
  }
};