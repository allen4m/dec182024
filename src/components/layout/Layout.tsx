import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

type LayoutProps = {
  activeTab: 'gpa' | 'finder';
  onTabChange: (tab: 'gpa' | 'finder') => void;
};

export default function Layout({ activeTab, onTabChange }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Navbar activeTab={activeTab} onTabChange={onTabChange} />
      <div className="flex justify-end px-4 py-2 bg-white shadow-sm">
        <Link
          to="/login"
          className="text-sm text-indigo-600 hover:text-indigo-700"
        >
          Admin Login
        </Link>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}