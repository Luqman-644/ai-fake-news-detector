import { Router } from 'express';
import { getHistory, getStats } from '../controllers/historyController.js';

const router = Router();
router.get('/history', getHistory);
router.get('/stats', getStats);

export default router;
