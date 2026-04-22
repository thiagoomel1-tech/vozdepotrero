'use client';
import React, { useState } from 'react';
import { f1Pilots, f1Constructors } from '@/lib/sportsData';
import type { F1Pilot, F1Constructor } from '@/lib/sportsData';
import { toast } from 'sonner';
import { Save, Plus, Trash2, AlertCircle } from 'lucide-react';

type F1Tab = 'pilotos' | 'constructores';

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

export default function F1Editor() {
  const [activeTab, setActiveTab] = useState<F1Tab>('pilotos');
  const [pilots, setPilots] = useState<F1Pilot[]>(f1Pilots);
  const [constructors, setConstructors] = useState<F1Constructor[]>(f1Constructors);
  const [saving, setSaving] = useState(false);
  const [editingPilot, setEditingPilot] = useState<string | null>(null);
  const [addPilotError, setAddPilotError] = useState('');
  const [newPilot, setNewPilot] = useState({ name: '', team: 'Mercedes', points: '', nationality: '' });

  const updatePilotPoints = (id: string, points: string) => {
    const num = parseInt(points) || 0;
    setPilots((prev) => prev.map((p) => p.id === id ? { ...p, points: num } : p));
  };

  const addPilot = () => {
    if (!newPilot.name.trim()) {
      setAddPilotError('El nombre del piloto es obligatorio.');
      return;
    }
    if (pilots.some((p) => p.name.toLowerCase() === newPilot.name.toLowerCase())) {
      setAddPilotError(`${newPilot.name} ya existe en la tabla.`);
      return;
    }
    setAddPilotError('');
    const newPos = pilots.length + 1;
    const id = `pilot-new-${Date.now()}`;
    setPilots((prev) => [...prev, {
      id,
      pos: newPos,
      name: newPilot.name.trim(),
      team: newPilot.team,
      points: parseInt(newPilot.points) || 0,
      nationality: newPilot.nationality || '🏁',
    }]);
    setNewPilot({ name: '', team: 'Mercedes', points: '', nationality: '' });
    toast.success('Piloto agregado', { description: `${newPilot.name} añadido a la tabla.` });
  };

  const removePilot = (id: string) => {
    const pilot = pilots.find((p) => p.id === id);
    setPilots((prev) => prev.filter((p) => p.id !== id));
    toast.success('Piloto eliminado', { description: `${pilot?.name} removido de la tabla.` });
  };

  const updateConstructorPoints = (id: string, points: string) => {
    const num = parseInt(points) || 0;
    setConstructors((prev) => prev.map((c) => c.id === id ? { ...c, points: num } : c));
  };

  const handleSave = async () => {
    setSaving(true);
    // Backend integration: PUT /api/f1/standings with { pilots, constructors }
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    toast.success('Datos F1 guardados', { description: 'Tabla de pilotos y constructores actualizada.' });
  };

  const sortedPilots = [...pilots].sort((a, b) => b.points - a.points).map((p, i) => ({ ...p, pos: i + 1 }));

  return (
    <div className="space-y-6">
      {/* Sub tabs */}
      <div className="flex gap-2">
        {(['pilotos', 'constructores'] as F1Tab[]).map((tab) => (
          <button
            key={`f1-editor-tab-${tab}`}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-150 active:scale-95 capitalize ${
              activeTab === tab ? 'chip-active' : 'chip-inactive hover:border-[hsl(var(--primary)/0.4)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'pilotos' && (
        <div className="space-y-5">
          {/* Add pilot */}
          <div className="tv-card space-y-4">
            <h3 className="text-lg font-bold text-[hsl(var(--foreground))]">Agregar Piloto</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-semibold text-[hsl(var(--muted-foreground))] mb-2 uppercase tracking-widest">
                  Bandera
                </label>
                <input
                  type="text"
                  value={newPilot.nationality}
                  onChange={(e) => setNewPilot((p) => ({ ...p, nationality: e.target.value }))}
                  placeholder="🇦🇷"
                  className="w-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl px-4 py-3 text-xl text-[hsl(var(--foreground))] outline-none focus:border-[hsl(var(--primary))] transition-all duration-200"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-[hsl(var(--muted-foreground))] mb-2 uppercase tracking-widest">
                  Nombre del piloto
                </label>
                <input
                  type="text"
                  value={newPilot.name}
                  onChange={(e) => setNewPilot((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Ej: Franco Colapinto"
                  className="w-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl px-4 py-3 text-base text-[hsl(var(--foreground))] outline-none focus:border-[hsl(var(--primary))] transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[hsl(var(--muted-foreground))] mb-2 uppercase tracking-widest">
                  Puntos
                </label>
                <input
                  type="number"
                  value={newPilot.points}
                  onChange={(e) => setNewPilot((p) => ({ ...p, points: e.target.value }))}
                  placeholder="0"
                  className="w-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl px-4 py-3 text-base font-mono text-[hsl(var(--foreground))] outline-none focus:border-[hsl(var(--primary))] transition-all duration-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[hsl(var(--muted-foreground))] mb-2 uppercase tracking-widest">
                Equipo
              </label>
              <select
                value={newPilot.team}
                onChange={(e) => setNewPilot((p) => ({ ...p, team: e.target.value }))}
                className="bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl px-4 py-3 text-base text-[hsl(var(--foreground))] outline-none focus:border-[hsl(var(--primary))] transition-all duration-200"
              >
                {Object.keys(teamColors).map((team) => (
                  <option key={`team-opt-${team}`} value={team}>{team}</option>
                ))}
              </select>
            </div>
            {addPilotError && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[hsl(var(--accent)/0.1)] border border-[hsl(var(--accent)/0.3)]">
                <AlertCircle size={16} className="text-[hsl(var(--accent))] flex-shrink-0" />
                <p className="text-sm text-[hsl(var(--accent))]">{addPilotError}</p>
              </div>
            )}
            <button
              onClick={addPilot}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] text-sm font-semibold text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.5)] hover:text-[hsl(var(--primary))] transition-all duration-150 active:scale-95"
            >
              <Plus size={16} />
              Agregar piloto
            </button>
          </div>

          {/* Pilots table */}
          <div className="tv-card overflow-x-auto">
            <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-4">Tabla de Pilotos — editable</h3>
            <table className="w-full min-w-[520px]">
              <thead>
                <tr className="border-b border-[hsl(var(--border))]">
                  <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Pos</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Piloto</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Equipo</th>
                  <th className="text-center py-3 px-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Puntos</th>
                  <th className="text-right py-3 px-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sortedPilots.map((pilot) => (
                  <tr key={pilot.id} className="tv-table-row border-b border-[hsl(var(--border)/0.5)] transition-colors duration-100">
                    <td className="py-3 px-2 font-mono font-bold text-base text-[hsl(var(--muted-foreground))]">{pilot.pos}</td>
                    <td className="py-3 px-2 text-base font-semibold text-[hsl(var(--foreground))]">
                      {pilot.nationality} {pilot.name}
                      {pilot.highlight && <span className="ml-2 text-xs font-bold text-[hsl(var(--primary))]">ARG</span>}
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className="text-xs font-semibold px-2 py-1 rounded-lg"
                        style={{ backgroundColor: `${teamColors[pilot.team] ?? '#888'}22`, color: teamColors[pilot.team] ?? '#888' }}
                      >
                        {pilot.team}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      {editingPilot === pilot.id ? (
                        <input
                          type="number"
                          defaultValue={pilot.points}
                          onBlur={(e) => { updatePilotPoints(pilot.id, e.target.value); setEditingPilot(null); }}
                          onKeyDown={(e) => { if (e.key === 'Enter') { updatePilotPoints(pilot.id, e.currentTarget.value); setEditingPilot(null); } }}
                          autoFocus
                          className="w-20 text-center bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--primary))] rounded-lg px-2 py-1 font-mono font-bold text-base text-[hsl(var(--foreground))] outline-none"
                        />
                      ) : (
                        <button
                          onClick={() => setEditingPilot(pilot.id)}
                          className="font-mono font-bold text-xl text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors px-2 py-1 rounded-lg hover:bg-[hsl(var(--surface-elevated))]"
                          title="Clic para editar puntos"
                        >
                          {pilot.points}
                        </button>
                      )}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <button
                        onClick={() => removePilot(pilot.id)}
                        className="p-2 rounded-lg text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--accent))] hover:bg-[hsl(var(--accent)/0.1)] transition-all duration-150"
                        aria-label={`Eliminar ${pilot.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'constructores' && (
        <div className="tv-card overflow-x-auto">
          <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-4">Tabla de Constructores — editable</h3>
          <p className="text-sm text-[hsl(var(--muted))] mb-4">Hacé clic en los puntos para editar directamente.</p>
          <table className="w-full min-w-[400px]">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Pos</th>
                <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Constructor</th>
                <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Pilotos</th>
                <th className="text-right py-3 px-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Puntos</th>
              </tr>
            </thead>
            <tbody>
              {[...constructors].sort((a, b) => b.points - a.points).map((c, i) => (
                <ConstructorRow
                  key={c.id}
                  constructor={{ ...c, pos: i + 1 }}
                  onUpdatePoints={updateConstructorPoints}
                  teamColors={teamColors}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

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
              Guardar Datos F1
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function ConstructorRow({
  constructor: c,
  onUpdatePoints,
  teamColors,
}: {
  constructor: F1Constructor & { pos: number };
  onUpdatePoints: (id: string, points: string) => void;
  teamColors: Record<string, string>;
}) {
  const [editing, setEditing] = useState(false);

  return (
    <tr className="tv-table-row border-b border-[hsl(var(--border)/0.5)] transition-colors duration-100">
      <td className="py-3 px-2 font-mono font-bold text-base text-[hsl(var(--muted-foreground))]">{c.pos}</td>
      <td className="py-3 px-2">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: teamColors[c.name] ?? '#888' }} />
          <span className="text-base font-bold text-[hsl(var(--foreground))]">{c.name}</span>
        </div>
      </td>
      <td className="py-3 px-2 text-sm text-[hsl(var(--muted-foreground))]">{c.pilots.join(' · ')}</td>
      <td className="py-3 px-2 text-right">
        {editing ? (
          <input
            type="number"
            defaultValue={c.points}
            onBlur={(e) => { onUpdatePoints(c.id, e.target.value); setEditing(false); }}
            onKeyDown={(e) => { if (e.key === 'Enter') { onUpdatePoints(c.id, e.currentTarget.value); setEditing(false); } }}
            autoFocus
            className="w-24 text-right bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--primary))] rounded-lg px-2 py-1 font-mono font-bold text-lg text-[hsl(var(--foreground))] outline-none"
          />
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="font-mono font-bold text-2xl text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors px-2 py-1 rounded-lg hover:bg-[hsl(var(--surface-elevated))]"
            title="Clic para editar"
          >
            {c.points}
          </button>
        )}
      </td>
    </tr>
  );
}