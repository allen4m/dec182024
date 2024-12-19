import React, { useState } from 'react';
import { PlusCircle, Search } from 'lucide-react';
import { useBlogStore } from '../../../store/blog';
import PostList from '../PostList';
import PostForm from '../PostForm';
import type { Post } from '../../../types/blog';

export default function PostManager() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { posts, addPost, updatePost, deletePost, currentUser } = useBlogStore();

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setIsEditing(true);
  };

  const handleDelete = (post: Post) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
    }
  };

  const handleSubmit = (postData: Partial<Post>) => {
    if (selectedPost) {
      updatePost(selectedPost.id, {
        ...postData,
        updatedAt: new Date().toISOString()
      });
    } else {
      addPost({
        ...postData,
        id: Date.now().toString(),
        author: currentUser!,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        likes: 0,
        comments: []
      } as Post);
    }
    setIsEditing(false);
    setSelectedPost(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedPost(null);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedPost ? 'Edit Post' : 'Create New Post'}
          </h2>
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
        <PostForm
          post={selectedPost || undefined}
          onSubmit={handleSubmit}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Posts</h1>
        <button
          onClick={() => setIsEditing(true)}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Create New Post
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">No posts found</p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-indigo-600 hover:text-indigo-700"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <PostList
          posts={filteredPosts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}