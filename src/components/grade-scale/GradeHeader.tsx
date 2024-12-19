import React from 'react';

export default function GradeHeader() {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-900">
          Local Grade
        </th>
        <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-900">
          US Grade
        </th>
        <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-900">
          Quality Points
        </th>
      </tr>
    </thead>
  );
}