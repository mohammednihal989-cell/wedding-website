import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PasswordGateModal({ clientName, correctPassword, onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-dark/95 backdrop-blur-2xl p-4 text-ivory font-sans animate-fade-in">
      <div className="max-w-md w-full rounded-3xl bg-charcoal border border-gold/30 p-8 shadow-2xl text-center space-y-6">
        <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto text-gold shadow-gold-glow">
          <Lock className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] tracking-ultra uppercase text-gold font-semibold">
            PRIVATE DIGITAL MAGAZINE
          </span>
          <h2 className="font-serif text-3xl text-ivory">
            {clientName || 'Protected Wedding Magazine'}
          </h2>
          <p className="text-xs text-ivory/70 font-light">
            This digital memory book is password protected by the couple.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/20 border border-red-500 text-red-400 text-xs text-center font-medium">
            Incorrect password. Please verify with the couple.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Enter Client Access Password"
            className="w-full px-4 py-3 rounded-xl bg-charcoal-light border border-gold/30 text-ivory text-sm focus:outline-none focus:border-gold text-center tracking-widest"
          />

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gold text-charcoal font-semibold text-xs tracking-widest uppercase hover:bg-gold-light transition-all shadow-gold-glow flex items-center justify-center gap-2"
          >
            <span>Unlock Private Magazine</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-gold/20 text-[10px] tracking-widest uppercase text-ivory/40">
          PRESERVED BY NIHALCO CREATIVE STUDIO
        </div>
      </div>
    </div>
  );
}
