'use client';

import React, { useMemo, useState } from 'react';

type ClubId = 'boca' | 'river' | 'central' | 'newells';

type Player = {
  number?: number;
  name?: string;
};

type Club = {
  name: string;
  dt?: string;

  arqueros?: Player[];
  defensores?: Player[];
  laterales?: Player[];
  mediocampistas?: Player[];
  mediocampistasOfensivos?: Player[];
  volantes?: Player[];
  delanteros?: Player[];

  titulosInternacionales?: string[];
  titulosNacionales?: string[];
  otrosTitulos?: string[];
  descensos?: string[];
};

const data: Record<ClubId, Club> = {

  boca: {
    name: "Boca Juniors",
    dt: "Claudio Úbeda",

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
      { number: 26, name: "Marco Pellegrino" },
      { number: 32, name: "Ayrton Costa" },
    ],

    laterales: [
      { number: 23, name: "Marcelo Weigandt" },
      { number: 3, name: "Lautaro Blanco" },
      { number: 24, name: "Juan Barinaga" },
    ],

    mediocampistas: [
      { number: 5, name: "Leandro Paredes" },
      { number: 21, name: "Ander Herrera" },
      { number: 22, name: "Kevin Zenón" },
      { number: 29, name: "Rodrigo Battaglia" },
      { number: 30, name: "Tomás Belmonte" },
    ],

    delanteros: [
      { number: 7, name: "Exequiel Zeballos" },
      { number: 9, name: "Milton Giménez" },
      { number: 10, name: "Edinson Cavani" },
      { number: 16, name: "Miguel Merentiel" },
      { number: 20, name: "Alan Velasco" },
    ],

    titulosInternacionales: [
      "Sudamericana 2004 vs Bolívar",
      "Sudamericana 2005 vs Pumas UNAM",
    ],
  },

  river: {
    name: "River Plate",
    dt: "Eduardo Coudet",

    arqueros: [{ number: 1, name: "Franco Armani" }],

    defensores: [
      { number: 5, name: "Juan Portillo" },
      { number: 17, name: "Paulo Díaz" },
      { number: 20, name: "Germán Pezzella" },
    ],

    laterales: [
      { number: 16, name: "Fabricio Bustos" },
      { number: 21, name: "Marcos Acuña" },
      { number: 29, name: "Gonzalo Montiel" },
    ],

    mediocampistas: [
      { number: 6, name: "Aníbal Moreno" },
      { number: 22, name: "Kevin Castaño" },
      { number: 10, name: "Juan Fernando Quintero" },
    ],

    delanteros: [
      { number: 7, name: "Maximiliano Salas" },
      { number: 9, name: "Sebastián Driussi" },
      { number: 11, name: "Facundo Colidio" },
    ],

    titulosInternacionales: [
      "Libertadores 2018",
      "Libertadores 2015",
      "Libertadores 1996",
      "Libertadores 1986",
      "Sudamericana 2014",
      "Recopa 2019",
    ],
  },

  central: {
    name: "Rosario Central",
    dt: "Jorge Almirón",

    arqueros: [
      { number: 1, name: "Jorge Broun" },
      { name: "Jeremías Ledesma" },
    ],

    defensores: [
      { number: 2, name: "Carlos Quintana" },
      { number: 6, name: "Juan Komar" },
      { number: 15, name: "Facundo Mallo" },
    ],

    laterales: [
      { number: 3, name: "Agustín Sández" },
      { number: 32, name: "Emanuel Coronel" },
    ],

    mediocampistas: [
      { number: 5, name: "Franco Ibarra" },
      { number: 31, name: "Federico Navarro" },
    ],

    delanteros: [
      { number: 9, name: "Alejo Véliz" },
      { number: 11, name: "Ángel Di María" },
    ],

    titulosNacionales: [
      "Liga 2024/25",
      "Copa Liga 2023",
      "Copa Argentina 2018",
      "Primera Nacional 2013",
    ],

    descensos: [
      "2009/10",
      "1983/84",
      "1949/50",
    ],
  },

  newells: {
    name: "Newell's Old Boys",
    dt: "Frank Darío Kudelka",

    arqueros: [{ name: "Gabriel Arias" }],

    defensores: [
      { name: "Oscar Salomón" },
      { name: "Bruno Cabrera" },
      { name: "Ian Glavinovich" },
    ],

    laterales: [
      { name: "Gabriel Risso" },
      { name: "Martín Ortega" },
    ],

    mediocampistas: [
      { name: "Rodrigo Herrera" },
      { name: "Marcelo Esponda" },
    ],

    delanteros: [
      { name: "Ignacio Ramírez" },
      { name: "Matías Cóccaro" },
    ],

    titulosNacionales: [
      "1993",
      "1992",
      "1991",
      "1988",
      "1974",
      "2004",
      "2013",
    ],

    descensos: ["1960"],
  },
};

const safe = (arr?: Player[]) => Array.isArray(arr) ? arr : [];

export default function FutbolSection() {
  const [club, setClub] = useState<ClubId>('boca');
  const team = data[club];

  const renderGroup = (title: string, list?: Player[]) => (
    <div className="space-y-2">
      <h3 className="text-yellow-400 font-bold">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {safe(list).map((p, i) => (
          <div key={i} className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10 flex justify-between">
            <span>
              <span className="text-yellow-400 mr-2">{p.number ?? "—"}</span>
              {p.name ?? "Sin nombre"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 text-white">

      {/* CLUBS */}
      <div className="flex gap-2 overflow-x-auto">
        {Object.entries(data).map(([id, c]) => (
          <button
            key={id}
            onClick={() => setClub(id as ClubId)}
            className={`px-4 py-2 rounded-full ${
              club === id ? "bg-yellow-400 text-black" : "bg-[#1A1A1A]"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* DT */}
      <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10">
        DT: <span className="font-bold">{team.dt}</span>
      </div>

      {/* PLANTEL */}
      {renderGroup("Arqueros", team.arqueros)}
      {renderGroup("Defensores", team.defensores)}
      {renderGroup("Laterales", team.laterales)}
      {renderGroup("Mediocampistas", team.mediocampistas)}
      {renderGroup("Delanteros", team.delanteros)}

      {/* TITULOS */}
      <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10">
        <h3 className="text-yellow-400 font-bold mb-2">Títulos</h3>

        {team.titulosInternacionales?.map((t, i) => (
          <p key={i}>🌍 {t}</p>
        ))}

        {team.titulosNacionales?.map((t, i) => (
          <p key={i}>🏆 {t}</p>
        ))}
      </div>

      {/* DESCENSOS */}
      {team.descensos && (
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10">
          <h3 className="text-red-400 font-bold">Descensos</h3>
          {team.descensos.map((d, i) => (
            <p key={i}>{d}</p>
          ))}
        </div>
      )}

    </div>
  );
}
