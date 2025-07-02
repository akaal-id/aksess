
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { PageName } from '../AksessApp'; // Import PageName

export interface BusinessMatchingCardData {
  id: number;
  name: string;
  logoUrl?: string;
  matchScore: number; 
  sector: string;
  location: string;
  budget: string;
  lat?: number;
  lng?: number;
  isOnline?: boolean; 
  specialFeatures?: string[];
  // For CompanyDetailPage
  description?: string;
  keyMetrics?: { label: string; value: string; icon?: React.ElementType }[];
  portfolio?: { title: string; description: string; imageUrl: string }[];
  reviews?: { author: string; rating: number; comment: string; date: string }[];
  contact?: { phone?: string; email?: string; website?: string };
  availability?: { day: string; slots: string[] }[]; 
}

interface BusinessMatchingCardProps extends BusinessMatchingCardData {
  onNavigate: (page: PageName, data?: any) => void; // Updated to use onNavigate
  // onOpenMeetingScheduler prop is removed, will be handled by CompanyDetailPage
}

const BusinessMatchingCard: React.FC<BusinessMatchingCardProps> = (props) => {
  const {
    name,
    logoUrl = 'https://via.placeholder.com/150/F0F3F7/8D94A8?text=Logo',
    sector,
    location,
    budget,
    specialFeatures = [],
    onNavigate, 
  } = props;

  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsBookmarked(!isBookmarked);
    alert(isBookmarked ? `${name} dihapus dari simpanan.` : `${name} disimpan.`);
  };
  
  const badgesToDisplay = specialFeatures.length > 0 
    ? specialFeatures.slice(0, 3) 
    : ["Verified", "Respon Cepat", "Terdaftar OJK"].slice(0,3); 

  const handleCardClick = () => {
    // Pass all vendor data (props) to the detail page
    onNavigate('businessDetail', props); 
  };

  return (
    <div 
      className="bg-aksess-white rounded-xl border border-aksess-navy/10 hover:border-aksess-purple/30 overflow-hidden transition-all duration-300 group flex flex-col h-full shadow-sm hover:shadow-lg cursor-pointer"
      onClick={handleCardClick} // Main card click navigates
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(); }}
      aria-label={`Lihat detail untuk ${name}`}
    >
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-aksess-purple/20 flex-shrink-0 bg-gray-100 flex items-center justify-center">
            <img
              src={logoUrl}
              alt={`Logo ${name}`}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
              onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Logo')}
            />
          </div>
          <button
            onClick={handleToggleBookmark}
            className="p-2 text-aksess-skyblue hover:text-aksess-skyblue/80 focus:outline-none"
            aria-label={isBookmarked ? `Hapus ${name} dari simpanan` : `Simpan ${name}`}
          >
            <Star size={24} fill={isBookmarked ? "currentColor" : "none"} className="transition-colors duration-200" />
          </button>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-aksess-deep-navy group-hover:text-aksess-purple transition-colors mb-2 truncate" title={name}>
          {name}
        </h3>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {badgesToDisplay.map((feature, index) => (
            <span 
              key={index} 
              className="text-[10px] sm:text-xs bg-aksess-purple/10 text-aksess-purple font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm"
            >
              <CheckCircle size={13} className="opacity-80" /> {feature}
            </span>
          ))}
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-5 flex-grow">
          <div className="flex items-center">
            <Briefcase size={15} className="mr-2.5 text-aksess-purple/80 flex-shrink-0" />
            <span>Sektor: <strong className="text-aksess-deep-navy/90">{sector}</strong></span>
          </div>
          <div className="flex items-center">
            <MapPin size={15} className="mr-2.5 text-aksess-purple/80 flex-shrink-0" />
            <span className="truncate" title={location}>Lokasi: <strong className="text-aksess-deep-navy/90">{location}</strong></span>
          </div>
          <div className="flex items-center">
            <DollarSign size={15} className="mr-2.5 text-aksess-purple/80 flex-shrink-0" />
            <span>Budget: <strong className="text-aksess-deep-navy/90">{budget}</strong></span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <button // This button is now part of the card's main click area, but can retain its style
            className="w-full text-aksess-purple font-semibold py-2.5 px-4 rounded-lg
                       transition-all duration-300
                       flex items-center justify-center group/button
                       hover:bg-aksess-purple/10"
            aria-label={`Selengkapnya tentang ${name}`}
          >
            Selengkapnya
            <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover/button:translate-x-1 group-focus-visible/button:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessMatchingCard;
