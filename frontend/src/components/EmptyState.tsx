'use client';

import React from 'react';
import { Plus } from 'lucide-react';

interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description, buttonText, onButtonClick }) => {
  return (
    <div className="text-center bg-white p-12 rounded-lg shadow-md">
      <Icon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <div className="mt-6">
        <button
          type="button"
          onClick={onButtonClick}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default EmptyState;