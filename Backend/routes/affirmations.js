import express from 'express';
import OpenAI from 'openai';
import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the .env file in the Backend directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const router = express.Router();


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Initialize Hugging Face client
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Emotion to affirmation mapping (fallback in case GPT fails)
const emotionAffirmations = {
    joy: [
        "Your joy is contagious and inspires others around you.",
        "You radiate positivity and attract wonderful opportunities.",
        "Your happiness is a choice, and you choose it every day.",
        "You deserve all the joy and happiness life has to offer.",
        "Your positive energy creates a beautiful ripple effect."
    ],
    love: [
        "You are worthy of love and respect.",
        "Your heart is open to giving and receiving love.",
        "You attract loving and supportive relationships.",
        "You are surrounded by love in all its forms.",
        "Your capacity to love grows stronger each day."
    ],
    sadness: [
        "This feeling is temporary, and brighter days await.",
        "You have the strength to overcome any challenge.",
        "Your resilience grows with each experience.",
        "You are not alone in your journey.",
        "Every day brings new opportunities for joy.",
        "Your burnout is a signal to rest and recharge.",
        "You have permission to take a step back and breathe.",
        "Your worth is not measured by your productivity.",
        "You are doing enough, even when you feel otherwise.",
        "It's okay to not be okay sometimes."
    ],
    anger: [
        "You choose peace and understanding.",
        "Your inner calm grows stronger each day.",
        "You release negativity and embrace positivity.",
        "You respond with wisdom and clarity.",
        "Your peace of mind is your greatest strength."
    ],
    fear: [
        "You are braver than you believe.",
        "Your courage grows with each step forward.",
        "You trust in your ability to handle any situation.",
        "You are safe and protected.",
        "Your inner strength guides you through challenges."
    ],
    surprise: [
        "You embrace new experiences with wonder.",
        "Your curiosity leads to amazing discoveries.",
        "You are open to life's beautiful surprises.",
        "Your sense of wonder makes life more exciting.",
        "You welcome the unexpected with joy."
    ],
    neutral: [
        "You are grounded and centered.",
        "Your balanced perspective serves you well.",
        "You navigate life with wisdom and clarity.",
        "Your calm presence brings peace to others.",
        "You find strength in your steady nature."
    ]
};

// Get random affirmation based on emotion (fallback in case GPT fails)
const getRandomAffirmation = (emotion) => {
    const affirmations = emotionAffirmations[emotion] || emotionAffirmations.neutral;
    return affirmations[Math.floor(Math.random() * affirmations.length)];
};

// Generate affirmation using GPT
const generateAffirmationWithGPT = async (text, emotion, confidence) => {
    try {
        console.log('Attempting to generate affirmation with GPT...');
        if (!process.env.OPENAI_API_KEY) {
            console.error('OpenAI API key is missing');
            throw new Error('OpenAI API key is not configured');
        }

        const prompt = `Generate a personalized, uplifting affirmation based on the following context:
        
User's text: "${text}"
Detected emotion: ${emotion} (confidence: ${(confidence * 100).toFixed(1)}%)

The affirmation should:
1. Be directly related to the user's specific situation
2. Be positive and encouraging
3. Be concise (1-2 sentences)
4. Start with "You" or "Your"
5. Be in the present tense
6. Be specific to the emotion detected
7. If the user mentions burnout or lack of motivation, address these specifically

Return ONLY the affirmation text, nothing else.`;

        console.log('Sending request to OpenAI with prompt:', prompt);
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a supportive and empathetic affirmation generator." },
                { role: "user", content: prompt }
            ],
            max_tokens: 100,
            temperature: 0.7
        });

        console.log('Received response from OpenAI:', response);
        const affirmation = response.choices[0].message.content.trim();
        console.log('Generated affirmation:', affirmation);
        return affirmation;
    } catch (error) {
        console.error('Error generating affirmation with GPT:');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        if (error.response) {
            console.error('API Error details:', error.response.data);
        }
        console.error('Full error:', error);
        console.log('Falling back to default affirmation for emotion:', emotion);
        return getRandomAffirmation(emotion); // Fallback to predefined affirmations
    }
};

// Analyze text and return affirmation
router.post('/analyze', async (req, res) => {
    try {
        const { text } = req.body;
        
        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        console.log('Received text for analysis:', text);
        
        // Analyze text using Hugging Face emotion classifier
        console.log('Analyzing text with BERT emotion classifier...');
        const result = await hf.textClassification({
            model: 'j-hartmann/emotion-english-distilroberta-base',
            inputs: text
        });
        console.log('BERT emotion analysis result:', JSON.stringify(result, null, 2));
        
        // Check if result is an array and has the expected format
        if (!Array.isArray(result) || result.length === 0) {
            console.error('Unexpected API response format:', result);
            throw new Error('Invalid response from BERT emotion classifier');
        }
        
        // Get the dominant emotion
        const dominantEmotion = result[0].label.toLowerCase();
        const confidence = result[0].score;
        
        console.log('Dominant emotion:', dominantEmotion, 'Confidence:', confidence);

        // Generate affirmation using GPT
        console.log('Generating affirmation with GPT...');
        const affirmation = await generateAffirmationWithGPT(text, dominantEmotion, confidence);
        console.log('Generated affirmation:', affirmation);
        
        res.json({
            emotion: dominantEmotion,
            confidence: confidence,
            affirmation,
            analysis: result
        });
    } catch (error) {
        console.error('Error in BERT emotion analysis:', error);
        res.status(500).json({ 
            error: 'Error analyzing text with BERT model',
            details: error.message
        });
    }
});

export default router; 