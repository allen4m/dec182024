import type { Post } from '../../types/blog';

export function generateMetaTags(post: Post) {
  return {
    title: post.title,
    description: post.excerpt || truncateText(post.content, 160),
    image: post.coverImage,
    url: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    tags: post.tags,
  };
}

export function generateStructuredData(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
  };
}