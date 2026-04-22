'use client';
import React, { useState } from 'react';
import { teamsData, standingsZonaA, standingsZonaB } from '@/lib/sportsData';
import type { TeamData, Player, StandingsRow } from '@/lib/sportsData';
import { AlertCircle, Trophy, TrendingDown, BookOpen } from 'lucide-react';

type TeamId = 'boca' | 'river' | 'central' | 'newells';
type SubChip = 'todos' | 'plantel' | 'goleadores' | 'copas' | 'descensos' | 'historia';
type TablaZona = 'zonaA' | 'zonaB';

const teamChips: { id: TeamId; label: string; color: string }[] = [
  { id: 'boca', label: 'Boca', color: '#0038A8' },
  { id: 'river', label: 'River', color: '#CC0000' },
  { id: 'central', label: 'Rosario Central', color: '#003087' },
  { id: 'newells', label: "Newell's", color: '#CC0000' },
];

const subChips: { id: SubChip; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'plantel', label: 'Plantel' },
  { id: 'goleadores', label: 'Goleadores' },
  { id: 'copas', label: 'Copas' },
  { id: 'descensos', label: 'Descensos' },
  { id: 'historia', label: 'Historia' },
];

const posColors: Record<string, string> = {
  ARQ: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  DEF: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  LAT: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  MED: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  VOL: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  DEL: 'bg-red-500/20 text-red-400 border-red-500/30',
};

// ─── STANDINGS TABLE ──────────────────────────────────────────────────────────

function StandingsTable({ rows }: { rows: StandingsRow[] }) {
  return (
    <div className="tv-card overflow-x-auto fade-in">
      <table className="w-full min-w-[320px]">
        <thead>
          <tr className="border-b border-[hsl(var(--border))]">
            <th className="text-left py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Pos</th>
            <th className="text-left py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Equipo</th>
            <th className="text-right py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))]">Pts</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className={`tv-table-row border-b border-[hsl(var(--border)/0.5)] transition-colors duration-100 ${
                row.pos === 1 ? 'bg-[hsl(var(--primary)/0.07)]' : ''
              }`}
            >
              <td className="py-3 px-2">
                <span className={`font-mono font-bold text-lg ${row.pos <= 3 ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))]'}`}>
                  {row.pos}
                </span>
              </td>
              <td className="py-3 px-2 font-semibold text-base text-[hsl(var(--foreground))]">{row.team}</td>
              <td className="py-3 px-2 text-right font-mono font-bold text-xl text-[hsl(var(--foreground))]">{row.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TablaView() {
  const [zona, setZona] = useState<TablaZona>('zonaA');
  return (
    <div className="space-y-4 fade-in">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {(['zonaA', 'zonaB'] as TablaZona[]).map((z) => (
          <button
            key={z}
            onClick={() => setZona(z)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 active:scale-95 ${
              zona === z ? 'chip-active' : 'chip-inactive hover:border-[hsl(var(--primary)/0.4)]'
            }`}
          >
            {z === 'zonaA' ? 'Zona A' : 'Zona B'}
          </button>
        ))}
      </div>
      <h3 className="text-lg font-bold text-[hsl(var(--foreground))]">
        Tabla de Posiciones — {zona === 'zonaA' ? 'Zona A' : 'Zona B'}
      </h3>
      <StandingsTable rows={zona === 'zonaA' ? standingsZonaA : standingsZonaB} />
    </div>
  );
}

// ─── PLANTEL ─────────────────────────────────────────────────────────────────

function PlantelView({ team }: { team: TeamData }) {
  const byPos = (pos: string) => team.players.filter((p) => p.position === pos);
  const posGroups: { key: string; label: string }[] = [
    { key: 'ARQ', label: 'Arqueros' },
    { key: 'DEF', label: 'Defensores' },
    { key: 'LAT', label: 'Laterales' },
    { key: 'MED', label: 'Mediocampistas' },
    { key: 'VOL', label: 'Volantes' },
    { key: 'DEL', label: 'Delanteros' },
  ];
  return (
    <div className="space-y-6 fade-in">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-2">
        <div className="tv-card text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))] mb-1">DT</p>
          <p className="text-xl font-bold text-[hsl(var(--foreground))]">{team.dt}</p>
        </div>
        <div className="tv-card text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))] mb-1">Capitán</p>
          <p className="text-xl font-bold text-[hsl(var(--foreground))]">{team.capitan}</p>
        </div>
        <div className="tv-card text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))] mb-1">Jugadores</p>
          <p className="text-3xl font-bold font-mono text-[hsl(var(--primary))]">{team.players.length}</p>
        </div>
        <div className="tv-card text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted))] mb-1">Lesionados</p>
          <p className="text-3xl font-bold font-mono text-[hsl(var(--accent))]">
            {team.players.filter((p) => p.injured).length}
          </p>
        </div>
      </div>
      {posGroups.map(({ key, label }) => {
        const players = byPos(key);
        if (!players.length) return null;
        return (
          <div key={`pos-${key}`}>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted))] mb-3">{label}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {players.map((p) => (
                <PlayerCard key={p.id} player={p} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PlayerCard({ player }: { player: Player }) {
  const posKey = player.position as string;
  const colorClass = posColors[posKey] ?? 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  const displayLabel = player.posLabel ?? player.position;
  return (
    <div className={`tv-card flex items-center gap-4 ${player.injured ? 'border-[hsl(var(--accent)/0.4)] bg-[hsl(var(--accent)/0.05)]' : ''}`}>
      <span className="font-mono text-2xl font-bold text-[hsl(var(--primary))] w-10 flex-shrink-0 text-center">
        {player.number > 0 ? player.number : '—'}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-lg font-semibold text-[hsl(var(--foreground))] truncate">{player.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${colorClass}`}>
            {displayLabel}
          </span>
          {player.injured && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-[hsl(var(--accent)/0.15)] text-[hsl(var(--accent))] border border-[hsl(var(--accent)/0.3)]">
              <AlertCircle size={10} />
              Lesionado
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── GOLEADORES ──────────────────────────────────────────────────────────────

function GoleadoresView({ team }: { team: TeamData }) {
  return (
    <div className="tv-card fade-in">
      <h3 className="text-lg font-bold mb-4 text-[hsl(var(--foreground))]">Tabla de Goleadores</h3>
      <div className="space-y-3">
        {team.goleadores.map((g, i) => (
          <div key={g.id} className="flex items-center gap-4 py-3 border-b border-[hsl(var(--border))] last:border-0">
            <span className="font-mono text-2xl font-bold text-[hsl(var(--muted))] w-8 text-center">{i + 1}</span>
            <div className="flex-1">
              <p className="text-xl font-semibold text-[hsl(var(--foreground))]">{g.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold font-mono text-[hsl(var(--primary))]">{g.goals}</span>
              <span className="text-sm text-[hsl(var(--muted))]">goles</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── COPAS ───────────────────────────────────────────────────────────────────

function CopasView({ team }: { team: TeamData }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 fade-in">
      {team.copas.map((c) => (
        <div key={c.id} className="tv-card text-center space-y-2">
          <Trophy size={28} className="mx-auto text-[hsl(var(--primary))]" />
          <p className="text-base font-bold text-[hsl(var(--foreground))]">{c.name}</p>
          {c.detail && <p className="text-sm text-[hsl(var(--muted-foreground))]">{c.detail}</p>}
          <p className="text-sm text-[hsl(var(--muted))]">{c.year}</p>
        </div>
      ))}
    </div>
  );
}

// ─── DESCENSOS ───────────────────────────────────────────────────────────────

function DescensosView({ team }: { team: TeamData }) {
  if (!team.descensos || team.descensos.length === 0) {
    return (
      <div className="tv-card text-center py-12 fade-in">
        <p className="text-5xl mb-4">🏆</p>
        <p className="text-2xl font-bold text-[hsl(var(--success))]">Sin descensos registrados</p>
        <p className="text-[hsl(var(--muted))] mt-2">{team.name} nunca descendió de Primera División.</p>
      </div>
    );
  }
  return (
    <div className="space-y-4 fade-in">
      {team.descensos.map((d) => (
        <div key={d.id} className="tv-card border-[hsl(var(--accent)/0.4)] bg-[hsl(var(--accent)/0.05)] flex items-start gap-4">
          <TrendingDown size={28} className="text-[hsl(var(--accent))] flex-shrink-0 mt-1" />
          <div>
            <p className="text-2xl font-bold font-mono text-[hsl(var(--accent))]">{d.year}</p>
            <p className="text-base text-[hsl(var(--foreground))] mt-1">{d.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── HISTORIA ────────────────────────────────────────────────────────────────

function HistoriaView({ team }: { team: TeamData }) {
  return (
    <div className="tv-card fade-in flex items-start gap-4">
      <BookOpen size={28} className="text-[hsl(var(--primary))] flex-shrink-0 mt-1" />
      <p className="text-xl leading-relaxed text-[hsl(var(--foreground))]">{team.historia}</p>
    </div>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────

type MainChip = TeamId | 'tabla';

export default function FutbolSection() {
  const [teams, setTeams] = useState(teamsData);

useEffect(() => {
  const saved = localStorage.getItem("sportsData");
  if (saved) {
    setTeams(JSON.parse(saved));
  }
}, []);
  const [activeMainChip, setActiveMainChip] = useState<MainChip>('boca');
  const [activeSubChip, setActiveSubChip] = useState<SubChip>('plantel');

  const isTabla = activeMainChip === 'tabla';
  const activeTeam = isTabla ? null : teams[activeMainChip as TeamId];

  const mainChips: { id: MainChip; label: string; color?: string }[] = [
    { id: 'boca', label: 'Boca', color: '#0038A8' },
    { id: 'river', label: 'River', color: '#CC0000' },
    { id: 'central', label: 'Rosario Central', color: '#003087' },
    { id: 'newells', label: "Newell's", color: '#CC0000' },
    { id: 'tabla', label: 'Tabla' },
  ];

  return (
    <div className="space-y-5 fade-in">
      {/* Main chips (teams + tabla) */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {mainChips.map((tc) => (
          <button
            key={`main-chip-${tc.id}`}
            onClick={() => setActiveMainChip(tc.id)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-base font-semibold transition-all duration-150 active:scale-95 ${
              activeMainChip === tc.id
                ? 'chip-active' :'chip-inactive hover:border-[hsl(var(--primary)/0.4)]'
            }`}
          >
            {tc.label}
          </button>
        ))}
      </div>

      {/* TABLA MODE */}
      {isTabla && <TablaView />}

      {/* TEAM MODE */}
      {!isTabla && activeTeam && (
        <>
          {/* Sub chips */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {subChips.map((sc) => (
              <button
                key={`sub-chip-${sc.id}`}
                onClick={() => setActiveSubChip(sc.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 active:scale-95 ${
                  activeSubChip === sc.id
                    ? 'chip-active' :'chip-inactive hover:border-[hsl(var(--primary)/0.4)]'
                }`}
              >
                {sc.label}
              </button>
            ))}
          </div>

          {/* Team header */}
          <div className="flex items-center gap-4">
            <div
              className="w-3 h-12 rounded-full flex-shrink-0"
              style={{ backgroundColor: mainChips.find((t) => t.id === activeMainChip)?.color ?? '#888' }}
            />
            <div>
              <h2 className="text-3xl font-bold text-[hsl(var(--foreground))]">{activeTeam.name}</h2>
              <p className="text-sm text-[hsl(var(--muted))]">DT: {activeTeam.dt} · Capitán: {activeTeam.capitan}</p>
            </div>
          </div>

          {/* Content */}
          {(activeSubChip === 'todos' || activeSubChip === 'plantel') && <PlantelView team={activeTeam} />}
          {activeSubChip === 'goleadores' && <GoleadoresView team={activeTeam} />}
          {activeSubChip === 'copas' && <CopasView team={activeTeam} />}
          {activeSubChip === 'descensos' && <DescensosView team={activeTeam} />}
          {activeSubChip === 'historia' && <HistoriaView team={activeTeam} />}
        </>
      )}
    </div>
  );
}
