export type CourseEntry = {
  id: string;
  course: string;
  grade: string;
  credits: string;
  weight?: string;
};

export type GradingSystem = {
  id: string;
  country: string;
  grades: {
    grade: string;
    min: number;
    max: number;
    gpa: number;
  }[];
};

export type ExtractedCourse = {
  name: string;
  grade: string;
  credits: string;
  term: string;
};