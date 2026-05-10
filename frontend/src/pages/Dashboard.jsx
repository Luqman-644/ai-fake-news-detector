import { useEffect, useState } from 'react';
import api from '../api/api';
import { Activity, Download, Circle } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [history, setHistory] = useState([]);
  const [geminiStatus, setGeminiStatus] = useState('checking');

  useEffect(() => {
    api.get('/stats').then((r) => setStats(r.data));
    api.get('/history').then((r) => setHistory(r.data));

    const checkStatus = () => {
      api.get('/gemini-status')
        .then((r) => setGeminiStatus(r.data.status))
        .catch(() => setGeminiStatus('error'));
    };

    checkStatus();
    const interval = setInterval(checkStatus, 15000); // Check every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const authenticityRatio = stats.total ? ((stats.real / stats.total) * 100).toFixed(1) : 0;
  const anomalousRatio = stats.total ? ((stats.fake / stats.total) * 100).toFixed(1) : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 animate-in fade-in duration-700">

      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-ink-main flex items-center gap-3">
          <Activity className="text-primary" size={32} />
          Dashboard
        </h2>
        <p className="text-ink-muted mt-2 font-sans">Real-time verification history and Gemini telemetrics.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Total Verifications */}
        <div className="card-warm p-8 flex flex-col justify-between">
          <h3 className="text-xs font-bold text-ink-muted tracking-widest uppercase mb-4">Total Verifications</h3>
          <div className="text-5xl font-serif text-ink-main font-bold mb-2">
            {stats.total?.toLocaleString() ?? 0}
          </div>
          <p className="text-xs text-primary font-bold tracking-widest">+ ACTIVE</p>
        </div>

        {/* Authenticity Ratio */}
        <div className="card-warm p-8">
          <h3 className="text-xs font-bold text-ink-muted tracking-widest uppercase mb-6 flex justify-between">
            <span>Authenticity Ratio</span>
            <Circle size={14} className="text-warm-gray" />
          </h3>
          <div className="flex justify-between text-xs font-bold tracking-widest uppercase mb-2">
            <span className="text-primary">Verified</span>
            <span className="text-tertiary">Anomalous</span>
          </div>
          <div className="flex justify-between font-serif text-2xl mb-4">
            <span>{authenticityRatio}%</span>
            <span>{anomalousRatio}%</span>
          </div>
          <div className="h-2 w-full bg-tertiary/20 rounded-full overflow-hidden flex">
            <div className="h-full bg-primary" style={{ width: `${authenticityRatio}%` }}></div>
            <div className="h-full bg-tertiary" style={{ width: `${anomalousRatio}%` }}></div>
          </div>
        </div>

        {/* Engine Telemetry */}
        <div className="card-warm p-8">
          <h3 className="text-xs font-bold text-ink-muted tracking-widest uppercase mb-6">Engine Telemetry</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-surface-alt px-4 py-3 rounded-soft text-sm font-sans">
              <div className="flex items-center gap-2 text-text-main">
                <div className={`w-2 h-2 rounded-full ${geminiStatus === 'optimal' ? 'bg-success' : geminiStatus === 'quota_exceeded' ? 'bg-tertiary' : 'bg-warm-gray'}`}></div>
                Google Gemini Quota
              </div>
              <span className={`${geminiStatus === 'optimal' ? 'text-success' : geminiStatus === 'quota_exceeded' ? 'text-tertiary' : 'text-ink-muted'} font-bold text-xs tracking-widest uppercase`}>
                {geminiStatus === 'optimal' ? 'OPTIMAL' : geminiStatus === 'quota_exceeded' ? 'EXCEEDED' : geminiStatus.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between items-center bg-surface-alt px-4 py-3 rounded-soft text-sm font-sans">
              <div className="flex items-center gap-2 text-text-main">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                Vision Processing
              </div>
              <span className="text-primary font-bold text-xs tracking-widest uppercase">READY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Intercept Log */}
      <div className="card-warm overflow-hidden mt-6">
        <div className="px-8 py-6 flex justify-between items-center border-b border-warm-gray bg-surface-alt/50">
          <h3 className="text-xs font-bold text-ink-muted tracking-widest uppercase">Live Verification Logs</h3>

        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead>
              <tr className="text-ink-muted text-xs font-bold uppercase tracking-widest border-b border-warm-gray">
                <th className="py-4 px-8">Timestamp</th>
                <th className="py-4 px-8">Source Origin</th>
                <th className="py-4 px-8">Language</th>
                <th className="py-4 px-8 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((r) => {
                const isFake = r.prediction === 'Fake News' || r.prediction === 'جعلی خبر';
                return (
                  <tr key={r.id} className="border-b border-warm-gray/50 hover:bg-surface-alt transition-colors">
                    <td className="py-4 px-8 text-ink-muted font-mono text-xs">
                      {new Date(r.created_at).toLocaleString()}
                    </td>
                    <td className="py-4 px-8 text-ink-main">
                      {r.input_type} Analysis
                    </td>
                    <td className="py-4 px-8">
                      <span className="bg-surface-alt border border-warm-gray px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-ink-muted">
                        {r.language}
                      </span>
                    </td>
                    <td className="py-4 px-8 text-right flex justify-end">
                      <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${isFake ? 'bg-tertiary/10 text-tertiary border-tertiary/20' : 'bg-primary/10 text-primary border-primary/20'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${isFake ? 'bg-tertiary' : 'bg-primary'}`}></div>
                        {isFake ? 'Misinfo' : 'Verified'}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {history.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-ink-muted italic font-serif">
                    No recent interceptions recorded.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
