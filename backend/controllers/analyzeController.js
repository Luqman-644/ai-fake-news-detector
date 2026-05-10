import db from '../database.js';
import { detectLanguage } from '../services/languageDetector.js';
import { analyzeWithAI, analyzeImageWithAI } from '../services/aiService.js';
import { cleanText } from '../services/textCleaner.js';
import axios from 'axios';
import * as cheerio from 'cheerio';

function saveHistory(record) {
  db.run(
    `INSERT INTO analysis_history (input_type,input_text,extracted_text,language,prediction,confidence,risk_level,created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [record.input_type, record.input_text, record.extracted_text, record.language, record.prediction, record.confidence || null, record.risk_level || null, record.created_at]
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
    
    const result = await analyzeImageWithAI(req.file.path, baseDetected);
    const timestamp = new Date().toISOString();

    saveHistory({ 
      input_type: 'image', 
      input_text: null, 
      extracted_text: result.extracted_text, 
      language: baseDetected, 
      prediction: result.prediction,
      explanation: result.explanation,
      created_at: timestamp 
    });

    res.json({ 
      extracted_text: result.extracted_text, 
      prediction: result.prediction,
      explanation: result.explanation,
      language: baseDetected === 'urdu' ? 'Urdu' : 'English', 
      timestamp 
    });
  } catch (error) {
    console.error('Image Analysis Controller Error:', error.message);
    res.status(500).json({ error: 'Failed to analyze image with AI.' });
  }
}

export async function analyzeUrl(req, res) {
  try {
    const { url = '', language = 'auto' } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required.' });

    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) LENS-Verification-System/1.0' },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);
    $('script, style, nav, footer, ads').remove();
    
    const title = $('h1').first().text() || $('title').text();
    const body = $('article, main, .content, #content').text() || $('body').text();
    const fullText = `${title}\n\n${body}`.substring(0, 10000);

    if (!fullText.trim()) return res.status(400).json({ error: 'Could not extract text from the provided URL.' });

    const detected = detectLanguage(fullText, language);
    const result = await analyzeWithAI(fullText, detected);
    const timestamp = new Date().toISOString();

    saveHistory({ 
      input_type: 'url', 
      input_text: url, 
      extracted_text: fullText.substring(0, 500), 
      language: detected, 
      ...result, 
      created_at: timestamp 
    });

    res.json({ ...result, language: detected === 'urdu' ? 'Urdu' : 'English', timestamp });
  } catch (error) {
    console.error('URL Analysis Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch or analyze the URL content.' });
  }
}

export async function getGeminiStatus(req, res) {
  try {
    const { checkGeminiStatus } = await import('../services/aiService.js');
    const status = await checkGeminiStatus();
    res.json({ status });
  } catch (error) {
    res.json({ status: 'error' });
  }
}
