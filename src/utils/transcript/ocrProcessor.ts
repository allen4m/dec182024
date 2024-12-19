import { createWorker } from 'tesseract.js';
import { OCRProcessingError } from './errors';

export async function extractTextWithOCR(imageUrl: string): Promise<string> {
  const worker = await createWorker('eng');
  try {
    const { data: { text } } = await worker.recognize(imageUrl);
    if (!text.trim()) {
      throw new OCRProcessingError('No text found in document');
    }
    return text;
  } catch (error) {
    if (error instanceof OCRProcessingError) throw error;
    throw new OCRProcessingError('Failed to process OCR');
  } finally {
    await worker.terminate();
  }
}