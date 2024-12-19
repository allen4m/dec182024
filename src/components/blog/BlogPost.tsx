import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlogStore } from '../../store/blog';
import { formatDate } from '../../utils/blog/formatting';
import { User, Calendar, ArrowLeft } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const posts = useBlogStore(state => state.posts);
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Post not found</h2>
        <button
          onClick={() => navigate('/blog')}
          className="mt-4 text-indigo-600 hover:text-indigo-700"
        >
          Back to blog
        </button>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate('/blog')}
        className="flex items-center text-indigo-600 hover:text-indigo-700 mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to blog
      </button>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}

      <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

      <div className="flex items-center text-sm text-gray-500 gap-4 mb-8">
        <div className="flex items-center">
          <User className="w-4 h-4 mr-1" />
          {post.author.name}
        </div>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          {formatDate(post.publishedAt || post.createdAt)}
        </div>
      </div>

      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

      <div className="mt-8 flex flex-wrap gap-2">
        {post.tags.map(tag => (
          <span
            key={tag}
            className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}