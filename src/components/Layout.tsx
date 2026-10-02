import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Instagram, MessageCircle, Facebook, Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import FloatingCTA from './FloatingCTA';
import { GENERAL_PHONE } from '../constants';

const Logo = ({ className, footer, white }: { className?: string, footer?: boolean, white?: boolean }) => (
  <div className={`flex items-center ${footer ? 'justify-center' : ''}`}>
    <img 
      src={(footer || white) ? "./geral/atenas-academia_2015_logo_branco.png" : "./geral/atenas-academia_2015_logo.png"}
      alt="Academia Atenas"
     
      className={className || (footer ? "h-12 sm:h-20 w-auto" : "h-10 sm:h-14 w-auto")}
     
    />
  </div>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { scrollY, scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const mainLinks = [
    { name: 'Unidades', path: '/#unidades', isAnchor: true },
    { name: 'Planos', path: '/#planos', isAnchor: true },
    { name: 'Contato', path: '/contato', isAnchor: false },
  ];

  const extraLinks = [
    { name: 'Feedbacks', path: '/feedbacks', isAnchor: false },
    { name: 'Dúvidas', path: '/faq', isAnchor: false },
    { name: 'Serviços', path: '/#servicos', isAnchor: true },
  ];

  const [isExtraMenuOpen, setIsExtraMenuOpen] = React.useState(false);

  const handleNavClick = (link: any) => {
    setIsMenuOpen(false);
    setIsExtraMenuOpen(false);
    if (link.isAnchor) {
      if (location.pathname === '/') {
        const element = document.getElementById(link.path.replace('/#', ''));
        element?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(link.path.replace('/#', ''));
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      navigate(link.path);
    }
  };

  return (
    <div className="min-h-screen bg-darkBg text-white selection:bg-brand-green selection:text-white">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed right-0 top-0 bottom-0 w-1 bg-brand-green z-[100] origin-top hidden md:block"
        style={{ scaleY }}
      />
      
      {/* HEADER */}
      <header 
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-brand-blue/95 backdrop-blur-xl py-2 shadow-2xl border-b border-white/10' 
            : 'bg-brand-blue py-4 lg:py-6 border-b border-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-8 flex justify-between items-center">
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="shrink-0 transition-transform duration-500 hover:scale-105"
          >
            <Logo className={`${isScrolled ? 'h-6 sm:h-8 md:h-10' : 'h-7 sm:h-10 md:h-12'} w-auto transition-all duration-500`} white />
          </Link>
          
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center space-x-8 font-black uppercase text-[11px] tracking-[0.2em]">
              {mainLinks.map((link) => (
                <button 
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className={`relative hover:text-brand-green transition-colors uppercase group ${
                    location.pathname === link.path ? 'text-brand-green' : 'text-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-green transition-all duration-300 group-hover:w-full ${
                    location.pathname === link.path ? 'w-full' : ''
                  }`}></span>
                </button>
              ))}
              
              {/* Extra Menu (Desktop) */}
              <div className="relative">
                <button 
                  onClick={() => setIsExtraMenuOpen(!isExtraMenuOpen)}
                  className={`flex items-center gap-2 hover:text-brand-green transition-colors uppercase ${isExtraMenuOpen ? 'text-brand-green' : 'text-slate-300'}`}
                >
                  <Menu size={16} />
                </button>
                
                <AnimatePresence>
                  {isExtraMenuOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-[-1]" 
                        onClick={() => setIsExtraMenuOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-4 w-48 bg-darkCard border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                      >
                        <div className="py-2">
                          {extraLinks.map((link) => (
                            <button
                              key={link.name}
                              onClick={() => handleNavClick(link)}
                              className="w-full text-left px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:bg-white/5 hover:text-brand-green transition-all"
                            >
                              {link.name}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            <button 
              onClick={() => {
                if (location.pathname.startsWith('/unidade/')) {
                  navigate('/');
                } else {
                  handleNavClick({ path: '/#unidades', isAnchor: true });
                }
              }}
              className="bg-brand-green text-white px-8 py-3 rounded-full font-black text-[11px] hover:bg-brand-green/90 transition-all uppercase tracking-widest shadow-lg shadow-brand-green/20"
            >
              {location.pathname.startsWith('/unidade/') ? 'VOLTAR' : 'MATRICULE-SE'}
            </button>
          </div>

          <div className="flex items-center lg:hidden">
            <button 
              className="bg-white/10 text-white p-2 rounded-xl hover:bg-white/20 transition-all shadow-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] lg:hidden bg-brand-blue flex flex-col"
          >
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center px-4 sm:px-8 py-2 border-b border-white/5 bg-brand-blue">
              <Link 
                to="/" 
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="shrink-0"
              >
                <Logo className="h-7 sm:h-10 w-auto" white />
              </Link>
              <button 
                className="text-white p-2"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-8 py-8 flex flex-col gap-8 overflow-y-auto">
              {[...mainLinks, ...extraLinks].map((link, idx) => (
                <motion.button 
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleNavClick(link)}
                  className="text-3xl sm:text-4xl uppercase tracking-tighter hover:text-brand-green text-left font-black"
                >
                  {link.name}
                </motion.button>
              ))}
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-6"
              >
                <a href={`tel:${GENERAL_PHONE.replace(/\D/g, '')}`} className="text-lg uppercase tracking-widest text-white hover:text-brand-green transition-colors flex items-center gap-3 font-bold">
                  <Phone size={20} className="text-white" /> {GENERAL_PHONE}
                </a>
                
                <div className="flex gap-6">
                  <a href="https://instagram.com/atenasacademia" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    <Instagram size={24} />
                  </a>
                  <a href="https://facebook.com/atenasacademia.oficial" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    <Facebook size={24} />
                  </a>
                  <a href={`https://wa.me/55${GENERAL_PHONE.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    <MessageCircle size={24} />
                  </a>
                </div>
              </motion.div>
              
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => {
                  setIsMenuOpen(false);
                  if (location.pathname.startsWith('/unidade/')) {
                    navigate('/');
                  } else {
                    handleNavClick({ path: '/#unidades', isAnchor: true });
                  }
                }}
                className="mt-4 bg-brand-green text-white py-6 rounded-2xl font-black text-sm hover:bg-brand-green/90 transition-all uppercase tracking-[0.2em] shadow-xl shadow-brand-green/20"
              >
                {location.pathname.startsWith('/unidade/') ? 'VOLTAR' : 'MATRICULE-SE AGORA'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>{children}</main>
      <FloatingCTA />

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/10 text-center bg-darkBg">
        <div className="container mx-auto px-6">
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mb-8 inline-block"
          >
            <Logo className="h-12 sm:h-16 w-auto" footer />
          </Link>
          <p className="text-slate-500 text-sm mb-6 uppercase tracking-widest">
            © 2026 Academia Atenas. Todos os direitos reservados.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="https://instagram.com/atenasacademia" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-green transition-colors">
              <Instagram size={24} />
            </a>
            <a href="https://facebook.com/atenasacademia.oficial" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-green transition-colors">
              <Facebook size={24} />
            </a>
            <a href={`https://wa.me/55${GENERAL_PHONE.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-green transition-colors">
              <MessageCircle size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
