import OpenAI from 'openai';
import type { ExtractedCourse } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function parseTranscriptWithAI(text: string): Promise<ExtractedCourse[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system",
        content: "You are a transcript parser that extracts course information and returns it in JSON format."
      }, {
        role: "user",
        content: `
          Extract course information from the following transcript text. 
          Format the response as a JSON array of objects with the following structure:
          [{ "name": "course name", "grade": "grade", "credits": "credit hours", "term": "semester/term" }]
          
          Transcript text:
          ${text}
        `
      }],
      temperature: 0.3,
      max_tokens: 1000
    });

    const result = response.choices[0]?.message?.content;
    if (!result) throw new Error('No response from AI');

    return JSON.parse(result);
  } catch (error) {
    console.error('AI parsing error:', error);
    throw new Error('Failed to parse transcript with AI');
  }
}