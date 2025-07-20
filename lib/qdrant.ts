import { QdrantClient } from '@qdrant/js-client-rest';

export const client = new QdrantClient({ url: process.env.QDRANT_URL! });

export async function upsertTextChunks(chunks: string[]) {
  await client.createCollection('docs', {
    vectors: { size: 1536, distance: 'Cosine' },
  });

  const points = await Promise.all(chunks.map(async (text, i) => ({
    id: i,
    vector: await getEmbedding(text),
    payload: { text }
  })));

  await client.upsert('docs', { points });
}

export async function searchChunks(query: string) {
  const vector = await getEmbedding(query);

  const results = await client.search('docs', {
    vector,
    limit: 5
  });

  return results.map(r => r.payload?.text).join('\n');
}

import { getEmbedding } from './embedding'; 
