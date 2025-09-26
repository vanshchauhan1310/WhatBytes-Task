import api from './api';
import { Doctor, PatientDoctorMapping } from '@/lib/types';

export const getAssignedDoctors = async (patientId: number): Promise<Doctor[]> => {
  const response = await api.get(`/mappings/${patientId}/`);
  return response.data;
};

export const assignDoctorToPatient = async (patientId: number, doctorId: number): Promise<PatientDoctorMapping> => {
  const response = await api.post('/mappings/', { patient_id: patientId, doctor_id: doctorId });
  return response.data;
};

export const removeDoctorFromPatient = async (mappingId: number): Promise<void> => {
  await api.delete(`/mappings/delete/${mappingId}/`);
};

export const getMappingsForUser = async (): Promise<PatientDoctorMapping[]> => {
    const response = await api.get('/mappings/');
    return response.data;
}