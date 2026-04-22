'use client';
console.log("🔥 ESTOY USANDO ESTE FUTBOLSECTION");
import React, { useMemo, useState } from 'react';
import { Trophy, Users, Target, Flag } from 'lucide-react';

type ClubId = 'boca' | 'river' | 'central' | 'newells';

type Player = {
  number?: number;
  name: string;
  position?: string;
};

type ClubData = {
  name: string;
  dt: string;
  players: {
    arqueros: Player[];
    defensores: Player[];
    laterales: Player[];
    mediocampistas: Player[];
    ofensivos?: Player[];
    delanteros: Player[];
  };
  titles?: string[];
  descensos?: string[];
};

const data: Record<ClubId, ClubData> = {
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
        { number: 4, name: "Nicolás Figal" },
      ],
      laterales: [
        { number: 23, name: "Marcelo Weigandt" },
        { number: 3, name: "Lautaro Blanco" },
        { number: 24, name: "Juan Barinaga" },
      ],
      mediocampistas: [
        { number: 5, name: "Leandro Paredes" },
        { number: 21, name: "Ander Herrera" },
        { number: 10, name: "Edinson Cavani" },
      ],
      delanteros: [
        { number: 7, name: "Exequiel Zeballos" },
        { number: 9, name: "Milton Giménez" },
        { number: 10, name: "Edinson Cavani" },
      ],
    },
    titles: [
      "Sudamericana 2004 vs Bolívar",
      "Sudamericana 2005 vs Pumas UNAM",
    ],
    descensos: [],
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
    titles: ["Libertadores 2018", "Libertadores 2015", "Libertadores 1996"],
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
    titles: ["Liga 2024/25", "Copa Liga 2023"],
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
    titles: ["1993", "1992", "1988"],
    descensos: ["1960"],
  },
};

const tabs = [
  { id: 'plantel', label: 'Plantel', icon: Users },
  { id: 'goleadores', label: 'Goleadores', icon: Target },
  { id: 'copas', label: 'Copas', icon: Trophy },
  { id: 'historia', label: 'Historia', icon: Flag },
] as const;

export default function FutbolSection() {
  const [club, setClub] = useState<ClubId>('boca');
  const [tab, setTab] = useState<'plantel' | 'goleadores' | 'copas' | 'historia'>('plantel');

  const team = data[club];

  const renderPlayers = (list: Player[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {list.map((p, i) => (
        <div
          key={i}
          className="bg-[#1A1A1A] rounded-xl p-4 border border-white/10 flex justify-between items-center"
        >
          <div>
            <p className="text-white font-bold">
              <span className="text-yellow-400 mr-2">{p.number ?? '—'}</span>
              {p.name}
            </p>
            <p className="text-gray-400 text-sm">{p.position}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const zonas = useMemo(() => ({
    A: ["Boca Juniors", "River Plate"],
    B: ["Rosario Central", "Newell's Old Boys"],
  }), []);

  return (
    <div className="space-y-6 text-white">

      {/* HEADER CLUBS */}
      <div className="flex gap-2 overflow-x-auto">
        {(Object.keys(data) as ClubId[]).map((id) => (
          <button
            key={id}
            onClick={() => setClub(id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              club === id ? 'bg-yellow-400 text-black' : 'bg-[#1A1A1A]'
            }`}
          >
            {data[id].name}
          </button>
        ))}
      </div>

      {/* NAV TABS */}
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                tab === t.id ? 'bg-yellow-400 text-black' : 'bg-[#1A1A1A]'
              }`}
            >
              <Icon size={14} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* DT + INFO */}
      <div className="bg-[#1A1A1A] rounded-xl p-4 border border-white/10">
        <p className="text-gray-400 text-sm">Director Técnico</p>
        <p className="text-xl font-bold">{team.dt}</p>
      </div>

      {/* CONTENT */}
      {tab === 'plantel' && (
        <div className="space-y-4">

          <h3 className="text-lg font-bold">Arqueros</h3>
          {renderPlayers(team.players.arqueros)}

          <h3 className="text-lg font-bold">Defensores</h3>
          {renderPlayers(team.players.defensores)}

          <h3 className="text-lg font-bold">Laterales</h3>
          {renderPlayers(team.players.laterales)}

          <h3 className="text-lg font-bold">Mediocampistas</h3>
          {renderPlayers(team.players.mediocampistas)}

          <h3 className="text-lg font-bold">Delanteros</h3>
          {renderPlayers(team.players.delanteros)}
        </div>
      )}

      {tab === 'copas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {team.titles?.map((t, i) => (
            <div key={i} className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10">
              🏆 {t}
            </div>
          ))}
        </div>
      )}

      {tab === 'historia' && (
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10">
          Descensos:
          <ul className="mt-2 list-disc ml-5 text-gray-300">
            {team.descensos?.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        </div>
      )}

      {/* ZONAS */}
      <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10">
        <h3 className="font-bold mb-2">Tabla Zonas</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-yellow-400 font-bold">Zona A</p>
            {zonas.A.map((t, i) => <p key={i}>{t}</p>)}
          </div>
          <div>
            <p className="text-yellow-400 font-bold">Zona B</p>
            {zonas.B.map((t, i) => <p key={i}>{t}</p>)}
          </div>
        </div>
      </div>

    </div>
  );
}
