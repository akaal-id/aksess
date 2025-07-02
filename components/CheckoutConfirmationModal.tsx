/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { X, AlertCircle, ShoppingCart, Ticket as TicketIcon, CalendarDays, Clock, MapPin } from 'lucide-react';
import { CheckoutInfo, TransactionFormData, formatEventTime } from '../AksessApp';

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

const FALLBACK_POSTER_URL_MODAL = 'https://via.placeholder.com/640x360/cccccc/888888?text=Event+Poster'; // 16:9
const ERROR_POSTER_URL_MODAL = 'https://via.placeholder.com/640x360/f0f0f0/969696?text=Image+Error'; // 16:9


interface CheckoutConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  checkoutInfo: CheckoutInfo;
  fullFormData: TransactionFormData;
  effectiveTotalPrice: number;
}

const CheckoutConfirmationModal: React.FC<CheckoutConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  checkoutInfo,
  fullFormData,
  effectiveTotalPrice,
}) => {
  if (!isOpen) return null;

  const { event, selectedTickets } = checkoutInfo;
  const { fullName, email, phoneNumber, gender, dateOfBirth, additionalTicketHolders } = fullFormData;

  const totalTicketsBooked = selectedTickets.reduce((sum, ticket) => sum + ticket.quantity, 0);

  return (
    <div
      className="fixed inset-0 z-[101] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      aria-labelledby="checkout-confirmation-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-aksess-white text-aksess-navy p-4 md:p-6 lg:p-8 rounded-2xl shadow-2xl w-11/12 max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-4xl relative transform transition-all duration-300 ease-out scale-95 opacity-0 animate-modal-appear max-h-[90vh] overflow-y-auto custom-scrollbar-modal-outer">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-aksess-purple transition-colors z-20"
          aria-label="Tutup modal konfirmasi pembayaran"
        >
          <X size={24} />
        </button>

        <h2 id="checkout-confirmation-modal-title" className="text-xl md:text-2xl lg:text-3xl font-bold text-aksess-navy mb-6 text-center">
          Rincian Pesanan & Pembayaran
        </h2>

        <div className="bg-aksess-skyblue/10 border-l-4 border-aksess-skyblue text-aksess-navy p-4 mb-6 rounded-md" role="alert">
          <div className="flex">
            <div className="py-1"><AlertCircle className="h-6 w-6 text-aksess-skyblue mr-3" /></div>
            <div>
              <p className="font-bold text-aksess-navy">Perhatian!</p>
              <p className="text-sm text-aksess-navy/80">Pastikan data dan pesanan kamu sudah benar sebelum melanjutkan ke pembayaran.</p>
            </div>
          </div>
        </div>

        <div className="md:flex md:gap-8 pb-20 sm:pb-0"> {/* Added bottom padding for mobile sticky buttons */}
          {/* Left Column: Booker and Ticket Holder Info */}
          <div className="md:w-3/5 space-y-6 mb-6 md:mb-0 max-h-[50vh] sm:max-h-[55vh] md:max-h-[calc(100vh-350px)] overflow-y-auto pr-2 custom-scrollbar-modal">
            <div>
              <h3 className="text-xl font-semibold text-aksess-navy mb-3 border-b border-aksess-purple/30 pb-2">Informasi Pemesan</h3>
              <div className="space-y-1.5 text-sm">
                <p><strong className="text-sm font-medium text-aksess-navy/70 w-32 inline-block">Nama:</strong> <span className="text-sm text-aksess-navy">{fullName}</span></p>
                <p><strong className="text-sm font-medium text-aksess-navy/70 w-32 inline-block">Jenis Kelamin:</strong> <span className="text-sm text-aksess-navy">{gender || '-'}</span></p>
                <p><strong className="text-sm font-medium text-aksess-navy/70 w-32 inline-block">Tanggal Lahir:</strong> <span className="text-sm text-aksess-navy">{dateOfBirth ? new Date(dateOfBirth + 'T00:00:00').toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : '-'}</span></p>
                <p><strong className="text-sm font-medium text-aksess-navy/70 w-32 inline-block">Email:</strong> <span className="text-sm text-aksess-navy">{email}</span></p>
                <p><strong className="text-sm font-medium text-aksess-navy/70 w-32 inline-block">No. Telepon:</strong> <span className="text-sm text-aksess-navy">{phoneNumber}</span></p>
              </div>
            </div>

            {additionalTicketHolders && additionalTicketHolders.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-aksess-navy mb-3 border-b border-aksess-purple/30 pb-2">Informasi Identitas Tiket</h3>
                <div className="space-y-4">
                  {additionalTicketHolders.map((holder, index) => (
                    <div key={index} className="p-4 bg-aksess-purple/5 rounded-lg border border-aksess-purple/20">
                      <p className="font-semibold text-aksess-purple mb-1.5">Tiket {index + 1}</p>
                      <div className="space-y-0.5 text-sm">
                        <p><strong className="text-xs font-medium text-aksess-navy/70 w-28 inline-block">Nama:</strong> <span className="text-xs text-aksess-navy">{holder.fullName}</span></p>
                        <p><strong className="text-xs font-medium text-aksess-navy/70 w-28 inline-block">No. Ponsel:</strong> <span className="text-xs text-aksess-navy">{holder.whatsAppNumber}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Event Summary and Payment (Sticky Card Style) */}
          <div className="md:w-2/5">
            <div className="bg-aksess-white rounded-xl border border-aksess-navy/10 overflow-hidden shadow-sm">
              <div className="relative w-full aspect-[16/9] bg-gray-200">
                  <img
                    src={event.posterUrl || FALLBACK_POSTER_URL_MODAL}
                    alt={`Poster ${event.name}`}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.src = ERROR_POSTER_URL_MODAL)}
                  />
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-lg font-bold text-aksess-navy mb-2 leading-tight">{event.name}</h3>
                <div className="flex items-center text-xs text-aksess-navy/80 mb-1">
                  <CalendarDays size={14} className="mr-1.5 text-aksess-purple" />
                  <span>{event.dateDisplay}</span>
                </div>
                <div className="flex items-center text-xs text-aksess-navy/80 mb-1">
                  <Clock size={14} className="mr-1.5 text-aksess-purple" />
                  <span>{formatEventTime(event.timeDisplay)}</span>
                </div>
                <div className="flex items-center text-xs text-aksess-navy/80 mb-3">
                  <MapPin size={14} className="mr-1.5 text-aksess-purple" />
                  <span>{event.location}</span>
                </div>

                <div className="border-t border-aksess-purple/20 pt-3">
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="text-gray-700">Total ({totalTicketsBooked} Tiket)</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-semibold text-aksess-navy">Total Bayar</span>
                    <span className="text-2xl font-bold text-aksess-skyblue">{formatCurrency(effectiveTotalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-aksess-white py-4 -mx-4 px-4 sm:static sm:bg-transparent sm:py-0 sm:px-0 sm:mx-0 sm:border-t-0 sm:mt-8 border-t border-gray-200 z-10 flex flex-col sm:flex-row-reverse gap-3">
          <button
            onClick={onConfirm}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-transparent shadow-sm px-6 py-3 bg-aksess-skyblue text-aksess-navy text-base font-bold hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aksess-navy sm:text-sm transition-colors"
          >
            <ShoppingCart size={18} /> Bayar Sekarang
          </button>
          <button
            onClick={onClose}
            type="button"
            className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-aksess-purple text-aksess-purple shadow-sm px-6 py-3 bg-transparent text-base font-semibold hover:bg-aksess-purple/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aksess-purple sm:text-sm transition-colors"
          >
            Batalkan
          </button>
        </div>
      </div>
      <style>{`
        @keyframes modal-appear {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modal-appear {
          animation: modal-appear 0.3s forwards;
        }
        .custom-scrollbar-modal::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar-modal::-webkit-scrollbar-track {
          background: #f1f5f9; /* Tailwind gray-100 */
          border-radius: 10px;
        }
        .custom-scrollbar-modal::-webkit-scrollbar-thumb {
          background: #F4F6FB; /* var(--aksess-chino) */
          border-radius: 10px;
        }
        .custom-scrollbar-modal::-webkit-scrollbar-thumb:hover {
          background: #b8b495; /* Darker chino */
        }
        .custom-scrollbar-modal-outer::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar-modal-outer::-webkit-scrollbar-track {
          background: #e0e0e0; 
        }
        .custom-scrollbar-modal-outer::-webkit-scrollbar-thumb {
          background: #b8b495; /* Darker chino */
          border-radius: 3px;
        }
        .custom-scrollbar-modal-outer::-webkit-scrollbar-thumb:hover {
          background: #a09c82; /* Even darker chino */
        }
      `}</style>
    </div>
  );
};

export default CheckoutConfirmationModal;