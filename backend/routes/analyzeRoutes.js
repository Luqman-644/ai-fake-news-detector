import { Router } from 'express';
import { analyzeImage, analyzeText, analyzeUrl, getGeminiStatus } from '../controllers/analyzeController.js';
import { upload } from '../middleware/upload.js';

const router = Router();
router.post('/analyze-text', analyzeText);
router.post('/analyze-image', upload.single('image'), analyzeImage);
router.post('/analyze-url', analyzeUrl);
router.get('/gemini-status', getGeminiStatus);

export default router;
