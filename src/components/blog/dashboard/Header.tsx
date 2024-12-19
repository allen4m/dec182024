import React from 'react';
import { Bell, Settings } from 'lucide-react';
import type { User } from '../../../types/blog';

type HeaderProps = {
  user: User;
};

export function Header({ user }: HeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://cdn.prod.website-files.com/673d04a68c435af83c59b97a/67520579b527ce80e7018409_1Admission%20Horizontal%20v6b.svg"
            alt="1Admission"
            className="h-8"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <Settings className="w-5 h-5" />
          </button>
          <div className="flex items-center">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.name.charAt(0)}
                </span>
              </div>
            )}
            <span className="ml-2 text-sm font-medium text-gray-700">
              {user.name}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}