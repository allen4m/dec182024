import React from 'react';
import { type GradeSystem } from '../../lib/airtable';

type GradeRowProps = {
  grade: GradeSystem;
  index: number;
};

export default function GradeRow({ grade, index }: GradeRowProps) {
  return (
    <tr 
      className={`${
        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
      } hover:bg-gray-50 transition-colors`}
    >
      <td className="px-4 py-3 text-gray-900">
        {grade.local_grade || (
          grade.grade_range_min === grade.grade_range_max
            ? grade.grade_range_min?.toString()
            : `${grade.grade_range_min?.toString() ?? ''}-${grade.grade_range_max?.toString() ?? ''}`
        )}
      </td>
      <td className="px-4 py-3 font-medium text-gray-900">
        {grade.us_grade_letter || '-'}
      </td>
      <td className="px-4 py-3 text-gray-900">
        {typeof grade.grade_points === 'number' ? grade.grade_points.toFixed(2) : '-'}
      </td>
    </tr>
  );
}