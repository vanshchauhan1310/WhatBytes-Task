'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { Doctor, Patient } from '@/lib/types';
import { getDoctorById, getAssignedPatients } from '@/services/doctorService';
import { Stethoscope, User, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function DoctorDetailPage() {
  const params = useParams();
  const doctorId = Number(params.id);

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [assignedPatients, setAssignedPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!doctorId) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const [doctorData, patientsData] = await Promise.all([
          getDoctorById(doctorId),
          getAssignedPatients(doctorId),
        ]);
        setDoctor(doctorData);
        setAssignedPatients(patientsData);
      } catch (error: any) {
        const message = error?.response?.data?.detail || 'Failed to fetch doctor details.';
        toast.error(message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [doctorId]);

  if (loading) {
    return <div>Loading doctor details...</div>;
  }

  if (!doctor) {
    return <div className="text-center text-red-500">Doctor not found.</div>;
  }

  return (
    <div>
      <Link href="/dashboard/doctors" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">&larr; Back to Doctors</Link>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center mb-4">
            <Stethoscope className="w-8 h-8 text-indigo-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Dr. {doctor.name}</h2>
        </div>
        <p className="text-xl text-gray-600 mb-4">{doctor.specialization}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="flex items-center"><Mail className="w-4 h-4 mr-2" /><span>{doctor.email}</span></div>
            <div className="flex items-center"><Phone className="w-4 h-4 mr-2" /><span>{doctor.phone_number}</span></div>
            <div className="flex items-center col-span-2"><MapPin className="w-4 h-4 mr-2" /><span>{doctor.address}</span></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Assigned Patients</h3>
        {assignedPatients.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {assignedPatients.map((patient) => (
              <li key={patient.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <User className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="font-medium text-gray-800">{patient.name}</span>
                </div>
                <Link href={`/dashboard/patients/${patient.id}`} className="text-sm text-indigo-600 hover:underline">
                  View Details
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 py-4">No patients are currently assigned to this doctor.</p>
        )}
      </div>
    </div>
  );
}