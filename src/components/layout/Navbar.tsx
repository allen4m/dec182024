import React from 'react';
import { Link } from 'react-router-dom';

type NavbarProps = {
  activeTab: 'gpa' | 'finder';
  onTabChange: (tab: 'gpa' | 'finder') => void;
};

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
              <img
                src="https://cdn.prod.website-files.com/673d04a68c435af83c59b97a/67520579b527ce80e7018409_1Admission%20Horizontal%20v6b.svg"
                alt="1Admission"
                className="h-8"
              />
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/"
              onClick={() => onTabChange('gpa')}
              className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium ${
                activeTab === 'gpa'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              GPA Calculator
            </Link>
            <Link
              to="/blog"
              onClick={() => onTabChange('finder')}
              className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium ${
                activeTab === 'finder'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}