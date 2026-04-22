'use client';

import React, { useMemo, useState } from 'react';
import { Trophy, Users, Target, Flag } from 'lucide-react';

type ClubId = 'boca' | 'river' | 'central' | 'newells';

type Player = {
  number?: number;
  name?: string;
  position?: string;
};

type ClubData = {
  name: string;
  dt?: string;
  players?: {
    arqueros?: Player[];
    defensores?: Player[];
    laterales?: Player[];
    mediocampistas?: Player[];
    delanteros?: Player[];
  };
  titles?: string[];
  descensos?: string[];
};

const rawData: Record<ClubId, ClubData> = {
  boca: {
    name: "Boca Juniors",
    dt: "Claudio Úbeda",
    players: {
      arqueros: [
        { number: 12, name: "Leandro Brey" },
        { number: 13, name: "Javier García" },
        { number: 25, name: "Agustín Marchesín" },
      ],
      defensores: [
        { name: "Agustín Heredia" },
        { name: "Walter Molas" },
        { number: 40, name: "Lautaro Di Lollo" },
      ],
      laterales: [{ number: 23, name: "Marcelo Weigandt" }],
      mediocampistas: [{ number: 5, name: "Leandro Paredes" }],
      delanteros: [{ number: 9, name: "Milton Giménez" }],
    },
    titles: ["Sudamericana 2004", "Sudamericana 2005"],
  },

  river: {
    name: "River Plate",
    dt: "Eduardo Coudet",
    players: {
      arqueros: [{ number: 1, name: "Franco Armani" }],
      defensores: [{ number: 4, name: "Paulo Díaz" }],
      laterales: [{ number: 16, name: "Fabricio Bustos" }],
      mediocampistas: [{ number: 10, name: "Juanfer Quintero" }],
      delanteros: [{ number: 9, name: "Sebastián Driussi" }],
    },
    titles: ["Libertadores 2018"],
  },

  central: {
    name: "Rosario Central",
    dt: "Jorge Almirón",
    players: {
      arqueros: [{ number: 1, name: "Jorge Broun" }],
      defensores: [{ number: 2, name: "Carlos Quintana" }],
      laterales: [{ number: 3, name: "Agustín Sández" }],
      mediocampistas: [{ number: 5, name: "Franco Ibarra" }],
      delanteros: [{ number: 9, name: "Alejo Véliz" }],
    },
    titles: ["Liga 2024"],
  },

  newells: {
    name: "Newell's Old Boys",
    dt: "Frank Kudelka",
    players: {
      arqueros: [{ name: "Williams Barlasina" }],
      defensores: [{ name: "Bruno Cabrera" }],
      laterales: [{ name: "Martín Luciano" }],
      mediocampistas: [{ name: "Rodrigo Herrera" }],
      delanteros: [{ name: "Ignacio Ramírez" }],
    },
    titles: ["1993", "1992"],
    descensos: ["1960"],
  },
};

const safeArray = (arr?: Player[]) => (Array.isArray(arr) ? arr : []);

const tabs = [
  { id: 'plantel', label: 'Plantel', icon: Users },
  { id: 'copas', label: 'Copas', icon: Trophy },
  { id: 'historia', label: 'Historia', icon: Flag },
] as const;

export default function FutbolSection() {
  const [club, setClub] = useState<ClubId>('boca');
  const [tab, setTab] = useState<'plantel' | 'copas' | 'historia'>('plantel');

  const team = rawData[club];

  const players = useMemo(() => {
    const p = team.players ?? {};
    return {
      arqueros: safeArray(p.arqueros),
      defensores: safeArray(p.defensores),
      laterales: safeArray(p.laterales),
      mediocampistas: safeArray(p.mediocampistas),
      delanteros: safeArray(p.delanteros),
    };
  }, [team]);

  const PlayerCard = ({ p }: { p: Player }) => (
    <div className="bg-[#1A1A1A] rounded-xl p-4 border border-white/10 flex justify-between items-center">
      <div>
        <p className="text-white font-bold">
          <span className="text-yellow-400 mr-2">
            {p.number ?? "—"}
          </span>
          {p.name ?? "Jugador sin nombre"}
        </p>
        <p className="text-gray-400 text-sm">{p.position ?? ""}</p>
      </div>
    </div>
  );

  const renderGroup = (list: Player[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {list.map((p, i) => (
        <PlayerCard key={i} p={p} />
      ))}
    </div>
  );

  const zonas = {
    A: ["Boca Juniors", "River Plate"],
    B: ["Rosario Central", "Newell's Old Boys"],
  };

  return (
    <div className="space-y-6 text-white">

      {/* CLUB SELECTOR */}
      <div className="flex gap-2 overflow-x-auto">
        {(Object.keys(rawData) as ClubId[]).map((id) => (
          <button
            key={id}
            onClick={() => setClub(id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              club === id ? 'bg-yellow-400 text-black' : 'bg-[#1A1A1A]'
            }`}
          >
            {rawData[id].name}
          </button>
        ))}
      </div>

      {/* TABS */}
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-full ${
              tab === t.id ? 'bg-yellow-400 text-black' : 'bg-[#1A1A1A]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* DT */}
      <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10">
        <p className="text-gray-400 text-sm">Director Técnico</p>
        <p className="text-xl font-bold">{team.dt ?? "Sin DT"}</p>
      </div>

      {/* PLANTEL */}
      {tab === 'plantel' && (
        <div className="space-y-5">

          <h3 className="font-bold text-yellow-400">Arqueros</h3>
          {renderGroup(players.arqueros)}

          <h3 className="font-bold text-yellow-400">Defensores</h3>
          {renderGroup(players.defensores)}

          <h3 className="font-bold text-yellow-400">Laterales</h3>
          {renderGroup(players.laterales)}

          <h3 className="font-bold text-yellow-400">Mediocampistas</h3>
          {renderGroup(players.mediocampistas)}

          <h3 className="font-bold text-yellow-400">Delanteros</h3>
          {renderGroup(players.delanteros)}

        </div>
      )}

      {/* COPAS */}
      {tab === 'copas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(team.titles ?? []).map((t, i) => (
            <div key={i} className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10">
              🏆 {t}
            </div>
          ))}
        </div>
      )}

      {/* HISTORIA */}
      {tab === 'historia' && (
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10">
          <p className="text-yellow-400 font-bold mb-2">Descensos</p>
          {(team.descensos ?? []).length > 0 ? (
            team.descensos!.map((d, i) => <p key={i}>{d}</p>)
          ) : (
            <p className="text-gray-400">Sin descensos registrados</p>
          )}
        </div>
      )}

      {/* ZONAS */}
      <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10">
        <p className="font-bold mb-2 text-yellow-400">Zonas</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-white font-bold">Zona A</p>
            {zonas.A.map((t, i) => <p key={i}>{t}</p>)}
          </div>
          <div>
            <p className="text-white font-bold">Zona B</p>
            {zonas.B.map((t, i) => <p key={i}>{t}</p>)}
          </div>
        </div>
      </div>

    </div>
  );
}
