/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { X, Star, Briefcase, CheckCircle } from 'lucide-react';
import Logo from './Logo';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, onSubscribe }) => {
  if (!isOpen) return null;

  const benefits = [
    "Akses jaringan profesional yang lebih luas.",
    "Temukan vendor dan supplier terpercaya.",
    "Terhubung dengan investor potensial.",
    "Peluang kolaborasi bisnis tak terbatas.",
    "Dukungan prioritas dari tim Aksess."
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-aksess-auth-background/80 backdrop-blur-md p-4 animate-fade-in"
      aria-labelledby="subscription-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-gradient-to-br from-aksess-navy via-aksess-navy to-aksess-purple/80 text-aksess-white w-full max-w-lg rounded-2xl shadow-2xl border border-aksess-skyblue/30 overflow-hidden transform transition-all duration-300 ease-out scale-95 opacity-0 animate-modal-appear">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-aksess-skyblue/70 hover:text-aksess-skyblue transition-colors z-20"
          aria-label="Tutup modal berlangganan"
        >
          <X size={26} />
        </button>
        
        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <Briefcase size={48} className="mx-auto mb-4 text-aksess-skyblue" />
            <h1 id="subscription-modal-title" className="text-2xl sm:text-3xl font-bold text-white">
              Akses Eksklusif <span className="text-aksess-skyblue">Business Matching</span>
            </h1>
            <p className="text-sm sm:text-base text-white/80 mt-3">
              Untuk mengakses fitur Business Matching dan terhubung dengan ribuan peluang bisnis, Anda perlu berlangganan layanan premium Aksess.
            </p>
          </div>

          <div className="bg-white/10 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold text-aksess-skyblue mb-2 text-center sm:text-left">Keuntungan Berlangganan:</h2>
            <ul className="space-y-2 text-sm">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle size={18} className="text-aksess-skyblue mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white/90">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-3">
            {/* Container for the button - ribbon removed */}
            <div className="relative w-full rounded-lg"> 
                <button
                onClick={onSubscribe} // Action is now active
                type="button"
                // removed disabled attribute
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-bold
                            bg-aksess-skyblue text-aksess-navy hover:bg-opacity-90 transform hover:scale-105
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aksess-navy focus:ring-offset-aksess-navy
                            transition-all duration-300" 
                aria-label="Subscribe Sekarang"
                >
                <Star size={20} className="mr-2" /> Subscribe Sekarang
                </button>
                {/* Coming Soon Ribbon Removed */}
            </div>

            <button
              onClick={onClose}
              type="button"
              className="w-full flex justify-center items-center py-3 px-4 border border-aksess-skyblue/50 rounded-lg shadow-sm text-base font-medium
                         text-aksess-skyblue hover:bg-aksess-skyblue/10
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-aksess-navy focus:ring-white
                         transition-colors"
            >
              Batal
            </button>
          </div>
          <p className="text-xs text-white/60 mt-6 text-center">
            Dengan berlangganan, Anda menyetujui Syarat & Ketentuan Layanan Premium Aksess.
          </p>
        </div>
      </div>
      <style>{`
        .animate-modal-appear { 
          animation: modalAppear 0.3s ease-out forwards;
        }
        @keyframes modalAppear {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default SubscriptionModal;