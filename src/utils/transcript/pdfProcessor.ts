import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { PDFProcessingError } from './errors';

// Initialize PDF.js worker
const PDFJS_VERSION = '4.0.379';
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.js`;

export async function extractPdfPages(file: File): Promise<string[]> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    const pages: string[] = [];
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      pages.push(pageText);
    }
    
    return pages;
  } catch (error) {
    console.error('PDF processing error:', error);
    throw new PDFProcessingError('Failed to extract text from PDF');
  }
}