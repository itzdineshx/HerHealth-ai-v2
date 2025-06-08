
const GEMINI_API_KEY = "AIzaSyCGo4QPLUtsHTzO0f1E-rBaWumWoSKO2dY";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export const sendGeminiMessage = async (message: string, conversationHistory: GeminiMessage[] = []): Promise<string> => {
  try {
    const systemPrompt = {
      role: 'user',
      parts: [
        {
          text: `You are a Gemini Health Assistant specialized in women's health. You can answer questions about:
- Menstrual cycle and tracking
- Pregnancy and fertility  
- Menopause and perimenopause
- General wellness and nutrition
- Mental health and wellbeing

Provide helpful, accurate, and personalized health information. Always remind users to consult healthcare professionals for medical advice. Keep responses conversational and supportive.`
        }
      ]
    };

    const userMessage = {
      role: 'user',
      parts: [{ text: message }]
    };

    const messages = [systemPrompt, ...conversationHistory, userMessage];

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    }
    
    throw new Error('Invalid response format from Gemini API');
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to get response from Gemini Health Assistant');
  }
};
