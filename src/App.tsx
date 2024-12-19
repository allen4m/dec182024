import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import GPACalculator from './components/GPACalculator';
import BlogList from './components/blog/BlogList';
import BlogPost from './components/blog/BlogPost';
import Login from './components/auth/Login';
import Dashboard from './components/blog/dashboard/Dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useBlogStore } from './store/blog';

export default function App() {
  const [activeTab, setActiveTab] = useState<'gpa' | 'finder'>('gpa');
  const { posts } = useBlogStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout activeTab={activeTab} onTabChange={setActiveTab} />}>
          <Route index element={<GPACalculator />} />
          <Route path="blog" element={<BlogList posts={posts} />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard/*" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}