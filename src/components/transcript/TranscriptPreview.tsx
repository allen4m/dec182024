import React from 'react';
import type { ExtractedCourse } from '../../types';

type TranscriptPreviewProps = {
  courses: ExtractedCourse[];
  onEdit: (index: number, field: keyof ExtractedCourse, value: string) => void;
  onConfirm: () => void;
};

export default function TranscriptPreview({ courses, onEdit, onConfirm }: TranscriptPreviewProps) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Review Extracted Data</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Credits
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Term
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course, index) => (
              <tr key={index}>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={course.name}
                    onChange={(e) => onEdit(index, 'name', e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={course.grade}
                    onChange={(e) => onEdit(index, 'grade', e.target.value)}
                    className="w-32 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={course.credits}
                    onChange={(e) => onEdit(index, 'credits', e.target.value)}
                    className="w-24 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={course.term}
                    onChange={(e) => onEdit(index, 'term', e.target.value)}
                    className="w-32 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Confirm and Calculate
        </button>
      </div>
    </div>
  );
}