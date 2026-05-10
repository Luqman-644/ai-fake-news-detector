import { useState } from 'react';
import api from '../api/api';
import ResultCard from '../components/ResultCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Send, Languages } from 'lucide-react';

export default function TextDetection() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('auto');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const analyze = async () => {
    if (!text.trim()) return setError('Please enter some text to analyze.');
    setError('');
    setLoading(true);
    setResult(null);
    try {
      const { data } = await api.post('/analyze-text', { text, language });
      setResult(data);
    } catch (e) {
      setError(e.response?.data?.error || 'Analysis failed. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-ink-main mb-2">Text Analysis Workspace</h2>
        <p className="text-ink-muted text-base">Paste long-form articles, news reports, or social media text below for comprehensive authenticity verification and source cross-referencing.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Input */}
        <div className="lg:col-span-2 bg-surface-alt rounded-soft p-6 shadow-soft relative flex flex-col border border-warm-gray">
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold tracking-widest text-ink-main font-sans uppercase">Source Text</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-sans text-ink-muted">Auto-Detect Language</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-surface text-xs border border-warm-gray px-2 py-1 rounded outline-none text-ink-main font-sans cursor-pointer"
              >
                <option value="auto">Auto</option>
                <option value="english">EN</option>
                <option value="urdu">UR</option>
              </select>
            </div>
          </div>

          <textarea
            dir={language === 'urdu' ? 'rtl' : 'ltr'}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-80 bg-surface border border-warm-gray rounded-soft p-6 text-base leading-relaxed outline-none resize-none focus:border-primary font-sans text-ink-main placeholder:text-ink-muted mb-6"
            placeholder={language === 'urdu' ? 'یہاں خبر کا متن چسپاں کریں...' : 'Paste news content or article text here...'}
          />

          <div className="flex justify-end">
            <button
              onClick={analyze}
              disabled={loading}
              className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send size={16} />
              {loading ? 'Analyzing...' : 'Verify Content'}
            </button>
          </div>
        </div>

        {/* Right Column: Result */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {loading && (
            <div className="py-10 card-warm flex flex-col items-center justify-center animate-pulse">
              <LoadingSpinner text="Analyzing..." />
            </div>
          )}

          {error && (
            <div className="p-4 bg-tertiary/5 border border-tertiary/20 rounded-soft text-tertiary text-center font-medium shadow-soft">
              {error}
            </div>
          )}

          <ResultCard result={result} />
        </div>
      </div>
    </div>
  );
}
