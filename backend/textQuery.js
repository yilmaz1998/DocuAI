import dotenv from "dotenv";
dotenv.config();

import { getChromaCollection } from "./lib/chroma.js";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function testQuery() {
  const collection = await getChromaCollection();

  const queryText = "Access control in web applications";

  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: queryText,
  });
  const queryEmbedding = embeddingResponse.data[0].embedding;

  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: 3,
  });

  console.log(JSON.stringify(results, null, 2));
}

testQuery().catch(console.error);