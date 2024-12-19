import { parseWithAI } from './aiParser';
import { TranscriptProcessingError } from './errors';
import { extractTextFromFile } from './textExtractor';
import type { ExtractedCourse } from '../../types';

export async function processTranscript(
  file: File,
  onProgress: (progress: number) => void
): Promise<ExtractedCourse[]> {
  try {
    // Start progress
    onProgress(10);
    
    // Extract text from file
    const text = await extractTextFromFile(file);
    onProgress(50);
    
    if (!text.trim()) {
      throw new TranscriptProcessingError('No text content found in file');
    }
    
    // Parse with AI
    const courses = await parseWithAI(text);
    onProgress(90);
    
    if (!courses || courses.length === 0) {
      throw new TranscriptProcessingError('No course information found in transcript');
    }
    
    onProgress(100);
    return courses;
  } catch (error) {
    console.error('Transcript processing error:', error);
    if (error instanceof TranscriptProcessingError) {
      throw error;
    }
    throw new TranscriptProcessingError('Failed to process transcript');
  }
}