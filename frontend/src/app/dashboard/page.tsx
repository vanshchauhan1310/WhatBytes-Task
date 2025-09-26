'use client';

import { Users, Stethoscope } from 'lucide-react';

export default function DashboardOverviewPage() {
  const quickActions = [
    {
      title: "Add New Patient",
      description: "Register a new patient in the system",
      href: "/dashboard/patients",
    },
    {
      title: "Manage Doctors",
      description: "Add or update doctor information",
      href: "/dashboard/doctors",
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-blue-100 p-6 rounded-lg border border-blue-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Welcome back! Manage your healthcare practice efficiently.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <a
              key={index}
              href={action.href}
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center mb-2">
                {action.title.includes('Patient') ? (
                  <Users className="w-5 h-5 text-blue-600 mr-2" />
                ) : (
                  <Stethoscope className="w-5 h-5 text-green-600 mr-2" />
                )}
                <h4 className="font-semibold text-gray-900">
                  {action.title}
                </h4>
              </div>
              <p className="text-sm text-gray-600">
                {action.description}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Getting Started</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
              1
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Set up your first patient record</p>
              <p className="text-xs text-gray-600">Add patient information to get started with record management</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
              2
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Add doctors to your directory</p>
              <p className="text-xs text-gray-600">Build your healthcare provider network</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
              3
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Explore patient assignments</p>
              <p className="text-xs text-gray-600">Connect patients with the right healthcare providers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}