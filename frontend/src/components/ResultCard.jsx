import { AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react';

export default function ResultCard({ result }) {
  if (!result) return null;

  const isUrdu = result.language === 'Urdu';
  
  const isNotNews = result.prediction === 'Not News' || result.prediction === 'خبر نہیں ہے';
  const isFake = result.prediction === 'Fake News' || result.prediction === 'جعلی خبر';
  const isReal = result.prediction === 'Real News' || result.prediction === 'حقیقی خبر';

  let predictionLabel = result.prediction;
  let Icon = CheckCircle2;
  let iconColor = 'text-primary';
  let badgeBg = 'bg-primary/10';

  if (isNotNews) {
    predictionLabel = isUrdu ? 'خبر نہیں ہے' : 'NOT NEWS';
    Icon = HelpCircle;
    iconColor = 'text-ink-muted';
    badgeBg = 'bg-surface-alt';
  } else if (isFake) {
    predictionLabel = isUrdu ? 'جعلی خبر' : 'DISPUTED REPORT';
    Icon = AlertTriangle;
    iconColor = 'text-danger';
    badgeBg = 'bg-danger/10';
  } else if (isReal) {
    predictionLabel = isUrdu ? 'حقیقی خبر' : 'AUTHENTIC REPORT';
    Icon = CheckCircle2;
    iconColor = 'text-success';
    badgeBg = 'bg-success/10';
  }

  const langLabel = isUrdu ? 'زبان: اردو' : `Auto-Detect Language: ${result.language}`;

  return (
    <div
      dir={isUrdu ? 'rtl' : 'ltr'}
      className="card-warm p-8 mt-6 transition-all duration-500 animate-in zoom-in-95 flex flex-col items-center text-center bg-surface-alt"
    >
      <div className={`p-4 rounded-full ${badgeBg} mb-6`}>
        <Icon className={iconColor} size={32} strokeWidth={1.5} />
      </div>
      
      <h3 className={`font-bold font-serif text-xl md:text-2xl tracking-widest uppercase mb-4 ${iconColor}`}>
        • {predictionLabel}
      </h3>
      
      <p className='text-ink-main leading-relaxed text-sm md:text-base max-w-lg mb-6'>
        {result.explanation}
      </p>

      <div className="w-full h-px bg-warm-gray mb-6"></div>

      <div className="flex flex-col sm:flex-row items-center justify-between w-full text-xs font-sans text-ink-muted uppercase tracking-widest">
        <span>{langLabel}</span>
        <span>{result.timestamp}</span>
      </div>
    </div>
  );
}
