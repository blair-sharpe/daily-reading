import { GoogleGenerativeAI } from '@google/generative-ai';
import readings from '../readings.json';

export interface Readings {
  [key: string]: {
    readings: string[];
  };
}

const readingsData: Readings = readings;

interface GenerativeAIResponse {
  response: {
    text: () => string;
  };
}

const generateSummary = async (prompt: string): Promise<string> => {
  const genAI = new GoogleGenerativeAI('');
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  try {
    const result: GenerativeAIResponse = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    return 'Error generating summary.';
  }
};
export const summary = (reading: string): Promise<string> => {
  const prompt = `Please provide a concise outline in 100 words or less, of ${reading}`;

  return generateSummary(prompt);
};

export const fetchSummaries = async (dayOfYear: number): Promise<string[]> => {
  const todaysReadings = readingsData[dayOfYear.toString()]?.readings;
  if (!todaysReadings) {
    return [];
  }

  const summaryPromises = todaysReadings.map((reading) => summary(reading));
  const summaries = await Promise.all(summaryPromises);
  return summaries;
};
