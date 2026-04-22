'use client';
import React from 'react';
import Image from 'next/image';
import type { SportId } from './MainDisplayClient';

interface Bubble {
  id: SportId;
  label: string;
  emoji?: string;
  image?: string;
}

const bubbles: Bubble[] = [
  { id: 'futbol', label: 'Fútbol', emoji: '⚽' },
  { id: 'basquet', label: 'Básquet', emoji: '🏀' },
  { id: 'automovilismo', label: 'Automovilismo', emoji: '🏎️' },
  { id: 'seleccion', label: 'Selección Argentina', image: '/assets/images/argentina-1776786807980.png' },
];

interface SportBubblesProps {
  activeSport: SportId;
  onSelect: (sport: SportId) => void;
}

export default function SportBubbles({ activeSport, onSelect }: SportBubblesProps) {
  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
      {bubbles.map((b) => {
        const isActive = activeSport === b.id;
        return (
          <button
            key={`bubble-${b.id}`}
            onClick={() => onSelect(isActive ? null : b.id)}
            className={`flex-shrink-0 flex flex-col items-center gap-2 transition-all duration-200 active:scale-95 ${
              isActive ? 'opacity-100' : 'opacity-80 hover:opacity-100'
            }`}
            aria-pressed={isActive}
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-200 overflow-hidden ${
              isActive
                ? 'bg-[hsl(var(--primary)/0.15)] border-[hsl(var(--primary))] shadow-[0_0_16px_hsl(var(--primary)/0.3)]'
                : 'bg-[hsl(var(--surface))] border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.4)] hover:bg-[hsl(var(--surface-elevated))]'
            }`}>
              {b.image ? (
                <Image
                  src={b.image}
                  alt={`Escudo ${b.label}`}
                  width={56}
                  height={56}
                  className="object-contain w-14 h-14"
                />
              ) : (
                <span className="text-3xl">{b.emoji}</span>
              )}
            </div>
            <span className={`text-sm font-semibold text-center leading-tight transition-colors duration-200 ${
              isActive ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))]'
            }`}>
              {b.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}