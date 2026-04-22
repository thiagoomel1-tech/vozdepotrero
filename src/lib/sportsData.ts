export type Position = 'ARQ' | 'DEF' | 'LAT' | 'MED' | 'VOL' | 'DEL';

export interface Player {
  id: string;
  number: number;
  name: string;
  position: Position;
  posLabel?: string;
  injured?: boolean;
}

export interface TeamData {
  id: string;
  name: string;
  shortName: string;
  dt: string;
  capitan: string;
  color: string;
  players: Player[];
  goleadores: { id: string; name: string; goals: number }[];
  copas: { id: string; name: string; year: number; detail?: string }[];
  descensos: { id: string; year: number; detail: string }[] | null;
  historia: string;
}

export interface StandingsRow {
  id: string;
  pos: number;
  team: string;
  pts: number;
}

export interface F1Pilot {
  id: string;
  pos: number;
  name: string;
  team: string;
  points: number;
  nationality: string;
  highlight?: boolean;
}

export interface F1Constructor {
  id: string;
  pos: number;
  name: string;
  points: number;
  pilots: string[];
}

export interface F1Race {
  id: string;
  round: number;
  name: string;
  circuit: string;
  city: string;
  date: string;
  status: 'completed' | 'upcoming' | 'next';
}

export interface BasketTeam {
  id: string;
  name: string;
  wins: number;
  losses: number;
  points: number;
  players: { id: string; name: string; number: number; pos: string }[];
}

export interface ArgSelection {
  dt: string;
  capitan: string;
  titles: { id: string; name: string; year: number; host: string }[];
  worldCups: { id: string; year: number; host: string; result: string; topScorer: string }[];
  topScorers: { id: string; name: string; goals: number; caps: number; active: boolean }[];
  presencias: { id: string; name: string; caps: number; years: string; active: boolean }[];
  players: Player[];
}

// ─── STANDINGS ───────────────────────────────────────────────────────────────

export const standingsZonaA: StandingsRow[] = [
  { id: 'za-01', pos: 1, team: 'Estudiantes', pts: 27 },
  { id: 'za-02', pos: 2, team: 'Vélez', pts: 26 },
  { id: 'za-03', pos: 3, team: 'Boca', pts: 24 },
  { id: 'za-04', pos: 4, team: 'Talleres', pts: 24 },
  { id: 'za-05', pos: 5, team: 'Lanús', pts: 22 },
  { id: 'za-06', pos: 6, team: 'Independiente', pts: 21 },
  { id: 'za-07', pos: 7, team: 'Unión', pts: 19 },
  { id: 'za-08', pos: 8, team: 'Defensa', pts: 19 },
  { id: 'za-09', pos: 9, team: 'San Lorenzo', pts: 19 },
  { id: 'za-10', pos: 10, team: 'Instituto', pts: 17 },
  { id: 'za-11', pos: 11, team: 'Platense', pts: 16 },
  { id: 'za-12', pos: 12, team: 'Gimnasia M', pts: 16 },
  { id: 'za-13', pos: 13, team: 'Central Córdoba', pts: 15 },
  { id: 'za-14', pos: 14, team: "Newell's", pts: 13 },
  { id: 'za-15', pos: 15, team: 'Riestra', pts: 7 },
];

export const standingsZonaB: StandingsRow[] = [
  { id: 'zb-01', pos: 1, team: 'Independiente Rivadavia', pts: 30 },
  { id: 'zb-02', pos: 2, team: 'River', pts: 26 },
  { id: 'zb-03', pos: 3, team: 'Argentinos', pts: 26 },
  { id: 'zb-04', pos: 4, team: 'Rosario Central', pts: 24 },
  { id: 'zb-05', pos: 5, team: 'Belgrano', pts: 23 },
  { id: 'zb-06', pos: 6, team: 'Huracán', pts: 21 },
  { id: 'zb-07', pos: 7, team: 'Barracas', pts: 20 },
  { id: 'zb-08', pos: 8, team: 'Gimnasia', pts: 20 },
  { id: 'zb-09', pos: 9, team: 'Tigre', pts: 19 },
  { id: 'zb-10', pos: 10, team: 'Racing', pts: 19 },
  { id: 'zb-11', pos: 11, team: 'Sarmiento', pts: 16 },
  { id: 'zb-12', pos: 12, team: 'Banfield', pts: 14 },
  { id: 'zb-13', pos: 13, team: 'Atlético Tucumán', pts: 10 },
  { id: 'zb-14', pos: 14, team: 'Aldosivi', pts: 7 },
  { id: 'zb-15', pos: 15, team: 'Estudiantes RC', pts: 5 },
];

// ─── TEAMS ───────────────────────────────────────────────────────────────────

export const teamsData: Record<string, TeamData> = {
  boca: {
    id: 'boca',
    name: 'Boca Juniors',
    shortName: 'Boca',
    dt: 'Claudio Úbeda',
    capitan: 'Leandro Paredes',
    color: '#0038A8',
    players: [
      // ARQUEROS
      { id: 'boca-p-12', number: 12, name: 'Leandro Brey', position: 'ARQ', posLabel: 'Arquero' },
      { id: 'boca-p-13', number: 13, name: 'Javier García', position: 'ARQ', posLabel: 'Arquero' },
      { id: 'boca-p-25a', number: 25, name: 'Agustín Marchesín', position: 'ARQ', posLabel: 'Arquero' },
      // DEFENSORES
      { id: 'boca-d-00', number: 0, name: 'Agustín Heredia', position: 'DEF', posLabel: 'Defensor' },
      { id: 'boca-d-01', number: 0, name: 'Walter Molas', position: 'DEF', posLabel: 'Defensor' },
      { id: 'boca-d-40', number: 40, name: 'Lautaro Di Lollo', position: 'DEF', posLabel: 'Defensor' },
      { id: 'boca-d-04', number: 4, name: 'Nicolás Figal', position: 'DEF', posLabel: 'Defensor' },
      { id: 'boca-d-26', number: 26, name: 'Marco Pellegrino', position: 'DEF', posLabel: 'Defensor' },
      { id: 'boca-d-32', number: 32, name: 'Ayrton Costa', position: 'DEF', posLabel: 'Defensor' },
      // LATERALES
      { id: 'boca-l-23', number: 23, name: 'Marcelo Weigandt', position: 'LAT', posLabel: 'Lateral' },
      { id: 'boca-l-03', number: 3, name: 'Lautaro Blanco', position: 'LAT', posLabel: 'Lateral' },
      { id: 'boca-l-24', number: 24, name: 'Juan Barinaga', position: 'LAT', posLabel: 'Lateral' },
      // MEDIOCAMPISTAS
      { id: 'boca-m-05', number: 5, name: 'Leandro Paredes', position: 'MED', posLabel: 'Mediocampista' },
      { id: 'boca-m-15', number: 15, name: 'Williams Alarcón', position: 'MED', posLabel: 'Mediocampista' },
      { id: 'boca-m-19', number: 19, name: 'Agustín Martegani', position: 'MED', posLabel: 'Mediocampista' },
      { id: 'boca-m-21', number: 21, name: 'Ander Herrera', position: 'MED', posLabel: 'Mediocampista' },
      { id: 'boca-m-22', number: 22, name: 'Kevin Zenón', position: 'MED', posLabel: 'Mediocampista' },
      { id: 'boca-m-25b', number: 25, name: 'Santiago Ascacíbar', position: 'MED', posLabel: 'Mediocampista' },
      { id: 'boca-m-29a', number: 29, name: 'Rodrigo Battaglia', position: 'MED', posLabel: 'Mediocampista' },
      { id: 'boca-m-30', number: 30, name: 'Tomás Belmonte', position: 'MED', posLabel: 'Mediocampista' },
      { id: 'boca-m-38', number: 38, name: 'Camilo Rey', position: 'MED', posLabel: 'Mediocampista' },
      { id: 'boca-m-43', number: 43, name: 'Milton Delgado', position: 'MED', posLabel: 'Mediocampista' },
      { id: 'boca-m-36', number: 36, name: 'Tomás Aranda', position: 'MED', posLabel: 'Mediocampista' },
      // VOLANTES IZQUIERDOS
      { id: 'boca-v-00', number: 0, name: 'Juan Ramírez', position: 'VOL', posLabel: 'Volante' },
      { id: 'boca-v-27', number: 27, name: 'Malcom Braida', position: 'VOL', posLabel: 'Volante' },
      // DELANTEROS
      { id: 'boca-del-07', number: 7, name: 'Exequiel Zeballos', position: 'DEL', posLabel: 'Delantero' },
      { id: 'boca-del-08', number: 8, name: 'Carlos Palacios', position: 'DEL', posLabel: 'Delantero' },
      { id: 'boca-del-09', number: 9, name: 'Milton Giménez', position: 'DEL', posLabel: 'Delantero' },
      { id: 'boca-del-10', number: 10, name: 'Edinson Cavani', position: 'DEL', posLabel: 'Delantero', injured: true },
      { id: 'boca-del-11', number: 11, name: 'Lucas Janson', position: 'DEL', posLabel: 'Delantero' },
      { id: 'boca-del-16', number: 16, name: 'Miguel Merentiel', position: 'DEL', posLabel: 'Delantero' },
      { id: 'boca-del-20', number: 20, name: 'Alan Velasco', position: 'DEL', posLabel: 'Delantero' },
      { id: 'boca-del-28', number: 28, name: 'Adam Bareiro', position: 'DEL', posLabel: 'Delantero' },
      { id: 'boca-del-29b', number: 29, name: 'Ángel Romero', position: 'DEL', posLabel: 'Delantero' },
    ],
    goleadores: [
      { id: 'boca-g-01', name: 'Edinson Cavani', goals: 18 },
      { id: 'boca-g-02', name: 'Miguel Merentiel', goals: 12 },
      { id: 'boca-g-03', name: 'Exequiel Zeballos', goals: 9 },
      { id: 'boca-g-04', name: 'Ángel Romero', goals: 7 },
      { id: 'boca-g-05', name: 'Milton Giménez', goals: 5 },
    ],
    copas: [
      { id: 'boca-c-01', name: 'Copa Sudamericana 2004', year: 2004, detail: 'Boca Juniors campeón vs Bolívar' },
      { id: 'boca-c-02', name: 'Copa Sudamericana 2005', year: 2005, detail: 'Boca Juniors campeón vs Pumas UNAM' },
      { id: 'boca-c-03', name: 'Copa Libertadores', year: 2007, detail: '6 títulos en total' },
      { id: 'boca-c-04', name: 'Liga Profesional', year: 2022, detail: '35 títulos nacionales' },
      { id: 'boca-c-05', name: 'Copa Argentina', year: 2021, detail: '7 títulos' },
      { id: 'boca-c-06', name: 'Intercontinental', year: 2003, detail: '3 títulos' },
    ],
    descensos: null,
    historia: 'Fundado en 1905 en el barrio de La Boca, Buenos Aires. Es el club con más hinchas de Argentina y uno de los más populares del mundo.',
  },

  river: {
    id: 'river',
    name: 'River Plate',
    shortName: 'River',
    dt: 'Eduardo Coudet',
    capitan: 'Lucas Martínez Quarta',
    color: '#CC0000',
    players: [
      // ARQUEROS
      { id: 'river-a-01', number: 1, name: 'Franco Armani', position: 'ARQ', posLabel: 'Arquero' },
      { id: 'river-a-33', number: 33, name: 'Ezequiel Centurión', position: 'ARQ', posLabel: 'Arquero' },
      { id: 'river-a-41', number: 41, name: 'Santiago Beltrán', position: 'ARQ', posLabel: 'Arquero' },
      { id: 'river-a-42', number: 42, name: 'Franco Jaroszewicz', position: 'ARQ', posLabel: 'Arquero' },
      // DEFENSORES
      { id: 'river-d-05', number: 5, name: 'Juan Portillo', position: 'DEF', posLabel: 'Defensor' },
      { id: 'river-d-13', number: 13, name: 'Lautaro Rivero', position: 'DEF', posLabel: 'Defensor' },
      { id: 'river-d-17', number: 17, name: 'Paulo Díaz', position: 'DEF', posLabel: 'Defensor' },
      { id: 'river-d-20', number: 20, name: 'Germán Pezzella', position: 'DEF', posLabel: 'Defensor' },
      { id: 'river-d-28', number: 28, name: 'Lucas Martínez Quarta', position: 'DEF', posLabel: 'Defensor' },
      { id: 'river-d-31', number: 31, name: 'Facundo González', position: 'DEF', posLabel: 'Defensor' },
      { id: 'river-d-36', number: 36, name: 'Ulises Giménez', position: 'DEF', posLabel: 'Defensor' },
      { id: 'river-d-00', number: 0, name: 'Tobías Ramírez', position: 'DEF', posLabel: 'Defensor' },
      // LATERALES
      { id: 'river-l-16', number: 16, name: 'Fabricio Bustos', position: 'LAT', posLabel: 'Lateral' },
      { id: 'river-l-18', number: 18, name: 'Matías Viña', position: 'LAT', posLabel: 'Lateral' },
      { id: 'river-l-21', number: 21, name: 'Marcos Acuña', position: 'LAT', posLabel: 'Lateral' },
      { id: 'river-l-29', number: 29, name: 'Gonzalo Montiel', position: 'LAT', posLabel: 'Lateral' },
      // MEDIOCAMPISTAS
      { id: 'river-m-06', number: 6, name: 'Aníbal Moreno', position: 'MED', posLabel: 'Mediocampista' },
      { id: 'river-m-15', number: 15, name: 'Fausto Vera', position: 'MED', posLabel: 'Mediocampista' },
      { id: 'river-m-22', number: 22, name: 'Kevin Castaño', position: 'MED', posLabel: 'Mediocampista' },
      { id: 'river-m-35', number: 35, name: 'Giorgio Costantini', position: 'MED', posLabel: 'Mediocampista' },
      // MEDIOCAMPISTAS OFENSIVOS
      { id: 'river-mo-10', number: 10, name: 'Juan Fernando Quintero', position: 'VOL', posLabel: 'Med. Ofensivo' },
      { id: 'river-mo-19', number: 19, name: 'Kendry Páez', position: 'VOL', posLabel: 'Med. Ofensivo' },
      { id: 'river-mo-26', number: 26, name: 'Tomás Galván', position: 'VOL', posLabel: 'Med. Ofensivo' },
      { id: 'river-mo-30', number: 30, name: 'Cristian Jaime', position: 'VOL', posLabel: 'Med. Ofensivo' },
      { id: 'river-mo-47', number: 47, name: 'JuanMeza', position: 'VOL', posLabel: 'Med. Ofensivo' },
      { id: 'river-mo-00', number: 0, name: 'Giuliano Galoppo', position: 'VOL', posLabel: 'Med. Ofensivo' },
      // VOLANTES
      { id: 'river-v-08', number: 8, name: 'Maximiliano Meza', position: 'VOL', posLabel: 'Volante' },
      { id: 'river-v-37', number: 37, name: 'Thiago Acosta', position: 'VOL', posLabel: 'Volante' },
      { id: 'river-v-39', number: 39, name: 'Santiago Lencina', position: 'VOL', posLabel: 'Volante' },
      { id: 'river-v-40', number: 40, name: 'Lucas Obregón', position: 'VOL', posLabel: 'Volante' },
      // DELANTEROS
      { id: 'river-del-07', number: 7, name: 'Maximiliano Salas', position: 'DEL', posLabel: 'Delantero' },
      { id: 'river-del-09', number: 9, name: 'Sebastián Driussi', position: 'DEL', posLabel: 'Delantero' },
      { id: 'river-del-11', number: 11, name: 'Facundo Colidio', position: 'DEL', posLabel: 'Delantero' },
      { id: 'river-del-32', number: 32, name: 'Agustín Ruberto', position: 'DEL', posLabel: 'Delantero' },
      { id: 'river-del-38', number: 38, name: 'Ian Subiabre', position: 'DEL', posLabel: 'Delantero' },
      { id: 'river-del-00a', number: 0, name: 'Alex Woiski', position: 'DEL', posLabel: 'Delantero' },
      { id: 'river-del-00b', number: 0, name: 'Joaquín Freitas', position: 'DEL', posLabel: 'Delantero' },
    ],
    goleadores: [
      { id: 'river-g-01', name: 'Sebastián Driussi', goals: 21 },
      { id: 'river-g-02', name: 'Facundo Colidio', goals: 14 },
      { id: 'river-g-03', name: 'Juan F. Quintero', goals: 8 },
      { id: 'river-g-04', name: 'Maximiliano Salas', goals: 6 },
    ],
    copas: [
      // INTERNACIONALES
      { id: 'river-c-lib18', name: 'Copa Libertadores 2018', year: 2018, detail: 'Campeón' },
      { id: 'river-c-lib15', name: 'Copa Libertadores 2015', year: 2015, detail: 'Campeón' },
      { id: 'river-c-lib96', name: 'Copa Libertadores 1996', year: 1996, detail: 'Campeón' },
      { id: 'river-c-lib86', name: 'Copa Libertadores 1986', year: 1986, detail: 'Campeón' },
      { id: 'river-c-sud14', name: 'Copa Sudamericana 2014', year: 2014, detail: 'Campeón' },
      { id: 'river-c-rec19', name: 'Recopa Sudamericana 2019', year: 2019, detail: 'Campeón' },
      { id: 'river-c-rec16', name: 'Recopa Sudamericana 2016', year: 2016, detail: 'Campeón' },
      { id: 'river-c-rec15', name: 'Recopa Sudamericana 2015', year: 2015, detail: 'Campeón' },
      { id: 'river-c-sup97', name: 'Supercopa Sudamericana 1997', year: 1997, detail: 'Campeón' },
      { id: 'river-c-sur15', name: 'Copa Suruga Bank 2015', year: 2015, detail: 'Campeón' },
      { id: 'river-c-int86', name: 'Copa Intercontinental 1986', year: 1986, detail: 'Campeón' },
      // NACIONALES
      { id: 'river-c-lig23', name: 'Liga Argentina 2023', year: 2023, detail: 'Campeón' },
      { id: 'river-c-lig21', name: 'Liga Argentina 2021', year: 2021, detail: 'Campeón' },
      { id: 'river-c-arg19', name: 'Copa Argentina 2019', year: 2019, detail: 'Campeón' },
      { id: 'river-c-arg17', name: 'Copa Argentina 2017', year: 2017, detail: 'Campeón' },
      { id: 'river-c-arg16', name: 'Copa Argentina 2016', year: 2016, detail: 'Campeón' },
      { id: 'river-c-sup23', name: 'Supercopa Argentina 2023', year: 2023, detail: 'Campeón' },
      { id: 'river-c-sup20', name: 'Supercopa Argentina 2020', year: 2020, detail: 'Campeón' },
      { id: 'river-c-sup18', name: 'Supercopa Argentina 2018', year: 2018, detail: 'Campeón' },
      { id: 'river-c-tro23', name: 'Trofeo de Campeones 2023', year: 2023, detail: 'Campeón' },
      { id: 'river-c-tro21', name: 'Trofeo de Campeones 2021', year: 2021, detail: 'Campeón' },
    ],
    descensos: [
      { id: 'river-d-01', year: 2011, detail: 'Descendió al Nacional B en junio de 2011. Regresó a Primera División en 2012 como campeón.' },
    ],
    historia: 'Fundado en 1901 en el barrio de La Boca, luego mudado a Núñez. Conocido como "El Millonario", es el club con más títulos de Argentina.',
  },

  central: {
    id: 'central',
    name: 'Rosario Central',
    shortName: 'Central',
    dt: 'Jorge Almirón',
    capitan: 'Ángel Di María',
    color: '#003087',
    players: [
      // ARQUEROS
      { id: 'central-a-00', number: 0, name: 'Jeremías Ledesma', position: 'ARQ', posLabel: 'Arquero' },
      { id: 'central-a-01', number: 1, name: 'Jorge Broun', position: 'ARQ', posLabel: 'Arquero' },
      { id: 'central-a-38', number: 38, name: 'Damián Fernández', position: 'ARQ', posLabel: 'Arquero' },
      // DEFENSORES
      { id: 'central-d-02', number: 2, name: 'Carlos Quintana', position: 'DEF', posLabel: 'Defensor' },
      { id: 'central-d-06', number: 6, name: 'Juan Komar', position: 'DEF', posLabel: 'Defensor' },
      { id: 'central-d-15', number: 15, name: 'Facundo Mallo', position: 'DEF', posLabel: 'Defensor' },
      { id: 'central-d-00a', number: 0, name: 'Gastón Ávila', position: 'DEF', posLabel: 'Defensor' },
      { id: 'central-d-00b', number: 0, name: 'Ulises Ciccioli', position: 'DEF', posLabel: 'Defensor' },
      { id: 'central-d-00c', number: 0, name: 'Ignacio Ovando', position: 'DEF', posLabel: 'Defensor' },
      { id: 'central-d-24', number: 24, name: 'Juan Giménez', position: 'DEF', posLabel: 'Defensor' },
      // LATERALES
      { id: 'central-l-00', number: 0, name: 'Alexis Soto', position: 'LAT', posLabel: 'Lateral' },
      { id: 'central-l-03', number: 3, name: 'Agustín Sánchez', position: 'LAT', posLabel: 'Lateral' },
      { id: 'central-l-32', number: 32, name: 'Emanuel Coronel', position: 'LAT', posLabel: 'Lateral' },
      // MEDIOCAMPISTAS
      { id: 'central-m-05', number: 5, name: 'Franco Ibarra', position: 'MED', posLabel: 'Mediocampista' },
      { id: 'central-m-00a', number: 0, name: 'Pol Fernández', position: 'MED', posLabel: 'Mediocampista' },
      { id: 'central-m-00b', number: 0, name: 'Vicente Pizarro', position: 'MED', posLabel: 'Mediocampista' },
      { id: 'central-m-16', number: 16, name: 'Enzo Giménez', position: 'MED', posLabel: 'Mediocampista' },
      { id: 'central-m-17', number: 17, name: 'Luis Segovia', position: 'MED', posLabel: 'Mediocampista' },
      { id: 'central-m-26', number: 26, name: 'Giovanni Cantizano', position: 'MED', posLabel: 'Mediocampista' },
      { id: 'central-m-31', number: 31, name: 'Federico Navarro', position: 'MED', posLabel: 'Mediocampista' },
      // MEDIOCAMPISTA OFENSIVO
      { id: 'central-mo-08', number: 8, name: 'Jaminton Campaz', position: 'VOL', posLabel: 'Med. Ofensivo' },
      // DELANTEROS
      { id: 'central-del-00', number: 0, name: 'Marco Ruben', position: 'DEL', posLabel: 'Delantero' },
      { id: 'central-del-22', number: 22, name: 'Enzo Copetti', position: 'DEL', posLabel: 'Delantero' },
      { id: 'central-del-09', number: 9, name: 'Alejo Véliz', position: 'DEL', posLabel: 'Delantero' },
      { id: 'central-del-11', number: 11, name: 'Ángel Di María', position: 'DEL', posLabel: 'Delantero' },
      { id: 'central-del-00b', number: 0, name: 'Julián Fernández', position: 'DEL', posLabel: 'Delantero' },
      { id: 'central-del-27', number: 27, name: 'Gaspar Duarte', position: 'DEL', posLabel: 'Delantero' },
      { id: 'central-del-39', number: 39, name: 'Fabricio Oviedo', position: 'DEL', posLabel: 'Delantero' },
    ],
    goleadores: [
      { id: 'central-g-01', name: 'Ángel Di María', goals: 11 },
      { id: 'central-g-02', name: 'Marco Ruben', goals: 9 },
      { id: 'central-g-03', name: 'Alejo Véliz', goals: 7 },
      { id: 'central-g-04', name: 'Enzo Copetti', goals: 6 },
    ],
    copas: [
      { id: 'central-c-01', name: 'Liga Profesional 2024/25', year: 2025, detail: 'Campeón' },
      { id: 'central-c-02', name: 'Copa de la Liga 2023', year: 2023, detail: 'Campeón' },
      { id: 'central-c-03', name: 'Copa Argentina 2018', year: 2018, detail: 'Campeón' },
      { id: 'central-c-04', name: 'Primera Nacional 2013', year: 2013, detail: 'Campeón' },
      { id: 'central-c-05', name: 'Copa Conmebol 1995', year: 1995, detail: 'Campeón' },
      { id: 'central-c-06', name: 'Liga Argentina 1987', year: 1987, detail: 'Campeón' },
      { id: 'central-c-07', name: 'Liga Argentina 1980', year: 1980, detail: 'Campeón' },
      { id: 'central-c-08', name: 'Liga Argentina 1973', year: 1973, detail: 'Campeón' },
      { id: 'central-c-09', name: 'Liga Argentina 1971', year: 1971, detail: 'Campeón' },
    ],
    descensos: [
      { id: 'central-d-01', year: 2010, detail: 'Descenso Primera División 2009/10.' },
      { id: 'central-d-02', year: 1984, detail: 'Descenso Primera División 1983/84.' },
      { id: 'central-d-03', year: 1941, detail: 'Descenso Primera División 1940/41.' },
    ],
    historia: 'Fundado en 1889 en Rosario, es uno de los clubes más antiguos de Argentina. Conocido como "El Canalla". Campeón Liga Profesional 2024/25.',
  },

  newells: {
    id: 'newells',
    name: "Newell's Old Boys",
    shortName: "Newell's",
    dt: 'Frank Darío Kudelka',
    capitan: 'Luca Regiardo',
    color: '#CC0000',
    players: [
      // ARQUEROS
      { id: 'nob-a-00a', number: 0, name: 'Gabriel Arias', position: 'ARQ', posLabel: 'Arquero' },
      { id: 'nob-a-00b', number: 0, name: 'Josué Reinatti', position: 'ARQ', posLabel: 'Arquero' },
      { id: 'nob-a-30', number: 30, name: 'Williams Barlasina', position: 'ARQ', posLabel: 'Arquero' },
      // DEFENSORES
      { id: 'nob-d-00a', number: 0, name: 'Oscar Salomón', position: 'DEF', posLabel: 'Defensor' },
      { id: 'nob-d-00b', number: 0, name: 'Nicolás Goitea', position: 'DEF', posLabel: 'Defensor' },
      { id: 'nob-d-00c', number: 0, name: 'Bruno Cabrera', position: 'DEF', posLabel: 'Defensor' },
      { id: 'nob-d-00d', number: 0, name: 'Ian Glavinovich', position: 'DEF', posLabel: 'Defensor' },
      { id: 'nob-d-29', number: 29, name: 'Fabián Noguera', position: 'DEF', posLabel: 'Defensor' },
      { id: 'nob-d-97', number: 97, name: 'Saúl Salcedo', position: 'DEF', posLabel: 'Defensor' },
      // LATERALES
      { id: 'nob-l-00a', number: 0, name: 'Gabriel Risso', position: 'LAT', posLabel: 'Lateral' },
      { id: 'nob-l-00b', number: 0, name: 'Martín Ortega', position: 'LAT', posLabel: 'Lateral' },
      { id: 'nob-l-26', number: 26, name: 'Martín Luciano', position: 'LAT', posLabel: 'Lateral' },
      // DEF/LAT
      { id: 'nob-dl-00', number: 0, name: 'Armando Méndez', position: 'DEF', posLabel: 'Def/Lateral' },
      // MEDIOCAMPISTAS
      { id: 'nob-m-00', number: 0, name: 'Rodrigo Herrera', position: 'MED', posLabel: 'Mediocampista' },
      { id: 'nob-m-27', number: 27, name: 'Luca Regiardo', position: 'MED', posLabel: 'Mediocampista' },
      { id: 'nob-m-04', number: 4, name: 'Alejo Montero', position: 'MED', posLabel: 'Mediocampista' },
      // VOLANTES
      { id: 'nob-v-00', number: 0, name: 'Marcelo Esponda', position: 'VOL', posLabel: 'Volante' },
      // MEDIOCAMPISTAS OFENSIVOS
      { id: 'nob-mo-34', number: 34, name: 'David Sotelo', position: 'VOL', posLabel: 'Med. Ofensivo' },
      { id: 'nob-mo-46', number: 46, name: 'Valentino Acuña', position: 'VOL', posLabel: 'Med. Ofensivo' },
      // DELANTEROS
      { id: 'nob-del-00a', number: 0, name: 'Ignacio Ramírez', position: 'DEL', posLabel: 'Delantero' },
      { id: 'nob-del-00b', number: 0, name: 'Matías Cóccaro', position: 'DEL', posLabel: 'Delantero' },
      { id: 'nob-del-00c', number: 0, name: 'Walter Núñez', position: 'DEL', posLabel: 'Delantero' },
      { id: 'nob-del-07', number: 7, name: 'Franco Orozco', position: 'DEL', posLabel: 'Delantero' },
      { id: 'nob-del-18', number: 18, name: 'Walter Mazzantti', position: 'DEL', posLabel: 'Delantero' },
      // SEGUNDOS DELANTEROS
      { id: 'nob-sd-00', number: 0, name: 'Luciano Herrera', position: 'DEL', posLabel: '2do Delantero' },
      // EXTREMOS
      { id: 'nob-ex-00a', number: 0, name: 'Michael Hoyos', position: 'DEL', posLabel: 'Extremo' },
      { id: 'nob-ex-00b', number: 0, name: 'Franco García', position: 'DEL', posLabel: 'Extremo' },
    ],
    goleadores: [
      { id: 'nob-g-01', name: 'Matías Cóccaro', goals: 13 },
      { id: 'nob-g-02', name: 'Ignacio Ramírez', goals: 8 },
      { id: 'nob-g-03', name: 'David Sotelo', goals: 6 },
      { id: 'nob-g-04', name: 'Franco Orozco', goals: 4 },
    ],
    copas: [
      { id: 'nob-c-01', name: 'Liga Argentina 2013', year: 2013, detail: 'Campeón' },
      { id: 'nob-c-02', name: 'Liga Argentina 2004', year: 2004, detail: 'Campeón' },
      { id: 'nob-c-03', name: 'Liga Argentina 1993', year: 1993, detail: 'Campeón' },
      { id: 'nob-c-04', name: 'Liga Argentina 1992', year: 1992, detail: 'Campeón' },
      { id: 'nob-c-05', name: 'Liga Argentina 1991', year: 1991, detail: 'Campeón' },
      { id: 'nob-c-06', name: 'Liga Argentina 1988', year: 1988, detail: 'Campeón' },
      { id: 'nob-c-07', name: 'Liga Argentina 1974', year: 1974, detail: 'Campeón' },
    ],
    descensos: [
      { id: 'nob-d-01', year: 1960, detail: 'Primer descenso del club en 1960.' },
    ],
    historia: 'Fundado en 1903 en Rosario por Isaac Newell. Conocido como "La Lepra". Cuna de Lionel Messi. 7 títulos nacionales.',
  },
};

// ─── F1 ──────────────────────────────────────────────────────────────────────

export const f1Pilots: F1Pilot[] = [
  { id: 'pilot-01', pos: 1, name: 'Kimi Antonelli', team: 'Mercedes', points: 72, nationality: '🇮🇹' },
  { id: 'pilot-02', pos: 2, name: 'George Russell', team: 'Mercedes', points: 63, nationality: '🇬🇧' },
  { id: 'pilot-03', pos: 3, name: 'Charles Leclerc', team: 'Ferrari', points: 49, nationality: '🇲🇨' },
  { id: 'pilot-04', pos: 4, name: 'Lewis Hamilton', team: 'Ferrari', points: 41, nationality: '🇬🇧' },
  { id: 'pilot-05', pos: 5, name: 'Lando Norris', team: 'McLaren', points: 25, nationality: '🇬🇧' },
  { id: 'pilot-06', pos: 6, name: 'Oscar Piastri', team: 'McLaren', points: 21, nationality: '🇦🇺' },
  { id: 'pilot-07', pos: 7, name: 'Oliver Bearman', team: 'Haas', points: 17, nationality: '🇬🇧' },
  { id: 'pilot-08', pos: 8, name: 'Pierre Gasly', team: 'Alpine', points: 15, nationality: '🇫🇷' },
  { id: 'pilot-09', pos: 9, name: 'Max Verstappen', team: 'Red Bull', points: 12, nationality: '🇳🇱' },
  { id: 'pilot-10', pos: 10, name: 'Liam Lawson', team: 'Racing Bulls', points: 10, nationality: '🇳🇿' },
  { id: 'pilot-11', pos: 11, name: 'Arvid Lindblad', team: 'Racing Bulls', points: 4, nationality: '🇸🇪' },
  { id: 'pilot-12', pos: 12, name: 'Isack Hadjar', team: 'Red Bull', points: 4, nationality: '🇫🇷' },
  { id: 'pilot-13', pos: 13, name: 'Gabriel Bortoleto', team: 'Audi', points: 2, nationality: '🇧🇷' },
  { id: 'pilot-14', pos: 14, name: 'Carlos Sainz', team: 'Williams', points: 2, nationality: '🇪🇸' },
  { id: 'pilot-15', pos: 15, name: 'Franco Colapinto', team: 'Alpine', points: 1, nationality: '🇦🇷', highlight: true },
  { id: 'pilot-16', pos: 16, name: 'Esteban Ocon', team: 'Haas', points: 1, nationality: '🇫🇷' },
  { id: 'pilot-17', pos: 17, name: 'Alex Albon', team: 'Williams', points: 0, nationality: '🇹🇭' },
  { id: 'pilot-18', pos: 18, name: 'Sergio Pérez', team: 'Cadillac', points: 0, nationality: '🇲🇽' },
  { id: 'pilot-19', pos: 19, name: 'Lance Stroll', team: 'Aston Martin', points: 0, nationality: '🇨🇦' },
  { id: 'pilot-20', pos: 20, name: 'Fernando Alonso', team: 'Aston Martin', points: 0, nationality: '🇪🇸' },
  { id: 'pilot-21', pos: 21, name: 'Valtteri Bottas', team: 'Cadillac', points: 0, nationality: '🇫🇮' },
  { id: 'pilot-22', pos: 22, name: 'Nico Hülkenberg', team: 'Audi', points: 0, nationality: '🇩🇪' },
];

export const f1Constructors: F1Constructor[] = [
  { id: 'cons-01', pos: 1, name: 'Mercedes', points: 135, pilots: ['Kimi Antonelli', 'George Russell'] },
  { id: 'cons-02', pos: 2, name: 'Ferrari', points: 90, pilots: ['Charles Leclerc', 'Lewis Hamilton'] },
  { id: 'cons-03', pos: 3, name: 'McLaren', points: 46, pilots: ['Lando Norris', 'Oscar Piastri'] },
  { id: 'cons-04', pos: 4, name: 'Haas', points: 18, pilots: ['Oliver Bearman', 'Esteban Ocon'] },
  { id: 'cons-05', pos: 5, name: 'Red Bull', points: 16, pilots: ['Max Verstappen', 'Isack Hadjar'] },
  { id: 'cons-06', pos: 6, name: 'Alpine', points: 16, pilots: ['Pierre Gasly', 'Franco Colapinto'] },
  { id: 'cons-07', pos: 7, name: 'Racing Bulls', points: 14, pilots: ['Liam Lawson', 'Arvid Lindblad'] },
  { id: 'cons-08', pos: 8, name: 'Audi', points: 2, pilots: ['Nico Hülkenberg', 'Gabriel Bortoleto'] },
  { id: 'cons-09', pos: 9, name: 'Williams', points: 2, pilots: ['Carlos Sainz', 'Alex Albon'] },
  { id: 'cons-10', pos: 10, name: 'Cadillac', points: 0, pilots: ['Sergio Pérez', 'Valtteri Bottas'] },
  { id: 'cons-11', pos: 11, name: 'Aston Martin', points: 0, pilots: ['Fernando Alonso', 'Lance Stroll'] },
];

export const f1Calendar: F1Race[] = [
  { id: 'race-01', round: 1, name: 'Australia', circuit: 'Albert Park', city: 'Melbourne', date: '06/03/2026', status: 'completed' },
  { id: 'race-02', round: 2, name: 'China', circuit: 'Shanghai International', city: 'Shanghai', date: '13/03/2026', status: 'completed' },
  { id: 'race-03', round: 3, name: 'Japón', circuit: 'Suzuka', city: 'Suzuka', date: '29/03/2026', status: 'completed' },
  { id: 'race-04', round: 4, name: 'Bahrain', circuit: 'Bahrain International', city: 'Sakhir', date: '12/04/2026', status: 'completed' },
  { id: 'race-05', round: 5, name: 'Arabia Saudita', circuit: 'Jeddah Corniche', city: 'Jeddah', date: '19/04/2026', status: 'completed' },
  { id: 'race-06', round: 6, name: 'Miami', circuit: 'Miami International', city: 'Miami', date: '03/05/2026', status: 'next' },
  { id: 'race-07', round: 7, name: 'Canadá', circuit: 'Circuit Gilles Villeneuve', city: 'Montreal', date: '24/05/2026', status: 'upcoming' },
  { id: 'race-08', round: 8, name: 'Mónaco', circuit: 'Circuit de Monaco', city: 'Montecarlo', date: '07/06/2026', status: 'upcoming' },
  { id: 'race-09', round: 9, name: 'España', circuit: 'Circuit de Barcelona-Catalunya', city: 'Barcelona', date: '14/06/2026', status: 'upcoming' },
  { id: 'race-10', round: 10, name: 'Austria', circuit: 'Red Bull Ring', city: 'Spielberg', date: '28/06/2026', status: 'upcoming' },
  { id: 'race-11', round: 11, name: 'Gran Bretaña', circuit: 'Silverstone', city: 'Silverstone', date: '05/07/2026', status: 'upcoming' },
  { id: 'race-12', round: 12, name: 'Hungría', circuit: 'Hungaroring', city: 'Budapest', date: '19/07/2026', status: 'upcoming' },
  { id: 'race-13', round: 13, name: 'Bélgica', circuit: 'Circuit de Spa-Francorchamps', city: 'Spa', date: '26/07/2026', status: 'upcoming' },
  { id: 'race-14', round: 14, name: 'Países Bajos', circuit: 'Circuit Zandvoort', city: 'Zandvoort', date: '30/08/2026', status: 'upcoming' },
  { id: 'race-15', round: 15, name: 'Italia', circuit: 'Autodromo di Monza', city: 'Monza', date: '13/09/2026', status: 'upcoming' },
  { id: 'race-16', round: 16, name: 'Madrid', circuit: 'Madring', city: 'Madrid', date: '27/09/2026', status: 'upcoming' },
  { id: 'race-17', round: 17, name: 'Singapur', circuit: 'Marina Bay Street', city: 'Singapur', date: '04/10/2026', status: 'upcoming' },
  { id: 'race-18', round: 18, name: 'Estados Unidos', circuit: 'Circuit of the Americas', city: 'Austin', date: '18/10/2026', status: 'upcoming' },
  { id: 'race-19', round: 19, name: 'México', circuit: 'Autódromo Hermanos Rodríguez', city: 'Ciudad de México', date: '25/10/2026', status: 'upcoming' },
  { id: 'race-20', round: 20, name: 'Brasil', circuit: 'Autódromo José Carlos Pace', city: 'São Paulo', date: '08/11/2026', status: 'upcoming' },
  { id: 'race-21', round: 21, name: 'Las Vegas', circuit: 'Las Vegas Strip', city: 'Las Vegas', date: '22/11/2026', status: 'upcoming' },
  { id: 'race-22', round: 22, name: 'Abu Dhabi', circuit: 'Yas Marina', city: 'Abu Dhabi', date: '06/12/2026', status: 'upcoming' },
];

// ─── ARGENTINA ───────────────────────────────────────────────────────────────

export const argSelection: ArgSelection = {
  dt: 'Lionel Scaloni',
  capitan: 'Lionel Messi',
  players: [],
  titles: [
    { id: 'arg-t-01', name: 'Copa Mundial FIFA', year: 2022, host: 'Qatar' },
    { id: 'arg-t-02', name: 'Copa Mundial FIFA', year: 1986, host: 'México' },
    { id: 'arg-t-03', name: 'Copa Mundial FIFA', year: 1978, host: 'Argentina' },
    { id: 'arg-t-04', name: 'Copa América', year: 2021, host: 'Brasil' },
    { id: 'arg-t-05', name: 'Copa América', year: 1993, host: 'Ecuador' },
    { id: 'arg-t-06', name: 'Copa América', year: 1991, host: 'Chile' },
    { id: 'arg-t-07', name: 'Copa América', year: 1959, host: 'Argentina' },
    { id: 'arg-t-08', name: 'Copa América', year: 1957, host: 'Perú' },
    { id: 'arg-t-09', name: 'Copa América', year: 1955, host: 'Chile' },
    { id: 'arg-t-10', name: 'Copa América', year: 1947, host: 'Ecuador' },
    { id: 'arg-t-11', name: 'Copa América', year: 1946, host: 'Argentina' },
    { id: 'arg-t-12', name: 'Copa América', year: 1945, host: 'Chile' },
    { id: 'arg-t-13', name: 'Copa América', year: 1941, host: 'Chile' },
    { id: 'arg-t-14', name: 'Copa América', year: 1937, host: 'Argentina' },
    { id: 'arg-t-15', name: 'Copa América', year: 1927, host: 'Perú' },
    { id: 'arg-t-16', name: 'Copa América', year: 1926, host: 'Chile' },
    { id: 'arg-t-17', name: 'Copa América', year: 1925, host: 'Argentina' },
    { id: 'arg-t-18', name: 'Copa América', year: 1923, host: 'Uruguay' },
    { id: 'arg-t-19', name: 'Copa América', year: 1921, host: 'Argentina' },
    { id: 'arg-t-20', name: 'Copa América', year: 1920, host: 'Chile' },
    { id: 'arg-t-21', name: 'Finalissima', year: 2022, host: 'Inglaterra' },
    { id: 'arg-t-22', name: 'Copa Confederaciones', year: 1992, host: 'Arabia Saudita' },
  ],
  worldCups: [
    { id: 'arg-wc-01', year: 2022, host: 'Qatar', result: 'Campeón', topScorer: 'Lionel Messi (7 goles)' },
    { id: 'arg-wc-02', year: 2018, host: 'Rusia', result: 'Octavos de final', topScorer: 'Lionel Messi (1 gol)' },
    { id: 'arg-wc-03', year: 2014, host: 'Brasil', result: 'Finalista', topScorer: 'Gonzalo Higuaín (4 goles)' },
    { id: 'arg-wc-04', year: 2010, host: 'Sudáfrica', result: 'Cuartos de final', topScorer: 'Gonzalo Higuaín (4 goles)' },
    { id: 'arg-wc-05', year: 2006, host: 'Alemania', result: 'Cuartos de final', topScorer: 'Hernán Crespo (3 goles)' },
    { id: 'arg-wc-06', year: 2002, host: 'Corea/Japón', result: 'Fase de grupos', topScorer: 'Hernán Crespo (2 goles)' },
    { id: 'arg-wc-07', year: 1998, host: 'Francia', result: 'Cuartos de final', topScorer: 'Gabriel Batistuta (5 goles)' },
    { id: 'arg-wc-08', year: 1994, host: 'EE.UU.', result: 'Octavos de final', topScorer: 'Gabriel Batistuta (4 goles)' },
    { id: 'arg-wc-09', year: 1990, host: 'Italia', result: 'Finalista', topScorer: 'Claudio Caniggia (2 goles)' },
    { id: 'arg-wc-10', year: 1986, host: 'México', result: 'Campeón', topScorer: 'Jorge Valdano (5 goles)' },
    { id: 'arg-wc-11', year: 1982, host: 'España', result: 'Segunda fase', topScorer: 'Daniel Bertoni (2 goles)' },
    { id: 'arg-wc-12', year: 1978, host: 'Argentina', result: 'Campeón', topScorer: 'Mario Kempes (6 goles)' },
  ],
  topScorers: [
    { id: 'arg-gs-01', name: 'Lionel Messi', goals: 109, caps: 191, active: true },
    { id: 'arg-gs-02', name: 'Gabriel Batistuta', goals: 54, caps: 78, active: false },
    { id: 'arg-gs-03', name: 'Sergio Agüero', goals: 41, caps: 101, active: false },
    { id: 'arg-gs-04', name: 'Hernán Crespo', goals: 35, caps: 64, active: false },
    { id: 'arg-gs-05', name: 'Diego Maradona', goals: 34, caps: 91, active: false },
    { id: 'arg-gs-06', name: 'Gonzalo Higuaín', goals: 31, caps: 75, active: false },
    { id: 'arg-gs-07', name: 'Lautaro Martínez', goals: 33, caps: 68, active: true },
    { id: 'arg-gs-08', name: 'Julio Libonatti', goals: 23, caps: 22, active: false },
  ],
  presencias: [
    { id: 'arg-pr-01', name: 'Lionel Messi', caps: 191, years: '2005–presente', active: true },
    { id: 'arg-pr-02', name: 'Javier Mascherano', caps: 147, years: '2003–2018', active: false },
    { id: 'arg-pr-03', name: 'Ángel Di María', caps: 145, years: '2008–2024', active: false },
    { id: 'arg-pr-04', name: 'Roberto Ayala', caps: 115, years: '1994–2007', active: false },
    { id: 'arg-pr-05', name: 'Sergio Agüero', caps: 101, years: '2006–2021', active: false },
    { id: 'arg-pr-06', name: 'Oscar Ruggeri', caps: 97, years: '1983–1994', active: false },
    { id: 'arg-pr-07', name: 'Diego Maradona', caps: 91, years: '1977–1994', active: false },
    { id: 'arg-pr-08', name: 'Lautaro Martínez', caps: 68, years: '2018–presente', active: true },
  ],
};

// ─── BASKET ──────────────────────────────────────────────────────────────────

export const basketTeams: BasketTeam[] = [
  { id: 'basket-01', name: 'Rosario Central', wins: 0, losses: 0, points: 0, players: [] },
  { id: 'basket-02', name: 'Gimnasia', wins: 0, losses: 0, points: 0, players: [] },
  { id: 'basket-03', name: 'Náutico', wins: 0, losses: 0, points: 0, players: [] },
  { id: 'basket-04', name: 'Temperley', wins: 0, losses: 0, points: 0, players: [] },
];
