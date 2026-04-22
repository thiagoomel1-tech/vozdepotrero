'use client';

import React, { useState, useEffect } from 'react';
import { teamsData } from '@/lib/sportsData';
import type { Player, Position } from '@/lib/sportsData';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

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
  const [players, setPlayers] = useState<Player[]>(teamsData.boca.players);
  const [dt, setDt] = useState(teamsData.boca.dt);
  const [capitan, setCapitan] = useState(teamsData.boca.capitan);
  const [saving, setSaving] = useState(false);

  const [newPlayer, setNewPlayer] = useState({
    number: '',
    name: '',
    position: 'DEL' as Position,
  });

  const [addError, setAddError] = useState('');

  // cargar localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sportsData');
    if (!saved) return;

    try {
      const data = JSON.parse(saved);
      if (data?.[activeTeam]) {
        setPlayers(data[activeTeam].players || []);
        setDt(data[activeTeam].dt || '');
        setCapitan(data[activeTeam].capitan || '');
      }
    } catch {}
  }, [activeTeam]);

  const switchTeam = (id: TeamId) => {
    setActiveTeam(id);

    const saved = localStorage.getItem('sportsData');

    if (saved) {
      const data = JSON.parse(saved);
      if (data?.[id]) {
        setPlayers(data[id].players || []);
        setDt(data[id].dt || '');
        setCapitan(data[id].capitan || '');
        return;
      }
    }

    setPlayers(teamsData[id].players);
    setDt(teamsData[id].dt);
    setCapitan(teamsData[id].capitan);
  };

  const addPlayer = () => {
    if (!newPlayer.name.trim() || !newPlayer.number) {
      setAddError('Nombre y número obligatorios');
      return;
    }

    const num = parseInt(newPlayer.number);

    if (players.some((p) => p.number === num)) {
      setAddError('Número ya existe');
      return;
    }

    const player: Player = {
      id: `${activeTeam}-${Date.now()}`,
      number: num,
      name: newPlayer.name.trim(),
      position: newPlayer.position,
      injured: false,
    };

    setPlayers([...players, player]);

    setNewPlayer({ number: '', name: '', position: 'DEL' });
    setAddError('');
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter((p) => p.id !== id));
  };

  const toggleInjured = (id: string) => {
    setPlayers(
      players.map((p) =>
        p.id === id ? { ...p, injured: !p.injured } : p
      )
    );
  };

  const handleSave = () => {
    setSaving(true);

    const saved = localStorage.getItem('sportsData');
    const data = saved ? JSON.parse(saved) : {};

    data[activeTeam] = {
      dt,
      capitan,
      players,
    };

    localStorage.setItem('sportsData', JSON.stringify(data));

    setTimeout(() => {
      setSaving(false);
      toast.success('Plantel guardado correctamente');
    }, 500);
  };

  const posColors: Record<string, string> = {
    ARQ: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    DEF: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    MED: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    DEL: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <div className="space-y-6">

      {/* TEAMS */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {teamOptions.map((t) => (
          <button
            key={t.id}
            onClick={() => switchTeam(t.id)}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              activeTeam === t.id
                ? 'bg-yellow-400 text-black'
                : 'bg-[#1a1a1a] text-white border border-white/10'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* DT + CAPITAN */}
      <div className="grid grid-cols-2 gap-3">
        <div className="tv-card">
          <p className="text-xs text-gray-400">DT</p>
          <input
            value={dt}
            onChange={(e) => setDt(e.target.value)}
            className="w-full bg-transparent text-white text-lg font-bold outline-none"
          />
        </div>

        <div className="tv-card">
          <p className="text-xs text-gray-400">Capitán</p>
          <input
            value={capitan}
            onChange={(e) => setCapitan(e.target.value)}
            className="w-full bg-transparent text-white text-lg font-bold outline-none"
          />
        </div>
      </div>

      {/* ADD PLAYER */}
      <div className="tv-card space-y-2">
        <input
          placeholder="Número"
          value={newPlayer.number}
          onChange={(e) =>
            setNewPlayer({ ...newPlayer, number: e.target.value })
          }
          className="w-full bg-[#111] p-2 rounded text-white"
        />

        <input
          placeholder="Nombre"
          value={newPlayer.name}
          onChange={(e) =>
            setNewPlayer({ ...newPlayer, name: e.target.value })
          }
          className="w-full bg-[#111] p-2 rounded text-white"
        />

        <button
          onClick={addPlayer}
          className="w-full bg-yellow-400 text-black font-bold py-2 rounded"
        >
          Agregar jugador
        </button>

        {addError && (
          <p className="text-red-400 text-sm">{addError}</p>
        )}
      </div>

      {/* PLAYERS CARDS */}
      <div className="grid gap-3">
        {[...players]
          .sort((a, b) => a.number - b.number)
          .map((player) => (
            <div
              key={player.id}
              className="bg-[#1a1a1a] rounded-xl p-4 flex items-center justify-between border border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="text-yellow-400 font-bold text-xl w-10">
                  {player.number}
                </div>

                <div>
                  <p className="text-white font-bold">{player.name}</p>

                  <span
                    className={`text-xs px-2 py-1 rounded-full border ${posColors[player.position]}`}
                  >
                    {player.position}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <button
                  onClick={() => toggleInjured(player.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    player.injured
                      ? 'bg-red-500 text-white'
                      : 'bg-green-500 text-white'
                  }`}
                >
                  {player.injured ? 'Lesionado' : 'Disponible'}
                </button>

                <button
                  onClick={() => removePlayer(player.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* SAVE */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-yellow-400 text-black font-bold py-3 rounded"
      >
        {saving ? 'Guardando...' : 'Guardar Plantel'}
      </button>
    </div>
  );
}
