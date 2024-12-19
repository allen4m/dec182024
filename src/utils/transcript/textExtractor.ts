import { TranscriptProcessingError } from './errors';

export async function extractTextFromFile(file: File): Promise<string> {
  try {
    // For text files, read directly
    if (file.type === 'text/plain') {
      return await readTextFile(file);
    }
    
    // For PDFs, extract text content
    if (file.type === 'application/pdf') {
      return await readPdfAsText(file);
    }
    
    throw new TranscriptProcessingError('Unsupported file type');
  } catch (error) {
    throw new TranscriptProcessingError('Failed to extract text from file');
  }
}

function readTextFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = () => reject(new Error('Failed to read text file'));
    reader.readAsText(file);
  });
}

function readPdfAsText(file: File): Promise<string> {
  return new Promise((resolve) => {
    // For now, just read PDF as text
    // In production, implement proper PDF text extraction
    readTextFile(file).then(resolve);
  });
}