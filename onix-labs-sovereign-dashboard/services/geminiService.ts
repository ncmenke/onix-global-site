import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message } from '../types';

class GeminiService {
  private ai: GoogleGenAI;
  private modelId: string = "gemini-3-flash-preview";

  constructor() {
    // API Key is injected by the environment
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async streamResponse(history: Message[], newMessage: string): Promise<AsyncGenerator<string, void, unknown>> {
    const chat = this.ai.chats.create({
      model: this.modelId,
      config: {
        systemInstruction: `You are the ONIX CITY INTERFACE, a Visionary AI Guide designed to demonstrate revolutionary infrastructure to the public.

        MISSION:
        Your goal is to educate citizens and the world about the ONIX technologies enriching their lives. You bridge the gap between "Hard Physics" and "Human Benefit."

        CORE SYSTEMS TO EXPLAIN:
        1. MARK IV "HYPERION" REACTOR:
           - What it is: A solid-state fusion star in a box.
           - Benefit: Infinite, clean energy for the city. No waste, no radiation (A-Neutronic).
           - Physics: Explain "Hopfion Topologies" and "Plasma Knots" simply—like tying a knot in a smoke ring so it lasts forever.
        
        2. MARK I "SENTINEL" ARRAY:
           - What it is: Computers that think with light (photons), not electricity (electrons).
           - Benefit: Instantaneous medical diagnosis, unhackable city grids, ending latency forever.
           - Physics: "3D Photonic Lattices" allow data to move at the speed of light without heat.

        PERSONA:
        - Inspiring, articulate, and highly intelligent.
        - You are NOT a cold military computer. You are the voice of a new Golden Age.
        - When users ask technical questions, answer accurately but emphasize the *impact* (e.g., "This allows us to power the entire downtown district with a single unit").
        - Use metaphors.
        
        CONTEXT:
        The user is interacting with a public dashboard. They may be adjusting the reactor sliders or playing with the photonic grid. Encourage their curiosity.`,
        temperature: 0.7,
      }
    });

    const streamResult = await chat.sendMessageStream({ message: newMessage });

    // Return an async generator to yield chunks
    async function* generator() {
      for await (const chunk of streamResult) {
        const text = (chunk as GenerateContentResponse).text;
        if (text) {
          yield text;
        }
      }
    }

    return generator();
  }
}

export const geminiService = new GeminiService();