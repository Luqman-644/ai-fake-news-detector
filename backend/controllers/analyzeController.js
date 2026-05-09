import db from '../database.js';
import { detectLanguage } from '../services/languageDetector.js';
import { analyzeWithAI } from '../services/aiService.js';
import { extractTextFromImage } from '../services/ocrService.js';
import { cleanText } from '../services/textCleaner.js';

function saveHistory(record) {
  db.run(
    `INSERT INTO analysis_history (input_type,input_text,extracted_text,language,prediction,confidence,risk_level,created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [record.input_type, record.input_text, record.extracted_text, record.language, record.prediction, record.confidence, record.risk_level, record.created_at]
  );
}

export async function analyzeText(req, res) {
  try {
    const { text = '', language = 'auto' } = req.body;
    const cleaned = cleanText(text);
    if (!cleaned) return res.status(400).json({ error: 'Text is required.' });

    const detected = detectLanguage(cleaned, language);
    const result = await analyzeWithAI(cleaned, detected);
    const timestamp = new Date().toISOString();

    saveHistory({ input_type: 'text', input_text: cleaned, extracted_text: null, language: detected, ...result, created_at: timestamp });

    res.json({ ...result, language: detected === 'urdu' ? 'Urdu' : 'English', timestamp });
  } catch {
    res.status(500).json({ error: 'Failed to analyze text.' });
  }
}

export async function analyzeImage(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: 'Image is required.' });
    const selected = req.body.language || 'auto';
    const baseDetected = detectLanguage('', selected);
    const extracted = cleanText(await extractTextFromImage(req.file.path, baseDetected));
    if (!extracted) return res.status(400).json({ error: 'OCR failed to extract readable text.' });

    const detected = detectLanguage(extracted, selected);
    const result = await analyzeWithAI(extracted, detected);
    const timestamp = new Date().toISOString();

    saveHistory({ input_type: 'image', input_text: null, extracted_text: extracted, language: detected, ...result, created_at: timestamp });

    res.json({ extracted_text: extracted, ...result, language: detected === 'urdu' ? 'Urdu' : 'English', timestamp });
  } catch {
    res.status(500).json({ error: 'Failed to analyze image.' });
  }
}
