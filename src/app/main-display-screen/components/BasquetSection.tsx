'use client';
import React, { useState, useCallback } from 'react';
import { PlusCircle, Trash2, Edit3, Check, X } from 'lucide-react';

interface BasketPlayer {
  id: string;
  name: string;
  number: number;
  pos: string;
}

interface BasketTeamState {
  id: string;
  name: string;
  wins: number;
  losses: number;
  points: number;
  dt: string;
  players: BasketPlayer[];
}

type BasketChip = 'equipos' | 'tabla' | 'planteles';

const basketChips: { id: BasketChip; label: string }[] = [
  { id: 'equipos', label: 'Equipos' },
  { id: 'tabla', label: 'Tabla' },
  { id: 'planteles', label: 'Planteles' },
];

const initialTeams: BasketTeamState[] = [
  { id: 'basket-01', name: 'Rosario Central', wins: 0, losses: 0, points: 0, dt: '', players: [] },
  { id: 'basket-02', name: 'Gimnasia', wins: 0, losses: 0, points: 0, dt: '', players: [] },
  { id: 'basket-03', name: 'Náutico', wins: 0, losses: 0, points: 0, dt: '', players: [] },
  { id: 'basket-04', name: 'Temperley', wins: 0, losses: 0, points: 0, dt: '', players: [] },
];

// ─── INLINE EDITABLE FIELD ────────────────────────────────────────────────────

function EditableNumber({
  value,
  onSave,
  label,
}: {
  value: number;
  onSave: (v: number) => void;
  label: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));

  const commit = () => {
    const n = parseInt(draft, 10);
    if (!isNaN(n)) onSave(n);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="flex flex-col items-center gap-1">
        <p className="text-xs text-[hsl(var(--muted))] mb-1">{label}</p>
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-16 bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--primary))] rounded-lg px-2 py-1 text-center font-mono font-bold text-lg text-[hsl(var(--foreground))] outline-none"
            autoFocus
            onKeyDown={(e) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') setEditing(false); }}
          />
          <button onClick={commit} className="text-[hsl(var(--success))]"><Check size={14} /></button>
          <button onClick={() => setEditing(false)} className="text-[hsl(var(--muted-foreground))]"><X size={14} /></button>
        </div>
      </div>
    );
  }

  return (
    <button onClick={() => { setDraft(String(value)); setEditing(true); }} className="flex flex-col items-center group">
      <p className="text-xs text-[hsl(var(--muted))] mb-1">{label}</p>
      <p className="text-3xl font-bold font-mono text-[hsl(var(--primary))] group-hover:opacity-70 transition-opacity">{value}</p>
      <Edit3 size={10} className="text-[hsl(var(--muted))] mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}

// ─── TABLA ────────────────────────────────────────────────────────────────────

function TablaView({ teams, onUpdate }: { teams: BasketTeamState[]; onUpdate: (id: string, field: 'wins' | 'losses' | 'points', val: number) => void }) {
  const sorted = [...teams].sort((a, b) => b.points - a.points);
  return (
    <div className="tv-card overflow-x-auto fade-in">
      <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-4">Tabla de Posiciones</h3>
      <table className="w-full min-w-[400px]">
        <thead>
          <tr className="border-b border-[hsl(var(--border))]">
            <th className="text-left py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Pos</th>
            <th className="text-left py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Equipo</th>
            <th className="text-center py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">G</th>
            <th className="text-center py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">P</th>
            <th className="text-right py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Pts</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((team, i) => (
            <tr key={team.id} className="tv-table-row border-b border-[hsl(var(--border)/0.5)]">
              <td className="py-3 px-2 font-mono font-bold text-lg text-[hsl(var(--muted-foreground))]">{i + 1}</td>
              <td className="py-3 px-2 font-bold text-lg text-[hsl(var(--foreground))]">{team.name}</td>
              <td className="py-3 px-2 text-center">
                <button
                  onClick={() => onUpdate(team.id, 'wins', team.wins)}
                  className="font-mono font-bold text-lg text-[hsl(var(--success))] hover:opacity-70 transition-opacity"
                  title="Click para editar"
                >
                  {team.wins}
                </button>
              </td>
              <td className="py-3 px-2 text-center">
                <button
                  onClick={() => onUpdate(team.id, 'losses', team.losses)}
                  className="font-mono font-bold text-lg text-[hsl(var(--accent))] hover:opacity-70 transition-opacity"
                  title="Click para editar"
                >
                  {team.losses}
                </button>
              </td>
              <td className="py-3 px-2 text-right font-mono font-bold text-2xl text-[hsl(var(--primary))]">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-[hsl(var(--muted))] mt-3">Tocá G/P para editar. Usá "Actualizar Data" para comandos de voz.</p>
    </div>
  );
}

// ─── EQUIPOS ─────────────────────────────────────────────────────────────────

function EquiposView({ teams, onUpdate }: { teams: BasketTeamState[]; onUpdate: (id: string, field: 'wins' | 'losses' | 'points', val: number) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 fade-in">
      {teams.map((team) => (
        <div key={`basket-eq-${team.id}`} className="tv-card space-y-3">
          <h3 className="text-xl font-bold text-[hsl(var(--foreground))]">{team.name}</h3>
          {team.dt && <p className="text-sm text-[hsl(var(--muted-foreground))]">DT: {team.dt}</p>}
          <div className="flex gap-4">
            <EditableNumber value={team.wins} onSave={(v) => onUpdate(team.id, 'wins', v)} label="Victorias" />
            <EditableNumber value={team.losses} onSave={(v) => onUpdate(team.id, 'losses', v)} label="Derrotas" />
            <EditableNumber value={team.points} onSave={(v) => onUpdate(team.id, 'points', v)} label="Puntos" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── PLANTELES ────────────────────────────────────────────────────────────────

function PlantelesView({ teams, onAddPlayer, onRemovePlayer }: {
  teams: BasketTeamState[];
  onAddPlayer: (teamId: string, player: Omit<BasketPlayer, 'id'>) => void;
  onRemovePlayer: (teamId: string, playerId: string) => void;
}) {
  const [selectedTeamId, setSelectedTeamId] = useState(teams[0]?.id ?? '');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newPos, setNewPos] = useState('');

  const selectedTeam = teams.find((t) => t.id === selectedTeamId) ?? teams[0];

  const handleAdd = () => {
    if (!newName.trim()) return;
    onAddPlayer(selectedTeamId, {
      name: newName.trim(),
      number: parseInt(newNumber, 10) || 0,
      pos: newPos.trim() || 'Base',
    });
    setNewName('');
    setNewNumber('');
    setNewPos('');
  };

  return (
    <div className="space-y-4 fade-in">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {teams.map((team) => (
          <button
            key={`basket-plantel-chip-${team.id}`}
            onClick={() => setSelectedTeamId(team.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 active:scale-95 ${
              selectedTeamId === team.id ? 'chip-active' : 'chip-inactive hover:border-[hsl(var(--primary)/0.4)]'
            }`}
          >
            {team.name}
          </button>
        ))}
      </div>

      {selectedTeam && (
        <div className="tv-card space-y-4">
          <h3 className="text-xl font-bold text-[hsl(var(--foreground))]">{selectedTeam.name}</h3>

          {/* Add player form */}
          <div className="flex flex-wrap gap-2 items-end">
            <input
              type="text"
              placeholder="Nombre jugador"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-1 min-w-[140px] bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl px-3 py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted))] outline-none focus:border-[hsl(var(--primary))]"
            />
            <input
              type="number"
              placeholder="Nro"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
              className="w-20 bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl px-3 py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted))] outline-none focus:border-[hsl(var(--primary))]"
            />
            <input
              type="text"
              placeholder="Posición"
              value={newPos}
              onChange={(e) => setNewPos(e.target.value)}
              className="w-28 bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl px-3 py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted))] outline-none focus:border-[hsl(var(--primary))]"
            />
            <button
              onClick={handleAdd}
              disabled={!newName.trim()}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-sm font-bold hover:brightness-110 active:scale-95 transition-all disabled:opacity-40"
            >
              <PlusCircle size={16} />
              Agregar
            </button>
          </div>

          {/* Players list */}
          {selectedTeam.players.length === 0 ? (
            <p className="text-[hsl(var(--muted))] text-center py-6">Sin jugadores. Agregá uno arriba o usá "Actualizar Data".</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {selectedTeam.players.map((player) => (
                <div key={player.id} className="bg-[hsl(var(--surface-elevated))] rounded-xl p-4 flex items-center gap-3">
                  <span className="font-mono text-2xl font-bold text-[hsl(var(--primary))] w-10 text-center flex-shrink-0">
                    {player.number || '—'}
                  </span>
                  <div className="flex-1">
                    <p className="text-base font-semibold text-[hsl(var(--foreground))]">{player.name}</p>
                    <p className="text-sm text-[hsl(var(--muted))]">{player.pos}</p>
                  </div>
                  <button
                    onClick={() => onRemovePlayer(selectedTeamId, player.id)}
                    className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--accent))] transition-colors"
                    aria-label="Eliminar jugador"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function BasquetSection() {
  const [activeChip, setActiveChip] = useState<BasketChip>('equipos');
  const [teams, setTeams] = useState<BasketTeamState[]>(initialTeams);

  const updateTeamStat = useCallback((id: string, field: 'wins' | 'losses' | 'points', val: number) => {
    setTeams((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: val } : t))
    );
  }, []);

  const addPlayer = useCallback((teamId: string, player: Omit<BasketPlayer, 'id'>) => {
    setTeams((prev) =>
      prev.map((t) =>
        t.id === teamId
          ? { ...t, players: [...t.players, { ...player, id: `bp-${Date.now()}` }] }
          : t
      )
    );
  }, []);

  const removePlayer = useCallback((teamId: string, playerId: string) => {
    setTeams((prev) =>
      prev.map((t) =>
        t.id === teamId
          ? { ...t, players: t.players.filter((p) => p.id !== playerId) }
          : t
      )
    );
  }, []);

  return (
    <div className="space-y-5 fade-in">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {basketChips.map((chip) => (
          <button
            key={`basket-chip-${chip.id}`}
            onClick={() => setActiveChip(chip.id)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-base font-semibold transition-all duration-150 active:scale-95 ${
              activeChip === chip.id ? 'chip-active' : 'chip-inactive hover:border-[hsl(var(--primary)/0.4)]'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {activeChip === 'equipos' && <EquiposView teams={teams} onUpdate={updateTeamStat} />}
      {activeChip === 'tabla' && <TablaView teams={teams} onUpdate={updateTeamStat} />}
      {activeChip === 'planteles' && <PlantelesView teams={teams} onAddPlayer={addPlayer} onRemovePlayer={removePlayer} />}
    </div>
  );
}