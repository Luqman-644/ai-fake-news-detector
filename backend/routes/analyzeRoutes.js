import { Router } from 'express';
import { analyzeImage, analyzeText } from '../controllers/analyzeController.js';
import { upload } from '../middleware/upload.js';

const router = Router();
router.post('/analyze-text', analyzeText);
router.post('/analyze-image', upload.single('image'), analyzeImage);

export default router;
