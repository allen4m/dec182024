export class TranscriptProcessingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TranscriptProcessingError';
  }
}

export class AIParsingError extends TranscriptProcessingError {
  constructor(message: string) {
    super(message);
    this.name = 'AIParsingError';
  }
}