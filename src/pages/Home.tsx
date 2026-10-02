import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { Dumbbell, PersonStanding, Sparkles, Flame, Apple, Droplets, ArrowRight, MapPin, CheckCircle2, QrCode, CreditCard, Banknote, Wifi, Waves, Clock, Star, Zap, ChevronRight } from 'lucide-react';

export default function Home() {
  const phrases = [
    "A consistência é o segredo do resultado.",
    "Treine com os melhores equipamentos.",
    "Sua transformação começa agora.",
    "Foco total nos seus objetivos.",
    "A maior rede de academias da região."
  ];

  const rotatingWords = ['ATENAS'];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  const heroImages = [
    "./unidades/vila-tiberio/v-tiberio-recepcao.jpg",
    "./unidades/novo-mundo/novo-mundo-piscina.jpg",
    "./unidades/campos-eliseos/campo-eliseos-entrada.jpg"
  ];

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95]);
  const bgY = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 4000);
    
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);

    const heroImageInterval = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000); // automatic rotation every 3 seconds

    return () => {
      clearInterval(phraseInterval);
      clearInterval(wordInterval);
      clearInterval(heroImageInterval);
    };
  }, [phrases.length, rotatingWords.length, heroImages.length]);

  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [activeModality, setActiveModality] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });

  const units = [
    { id: 'independencia', name: 'Unidade Independência', address: 'R. Bolívia, 2095 - Ribeirão Preto', img: './unidades/independencia/jardim-entrada.jpg', tags: ['Musculação', 'Ginástica', 'Climatizada'] },
    { id: 'novo-mundo', name: 'Unidade Novo Mundo', address: 'R. Dr. Morais Lima, 606 - Jardim Anhanguera', img: './unidades/novo-mundo/novo-mundo-piscina.jpg', tags: ['Musculação', 'Ginástica'] },
    { id: 'campos-eliseos', name: 'Unidade Campos Elíseos', address: 'R. Antônio Milena, 1449 - Campos Elíseos', img: './unidades/campos-eliseos/campo-eliseos-entrada.jpg', tags: ['Premium', 'Musculação', 'Ginástica'] },
    { id: 'vila-tiberio', name: 'Unidade Vila Tibério', address: 'R. Cel. Luiz da Cunha, 436 - Vila Tibério', img: './unidades/vila-tiberio/v-tiberio-recepcao.jpg', tags: ['Musculação', 'Ginástica', 'Estacionamento'] },
    { id: 'caramuru', name: 'Unidade Caramuru', address: 'Avenida Caramuru, 567 - Jardim Sumaré', img: './unidades/caramuru/caramuru-recepcao.jpg', tags: ['Premium', 'Musculação', 'Estacionamento'] },
  ];

  const scrollToUnits = () => {
    document.getElementById('unidades')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPlans = () => {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    { icon: <Dumbbell className="text-brand-green" size={32} />, title: 'Musculação', desc: 'Equipamentos de última geração.' },
    { icon: <Sparkles className="text-brand-green" size={32} />, title: 'Pilates', desc: 'Equilíbrio e fortalecimento.' },
    { icon: <Flame className="text-brand-green" size={32} />, title: 'Ginástica', desc: 'Aulas dinâmicas e motivadoras.' },
    { icon: <Waves className="text-brand-green" size={32} />, title: 'Natação', desc: 'Piscina climatizada.' },
    { icon: <Droplets className="text-brand-green" size={32} />, title: 'Vestiários', desc: 'Estrutura completa e higienizada.' },
    { icon: <Wifi className="text-brand-green" size={32} />, title: 'Wi-Fi Grátis', desc: 'Treine sempre conectado.' },
    { icon: <PersonStanding className="text-brand-green" size={32} />, title: 'Cardio', desc: 'Área aeróbica completa.' },
    { icon: <Apple className="text-brand-green" size={32} />, title: 'Recepção', desc: 'Atendimento profissional.' },
  ];

  return (
    <div className="bg-darkBg">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <motion.div 
          style={{ y: bgY }}
          className="absolute inset-0 z-0"
        >
          <AnimatePresence>
            <motion.img 
              key={heroImageIndex}
              src={heroImages[heroImageIndex]} 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.4, scale: 1.05 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 w-full h-full object-cover"
             
              alt="Gym Background"
            />
          </AnimatePresence>
          {/* Blur/Gradient effect from middle to left */}
          <div className="absolute inset-0 bg-gradient-to-r from-darkBg via-darkBg/80 to-transparent w-full md:w-3/4 lg:w-2/3 backdrop-blur-[2px] z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-transparent to-transparent z-10"></div>
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-12 h-[2px] bg-brand-green"></span>
              <span className="text-brand-green font-black uppercase tracking-[0.3em] text-xs sm:text-sm">Seja sua melhor versão</span>
            </div>
            
            <h1 className="text-4xl sm:text-7xl md:text-8xl font-black mb-6 sm:mb-8 leading-[0.9] tracking-tighter uppercase">
              ACADEMIA <br />
              <span className="text-brand-blue italic">
                ATENAS
              </span>
            </h1>

            <div className="min-h-[3rem] mb-8 sm:mb-10">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentPhraseIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-base sm:text-xl text-slate-300 font-medium max-w-xl"
                >
                  {phrases[currentPhraseIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToPlans}
                className="bg-brand-green text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-black hover:bg-brand-green/90 transition-all uppercase tracking-widest text-[10px] sm:text-xs flex items-center justify-center gap-3 shadow-xl shadow-brand-green/20"
              >
                ESCOLHER MEU PLANO <Zap size={18} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToUnits}
                className="glass text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-black hover:bg-white/10 transition-all uppercase tracking-widest text-[10px] sm:text-xs flex items-center justify-center gap-3"
              >
                VER UNIDADES <MapPin size={18} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="py-8 sm:py-12 border-y border-white/5 bg-darkCard/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { val: '05', label: 'Unidades', color: 'text-brand-blue' },
              { val: '+10', label: 'Modalidades', color: 'text-brand-green' },
              { val: '100%', label: 'Equipada', color: 'text-brand-blue' },
              { val: '20+', label: 'Profissionais', color: 'text-brand-green' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className={`text-2xl sm:text-4xl font-black ${stat.color} mb-1`}>{stat.val}</p>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO PLANOS */}
      <section id="planos" className="py-24 container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-6xl font-black mb-4 tracking-tighter">
            NOSSOS <span className="text-brand-green">PLANOS</span>
          </h2>
          <p className="text-slate-500 uppercase tracking-[0.2em] text-xs font-bold">Escolha o plano ideal para você</p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* PLANO MENSAL */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-darkCard p-8 sm:p-12 rounded-[2.5rem] border border-white/5 flex flex-col h-full card-hover"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-black mb-2 text-brand-blue uppercase">PLANO MENSAL</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-bold text-white">R$</span>
                <span className="text-6xl font-black text-white">165</span>
                <span className="text-xl font-bold text-white">,00</span>
                <span className="text-slate-500 text-sm ml-2">/mês</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <CheckCircle2 size={18} className="text-brand-green shrink-0" />
                Musculação e Ginástica inclusas
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <CheckCircle2 size={18} className="text-brand-green shrink-0" />
                Treino na unidade cadastrada
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <CheckCircle2 size={18} className="text-brand-green shrink-0" />
                Sem taxa de cancelamento
              </li>
            </ul>

            {/* Payment Methods Box */}
            <div className="bg-black/40 p-6 rounded-2xl border border-white/5 mb-8">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4">FORMAS DE PAGAMENTO</p>
              <div className="flex gap-6 mb-4">
                <div className="flex flex-col items-center gap-1">
                  <QrCode size={20} className="text-brand-green" />
                  <span className="text-[8px] font-black text-brand-green uppercase">PIX</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <CreditCard size={20} className="text-brand-green" />
                  <span className="text-[8px] font-black text-brand-green uppercase">CARTÃO</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Banknote size={20} className="text-brand-green" />
                  <span className="text-[8px] font-black text-brand-green uppercase">DINHEIRO</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 italic">Aceitamos Crédito, Débito, PIX ou Dinheiro</p>
            </div>
            
            <button onClick={scrollToUnits} className="w-full py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-xs mt-auto">
              SELECIONAR UNIDADE
            </button>
          </motion.div>

          {/* PLANO RECORRENTE */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-blue/5 p-8 sm:p-12 rounded-[2.5rem] border-2 border-brand-blue relative overflow-hidden flex flex-col h-full card-hover"
          >
            <div className="absolute top-6 right-6 bg-brand-blue text-black px-4 py-1.5 font-black text-[9px] uppercase tracking-widest rounded-full">
              MAIS VANTAJOSO
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-black mb-2 text-brand-blue uppercase">PLANO RECORRENTE</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-bold text-white">R$</span>
                <span className="text-6xl font-black text-white">129</span>
                <span className="text-xl font-bold text-white">,00</span>
                <span className="text-slate-500 text-sm ml-2">/mês</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <CheckCircle2 size={18} className="text-brand-green shrink-0" />
                Musculação e Ginástica inclusas
              </li>
              <li className="flex items-center gap-3 text-white font-bold text-sm">
                <CheckCircle2 size={18} className="text-brand-green shrink-0" />
                Acesso a TODAS as unidades da rede
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <CheckCircle2 size={18} className="text-brand-green shrink-0" />
                Débito automático (Recorrente)
              </li>
            </ul>

            {/* Payment Methods Box */}
            <div className="bg-brand-blue/10 p-6 rounded-2xl border border-brand-blue/20 mb-8">
              <p className="text-[10px] uppercase tracking-widest text-brand-blue font-bold mb-4">FORMA DE PAGAMENTO</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center">
                  <CreditCard size={20} className="text-brand-blue" />
                </div>
                <div>
                  <p className="text-xs font-black text-white uppercase tracking-tight">SOMENTE CARTÃO DE CRÉDITO</p>
                  <p className="text-[10px] text-slate-500">Cadastro automático e cobrança mensal</p>
                </div>
              </div>
            </div>
            
            <button onClick={scrollToUnits} className="w-full py-5 bg-brand-blue text-black font-black rounded-2xl hover:scale-[1.02] transition-all uppercase tracking-widest text-xs shadow-lg shadow-brand-blue/20 mt-auto">
              SELECIONAR UNIDADE
            </button>
          </motion.div>
        </div>
      </section>

      {/* SEÇÃO UNIDADES */}
      <section id="unidades" className="py-24 bg-darkCard/20">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div>
              <h2 className="text-4xl sm:text-6xl font-black mb-4 tracking-tighter">
                NOSSAS <span className="text-brand-blue">UNIDADES</span>
              </h2>
              <p className="text-slate-500 uppercase tracking-[0.2em] text-xs font-bold">Encontre a Atenas mais próxima de você</p>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-[2px] bg-brand-green"></div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {units.map((unit, index) => (
              <motion.div 
                key={unit.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                className="group bg-darkCard rounded-[2rem] overflow-hidden border border-white/5 hover:border-brand-green/30 transition-all duration-500 flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={unit.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={unit.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkCard via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {unit.tags.map(tag => (
                      <span key={tag} className="bg-black/60 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black mb-3 group-hover:text-brand-green transition-colors">{unit.name}</h3>
                  <div className="flex items-start gap-2 text-slate-500 mb-8">
                    <MapPin size={16} className="shrink-0 mt-1 text-brand-blue" />
                    <p className="text-xs font-medium leading-relaxed">{unit.address}</p>
                  </div>
                  <div className="mt-auto">
                    <Link to={`/unidade/${unit.id}`} className="w-full py-4 bg-white/5 text-white font-black rounded-xl hover:bg-brand-green hover:text-white transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] border border-white/10">
                      VER DETALHES <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO SERVIÇOS */}
      <section id="servicos" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-6xl font-black mb-4 tracking-tighter">
              TUDO QUE <span className="text-brand-blue">VOCÊ PRECISA</span>
            </h2>
            <p className="text-slate-500 uppercase tracking-[0.2em] text-xs font-bold">Infraestrutura completa de alto padrão</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-darkCard/40 p-8 rounded-3xl border border-white/5 text-center hover:bg-darkCard transition-all group"
              >
                <div className="mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-all">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-sm font-black mb-2 tracking-tight uppercase">{service.title}</h3>
                <p className="text-slate-500 text-[10px] font-medium leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CARROSSEL DE MODALIDADES */}
      <section className="py-24 bg-darkBg overflow-hidden">
        <div className="container mx-auto px-6 mb-12">
          <div className="text-center">
            <h2 className="text-3xl sm:text-5xl font-black mb-4 tracking-tighter uppercase">
              NOSSAS <span className="text-brand-green">MODALIDADES</span>
            </h2>
            <p className="text-slate-500 uppercase tracking-[0.2em] text-xs font-bold">Conheça nossas atividades</p>
          </div>
        </div>

        <div className="relative group">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 px-6 pb-8 no-scrollbar snap-x snap-mandatory"
            onMouseLeave={() => setActiveModality(null)}
          >
            {[
              { name: 'Pilates', img: './servicos/pilates.jpg' },
              { name: 'Natação', img: './servicos/natacao.jpg' },
              { name: 'Ginástica', img: './servicos/ginastica.jpg' },
              { name: 'Spinning', img: './servicos/spinning.jpg' },
              { name: 'Jump', img: './servicos/jump.jpg' },
              { name: 'Step', img: './servicos/step.jpg' },
              { name: 'Ritmos', img: './servicos/ritmos.png' },
              { name: 'Pump', img: './servicos/pump.jpg' },
              { name: 'Alongamento', img: './servicos/alongamento.jpg' },
              { name: 'Cross Funcional', img: './servicos/crossfuncional.jpg' },
              { name: 'Ballet', img: './servicos/ballet.jpg' },
              { name: 'Abdomem', img: './servicos/abdomen.jpg' },
            ].map((modality, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setActiveModality(index)}
                onClick={() => setActiveModality(index === activeModality ? null : index)}
                className={`min-w-[260px] sm:min-w-[300px] md:min-w-[450px] aspect-[4/5] relative rounded-[2rem] overflow-hidden snap-center group/item transition-all duration-500 cursor-pointer ${
                  activeModality !== null && activeModality !== index 
                    ? "opacity-20 blur-[4px] scale-90 grayscale" 
                    : "opacity-100 scale-100 grayscale-0"
                }`}
              >
                <img 
                  src={modality.img} 
                  alt={modality.name}
                 
                 
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                    activeModality === index ? "scale-110" : "scale-100"
                  }`}
                 
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 ${
                  activeModality !== null && activeModality !== index ? "opacity-0" : "opacity-100"
                }`} />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className={`text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-2 transition-transform duration-500 ${
                    activeModality === index ? "translate-y-0" : "translate-y-2"
                  }`}>
                    {modality.name}
                  </h3>
                  <div className={`h-1 bg-brand-green rounded-full transition-all duration-500 ${
                    activeModality === index ? "w-24" : "w-12"
                  }`} />
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Scroll Progress Bar */}
          <div className="max-w-xs mx-auto px-6 mt-8">
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-brand-blue"
                style={{ scaleX: scrollXProgress, transformOrigin: "left" }}
              />
            </div>
            <p className="text-[10px] text-center mt-2 text-slate-500 font-bold uppercase tracking-[0.2em]">Deslize para explorar</p>
          </div>
        </div>
      </section>

      {/* HORÁRIOS */}
      <section className="py-16 bg-brand-green/5 border-y border-brand-green/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase">
                HORÁRIOS DE <span className="text-brand-green">FUNCIONAMENTO</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex items-center gap-3">
                <Clock className="text-brand-green" size={20} />
                <p className="text-xs font-bold"><span className="text-slate-500 uppercase tracking-widest mr-2">SEG-SEX:</span> 05:30 ÀS 23:30</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-brand-blue" size={20} />
                <p className="text-xs font-bold"><span className="text-slate-500 uppercase tracking-widest mr-2">SÁB-FER:</span> 08:00 ÀS 14:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
