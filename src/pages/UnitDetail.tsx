import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, CheckCircle2, Phone, MessageCircle, ArrowLeft, ChevronLeft, ChevronRight, QrCode, CreditCard, Banknote } from 'lucide-react';

const unitData: Record<string, any> = {
  independencia: {
    name: 'Unidade Independencia',
    address: 'R. Bolívia, 2095 - Ribeirão Preto',
    photos: [
      './unidades/independencia/jardim-fachada.jpg',
      './unidades/independencia/jardim-salao.jpg',
      './unidades/independencia/jardim-cardio.jpg',
      './unidades/independencia/jardim-bike.jpg',
      './unidades/independencia/jardim-maquinas.jpg',
      './unidades/independencia/jardim-maquinas2.jpg',
      './unidades/independencia/jardim-pilates.jpg',
      './unidades/independencia/jardim-piscina.jpg',
      './unidades/independencia/jardim-piscina2.jpg'
    ],
    services: ['Musculação', 'Ginástica', 'Dança', 'Spinning', 'Pilates (Valor à parte)', 'Natação a partir de 3 anos, infantil e adulto', 'Hidroginástica', 'Lutas (Valor à parte)', 'Climatizadores', 'Estacionamento', 'Wi-Fi', 'Hall de recepção', 'Banheiros e Vestiários'],
    schedule: [
      { day: 'Segunda - Sexta', time: '05:30 - 22:00' },
      { day: 'Sábado e Feriados', time: '09:00 - 13:00' },
      { day: 'Domingo', time: 'Fechado' },
    ],
    plans: [
      { name: 'Plano Mensal', price: 'R$ 165,00', features: ['Musculação e Ginástica', 'Treine na unidade cadastrada'] },
      { name: 'Plano Recorrente', price: 'R$ 129,00', features: ['Musculação e Ginástica', 'Acesso a todas as unidades da rede'] },
    ],
    whatsapp: '(16) 3628-3440',
    phone: '(16) 3628-3440',
    recorrenteUrl: 'https://vendas.online.sistemapacto.com.br/planos?un=2&k=6c21ddab455cdbf49fb61e03c7a3f12f',
  },
  caramuru: {
    name: 'Unidade Caramuru',
    address: 'Avenida Caramuru, 567 - Jardim Sumaré',
    photos: [
      './unidades/caramuru/caramuru-fachada.jpg',
      './unidades/caramuru/caramuru-recepcao.jpg',
      './unidades/caramuru/caramuru-cardio.jpg',
      './unidades/caramuru/caramuru-cardio2.jpg',
      './unidades/caramuru/caramuru-funcional.jpg',
      './unidades/caramuru/caramuru-maquinas.jpg',
      './unidades/caramuru/caramuru-maquinas2.jpg',
      './unidades/caramuru/caramuru-maquinas3.jpg',
      './unidades/caramuru/caramuru-maquinas4.jpg',
      './unidades/caramuru/caramuru-maquinas5.jpg'
    ],
    services: ['Musculação', 'Ginástica', 'Dança', 'Ar condicionado', 'Estacionamento', 'Wi-Fi', 'Hall de recepção', 'Banheiros e Vestiários'],
    schedule: [
      { day: 'Segunda - Sexta', time: '05:30 - 23:30' },
      { day: 'Sábado e Feriados', time: '09:00 - 14:00' },
      { day: 'Domingo', time: '09:00 - 13:00' },
    ],
    plans: [
      { name: 'Plano Mensal', price: 'R$ 165,00', features: ['Musculação e Ginástica', 'Treine na unidade cadastrada'] },
      { name: 'Plano Recorrente', price: 'R$ 129,00', features: ['Musculação e Ginástica', 'Acesso a todas as unidades da rede'] },
    ],
    whatsapp: '(16) 3441-1233',
    phone: '(16) 3441-1233',
    recorrenteUrl: 'https://vendas.online.sistemapacto.com.br/planos?un=5&k=6c21ddab455cdbf49fb61e03c7a3f12f',
  },
  'novo-mundo': {
    name: 'Unidade Novo Mundo',
    address: 'R. Dr. Morais Lima, 606 - Jardim Anhanguera',
    photos: [
      './unidades/novo-mundo/novo-mundo-fachada.jpg',
      './unidades/novo-mundo/novo-mundo-aereo.jpg',
      './unidades/novo-mundo/novo-mundo-fora.jpg',
      './unidades/novo-mundo/novo-mundo-interna.jpg',
      './unidades/novo-mundo/novo-mundo-cardio.jpg',
      './unidades/novo-mundo/novo-mundo-maquinas.jpg',
      './unidades/novo-mundo/novo-mundo-maquinas2.jpg',
      './unidades/novo-mundo/novo-mundo-pilates.jpg',
      './unidades/novo-mundo/novo-mundo-spinnig.jpg',
      './unidades/novo-mundo/novo-mundo-piscina.jpg',
      './unidades/novo-mundo/novo-mundo-piscina2.jpg'
    ],
    services: ['Musculação', 'Ginástica', 'Dança', 'Spinning', 'Pilates (Valor à parte)', 'Natação a partir de 3 anos, infantil e adulto', 'Hidroginástica', 'Climatizadores', 'Wi-Fi', 'Hall de recepção', 'Banheiros e Vestiários'],
    schedule: [
      { day: 'Segunda - Sexta', time: '05:30 - 22:00' },
      { day: 'Sáb, Dom e Feriados', time: '09:00 - 13:00' },
    ],
    plans: [
      { name: 'Plano Mensal', price: 'R$ 165,00', features: ['Musculação e Ginástica', 'Treine na unidade cadastrada'] },
      { name: 'Plano Recorrente', price: 'R$ 129,00', features: ['Musculação e Ginástica', 'Acesso a todas as unidades da rede'] },
    ],
    whatsapp: '(16) 3618-4070',
    phone: '(16) 3618-4070',
    recorrenteUrl: 'https://vendas.online.sistemapacto.com.br/planos?un=1&k=6c21ddab455cdbf49fb61e03c7a3f12f',
  },
  'vila-tiberio': {
    name: 'Unidade Vila Tibério',
    address: 'R. Cel. Luiz da Cunha, 436 - Vila Tibério',
    photos: [
      './unidades/vila-tiberio/v-tiberio-entrada.jpg',
      './unidades/vila-tiberio/v-tiberio-recepcao.jpg',
      './unidades/vila-tiberio/v-tiberio-salao.jpg',
      './unidades/vila-tiberio/v-tiberio-cardio.jpg',
      './unidades/vila-tiberio/v-tiberio-cardio2.jpg',
      './unidades/vila-tiberio/v-tiberio-espelho.jpg',
      './unidades/vila-tiberio/v-tiberio-halteres.jpg',
      './unidades/vila-tiberio/v-tiberio-maquinas.jpg',
      './unidades/vila-tiberio/v-tiberio-maquinas2.jpg',
      './unidades/vila-tiberio/v-tiberio-maquinas3.jpg'
    ],
    services: ['Musculação', 'Ginástica', 'Dança', 'Ar condicionado', 'Estacionamento', 'Wi-Fi', 'Hall de recepção', 'Banheiros e Vestiários'],
    schedule: [
      { day: 'Segunda - Sexta', time: '05:30 - 22:00' },
      { day: 'Sábado e Feriados', time: '09:00 - 13:00' },
      { day: 'Domingo', time: 'Fechado' },
    ],
    plans: [
      { name: 'Plano Mensal', price: 'R$ 165,00', features: ['Musculação e Ginástica', 'Treine na unidade cadastrada'] },
      { name: 'Plano Recorrente', price: 'R$ 129,00', features: ['Musculação e Ginástica', 'Acesso a todas as unidades da rede'] },
    ],
    whatsapp: '(16) 99139-2034',
    phone: '(16) 3421-9815',
    recorrenteUrl: 'https://vendas.online.sistemapacto.com.br/planos?un=4&k=6c21ddab455cdbf49fb61e03c7a3f12f',
  },
  'campos-eliseos': {
    name: 'Unidade Campos Elíseos',
    address: 'R. Antônio Milena, 1449 - Campos Elíseos',
    photos: [
      './unidades/campos-eliseos/campo-eliseos-fachada.jpg',
      './unidades/campos-eliseos/campo-eliseos-recepcap.jpg',
      './unidades/campos-eliseos/campo-eliseos-entrada.jpg',
      './unidades/campos-eliseos/campo-eliseos-dinamica.jpg',
      './unidades/campos-eliseos/campo-eliseos-aereo.jpg',
      './unidades/campos-eliseos/campo-eliseos-cardio.jpg',
      './unidades/campos-eliseos/campo-eliseos-cross.jpg',
      './unidades/campos-eliseos/campo-eliseos-cross2.jpg',
      './unidades/campos-eliseos/campo-eliseos-frentemaquinas.jpg',
      './unidades/campos-eliseos/campo-eliseos-maquinas.jpg'
    ],
    services: ['Musculação', 'Ginástica', 'Dança', 'Ar condicionado', 'Wi-Fi', 'Hall de recepção', 'Banheiros e Vestiários'],
    schedule: [
      { day: 'Segunda - Sexta', time: '05:30 - 22:00' },
      { day: 'Sábado e Feriados', time: '09:00 - 13:00' },
      { day: 'Domingo', time: 'Fechado' },
    ],
    plans: [
      { name: 'Plano Mensal', price: 'R$ 165,00', features: ['Musculação e Ginástica', 'Treine na unidade cadastrada'] },
      { name: 'Plano Recorrente', price: 'R$ 129,00', features: ['Musculação e Ginástica', 'Acesso a todas as unidades da rede'] },
    ],
    whatsapp: '(16) 3442-0368',
    phone: '(16) 3442-0368',
    recorrenteUrl: 'https://vendas.online.sistemapacto.com.br/planos?un=3&k=6c21ddab455cdbf49fb61e03c7a3f12f',
  },
};

export default function UnitDetail() {
  const { id } = useParams<{ id: string }>();
  const unit = id ? unitData[id] : null;
  const [currentPhoto, setCurrentPhoto] = React.useState(0);

  if (!unit) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-darkBg text-white pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Unidade não encontrada</h1>
          <Link to="/" className="text-brand-green hover:underline">Voltar para a Home</Link>
        </div>
      </div>
    );
  }

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % unit.photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + unit.photos.length) % unit.photos.length);
  };

  const handleSubscribe = (planName: string) => {
    if (planName === 'Plano Recorrente' && unit?.recorrenteUrl) {
      window.open(unit.recorrenteUrl, '_blank');
      return;
    }

    const now = new Date();
    const hour = now.getHours();
    let greeting = 'Bom dia';
    if (hour >= 12 && hour < 18) greeting = 'Boa tarde';
    if (hour >= 18 || hour < 5) greeting = 'Boa noite';

    const message = `${greeting}! Gostaria de solicitar o ${planName} para poder realizar o meu cadastro e assinar este plano, para poder dar início aos meus treinos na Academia Atenas - ${unit.name}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = unit.whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/55${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-darkBg text-white pb-20">
      {/* HERO SECTION */}
      <section className="relative h-[50vh] sm:h-[60vh] flex items-center justify-center overflow-hidden mb-8 sm:mb-12">
        <div className="absolute inset-0 z-0">
          <img 
            src={unit.photos[currentPhoto]} 
            className="w-full h-full object-cover opacity-30 transition-all duration-1000"
           
            alt={unit.name}
           
          />
          <div className="absolute inset-0 bg-gradient-to-b from-darkBg via-darkBg/60 to-darkBg"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-brand-green hover:gap-3 transition-all mb-8 sm:mb-10 font-black uppercase tracking-[0.2em] text-[10px]">
            <ArrowLeft size={14} /> VOLTAR PARA A HOME
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <span className="w-12 h-[2px] bg-brand-green"></span>
              <span className="text-brand-green font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs">Unidade de Excelência</span>
            </div>
            <h1 className="text-4xl sm:text-7xl md:text-8xl font-black mb-4 sm:mb-6 tracking-tighter uppercase leading-[0.9]">
              <span className="text-brand-blue">UNIDADE </span>
              <span className="text-brand-green italic">{unit.name.replace('Unidade ', '')}</span>
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin size={18} className="text-brand-green shrink-0" />
                <span className="text-xs sm:text-base uppercase tracking-widest font-medium">{unit.address}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DYNAMIC CAROUSEL SECTION */}
      <section className="container mx-auto px-4 sm:px-6 mb-24">
        <div className="max-w-6xl mx-auto">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden group shadow-2xl shadow-brand-blue/10 border border-white/5">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentPhoto}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full"
              >
                <img 
                  src={unit.photos[currentPhoto]} 
                  alt={unit.name}
                 
                 
                  className="w-full h-full object-cover"
                 
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation Arrows */}
            {unit.photos.length > 1 && (
              <>
                <button 
                  onClick={prevPhoto}
                  className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-brand-green hover:text-white transition-all border border-white/10 z-20"
                >
                  <ChevronLeft size={28} />
                </button>
                <button 
                  onClick={nextPhoto}
                  className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-brand-green hover:text-white transition-all border border-white/10 z-20"
                >
                  <ChevronRight size={28} />
                </button>
                
                {/* Photo Counter */}
                <div className="absolute top-6 right-6 sm:top-10 sm:right-10 bg-black/40 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 font-black text-[10px] sm:text-xs z-20 uppercase tracking-widest">
                  <span className="text-brand-green">{currentPhoto + 1}</span> / {unit.photos.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnails / Indicators */}
          <div className="flex justify-center gap-3 sm:gap-4 mt-8 overflow-x-auto no-scrollbar py-4">
            {unit.photos.map((photo: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setCurrentPhoto(idx)}
                className={`relative w-16 h-10 sm:w-32 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border-2 shrink-0 transition-all ${idx === currentPhoto ? 'border-brand-green scale-110 shadow-xl shadow-brand-green/20' : 'border-transparent opacity-40 hover:opacity-100'}`}
              >
                <img src={photo} className="w-full h-full object-cover" alt={`Thumbnail ${idx}`} />
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-6xl space-y-16">
        {/* ROW 1: MAP & SCHEDULE */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* MAP */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="rounded-[2rem] overflow-hidden border border-white/10 h-64 sm:h-80 shadow-2xl shadow-brand-green/5 relative group mb-6">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2) brightness(0.8)' }}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(unit.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                allowFullScreen
                title="Localização da Unidade"
                className="transition-all duration-500 group-hover:brightness-100"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border-2 border-brand-green/20 rounded-[2rem]"></div>
            </div>
            <a 
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(unit.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-brand-green hover:text-white transition-colors font-bold uppercase tracking-widest text-[10px] sm:text-xs border border-brand-green/30 px-8 py-4 rounded-full hover:bg-brand-green/10 w-full"
            >
              TRAÇAR ROTA NO MAPA
            </a>
          </motion.div>

          {/* SCHEDULE & SERVICES */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 bg-darkCard/30 p-8 rounded-[2rem] border border-white/5"
          >
            <div>
              <h3 className="text-brand-green font-bold uppercase tracking-widest text-[10px] sm:text-xs mb-6 flex items-center gap-2">
                <Clock size={16} /> HORÁRIOS
              </h3>
              <div className="space-y-4 w-full">
                {unit.schedule.map((item: any, idx: number) => (
                  <div key={idx} className="flex flex-row items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <span className="text-slate-400 font-medium text-[10px] sm:text-xs uppercase tracking-widest pr-4">
                      {item.day}
                    </span>
                    <span className={`font-mono text-[11px] sm:text-sm font-bold ${
                      item.time === 'Fechado' 
                        ? 'text-red-400' 
                        : 'text-brand-green'
                    } whitespace-nowrap text-right`}>
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-[10px] sm:text-xs text-brand-green/60 italic font-medium leading-relaxed text-center max-w-[320px] mx-auto">
                * Todos os alunos Atenas têm acesso liberado para treinar nas unidades abertas aos domingos.
              </p>
            </div>
            <div>
              <h3 className="text-brand-green font-bold uppercase tracking-widest text-[10px] sm:text-xs mb-6 flex items-center gap-2">
                <CheckCircle2 size={16} /> SERVIÇOS
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {unit.services.map((service: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-400">
                    <div className="w-2 h-2 bg-brand-green rounded-full shrink-0" />
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ROW 2: PLANS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 uppercase tracking-tighter text-center">PLANOS DISPONÍVEIS</h2>
          <div className={`grid gap-6 sm:gap-8 ${unit.plans.length === 1 ? 'max-w-md mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
            {unit.plans.map((plan: any, idx: number) => (
              <div key={idx} className="p-8 sm:p-10 rounded-[2rem] bg-darkCard border border-white/10 hover:border-brand-green/50 transition-all group hover:shadow-2xl hover:shadow-brand-green/5">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold text-brand-blue group-hover:text-brand-green transition-colors">{plan.name}</h4>
                    <div className="text-3xl sm:text-4xl font-mono font-bold mt-2">{plan.price}<span className="text-xs sm:text-sm text-slate-500 font-sans">/mês</span></div>
                  </div>
                </div>
                <ul className="space-y-4 mb-6">
                  {plan.features.map((feature: string, fIdx: number) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm text-slate-400">
                      <CheckCircle2 size={18} className="text-brand-green shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="mb-8 p-4 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-3 font-bold">Pagamento</p>
                  {plan.name === 'Plano Mensal' ? (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-300">Aceitamos todas as formas de pagamento:</p>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-1.5 text-brand-green">
                          <QrCode size={14} />
                          <span className="text-[10px] font-bold uppercase tracking-tighter">PIX</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-brand-green">
                          <CreditCard size={14} />
                          <span className="text-[10px] font-bold uppercase tracking-tighter">Cartão</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-brand-green">
                          <Banknote size={14} />
                          <span className="text-[10px] font-bold uppercase tracking-tighter">Dinheiro</span>
                        </div>
                      </div>
                      <p className="text-[9px] text-slate-500 italic">Crédito, Débito, PIX ou Dinheiro</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-300">Somente Cartão de Crédito:</p>
                      <div className="flex items-center gap-2 text-brand-blue">
                        <CreditCard size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Recorrência Automática</span>
                      </div>
                      <p className="text-[9px] text-slate-500 italic">Fica cadastrado e debita automaticamente todo mês</p>
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => handleSubscribe(plan.name)}
                  className="w-full py-5 bg-brand-green text-white font-bold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-xs"
                >
                  ASSINAR AGORA
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ROW 3: CONTACT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-brand-blue/10 p-8 sm:p-12 rounded-[3rem] border border-brand-blue/20 max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2 uppercase tracking-tighter">DÚVIDAS? FALE CONOSCO</h3>
            <p className="text-slate-400 text-sm uppercase tracking-widest">Estamos prontos para te ajudar a começar</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a 
              href={`https://wa.me/55${unit.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-5 bg-[#25D366] text-white font-bold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all text-sm"
            >
              <MessageCircle size={24} /> WHATSAPP: {unit.whatsapp}
            </a>
            <a 
              href={`tel:${unit.phone.replace(/\D/g, '')}`}
              className="flex items-center justify-center gap-3 py-5 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:border-brand-green/50 transition-all text-sm"
            >
              <Phone size={24} className="text-brand-green" /> TELEFONE: {unit.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
