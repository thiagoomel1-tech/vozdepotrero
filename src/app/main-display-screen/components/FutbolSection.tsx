'use client';

import React, { useEffect, useState } from 'react';
import { teamsData } from '@/lib/sportsData';
import type { Player, Position } from '@/lib/sportsData';
import { Trophy, Users, Target, AlertTriangle } from 'lucide-react';

type TeamId = 'boca' | 'river' | 'central' | 'newells';

const teamLabels: Record<TeamId, string> = {
  boca: 'Boca Juniors',
  river: 'River Plate',
  central: 'Rosario Central',
  newells: "Newell's Old Boys",
};

type View = 'plantel' | 'goleadores' | 'copas' | 'historia';

export default function FutbolSection() {
  const [activeTeam, setActiveTeam] = useState<TeamId>('boca');
  const [view, setView] = useState<View>('plantel');

  const [players, setPlayers] = useState<Player[]>([]);
  const [dt, setDt] = useState('');
  const [capitan, setCapitan] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('sportsData');

    if (saved) {
      const data = JSON.parse(saved);

      if (data?.[activeTeam]) {
        setPlayers(data[activeTeam].players || []);
        setDt(data[activeTeam].dt || '');
        setCapitan(data[activeTeam].capitan || '');
        return;
      }
    }

    setPlayers(teamsData[activeTeam].players);
    setDt(teamsData[activeTeam].dt);
    setCapitan(teamsData[activeTeam].capitan);
  }, [activeTeam]);

  const posColors: Record<Position, string> = {
    ARQ: 'text-amber-400',
    DEF: 'text-blue-400',
    MED: 'text-emerald-400',
    DEL: 'text-red-400',
  };

  const injuredBadge = (injured?: boolean) =>
    injured
      ? 'bg-red-500/20 text-red-400 border-red-500/30'
      : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';

  const tabs: { id: View; label: string; icon: React.ElementType }[] = [
    { id: 'plantel', label: 'Plantel', icon: Users },
    { id: 'goleadores', label: 'Goleadores', icon: Target },
    { id: 'copas', label: 'Copas', icon: Trophy },
    { id: 'historia', label: 'Historia', icon: AlertTriangle },
  ];

  return (
    <div className="space-y-5">

      {/* TEAM SELECTOR (burbujas más chicas) */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {Object.entries(teamLabels).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setActiveTeam(id as TeamId)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
              activeTeam === id
                ? 'bg-[hsl(var(--primary))] text-black'
                : 'bg-[hsl(var(--surface-elevated))] text-white hover:opacity-80'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* HEADER INFO */}
      <div className="tv-card space-y-2">
        <h2 className="text-2xl font-bold">{teamLabels[activeTeam]}</h2>
        <p className="text-sm text-[hsl(var(--muted))]">
          DT: <span className="font-semibold text-white">{dt}</span> · Capitán:{' '}
          <span className="font-semibold text-white">{capitan}</span>
        </p>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="bg-[hsl(var(--surface-elevated))] rounded-xl p-3 text-center">
            <p className="text-xs text-[hsl(var(--muted))]">Jugadores</p>
            <p className="text-2xl font-bold text-white">{players.length}</p>
          </div>

          <div className="bg-[hsl(var(--surface-elevated))] rounded-xl p-3 text-center">
            <p className="text-xs text-[hsl(var(--muted))]">Lesionados</p>
            <p className="text-2xl font-bold text-red-400">
              {players.filter(p => p.injured).length}
            </p>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                view === tab.id
                  ? 'bg-[hsl(var(--primary))] text-black'
                  : 'bg-[hsl(var(--surface-elevated))] text-white'
              }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* PLANTEL */}
      {view === 'plantel' && (
        <div className="space-y-3">
          {players.length === 0 && (
            <div className="tv-card text-center text-[hsl(var(--muted))]">
              Sin jugadores cargados
            </div>
          )}

          {players.map(player => (
            <div
              key={player.id}
              className="bg-[#1A1A1A] rounded-2xl p-4 flex items-center justify-between"
            >
              {/* left */}
              <div className="flex items-center gap-3">
                <div className="text-xl font-bold text-[hsl(var(--primary))] w-10 text-center">
                  {player.number}
                </div>

                <div>
                  <p className="text-white font-semibold">{player.name}</p>
                  <p className={`text-sm ${posColors[player.position]}`}>
                    {player.position}
                  </p>
                </div>
              </div>

              {/* right */}
              <div
                className={`px-3 py-1 rounded-full text-xs font-bold border ${injuredBadge(
                  player.injured
                )}`}
              >
                {player.injured ? 'Lesionado' : 'Disponible'}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* GOLEADORES (placeholder estético, sin romper datos) */}
      {view === 'goleadores' && (
        <div className="tv-card text-center text-[hsl(var(--muted))]">
          Sección de goleadores (conectar con data existente)
        </div>
      )}

      {/* COPAS */}
      {view === 'copas' && (
        <div className="tv-card text-center text-[hsl(var(--muted))]">
          Sección de copas (grid estilo Selección Argentina)
        </div>
      )}

      {/* HISTORIA */}
      {view === 'historia' && (
        <div className="tv-card text-center text-[hsl(var(--muted))]">
          Historia del club (pendiente mantener dataset original)
        </div>
      )}
    </div>
  );
}
