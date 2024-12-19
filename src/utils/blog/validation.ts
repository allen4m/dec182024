import type { Post } from '../../types/blog';

export function validatePost(post: Partial<Post>): string[] {
  const errors: string[] = [];

  if (!post.title?.trim()) {
    errors.push('Title is required');
  }

  if (!post.content?.trim()) {
    errors.push('Content is required');
  }

  if (post.excerpt && post.excerpt.length > 300) {
    errors.push('Excerpt must be less than 300 characters');
  }

  if (post.tags && post.tags.some(tag => tag.length > 30)) {
    errors.push('Tags must be less than 30 characters');
  }

  return errors;
}

export function validateSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}