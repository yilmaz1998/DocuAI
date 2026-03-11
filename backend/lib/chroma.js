import { ChromaClient } from "chromadb";
import dotenv from "dotenv";
dotenv.config();

const chroma = new ChromaClient({
  url: process.env.CHROMA_URL,
});

export async function getChromaCollection() {
  return await chroma.getOrCreateCollection({
    name: "docs",
  });
}