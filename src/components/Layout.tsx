import { Link, Outlet, useLocation } from 'react-router-dom';
import { Palmtree, User, ShieldCheck, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const T = {
  home: { IT: 'Home', EN: 'Home' },
  booking: { IT: 'Booking', EN: 'Booking' },
  customer: { IT: 'Area Cliente', EN: 'Customer Area' },
  bookNow: { IT: 'PRENOTA ORA', EN: 'BOOK NOW' },
  footerDesc: {
    IT: "Gallipoli 2026. Non sarà una semplice vacanza… sarà la settimana che ricorderai per tutta l'estate.",
    EN: "Gallipoli 2026. This won't be just another holiday… it will be the week you'll remember all summer long."
  },
  demoInfo: { IT: 'Demo Info', EN: 'Demo Info' },
  admin: { IT: 'Dashboard Admin', EN: 'Admin Dashboard' },
  demoDisc: { IT: '* Applicazione a scopo dimostrativo', EN: '* Application for demonstration purposes' },
  terms: { IT: 'Termini & Condizioni', EN: 'Terms & Conditions' },
  privacy: { IT: 'Privacy Policy', EN: 'Privacy Policy' },
  menu: { IT: 'Menu', EN: 'Menu' }
};

export default function Layout() {
  const location = useLocation();
  const [lang, setLang] = useState<'IT' | 'EN'>('IT');

  const toggleLang = () => {
    setLang(lang === 'IT' ? 'EN' : 'IT');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-sm">
                <Palmtree className="w-6 h-6" />
              </div>
              <span className="font-sans font-extrabold tracking-tight text-xl text-primary-900 italic hidden sm:block">
                END OF SUMMER <span className="text-turquoise-500">2026</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8 h-full">
              <Link to="/" className={`text-sm font-bold uppercase tracking-wide h-full flex items-center border-b-2 transition-colors ${location.pathname === '/' ? 'text-primary-600 border-primary-600' : 'text-gray-500 border-transparent hover:text-primary-600'}`}>{T.home[lang]}</Link>
              <Link to="/booking" className={`text-sm font-bold uppercase tracking-wide h-full flex items-center border-b-2 transition-colors ${location.pathname === '/booking' ? 'text-primary-600 border-primary-600' : 'text-gray-500 border-transparent hover:text-primary-600'}`}>{T.booking[lang]}</Link>
              <Link to="/customer" className={`text-sm font-bold uppercase tracking-wide h-full flex items-center border-b-2 transition-colors ${location.pathname === '/customer' ? 'text-primary-600 border-primary-600' : 'text-gray-500 border-transparent hover:text-primary-600'}`}>{T.customer[lang]}</Link>
            </nav>

            <div className="flex items-center gap-4">
              <button 
                onClick={toggleLang}
                className="flex items-center gap-1.5 p-2 text-gray-500 hover:text-primary-600 transition-colors font-bold text-sm tracking-widest border border-transparent hover:border-gray-200 rounded-lg bg-gray-50 hover:bg-white"
                title="Cambia Lingua"
              >
                <Globe className="w-4 h-4" />
                <span>{lang}</span>
              </button>
              <Link to="/admin" className="p-2 text-gray-400 hover:text-primary-600 transition-colors" title="Admin Demo">
                <ShieldCheck className="w-5 h-5" />
              </Link>
              <Link to="/booking" className="hidden sm:flex items-center gap-2 bg-sun-400 hover:bg-sun-500 text-primary-950 px-6 py-2 rounded-full font-bold text-sm shadow-lg shadow-sun-400/30 transition-all">
                <span>{T.bookNow[lang]}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full relative">
        <Outlet context={{ lang }} />
      </main>

      <footer className="bg-primary-900 text-white py-12 border-t border-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-turquoise-400">
                  <Palmtree className="w-5 h-5" />
                </div>
                <span className="font-display font-bold text-xl">END OF SUMMER</span>
              </div>
              <p className="text-primary-500 max-w-sm">
                {T.footerDesc[lang]}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">{T.menu[lang]}</h4>
              <ul className="space-y-2 text-sm text-primary-500">
                <li><Link to="/" className="hover:text-turquoise-400 transition-colors">{T.home[lang]}</Link></li>
                <li><Link to="/booking" className="hover:text-turquoise-400 transition-colors">{T.bookNow[lang]}</Link></li>
                <li><Link to="/customer" className="hover:text-turquoise-400 transition-colors">{T.customer[lang]}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">{T.demoInfo[lang]}</h4>
              <ul className="space-y-2 text-sm text-primary-500">
                <li><Link to="/admin" className="hover:text-turquoise-400 transition-colors">{T.admin[lang]}</Link></li>
                <li>{T.demoDisc[lang]}</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-500">
            <p>© 2026 End of Summer. All rights reserved.</p>
            <div className="flex gap-4">
              <span>{T.terms[lang]}</span>
              <span>{T.privacy[lang]}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
