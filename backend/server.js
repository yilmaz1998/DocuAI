import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { getChromaCollection } from './lib/chroma.js';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const app = express();
const PORT = process.env.PORT

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/ask', async (req, res) => {
    try {
        const { question } = req.body;

        const collection = await getChromaCollection();

        const embeddingResponse = await openai.embeddings.create({
            model: 'text-embedding-3-small',
            input: question,
        });

        const queryEmbedding = embeddingResponse.data[0].embedding;

        const results = await collection.query({
            queryEmbeddings: [queryEmbedding],
            nResults: 5,
        });

        const context = results.documents[0].join('\n');

        const prompt = `
        You are a senior web developer.
        
        Answer the question using the provided context.
        
        If the answer is in the context, explain it clearly in 3-5 sentences.
        
        If the context does not contain the answer, say "I don't know".
        
        Context:
        ${context}
        
        Question:
        ${question}
        `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful programming assistant." },
                { role: "user", content: prompt }
            ],
            temperature: 0.2
        });

        const answer = completion.choices[0].message.content;

        res.json({
            answer,
            sources: results.metadatas[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});