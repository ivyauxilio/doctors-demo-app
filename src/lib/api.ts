import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8000/api'; // Adjust as needed
const API_BASE_URL = 'https://doctors-api.klickcard.ph/api';

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor - same as Expo
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Define the type for patient data
export interface PatientData {
  created_at?:   string | undefined;
  id?: number;
  user_id: number | null;
  birthdate: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  age: number | null;
  sex: string;
  address: string;
  telephone_number: string;
  chief_complaint: string;
  hpi: string;
  ros: string;
  pmhx: string;
  pe: string;
  lab_diagnostic: string;
  impression: string;
  treatment_plan: string;
  surgical_procedure: string;
  surgery_date: string;
  surgery_place: string;
  on_findings: string;
  histopath: string;
  anesthesiologist: string;
}

export const getCSRFToken = async () => {
  // await axios.get(`http://localhost:8000/sanctum/csrf-cookie`, {
  await axios.get(`https://doctors-api.klickcard.ph/sanctum/csrf-cookie`, {
    withCredentials: true,
  });
};
// Create new patient (token is automatically added)
export const createPatient = async (patientData: PatientData) => {
  await getCSRFToken();
  console.log("api create patient",patientData)
  const response = await api.post('/patients', patientData);
  return response.data;
};

// Optional: login handler that stores token
export const login = async (email: string, password: string) => {

  //  await getCSRFToken();
  const response = await api.post('/login', {
    email,
    password,
  });

  const { access_token, user } = response.data;

  localStorage.setItem('token', access_token);
  localStorage.setItem('user_id', user.id);

  return response.data;
};

export default api;
