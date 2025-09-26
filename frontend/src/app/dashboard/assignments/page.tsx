'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PatientDoctorMapping } from '@/lib/types';
import { getMappingsForUser, removeDoctorFromPatient } from '@/services/mappingService';
import { Link2Off, Calendar, User, Stethoscope } from 'lucide-react';
import EmptyState from '@/components/EmptyState';

export default function AssignmentsPage() {
  const [mappings, setMappings] = useState<PatientDoctorMapping[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMappings = async () => {
    try {
      setLoading(true);
      const data = await getMappingsForUser();
      setMappings(data);
    } catch (err) {
      toast.error('Failed to fetch assignments.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMappings();
  }, []);

  const handleRemoveMapping = async (mappingId: number) => {
    const promise = removeDoctorFromPatient(mappingId);
    toast.promise(promise, {
      loading: 'Removing assignment...',
      success: 'Assignment removed successfully!',
      error: 'Failed to remove assignment.',
    });

    try {
      await promise;
      fetchMappings(); 
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading assignments...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">All Assignments</h2>
      </div>

      {mappings.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned At</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mappings.map((mapping) => (
                <tr key={mapping.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                    <User className="w-5 h-5 text-gray-500 mr-2" />
                    {mapping.patient.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                        <Stethoscope className="w-5 h-5 text-gray-500 mr-2" />
                        {mapping.doctor.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                        {new Date(mapping.assigned_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleRemoveMapping(mapping.id)} className="text-red-600 hover:text-red-900">
                      <Link2Off className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center bg-white p-12 rounded-lg shadow-md">
            <h3 className="mt-2 text-lg font-medium text-gray-900">No Assignments Found</h3>
            <p className="mt-1 text-sm text-gray-500">You can assign doctors to patients from the patient detail page.</p>
        </div>
      )}
    </div>
  );
}