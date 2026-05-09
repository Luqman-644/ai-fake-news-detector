import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './database.js';
import analyzeRoutes from './routes/analyzeRoutes.js';
import historyRoutes from './routes/historyRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', analyzeRoutes);
app.use('/api', historyRoutes);

app.get('/', (req, res) => res.json({ message: 'AI Fake News Detector API running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
