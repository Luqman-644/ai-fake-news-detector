import { motion } from 'framer-motion';

export default function FeatureCard({ title, desc, icon: Icon, className }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={className || 'glass-card rounded-3xl p-6'}
    >
      <div className='w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-4'>
        <Icon className='text-cyan-400' size={24} />
      </div>
      <h3 className='text-xl font-bold mb-2'>{title}</h3>
      <p className='text-slate-400 text-sm leading-relaxed'>{desc}</p>
    </motion.div>
  );
}
