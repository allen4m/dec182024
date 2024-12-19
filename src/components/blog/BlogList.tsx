import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import TagFilter from './TagFilter';
import PostCard from './PostCard';
import { filterPostsByTag } from '../../utils/blog/search';
import type { Post } from '../../types/blog';

type BlogListProps = {
  posts: Post[];
};

export default function BlogList({ posts }: BlogListProps) {
  const [searchParams] = useSearchParams();
  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    const tagParam = searchParams.get('tags');
    return tagParam ? tagParam.split(',') : [];
  });

  // Get unique tags from all posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach(post => {
      post.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  // Filter posts based on selected tags
  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) return posts;
    return posts.filter(post =>
      selectedTags.every(tag => post.tags.includes(tag))
    );
  }, [posts, selectedTags]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <TagFilter
        tags={allTags}
        onFilterChange={setSelectedTags}
      />

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No posts found with the selected tags.
          </p>
          <button
            onClick={() => setSelectedTags([])}
            className="mt-4 text-indigo-600 hover:text-indigo-700"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}