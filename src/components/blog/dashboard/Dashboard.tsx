import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useBlogStore } from '../../../store/blog';
import { DashboardLayout } from './DashboardLayout';
import DashboardHome from './DashboardHome';
import PostManager from './PostManager';
import CategoryManager from './CategoryManager';
import CommentManager from './CommentManager';
import UserManager from './UserManager';
import Settings from './Settings';
import Help from './Help';

export default function Dashboard() {
  const currentUser = useBlogStore(state => state.currentUser);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <DashboardLayout currentUser={currentUser}>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="posts" element={<PostManager />} />
        <Route path="categories" element={<CategoryManager />} />
        <Route path="comments" element={<CommentManager />} />
        <Route path="users" element={<UserManager />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
}