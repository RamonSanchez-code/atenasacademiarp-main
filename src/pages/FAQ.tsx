import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, HelpCircle, MapPin, Clock, CreditCard, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  // Unidades
  {
    category: 'unidades',
    question: 'Quais são as unidades da Academia Atenas?',
    answer: 'Temos 5 unidades estrategicamente localizadas em Ribeirão Preto: Independência (Matriz), Caramuru, Novo Mundo, Vila Tibério e Campos Elíseos.'
  },
  {
    category: 'unidades',
    question: 'As unidades possuem estacionamento?',
    answer: 'As unidades que contem estacionamento são a independencia aberto, caramuru, vila tiberio tem fechado e coberto, as outras não possui.'
  },
  {
    category: 'unidades',
    question: 'Posso treinar em qualquer unidade?',
    answer: 'Depende do seu plano. O Plano Recorrente permite acesso livre a todas as unidades da rede. Planos locais são restritos à unidade de matrícula.'
  },
  
  // Valores e Planos
  {
    category: 'valores',
    question: 'Quais são as formas de pagamento?',
    answer: 'Aceitamos cartões de crédito (com opção de recorrência que não consome seu limite), débito, dinheiro e PIX.'
  },
  {
    category: 'valores',
    question: 'Existe taxa de matrícula?',
    answer: 'Não existe taxa de matrícula.'
  },
  {
    category: 'valores',
    question: 'Como funciona o cancelamento?',
    answer: 'O cancelamento deve ser solicitado presencialmente na unidade de matrícula com 30 dias de antecedência.'
  },

  // Horários
  {
    category: 'horarios',
    question: 'Qual o horário de funcionamento?',
    answer: 'Nossas unidades funcionam geralmente de Segunda a Sexta das 06:00 às 22:00, e aos Sábados das 08:00 às 14:00. Algumas unidades podem ter horários estendidos.'
  },
  {
    category: 'horarios',
    question: 'A academia abre aos feriados?',
    answer: 'Sim, funcionamos em horários especiais na maioria dos feriados. Os horários são divulgados antecipadamente em nossas redes sociais e murais das unidades.'
  },

  // Modalidades
  {
    category: 'modalidades',
    question: 'Quais aulas estão inclusas na mensalidade?',
    answer: 'A musculação está inclusa em todos os planos. Aulas coletivas como Ritmos, Jump, Step e Pump variam conforme o plano escolhido. Natação e Pilates possuem planos específicos.'
  },
  {
    category: 'modalidades',
    question: 'Preciso agendar as aulas coletivas?',
    answer: 'O agendamento das aulas não temos app, então tem que deixar para realizar pelo whatsapp da academia ou presencialmente.'
  }
];

const categories = [
  { id: 'todos', name: 'Todos', icon: <HelpCircle size={18} /> },
  { id: 'unidades', name: 'Unidades', icon: <MapPin size={18} /> },
  { id: 'valores', name: 'Valores e Planos', icon: <CreditCard size={18} /> },
  { id: 'horarios', name: 'Horários', icon: <Clock size={18} /> },
  { id: 'modalidades', name: 'Modalidades', icon: <Dumbbell size={18} /> },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'todos' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 min-h-screen bg-darkBg">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl font-black mb-6 tracking-tighter uppercase"
          >
            Dúvidas <span className="text-brand-green">Frequentes</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 uppercase tracking-widest text-xs font-bold"
          >
            Tudo o que você precisa saber sobre a Atenas
          </motion.p>
        </div>

        {/* Search & Filters */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative mb-8 sm:mb-10">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="text"
              placeholder="O que você está procurando?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-darkCard border border-white/10 rounded-2xl py-5 sm:py-6 pl-16 pr-6 text-white focus:outline-none focus:border-brand-green transition-all text-sm sm:text-base"
            />
          </div>

          <div className="flex overflow-x-auto sm:flex-wrap sm:justify-center gap-3 pb-4 sm:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 sm:px-8 py-3 sm:py-4 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all border shrink-0 sm:shrink ${
                  activeCategory === cat.id 
                    ? 'bg-brand-green border-brand-green text-white shadow-lg shadow-brand-green/20' 
                    : 'bg-darkCard border-white/5 text-slate-400 hover:border-white/20'
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-darkCard border border-white/5 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-black uppercase tracking-tight pr-4">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      className="text-brand-green shrink-0"
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-8 pb-8 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-6">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-darkCard/50 border border-dashed border-white/10 rounded-3xl"
              >
                <HelpCircle size={48} className="mx-auto text-slate-700 mb-4" />
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Nenhuma dúvida encontrada</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact CTA */}
        <div className="mt-20 text-center">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-6">Ainda tem dúvidas?</p>
          <Link 
            to="/contato"
            className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all border border-white/10"
          >
            Fale com a gente <Search size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
