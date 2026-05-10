import { useState } from 'react';
import api from '../api/api';
import UploadBox from '../components/UploadBox';
import ResultCard from '../components/ResultCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Image as ImageIcon, Sparkles, FileText } from 'lucide-react';

export default function ImageDetection() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [language, setLanguage] = useState('auto');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setImage(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setError('');
  };

  const analyze = async () => {
    if (!image) return setError('Please upload a news image first.');
    setError('');
    setLoading('Extracting text using OCR...');
    
    const form = new FormData();
    form.append('image', image);
    form.append('language', language);

    try {
      const { data } = await api.post('/analyze-image', form);
      setLoading('Analyzing extracted text with Gemini AI...');
      setResult(data);
    } catch (e) {
      setError(e.response?.data?.error || 'Image analysis failed. Ensure the image contains readable text.');
    } finally {
      setLoading('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="card-warm p-8 md:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-full text-primary">
            <ImageIcon size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-bold font-serif text-ink-main">Image Detection</h2>
            <p className="text-ink-muted text-sm">Upload news clips or newspaper screenshots for AI analysis</p>
          </div>
        </div>

        <UploadBox onChange={onFile} />

        {preview && (
          <div className="mt-8 relative">
            <img 
              src={preview} 
              alt="Preview" 
              className="rounded-soft w-full max-h-[400px] object-contain border border-warm-gray shadow-soft" 
            />
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">

          <button
            onClick={analyze}
            disabled={!!loading}
            className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Sparkles size={18} />
            {loading ? 'Processing...' : 'Run Analysis'}
          </button>
        </div>

        {loading && (
          <div className="mt-10  py-12 bg-surface-alt rounded-soft border border-warm-gray flex flex-col items-center justify-center space-y-4">
            <LoadingSpinner text={loading} />
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-danger/10 border border-danger/20 rounded-soft text-danger text-center font-medium font-sans">
            {error}
          </div>
        )}

        {result?.extracted_text && (
          <div className="mt-10 space-y-4 animate-in slide-in-from-bottom-4">
            <div className="flex items-center gap-2 text-ink-muted text-sm font-bold font-sans uppercase tracking-widest px-2">
              <FileText size={16} />
              Extracted Text:
            </div>
            <div 
              dir={result.language === 'Urdu' ? 'rtl' : 'ltr'} 
              className="w-full max-h-48 overflow-y-auto bg-surface border border-warm-gray rounded-soft p-6 text-ink-main leading-relaxed font-serif"
            >
              "{result.extracted_text}"
            </div>
          </div>
        )}
      </div>

      <ResultCard result={result} />
    </div>
  );
}
