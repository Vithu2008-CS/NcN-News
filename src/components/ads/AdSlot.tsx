import React from 'react';

interface AdSlotProps {
  slotId: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
  label?: string;
}

const AdSlot = ({ slotId, format = 'auto', className = '', label = 'Advertisement' }: AdSlotProps) => {
  return (
    <div className={`my-8 w-full flex flex-col items-center justify-center overflow-hidden ${className}`}>
      <span className="text-[10px] uppercase text-slate-400 mb-1 tracking-widest">{label}</span>
      <div 
        className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center min-h-[100px] sm:min-h-[250px]"
        data-ad-slot={slotId}
        data-ad-format={format}
      >
        <span className="text-xs text-slate-400 text-center px-4">
          Google AdSense Slot {slotId}<br />
          (Dynamic injection placeholder)
        </span>
      </div>
    </div>
  );
};

export default AdSlot;
