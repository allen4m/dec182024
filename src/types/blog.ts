export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  author: User;
  categories: Category[];
  tags: string[];
  status: 'draft' | 'published';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  comments: Comment[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'author';
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

export type Comment = {
  id: string;
  content: string;
  author: User;
  post: Post;
  parent?: Comment;
  replies: Comment[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
};