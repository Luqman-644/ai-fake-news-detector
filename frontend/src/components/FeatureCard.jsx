import { motion } from 'framer-motion';
export default function FeatureCard({title,desc,icon:Icon}){return <motion.div whileHover={{y:-6}} className='glass rounded-2xl p-5 shadow-2xl'><Icon className='text-cyan-400 mb-2'/><h3 className='font-semibold'>{title}</h3><p className='text-sm text-slate-300'>{desc}</p></motion.div>}
