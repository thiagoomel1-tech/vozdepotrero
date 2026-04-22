'use client';
import React, { useState } from 'react';
import { teamsData } from '@/lib/sportsData';
import type { Player, Position } from '@/lib/sportsData';
import { toast } from 'sonner';
import { Plus, Trash2, Save, AlertCircle } from 'lucide-react';

type TeamId = 'boca' | 'river' | 'central' | 'newells';

const teamOptions: { id: TeamId; label: string }[] = [
  { id: 'boca', label: 'Boca Juniors' },
  { id: 'river', label: 'River Plate' },
  { id: 'central', label: 'Rosario Central' },
  { id: 'newells', label: "Newell's Old Boys" },
];

const positions: Position[] = ['ARQ', 'DEF', 'MED', 'DEL'];

export default function FutbolEditor() {
  const [activeTeam, setActiveTeam] = useState<TeamId>('boca');
  const [players, setPlayers] = useState<Player[]>(teamsData[activeTeam].players);
  const [dt, setDt] = useState(teamsData[activeTeam].dt);
  const [capitan, setCapitan] = useState(teamsData[activeTeam].capitan);
  const [saving, setSaving] = useState(false);
  const [newPlayer, setNewPlayer] = useState({ number: '', name: '', position: 'DEL' as Position });
  const [addError, setAddError] = useState('');

  const switchTeam = (id: TeamId) => {
    setActiveTeam(id);
    setPlayers(teamsData[id].players);
    setDt(teamsData[id].dt);
    setCapitan(teamsData[id].capitan);
    setAddError('');
  };

  const addPlayer = () => {
    if (!newPlayer.name.trim() || !newPlayer.number) {
      setAddError('Nombre y número son obligatorios.');
      return;
    }
    const num = parseInt(newPlayer.number);
    if (players.some((p) => p.number === num)) {
      setAddError(`El número ${num} ya existe en el plantel.`);
      return;
    }
    setAddError('');
    const id = `${activeTeam}-new-${Date.now()}`;
    setPlayers((prev) => [...prev, { id, number: num, name: newPlayer.name.trim(), position: newPlayer.position }]);
    setNewPlayer({ number: '', name: '', position: 'DEL' });
    toast.success('Jugador agregado', { description: `${newPlayer.name} añadido al plantel.` });
  };

  const removePlayer = (id: string) => {
    const player = players.find((p) => p.id === id);
    setPlayers((prev) => prev.filter((p) => p.id !== id));
    toast.success('Jugador eliminado', { description: `${player?.name} removido del plantel.` });
  };

  const toggleInjured = (id: string) => {
    setPlayers((prev) => prev.map((p) => p.id === id ? { ...p, injured: !p.injured } : p));
  };

const handleSave = async () => {
  setSaving(true);

  try {
    const saved = localStorage.getItem("sportsData");
    const data = saved ? JSON.parse(saved) : teamsData;

    const updated = {
      ...data,
      [activeTeam]: {
        ...data[activeTeam],
        dt,
        capitan,
        players
      }
    };

    localStorage.setItem(
      "sportsData",
      JSON.stringify(updated)
    );

    toast.success(
      'Plantel guardado',
      { description: `${teamOptions.find(t => t.id === activeTeam)?.label} actualizado correctamente.` }
    );

  } catch (e) {
    toast.error("Error guardando datos");
  }

  setSaving(false);
};

  const posColors: Record<string, string> = {
    ARQ: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    DEF: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    MED: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    DEL: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <div className="space-y-6">
      {/* Team selector */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {teamOptions.map((t) => (
          <button
            key={`editor-team-${t.id}`}
            onClick={() => switchTeam(t.id)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-150 active:scale-95 ${
              activeTeam === t.id ? 'chip-active' : 'chip-inactive hover:border-[hsl(var(--primary)/0.4)]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* DT & Capitán */}
      <div className="tv-card space-y-4">
        <h3 className="text-lg font-bold text-[hsl(var(--foreground))]">Cuerpo Técnico</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[hsl(var(--muted-foreground))] mb-2 uppercase tracking-widest">
              Director Técnico
            </label>
            <input
              type="text"
              value={dt}
              onChange={(e) => setDt(e.target.value)}
              className="w-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl px-4 py-3 text-base text-[hsl(var(--foreground))] outline-none focus:border-[hsl(var(--primary))] focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.15)] transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[hsl(var(--muted-foreground))] mb-2 uppercase tracking-widest">
              Capitán
            </label>
            <input
              type="text"
              value={capitan}
              onChange={(e) => setCapitan(e.target.value)}
              className="w-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl px-4 py-3 text-base text-[hsl(var(--foreground))] outline-none focus:border-[hsl(var(--primary))] focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.15)] transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Add player */}
      <div className="tv-card space-y-4">
        <h3 className="text-lg font-bold text-[hsl(var(--foreground))]">Agregar Jugador</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[hsl(var(--muted-foreground))] mb-2 uppercase tracking-widest">
              Número
            </label>
            <input
              type="number"
              value={newPlayer.number}
              onChange={(e) => setNewPlayer((p) => ({ ...p, number: e.target.value }))}
              placeholder="Nro"
              className="w-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl px-4 py-3 text-base font-mono text-[hsl(var(--foreground))] outline-none focus:border-[hsl(var(--primary))] transition-all duration-200"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-[hsl(var(--muted-foreground))] mb-2 uppercase tracking-widest">
              Nombre completo
            </label>
            <input
              type="text"
              value={newPlayer.name}
              onChange={(e) => setNewPlayer((p) => ({ ...p, name: e.target.value }))}
              placeholder="Ej: Edinson Cavani"
              className="w-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl px-4 py-3 text-base text-[hsl(var(--foreground))] outline-none focus:border-[hsl(var(--primary))] transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[hsl(var(--muted-foreground))] mb-2 uppercase tracking-widest">
              Posición
            </label>
            <select
              value={newPlayer.position}
              onChange={(e) => setNewPlayer((p) => ({ ...p, position: e.target.value as Position }))}
              className="w-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl px-4 py-3 text-base text-[hsl(var(--foreground))] outline-none focus:border-[hsl(var(--primary))] transition-all duration-200"
            >
              {positions.map((pos) => (
                <option key={`pos-opt-${pos}`} value={pos}>{pos}</option>
              ))}
            </select>
          </div>
        </div>
        {addError && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[hsl(var(--accent)/0.1)] border border-[hsl(var(--accent)/0.3)]">
            <AlertCircle size={16} className="text-[hsl(var(--accent))] flex-shrink-0" />
            <p className="text-sm text-[hsl(var(--accent))]">{addError}</p>
          </div>
        )}
        <button
          onClick={addPlayer}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] text-sm font-semibold text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.5)] hover:text-[hsl(var(--primary))] transition-all duration-150 active:scale-95"
        >
          <Plus size={16} />
          Agregar al plantel
        </button>
      </div>

      {/* Players table */}
      <div className="tv-card overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[hsl(var(--foreground))]">
            Plantel — {players.length} jugadores
          </h3>
        </div>
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-[hsl(var(--border))]">
              <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Nro</th>
              <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Jugador</th>
              <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Pos</th>
              <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Estado</th>
              <th className="text-right py-3 px-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {players.sort((a, b) => a.number - b.number).map((player) => (
              <tr key={player.id} className="tv-table-row border-b border-[hsl(var(--border)/0.5)] transition-colors duration-100">
                <td className="py-3 px-2 font-mono font-bold text-lg text-[hsl(var(--primary))]">{player.number}</td>
                <td className="py-3 px-2 text-base font-semibold text-[hsl(var(--foreground))]">{player.name}</td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${posColors[player.position]}`}>
                    {player.position}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <button
                    onClick={() => toggleInjured(player.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold border transition-all duration-150 ${
                      player.injured
                        ? 'bg-[hsl(var(--accent)/0.15)] text-[hsl(var(--accent))] border-[hsl(var(--accent)/0.3)]'
                        : 'bg-[hsl(var(--success)/0.1)] text-[hsl(var(--success))] border-[hsl(var(--success)/0.3)]'
                    }`}
                  >
                    {player.injured ? 'Lesionado' : 'Disponible'}
                  </button>
                </td>
                <td className="py-3 px-2 text-right">
                  <button
                    onClick={() => removePlayer(player.id)}
                    className="p-2 rounded-lg text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--accent))] hover:bg-[hsl(var(--accent)/0.1)] transition-all duration-150"
                    aria-label={`Eliminar ${player.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-bold text-base hover:brightness-110 active:scale-95 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-[hsl(var(--primary-foreground)/0.4)] border-t-[hsl(var(--primary-foreground))] rounded-full animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save size={18} />
              Guardar Plantel
            </>
          )}
        </button>
      </div>
    </div>
  );
}
