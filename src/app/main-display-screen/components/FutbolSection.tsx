'use client';

import React, { useState, useEffect } from 'react';
import { teamsData, standingsZonaA, standingsZonaB } from '@/lib/sportsData';
import type { TeamData, Player, StandingsRow } from '@/lib/sportsData';
import { AlertCircle, Trophy, TrendingDown, BookOpen } from 'lucide-react';

type TeamId = 'boca' | 'river' | 'central' | 'newells';
type SubChip = 'todos' | 'plantel' | 'goleadores' | 'copas' | 'descensos' | 'historia';
type TablaZona = 'zonaA' | 'zonaB';
type MainChip = TeamId | 'tabla';

export default function FutbolSection() {

const [teams, setTeams] = useState<any>(teamsData);
const [activeMainChip, setActiveMainChip] = useState<MainChip>('boca');
const [activeSubChip, setActiveSubChip] = useState<SubChip>('plantel');

useEffect(() => {
  try {
    const saved = localStorage.getItem("sportsData");
    if (!saved) return;

    const parsed = JSON.parse(saved);

    Object.keys(parsed).forEach((team) => {
      parsed[team].players = (parsed[team].players || []).map((p:any) => ({
        id: p.id || `${team}-${Math.random()}`,
        name: p.name || "Jugador",
        number: p.number ?? 0,
        position: p.position || "DEL",
        injured: Boolean(p.injured)
      }));
    });

    setTeams((prev:any)=>({
      ...prev,
      ...parsed
    }));

  } catch (e) {
    console.log("error loading saved data");
  }
}, []);

const isTabla = activeMainChip === 'tabla';
const activeTeam = isTabla ? null : teams?.[activeMainChip as TeamId];

const mainChips = [
{ id: 'boca', label: 'Boca' },
{ id: 'river', label: 'River' },
{ id: 'central', label: 'Rosario Central' },
{ id: 'newells', label: "Newell's" },
{ id: 'tabla', label: 'Tabla' }
];

const subChips = [
{ id:'plantel', label:'Plantel'},
{ id:'goleadores', label:'Goleadores'},
{ id:'copas', label:'Copas'},
{ id:'descensos', label:'Descensos'},
{ id:'historia', label:'Historia'}
];

const posColors: Record<string,string> = {
ARQ:'bg-amber-500/20 text-amber-400 border-amber-500/30',
DEF:'bg-blue-500/20 text-blue-400 border-blue-500/30',
MED:'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
DEL:'bg-red-500/20 text-red-400 border-red-500/30',
};

return (
<div className="space-y-5 fade-in">

<div className="flex gap-2 overflow-x-auto pb-1">
{mainChips.map((tc)=>(
<button
key={tc.id}
onClick={()=>setActiveMainChip(tc.id as MainChip)}
className={`px-5 py-2 rounded-full ${
activeMainChip===tc.id?'chip-active':'chip-inactive'
}`}
>
{tc.label}
</button>
))}
</div>

{isTabla && (
<div className="space-y-4">

<h3 className="text-lg font-bold">
Tabla Zona A
</h3>

{standingsZonaA.map((row:StandingsRow)=>(
<div key={row.id} className="tv-card flex justify-between">
<span>{row.pos}</span>
<span>{row.team}</span>
<span>{row.pts}</span>
</div>
))}

</div>
)}

{!isTabla && activeTeam && (
<>

<div className="flex gap-2 overflow-x-auto pb-1">
{subChips.map((sc)=>(
<button
key={sc.id}
onClick={()=>setActiveSubChip(sc.id as SubChip)}
className={`px-4 py-2 rounded-full ${
activeSubChip===sc.id?'chip-active':'chip-inactive'
}`}
>
{sc.label}
</button>
))}
</div>

<div>
<h2 className="text-3xl font-bold">
{activeTeam?.name ?? "Equipo"}
</h2>

<p className="text-sm text-muted">
DT: {activeTeam?.dt ?? "-"} · Capitán: {activeTeam?.capitan ?? "-"}
</p>
</div>

{activeSubChip === 'plantel' && (
<div className="space-y-3">

{(activeTeam?.players ?? [])
.sort((a:Player,b:Player)=> (a?.number??0)-(b?.number??0))
.map((player:Player)=>(

<div
key={player?.id ?? Math.random()}
className="tv-card flex items-center justify-between"
>

<div>

<div className="font-bold">
{player?.number ?? 0} — {player?.name ?? "Jugador"}
</div>

<div className="text-xs mt-1">
<span className={`px-2 py-1 rounded border ${posColors[player?.position]}`}>
{player?.position ?? "DEL"}
</span>

{player?.injured && (
<span className="ml-2 text-red-400">
Lesionado
</span>
)}

</div>

</div>

</div>

))}

</div>
)}

{activeSubChip === 'goleadores' && (
<div className="tv-card">
{(activeTeam?.goleadores ?? []).map((g:any)=>(
<div key={g.id}>
{g.name} - {g.goals}
</div>
))}
</div>
)}

{activeSubChip === 'copas' && (
<div className="tv-card">
{(activeTeam?.copas ?? []).map((c:any)=>(
<div key={c.id}>
{c.name} {c.year}
</div>
))}
</div>
)}

{activeSubChip === 'descensos' && (
<div className="tv-card">
{(activeTeam?.descensos ?? []).length===0
? "Sin descensos"
: activeTeam.descensos.map((d:any)=>(
<div key={d.id}>
{d.year} - {d.detail}
</div>
))
}
</div>
)}

{activeSubChip === 'historia' && (
<div className="tv-card">
{activeTeam?.historia ?? "Sin historia"}
</div>
)}

</>
)}

</div>
);
}
