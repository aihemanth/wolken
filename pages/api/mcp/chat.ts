import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { searchChunks } from '@/lib/qdrant';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { question } = req.body;

  if (!question) return res.status(400).json({ error: 'Missing question' });

  const context = await searchChunks(question);

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'Answer based only on the context.' },
      { role: 'user', content: `Context:\n${context}\n\nQuestion: ${question}` }
    ]
  });

  res.status(200).json({ answer: completion.choices[0].message.content });
}
