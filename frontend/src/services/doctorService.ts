import api from './api';
import { Doctor, Patient } from '@/lib/types';

export interface DoctorData {
  name: string;
  specialization: string;
  phone_number: string;
  email: string;
  address: string;
}

export const getDoctors = async (): Promise<Doctor[]> => {
  const response = await api.get('/doctors/');
  return response.data;
};

export const createDoctor = async (doctorData: DoctorData): Promise<Doctor> => {
  const response = await api.post('/doctors/', doctorData);
  return response.data;
};

export const updateDoctor = async (id: number, doctorData: Partial<DoctorData>): Promise<Doctor> => {
  const response = await api.put(`/doctors/${id}/`, doctorData);
  return response.data;
};

export const getDoctorById = async (id: number): Promise<Doctor> => {
    const response = await api.get(`/doctors/${id}/`);
    return response.data;
};

export const getAssignedPatients = async (doctorId: number): Promise<Patient[]> => {
    const response = await api.get(`/doctors/${doctorId}/patients/`);
    return response.data;
};

export const deleteDoctor = async (id: number): Promise<void> => {
  await api.delete(`/doctors/${id}/`);
};