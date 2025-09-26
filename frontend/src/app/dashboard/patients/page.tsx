'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { getPatients, createPatient, updatePatient, deletePatient, PatientData } from '@/services/patientService';
import { Patient } from '@/lib/types';
import Modal from '@/components/Modal';
import PatientForm from '@/components/PatientForm';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import EmptyState from '@/components/EmptyState';

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await getPatients();
      setPatients(data);
    } catch (err) {
      toast.error('Failed to fetch patients.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleOpenModal = (patient: Patient | null = null) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const handleFormSubmit = async (data: PatientData) => {
    const isUpdating = !!selectedPatient;
    const promise = isUpdating
      ? updatePatient(selectedPatient.id, data)
      : createPatient(data);

    toast.promise(
      promise,
      {
        loading: isUpdating ? 'Updating patient...' : 'Adding patient...',
        success: `Patient ${isUpdating ? 'updated' : 'added'} successfully!`,
        error: `Failed to ${isUpdating ? 'update' : 'add'} patient.`,
      }
    );

    try {
      await promise;
      fetchPatients();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePatient = async (id: number) => {
    const confirm = window.confirm('Are you sure you want to delete this patient? This action cannot be undone.');
    if (!confirm) return;

    const promise = deletePatient(id);
    toast.promise(promise, {
      loading: 'Deleting patient...',
      success: 'Patient deleted successfully!',
      error: 'Failed to delete patient.',
    });

    try {
      await promise;
      setPatients((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 card">
        <span className="text-slate-600">Loading patients...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Patient Management</h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center px-4 py-2.5 font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-sm hover:from-indigo-700 hover:to-indigo-600"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Patient
        </button>
      </div>

      {patients.length > 0 ? (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr className="text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Date of Birth</th>
                  <th className="px-6 py-3">Address</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {patients.map((patient, idx) => (
                  <tr key={patient.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      <Link href={`/dashboard/patients/${patient.id}`} className="text-indigo-600 hover:text-indigo-800 hover:underline">
                        {patient.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{patient.date_of_birth}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{patient.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleOpenModal(patient)} className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-indigo-600 hover:bg-indigo-50 mr-1.5">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDeletePatient(patient.id)} className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-red-600 hover:bg-red-50">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
            icon={Users}
            title="No Patients Found"
            description="Get started by adding your first patient record."
            buttonText="Add Patient"
            onButtonClick={() => handleOpenModal()}
        />
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={selectedPatient ? 'Edit Patient' : 'Add Patient'}>
        <PatientForm patient={selectedPatient} onSubmit={handleFormSubmit} onClose={handleCloseModal} />
      </Modal>
    </div>
  );
}