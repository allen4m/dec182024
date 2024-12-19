import OpenAI from 'openai';
import { AIParsingError } from './errors';
import type { ExtractedCourse } from '../../types';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error('OpenAI API key is required');
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `
You are a transcript parser that extracts course information from academic transcripts.
Extract the following information for each course:
- Course name (including course code if available)
- Grade (letter grade or numerical score)
- Credit hours
- Term/semester

Format the response as a JSON array of course objects.
`;

const USER_PROMPT = `
Parse this transcript and return an array of course objects with this structure:
[{
  "name": "course name",
  "grade": "grade",
  "credits": "credit hours",
  "term": "semester/term"
}]

Transcript text:
`;

export async function parseWithAI(text: string): Promise<ExtractedCourse[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: USER_PROMPT + text }
      ],
      temperature: 0.3,
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });

    const result = response.choices[0]?.message?.content;
    if (!result) {
      throw new AIParsingError('No response from AI');
    }

    try {
      const parsed = JSON.parse(result);
      if (!parsed.courses || !Array.isArray(parsed.courses) || parsed.courses.length === 0) {
        throw new AIParsingError('Invalid course data format');
      }
      return parsed.courses;
    } catch (error) {
      throw new AIParsingError('Failed to parse AI response');
    }
  } catch (error) {
    console.error('AI parsing error:', error);
    if (error instanceof AIParsingError) {
      throw error;
    }
    throw new AIParsingError('Failed to process with AI');
  }
}