import React from 'react';
import { type GradeSystem } from '../../lib/airtable';
import GradeHeader from './GradeHeader';
import GradeRow from './GradeRow';

type GradeTableProps = {
  grades: GradeSystem[];
};

export default function GradeTable({ grades }: GradeTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        <GradeHeader />
        <tbody className="divide-y divide-gray-200">
          {grades.map((grade, index) => (
            grade && <GradeRow key={index} grade={grade} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}