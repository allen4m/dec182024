import React, { useState, useEffect, useMemo } from 'react';
import { Calculator, Info, RefreshCcw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import CountrySelector from './CountrySelector';
import StudentInfo from './StudentInfo';
import CourseTable from './CourseTable';
import GradeScale from './grade-scale/GradeScale';
import ExportButtons from './ExportButtons';
import TranscriptUploader from './transcript/TranscriptUploader';
import { fetchGradingSystems, convertGradeToGPA, type GradeSystem } from '../lib/airtable';
import { validateCredits, validateGrade } from '../lib/validation';
import { CourseEntry, ExtractedCourse } from '../types';

export default function GPACalculator() {
  const [studentName, setStudentName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [country, setCountry] = useState('');
  const [gradingMode, setGradingMode] = useState('');
  const [showGradeScale, setShowGradeScale] = useState(false);
  const [courses, setCourses] = useState<CourseEntry[]>([
    { id: '1', course: '', grade: '', credits: '' }
  ]);
  const [gradingSystems, setGradingSystems] = useState<Record<string, GradeSystem[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [showTranscriptUploader, setShowTranscriptUploader] = useState(false);

  useEffect(() => {
    const loadGradingSystems = async () => {
      try {
        const systems = await fetchGradingSystems();
        setGradingSystems(systems);
      } catch (error) {
        toast.error('Failed to load grading systems');
      } finally {
        setIsLoading(false);
      }
    };
    loadGradingSystems();
  }, []);

  useEffect(() => {
    setGradingMode('');
  }, [country]);

  const currentGradingSystem = country ? gradingSystems[country] : undefined;
  const gradingModes = currentGradingSystem 
    ? [...new Set(currentGradingSystem.map(gs => gs.grading_mode))]
    : [];

  const filteredGradingSystem = useMemo(() => {
    if (!currentGradingSystem) return undefined;
    return gradingMode
      ? currentGradingSystem.filter(gs => gs.grading_mode === gradingMode)
      : currentGradingSystem;
  }, [currentGradingSystem, gradingMode]);

  const addCourse = () => {
    setCourses([
      ...courses,
      { id: Date.now().toString(), course: '', grade: '', credits: '' }
    ]);
  };

  const removeCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const updateCourse = (index: number, field: keyof CourseEntry, value: string) => {
    const newCourses = [...courses];
    newCourses[index] = { ...newCourses[index], [field]: value };
    setCourses(newCourses);
  };

  const resetCalculator = () => {
    setStudentName('');
    setSchoolName('');
    setCountry('');
    setGradingMode('');
    setCourses([{ id: Date.now().toString(), course: '', grade: '', credits: '' }]);
    setShowGradeScale(false);
    setShowTranscriptUploader(false);
    toast.success('Calculator has been reset');
  };

  const handleExtractedData = (extractedCourses: ExtractedCourse[]) => {
    const newCourses = extractedCourses.map(course => ({
      id: Date.now().toString(),
      course: course.name,
      grade: course.grade,
      credits: course.credits
    }));
    setCourses(newCourses);
    setShowTranscriptUploader(false);
  };

  const hasValidationErrors = useMemo(() => {
    return courses.some(course => {
      const creditError = validateCredits(course.credits);
      const gradeError = validateGrade(course.grade, filteredGradingSystem || []);
      return creditError || gradeError;
    });
  }, [courses, filteredGradingSystem]);

  const calculatedGPA = useMemo(() => {
    if (!filteredGradingSystem || hasValidationErrors) {
      return null;
    }

    const validCourses = courses.filter(course => 
      course.grade && course.credits && parseFloat(course.credits) > 0
    );
    
    if (validCourses.length === 0) {
      return null;
    }

    let totalPoints = 0;
    let totalCredits = 0;
    let hasError = false;

    for (const course of validCourses) {
      const credits = parseFloat(course.credits);
      const gradePoints = convertGradeToGPA(course.grade, filteredGradingSystem);

      if (gradePoints === null) {
        hasError = true;
        break;
      }

      totalPoints += credits * gradePoints;
      totalCredits += credits;
    }

    if (hasError || totalCredits === 0) {
      return null;
    }

    return totalPoints / totalCredits;
  }, [courses, filteredGradingSystem, hasValidationErrors]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <Calculator className="w-8 h-8 text-indigo-600 flex-shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">International GPA Calculator</h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowTranscriptUploader(!showTranscriptUploader)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors w-full sm:w-auto min-h-[44px]"
            >
              {showTranscriptUploader ? 'Hide Upload' : 'Upload Transcript'}
            </button>
            <button
              onClick={resetCalculator}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors w-full sm:w-auto min-h-[44px]"
              title="Reset calculator"
            >
              <RefreshCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {showTranscriptUploader && (
          <div className="mb-8">
            <TranscriptUploader onExtractedData={handleExtractedData} />
          </div>
        )}

        <StudentInfo
          studentName={studentName}
          schoolName={schoolName}
          onStudentNameChange={setStudentName}
          onSchoolNameChange={setSchoolName}
        />

        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Select Country/System
            </label>
            {currentGradingSystem && (
              <button
                onClick={() => setShowGradeScale(!showGradeScale)}
                className="inline-flex items-center justify-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md min-h-[44px] px-3"
                aria-expanded={showGradeScale}
                aria-controls="grade-scale-panel"
              >
                <Info className="w-4 h-4" />
                <span>{showGradeScale ? 'Hide' : 'Show'} Grade Scale</span>
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <CountrySelector selected={country} onChange={setCountry} />
            </div>

            {gradingModes.length > 1 && (
              <div>
                <select
                  value={gradingMode}
                  onChange={(e) => setGradingMode(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 min-h-[44px]"
                  aria-label="Select Grading Mode"
                >
                  <option value="">Select Grading Mode</option>
                  {gradingModes.map(mode => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {currentGradingSystem && showGradeScale && (
          <div className="mb-8 mx-auto w-[90%] bg-gray-50 rounded-lg p-4">
            <GradeScale
              gradingSystem={currentGradingSystem}
              selectedMode={gradingMode}
            />
          </div>
        )}

        <div className="mb-8">
          <CourseTable
            courses={courses}
            gradingSystem={filteredGradingSystem}
            selectedMode={gradingMode}
            onUpdateCourse={updateCourse}
            onRemoveCourse={removeCourse}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <button
            onClick={addCourse}
            className="flex items-center justify-center gap-2 px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors min-h-[44px] w-full sm:w-auto"
          >
            <span>Add Course</span>
          </button>
          <div className="text-xl font-bold text-center sm:text-right">
            Cumulative GPA: {calculatedGPA !== null ? calculatedGPA.toFixed(2) : '0.00'}
          </div>
        </div>

        <ExportButtons
          studentName={studentName}
          schoolName={schoolName}
          courses={courses}
          gpa={calculatedGPA}
          country={country}
        />
      </div>
    </div>
  );
}