'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { Patient, Doctor, PatientDoctorMapping } from '@/lib/types';
import { getPatientById } from '@/services/patientService';
import { getDoctors } from '@/services/doctorService';
import { getAssignedDoctors, assignDoctorToPatient, removeDoctorFromPatient, getMappingsForUser } from '@/services/mappingService';
import { User, Stethoscope, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';

export default function PatientDetailPage() {
  const params = useParams();
  const patientId = Number(params.id);

  const [patient, setPatient] = useState<Patient | null>(null);
  const [assignedDoctors, setAssignedDoctors] = useState<Doctor[]>([]);
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [mappings, setMappings] = useState<PatientDoctorMapping[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');

  const fetchData = async () => {
    if (!patientId) return;
    try {
      setLoading(true);
      const [patientData, assignedData, allDoctorsData, mappingsData] = await Promise.all([
        getPatientById(patientId),
        getAssignedDoctors(patientId),
        getDoctors(),
        getMappingsForUser(),
      ]);
      setPatient(patientData);
      setAssignedDoctors(assignedData);
      setAllDoctors(allDoctorsData);
      setMappings(mappingsData);
    } catch (error: any) {
      const message = error?.response?.data?.detail || 'Failed to fetch patient details.';
      toast.error(message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [patientId]);

  const handleAssignDoctor = async () => {
    if (!selectedDoctorId) {
      toast.error('Please select a doctor to assign.');
      return;
    }

    const promise = assignDoctorToPatient(patientId, Number(selectedDoctorId));
    toast.promise(promise, {
      loading: 'Assigning doctor...',
      success: 'Doctor assigned successfully!',
      error: (e) => e?.response?.data?.non_field_errors?.[0] || 'Failed to assign doctor. The doctor may already be assigned.',
    });

    try {
      await promise;
      setSelectedDoctorId('');
      fetchData(); // Refresh data
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveDoctor = async (doctorId: number) => {
    const mapping = mappings.find(m => m.patient.id === patientId && m.doctor.id === doctorId);
    if (!mapping) {
        toast.error("Could not find the assignment to remove.");
        return;
    }
    const promise = removeDoctorFromPatient(mapping.id);
    toast.promise(promise, {
      loading: 'Removing doctor...',
      success: 'Doctor removed successfully!',
      error: (e) => e?.response?.data?.detail || 'Failed to remove doctor.',
    });

    try {
      await promise;
      fetchData(); // Refresh data
    } catch (error) {
      console.error(error);
    }
  };

  const availableDoctors = allDoctors.filter(
    (doc) => !assignedDoctors.some((assignedDoc) => assignedDoc.id === doc.id)
  );

  if (loading) {
    return <div>Loading patient details...</div>;
  }

  if (!patient) {
    return <div className="text-center text-red-500">Patient not found.</div>;
  }

  return (
    <div>
        <Link href="/dashboard/patients" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">&larr; Back to Patients</Link>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center mb-4">
            <User className="w-8 h-8 text-indigo-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">{patient.name}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <p><strong>Date of Birth:</strong> {patient.date_of_birth}</p>
            <p><strong>Address:</strong> {patient.address}</p>
            {patient.medical_history && <p className="md:col-span-2"><strong>Medical History:</strong> {patient.medical_history}</p>}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Manage Assigned Doctors</h3>

        <div className="flex items-center space-x-2 mb-6">
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a doctor to assign...</option>
            {availableDoctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                Dr. {doctor.name} ({doctor.specialization})
              </option>
            ))}
          </select>
          <button
            onClick={handleAssignDoctor}
            disabled={!selectedDoctorId}
            className="flex items-center px-4 py-2 font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
          >
            <Plus className="w-5 h-5 mr-2" />
            Assign
          </button>
        </div>

        <div className="space-y-4">
            {assignedDoctors.length > 0 ? (
                assignedDoctors.map((doctor) => (
                    <div key={doctor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <Stethoscope className="w-6 h-6 text-green-600 mr-3" />
                            <div>
                                <p className="font-semibold text-gray-800">Dr. {doctor.name}</p>
                                <p className="text-sm text-gray-500">{doctor.specialization}</p>
                            </div>
                        </div>
                        <button onClick={() => handleRemoveDoctor(doctor.id)} className="text-red-600 hover:text-red-800">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500 py-4">No doctors assigned to this patient yet.</p>
            )}
        </div>
      </div>
    </div>
  );
}