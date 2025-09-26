import { getDoctors } from '@/services/doctorService';
import { Doctor } from '@/lib/types';
import Link from 'next/link';
import { Activity } from 'lucide-react';

async function DoctorsPage() {
  let doctors: Doctor[] = [];
  let error = '';

  try {
    doctors = await getDoctors();
  } catch (err) {
    console.error(err);
    error = 'Failed to load doctor information. Please try again later.';
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <Link href="/" className="text-xl font-bold text-gray-900">Healthcare+</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="btn-secondary">
                Sign In
              </Link>
              <Link href="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-center text-slate-900 mb-8">Our Doctors</h1>
          {error && <p className="text-center text-red-500">{error}</p>}
          {!error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <div key={doctor.id} className="card p-6">
                    <h2 className="text-xl font-bold text-slate-900">{`Dr. ${doctor.name}`}</h2>
                    <p className="text-md text-slate-600 mt-1">{doctor.specialization}</p>
                    <div className="mt-4 border-t border-slate-100 pt-4">
                      <p className="text-sm text-slate-700">
                        <strong className="text-slate-900">Email:</strong> {doctor.email}
                      </p>
                      <p className="text-sm text-slate-700 mt-1">
                        <strong className="text-slate-900">Phone:</strong> {doctor.phone_number}
                      </p>
                      <p className="text-sm text-slate-700 mt-1">
                        <strong className="text-slate-900">Address:</strong> {doctor.address}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-slate-500">No doctors are currently listed.</p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default DoctorsPage;