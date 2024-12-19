import { createWorker } from 'tesseract.js';
import { parseTranscriptWithAI } from './ai/transcriptParser';
import type { ExtractedCourse } from '../types';

export async function processTranscript(
  file: File,
  onProgress: (progress: number) => void
): Promise<ExtractedCourse[]> {
  try {
    // Start progress
    onProgress(10);

    // Initialize Tesseract worker
    const worker = await createWorker('eng');
    onProgress(30);

    // Convert PDF to image data URL
    const imageUrl = await convertPdfToImage(file);
    onProgress(50);

    // Perform OCR
    const { data: { text } } = await worker.recognize(imageUrl);
    onProgress(70);

    // Terminate worker
    await worker.terminate();

    if (!text.trim()) {
      throw new Error('No text content found in transcript');
    }

    // Parse with AI
    const courses = await parseTranscriptWithAI(text);
    onProgress(90);

    if (!courses || courses.length === 0) {
      throw new Error('No course information found in transcript');
    }

    // Complete
    onProgress(100);
    return courses;
  } catch (error) {
    console.error('Transcript processing error:', error);
    throw error instanceof Error ? error : new Error('Failed to process transcript');
  }
}

async function convertPdfToImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        };
        
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target?.result as string;
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}