import { createWorker } from 'tesseract.js';
import fs from 'fs/promises';

export async function extractTextFromImage(filePath, language) {
  const worker = await createWorker(language === 'urdu' ? 'urd' : 'eng');
  try {
    const { data } = await worker.recognize(filePath);
    return data.text?.trim() || '';
  } catch (error) {
    if (language === 'urdu') return 'Urdu OCR not available in this environment. Please try clearer image or English OCR.';
    throw error;
  } finally {
    await worker.terminate();
    await fs.unlink(filePath).catch(() => {});
  }
}
