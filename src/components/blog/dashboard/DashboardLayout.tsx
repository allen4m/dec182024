import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import type { User } from '../../../types/blog';

type DashboardLayoutProps = {
  children: React.ReactNode;
  currentUser: User;
};

export function DashboardLayout({ children, currentUser }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={currentUser} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}