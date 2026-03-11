import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ChromaClient } from "chromadb";
import OpenAI from "openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const chroma = new ChromaClient({
  url: process.env.CHROMA_URL
});

async function getChromaCollection() {
  return await chroma.getOrCreateCollection({
    name: "docs",
  });
}

function splitText(text, maxLength = 1000) {
  const chunks = [];
  for (let i = 0; i < text.length; i += maxLength) {
    chunks.push(text.slice(i, i + maxLength));
  }
  return chunks;
}

async function ingest() {
  const collection = await getChromaCollection();

  const docsPath = path.join(__dirname, "docs");
  const files = fs.readdirSync(docsPath).filter(file => file.endsWith(".txt"));

  let id = 0;

  for (const file of files) {
    const filePath = path.join(docsPath, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const chunks = splitText(content);

    for (const chunk of chunks) {
      try {
        const response = await openai.embeddings.create({
          model: "text-embedding-3-small",
          input: chunk,
        });
        const embedding = response.data[0].embedding;

        await collection.add({
          ids: [id.toString()],
          documents: [chunk],
          metadatas: [{ source: file, topic: file.replace(".txt", "") }],
          embeddings: [embedding],
        });

        id++;
      } catch (err) {
        console.error(`Error ingesting chunk from ${file}:`, err);
      }
    }

    console.log(`Ingested ${file}`);
  }

  console.log("Ingestion complete!");
}

ingest().catch(console.error);