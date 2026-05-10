export default function Footer() {
    return (
        <footer className='mt-20 py-10 border-t border-white/5'>
            <div className='max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6'>
                <div className='flex items-center gap-2'>
                    <h1 className='text-primary font-bold font-serif text-2xl tracking-widest'>
                        LENS
                    </h1>
                </div>

                <p className='text-slate-500 text-xs font-medium'>
                    © {new Date().getFullYear()} AI-Powered Multilingual News Verification System. All rights reserved.
                </p>

                <div className='flex gap-8 text-xs font-bold text-slate-400 uppercase tracking-tighter'>
                    <span className='hover:text-cyan-400 cursor-pointer transition-colors'>Privacy</span>
                    <span className='hover:text-cyan-400 cursor-pointer transition-colors'>Terms</span>
                    <span className='hover:text-cyan-400 cursor-pointer transition-colors'>Docs</span>
                </div>
            </div>
        </footer>
    );
}
