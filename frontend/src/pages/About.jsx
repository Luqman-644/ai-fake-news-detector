import { ShieldCheck, Cpu, Database, Layout } from 'lucide-react';

export default function About() {
  const tech = [
    { title: 'Intelligence', desc: 'Google Gemini 2.5 Flash for state-of-the-art multilingual news analysis.', icon: Cpu },
    { title: 'Vision', desc: 'Tesseract.js OCR engine for extracting text from images and newspaper clips.', icon: ShieldCheck },
    { title: 'Persistence', desc: 'SQLite database for secure, localized storage of analysis history and system stats.', icon: Database },
    { title: 'Interface', desc: 'React with Tailwind CSS and Framer Motion for a fluid, responsive UX.', icon: Layout }
  ];

  return (
    <div className='max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20'>
      <section className='glass rounded-[2.5rem] p-10 md:p-16 text-center space-y-6'>
        <h2 className='text-4xl md:text-5xl font-black tracking-tight'>About the <span className='text-gradient'>Project</span></h2>
        <p className='text-slate-400 text-lg leading-relaxed'>
          Our mission is to combat misinformation by providing an accessible, 
          high-intelligence credibility checker for multilingual news. 
          The system leverages advanced NLP and OCR to analyze content across 
          different mediums and languages.
        </p>
      </section>

      <div className='grid md:grid-cols-2 gap-6'>
        {tech.map((item) => (
          <div key={item.title} className='glass-card rounded-3xl p-8 flex items-start gap-5'>
            <div className='p-4 bg-cyan-500/10 rounded-2xl text-cyan-400'>
              <item.icon size={24} />
            </div>
            <div className='space-y-2'>
              <h3 className='text-xl font-bold'>{item.title}</h3>
              <p className='text-slate-400 text-sm leading-relaxed'>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <section className='glass rounded-[2rem] p-10'>
        <h3 className='text-2xl font-bold mb-6'>Future Roadmap</h3>
        <div className='space-y-4'>
          {[
            'Live Fact-Checking API integration for real-time news updates.',
            'Browser extension for instant verification of online articles.',
            'Fine-tuned regional models for better dialect detection.',
            'Blockchain-based source authenticity verification.'
          ].map((point, i) => (
            <div key={i} className='flex items-center gap-4 text-slate-300'>
              <div className='w-1.5 h-1.5 rounded-full bg-cyan-500' />
              <p>{point}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
