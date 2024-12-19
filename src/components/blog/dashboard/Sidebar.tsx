import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  MessageSquare,
  Users,
  Settings,
  HelpCircle
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Posts', icon: FileText, href: '/dashboard/posts' },
  { name: 'Categories', icon: FolderOpen, href: '/dashboard/categories' },
  { name: 'Comments', icon: MessageSquare, href: '/dashboard/comments' },
  { name: 'Users', icon: Users, href: '/dashboard/users' },
  { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
  { name: 'Help', icon: HelpCircle, href: '/dashboard/help' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-white shadow-sm h-[calc(100vh-4rem)]">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                location.pathname === item.href
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 ${
                  location.pathname === item.href
                    ? 'text-indigo-500'
                    : 'text-gray-400 group-hover:text-gray-500'
                }`}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}