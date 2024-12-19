import type { Post } from '../../types/blog';

export function searchPosts(posts: Post[], query: string): Post[] {
  const searchTerms = query.toLowerCase().split(' ');
  
  return posts.filter(post => {
    const searchableText = [
      post.title,
      post.content,
      post.excerpt,
      ...post.tags,
      post.author.name,
      ...post.categories.map(c => c.name),
    ].join(' ').toLowerCase();

    return searchTerms.every(term => searchableText.includes(term));
  });
}

export function filterPostsByCategory(posts: Post[], categoryId: string): Post[] {
  return posts.filter(post => 
    post.categories.some(category => category.id === categoryId)
  );
}

export function filterPostsByTag(posts: Post[], tag: string): Post[] {
  return posts.filter(post => post.tags.includes(tag));
}