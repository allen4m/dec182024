import React from 'react';
import { format } from 'date-fns';
import { Edit, Trash2, Eye, ThumbsUp, MessageSquare } from 'lucide-react';
import type { Post } from '../../types/blog';

type PostListProps = {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
};

export default function PostList({ posts, onEdit, onDelete }: PostListProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="hidden xl:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stats
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                    {post.title}
                  </div>
                </td>
                <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {post.author.avatar ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={post.author.avatar}
                        alt={post.author.name}
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-medium">
                          {post.author.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <span className="ml-2 text-sm text-gray-900">{post.author.name}</span>
                  </div>
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    post.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(post.updatedAt), 'MMM d, yyyy')}
                </td>
                <td className="hidden xl:table-cell px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {post.views}
                    </span>
                    <span className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {post.likes}
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {post.comments.length}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => onEdit(post)}
                      className="text-indigo-600 hover:text-indigo-900"
                      aria-label="Edit post"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(post)}
                      className="text-red-600 hover:text-red-900"
                      aria-label="Delete post"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}