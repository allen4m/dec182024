import React from 'react';
import { type GradeSystem } from '../../lib/airtable';
import ImportantNote from './ImportantNote';
import GradeTable from './GradeTable';
import AdditionalInfo from './AdditionalInfo';

type GradeScaleProps = {
  gradingSystem: GradeSystem[];
  selectedMode: string;
};

export default function GradeScale({ 
  gradingSystem, 
  selectedMode 
}: GradeScaleProps) {
  const filteredSystem = selectedMode
    ? gradingSystem.filter(gs => gs.grading_mode === selectedMode)
    : gradingSystem;

  const sortedGrades = [...filteredSystem].sort((a, b) => b.grade_points - a.grade_points);
  const attention = filteredSystem[0]?.attention;
  const additionalInfo = filteredSystem[0]?.additional_scale_info;

  return (
    <div className="w-[90%] mx-auto bg-white rounded-lg overflow-hidden">
      <ImportantNote 
        attention={attention}
        className="rounded-t-lg"
      />
      <div className="p-4">
        <GradeTable grades={sortedGrades} />
        {selectedMode && additionalInfo && (
          <p className="text-sm text-gray-500 mt-4">
            {additionalInfo}
          </p>
        )}
      </div>
    </div>
  );
}