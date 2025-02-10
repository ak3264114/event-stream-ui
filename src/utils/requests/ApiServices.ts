import axios from "axios";
import { getToken } from "../CookieManager";

// Backend API URL
const API_URL = import.meta.env.VITE_BACKEND_URL || "http://18.207.96.63";

// Define API Headers
const getAuthHeaders = () => ({
  Authorization:getToken(),
  "ngrok-skip-browser-warning": "any",
});


// Define TypeScript Interfaces
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface EventFetchRequest {
  timeStatus?: string;
  selectedCategory?: string[];
  pageNo: number;
}

// User Authentication
export const userLogin = async (body: LoginRequest,) => {
  return axios.post(`${API_URL}/users/login`, body);
};

export const userRegister = async (body: RegisterRequest) => {
  return axios.post(`${API_URL}/users/register`, body);
};

export const fetchUserData = async () => {
  return axios.get(`${API_URL}/users/me`, { headers: getAuthHeaders() });
};

// Fetch Events
export const fetchEvents = async ({ timeStatus, pageNo }: EventFetchRequest) => {
  let url = `${API_URL}/events/list?page=${pageNo}&sortBy=from`;
  if (timeStatus) url += `&timeStatus=${timeStatus}`;

  return axios.get(url, { headers: getAuthHeaders() });
};

// Participate in Event
export const participateInEvent = async (body : any) => {
  return axios.post(`${API_URL}/events/participate`, body, {
    headers: getAuthHeaders(),
  });
};


// Fetch Events
export const fetchAllParticipatedEvents = async () => {
  const url = `${API_URL}/users/events`

  return axios.get(url, { headers: getAuthHeaders() });
};