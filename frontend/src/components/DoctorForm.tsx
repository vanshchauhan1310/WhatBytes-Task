'use client';

import React, { useState, useEffect } from 'react';
import { Doctor } from '@/lib/types';
import { DoctorData } from '@/services/doctorService';
import toast from 'react-hot-toast';

interface DoctorFormProps {
  doctor: Doctor | null;
  onSubmit: (data: DoctorData) => void;
  onClose: () => void;
}

const DoctorForm: React.FC<DoctorFormProps> = ({ doctor, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<DoctorData>({
    name: '',
    specialization: '',
    phone_number: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name,
        specialization: doctor.specialization,
        phone_number: doctor.phone_number,
        email: doctor.email,
        address: doctor.address,
      });
    } else {
      setFormData({
        name: '',
        specialization: '',
        phone_number: '',
        email: '',
        address: '',
      });
    }
  }, [doctor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"/>
      </div>
      <div>
        <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">Specialization</label>
        <input type="text" name="specialization" id="specialization" value={formData.specialization} onChange={handleChange} required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"/>
      </div>
      <div>
        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input type="text" name="phone_number" id="phone_number" value={formData.phone_number} onChange={handleChange} required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"/>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"/>
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <textarea name="address" id="address" value={formData.address} onChange={handleChange} required rows={3} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"/>
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</button>
        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">{doctor ? 'Update Doctor' : 'Add Doctor'}</button>
      </div>
    </form>
  );
};

export default DoctorForm;