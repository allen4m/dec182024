import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { formatDate } from '../../utils/blog/formatting';
import type { Post } from '../../types/blog';

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          <Link to={`/blog/${post.slug}`} className="hover:text-indigo-600">
            {post.title}
          </Link>
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center text-sm text-gray-500 gap-4">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            {post.author.name}
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(post.publishedAt || post.createdAt)}
          </div>
        </div>
      </div>
    </article>
  );
}