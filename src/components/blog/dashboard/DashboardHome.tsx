import React from 'react';
import { useBlogStore } from '../../../store/blog';
import { FileText, MessageSquare, Users, Eye } from 'lucide-react';

export default function DashboardHome() {
  const posts = useBlogStore(state => state.posts);
  
  const stats = {
    posts: posts.length,
    published: posts.filter(post => post.status === 'published').length,
    drafts: posts.filter(post => post.status === 'draft').length,
    totalViews: posts.reduce((sum, post) => sum + post.views, 0),
    totalComments: posts.reduce((sum, post) => sum + post.comments.length, 0),
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Posts
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.posts}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Eye className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Views
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.totalViews}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MessageSquare className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Comments
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.totalComments}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Published/Draft
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.published}/{stats.drafts}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet. Create your first post to get started!</p>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {posts.slice(0, 5).map((post) => (
                <li key={post.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {post.title}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          post.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <Users className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          {post.author.name}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          Published {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}