import React, { useEffect, useRef } from 'react';
import { Sparkles, ArrowDown, ChevronDown, Lock } from 'lucide-react';

export default function NihalcoHero({ config, onOpenAdminLogin }) {
  const canvasRef = useRef(null);

  // Animated particle light mesh effect (Abstract creative agency feel, zero wedding photos)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle light trails
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between items-center text-center overflow-hidden bg-charcoal-dark text-ivory pt-20 pb-12 px-4 sm:px-6 lg:px-8 selection:bg-gold selection:text-charcoal font-sans">
      {/* Abstract Animated Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-60"
      />

      {/* Cinematic Abstract Gradient Mesh Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/15 via-charcoal/40 to-charcoal-dark pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[140px] pointer-events-none animate-pulse-subtle" />

      {/* Top Header Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between border-b border-gold/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center font-serif text-gold text-sm font-bold tracking-widest shadow-gold-glow">
            N
          </div>
          <span className="font-serif tracking-ultra text-sm font-semibold text-gold">
            {config.companyName || 'NIHALCO'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#about"
            className="text-xs uppercase tracking-widest text-ivory/70 hover:text-gold transition-colors hidden sm:inline"
          >
            ABOUT
          </a>
          <a
            href="#services"
            className="text-xs uppercase tracking-widest text-ivory/70 hover:text-gold transition-colors hidden sm:inline"
          >
            SERVICES
          </a>

          {/* Admin Login Trigger */}
          <button
            onClick={onOpenAdminLogin}
            className="flex items-center gap-1.5 px-4 py-2 text-xs tracking-widest uppercase rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-charcoal transition-all shadow-gold-glow"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>ADMIN LOGIN</span>
          </button>
        </div>
      </div>

      {/* Hero Center Branding Box */}
      <div className="relative z-10 my-auto py-16 max-w-4xl mx-auto flex flex-col items-center">
        <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs text-gold font-medium uppercase tracking-ultra">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>DIGITAL MEDIA & CREATIVE STUDIO</span>
        </div>

        {/* Central Company Name */}
        <h1 className="font-serif text-6xl sm:text-8xl md:text-9xl tracking-ultra uppercase text-ivory font-normal text-glow leading-none">
          {config.companyName || 'NIHALCO'}
        </h1>

        <p className="mt-6 font-serif italic text-xl sm:text-3xl text-gold-light max-w-2xl leading-relaxed font-light">
          "{config.companyTagline || 'Stories, beautifully preserved.'}"
        </p>

        <p className="mt-4 text-xs sm:text-sm tracking-widest uppercase text-ivory/70 max-w-lg font-light leading-relaxed">
          {config.heroSubtitle ||
            'A private digital media studio crafting cinematic wedding storybooks and eternal memory archives.'}
        </p>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="relative z-10 flex flex-col items-center gap-2 text-xs tracking-ultra uppercase text-ivory/60 animate-bounce">
        <a href="#services" className="flex flex-col items-center gap-1 hover:text-gold transition-colors">
          <span>EXPLORE SERVICES</span>
          <ChevronDown className="w-4 h-4 text-gold" />
        </a>
      </div>
    </section>
  );
}
