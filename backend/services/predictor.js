const fakeEn = ['breaking', 'shocking', 'viral', 'unbelievable', 'secret', 'exposed', 'leaked'];
const realEn = ['official', 'research', 'report', 'confirmed', 'verified'];
const fakeUr = ['فوری', 'حیران کن', 'وائرل', 'انکشاف', 'لیک'];
const realUr = ['سرکاری', 'تحقیق', 'رپورٹ', 'تصدیق'];

export function fallbackPredict(text, language) {
  const t = text.toLowerCase();
  const fakeList = language === 'urdu' ? fakeUr : fakeEn;
  const realList = language === 'urdu' ? realUr : realEn;

  const fakeScore = fakeList.reduce((acc, k) => acc + (t.includes(k.toLowerCase()) ? 1 : 0), 0);
  const realScore = realList.reduce((acc, k) => acc + (t.includes(k.toLowerCase()) ? 1 : 0), 0);

  const isFake = fakeScore >= realScore;
  const confidence = Math.min(95, 55 + Math.abs(fakeScore - realScore) * 10);

  return {
    prediction: isFake ? 'Fake News' : 'Real News',
    confidence,
    risk_level: isFake ? (confidence > 80 ? 'High' : 'Medium') : 'Low',
    explanation: 'Fallback predictor used because AI API was unavailable. Result is based on keyword patterns.'
  };
}
