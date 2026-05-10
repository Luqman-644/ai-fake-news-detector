import { useState } from 'react';
import api from '../api/api';
import ResultCard from '../components/ResultCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link2, Send, Trash2, Globe } from 'lucide-react';

export default function URLDetection() {
  const [url, setUrl] = useState('');
  const [language, setLanguage] = useState('auto');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const analyze = async () => {
    if (!url.trim()) return setError('Please enter a valid news URL.');
    if (!url.startsWith('http')) return setError('Please enter a full URL starting with http:// or https://');

    setError('');
    setLoading(true);
    setResult(null);
    try {
      const { data } = await api.post('/analyze-url', { url, language });
      setResult(data);
    } catch (e) {
      setError(e.response?.data?.error || 'URL analysis failed. The website may be blocking our access.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="card-warm p-6 md:p-8 lg:p-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-primary/10 rounded-soft text-primary border border-primary/20">
            <Link2 size={24} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-ink-main">Link Analysis Workspace</h2>
            <p className="text-ink-muted font-sans text-sm mt-1">Cross-reference source URLs against global intelligence protocols.</p>
          </div>
        </div>

        <div className="relative group mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ink-muted group-focus-within:text-primary transition-colors">
            <Globe size={20} />
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input-warm pl-12"
            placeholder="https://example-news-site.com/article-url"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
          <button
            onClick={() => { setUrl(''); setResult(null); setError(''); }}
            className="w-full sm:w-auto btn-secondary flex items-center justify-center gap-2"
          >
            <Trash2 size={18} />
            Clear
          </button>
          <button
            onClick={analyze}
            disabled={loading}
            className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
            {loading ? 'Fetching...' : 'Verify Link'}
          </button>
        </div>

        {loading && (
          <div className="mt-8 py-10 rounded-soft bg-surface-alt border border-warm-gray flex flex-col items-center justify-center">
            <LoadingSpinner text="Fetching and analyzing web content..." />
          </div>
        )}

        {error && (
          <div className="mt-8 p-4 bg-tertiary/5 border border-tertiary/20 rounded-soft text-tertiary text-center font-medium shadow-soft">
            {error}
          </div>
        )}
      </div>

      <ResultCard result={result} />
    </div>
  );
}
