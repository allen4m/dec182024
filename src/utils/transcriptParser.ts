import type { ExtractedCourse } from '../types';

export function processTranscriptText(text: string): ExtractedCourse[] {
  // This is a simplified implementation
  // In production, implement more sophisticated parsing logic
  
  const courses: ExtractedCourse[] = [];
  const lines = text.split('\n');

  for (const line of lines) {
    // Example pattern matching for course information
    const courseMatch = line.match(
      /([A-Z]{2,4}\s*\d{3,4})\s+(.*?)\s+([A-F][+-]?|\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s+((?:Fall|Spring|Summer)\s+\d{4})/i
    );

    if (courseMatch) {
      courses.push({
        name: `${courseMatch[1]} - ${courseMatch[2]}`.trim(),
        grade: courseMatch[3],
        credits: courseMatch[4],
        term: courseMatch[5]
      });
    }
  }

  return courses;
}