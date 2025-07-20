import { NextApiRequest, NextApiResponse } from 'next';
import { downloadTextFile } from '@/lib/google';
import { chunkText } from '@/lib/chunk';
import { upsertTextChunks } from '@/lib/qdrant';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { fileId } = req.body;

  if (!fileId) return res.status(400).json({ error: 'Missing fileId' });

  const text = await downloadTextFile(fileId);
  const chunks = chunkText(text, 300);

  await upsertTextChunks(chunks);
  res.status(200).json({ message: 'Ingested successfully' });
}
