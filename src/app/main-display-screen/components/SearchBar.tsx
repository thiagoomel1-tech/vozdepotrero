'use client';
import React, { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';
import type { SportId } from './MainDisplayClient';

interface SearchBarProps {
  onResult: (sport: SportId) => void;
}

const searchHints = [
  'plantel boca', 'goleadores river', 'colapinto', 'puntos argentina',
  'títulos newells', 'descensos', 'tabla f1', 'constructores', 'calendario f1',
];

// Backend integration: replace with API call to /api/search?q={query}
function resolveSearch(query: string): SportId {
  const q = query.toLowerCase();
  if (q.includes('boca') || q.includes('river') || q.includes('central') || q.includes("newells") || q.includes("newell") || q.includes('plantel') || q.includes('goleador') || q.includes('descenso') || q.includes('fútbol') || q.includes('futbol')) return 'futbol';
  if (q.includes('f1') || q.includes('formula') || q.includes('colapinto') || q.includes('verstappen') || q.includes('hamilton') || q.includes('piloto') || q.includes('constructor') || q.includes('calendario') || q.includes('carrera') || q.includes('auto') || q.includes('ferrari') || q.includes('mercedes') || q.includes('mclaren') || q.includes('norris') || q.includes('leclerc') || q.includes('sainz') || q.includes('gasly') || q.includes('antonelli') || q.includes('russell') || q.includes('piastri')) return 'automovilismo';
  if (q.includes('seleccion') || q.includes('selección') || q.includes('argentina') || q.includes('messi') || q.includes('mundial') || q.includes('copa')) return 'seleccion';
  if (q.includes('basquet') || q.includes('básquet') || q.includes('básket') || q.includes('basket') || q.includes('náutico') || q.includes('nautico') || q.includes('gimnasia')) return 'basquet';
  return null;
}

export default function SearchBar({ onResult }: SearchBarProps) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    const result = resolveSearch(value);
    onResult(result);
  };

  const handleHint = (hint: string) => {
    setValue(hint);
    const result = resolveSearch(hint);
    onResult(result);
    inputRef.current?.blur();
    setFocused(false);
  };

  const clear = () => {
    setValue('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`flex items-center gap-3 w-full rounded-2xl border transition-all duration-200 ${
          focused
            ? 'border-[hsl(var(--primary))] bg-[hsl(var(--surface))] shadow-[0_0_0_3px_hsl(var(--primary)/0.15)]'
            : 'border-[hsl(var(--border))] bg-[hsl(var(--surface))]'
        }`}>
          <Search size={22} className="ml-5 flex-shrink-0 text-[hsl(var(--muted-foreground))]" />
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder="Buscá: plantel boca, goleadores river, colapinto, tabla f1..."
            className="flex-1 bg-transparent py-4 text-lg font-medium text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted))] outline-none"
          />
          {value && (
            <button
              type="button"
              onClick={clear}
              className="p-2 mr-2 rounded-lg text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface-elevated))] transition-all duration-150"
              aria-label="Limpiar búsqueda"
            >
              <X size={18} />
            </button>
          )}
          <button
            type="submit"
            className="mr-3 px-5 py-2.5 rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-bold text-sm hover:brightness-110 active:scale-95 transition-all duration-150"
          >
            Buscar
          </button>
        </div>
      </form>

      {/* Hints dropdown */}
      {focused && (
        <div className="absolute top-full left-0 right-0 mt-2 z-30 bg-[hsl(var(--surface))] border border-[hsl(var(--border))] rounded-2xl shadow-2xl overflow-hidden fade-in">
          <p className="px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">
            Búsquedas rápidas
          </p>
          <div className="flex flex-wrap gap-2 px-4 pb-4">
            {searchHints.map((hint) => (
              <button
                key={`hint-${hint}`}
                onMouseDown={() => handleHint(hint)}
                className="px-3 py-1.5 rounded-full text-sm font-medium bg-[hsl(var(--surface-elevated))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)] hover:text-[hsl(var(--primary))] transition-all duration-150"
              >
                {hint}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}