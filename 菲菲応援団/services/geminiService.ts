import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let client: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

export const initializeGemini = () => {
    if (!process.env.API_KEY) {
        console.error("API_KEY is missing");
        return;
    }
    client = new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getChatSession = async () => {
    if (!client) initializeGemini();
    if (!client) throw new Error("Failed to initialize Gemini client");

    if (!chatSession) {
        chatSession = await client.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                temperature: 0.7,
            }
        });
    }
    return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
    try {
        const session = await getChatSession();
        const result = await session.sendMessage({ message });
        return result.text || "申し訳ありません、うまく聞き取れませんでした。もう一度お願いします。";
    } catch (error) {
        console.error("Gemini Error:", error);
        return "通信エラーが発生しました。インターネット接続を確認してください。";
    }
};

export const streamMessageToGemini = async function* (message: string) {
    try {
        const session = await getChatSession();
        const resultStream = await session.sendMessageStream({ message });
        
        for await (const chunk of resultStream) {
            const text = chunk.text;
            if (text) yield text;
        }
    } catch (error) {
        console.error("Gemini Stream Error:", error);
        yield "エラーが発生しました。";
    }
};