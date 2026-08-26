import React, { useState } from 'react';
import { X, Lock, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'No12can34') {
      onLoginSuccess();
      setPassword('');
      setError(false);
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-dark/90 backdrop-blur-xl p-4 animate-fade-in text-ivory font-sans">
      <div className="max-w-md w-full rounded-2xl bg-charcoal border border-gold/40 p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gold/20 text-ivory transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto text-gold mb-2 shadow-gold-glow">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl text-ivory">
            NIHALCO Admin Studio Login
          </h3>
          <p className="text-xs text-ivory/60 font-light">
            Enter administrator passcode to access client management and settings.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500 text-red-400 text-xs text-center font-medium">
            Incorrect passcode. Please try again.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gold mb-1 font-medium">
              Administrator Passcode *
            </label>
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter passcode"
              className="w-full px-4 py-3 rounded-xl bg-charcoal-light border border-gold/30 text-ivory text-sm focus:outline-none focus:border-gold"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gold text-charcoal font-semibold text-xs tracking-widest uppercase hover:bg-gold-light transition-all shadow-gold-glow flex items-center justify-center gap-2"
          >
            <span>Authenticate Admin Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gold/20 text-center text-[10px] text-ivory/40 tracking-wider">
          PROTECTED MULTI-CLIENT STORAGE SYSTEM
        </div>
      </div>
    </div>
  );
}
