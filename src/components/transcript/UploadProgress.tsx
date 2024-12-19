import React from 'react';

type UploadProgressProps = {
  progress: number;
};

export default function UploadProgress({ progress }: UploadProgressProps) {
  return (
    <div className="w-full max-w-xs">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-indigo-600">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}