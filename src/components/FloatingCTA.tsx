import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Phone, X, Send, HelpCircle, Info, ShieldCheck, TrendingUp, User, Bot } from 'lucide-react';
import { UNIT_DATA, GENERAL_PHONE } from '../constants';

interface ChatMessage {
  type: 'user' | 'bot';
  text: string;
}

export default function FloatingCTA() {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [isOpen, setIsOpen] = React.useState(false);
  const [chatHistory, setChatHistory] = React.useState<ChatMessage[]>([]);
  const [interactionCount, setInteractionCount] = React.useState(0);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  const isUnitPage = location.pathname.startsWith('/unidade/');
  const unitId = location.pathname.split('/').pop();
  const unit = unitId ? UNIT_DATA[unitId] : null;

  const whatsappNumber = unit ? unit.whatsapp : null;

  // Placeholder Q&A - User will provide real ones in next step
  const qaData: Record<string, string> = {
    "Olá! Gostaria de saber mais sobre os planos.": "Temos planos Mensais e Recorrentes. O Plano Recorrente é o nosso melhor custo-benefício, com acesso a todas as unidades da rede!",
    "Quais são os horários de funcionamento?": "Nossos horários variam por unidade. Geralmente abrimos às 05:30 e fechamos às 22:00 ou 23:30. Você pode conferir o horário exato desta unidade logo acima nesta página!",
    "Vocês oferecem aula experimental?": "Não oferecemos aula experimental, mas você pode utilizar a academia pagando uma diária de R$ 25,00 (válido somente para musculação).",
    "Quais modalidades vocês oferecem?": "Oferecemos Musculação, Ginástica e em algumas unidades temos Pilates, Natação e Lutas. Confira a seção de 'Serviços' nesta página para ver o que temos aqui!",
    "Como faço minha matrícula?": "Você pode fazer sua matrícula diretamente na recepção da unidade ou clicar no botão de WhatsApp para falar com um de nossos consultores!"
  };

  const preMessages = Object.keys(qaData);

  const infoItems = [
    {
      icon: <X size={16} className="text-red-400" />,
      text: "Não temos aula experimental, mas a diária é R$ 25,00 (somente musculação)."
    },
    {
      icon: <Phone size={16} className="text-brand-green" />,
      text: "Cada unidade tem seu número de telefone para contato e seus próprios serviços."
    },
    {
      icon: <ShieldCheck size={16} className="text-brand-blue" />,
      text: "Todas as unidades estão em constante supervisão para melhoria contínua."
    },
    {
      icon: <TrendingUp size={16} className="text-brand-green" />,
      text: "Marketing elaborado, criando inovações e tendências no mercado fitness."
    }
  ];

  React.useEffect(() => {
    if (isOpen && isUnitPage && chatHistory.length === 0) {
      setChatHistory([{ type: 'bot', text: `Olá! Bem-vindo à Unidade ${unit?.name.replace('Unidade ', '')}. Como posso te ajudar hoje?` }]);
    }
  }, [isOpen, isUnitPage, unit]);

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleQuestionClick = (question: string) => {
    const answer = qaData[question];
    setChatHistory(prev => [...prev, { type: 'user', text: question }]);
    
    setTimeout(() => {
      setChatHistory(prev => [...prev, { type: 'bot', text: answer }]);
      setInteractionCount(prev => prev + 1);
    }, 600);
  };

  const handleWhatsAppRedirect = () => {
    if (!whatsappNumber) return;
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    const message = encodeURIComponent("Olá! Estava tirando dúvidas no chat do site e gostaria de falar com um atendente.");
    window.open(`https://wa.me/55${cleanNumber}?text=${message}`, '_blank');
    setIsOpen(false);
  };

  const resetChat = () => {
    setIsOpen(false);
    setTimeout(() => {
      setChatHistory([]);
      setInteractionCount(0);
    }, 300);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end gap-4 max-w-[calc(100vw-2rem)] safe-bottom">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white border border-slate-200 rounded-[2rem] shadow-2xl w-full sm:w-80 md:w-96 overflow-hidden mb-2 flex flex-col max-h-[75vh] sm:max-h-[500px]"
          >
            {isUnitPage ? (
              <>
                {/* CHAT HEADER */}
                <div className="bg-[#25D366] p-4 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <MessageCircle size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Atendimento Atenas</p>
                      <p className="text-white/80 text-[10px] uppercase tracking-widest">Unidade {unit?.name.replace('Unidade ', '')}</p>
                    </div>
                  </div>
                  <button onClick={resetChat} className="text-white/80 hover:text-white p-1">
                    <X size={20} />
                  </button>
                </div>
                
                {/* CHAT BODY */}
                <div 
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-thin scrollbar-thumb-slate-200"
                >
                  {chatHistory.map((msg, idx) => (
                    <motion.div
                      initial={{ opacity: 0, x: msg.type === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={idx}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                        msg.type === 'user' 
                          ? 'bg-brand-blue text-white rounded-tr-none' 
                          : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  
                  {interactionCount >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="pt-2"
                    >
                      <button
                        onClick={handleWhatsAppRedirect}
                        className="w-full py-3 bg-[#25D366] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#25D366]/20"
                      >
                        <MessageCircle size={16} /> FALAR COM ATENDENTE NO WHATSAPP
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* CHAT FOOTER / OPTIONS */}
                <div className="p-4 bg-white border-t border-slate-100 shrink-0">
                  <p className="text-slate-400 text-[9px] uppercase tracking-widest mb-3 font-bold">Selecione uma dúvida:</p>
                  <div className="flex flex-wrap gap-2">
                    {preMessages.map((msg, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuestionClick(msg)}
                        disabled={interactionCount >= 4}
                        className="text-[10px] text-left px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 hover:border-brand-green/30 hover:bg-brand-green/5 transition-all text-slate-600 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {msg}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* INFO HEADER */}
                <div className="bg-brand-blue p-4 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Info size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Informações Úteis</p>
                      <p className="text-white/80 text-[10px] uppercase tracking-widest">Academia Atenas</p>
                    </div>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white p-1">
                    <X size={20} />
                  </button>
                </div>
                
                {/* INFO BODY */}
                <div className="p-5 space-y-5 bg-slate-50 overflow-y-auto">
                  {infoItems.map((item, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={idx} 
                      className="flex gap-4 items-start"
                    >
                      <div className="mt-0.5 shrink-0 w-8 h-8 rounded-xl bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                        {item.icon}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{item.text}</p>
                    </motion.div>
                  ))}
                </div>
                
                {/* INFO FOOTER */}
                <div className="p-4 bg-slate-100 border-t border-slate-200 text-center">
                  <p className="text-[9px] text-slate-400 uppercase tracking-[0.2em]">Inovação • Qualidade • Resultados</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-xl text-white relative group transition-all duration-300 ${
          isUnitPage 
            ? 'bg-[#25D366] shadow-[#25D366]/30 hover:shadow-[#25D366]/50' 
            : 'bg-brand-blue shadow-brand-blue/30 hover:shadow-brand-blue/50'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div 
              key={isUnitPage ? "wa" : "help"} 
              initial={{ rotate: 90, opacity: 0 }} 
              animate={{ rotate: 0, opacity: 1 }} 
              exit={{ rotate: -90, opacity: 0 }}
            >
              {isUnitPage ? <MessageCircle size={28} /> : <HelpCircle size={28} />}
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-black px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-2xl border border-black/5">
            {isUnitPage ? 'Fale Conosco' : 'Dúvidas?'}
          </span>
        )}
      </motion.button>
    </div>
  );
}
