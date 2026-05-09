import axios from 'axios';
import { fallbackPredict } from './predictor.js';

const CANDIDATE_LABELS = ['fake news', 'real news', 'misleading news', 'credible news'];
const MODELS = {
  english: 'facebook/bart-large-mnli',
  urdu: 'joeddav/xlm-roberta-large-xnli'
};

export async function analyzeWithAI(text, language) {
  const model = language === 'urdu' ? MODELS.urdu : MODELS.english;
  const url = `https://api-inference.huggingface.co/models/${model}`;

  try {
    const { data } = await axios.post(
      url,
      {
        inputs: text,
        parameters: { candidate_labels: CANDIDATE_LABELS, multi_label: false }
      },
      {
        headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` },
        timeout: 20000
      }
    );

    const topLabel = data.labels?.[0] ?? 'fake news';
    const topScore = data.scores?.[0] ?? 0.5;
    const fakeLike = ['fake news', 'misleading news'].includes(topLabel);
    const confidence = Math.round(topScore * 100);

    return {
      prediction: fakeLike ? 'Fake News' : 'Real News',
      confidence,
      risk_level: fakeLike ? (confidence > 80 ? 'High' : 'Medium') : 'Low',
      explanation: `AI (${model}) mapped this text closest to "${topLabel}".`
    };
  } catch {
    return fallbackPredict(text, language);
  }
}
