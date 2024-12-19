import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

type TagFilterProps = {
  tags: string[];
  onFilterChange: (selectedTags: string[]) => void;
};

export default function TagFilter({ tags, onFilterChange }: TagFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    const tagParam = searchParams.get('tags');
    return tagParam ? tagParam.split(',') : [];
  });

  useEffect(() => {
    onFilterChange(selectedTags);
    
    if (selectedTags.length > 0) {
      setSearchParams({ tags: selectedTags.join(',') });
    } else {
      searchParams.delete('tags');
      setSearchParams(searchParams);
    }
  }, [selectedTags, setSearchParams]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Filter by Tags</h3>
        {selectedTags.length > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear filters
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`
              px-3 py-1 rounded-full text-sm font-medium
              transition-all duration-200 ease-in-out
              ${
                selectedTags.includes(tag)
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {tag}
            <span className="ml-1">
              {selectedTags.includes(tag) ? '×' : '+'}
            </span>
          </button>
        ))}
      </div>

      {selectedTags.length > 0 && (
        <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
          <p className="text-sm text-indigo-700">
            Showing posts tagged with: {selectedTags.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}