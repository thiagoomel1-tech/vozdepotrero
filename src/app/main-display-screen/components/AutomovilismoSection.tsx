'use client';
import React, { useState, useCallback } from 'react';
import { f1Pilots, f1Constructors, f1Calendar } from '@/lib/sportsData';
import type { F1Pilot, F1Constructor, F1Race } from '@/lib/sportsData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Zap, Edit3, Check, X } from 'lucide-react';

type AutoChip = 'pilotos' | 'constructores' | 'calendario' | 'equipos';

const autoChips: { id: AutoChip; label: string }[] = [
  { id: 'pilotos', label: 'Pilotos' },
  { id: 'constructores', label: 'Constructores' },
  { id: 'calendario', label: 'Calendario' },
  { id: 'equipos', label: 'Equipos' },
];

const pilotChips = ['Antonelli', 'Russell', 'Leclerc', 'Hamilton', 'Norris', 'Piastri', 'Verstappen', 'Colapinto', 'Gasly', 'Sainz'];

const teamColors: Record<string, string> = {
  Mercedes: '#00D2BE',
  Ferrari: '#DC0000',
  McLaren: '#FF8000',
  'Red Bull': '#3671C6',
  Alpine: '#FF87BC',
  Williams: '#005AFF',
  Haas: '#B6BABD',
  'Racing Bulls': '#6692FF',
  Audi: '#E6002D',
  Cadillac: '#B0B0B0',
  'Aston Martin': '#358C75',
};

// ─── INLINE EDIT ─────────────────────────────────────────────────────────────

function InlineEdit({ value, onSave, type = 'text', className = '' }: {
  value: string | number;
  onSave: (v: string | number) => void;
  type?: 'text' | 'number';
  className?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));

  const commit = () => {
    const val = type === 'number' ? (parseInt(draft, 10) || 0) : draft;
    onSave(val);
    setEditing(false);
  };

  if (editing) {
    return (
      <span className="inline-flex items-center gap-1">
        <input
          type={type}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className={`bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--primary))] rounded-lg px-2 py-0.5 text-[hsl(var(--foreground))] outline-none ${className}`}
          autoFocus
          onKeyDown={(e) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') setEditing(false); }}
        />
        <button onClick={commit} className="text-[hsl(var(--success))]"><Check size={12} /></button>
        <button onClick={() => setEditing(false)} className="text-[hsl(var(--muted-foreground))]"><X size={12} /></button>
      </span>
    );
  }

  return (
    <button onClick={() => { setDraft(String(value)); setEditing(true); }} className="group inline-flex items-center gap-1 hover:opacity-70 transition-opacity">
      <span>{value}</span>
      <Edit3 size={10} className="text-[hsl(var(--muted))] opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}

// ─── PILOTOS ─────────────────────────────────────────────────────────────────

function PilotosView() {
  const [pilots, setPilots] = useState<F1Pilot[]>(f1Pilots);
  const [selectedPilot, setSelectedPilot] = useState<F1Pilot | null>(null);

  const updatePilot = useCallback((id: string, field: keyof F1Pilot, val: string | number) => {
    setPilots((prev) => {
      const updated = prev.map((p) => p.id === id ? { ...p, [field]: val } : p);
      // re-sort by points
      return [...updated].sort((a, b) => b.points - a.points).map((p, i) => ({ ...p, pos: i + 1 }));
    });
    setSelectedPilot((prev) => prev?.id === id ? { ...prev, [field]: val } : prev);
  }, []);

  const handlePilotChip = (name: string) => {
    const pilot = pilots.find((p) => p.name.includes(name));
    setSelectedPilot(pilot && selectedPilot?.id === pilot.id ? null : (pilot ?? null));
  };

  return (
    <div className="space-y-5 fade-in">
      {/* Pilot chips */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {pilotChips.map((name) => {
          const pilot = pilots.find((p) => p.name.includes(name));
          const isSelected = selectedPilot?.name.includes(name);
          return (
            <button
              key={`pilot-chip-${name}`}
              onClick={() => handlePilotChip(name)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 active:scale-95 ${
                isSelected ? 'chip-active' : 'chip-inactive hover:border-[hsl(var(--primary)/0.4)]'
              } ${pilot?.highlight ? 'border-[hsl(var(--primary)/0.6)] text-[hsl(var(--primary))]' : ''}`}
            >
              {pilot?.nationality} {name}
            </button>
          );
        })}
      </div>

      {/* Selected pilot card */}
      {selectedPilot && (
        <div className="tv-card border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.05)] fade-in">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))] mb-1">Piloto</p>
              <p className="text-4xl font-bold text-[hsl(var(--foreground))]">
                {selectedPilot.nationality} {selectedPilot.name}
              </p>
              <p className="text-xl text-[hsl(var(--muted-foreground))] mt-1">{selectedPilot.team}</p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))] mb-1">Posición</p>
                <p className="text-5xl font-bold font-mono text-[hsl(var(--primary))]">P{selectedPilot.pos}</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))] mb-1">Puntos</p>
                <p className="text-5xl font-bold font-mono text-[hsl(var(--foreground))]">
                  <InlineEdit
                    value={selectedPilot.points}
                    onSave={(v) => updatePilot(selectedPilot.id, 'points', v)}
                    type="number"
                    className="w-20 text-center text-4xl font-mono font-bold"
                  />
                </p>
              </div>
            </div>
          </div>
          {selectedPilot.highlight && (
            <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-[hsl(var(--primary)/0.1)] border border-[hsl(var(--primary)/0.3)] w-fit">
              <Zap size={16} className="text-[hsl(var(--primary))]" />
              <span className="text-sm font-semibold text-[hsl(var(--primary))]">Piloto argentino 🇦🇷</span>
            </div>
          )}
        </div>
      )}

      {/* Full standings table */}
      <div className="tv-card overflow-x-auto">
        <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-4">Campeonato de Pilotos 2026</h3>
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-[hsl(var(--border))]">
              <th className="text-left py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Pos</th>
              <th className="text-left py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Piloto</th>
              <th className="text-left py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Equipo</th>
              <th className="text-right py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Pts</th>
            </tr>
          </thead>
          <tbody>
            {pilots.map((pilot) => (
              <tr
                key={pilot.id}
                className={`tv-table-row border-b border-[hsl(var(--border)/0.5)] cursor-pointer transition-colors duration-100 ${
                  pilot.highlight ? 'bg-[hsl(var(--primary)/0.07)]' : ''
                } ${selectedPilot?.id === pilot.id ? 'bg-[hsl(var(--primary)/0.12)]' : ''}`}
                onClick={() => setSelectedPilot(selectedPilot?.id === pilot.id ? null : pilot)}
              >
                <td className="py-3 px-2">
                  <span className={`font-mono font-bold text-lg ${pilot.pos <= 3 ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))]'}`}>
                    {pilot.pos}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className="text-base font-semibold text-[hsl(var(--foreground))]">
                    {pilot.nationality} {pilot.name}
                    {pilot.highlight && <span className="ml-2 text-xs font-bold text-[hsl(var(--primary))]">ARG</span>}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span
                    className="text-sm font-medium px-2 py-1 rounded-lg"
                    style={{
                      backgroundColor: `${teamColors[pilot.team] ?? '#888'}22`,
                      color: teamColors[pilot.team] ?? '#888',
                    }}
                  >
                    {pilot.team}
                  </span>
                </td>
                <td className="py-3 px-2 text-right font-mono font-bold text-xl text-[hsl(var(--foreground))]" onClick={(e) => e.stopPropagation()}>
                  <InlineEdit
                    value={pilot.points}
                    onSave={(v) => updatePilot(pilot.id, 'points', v)}
                    type="number"
                    className="w-16 text-right text-lg font-mono font-bold"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-[hsl(var(--muted))] mt-3">Tocá los puntos para editar. La tabla se reordena automáticamente.</p>
      </div>
    </div>
  );
}

// ─── CONSTRUCTORES ────────────────────────────────────────────────────────────

function ConstructoresView() {
  const [constructors, setConstructors] = useState<F1Constructor[]>(f1Constructors);

  const updateConstructor = useCallback((id: string, points: number) => {
    setConstructors((prev) => {
      const updated = prev.map((c) => c.id === id ? { ...c, points } : c);
      return [...updated].sort((a, b) => b.points - a.points).map((c, i) => ({ ...c, pos: i + 1 }));
    });
  }, []);

  return (
    <div className="space-y-5 fade-in">
      <div className="tv-card overflow-x-auto">
        <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-4">Campeonato de Constructores 2026</h3>
        <table className="w-full min-w-[400px]">
          <thead>
            <tr className="border-b border-[hsl(var(--border))]">
              <th className="text-left py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Pos</th>
              <th className="text-left py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Constructor</th>
              <th className="text-left py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Pilotos</th>
              <th className="text-right py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Pts</th>
            </tr>
          </thead>
          <tbody>
            {constructors.map((c) => (
              <tr key={c.id} className="tv-table-row border-b border-[hsl(var(--border)/0.5)] transition-colors duration-100">
                <td className="py-3 px-2">
                  <span className={`font-mono font-bold text-lg ${c.pos <= 3 ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))]'}`}>
                    {c.pos}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: teamColors[c.name] ?? '#888' }} />
                    <span className="text-lg font-bold text-[hsl(var(--foreground))]">{c.name}</span>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <span className="text-sm text-[hsl(var(--muted-foreground))]">{c.pilots.join(' · ')}</span>
                </td>
                <td className="py-3 px-2 text-right font-mono font-bold text-2xl text-[hsl(var(--foreground))]">
                  <InlineEdit
                    value={c.points}
                    onSave={(v) => updateConstructor(c.id, v as number)}
                    type="number"
                    className="w-20 text-right text-xl font-mono font-bold"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-[hsl(var(--muted))] mt-3">Tocá los puntos para editar. La tabla se reordena automáticamente.</p>
      </div>

      <div className="tv-card">
        <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-4">Puntos por Constructor</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={constructors.filter((c) => c.points > 0)} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
            <XAxis dataKey="name" tick={{ fill: 'hsl(240 4% 60%)', fontSize: 12, fontFamily: 'DM Sans' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'hsl(240 4% 60%)', fontSize: 12, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload as F1Constructor;
                return (
                  <div className="bg-[hsl(240_8%_10%)] border border-[hsl(240_6%_20%)] rounded-xl px-4 py-3 shadow-xl">
                    <p className="font-bold text-white text-base">{d.name}</p>
                    <p className="font-mono font-bold text-[hsl(68_100%_50%)] text-xl">{d.points} pts</p>
                  </div>
                );
              }}
            />
            <Bar dataKey="points" radius={[6, 6, 0, 0]}>
              {constructors.filter((c) => c.points > 0).map((c) => (
                <Cell key={`cell-${c.id}`} fill={teamColors[c.name] ?? '#888'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── CALENDARIO ───────────────────────────────────────────────────────────────

function CalendarioView() {
  const [races, setRaces] = useState<F1Race[]>(f1Calendar);

  const updateRaceStatus = useCallback((id: string, status: F1Race['status']) => {
    setRaces((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
  }, []);

  return (
    <div className="tv-card overflow-x-auto fade-in">
      <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-4">Calendario F1 2026 — 22 Carreras</h3>
      <table className="w-full min-w-[500px]">
        <thead>
          <tr className="border-b border-[hsl(var(--border))]">
            <th className="text-left py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Rnd</th>
            <th className="text-left py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Gran Premio</th>
            <th className="text-left py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Ciudad</th>
            <th className="text-left py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Fecha</th>
            <th className="text-left py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Estado</th>
          </tr>
        </thead>
        <tbody>
          {races.map((race) => (
            <tr key={race.id} className={`tv-table-row border-b border-[hsl(var(--border)/0.5)] transition-colors duration-100 ${race.status === 'next' ? 'bg-[hsl(var(--primary)/0.07)]' : ''}`}>
              <td className="py-3 px-2 font-mono text-sm text-[hsl(var(--muted))]">{race.round}</td>
              <td className="py-3 px-2 font-bold text-base text-[hsl(var(--foreground))]">{race.name}</td>
              <td className="py-3 px-2 text-sm text-[hsl(var(--muted-foreground))]">{race.city}</td>
              <td className="py-3 px-2 font-mono text-sm text-[hsl(var(--foreground))]">{race.date}</td>
              <td className="py-3 px-2">
                <select
                  value={race.status}
                  onChange={(e) => updateRaceStatus(race.id, e.target.value as F1Race['status'])}
                  className="bg-transparent border-none outline-none text-xs font-bold cursor-pointer"
                  style={{ color: race.status === 'completed' ? 'hsl(var(--success))' : race.status === 'next' ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))' }}
                >
                  <option value="completed">✓ Disputada</option>
                  <option value="next">▶ Próxima</option>
                  <option value="upcoming">○ Pendiente</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── EQUIPOS ─────────────────────────────────────────────────────────────────

function EquiposView() {
  const [teams] = useState(f1Constructors);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 fade-in">
      {teams.map((team) => (
        <div key={`team-card-${team.id}`} className="tv-card space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: teamColors[team.name] ?? '#888' }} />
            <h3 className="text-xl font-bold text-[hsl(var(--foreground))]">{team.name}</h3>
          </div>
          <div className="space-y-2">
            {team.pilots.map((pilot, i) => (
              <div key={`${team.id}-pilot-${i}`} className="flex items-center gap-2 py-2 border-b border-[hsl(var(--border)/0.5)] last:border-0">
                <span className="text-sm font-semibold text-[hsl(var(--foreground))]">{pilot}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-[hsl(var(--muted))]">Puntos</span>
            <span className="font-mono font-bold text-xl text-[hsl(var(--primary))]">{team.points}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function AutomovilismoSection() {
  const [activeChip, setActiveChip] = useState<AutoChip>('pilotos');

  return (
    <div className="space-y-5 fade-in">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {autoChips.map((chip) => (
          <button
            key={`auto-chip-${chip.id}`}
            onClick={() => setActiveChip(chip.id)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-base font-semibold transition-all duration-150 active:scale-95 ${
              activeChip === chip.id ? 'chip-active' : 'chip-inactive hover:border-[hsl(var(--primary)/0.4)]'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {activeChip === 'pilotos' && <PilotosView />}
      {activeChip === 'constructores' && <ConstructoresView />}
      {activeChip === 'calendario' && <CalendarioView />}
      {activeChip === 'equipos' && <EquiposView />}
    </div>
  );
}