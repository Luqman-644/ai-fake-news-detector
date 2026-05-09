# AI-Powered Multilingual Fake News Detection System Using NLP and OCR

Full-stack MVP web app for detecting fake/real news in English and Urdu from text and images.

## Features
- English + Urdu text analysis
- Image OCR + AI analysis
- Hugging Face zero-shot inference
- Fallback keyword predictor when API fails
- SQLite history and dashboard stats

## Models
- English: `facebook/bart-large-mnli`
- Urdu/Multilingual: `joeddav/xlm-roberta-large-xnli`

Candidate labels:
- fake news
- real news
- misleading news
- credible news

## Backend setup
```bash
cd backend
npm install
npm run dev
```
Runs on: http://localhost:5000

## Frontend setup
```bash
cd frontend
npm install
npm run dev
```
Runs on: http://localhost:5173

## Environment
Create `backend/.env`:
```env
HF_API_KEY=your_huggingface_api_key_here
PORT=5000
```

## API Endpoints
- `POST /api/analyze-text`
- `POST /api/analyze-image`
- `GET /api/history`
- `GET /api/stats`
