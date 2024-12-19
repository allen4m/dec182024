import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { processTranscript } from '../../utils/transcript';
import UploadProgress from './UploadProgress';
import { validatePdfFile } from '../../utils/fileValidation';
import type { ExtractedCourse } from '../../types';

type TranscriptUploaderProps = {
  onExtractedData: (courses: ExtractedCourse[]) => void;
};

export default function TranscriptUploader({ onExtractedData }: TranscriptUploaderProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const validationError = validatePdfFile(file);
      if (validationError) {
        toast.error(validationError);
        return;
      }

      setIsProcessing(true);
      setProgress(0);
      
      toast.loading('Processing transcript...', { id: 'transcript-processing' });

      const extractedData = await processTranscript(file, (progress) => {
        setProgress(progress);
        if (progress === 100) {
          toast.success('Transcript processed successfully!', { id: 'transcript-processing' });
        }
      });
      
      onExtractedData(extractedData);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to process transcript',
        { id: 'transcript-processing' }
      );
    } finally {
      setIsProcessing(false);
      event.target.value = '';
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Upload className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-medium text-gray-900">Upload Transcript</h3>
        </div>
        <p className="text-sm text-gray-500">
          Upload your academic transcript in PDF or text format (max 10MB)
        </p>
      </div>

      <div className="relative">
        <input
          type="file"
          accept=".pdf,.txt"
          onChange={handleFileUpload}
          disabled={isProcessing}
          className="hidden"
          id="transcript-upload"
        />
        <label
          htmlFor="transcript-upload"
          className={`flex flex-col items-center justify-center w-full h-32 px-4 border-2 border-dashed rounded-lg cursor-pointer ${
            isProcessing
              ? 'bg-gray-50 border-gray-300'
              : 'hover:bg-indigo-50 border-indigo-300 hover:border-indigo-400'
          }`}
        >
          {isProcessing ? (
            <UploadProgress progress={progress} />
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-8 h-8 mb-2 text-indigo-500" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PDF or TXT (MAX. 10MB)</p>
            </div>
          )}
        </label>
      </div>

      {isProcessing && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-700">
                Processing your transcript. This may take a few moments...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}