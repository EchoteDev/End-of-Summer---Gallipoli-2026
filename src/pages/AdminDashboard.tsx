import { Users, TrendingUp, Calendar as CalendarIcon, Ticket, Search, Filter, CheckCircle2 } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const MOCK_CLIENTS = [
  { id: 'EOS2026-1048', name: 'Mario Rossi', email: 'mario.rossi@example.com', package: 'Gold', pax: 2, status: { IT: 'Confermato', EN: 'Confirmed' }, date: '12 Giu 2026', total: 2078 },
  { id: 'EOS2026-1049', name: 'Anna Bianchi', email: 'anna.b@example.com', package: 'Medium', pax: 4, status: { IT: 'Acconto', EN: 'Deposit' }, date: '11 Giu 2026', total: 2680 },
  { id: 'EOS2026-1050', name: 'John Smith', email: 'john@example.com', package: 'Economy', pax: 1, status: { IT: 'In attesa', EN: 'Pending' }, date: '10 Giu 2026', total: 600 },
  { id: 'EOS2026-1051', name: 'Laura Verdi', email: 'laura.v@example.com', package: 'Gold', pax: 3, status: { IT: 'Confermato', EN: 'Confirmed' }, date: '10 Giu 2026', total: 3167 },
  { id: 'EOS2026-1052', name: 'Marco Neri', email: 'm.neri@example.com', package: 'Medium', pax: 2, status: { IT: 'Acconto', EN: 'Deposit' }, date: '08 Giu 2026', total: 1440 },
];

const T = {
  nav: {
    dashboard: { IT: 'Dashboard Overview', EN: 'Dashboard Overview' },
    bookings: { IT: 'Prenotazioni', EN: 'Bookings' },
    clients: { IT: 'Clienti', EN: 'Clients' },
    payments: { IT: 'Pagamenti', EN: 'Payments' },
    settings: { IT: 'Impostazioni', EN: 'Settings' }
  },
  stats: {
    totalBookings: { IT: 'Booking Totali', EN: 'Total Bookings' },
    targetRev: { IT: 'Entrate Target', EN: 'Target Revenue' },
    totalPax: { IT: 'Pax Totali', EN: 'Total Pax' },
    spots: { IT: 'Posti Disponibili', EN: 'Available Spots' }
  },
  latestTitle: { IT: 'Ultime Prenotazioni', EN: 'Latest Bookings' },
  searchPh: { IT: 'Cerca...', EN: 'Search...' },
  th: {
    code: { IT: 'Codice / Cliente', EN: 'Code / Client' },
    pkg: { IT: 'Pacchetto', EN: 'Package' },
    status: { IT: 'Stato', EN: 'Status' },
    total: { IT: 'Totale Euro', EN: 'Total Euro' }
  },
  seeAll: { IT: 'Vedi tutte (68)', EN: 'See all (68)' },
  pkgDist: { IT: 'Distribuzione Pacchetti', EN: 'Package Distribution' },
  bookingsShort: { IT: 'prenot.', EN: 'bookings' },
  targetSub: { IT: 'Mancano solo ', EN: 'Only ' },
  targetSubEnd: { IT: " prenotazioni per raggiungere la capienza massima dell'hotel Gold.", EN: ' bookings left to reach maximum capacity for the Gold hotel.' },
  launchPromo: { IT: 'Lancia Promo', EN: 'Launch Promo' }
};

export default function AdminDashboard() {
  const { lang } = useOutletContext<{ lang: 'IT' | 'EN' }>();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      
      {/* Sidebar Admin */}
      <aside className="w-full md:w-64 bg-gray-900 text-white shrink-0 border-r border-gray-800">
        <div className="p-6 border-b border-gray-800 text-center flex items-center justify-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">E</div>
          <h2 className="font-sans font-black text-xl tracking-tight text-white italic">ADMIN</h2>
        </div>
        <nav className="p-4 space-y-2">
          {[T.nav.dashboard, T.nav.bookings, T.nav.clients, T.nav.payments, T.nav.settings].map((item, idx) => (
            <a key={idx} href="#" className={`block px-4 py-3 rounded-xl text-sm font-bold transition-colors ${idx === 0 ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
              {item[lang]}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl font-display font-bold text-primary-900">{T.nav.dashboard[lang]}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <CalendarIcon className="w-4 h-4" />
            <span>Gallipoli 22-29 {lang === 'IT' ? 'Agosto' : 'August'} 2026</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: T.stats.totalBookings[lang], value: '68', icon: Ticket, border: 'border-blue-100', text: 'text-gray-900' },
            { label: T.stats.targetRev[lang], value: '€ 24.800', icon: TrendingUp, border: 'border-sun-200', text: 'text-sun-600' },
            { label: T.stats.totalPax[lang], value: '215', icon: Users, border: 'border-purple-100', text: 'text-gray-900' },
            { label: T.stats.spots[lang], value: '85', icon: CheckCircle2, border: 'border-turquoise-200', text: 'text-turquoise-600' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-2 text-wrap">{stat.label}</div>
                <p className={`text-3xl font-sans font-black ${stat.text}`}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Table */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-primary-900">{T.latestTitle[lang]}</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder={T.searchPh[lang]} className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full" />
                </div>
                <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500">
                <thead className="bg-gray-50 text-xs text-gray-400 uppercase">
                  <tr>
                    <th className="px-6 py-4 font-medium">{T.th.code[lang]}</th>
                    <th className="px-6 py-4 font-medium">{T.th.pkg[lang]}</th>
                    <th className="px-6 py-4 font-medium">{T.th.status[lang]}</th>
                    <th className="px-6 py-4 font-medium text-right">{T.th.total[lang]}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {MOCK_CLIENTS.map((client, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-primary-900">{client.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{client.id} • {client.pax} pax</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase ${
                          client.package === 'Gold' ? 'bg-sun-100 text-sun-700' : 
                          client.package === 'Medium' ? 'bg-turquoise-50 text-turquoise-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {client.package}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-2 h-2 rounded-full ${
                            client.status.IT === 'Confermato' ? 'bg-green-500' : 
                            client.status.IT === 'Acconto' ? 'bg-blue-500' : 'bg-orange-500'
                          }`}></div>
                          <span className="font-medium text-gray-700">{client.status[lang]}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-gray-900">
                        €{client.total.toLocaleString('it-IT')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-100 text-center">
              <a href="#" className="text-sm font-bold text-primary-500 hover:text-primary-600">{T.seeAll[lang]}</a>
            </div>
          </div>

          {/* Quick Stats Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-primary-900 mb-6">{T.pkgDist[lang]}</h2>
              <div className="space-y-5">
                {[
                  { name: 'Gold', count: 18, color: 'bg-sun-400', percentage: 26 },
                  { name: 'Medium', count: 27, color: 'bg-turquoise-500', percentage: 40 },
                  { name: 'Economy', count: 23, color: 'bg-gray-400', percentage: 34 },
                ].map((pkg, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-700">{pkg.name}</span>
                      <span className="font-bold text-primary-900">{pkg.count} {T.bookingsShort[lang]}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${pkg.color} rounded-full`} style={{ width: `${pkg.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-6 text-white shadow-xl border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-turquoise-400 rounded-full"></span>
                <h3 className="font-sans font-black text-lg uppercase tracking-tight">Target Sold Out</h3>
              </div>
              <p className="text-gray-400 text-sm mb-6 font-medium">{T.targetSub[lang]}<strong className="text-white">32</strong>{T.targetSubEnd[lang]}</p>
              <div className="flex justify-end">
                <button className="px-6 py-2 bg-primary-600 text-white font-bold rounded-lg text-sm shadow-md transition-colors hover:bg-primary-500">
                  {T.launchPromo[lang]}
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
