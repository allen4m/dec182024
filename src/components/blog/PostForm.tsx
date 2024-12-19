import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import slugify from 'slugify';
import Editor from './Editor';
import { useBlogStore } from '../../store/blog';
import type { Post } from '../../types/blog';

type PostFormProps = {
  post?: Post;
  onSubmit: (post: Partial<Post>) => void;
};

export default function PostForm({ post, onSubmit }: PostFormProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [coverImage, setCoverImage] = useState(post?.coverImage || '');
  const [categories, setCategories] = useState(post?.categories.map(c => c.id) || []);
  const [tags, setTags] = useState(post?.tags || []);
  const [status, setStatus] = useState<Post['status']>(post?.status || 'draft');

  const allCategories = useBlogStore((state) => state.categories);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    const postData: Partial<Post> = {
      title,
      slug: slugify(title, { lower: true }),
      content,
      excerpt,
      coverImage,
      categories: allCategories.filter(c => categories.includes(c.id)),
      tags,
      status,
      updatedAt: new Date().toISOString(),
    };

    if (status === 'published' && !post?.publishedAt) {
      postData.publishedAt = new Date().toISOString();
    }

    onSubmit(postData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                     text-gray-900 text-base placeholder:text-gray-400
                     focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500
                     hover:border-gray-300 transition-colors duration-200
                     min-h-[44px]"
            placeholder="Enter post title"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Content</span>
          <div className="mt-1 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300">
            <Editor content={content} onChange={setContent} />
          </div>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Excerpt</span>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                     text-gray-900 text-base placeholder:text-gray-400
                     focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500
                     hover:border-gray-300 transition-colors duration-200
                     min-h-[44px] resize-y"
            placeholder="Enter a brief excerpt"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Cover Image URL</span>
          <input
            type="url"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                     text-gray-900 text-base placeholder:text-gray-400
                     focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500
                     hover:border-gray-300 transition-colors duration-200
                     min-h-[44px]"
            placeholder="https://example.com/image.jpg"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Categories</span>
          <select
            multiple
            value={categories}
            onChange={(e) => setCategories(Array.from(e.target.selectedOptions, option => option.value))}
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                     text-gray-900 text-base
                     focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500
                     hover:border-gray-300 transition-colors duration-200
                     min-h-[132px]"
          >
            {allCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <span className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple categories</span>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Tags</span>
          <input
            type="text"
            value={tags.join(', ')}
            onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                     text-gray-900 text-base placeholder:text-gray-400
                     focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500
                     hover:border-gray-300 transition-colors duration-200
                     min-h-[44px]"
            placeholder="Enter tags separated by commas"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Status</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Post['status'])}
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                     text-gray-900 text-base
                     focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500
                     hover:border-gray-300 transition-colors duration-200
                     min-h-[44px]"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                   transition-colors duration-200 min-h-[44px]"
        >
          {post ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
}