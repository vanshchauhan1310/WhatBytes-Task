'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { Home, Users, Stethoscope, LogOut, Link as LinkIcon, Activity, Menu, X } from 'lucide-react';
import { logout } from '@/services/authService';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItems = [
    { href: '/dashboard', label: 'Overview', icon: Home },
    { href: '/dashboard/patients', label: 'Patients', icon: Users },
    { href: '/dashboard/doctors', label: 'Doctors', icon: Stethoscope },
    { href: '/dashboard/assignments', label: 'Assignments', icon: LinkIcon },
  ];

  return (
    <div className="h-screen flex bg-blue-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 
        bg-blue-100 border-r border-blue-200
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Healthcare+</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-blue-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  flex items-center px-4 py-3 rounded-lg transition-colors
                  ${active 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:bg-blue-200'
                  }
                `}
              >
                <item.icon className={`w-5 h-5 mr-3 ${
                  active ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-blue-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-200 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3 text-gray-400" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-blue-100 border-b border-blue-200 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-blue-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="lg:hidden"></div> {/* Spacer for mobile */}
            
            <div className="text-sm text-gray-600">
              Welcome back
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl animate-fade-in">
            <Toaster position="top-right" />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}