import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Star, Dumbbell, Sparkles, Flame, Apple, Heart, Zap } from 'lucide-react';

export default function Feedbacks() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95]);
  const bgY = useTransform(scrollY, [0, 500], [0, 100]);
  
  const handleStartTransformation = () => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('unidades');
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const feedbacks = [
    { name: 'João Silva', time: 'Há 1 ano na Academia', text: '"Consegui ganhar 12kg de massa muscular em 8 meses com o programa personalizado da academia. Nunca imaginei que seria possível! A disciplina e os resultados falam por si."', goal: 'Ganho de Massa', icon: <Dumbbell size={16} />, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
    { name: 'Maria Oliveira', time: 'Há 6 meses na Academia', text: '"As aulas de yoga mudaram minha vida! Melhorei minha postura, flexibilidade e, principalmente, minha paz de espírito. Recomendo para todos!"', goal: 'Bem-estar e Flexibilidade', icon: <Sparkles size={16} />, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
    { name: 'Pedro Costa', time: 'Há 3 meses na Academia', text: '"Os treinos HIIT são intensos, mas os resultados são incríveis! Perdi 8kg e minha resistência aumentou muito. A Academia Atenas é o melhor investimento que já fiz."', goal: 'Emagrecimento e Condicionamento', icon: <Flame size={16} />, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' },
    { name: 'Ana Santos', time: 'Há 9 meses na Academia', text: '"A equipe da academia revolucionou minha relação com comida e exercício. Perdi 15kg de forma saudável e sustentável. Hoje tenho mais energia e me sinto muito melhor comigo mesma!"', goal: 'Emagrecimento Inteligente', icon: <Apple size={16} />, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80' },
    { name: 'Carlos Mendes', time: 'Há 4 meses na Academia', text: '"Infraestrutura impecável, profissionais qualificados e ambiente acolhedor. A Academia Atenas superou todas as minhas expectativas. Já indiquei 5 amigos!"', goal: 'Saúde Geral', icon: <Heart size={16} />, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
    { name: 'Beatriz Lima', time: 'Há 7 meses na Academia', text: '"Voltei a treinar depois de 10 anos parada. O atendimento humanizado da Academia fez toda a diferença. Agora estou mais forte, saudável e feliz do que nunca!"', goal: 'Retomada de Treinos', icon: <Star size={16} />, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
  ];

  return (
    <div className="bg-darkBg">
      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] sm:h-screen flex items-center overflow-hidden">
        <motion.div 
          style={{ y: bgY }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="./unidades/caramuru/CARAMURU.FACHADA.jpg" 
            className="w-full h-full object-cover opacity-30"
           
            alt="Gym Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-darkBg via-darkBg/80 to-transparent w-full md:w-3/4 lg:w-2/3 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-transparent to-transparent"></div>
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-12 h-[2px] bg-brand-green"></span>
              <span className="text-brand-green font-black uppercase tracking-[0.3em] text-xs sm:text-sm">Resultados Reais</span>
            </div>
            <h1 className="text-4xl sm:text-7xl md:text-8xl font-black mb-6 tracking-tighter uppercase leading-[0.9]">
              HISTÓRIAS DE <br />
              <span className="text-brand-blue italic">TRANSFORMAÇÃO</span>
            </h1>
            <p className="text-base sm:text-xl text-slate-400 max-w-xl font-medium">
              Ouça os depoimentos de nossos clientes que alcançaram seus objetivos com dedicação e nosso suporte.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SEÇÃO FEEDBACKS */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-24">
          {feedbacks.map((fb, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
              className="bg-darkCard p-10 rounded-[2.5rem] border border-white/5 hover:border-brand-green/30 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Zap size={80} className="text-brand-green" />
              </div>
              
              <div className="flex items-center mb-6 relative z-10">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight group-hover:text-brand-green transition-colors">{fb.name}</h3>
                  <p className="text-brand-green/70 text-[10px] font-black uppercase tracking-[0.2em] mt-1">{fb.time}</p>
                </div>
              </div>
              
              <p className="text-slate-300 mb-0 italic leading-relaxed text-lg font-medium relative z-10">
                {fb.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-32">
          {[
            { value: '+13mil', label: 'Clientes Satisfeitos' },
            { value: '98%', label: 'Taxa de Satisfação' },
            { value: '+35', label: 'Anos de Excelência' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="text-center p-12 bg-darkCard rounded-[2.5rem] border border-white/5 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-brand-green/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-6xl sm:text-7xl font-black text-brand-green mb-4 tracking-tighter relative z-10">{stat.value}</div>
              <p className="text-slate-500 uppercase tracking-[0.3em] text-[10px] font-black relative z-10">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-darkCard p-12 sm:p-24 rounded-[3rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-brand-green)_0%,_transparent_70%)] opacity-5"></div>
          <h2 className="text-3xl sm:text-5xl font-black mb-10 tracking-tighter uppercase relative z-10">Você pode ser nossa próxima <br className="hidden sm:block" /> <span className="text-brand-green">história de sucesso!</span></h2>
          <button 
            onClick={handleStartTransformation}
            className="relative z-10 w-full sm:w-auto bg-brand-green text-white px-12 py-6 rounded-full font-black hover:scale-105 transition-all uppercase tracking-[0.2em] text-xs shadow-2xl shadow-brand-green/20"
          >
            Começar Agora a Sua Transformação
          </button>
        </div>
      </section>
    </div>
  );
}
