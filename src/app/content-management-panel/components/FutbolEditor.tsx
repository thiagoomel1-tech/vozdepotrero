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

// cargar desde localStorage
useEffect(() => {
const saved = localStorage.getItem("sportsData");
if (saved) {
const parsed = JSON.parse(saved);
if (parsed[activeTeam]) {
setPlayers(parsed[activeTeam].players);
setDt(parsed[activeTeam].dt);
setCapitan(parsed[activeTeam].capitan);
}
} else {
setPlayers(teamsData[activeTeam].players);
setDt(teamsData[activeTeam].dt);
setCapitan(teamsData[activeTeam].capitan);
}
}, [activeTeam]);

const switchTeam = (id: TeamId) => {
setActiveTeam(id);
setAddError('');
};

const addPlayer = () => {
if (!newPlayer.name.trim() || !newPlayer.number) {
setAddError('Nombre y número son obligatorios.');
return;
}

```
const num = parseInt(newPlayer.number);

if (players.some((p) => p.number === num)) {
  setAddError(`El número ${num} ya existe en el plantel.`);
  return;
}

setAddError('');

const id = `${activeTeam}-${Date.now()}`;

setPlayers((prev) => [
  ...prev,
  {
    id,
    number: num,
    name: newPlayer.name.trim(),
    position: newPlayer.position,
    injured: false
  }
]);

setNewPlayer({ number: '', name: '', position: 'DEL' });

toast.success('Jugador agregado');
```

};

const removePlayer = (id: string) => {
setPlayers((prev) => prev.filter((p) => p.id !== id));
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

```
try {
  const saved = localStorage.getItem("sportsData");
  const data = saved ? JSON.parse(saved) : {};

  const updated = {
    ...data,
    [activeTeam]: {
      dt,
      capitan,
      players
    }
  };

  localStorage.setItem(
    "sportsData",
    JSON.stringify(updated)
  );

  toast.success("Plantel guardado correctamente");
} catch (e) {
  toast.error("Error al guardar");
}

setSaving(false);
```

};

const posColors: Record<string, string> = {
ARQ: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
DEF: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
MED: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
DEL: 'bg-red-500/20 text-red-400 border-red-500/30',
};

return ( <div className="space-y-6">

```
  <div className="flex gap-2 overflow-x-auto">
    {teamOptions.map((t) => (
      <button
        key={t.id}
        onClick={() => switchTeam(t.id)}
        className={`px-4 py-2 rounded-xl ${
          activeTeam === t.id ? 'chip-active' : 'chip-inactive'
        }`}
      >
        {t.label}
      </button>
    ))}
  </div>

  <div className="tv-card space-y-4">
    <input
      value={dt}
      onChange={(e) => setDt(e.target.value)}
      placeholder="DT"
      className="input"
    />

    <input
      value={capitan}
      onChange={(e) => setCapitan(e.target.value)}
      placeholder="Capitán"
      className="input"
    />
  </div>

  <div className="tv-card">
    {players.map((player) => (
      <div key={player.id} className="flex justify-between py-2">

        <span>{player.number}</span>
        <span>{player.name}</span>

        <button
          onClick={() => toggleInjured(player.id)}
          className={player.injured ? 'text-red-500' : 'text-green-500'}
        >
          {player.injured ? 'Lesionado' : 'Disponible'}
        </button>

        <button onClick={() => removePlayer(player.id)}>
          <Trash2 size={16} />
        </button>

      </div>
    ))}
  </div>

  <button
    onClick={handleSave}
    disabled={saving}
    className="btn-primary"
  >
    {saving ? "Guardando..." : "Guardar Plantel"}
  </button>

</div>
```

);
}

