'use client';
import React, { useState } from 'react';
import { argSelection } from '@/lib/sportsData';
import { toast } from 'sonner';
import { Save, Plus, Trash2, AlertCircle } from 'lucide-react';

type SelTab = 'titulos' | 'goleadores';

export default function SeleccionEditor() {
  const [activeTab, setActiveTab] = useState<SelTab>('titulos');
  const [titles, setTitles] = useState(argSelection.titles);
  const [scorers, setScorers] = useState(argSelection.topScorers);
  const [saving, setSaving] = useState(false);

  const [newTitle, setNewTitle] = useState({ name: '', year: '', host: '' });
  const [titleError, setTitleError] = useState('');
  const [newScorer, setNewScorer] = useState({ name: '', goals: '', caps: '' });
  const [scorerError, setScorerError] = useState('');

  const addTitle = () => {
    if (!newTitle.name.trim() || !newTitle.year) {
      setTitleError('Nombre y año son obligatorios.');
      return;
    }
    if (titles.some((t) => t.name === newTitle.name && t.year === parseInt(newTitle.year))) {
      setTitleError('Ese título ya existe para ese año.');
      return;
    }
    setTitleError('');
    setTitles((prev) => [...prev, {
      id: `arg-t-new-${Date.now()}`,
      name: newTitle.name.trim(),
      year: parseInt(newTitle.year),
      host: newTitle.host.trim() || 'Sin definir',
    }]);
    setNewTitle({ name: '', year: '', host: '' });
    toast.success('Título agregado');
  };

  const removeTitle = (id: string) => {
    const t = titles.find((x) => x.id === id);
    setTitles((prev) => prev.filter((x) => x.id !== id));
    toast.success('Título eliminado', { description: t?.name });
  };

  const addScorer = () => {
    if (!newScorer.name.trim()) {
      setScorerError('El nombre es obligatorio.');
      return;
    }
    if (scorers.some((s) => s.name.toLowerCase() === newScorer.name.toLowerCase())) {
      setScorerError(`${newScorer.name} ya existe en la tabla.`);
      return;
    }
    setScorerError('');
    setScorers((prev) => [...prev, {
      id: `arg-gs-new-${Date.now()}`,
      name: newScorer.name.trim(),
      goals: parseInt(newScorer.goals) || 0,
      caps: parseInt(newScorer.caps) || 0,
      active: false,
    }]);
    setNewScorer({ name: '', goals: '', caps: '' });
    toast.success('Goleador agregado');
  };

  const removeScorer = (id: string) => {
    const s = scorers.find((x) => x.id === id);
    setScorers((prev) => prev.filter((x) => x.id !== id));
    toast.success('Goleador eliminado', { description: s?.name });
  };

  const handleSave = async () => {
    setSaving(true);
    // Backend integration: PUT /api/seleccion with { titles, scorers }
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    toast.success('Datos de Selección guardados');
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(['titulos', 'goleadores'] as SelTab[]).map((tab) => (
          <button
            key={`sel-editor-tab-${tab}`}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-150 active:scale-95 capitalize ${
              activeTab === tab ? 'chip-active' : 'chip-inactive hover:border-[hsl(var(--primary)/0.4)]'
            }`}
          >
            {tab === 'titulos' ? 'Títulos' : 'Goleadores'}
          </button>
        ))}
      </div>

      {activeTab === 'titulos' && (
        <div className="space-y-5">
          <div className="tv-card space-y-4">
            <h3 className="text-lg font-bold text-[hsl(var(--foreground))]">Agregar Título</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-[hsl(var(--muted-foreground))] mb-2 uppercase tracking-widest">
                  Nombre del título
                </label>
                <input
                  type="text"
                  value={newTitle.name}
                  onChange={(e) => setNewTitle((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Copa América"
                  className="w-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl px-4 py-3 text-base text-[hsl(var(--foreground))] outline-none focus:border-[hsl(var(--primary))] transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[hsl(var(--muted-foreground))] mb-2 uppercase tracking-widest">
                  Año
                </label>
                <input
                  type="number"
                  value={newTitle.year}
                  onChange={(e) => setNewTitle((p) => ({ ...p, year: e.target.value }))}
                  placeholder="2024"
                  className="w-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl px-4 py-3 text-base font-mono text-[hsl(var(--foreground))] outline-none focus:border-[hsl(var(--primary))] transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[hsl(var(--muted-foreground))] mb-2 uppercase tracking-widest">
                  Sede
                </label>
                <input
                  type="text"
                  value={newTitle.host}
                  onChange={(e) => setNewTitle((p) => ({ ...p, host: e.target.value }))}
                  placeholder="Estados Unidos"
                  className="w-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl px-4 py-3 text-base text-[hsl(var(--foreground))] outline-none focus:border-[hsl(var(--primary))] transition-all duration-200"
                />
              </div>
            </div>
            {titleError && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[hsl(var(--accent)/0.1)] border border-[hsl(var(--accent)/0.3)]">
                <AlertCircle size={16} className="text-[hsl(var(--accent))] flex-shrink-0" />
                <p className="text-sm text-[hsl(var(--accent))]">{titleError}</p>
              </div>
            )}
            <button
              onClick={addTitle}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] text-sm font-semibold text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.5)] hover:text-[hsl(var(--primary))] transition-all duration-150 active:scale-95"
            >
              <Plus size={16} />
              Agregar título
            </button>
          </div>

          <div className="tv-card overflow-x-auto">
            <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-4">
              Todos los títulos — {titles.length} registros
            </h3>
            <table className="w-full min-w-[400px]">
              <thead>
                <tr className="border-b border-[hsl(var(--border))]">
                  <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Título</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Año</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Sede</th>
                  <th className="text-right py-3 px-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Acción</th>
                </tr>
              </thead>
              <tbody>
                {[...titles].sort((a, b) => b.year - a.year).map((t) => (
                  <tr key={t.id} className="tv-table-row border-b border-[hsl(var(--border)/0.5)] transition-colors duration-100">
                    <td className="py-3 px-2 text-base font-semibold text-[hsl(var(--foreground))]">{t.name}</td>
                    <td className="py-3 px-2 font-mono font-bold text-[hsl(var(--primary))]">{t.year}</td>
                    <td className="py-3 px-2 text-sm text-[hsl(var(--muted-foreground))]">{t.host}</td>
                    <td className="py-3 px-2 text-right">
                      <button
                        onClick={() => removeTitle(t.id)}
                        className="p-2 rounded-lg text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--accent))] hover:bg-[hsl(var(--accent)/0.1)] transition-all duration-150"
                        aria-label={`Eliminar ${t.name} ${t.year}`}
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

      {activeTab === 'goleadores' && (
        <div className="space-y-5">
          <div className="tv-card space-y-4">
            <h3 className="text-lg font-bold text-[hsl(var(--foreground))]">Agregar Goleador</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[hsl(var(--muted-foreground))] mb-2 uppercase tracking-widest">
                  Nombre
                </label>
                <input
                  type="text"
                  value={newScorer.name}
                  onChange={(e) => setNewScorer((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Lautaro Martínez"
                  className="w-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl px-4 py-3 text-base text-[hsl(var(--foreground))] outline-none focus:border-[hsl(var(--primary))] transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[hsl(var(--muted-foreground))] mb-2 uppercase tracking-widest">
                  Goles
                </label>
                <input
                  type="number"
                  value={newScorer.goals}
                  onChange={(e) => setNewScorer((p) => ({ ...p, goals: e.target.value }))}
                  placeholder="0"
                  className="w-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl px-4 py-3 text-base font-mono text-[hsl(var(--foreground))] outline-none focus:border-[hsl(var(--primary))] transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[hsl(var(--muted-foreground))] mb-2 uppercase tracking-widest">
                  Partidos
                </label>
                <input
                  type="number"
                  value={newScorer.caps}
                  onChange={(e) => setNewScorer((p) => ({ ...p, caps: e.target.value }))}
                  placeholder="0"
                  className="w-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl px-4 py-3 text-base font-mono text-[hsl(var(--foreground))] outline-none focus:border-[hsl(var(--primary))] transition-all duration-200"
                />
              </div>
            </div>
            {scorerError && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[hsl(var(--accent)/0.1)] border border-[hsl(var(--accent)/0.3)]">
                <AlertCircle size={16} className="text-[hsl(var(--accent))] flex-shrink-0" />
                <p className="text-sm text-[hsl(var(--accent))]">{scorerError}</p>
              </div>
            )}
            <button
              onClick={addScorer}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] text-sm font-semibold text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.5)] hover:text-[hsl(var(--primary))] transition-all duration-150 active:scale-95"
            >
              <Plus size={16} />
              Agregar goleador
            </button>
          </div>

          <div className="tv-card overflow-x-auto">
            <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-4">Tabla de Goleadores</h3>
            <table className="w-full min-w-[380px]">
              <thead>
                <tr className="border-b border-[hsl(var(--border))]">
                  <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Jugador</th>
                  <th className="text-center py-3 px-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Goles</th>
                  <th className="text-center py-3 px-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Partidos</th>
                  <th className="text-right py-3 px-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Acción</th>
                </tr>
              </thead>
              <tbody>
                {[...scorers].sort((a, b) => b.goals - a.goals).map((s) => (
                  <tr key={s.id} className="tv-table-row border-b border-[hsl(var(--border)/0.5)] transition-colors duration-100">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-[hsl(var(--foreground))]">{s.name}</span>
                        {s.active && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[hsl(var(--success)/0.15)] text-[hsl(var(--success))] border border-[hsl(var(--success)/0.3)]">
                            Activo
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center font-mono font-bold text-xl text-[hsl(var(--primary))]">{s.goals}</td>
                    <td className="py-3 px-2 text-center font-mono text-base text-[hsl(var(--muted-foreground))]">{s.caps}</td>
                    <td className="py-3 px-2 text-right">
                      <button
                        onClick={() => removeScorer(s.id)}
                        className="p-2 rounded-lg text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--accent))] hover:bg-[hsl(var(--accent)/0.1)] transition-all duration-150"
                        aria-label={`Eliminar ${s.name}`}
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
              Guardar Selección
            </>
          )}
        </button>
      </div>
    </div>
  );
}