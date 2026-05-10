import { Link } from 'react-router-dom';
import {
  ScanText,
  Image as ImageIcon,
  ArrowRightToLine,
  Cpu,
  GitBranch,
  BadgeCheck,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden flex flex-col items-center pt-10 md:pt-16 pb-16 md:pb-20 px-4">
      {/* System Status Badge */}
      <div className="mb-6 md:mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-gray bg-surface-alt/50 text-[10px] font-sans font-bold uppercase tracking-widest text-text-muted">
        <div className="w-2 h-2 rounded-full bg-primary"></div>
        SYSTEM ONLINE
      </div>

      {/* Hero Section */}
      <section className="text-center max-w-3xl w-full mb-10 md:mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-serif text-ink-main mb-5 md:mb-6 tracking-tight leading-tight">
          High-Tech{' '}
          <span className="text-primary italic font-normal">Clarity</span>
        </h1>

        <p className="text-ink-muted text-sm sm:text-base md:text-lg mx-auto leading-relaxed max-w-2xl font-sans px-1">
          Filter the noise. Extract the verified truth. Input any URL, text
          snippet, or image payload to initiate deep architectural
          cross-referencing.
        </p>
      </section>

      {/* Hero Input Area */}
      <div className="w-full max-w-3xl mb-6 md:mb-8">
        <div className="relative flex items-center bg-surface-alt border border-warm-gray rounded-soft p-2 shadow-soft">
          <div className="pl-3 md:pl-4 text-ink-muted shrink-0">
            <ScanText size={20} />
          </div>

          <input
            type="text"
            placeholder="Paste URL, news text, or enter prompt..."
            className="w-full min-w-0 bg-transparent border-none outline-none py-3 px-3 md:px-4 text-sm md:text-base text-ink-main placeholder:text-ink-muted font-sans"
          />
        </div>
      </div>

      {/* Secondary CTAs */}
      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-20 md:mb-32">
        <Link
          to="/url"
          className="btn-primary py-3 px-5 flex items-center justify-center gap-2 text-sm w-full"
        >
          <ScanText size={16} />
          URL Analysis
        </Link>

        <Link
          to="/text"
          className="btn-secondary py-3 px-5 flex items-center justify-center gap-2 text-sm bg-surface shadow-soft w-full"
        >
          <ScanText size={18} />
          Text Analysis
        </Link>

        <Link
          to="/image"
          className="btn-secondary py-3 px-5 flex items-center justify-center gap-2 text-sm bg-surface shadow-soft w-full"
        >
          <ImageIcon size={18} />
          Vision Lab
        </Link>
      </div>

      <div className="w-full h-px bg-warm-gray/50 mb-20 md:mb-32"></div>

      {/* Protocol Section */}
      <section className="w-full max-w-6xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-ink-main mb-4">
          Verification Protocol
        </h2>

        <p className="text-ink-muted font-sans text-base md:text-lg mb-10 md:mb-16">
          A deterministic 4-step pipeline to isolate misinformation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 text-left">
          {[
            {
              step: '1',
              title: 'Submit',
              desc: 'Inject unstructured data payloads via text, URL, or image upload for parsing.',
              icon: ArrowRightToLine,
            },
            {
              step: '2',
              title: 'AI Analysis',
              desc: 'Deep contextual models analyze linguistic patterns and visual anomalies.',
              icon: Cpu,
            },
            {
              step: '3',
              title: 'Cross-Reference',
              desc: 'Data is verified against thousands of accredited global architectural nodes.',
              icon: GitBranch,
            },
            {
              step: '4',
              title: 'Result',
              desc: 'Receive a definitive verification status chip and detailed forensic breakdown.',
              icon: BadgeCheck,
              isHighlight: true,
            },
          ].map((item) => (
            <div
              key={item.step}
              className={`card-warm p-6 md:p-8 flex flex-col min-h-[240px] ${
                item.isHighlight ? 'border-l-4 border-l-primary' : ''
              }`}
            >
              <div
                className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-8 md:mb-12 ${
                  item.isHighlight
                    ? 'bg-primary text-white shadow-soft-lg'
                    : 'bg-surface-alt text-ink-muted'
                }`}
              >
                <item.icon size={20} strokeWidth={1.5} />
              </div>

              <h3
                className={`font-bold font-serif text-xl mb-3 ${
                  item.isHighlight ? 'text-primary' : 'text-ink-main'
                }`}
              >
                {item.step}. {item.title}
              </h3>

              <p className="text-ink-muted text-sm font-sans leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}