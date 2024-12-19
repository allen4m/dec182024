import { ImageConversionError } from './errors';

export async function convertToImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        // Create a temporary URL for the PDF file
        const pdfUrl = URL.createObjectURL(file);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Create an iframe to render the PDF
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        iframe.onload = () => {
          try {
            // Wait for the PDF to render
            setTimeout(() => {
              // Set canvas dimensions
              canvas.width = iframe.contentWindow?.document.body.scrollWidth || 800;
              canvas.height = iframe.contentWindow?.document.body.scrollHeight || 1000;
              
              // Draw the iframe content to canvas
              ctx?.drawImage(
                iframe.contentWindow?.document.body as unknown as HTMLImageElement,
                0,
                0,
                canvas.width,
                canvas.height
              );
              
              // Clean up
              URL.revokeObjectURL(pdfUrl);
              document.body.removeChild(iframe);
              
              resolve(canvas.toDataURL('image/png'));
            }, 1000); // Give time for PDF to render
          } catch (error) {
            document.body.removeChild(iframe);
            reject(new ImageConversionError('Failed to convert PDF to image'));
          }
        };
        
        iframe.src = pdfUrl;
      } catch (error) {
        reject(new ImageConversionError('Failed to process PDF conversion'));
      }
    };
    
    reader.onerror = () => reject(new ImageConversionError('Failed to read PDF file'));
    reader.readAsArrayBuffer(file);
  });
}