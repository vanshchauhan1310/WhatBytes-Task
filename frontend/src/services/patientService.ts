import api from './api';
import { Patient } from '@/lib/types';

export interface PatientData {
  name: string;
  date_of_birth: string;
  address: string;
  medical_history?: string;
}

export const getPatients = async (): Promise<Patient[]> => {
  const response = await api.get('/patients/');
  return response.data;
};

export const createPatient = async (patientData: PatientData): Promise<Patient> => {
  const response = await api.post('/patients/', patientData);
  return response.data;
};

export const updatePatient = async (id: number, patientData: Partial<PatientData>): Promise<Patient> => {
  const response = await api.put(`/patients/${id}/`, patientData);
  return response.data;
};

export const getPatientById = async (id: number): Promise<Patient> => {
    const response = await api.get(`/patients/${id}/`);
    return response.data;
};

export const deletePatient = async (id: number): Promise<void> => {
  await api.delete(`/patients/${id}/`);
};