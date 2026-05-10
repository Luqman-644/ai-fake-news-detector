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

  const isUrdu = language === 'urdu';
  
  return {
    prediction: isFake 
      ? (isUrdu ? 'جعلی خبر' : 'Fake News') 
      : (isUrdu ? 'حقیقی خبر' : 'Real News'),
    explanation: isUrdu 
      ? 'یہ تجزیہ کلیدی الفاظ کی بنیاد پر کیا گیا ہے (اے آئی عارضی طور پر دستیاب نہیں ہے)۔' 
      : 'Analysis based on keyword patterns (AI was temporarily unavailable).'
  };
}
