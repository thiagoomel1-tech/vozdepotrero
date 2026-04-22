'use client';
import React, { useState, useEffect } from 'react';
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
  const [players, setPlayers] = useState<Player[]>(teamsData.boca.players);
  const [dt, setDt] = useState(teamsData.boca.dt);
  const [capitan, setCapitan] = useState(teamsData.boca.capitan);
  const [saving, setSaving] = useState(false);
  const [addError, setAddError] = useState('');

  const [newPlayer, setNewPlayer] = useState({
    number: '',
    name: '',
    position: 'DEL' as Position
  });

  // cargar datos guardados
  useEffect(() => {
    const saved = localStorage.getItem("sportsData");
    if (!saved) return;

    try {
      const data = JSON.parse(saved);
      if (data?.[activeTeam]) {
        setPlayers(data[activeTeam].players || []);
        setDt(data[activeTeam].dt || "");
        setCapitan(data[activeTeam].capitan || "");
      }
    } catch {}
  }, [activeTeam]);

  const switchTeam = (id: TeamId) => {
    setActiveTeam(id);

    const saved = localStorage.getItem("sportsData");

    if (saved) {
      const data = JSON.parse(saved);

      if (data?.[id]) {
        setPlayers(data[id].players || []);
        setDt(data[id].dt || "");
        setCapitan(data[id].capitan || "");
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

    const newItem: Player = {
      id: `${activeTeam}-${Date.now()}`,
      number: num,
      name: newPlayer.name,
      position: newPlayer.position,
      injured: false
    };

    setPlayers([...players, newItem]);

    setNewPlayer({
      number: '',
      name: '',
      position: 'DEL'
    });

    setAddError('');
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  const toggleInjured = (id: string) => {
    setPlayers(
      players.map(p =>
        p.id === id ? { ...p, injured: !p.injured } : p
      )
    );
  };

  const handleSave = () => {

    setSaving(true);

    const saved = localStorage.getItem("sportsData");
    const data = saved ? JSON.parse(saved) : {};

    data[activeTeam] = {
      dt,
      capitan,
      players
    };

    localStorage.setItem("sportsData", JSON.stringify(data));

    setTimeout(() => {
      setSaving(false);
      toast.success("Plantel guardado");
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

      <div className="flex gap-2 overflow-x-auto pb-1">
        {teamOptions.map((t) => (
          <button
            key={t.id}
            onClick={() => switchTeam(t.id)}
            className={`px-4 py-2 rounded-full ${
              activeTeam === t.id ? 'chip-active' : 'chip-inactive'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="tv-card">
        <h3 className="font-bold mb-3">DT</h3>
        <input
          value={dt}
          onChange={(e) => setDt(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="tv-card">
        <h3 className="font-bold mb-3">Capitán</h3>
        <input
          value={capitan}
          onChange={(e) => setCapitan(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="tv-card space-y-3">
        <input
          placeholder="Numero"
          value={newPlayer.number}
          onChange={(e)=>setNewPlayer({...newPlayer,number:e.target.value})}
          className="w-full p-2 border rounded"
        />

        <input
          placeholder="Nombre"
          value={newPlayer.name}
          onChange={(e)=>setNewPlayer({...newPlayer,name:e.target.value})}
          className="w-full p-2 border rounded"
        />

        <button onClick={addPlayer} className="tv-button">
          Agregar jugador
        </button>

        {addError && <p className="text-red-500">{addError}</p>}
      </div>

      <div className="tv-card">
        { [...players].sort((a,b)=>a.number-b.number).map(player => (
          <div key={player.id} className="flex justify-between py-2">

            <div>
              {player.number} - {player.name}
            </div>

            <div className="flex gap-2">

              <button onClick={()=>toggleInjured(player.id)}>
                {player.injured ? "Lesionado" : "Disponible"}
              </button>

              <button onClick={()=>removePlayer(player.id)}>
                <Trash2 size={16}/>
              </button>

            </div>

          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="tv-button"
      >
        {saving ? "Guardando..." : "Guardar Plantel"}
      </button>

    </div>
  );
}
