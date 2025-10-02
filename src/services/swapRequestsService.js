// src/services/swapRequestsService.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

export const createSwapRequest = async (payload, token) => {
  return axios.post(`${BASE_URL}/swap-requests`, payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getReceivedRequests = async (token) => {
  return axios.get(`${BASE_URL}/swap-requests/received`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getSentRequests = async (token) => {
  return axios.get(`${BASE_URL}/swap-requests/sent`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const acceptRequest = async (id, responseMessage, token) => {
  return axios.put(`${BASE_URL}/swap-requests/${id}/accept`, { responseMessage }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const declineRequest = async (id, responseMessage, token) => {
  return axios.put(`${BASE_URL}/swap-requests/${id}/decline`, { responseMessage }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};