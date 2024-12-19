import React from 'react';
import { format } from 'date-fns';
import { Check, X } from 'lucide-react';
import type { Comment } from '../../types/blog';

type CommentListProps = {
  comments: Comment[];
  onUpdateStatus: (comment: Comment, status: Comment['status']) => void;
};

export default function CommentList({ comments, onUpdateStatus }: CommentListProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              {comment.author.avatar && (
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="h-10 w-10 rounded-full"
                />
              )}
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {comment.author.name}
                </p>
                <p className="text-sm text-gray-500">
                  {format(new Date(comment.createdAt), 'MMM d, yyyy h:mm a')}
                </p>
              </div>
            </div>
            {comment.status === 'pending' && (
              <div className="flex space-x-2">
                <button
                  onClick={() => onUpdateStatus(comment, 'approved')}
                  className="text-green-600 hover:text-green-700"
                >
                  <Check className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onUpdateStatus(comment, 'rejected')}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-700">{comment.content}</p>
          </div>
          {comment.replies.length > 0 && (
            <div className="mt-4 ml-12 space-y-4">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    {reply.author.avatar && (
                      <img
                        src={reply.author.avatar}
                        alt={reply.author.name}
                        className="h-8 w-8 rounded-full"
                      />
                    )}
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {reply.author.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {format(new Date(reply.createdAt), 'MMM d, yyyy h:mm a')}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">{reply.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}