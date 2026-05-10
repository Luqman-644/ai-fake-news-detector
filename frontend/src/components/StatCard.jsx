export default function StatCard({ label, value, icon: Icon, colorClass }) {
  return (
    <div className='glass-card rounded-[1.5rem] p-6 relative overflow-hidden group'>
      <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${colorClass}`}>
        <Icon size={80} />
      </div>
      <div className='flex items-center gap-3 mb-3'>
        <div className={`p-2 rounded-xl bg-white/5 ${colorClass}`}>
          <Icon size={18} />
        </div>
        <p className='text-slate-400 text-xs font-bold uppercase tracking-widest'>{label}</p>
      </div>
      <p className={`text-4xl font-black ${colorClass || 'text-cyan-400'}`}>
        {value}
      </p>
    </div>
  );
}
