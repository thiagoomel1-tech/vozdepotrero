'use client';

import React, { useState } from 'react';
import { teamsData } from '@/lib/sportsData';
import type { Player, Position } from '@/lib/sportsData';
import { toast } from 'sonner';
import { Trash2, Save } from 'lucide-react';

type TeamId = 'boca' | 'river' | 'central' | 'newells';

const teamOptions = [
  { id: 'boca', label: 'Boca Juniors' },
  { id: 'river', label: 'River Plate' },
  { id: 'central', label: 'Rosario Central' },
  { id: 'newells', label: "Newell's Old Boys" },
];

export default function FutbolEditor() {
  const [activeTeam, setActiveTeam] = useState<TeamId>('boca');
  const [players, setPlayers] = useState<Player[]>(teamsData[activeTeam].players);
  const [dt, setDt] = useState(teamsData[activeTeam].dt);
  const [capitan, setCapitan] = useState(teamsData[activeTeam].capitan);
  const [saving, setSaving] = useState(false);

  const switchTeam = (id: TeamId) => {
    setActiveTeam(id);
    setPlayers(teamsData[id].players);
    setDt(teamsData[id].dt);
    setCapitan(teamsData[id].capitan);
  };

  const toggleInjured = (id: string) => {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, injured: !p.injured } : p
      )
    );
  };

  const removePlayer = (id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);

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

    setSaving(false);
  };

  return (
    <div className="space-y-6">

      {/* 🔥 HEADER EQUIPOS (chips estilo neón) */}
      <div className="flex gap-2 overflow-x-auto">
        {teamOptions.map((t) => (
          <button
            key={t.id}
            onClick={() => switchTeam(t.id as TeamId)}
            className={`px-5 py-2 rounded-full font-bold border transition-all ${
              activeTeam === t.id
                ? 'bg-[#EFFF00] text-black'
                : 'bg-[#111] text-white border-[#333]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 🧠 DT + CAPITÁN */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#111] p-3 rounded-[18px] text-white">
          <p className="text-xs text-gray-400">DT</p>
          <input
            value={dt}
            onChange={(e) => setDt(e.target.value)}
            className="bg-transparent w-full text-white font-bold outline-none"
          />
        </div>

        <div className="bg-[#111] p-3 rounded-[18px] text-white">
          <p className="text-xs text-gray-400">Capitán</p>
          <input
            value={capitan}
            onChange={(e) => setCapitan(e.target.value)}
            className="bg-transparent w-full text-white font-bold outline-none"
          />
        </div>
      </div>

      {/* ⚽ JUGADORES (ESTILO ORIGINAL RESTAURADO) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {players.map((p) => (
          <div
            key={p.id}
            className="bg-[#0a0a0a] border border-[#222] rounded-[18px] p-4 flex justify-between items-center"
          >
            {/* IZQUIERDA */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#EFFF00] text-black font-bold flex items-center justify-center">
                {p.number}
              </div>

              <div>
                <p className="text-white font-bold">{p.name}</p>
                <p className="text-xs text-gray-400">{p.position}</p>
              </div>
            </div>

            {/* DERECHA */}
            <div className="flex flex-col items-end gap-2">
              <button
                onClick={() => toggleInjured(p.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  p.injured
                    ? 'bg-red-600 text-white'
                    : 'bg-green-500 text-black'
                }`}
              >
                {p.injured ? 'Lesionado' : 'Disponible'}
              </button>

              <button
                onClick={() => removePlayer(p.id)}
                className="text-red-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 💾 SAVE */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#EFFF00] text-black px-6 py-3 rounded-xl font-bold"
        >
          <Save size={16} /> {saving ? 'Guardando...' : 'Guardar Plantel'}
        </button>
      </div>
    </div>
  );
}
