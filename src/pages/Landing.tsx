import { motion, AnimatePresence } from 'motion/react';
import { Link, useOutletContext } from 'react-router-dom';
import { Check, Calendar, MapPin, ChevronRight, Anchor, Star, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

const PACKAGES = [
  {
    id: 'gold',
    name: 'Gold',
    price: { m: 1089, w: 989 },
    deposit: 300,
    featured: false,
    badge: 'Premium',
    includes: {
      IT: [
        '7 giorni Hotel 3/4 stelle', 'Colazione a buffet', 'Foam Party', 'Boat Party mattutino',
        'Boat Party al tramonto', 'White Party Gala Dinner', 'Tour guidato',
        'Assistenza Go Party Estanco', 'Assicurazione medico e bagaglio',
        'Zona Baia Verde / Lido San Giovanni'
      ],
      EN: [
        '7 days 3/4 star Hotel', 'Buffet Breakfast', 'Foam Party', 'Morning Boat Party',
        'Sunset Boat Party', 'White Party Gala Dinner', 'Guided Tour',
        'Go Party Estanco Assistance', 'Medical & luggage insurance',
        'Baia Verde / Lido San Giovanni Area'
      ]
    }
  },
  {
    id: 'medium',
    name: 'Medium',
    price: { m: 720, w: 620 },
    deposit: 200,
    featured: true,
    badge: 'Most Popular',
    includes: {
      IT: [
        'Appartamento condiviso', 'Consumi inclusi', 'Foam Party', 'Boat Party mattutino',
        'Boat Party al tramonto', 'White Party Gala Dinner', 'Tour guidato',
        'Assistenza Go Party Estanco', 'Assicurazione medico e bagaglio',
        'Zona Baia Verde / Lido San Giovanni'
      ],
      EN: [
        'Shared apartment', 'Utilities included', 'Foam Party', 'Morning Boat Party',
        'Sunset Boat Party', 'White Party Gala Dinner', 'Guided Tour',
        'Go Party Estanco Assistance', 'Medical & luggage insurance',
        'Baia Verde / Lido San Giovanni Area'
      ]
    }
  },
  {
    id: 'economy',
    name: 'Economy',
    price: { m: 600, w: 500 },
    deposit: 200,
    featured: false,
    badge: null,
    includes: {
      IT: [
        'Appartamento condiviso', 'Consumi inclusi', 'Foam Party', 'Boat Party mattutino',
        'Boat Party al tramonto', 'White Party Gala Dinner', 'Tour guidato',
        'Assistenza Go Party Estanco', 'Assicurazione medico e bagaglio',
        'Marina di Mancaversa (7 km da Baia Verde)'
      ],
      EN: [
        'Shared apartment', 'Utilities included', 'Foam Party', 'Morning Boat Party',
        'Sunset Boat Party', 'White Party Gala Dinner', 'Guided Tour',
        'Go Party Estanco Assistance', 'Medical & luggage insurance',
        'Marina di Mancaversa (7 km from Baia Verde)'
      ]
    }
  }
];

const FAQS = [
  {
    IT: { q: "Cosa comprende il pacchetto?", a: "I nostri pacchetti sono 'all-inclusive' per quanto riguarda gli eventi. Includono sempre l'alloggio, l'assistenza, l'assicurazione medica e l'accesso a tutti i principali party e tour (Foam Party, 2x Boat Party, White Party, Tour). Controlla i singoli pacchetti per i dettagli sull'alloggio (Hotel vs Appartamento)." },
    EN: { q: "What does the package include?", a: "Our packages are 'all-inclusive' regarding events. They always include accommodation, assistance, medical insurance, and access to all main parties and tours (Foam Party, 2x Boat Party, White Party, Tour). Check individual packages for accommodation details." }
  },
  {
    IT: { q: "L'assicurazione annullamento è obbligatoria?", a: "No, l'assicurazione medica/bagaglio base è inclusa, ma l'assicurazione annullamento è opzionale ed ha un costo di 100€ a persona. Consigliamo vivamente di aggiungerla in fase di prenotazione." },
    EN: { q: "Is cancellation insurance mandatory?", a: "No, basic medical/luggage insurance is included, but cancellation insurance is optional and costs 100€ per person. We highly recommend adding it during booking." }
  },
  {
    IT: { q: "Quando si paga il saldo?", a: "Al momento della prenotazione pagherai solamente l'acconto (200€ o 300€ a seconda del pacchetto). Il saldo dovrà essere versato entro e non oltre 30 giorni prima della partenza." },
    EN: { q: "When is the balance due?", a: "At the time of booking, you only pay the deposit (200€ or 300€ depending on the package). The balance must be paid no later than 30 days before departure." }
  },
  {
    IT: { q: "Posso prenotare per più persone?", a: "Sì, il nostro sistema ti permette di selezionare il numero di partecipanti (uomini e donne) nella stessa prenotazione, diventando il capogruppo." },
    EN: { q: "Can I book for multiple people?", a: "Yes, our system allows you to select the number of participants (men and women) in the same booking, making you the group leader." }
  },
  {
    IT: { q: "I pagamenti sono rimborsabili?", a: "Gli acconti non sono rimborsabili a meno che non sia stata acquistata l'assicurazione annullamento in fase di prenotazione. Per i dettagli completi, leggi i Termini e Condizioni." },
    EN: { q: "Are payments refundable?", a: "Deposits are non-refundable unless cancellation insurance was purchased at the time of booking. For full details, read our Terms and Conditions." }
  }
];

const T = {
  heroTitle: { IT: "Non sarà una semplice vacanza… sarà la settimana che ricorderai per tutta l'estate.", EN: "This won't be just another holiday… it will be the week you'll remember all summer long." },
  bookNow: { IT: 'PRENOTA ORA', EN: 'BOOK NOW' },
  days: { IT: 'Giorni', EN: 'Days' }, hours: { IT: 'Ore', EN: 'Hours' }, mins: { IT: 'Minuti', EN: 'Mins' }, secs: { IT: 'Secondi', EN: 'Secs' },
  packagesTitle: { IT: 'I Nostri Pacchetti', EN: 'Our Packages' },
  packagesSub: { IT: 'Seleziona il tuo preferito. I posti sono limitati.', EN: 'Select your favorite. Limited spots available.' },
  fromWomen: { IT: 'A partire da (Donna)', EN: 'Starting from (Women)' },
  fromMen: { IT: 'Prezzo Uomo:', EN: 'Men\'s price:' },
  depositReq: { IT: 'Acconto richiesto', EN: 'Required deposit' },
  selectBtn: { IT: 'SELEZIONA', EN: 'SELECT' },
  faqTitleSub: { IT: 'Domande Frequenti', EN: 'FAQ' },
  faqTitle: { IT: 'Tutto quello che devi sapere', EN: 'Everything you need to know' }
};

export default function Landing() {
  const { lang } = useOutletContext<{ lang: 'IT' | 'EN' }>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    // Target: August 22, 2026
    const targetDate = new Date('2026-08-22T00:00:00Z').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary-900">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary-500 via-primary-700 to-primary-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-64 h-64 bg-turquoise-300 rounded-full blur-3xl mix-blend-screen"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-sun-300 rounded-full blur-3xl mix-blend-screen"></div>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1544222045-8178a9463c62?q=80&w=2070&auto=format&fit=crop" 
            alt="Gallipoli sunset party" 
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-10 md:mt-0 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase mb-6 border border-white/20 text-white"
          >
            <span className="w-2 h-2 bg-sun-400 rounded-full"></span>
            Gallipoli, Salento, Italy
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans text-6xl md:text-8xl lg:text-9xl font-black text-white mb-4 uppercase tracking-tighter italic leading-none"
          >
            END OF<br/><span className="text-turquoise-300">SUMMER</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto flex flex-col items-center gap-4 mb-12"
          >
            <div className="text-2xl font-light text-primary-50">
              22 – 29 August 2026
            </div>
            <p className="text-xl md:text-2xl italic font-serif max-w-md text-primary-100 opacity-90 leading-relaxed mt-4">
              "{T.heroTitle[lang]}"
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <Link 
              to="/booking" 
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-sun-400 hover:bg-sun-500 text-primary-950 font-bold rounded-full text-lg transition-all shadow-lg shadow-sun-400/50 overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <span>{T.bookNow[lang]}</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Countdown */}
            <div className="mt-16 flex items-center justify-center gap-4 md:gap-8">
              {[
                { label: T.days[lang], value: timeLeft.days },
                { label: T.hours[lang], value: timeLeft.hours },
                { label: T.mins[lang], value: timeLeft.minutes },
                { label: T.secs[lang], value: timeLeft.seconds }
              ].map((time, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-950/40 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center mb-2 shadow-inner">
                    <span className="text-3xl md:text-4xl font-mono font-black text-white">{time.value.toString().padStart(2, '0')}</span>
                  </div>
                  <span className="text-[10px] md:text-xs uppercase tracking-widest text-primary-200 font-bold opacity-80">{time.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b border-gray-100 pb-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-sans font-black text-gray-900 tracking-tight">{T.packagesTitle[lang]}</h2>
              <p className="text-lg text-gray-500 mt-2 font-medium">{T.packagesSub[lang]}</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
              <span>Gallipoli 2026 // Experience</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PACKAGES.map((pkg, idx) => {
              const themeStyles = {
                economy: {
                  card: "bg-slate-50 border border-slate-200",
                  badge: "bg-slate-200 text-slate-700",
                  title: "text-slate-900",
                  priceText: "text-slate-500",
                  priceVal: "text-slate-900",
                  deposit: "text-slate-400",
                  depositVal: "text-slate-700",
                  listBorder: "border-slate-200/60",
                  check: "bg-slate-400",
                  text: "text-slate-700",
                  btn: "bg-transparent border-slate-300 text-slate-800 hover:border-slate-400 hover:bg-slate-100"
                },
                medium: {
                  card: "bg-primary-900 border border-primary-800 shadow-2xl scale-100 md:scale-105 z-10",
                  badge: "bg-turquoise-400 text-primary-950",
                  title: "text-white",
                  priceText: "text-primary-300",
                  priceVal: "text-white",
                  deposit: "text-primary-400",
                  depositVal: "text-primary-100",
                  listBorder: "border-primary-800/80",
                  check: "bg-turquoise-400",
                  text: "text-primary-100",
                  btn: "bg-turquoise-400 border-turquoise-400 text-primary-950 hover:bg-turquoise-500 hover:border-turquoise-500 shadow-lg shadow-turquoise-400/20"
                },
                gold: {
                  card: "bg-gradient-to-b from-sun-50 to-white border border-sun-200 shadow-lg",
                  badge: "bg-sun-400 text-sun-950",
                  title: "text-sun-900",
                  priceText: "text-sun-600/80",
                  priceVal: "text-sun-700",
                  deposit: "text-sun-500/80",
                  depositVal: "text-sun-800",
                  listBorder: "border-sun-200/60",
                  check: "bg-sun-400",
                  text: "text-sun-800",
                  btn: "bg-sun-400 border-sun-400 text-sun-950 hover:bg-sun-500 hover:border-sun-500 shadow-lg shadow-sun-400/20"
                }
              };
              const styles = themeStyles[pkg.id as keyof typeof themeStyles] || themeStyles.economy;

              return (
              <motion.div 
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative flex flex-col rounded-3xl p-8 ${styles.card}`}
              >
                {pkg.badge && (
                  <div className={`absolute -top-3 right-8 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${styles.badge}`}>
                    {pkg.badge}
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className={`text-2xl font-sans font-black mb-2 uppercase ${styles.title}`}>{pkg.name} PACKAGE</h3>
                  <div className="flex flex-col gap-1">
                    <p className={`text-xs font-bold ${styles.priceText}`}>{T.fromWomen[lang]}</p>
                    <div className="flex items-end gap-2">
                      <span className={`text-4xl font-sans font-black ${styles.priceVal}`}>€{pkg.price.w}</span>
                    </div>
                    <p className={`text-xs mt-2 font-medium ${styles.priceText}`}>{T.fromMen[lang]} €{pkg.price.m}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${styles.deposit}`}>{T.depositReq[lang]}</span>
                      <span className={`text-sm font-black ${styles.depositVal}`}>€{pkg.deposit}</span>
                    </div>
                  </div>
                </div>

                <div className={`flex-1 border-t pt-6 ${styles.listBorder}`}>
                  <ul className="space-y-4 mb-8">
                    {pkg.includes[lang].map((item, i) => (
                      <li key={i} className={`flex items-start gap-3 text-sm font-medium ${styles.text}`}>
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${styles.check}`}></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/booking"
                  className={`w-full py-4 text-center rounded-xl font-bold transition-all border-2 ${styles.btn}`}
                >
                  {T.selectBtn[lang]}
                </Link>
              </motion.div>
            )})}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">{T.faqTitleSub[lang]}</h3>
            <h2 className="text-4xl font-sans font-black text-gray-900 tracking-tight">{T.faqTitle[lang]}</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group cursor-pointer bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-primary-300 transition-colors"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
                    {faq[lang].q}
                  </h4>
                  <motion.div
                    animate={{ rotate: openFaq === idx ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 ml-4 text-gray-400 text-2xl font-light group-hover:text-primary-500"
                  >
                    +
                  </motion.div>
                </div>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 leading-relaxed font-medium mt-4 border-t border-gray-100 pt-4">
                        {faq[lang].a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
