import { NavLink } from 'react-router-dom';
const links=[['/','Home'],['/text','Text Check'],['/image','Image Check'],['/dashboard','Dashboard'],['/about','About']];
export default function Navbar(){return <nav className='sticky top-0 z-50 glass px-6 py-4 flex justify-between items-center'><h1 className='text-cyan-400 font-bold'>AI Fake News Detector</h1><div className='flex gap-4 text-sm'>{links.map(([to,l])=><NavLink key={to} to={to} className='hover:text-cyan-300'>{l}</NavLink>)}</div></nav>}
