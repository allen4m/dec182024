import { create } from 'zustand';
import type { Post, User, Category, Comment } from '../types/blog';
import { harvardPost } from '../data/posts/harvard-university';

interface BlogStore {
  posts: Post[];
  categories: Category[];
  currentUser: User | null;
  isAuthenticated: boolean;
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  updatePost: (id: string, post: Partial<Post>) => void;
  deletePost: (id: string) => void;
  setCategories: (categories: Category[]) => void;
  setCurrentUser: (user: User | null) => void;
  addComment: (postId: string, comment: Comment) => void;
  updateComment: (postId: string, commentId: string, status: Comment['status']) => void;
}

export const useBlogStore = create<BlogStore>((set) => ({
  posts: [harvardPost],
  categories: [{
    id: "1",
    name: "Universities",
    slug: "universities",
    description: "Comprehensive university profiles and guides"
  }],
  currentUser: null,
  isAuthenticated: false,

  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  updatePost: (id, updatedPost) => set((state) => ({
    posts: state.posts.map((post) =>
      post.id === id ? { ...post, ...updatedPost } : post
    ),
  })),
  deletePost: (id) => set((state) => ({
    posts: state.posts.filter((post) => post.id !== id),
  })),
  setCategories: (categories) => set({ categories }),
  setCurrentUser: (user) => set({ currentUser: user, isAuthenticated: !!user }),
  addComment: (postId, comment) => set((state) => ({
    posts: state.posts.map((post) =>
      post.id === postId
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ),
  })),
  updateComment: (postId, commentId, status) => set((state) => ({
    posts: state.posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            comments: post.comments.map((comment) =>
              comment.id === commentId ? { ...comment, status } : comment
            ),
          }
        : post
    ),
  })),
}));