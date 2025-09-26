'use client';

import React, { useState, useEffect } from 'react';
import { Patient } from '@/lib/types';
import { PatientData } from '@/services/patientService';

interface PatientFormProps {
  patient: Patient | null;
  onSubmit: (data: PatientData) => void;
  onClose: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ patient, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<PatientData>({
    name: '',
    date_of_birth: '',
    address: '',
    medical_history: '',
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name,
        date_of_birth: patient.date_of_birth,
        address: patient.address,
        medical_history: patient.medical_history || '',
      });
    } else {
      setFormData({
        name: '',
        date_of_birth: '',
        address: '',
        medical_history: '',
      });
    }
  }, [patient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mt-1 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="date_of_birth" className="block text-sm font-medium text-slate-700">
          Date of Birth
        </label>
        <input
          type="date"
          name="date_of_birth"
          id="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mt-1 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-slate-700">
          Address
        </label>
        <textarea
          name="address"
          id="address"
          value={formData.address}
          onChange={handleChange}
          required
          rows={3}
          className="w-full px-3 py-2 mt-1 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="medical_history" className="block text-sm font-medium text-slate-700">
          Medical History (Optional)
        </label>
        <textarea
          name="medical_history"
          id="medical_history"
          value={formData.medical_history}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 mt-1 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-sm hover:from-indigo-700 hover:to-indigo-600"
        >
          {patient ? 'Update Patient' : 'Add Patient'}
        </button>
      </div>
    </form>
  );
};

export default PatientForm;