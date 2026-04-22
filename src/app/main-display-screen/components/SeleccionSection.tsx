'use client';
import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { argSelection } from '@/lib/sportsData';
import type { ArgSelection, Player } from '@/lib/sportsData';
import { Trophy, Globe, Target, Users, Edit3, Check, X, PlusCircle, Trash2 } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


type SelChip = 'titulos' | 'mundiales' | 'goleadores' | 'presencias' | 'plantel';

const selChips: { id: SelChip; label: string; icon: React.ElementType }[] = [
  { id: 'titulos', label: 'Títulos', icon: Trophy },
  { id: 'mundiales', label: 'Mundiales', icon: Globe },
  { id: 'goleadores', label: 'Goleadores', icon: Target },
  { id: 'presencias', label: 'Presencias', icon: Users },
];

// ─── INLINE EDIT ─────────────────────────────────────────────────────────────

function InlineEditText({ value, onSave, className = '' }: { value: string; onSave: (v: string) => void; className?: string }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const commit = () => { onSave(draft); setEditing(false); };
  if (editing) {
    return (
      <span className="inline-flex items-center gap-1">
        <input
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
    <button onClick={() => { setDraft(value); setEditing(true); }} className="group inline-flex items-center gap-1 hover:opacity-70 transition-opacity text-left">
      <span>{value}</span>
      <Edit3 size={10} className="text-[hsl(var(--muted))] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
    </button>
  );
}

function InlineEditNumber({ value, onSave, className = '' }: { value: number; onSave: (v: number) => void; className?: string }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const commit = () => { onSave(parseInt(draft, 10) || 0); setEditing(false); };
  if (editing) {
    return (
      <span className="inline-flex items-center gap-1">
        <input
          type="number"
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

// ─── TITULOS ─────────────────────────────────────────────────────────────────

function TitulosView({ data, onUpdate }: { data: ArgSelection; onUpdate: (d: Partial<ArgSelection>) => void }) {
  const worldCups = data.titles.filter((t) => t.name.includes('Mundial'));
  const copasAmerica = data.titles.filter((t) => t.name.includes('América'));
  const otros = data.titles.filter((t) => !t.name.includes('Mundial') && !t.name.includes('América'));

  const removeTitle = (id: string) => {
    onUpdate({ titles: data.titles.filter((t) => t.id !== id) });
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="tv-card text-center border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.05)]">
          <Trophy size={36} className="mx-auto text-[hsl(var(--primary))] mb-2" />
          <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))] mb-1">Mundiales FIFA</p>
          <p className="text-6xl font-bold font-mono text-[hsl(var(--primary))]">{worldCups.length}</p>
          <p className="text-sm text-[hsl(var(--muted))] mt-1">1978 · 1986 · 2022</p>
        </div>
        <div className="tv-card text-center">
          <Trophy size={36} className="mx-auto text-amber-400 mb-2" />
          <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))] mb-1">Copas América</p>
          <p className="text-6xl font-bold font-mono text-amber-400">{copasAmerica.length}</p>
          <p className="text-sm text-[hsl(var(--muted))] mt-1">Récord histórico</p>
        </div>
        <div className="tv-card text-center">
          <Trophy size={36} className="mx-auto text-blue-400 mb-2" />
          <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))] mb-1">Otros títulos</p>
          <p className="text-6xl font-bold font-mono text-blue-400">{otros.length}</p>
        </div>
      </div>
      <div className="tv-card">
        <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-3">Todos los títulos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {data.titles.map((t) => (
            <div key={t.id} className="flex items-center justify-between py-2 px-3 rounded-xl bg-[hsl(var(--surface-elevated))] group">
              <div className="flex items-center gap-2">
                <Trophy size={14} className="text-[hsl(var(--primary))]" />
                <span className="text-base font-medium text-[hsl(var(--foreground))]">{t.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-[hsl(var(--primary))]">{t.year}</span>
                <span className="text-xs text-[hsl(var(--muted))]">{t.host}</span>
                <button onClick={() => removeTitle(t.id)} className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--accent))] opacity-0 group-hover:opacity-100 transition-all" aria-label="Eliminar título">
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-[hsl(var(--muted))] mt-3">Pasá el cursor sobre un título para eliminarlo. Usá "Actualizar Data" para agregar.</p>
      </div>
    </div>
  );
}

// ─── MUNDIALES ────────────────────────────────────────────────────────────────

function MundialesView({ data }: { data: ArgSelection }) {
  return (
    <div className="tv-card overflow-x-auto fade-in">
      <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-4">Historial en Mundiales</h3>
      <table className="w-full min-w-[500px]">
        <thead>
          <tr className="border-b border-[hsl(var(--border))]">
            <th className="text-left py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Año</th>
            <th className="text-left py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Sede</th>
            <th className="text-left py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Resultado</th>
            <th className="text-left py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Goleador</th>
          </tr>
        </thead>
        <tbody>
          {data.worldCups.map((wc) => (
            <tr key={wc.id} className={`tv-table-row border-b border-[hsl(var(--border)/0.5)] transition-colors duration-100 ${wc.result === 'Campeón' ? 'bg-[hsl(var(--primary)/0.07)]' : ''}`}>
              <td className="py-3 px-2 font-mono font-bold text-lg text-[hsl(var(--foreground))]">{wc.year}</td>
              <td className="py-3 px-2 text-base text-[hsl(var(--foreground))]">{wc.host}</td>
              <td className="py-3 px-2">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  wc.result === 'Campeón' ? 'bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))] border border-[hsl(var(--primary)/0.3)]'
                    : wc.result === 'Finalista' ? 'bg-[hsl(var(--success)/0.15)] text-[hsl(var(--success))] border border-[hsl(var(--success)/0.3)]'
                    : 'bg-[hsl(var(--surface-elevated))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))]'
                }`}>
                  {wc.result}
                </span>
              </td>
              <td className="py-3 px-2 text-sm text-[hsl(var(--muted-foreground))]">{wc.topScorer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── GOLEADORES ──────────────────────────────────────────────────────────────

function GoleadoresView({ data, onUpdate }: { data: ArgSelection; onUpdate: (d: Partial<ArgSelection>) => void }) {
  const sorted = [...data.topScorers].sort((a, b) => b.goals - a.goals);

  const updateGoals = (id: string, goals: number) => {
    onUpdate({ topScorers: data.topScorers.map((s) => s.id === id ? { ...s, goals } : s) });
  };

  return (
    <div className="tv-card fade-in">
      <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-4">Máximos Goleadores Históricos</h3>
      <div className="space-y-3">
        {sorted.map((scorer, i) => (
          <div key={scorer.id} className="flex items-center gap-4 py-3 border-b border-[hsl(var(--border))] last:border-0">
            <span className="font-mono text-2xl font-bold text-[hsl(var(--muted))] w-8 text-center">{i + 1}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-xl font-semibold text-[hsl(var(--foreground))]">{scorer.name}</p>
                {scorer.active && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[hsl(var(--success)/0.15)] text-[hsl(var(--success))] border border-[hsl(var(--success)/0.3)]">
                    Activo
                  </span>
                )}
              </div>
              <p className="text-sm text-[hsl(var(--muted))]">{scorer.caps} partidos</p>
            </div>
            <p className="text-4xl font-bold font-mono text-[hsl(var(--primary))]">
              <InlineEditNumber value={scorer.goals} onSave={(v) => updateGoals(scorer.id, v)} className="w-20 text-center text-3xl font-mono font-bold" />
            </p>
          </div>
        ))}
      </div>
      <p className="text-xs text-[hsl(var(--muted))] mt-3">Tocá los goles para editar.</p>
    </div>
  );
}

// ─── PRESENCIAS ──────────────────────────────────────────────────────────────

function PresenciasView({ data }: { data: ArgSelection }) {
  return (
    <div className="tv-card fade-in">
      <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-4">Jugadores con más Presencias</h3>
      <div className="space-y-3">
        {[...data.presencias].sort((a, b) => b.caps - a.caps).map((p, i) => (
          <div key={p.id} className="flex items-center gap-4 py-3 border-b border-[hsl(var(--border))] last:border-0">
            <span className="font-mono text-2xl font-bold text-[hsl(var(--muted))] w-8 text-center">{i + 1}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-xl font-semibold text-[hsl(var(--foreground))]">{p.name}</p>
                {p.active && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[hsl(var(--success)/0.15)] text-[hsl(var(--success))] border border-[hsl(var(--success)/0.3)]">
                    Activo
                  </span>
                )}
              </div>
              <p className="text-sm text-[hsl(var(--muted))]">{p.years}</p>
            </div>
            <p className="text-4xl font-bold font-mono text-[hsl(var(--primary))]">{p.caps}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PLANTEL ─────────────────────────────────────────────────────────────────

function PlantelView({ data, onUpdate }: { data: ArgSelection; onUpdate: (d: Partial<ArgSelection>) => void }) {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newPos, setNewPos] = useState('');

  const addPlayer = () => {
    if (!newName.trim()) return;
    const player: Player = {
      id: `arg-p-${Date.now()}`,
      number: parseInt(newNumber, 10) || 0,
      name: newName.trim(),
      position: 'DEL',
      posLabel: newPos.trim() || 'Jugador',
    };
    onUpdate({ players: [...(data.players ?? []), player] });
    setNewName(''); setNewNumber(''); setNewPos('');
  };

  const removePlayer = (id: string) => {
    onUpdate({ players: (data.players ?? []).filter((p) => p.id !== id) });
  };

  return (
    <div className="tv-card space-y-4 fade-in">
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mb-2">
        <div className="bg-[hsl(var(--surface-elevated))] rounded-xl p-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))] mb-1">DT</p>
          <p className="text-xl font-bold text-[hsl(var(--foreground))]">
            <InlineEditText value={data.dt} onSave={(v) => onUpdate({ dt: v })} className="text-xl font-bold" />
          </p>
        </div>
        <div className="bg-[hsl(var(--surface-elevated))] rounded-xl p-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))] mb-1">Capitán</p>
          <p className="text-xl font-bold text-[hsl(var(--foreground))]">
            <InlineEditText value={data.capitan} onSave={(v) => onUpdate({ capitan: v })} className="text-xl font-bold" />
          </p>
        </div>
      </div>

      {/* Add player */}
      <div className="flex flex-wrap gap-2 items-end">
        <input type="text" placeholder="Nombre" value={newName} onChange={(e) => setNewName(e.target.value)}
          className="flex-1 min-w-[120px] bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl px-3 py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted))] outline-none focus:border-[hsl(var(--primary))]" />
        <input type="number" placeholder="Nro" value={newNumber} onChange={(e) => setNewNumber(e.target.value)}
          className="w-20 bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl px-3 py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted))] outline-none focus:border-[hsl(var(--primary))]" />
        <input type="text" placeholder="Posición" value={newPos} onChange={(e) => setNewPos(e.target.value)}
          className="w-28 bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl px-3 py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted))] outline-none focus:border-[hsl(var(--primary))]" />
        <button onClick={addPlayer} disabled={!newName.trim()}
          className="flex items-center gap-1 px-4 py-2 rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-sm font-bold hover:brightness-110 active:scale-95 transition-all disabled:opacity-40">
          <PlusCircle size={16} /> Agregar
        </button>
      </div>

      {(!data.players || data.players.length === 0) ? (
        <p className="text-[hsl(var(--muted))] text-center py-6">Sin jugadores. Agregá uno arriba o usá "Actualizar Data".</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.players.map((player) => (
            <div key={player.id} className="bg-[hsl(var(--surface-elevated))] rounded-xl p-4 flex items-center gap-3 group">
              <span className="font-mono text-2xl font-bold text-[hsl(var(--primary))] w-10 text-center flex-shrink-0">
                {player.number > 0 ? player.number : '—'}
              </span>
              <div className="flex-1">
                <p className="text-base font-semibold text-[hsl(var(--foreground))]">{player.name}</p>
                <p className="text-sm text-[hsl(var(--muted))]">{player.posLabel ?? player.position}</p>
              </div>
              <button onClick={() => removePlayer(player.id)} className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--accent))] opacity-0 group-hover:opacity-100 transition-all" aria-label="Eliminar">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function SeleccionSection() {
  const [activeChip, setActiveChip] = useState<SelChip>('titulos');
  const [data, setData] = useState<ArgSelection>(argSelection);

  const updateData = useCallback((partial: Partial<ArgSelection>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const allChips: { id: SelChip; label: string; icon: React.ElementType }[] = [
    ...selChips,
    { id: 'plantel', label: 'Plantel', icon: Users },
  ];

  return (
    <div className="space-y-5 fade-in">
      {/* Header with AFA shield */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[hsl(var(--surface))] border-2 border-[hsl(var(--primary)/0.4)] flex items-center justify-center overflow-hidden flex-shrink-0">
          <Image
            src="/assets/images/argentina-1776786807980.png"
            alt="Escudo Selección Argentina AFA"
            width={52}
            height={52}
            className="object-contain w-13 h-13"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-[hsl(var(--foreground))]">Selección Argentina</h2>
          <p className="text-sm text-[hsl(var(--muted))]">
            DT: <InlineEditText value={data.dt} onSave={(v) => updateData({ dt: v })} className="text-sm" /> · Capitán: <InlineEditText value={data.capitan} onSave={(v) => updateData({ capitan: v })} className="text-sm" />
          </p>
        </div>
      </div>

      {/* Chips */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {allChips.map((chip) => {
          const Icon = chip.icon;
          return (
            <button
              key={`sel-chip-${chip.id}`}
              onClick={() => setActiveChip(chip.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-base font-semibold transition-all duration-150 active:scale-95 ${
                activeChip === chip.id ? 'chip-active' : 'chip-inactive hover:border-[hsl(var(--primary)/0.4)]'
              }`}
            >
              <Icon size={16} />
              {chip.label}
            </button>
          );
        })}
      </div>

      {activeChip === 'titulos' && <TitulosView data={data} onUpdate={updateData} />}
      {activeChip === 'mundiales' && <MundialesView data={data} />}
      {activeChip === 'goleadores' && <GoleadoresView data={data} onUpdate={updateData} />}
      {activeChip === 'presencias' && <PresenciasView data={data} />}
      {activeChip === 'plantel' && <PlantelView data={data} onUpdate={updateData} />}
    </div>
  );
}