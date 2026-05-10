import { GoogleGenerativeAI } from '@google/generative-ai';
import { fallbackPredict } from './predictor.js';
import fs from 'fs/promises';
import path from 'path';

// Lazy initialization — waits until dotenv has loaded
let genAI = null;
function getModel() {
  if (!genAI) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    tools: [{ googleSearch: {} }] // Enables live internet access
  });
}


export async function analyzeWithAI(text, language) {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    console.warn('Gemini API key missing. Using fallback predictor.');
    return fallbackPredict(text, language);
  }

  const model = getModel();
  const isUrdu = language === 'urdu';
  const today = new Date().toDateString();

  const prompt = isUrdu
    ? `آج کی تاریخ: ${today}
آپ ایک ماہر حقائق جانچنے والے اور خبروں کے تجزیہ کار ہیں۔
درج ذیل متن کا تجزیہ کریں: "${text}"

پہلے یہ چیک کریں کہ کیا یہ متن کسی خبر، واقعے یا کسی عوامی اہمیت کے دعوے سے متعلق ہے۔ 
اگر یہ خبر نہیں ہے (مثلاً صرف عام گفتگو، گالی گلوچ، یا بے معنی الفاظ)، تو جواب میں prediction کو "خبر نہیں ہے" لکھیں۔

اگر یہ خبر ہے، تو فیصلہ کریں کہ یہ جعلی خبر ہے یا حقیقی خبر۔
اگر یہ کوئی سوال ہے تو اس سوال میں موجود دعوے یا مفروضے کی جانچ کریں۔ اگر سوال کسی حقیقی چیز کے بارے میں ہے تو اسے "حقیقی خبر" قرار دیں۔

صرف درست JSON واپس کریں، اس فارمیٹ میں:
{"prediction":"جعلی خبر" یا "حقیقی خبر" یا "خبر نہیں ہے","explanation":"اردو میں صرف 1 سے 2 مختصر سطروں میں وضاحت۔"}

prediction صرف "جعلی خبر"، "حقیقی خبر" یا "خبر نہیں ہے" ہونا چاہیے۔`
    : `Today's Date: ${today}
You are an expert fact-checker and news analyst with live internet access.
Analyze the following text: "${text}"

First, determine if this text is actually a news item, a claim, or a public event report. 
If it is NOT news (e.g., casual talk, gibberish, greetings, or irrelevant content), return "Not News" as the prediction.

If it IS news, use Google Search to verify the current facts and determine if it is "Fake News" or "Real News".
If the text is a question, evaluate the claim or assumption within the question. If the question is about something factually real, classify it as "Real News".

Return ONLY valid JSON in this exact format, nothing else:
{"prediction":"Fake News" or "Real News" or "Not News","explanation":"Your 1-2 line concise explanation here."}

The prediction must be exactly "Fake News", "Real News", or "Not News".`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const responseText = response.text();
    const jsonStr = responseText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    const data = JSON.parse(jsonStr);

    return {
      prediction: data.prediction || (isUrdu ? 'حقیقی خبر' : 'Real News'),
      explanation: data.explanation || (isUrdu ? 'گوگل جیمنی کے ذریعے تجزیہ کیا گیا۔' : 'Analyzed by Google Gemini.')
    };
  } catch (error) {
    console.error('Gemini Service Error:', error.message);
    return fallbackPredict(text, language);
  }
}

export async function analyzeImageWithAI(filePath, language) {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    console.warn('Gemini API key missing. Image OCR/Analysis may fail.');
    throw new Error('Gemini API key missing.');
  }

  const model = getModel();
  const isUrdu = language === 'urdu';
  const today = new Date().toDateString();

  try {
    const fileBuffer = await fs.readFile(filePath);
    const imagePart = {
      inlineData: {
        data: fileBuffer.toString('base64'),
        mimeType: 'image/jpeg'
      }
    };

    const prompt = isUrdu
      ? `آج کی تاریخ: ${today}
اس تصویر میں موجود خبر کا متن نکالیں اور گوگل سرچ کا استعمال کرتے ہوئے اس کی تصدیق کریں۔
اگر تصویر میں کوئی خبر یا عوامی دعویٰ نہیں ہے، تو جواب میں prediction کو "خبر نہیں ہے" لکھیں۔

صرف درست JSON واپس کریں، اس فارمیٹ میں:
{
  "extracted_text": "تصویر سے نکالا گیا متن",
  "prediction": "حقیقی خبر" یا "جعلی خبر" یا "خبر نہیں ہے",
  "explanation": "اردو میں صرف 1 سے 2 مختصر سطروں میں وضاحت۔"
}`
      : `Today's Date: ${today}
Extract the news text from this image and use Google Search to verify current facts. Determine if it is "Real News", "Fake News", or "Not News".
If the image does not contain any news content or public claim, classify it as "Not News".

Return ONLY valid JSON in this exact format:
{
  "extracted_text": "Text extracted from the image",
  "prediction": "Real News" or "Fake News" or "Not News",
  "explanation": "A concise 1-2 line explanation of why this content is classified this way."
}`;

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const responseText = response.text();

    const jsonStr = responseText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    const data = JSON.parse(jsonStr);

    await fs.unlink(filePath).catch(() => { });

    return {
      extracted_text: data.extracted_text || '',
      prediction: data.prediction || (isUrdu ? 'حقیقی خبر' : 'Real News'),
      explanation: data.explanation || (isUrdu ? 'گوگل جیمنی کے ذریعے تصویر کا تجزیہ کیا گیا۔' : 'Image analyzed by Google Gemini.')
    };
  } catch (error) {
    console.error('Gemini Image Error:', error.message);
    await fs.unlink(filePath).catch(() => { });
    throw error;
  }
}

export async function checkGeminiStatus() {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    return 'missing';
  }
  try {
    const model = getModel();
    await model.countTokens("ping");
    return 'optimal';
  } catch (error) {
    if (error.message.includes('Quota') || error.message.includes('429') || error.message.includes('exhausted')) {
      return 'quota_exceeded';
    }
    if (error.message.includes('API key') || error.message.includes('API_KEY_INVALID')) {
      return 'invalid_key';
    }
    return 'error';
  }
}
