import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Link, useOutletContext } from 'react-router-dom';

const PACKAGES = {
  gold: { name: 'Gold', priceUomo: 1089, priceDonna: 989, acconto: 300 },
  medium: { name: 'Medium', priceUomo: 720, priceDonna: 620, acconto: 200 },
  economy: { name: 'Economy', priceUomo: 600, priceDonna: 500, acconto: 200 }
};

const T = {
  steps: {
    pkg: { IT: 'Pacchetto', EN: 'Package' },
    data: { IT: 'Dati Personali', EN: 'Personal Data' },
    summary: { IT: 'Riepilogo', EN: 'Summary' }
  },
  s1: {
    title: { IT: 'Scegli il tuo pacchetto', EN: 'Choose your package' },
    p1: { IT: '1. Pacchetto', EN: '1. Package' },
    from: { IT: 'Da', EN: 'From' },
    p2: { IT: '2. Genere', EN: '2. Gender' },
    man: { IT: 'uomo', EN: 'man' },
    woman: { IT: 'donna', EN: 'woman' },
    p3: { IT: '3. Numero Partecipanti', EN: '3. Number of Participants' },
    person: { IT: 'Persona', EN: 'Person' },
    people: { IT: 'Persone', EN: 'People' },
    insTitle: { IT: 'Assicurazione Annullamento', EN: 'Cancellation Insurance' },
    insDesc: { IT: 'Aggiungi 100€ a persona per garantirti il rimborso in caso di imprevisti prima della partenza.', EN: 'Add 100€ per person to guarantee a refund in case of unforeseen events before departure.' },
    continue: { IT: 'Continua', EN: 'Continue' }
  },
  s2: {
    title: { IT: 'Dati Capogruppo', EN: 'Group Leader Details' },
    desc: { IT: 'Inserisci i dati della persona che gestirà la prenotazione.', EN: 'Enter the details of the person managing the reservation.' },
    email: { IT: 'Email', EN: 'Email' },
    name: { IT: 'Nome', EN: 'Name' },
    surname: { IT: 'Cognome', EN: 'Surname' },
    dob: { IT: 'Data di nascita', EN: 'Date of birth' },
    phone: { IT: 'Telefono', EN: 'Phone' },
    address: { IT: 'Indirizzo di residenza', EN: 'Home address' },
    doc: { IT: 'C.F. o Numero Documento', EN: 'Tax Code or ID Number' },
    underage: { IT: 'Minorenne alla partenza?', EN: 'Underage at departure?' },
    no: { IT: 'No', EN: 'No' },
    yes: { IT: 'Sì (Richiede manleva)', EN: 'Yes (Requires waiver)' },
    back: { IT: 'Indietro', EN: 'Back' }
  },
  s3: {
    title: { IT: 'Riepilogo Prenotazione', EN: 'Booking Summary' },
    desc: { IT: "Controlla i dettagli prima di procedere al pagamento dell'acconto.", EN: "Check the details before proceeding to pay the deposit." },
    pkgPre: { IT: 'Pacchetto', EN: 'Package' },
    paxLabel: { IT: 'Partecipant', EN: 'Participant' },
    paxSingIT: 'e', paxPlurIT: 'i', paxSingEN: '', paxPlurEN: 's',
    edit: { IT: 'Modifica', EN: 'Edit' },
    basePrice: { IT: 'Prezzo Base', EN: 'Base Price' },
    insSub: { IT: 'Assicurazione Annullamento', EN: 'Cancellation Insurance' },
    total: { IT: 'Totale Pratica', EN: 'Total Booking' },
    balance: { IT: 'Saldo (da pagare entro 30gg dalla partenza)', EN: 'Balance (due within 30 days of departure)' },
    payNow: { IT: 'Da pagare ora', EN: 'Pay now' },
    paySub: { IT: 'Acconto per bloccare il posto', EN: 'Deposit to secure the spot' },
    confirmBtn: { IT: 'Conferma e Paga', EN: 'Confirm and Pay' }
  },
  s4: {
    title: { IT: 'Booking Confermata!', EN: 'Booking Confirmed!' },
    desc: { IT: "Grazie per aver scelto End of Summer. Abbiamo inviato un'email con il riepilogo e i passaggi successivi.", EN: "Thank you for choosing End of Summer. We've sent an email with the summary and next steps." },
    code: { IT: 'Codice Prenotazione', EN: 'Booking Code' },
    goArea: { IT: "Vai all'Area Cliente", EN: "Go to Customer Area" }
  }
};

export default function BookingWizard() {
  const { lang } = useOutletContext<{ lang: 'IT' | 'EN' }>();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    package: 'medium',
    gender: 'donna',
    participants: 1,
    insurance: false,
    email: '',
    nome: '',
    cognome: '',
    dob: '',
    indirizzo: '',
    documento: '',
    telefono: '',
    minorenne: 'no'
  });

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const calculateTotal = () => {
    const pkg = PACKAGES[formData.package as keyof typeof PACKAGES];
    const basePrice = formData.gender === 'uomo' ? pkg.priceUomo : pkg.priceDonna;
    const totalBase = basePrice * formData.participants;
    const insuranceCost = formData.insurance ? 100 * formData.participants : 0;
    const totale = totalBase + insuranceCost;
    const accontoTotale = pkg.acconto * formData.participants + insuranceCost;
    return {
      totale,
      accontoTotale,
      saldo: totale - accontoTotale
    };
  };

  const { totale, accontoTotale, saldo } = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Bar */}
        {step < 4 && (
          <div className="mb-12">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full z-0"></div>
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary-500 rounded-full z-0 transition-all duration-500"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              ></div>
              
              {[1, 2, 3].map((num) => (
                <div 
                  key={num} 
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-500 ${
                    step >= num ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30' : 'bg-white text-gray-400 border-2 border-gray-200'
                  }`}
                >
                  {step > num ? <CheckCircle2 className="w-5 h-5" /> : num}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-400 px-2 uppercase tracking-widest">
              <span className={step >= 1 ? 'text-primary-950' : ''}>{T.steps.pkg[lang]}</span>
              <span className={step >= 2 ? 'text-primary-950' : ''}>{T.steps.data[lang]}</span>
              <span className={step >= 3 ? 'text-primary-950' : ''}>{T.steps.summary[lang]}</span>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: PACCHETTO */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 md:p-12"
              >
                <h2 className="text-4xl font-sans font-black text-gray-900 mb-8 tracking-tight">{T.s1.title[lang]}</h2>
                
                <div className="space-y-8">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-3 block">{T.s1.p1[lang]}</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(PACKAGES).map(([key, pkg]) => (
                        <div 
                          key={key}
                          onClick={() => setFormData({...formData, package: key})}
                          className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${
                            formData.package === key 
                              ? 'border-primary-600 bg-primary-50 shadow-md' 
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className={`font-black uppercase tracking-tight text-lg mb-1 ${formData.package === key ? 'text-primary-900' : 'text-gray-900'}`}>{pkg.name}</div>
                          <div className="text-sm font-bold text-gray-500">{T.s1.from[lang]} €{pkg.priceDonna}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-3 block">{T.s1.p2[lang]}</label>
                      <div className="flex rounded-xl p-1 bg-gray-100/80 border border-gray-200">
                        {['uomo', 'donna'].map((gender) => (
                          <button
                            key={gender}
                            onClick={() => setFormData({...formData, gender})}
                            className={`capitalize flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                              formData.gender === gender ? 'bg-white text-primary-900 shadow-sm border border-gray-200' : 'text-gray-400 hover:text-gray-600'
                            }`}
                          >
                            {gender === 'uomo' ? T.s1.man[lang] : T.s1.woman[lang]}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-3 block">{T.s1.p3[lang]}</label>
                      <select 
                        value={formData.participants}
                        onChange={(e) => setFormData({...formData, participants: parseInt(e.target.value)})}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-bold focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none shadow-sm"
                      >
                        {[1,2,3,4,5,6].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? T.s1.person[lang] : T.s1.people[lang]}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={`p-5 rounded-2xl border-2 transition-colors cursor-pointer flex items-start gap-4 ${
                    formData.insurance ? 'border-sun-400 bg-sun-50/50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setFormData({...formData, insurance: !formData.insurance})}
                  >
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center border mt-0.5 shrink-0 transition-colors ${
                      formData.insurance ? 'bg-sun-500 border-sun-500 text-white' : 'border-gray-300 bg-white'
                    }`}>
                      {formData.insurance && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 flex items-center gap-2">
                        {T.s1.insTitle[lang]} <ShieldAlert className="w-4 h-4 text-sun-500" />
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{T.s1.insDesc[lang]}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex justify-end">
                  <button onClick={handleNext} className="bg-primary-900 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-800 transition-colors">
                    {T.s1.continue[lang]} <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: DATI PERSONALI */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 md:p-12"
              >
                <h2 className="text-4xl font-sans font-black text-gray-900 mb-2 tracking-tight">{T.s2.title[lang]}</h2>
                <p className="text-gray-500 font-medium mb-8">{T.s2.desc[lang]}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-1">{T.s2.email[lang]}</label>
                    <input type="email" placeholder="mario.rossi@example.com" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-bold focus:ring-2 focus:ring-primary-600 outline-none shadow-sm" 
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-1">{T.s2.name[lang]}</label>
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-bold focus:ring-2 focus:ring-primary-600 outline-none shadow-sm" 
                      value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-1">{T.s2.surname[lang]}</label>
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-bold focus:ring-2 focus:ring-primary-600 outline-none shadow-sm" 
                      value={formData.cognome} onChange={e => setFormData({...formData, cognome: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-1">{T.s2.dob[lang]}</label>
                    <input type="date" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-bold focus:ring-2 focus:ring-primary-600 outline-none shadow-sm" 
                      value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-1">{T.s2.phone[lang]}</label>
                    <input type="tel" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-bold focus:ring-2 focus:ring-primary-600 outline-none shadow-sm" 
                      value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-1">{T.s2.address[lang]}</label>
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-bold focus:ring-2 focus:ring-primary-600 outline-none shadow-sm" 
                      value={formData.indirizzo} onChange={e => setFormData({...formData, indirizzo: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-1">{T.s2.doc[lang]}</label>
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-bold focus:ring-2 focus:ring-primary-600 outline-none shadow-sm" 
                      value={formData.documento} onChange={e => setFormData({...formData, documento: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-1">{T.s2.underage[lang]}</label>
                    <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-bold focus:ring-2 focus:ring-primary-600 outline-none shadow-sm"
                      value={formData.minorenne} onChange={e => setFormData({...formData, minorenne: e.target.value})}
                    >
                      <option value="no">{T.s2.no[lang]}</option>
                      <option value="si">{T.s2.yes[lang]}</option>
                    </select>
                  </div>
                </div>

                <div className="mt-12 flex justify-between items-center">
                  <button onClick={handleBack} className="text-gray-500 px-6 py-4 rounded-xl font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors">
                    <ChevronLeft className="w-5 h-5" /> {T.s2.back[lang]}
                  </button>
                  <button onClick={handleNext} className="bg-primary-900 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-800 transition-colors">
                    {T.s1.continue[lang]} <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: RIEPILOGO */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 md:p-12"
              >
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-sans font-black text-gray-900 mb-2 tracking-tight">{T.s3.title[lang]}</h2>
                  <p className="text-gray-500 font-medium">{T.s3.desc[lang]}</p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-8 border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center pb-6 border-b border-gray-200 mb-6">
                    <div>
                      <h3 className="font-sans text-2xl font-black text-primary-900 uppercase tracking-tight">{T.s3.pkgPre[lang]} {PACKAGES[formData.package as keyof typeof PACKAGES].name}</h3>
                      <p className="text-gray-500 mt-1 font-bold">{formData.participants} {T.s3.paxLabel[lang]}{formData.participants > 1 ? T.s3[`paxPlur${lang}` as keyof typeof T.s3] : T.s3[`paxSing${lang}` as keyof typeof T.s3]} ({formData.gender === 'uomo' ? T.s1.man[lang] : T.s1.woman[lang]})</p>
                    </div>
                    <button onClick={() => setStep(1)} className="text-[10px] font-bold text-primary-600 hover:text-primary-700 hover:underline uppercase tracking-widest">{T.s3.edit[lang]}</button>
                  </div>

                  <div className="space-y-4 mb-6 text-gray-700">
                    <div className="flex justify-between">
                      <span>{T.s3.basePrice[lang]} ({formData.participants}x)</span>
                      <span className="font-medium">€{(totale - (formData.insurance ? 100 * formData.participants : 0)).toLocaleString('it-IT')}</span>
                    </div>
                    {formData.insurance && (
                      <div className="flex justify-between text-sun-600">
                        <span>{T.s3.insSub[lang]} ({formData.participants}x)</span>
                        <span className="font-medium">+ €{100 * formData.participants}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-gray-200 space-y-4">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>{T.s3.total[lang]}</span>
                      <span className="font-sans font-black">€{totale.toLocaleString('it-IT')}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 font-medium">
                      <span>{T.s3.balance[lang]}</span>
                      <span>€{saldo.toLocaleString('it-IT')}</span>
                    </div>
                    <div className="p-6 bg-primary-900 text-white rounded-2xl flex flex-col md:flex-row md:justify-between md:items-center mt-6 shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-700/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                      <div className="relative z-10 mb-2 md:mb-0">
                        <span className="block text-[10px] uppercase tracking-widest text-primary-300 font-bold mb-1">{T.s3.payNow[lang]}</span>
                        <span className="block text-sm font-medium opacity-90">{T.s3.paySub[lang]}</span>
                      </div>
                      <span className="relative z-10 text-4xl font-sans font-black">€{accontoTotale.toLocaleString('it-IT')}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                  <button onClick={handleBack} className="w-full md:w-auto text-gray-500 px-6 py-4 rounded-xl font-medium flex justify-center items-center gap-2 hover:bg-gray-100 transition-colors order-2 md:order-1">
                    <ChevronLeft className="w-5 h-5" /> {T.s2.back[lang]}
                  </button>
                  <button onClick={handleNext} className="w-full md:w-auto bg-sun-400 text-primary-900 px-10 py-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-sun-500 transition-colors shadow-lg shadow-sun-400/20 order-1 md:order-2">
                    {T.s3.confirmBtn[lang]}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: SUCCESS */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 text-center"
              >
                <div className="w-24 h-24 bg-green-50 border-2 border-green-200 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-5xl font-sans font-black text-gray-900 mb-4 tracking-tight">{T.s4.title[lang]}</h2>
                <p className="text-lg text-gray-500 font-medium mb-8 max-w-md mx-auto">
                  {T.s4.desc[lang]}
                </p>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 max-w-sm mx-auto mb-10 shadow-sm">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-2">{T.s4.code[lang]}</span>
                  <span className="text-2xl font-mono font-black text-primary-900">EOS2026-1048</span>
                </div>
                <Link to="/customer" className="inline-block bg-primary-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-800 shadow-md transition-colors">
                  {T.s4.goArea[lang]}
                </Link>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
