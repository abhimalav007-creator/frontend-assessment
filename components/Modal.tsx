import React from 'react';

type Props = { open: boolean; onClose: ()=>void; title?: string; children: React.ReactNode };

export default function Modal({ open, onClose, title, children }: Props){
  if(!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 max-w-lg w-full shadow-xl">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} className="px-2 py-1 border rounded-lg">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}