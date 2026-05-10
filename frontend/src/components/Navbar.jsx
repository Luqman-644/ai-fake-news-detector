import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  { to: '/', label: 'HOME' },
  { to: '/url', label: 'LINK ANALYSIS' },
  { to: '/text', label: 'TEXT ANALYSIS' },
  { to: '/image', label: 'VISION LAB' },
  { to: '/dashboard', label: 'DASHBOARD' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full px-6 md:px-8 py-5 border-b border-warm-gray bg-background relative z-50">
      <div className="flex justify-between items-center">
        <NavLink to="/">
          <h1 className="text-primary font-bold font-serif text-2xl tracking-widest">
            LENS
          </h1>
        </NavLink>

        <div className="hidden md:flex gap-8 text-xs font-sans tracking-widest text-ink-muted font-bold uppercase">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `pb-2 border-b-2 transition-all duration-300 hover:text-primary hover:border-primary ${
                  isActive ? 'text-primary border-primary' : 'border-transparent'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <NavLink to="/url" className="btn-primary py-2 px-5 text-sm">
            VERIFY NOW
          </NavLink>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-primary p-2 rounded-lg hover:bg-primary/10 transition-all duration-300"
            aria-label="Toggle menu"
          >
            <span className="block transition-transform duration-300">
              {open ? <X size={24} /> : <Menu size={24} />}
            </span>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-full right-4 mt-3 w-[260px] rounded-2xl border border-warm-gray bg-background shadow-2xl shadow-black/20 p-5 z-50
        transition-all duration-300 ease-out origin-top-right
        ${
          open
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 -translate-y-3 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-1 text-xs font-sans tracking-widest text-ink-muted font-bold uppercase">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl transition-all duration-300 hover:text-primary hover:bg-primary/10 ${
                  isActive ? 'text-primary bg-primary/10' : ''
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}