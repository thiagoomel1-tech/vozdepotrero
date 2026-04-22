'use client';
import React, { useState, useCallback } from 'react';
import SearchBar from './SearchBar';
import SportBubbles from './SportBubbles';
import FutbolSection from './FutbolSection';
import AutomovilismoSection from './AutomovilismoSection';
import SeleccionSection from './SeleccionSection';
import BasquetSection from './BasquetSection';
import UpdateModal from './UpdateModal';
import { RefreshCw } from 'lucide-react';
import { Toaster } from 'sonner';

export type SportId = 'futbol' | 'automovilismo' | 'seleccion' | 'basquet' | null;

export default function MainDisplayClient() {
  const [activeSport, setActiveSport] = useState<SportId>(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const handleSearchResult = useCallback((sport: SportId) => {
    if (sport) setActiveSport(sport);
  }, []);

  return (
    <div className="py-6 space-y-6">
      <Toaster position="bottom-right" theme="dark" richColors />

      {/* Search */}
      <SearchBar onResult={handleSearchResult} />

      {/* Sport Bubbles */}
      <SportBubbles activeSport={activeSport} onSelect={setActiveSport} />

      {/* Dynamic content */}
      <div className="fade-in">
        {activeSport === 'futbol' && <FutbolSection />}
        {activeSport === 'automovilismo' && <AutomovilismoSection />}
        {activeSport === 'seleccion' && <SeleccionSection />}
        {activeSport === 'basquet' && <BasquetSection />}

        {activeSport === null && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-[hsl(var(--surface))] border border-[hsl(var(--border))] flex items-center justify-center mb-6">
              <span className="text-4xl">📺</span>
            </div>
            <p className="text-2xl font-semibold text-[hsl(var(--muted-foreground))]">
              Seleccioná un deporte
            </p>
            <p className="text-base text-[hsl(var(--muted))] mt-2">
              O usá el buscador para encontrar datos al instante
            </p>
          </div>
        )}
      </div>

      {/* Floating update button */}
      <button
        onClick={() => setUpdateModalOpen(true)}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-bold text-base shadow-2xl hover:brightness-110 active:scale-95 transition-all duration-150"
        aria-label="Actualizar data"
      >
        <RefreshCw size={20} />
        <span className="hidden sm:inline">Actualizar Data</span>
      </button>

      {updateModalOpen && (
        <UpdateModal onClose={() => setUpdateModalOpen(false)} activeSport={activeSport} />
      )}
    </div>
  );
}