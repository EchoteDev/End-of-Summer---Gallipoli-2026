import { CheckCircle2, FileText, UploadCloud, MapPin, Calendar, Users, CreditCard } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const T = {
  title: { IT: 'La Tua Prenotazione', EN: 'Your Booking' },
  sub: { IT: 'Benvenuto Mario, ecco i dettagli del tuo viaggio per Gallipoli 2026.', EN: 'Welcome Mario, here are the details of your trip to Gallipoli 2026.' },
  confirmed: { IT: 'Confermata', EN: 'Confirmed' },
  pkgSummary: { IT: 'Riepilogo Pacchetto', EN: 'Package Summary' },
  pkg: { IT: 'Pacchetto', EN: 'Package' },
  pax: { IT: 'Partecipanti', EN: 'Participants' },
  dates: { IT: 'Date', EN: 'Dates' },
  dest: { IT: 'Destinazione', EN: 'Destination' },
  payTitle: { IT: 'Pagamenti', EN: 'Payments' },
  depPaid: { IT: 'Acconto versato', EN: 'Deposit paid' },
  depDate: { IT: 'Pagato il 12 Giu 2026', EN: 'Paid on Jun 12, 2026' },
  balRemain: { IT: 'Saldo rimanente', EN: 'Remaining balance' },
  balDate: { IT: 'Da pagare entro 23 Lug 2026', EN: 'Pay by Jul 23, 2026' },
  payNow: { IT: 'Paga ora', EN: 'Pay now' },
  docsReq: { IT: 'Documenti richiesti', EN: 'Required Documents' },
  idCard: { IT: "Carta d'identità", EN: 'ID Card' },
  uploaded: { IT: 'Caricata correttamente', EN: 'Uploaded successfully' },
  waiver: { IT: 'Manleva Partecipante 2', EN: 'Participant 2 Waiver' },
  uploadInst: { IT: 'Clicca per caricare il PDF firmato dai genitori', EN: 'Click to upload the PDF signed by parents' },
  supportTitle: { IT: 'ASSISTENZA DEDICATA', EN: 'DEDICATED ASSISTANCE' },
  supportSub: { IT: 'Il tuo referente Go Party è disponibile per qualsiasi necessità.', EN: 'Your Go Party representative is available for any needs.' },
  contactSupport: { IT: 'Contatta Supporto', EN: 'Contact Support' },
  august: { IT: 'Ago', EN: 'Aug' }
};

export default function CustomerArea() {
  const { lang } = useOutletContext<{ lang: 'IT' | 'EN' }>();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-sans font-black text-gray-900 tracking-tight">{T.title[lang]}</h1>
            <p className="text-gray-500 mt-2 font-medium">{T.sub[lang]}</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200 shadow-sm w-fit">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-bold text-sm tracking-wide uppercase">{T.confirmed[lang]}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold text-gray-900">{T.pkgSummary[lang]}</h2>
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Booking ID</span>
                  <span className="font-mono text-sm text-primary-700 font-bold">#EOS2026-1048</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-200 mb-8">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{T.pkg[lang]}</span>
                  <span className="font-black text-lg text-primary-700">Gold</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{T.pax[lang]}</span>
                  <div className="flex items-center gap-2 font-bold text-gray-900"><Users className="w-4 h-4 text-gray-400"/> 2</div>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{T.dates[lang]}</span>
                  <div className="flex items-center gap-2 font-bold text-gray-900"><Calendar className="w-4 h-4 text-gray-400"/> 22-29 {T.august[lang]}</div>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{T.dest[lang]}</span>
                  <div className="flex items-center gap-2 font-bold text-gray-900"><MapPin className="w-4 h-4 text-gray-400"/> Baia Verde</div>
                </div>
              </div>

              <h3 className="font-bold text-primary-900 mb-4">{T.payTitle[lang]}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border border-green-100 bg-green-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{T.depPaid[lang]}</p>
                      <p className="text-xs text-green-600 font-medium">{T.depDate[lang]}</p>
                    </div>
                  </div>
                  <span className="font-bold text-lg">€600</span>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-xl border border-orange-100 bg-orange-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{T.balRemain[lang]}</p>
                      <p className="text-xs text-orange-600 font-medium">{T.balDate[lang]}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-lg block">€1.478</span>
                    <button className="text-xs font-bold text-white bg-primary-900 px-3 py-1.5 rounded-md mt-1 hover:bg-primary-800 transition-colors">{T.payNow[lang]}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-primary-900 mb-4">{T.docsReq[lang]}</h2>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{T.idCard[lang]}</p>
                    <p className="text-xs text-green-600 font-medium mt-1">{T.uploaded[lang]}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-dashed border-gray-300 bg-gray-50 flex items-start gap-3 cursor-pointer hover:bg-gray-100 transition-colors">
                  <UploadCloud className="w-5 h-5 text-primary-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-primary-900">{T.waiver[lang]}</p>
                    <p className="text-xs text-gray-500 mt-1">{T.uploadInst[lang]}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-3xl p-6 text-white text-center border border-gray-800 shadow-xl">
              <h3 className="font-sans font-black tracking-tight mb-2 text-white">{T.supportTitle[lang]}</h3>
              <p className="text-sm text-gray-400 mb-6 font-medium">{T.supportSub[lang]}</p>
              <button className="w-full py-3 bg-white hover:bg-gray-100 text-gray-900 transition-colors rounded-xl font-bold text-sm shadow-md">
                {T.contactSupport[lang]}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
