import Link from 'next/link';
import { Activity, Shield, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-blue-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Healthcare+</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/doctors" className="text-gray-600 hover:text-gray-900">
                Find Doctors
              </Link>
              <Link href="#features" className="text-gray-600 hover:text-gray-900">
                Features
              </Link>
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

      <section className="py-20 sm:py-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Modern Healthcare
            <span className="text-blue-600"> Management</span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Streamline patient care and manage your healthcare practice with our simple, secure platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary px-8 py-3 text-lg">
              Start Free Trial
            </Link>
            <Link href="/doctors" className="btn-secondary px-8 py-3 text-lg">
              View Doctors
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need
            </h2>
            <p className="text-xl text-gray-600">
              Simple tools for modern healthcare management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Compliant</h3>
              <p className="text-gray-600">HIPAA compliant with enterprise-grade security to protect patient data.</p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Patient Management</h3>
              <p className="text-gray-600">Easily manage patient records, appointments, and medical history.</p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Updates</h3>
              <p className="text-gray-600">Get instant updates and notifications for better patient care.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-100">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Join healthcare providers who trust our platform.
          </p>
          <Link href="/register" className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold inline-block">
            Start Your Free Trial
          </Link>
        </div>
      </section>

      <footer className="bg-gray-100 text-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Healthcare+</span>
              </div>
              <p className="text-gray-600">
                Simple, secure healthcare management for modern practices.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/doctors" className="hover:text-gray-900">Find Doctors</Link></li>
                <li><Link href="/register" className="hover:text-gray-900">Get Started</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="#" className="hover:text-gray-900">Help Center</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-300 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 Healthcare+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}