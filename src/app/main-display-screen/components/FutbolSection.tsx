'use client';

import React, { useState, useCallback } from 'react';
import { teamsData } from '@/lib/sportsData';
import type { Player, Position } from '@/lib/sportsData';
import { toast } from 'sonner';
import { PlusCircle, Trash2, Save, User, Shield } from 'lucide-react';

type TeamId = 'boca' | 'river' | 'central' | 'newells';

const teamOptions: { id: TeamId; label: string }[] = [
  { id: 'boca', label: 'Boca Juniors' },
  { id: 'river', label: 'River Plate' },
  { id: 'central', label: 'Rosario Central' },
  { id: 'newells', label: "Newell's Old Boys" },
];

const positions: Position[] = ['ARQ', 'DEF', 'MED', 'DEL'];

// 🎨 Estado visual tipo “chip”
function StatusChip({ injured }: { injured?: boolean }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${
        injured
          ? 'bg-[hsl(var(--accent)/0.15)] text-[hsl(var(--accent))] border-[hsl(var(--accent)/0.3)]'
          : 'bg-[hsl(var(--success)/0.12)] text-[hsl(var(--success))] border-[hsl(var(--success)/0.3)]'
      }`}
    >
      {injured ? 'Lesionado' : 'Disponible'}
    </span>
  );
}

export default function FutbolEditor() {
  const [activeTeam, setActiveTeam] = useState<TeamId>('boca');

  const [players, setPlayers] = useState<Player[]>(
    teamsData[activeTeam].players
  );

  const [dt, setDt] = useState(teamsData[activeTeam].dt);
  const [capitan, setCapitan] = useState(teamsData[activeTeam].capitan);

  const [saving, setSaving] = useState(false);

  const [newPlayer, setNewPlayer] = useState({
    number: '',
    name: '',
    position: 'DEL' as Position,
  });

  const switchTeam = (id: TeamId) => {
    setActiveTeam(id);
    setPlayers(teamsData[id].players);
    setDt(teamsData[id].dt);
    setCapitan(teamsData[id].capitan);
  };

  const addPlayer = () => {
    if (!newPlayer.name.trim() || !newPlayer.number) return;

    const num = parseInt(newPlayer.number);

    const player: Player = {
      id: `${activeTeam}-${Date.now()}`,
      number: num,
      name: newPlayer.name.trim(),
      position: newPlayer.position,
    };

    setPlayers((prev) => [...prev, player]);
    setNewPlayer({ number: '', name: '', position: 'DEL' });

    toast.success('Jugador agregado');
  };

  const removePlayer = (id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
    toast.success('Jugador eliminado');
  };

  const toggleInjured = (id: string) => {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, injured: !p.injured } : p
      )
    );
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const saved = localStorage.getItem('sportsData');
      const data = saved ? JSON.parse(saved) : {};

      const updated = {
        ...data,
        [activeTeam]: {
          ...(data?.[activeTeam] || {}),
          dt,
          capitan,
          players,
        },
      };

      localStorage.setItem('sportsData', JSON.stringify(updated));

      toast.success('Plantel guardado correctamente');
    } catch (err) {
      toast.error('Error al guardar');
    }

    setSaving(false);
  };

  return (
    <div className="space-y-6 fade-in">

      {/* 🔵 SELECTOR DE EQUIPOS (chips estilo selección) */}
      <div className="flex gap-2 overflow-x-auto">
        {teamOptions.map((t) => (
          <button
            key={t.id}
            onClick={() => switchTeam(t.id)}
            className={`px-5 py-2 rounded-full font-semibold transition-all ${
              activeTeam === t.id
                ? 'chip-active'
                : 'chip-inactive'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 🧠 DT + CAPITÁN */}
      <div className="tv-card grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-[hsl(var(--muted))]">Director Técnico</p>
          <input
            value={dt}
            onChange={(e) => setDt(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-xl bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))]"
          />
        </div>

        <div>
          <p className="text-xs text-[hsl(var(--muted))]">Capitán</p>
          <input
            value={capitan}
            onChange={(e) => setCapitan(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-xl bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))]"
          />
        </div>
      </div>

      {/* ➕ AGREGAR JUGADOR */}
      <div className="tv-card flex flex-wrap gap-2 items-end">
        <input
          placeholder="Nombre"
          value={newPlayer.name}
          onChange={(e) =>
            setNewPlayer((p) => ({ ...p, name: e.target.value }))
          }
          className="flex-1 min-w-[120px] px-3 py-2 rounded-xl border"
        />

        <input
          placeholder="Nro"
          value={newPlayer.number}
          onChange={(e) =>
            setNewPlayer((p) => ({ ...p, number: e.target.value }))
          }
          className="w-20 px-3 py-2 rounded-xl border"
        />

        <button
          onClick={addPlayer}
          className="px-4 py-2 rounded-xl bg-[hsl(var(--primary))] text-white"
        >
          <PlusCircle size={16} /> Agregar
        </button>
      </div>

      {/* 🧩 JUGADORES (ESTILO “CARDS PRO”) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {players.map((p) => (
          <div
            key={p.id}
            className="tv-card flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[hsl(var(--primary)/0.1)] flex items-center justify-center font-bold text-[hsl(var(--primary))]">
                {p.number}
              </div>

              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-xs text-[hsl(var(--muted))]">
                  {p.position}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 items-end">
              <button onClick={() => toggleInjured(p.id)}>
                <StatusChip injured={p.injured} />
              </button>

              <button
                onClick={() => removePlayer(p.id)}
                className="text-[hsl(var(--accent))]"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 💾 GUARDAR */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-[hsl(var(--primary))] text-white font-bold"
        >
          <Save size={16} /> {saving ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </div>
  );
}
