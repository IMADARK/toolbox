const API_URL = 'https://api.football-data.org/v4';
const API_TOKEN = null; // Set your API key here or use environment config

const fetchFromAPI = async (endpoint) => {
  if (!API_TOKEN) {
    throw new Error('API key missing — demo mode');
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: { 'X-Auth-Token': API_TOKEN },
  });

  if (response.status === 429) {
    throw new Error('Rate limit reached');
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

const now = Date.now();

const mockMatches = [
  {
    id: 1, status: 'IN_PLAY', minute: 67, stage: 'GROUP_STAGE', group: 'GROUP A',
    utcDate: new Date(now - 4020000).toISOString(),
    homeTeam: { id: 773, name: 'France', tla: 'FRA', crest: 'https://crests.football-data.org/773.svg' },
    awayTeam: { id: 759, name: 'Allemagne', tla: 'GER', crest: 'https://crests.football-data.org/759.svg' },
    score: { fullTime: { home: 2, away: 1 }, halfTime: { home: 1, away: 0 } },
    referees: [{ name: 'A. Taylor', nationality: 'England' }],
    goals: [
      { minute: 23, team: 'France', scorer: 'K. Mbappé', assist: 'A. Griezmann' },
      { minute: 51, team: 'Allemagne', scorer: 'F. Wirtz', assist: 'J. Musiala' },
      { minute: 58, team: 'France', scorer: 'A. Griezmann', assist: 'O. Dembélé' },
    ],
  },
  {
    id: 2, status: 'IN_PLAY', minute: 34, stage: 'GROUP_STAGE', group: 'GROUP B',
    utcDate: new Date(now - 2040000).toISOString(),
    homeTeam: { id: 760, name: 'Espagne', tla: 'ESP', crest: 'https://crests.football-data.org/760.svg' },
    awayTeam: { id: 784, name: 'Italie', tla: 'ITA', crest: 'https://crests.football-data.org/784.svg' },
    score: { fullTime: { home: 1, away: 1 }, halfTime: { home: null, away: null } },
    referees: [{ name: 'D. Orsato', nationality: 'Italy' }],
    goals: [
      { minute: 12, team: 'Espagne', scorer: 'L. Yamal', assist: 'Pedri' },
      { minute: 28, team: 'Italie', scorer: 'N. Barella', assist: 'F. Chiesa' },
    ],
  },
  {
    id: 3, status: 'TIMED', stage: 'GROUP_STAGE', group: 'GROUP A',
    utcDate: new Date(now + 7200000).toISOString(),
    homeTeam: { id: 770, name: 'Angleterre', tla: 'ENG', crest: 'https://crests.football-data.org/770.svg' },
    awayTeam: { id: 764, name: 'Brésil', tla: 'BRA', crest: 'https://crests.football-data.org/764.svg' },
    score: { fullTime: { home: null, away: null } },
    referees: [{ name: 'F. Letexier', nationality: 'France' }],
    goals: [],
  },
  {
    id: 4, status: 'TIMED', stage: 'GROUP_STAGE', group: 'GROUP B',
    utcDate: new Date(now + 10800000).toISOString(),
    homeTeam: { id: 762, name: 'Argentine', tla: 'ARG', crest: 'https://crests.football-data.org/762.svg' },
    awayTeam: { id: 782, name: 'Pays-Bas', tla: 'NED', crest: 'https://crests.football-data.org/682.svg' },
    score: { fullTime: { home: null, away: null } },
    referees: [],
    goals: [],
  },
  {
    id: 5, status: 'TIMED', stage: 'GROUP_STAGE', group: 'GROUP C',
    utcDate: new Date(now + 86400000).toISOString(),
    homeTeam: { id: 765, name: 'Portugal', tla: 'POR', crest: 'https://crests.football-data.org/765.svg' },
    awayTeam: { id: 781, name: 'Croatie', tla: 'CRO', crest: 'https://crests.football-data.org/799.svg' },
    score: { fullTime: { home: null, away: null } },
    referees: [],
    goals: [],
  },
  {
    id: 6, status: 'TIMED', stage: 'GROUP_STAGE', group: 'GROUP C',
    utcDate: new Date(now + 90000000).toISOString(),
    homeTeam: { id: 766, name: 'Japon', tla: 'JPN', crest: 'https://crests.football-data.org/766.svg' },
    awayTeam: { id: 804, name: 'Sénégal', tla: 'SEN', crest: 'https://crests.football-data.org/804.svg' },
    score: { fullTime: { home: null, away: null } },
    referees: [],
    goals: [],
  },
  {
    id: 7, status: 'FINISHED', stage: 'GROUP_STAGE', group: 'GROUP A',
    utcDate: new Date(now - 86400000).toISOString(),
    homeTeam: { id: 770, name: 'Angleterre', tla: 'ENG', crest: 'https://crests.football-data.org/770.svg' },
    awayTeam: { id: 759, name: 'Allemagne', tla: 'GER', crest: 'https://crests.football-data.org/759.svg' },
    score: { fullTime: { home: 1, away: 1 }, halfTime: { home: 0, away: 1 } },
    referees: [{ name: 'C. Turpin', nationality: 'France' }],
    goals: [
      { minute: 31, team: 'Allemagne', scorer: 'K. Havertz', assist: 'F. Wirtz' },
      { minute: 72, team: 'Angleterre', scorer: 'J. Bellingham', assist: 'B. Saka' },
    ],
  },
  {
    id: 8, status: 'FINISHED', stage: 'GROUP_STAGE', group: 'GROUP B',
    utcDate: new Date(now - 90000000).toISOString(),
    homeTeam: { id: 762, name: 'Argentine', tla: 'ARG', crest: 'https://crests.football-data.org/762.svg' },
    awayTeam: { id: 784, name: 'Italie', tla: 'ITA', crest: 'https://crests.football-data.org/784.svg' },
    score: { fullTime: { home: 3, away: 0 }, halfTime: { home: 2, away: 0 } },
    referees: [{ name: 'S. Marciniak', nationality: 'Poland' }],
    goals: [
      { minute: 8, team: 'Argentine', scorer: 'L. Messi', assist: 'Á. Di María' },
      { minute: 37, team: 'Argentine', scorer: 'J. Álvarez', assist: 'L. Messi' },
      { minute: 81, team: 'Argentine', scorer: 'L. Messi', assist: null },
    ],
  },
  {
    id: 9, status: 'FINISHED', stage: 'GROUP_STAGE', group: 'GROUP A',
    utcDate: new Date(now - 172800000).toISOString(),
    homeTeam: { id: 773, name: 'France', tla: 'FRA', crest: 'https://crests.football-data.org/773.svg' },
    awayTeam: { id: 764, name: 'Brésil', tla: 'BRA', crest: 'https://crests.football-data.org/764.svg' },
    score: { fullTime: { home: 2, away: 2 }, halfTime: { home: 1, away: 1 } },
    referees: [{ name: 'W. Benítez', nationality: 'Argentina' }],
    goals: [
      { minute: 15, team: 'France', scorer: 'K. Mbappé', assist: null },
      { minute: 33, team: 'Brésil', scorer: 'Vinícius Jr.', assist: 'Rodrygo' },
      { minute: 55, team: 'Brésil', scorer: 'Rodrygo', assist: 'Vinícius Jr.' },
      { minute: 89, team: 'France', scorer: 'O. Giroud', assist: 'T. Hernández' },
    ],
  },
];

const mockStandings = [
  {
    group: 'GROUP A',
    table: [
      { position: 1, team: { id: 773, name: 'France', tla: 'FRA', crest: 'https://crests.football-data.org/773.svg' }, playedGames: 2, won: 1, draw: 1, lost: 0, points: 4, goalsFor: 6, goalsAgainst: 4, goalDifference: 2 },
      { position: 2, team: { id: 770, name: 'Angleterre', tla: 'ENG', crest: 'https://crests.football-data.org/770.svg' }, playedGames: 1, won: 0, draw: 1, lost: 0, points: 1, goalsFor: 1, goalsAgainst: 1, goalDifference: 0 },
      { position: 3, team: { id: 764, name: 'Brésil', tla: 'BRA', crest: 'https://crests.football-data.org/764.svg' }, playedGames: 1, won: 0, draw: 1, lost: 0, points: 1, goalsFor: 2, goalsAgainst: 2, goalDifference: 0 },
      { position: 4, team: { id: 759, name: 'Allemagne', tla: 'GER', crest: 'https://crests.football-data.org/759.svg' }, playedGames: 2, won: 0, draw: 1, lost: 1, points: 1, goalsFor: 2, goalsAgainst: 3, goalDifference: -1 },
    ],
  },
  {
    group: 'GROUP B',
    table: [
      { position: 1, team: { id: 762, name: 'Argentine', tla: 'ARG', crest: 'https://crests.football-data.org/762.svg' }, playedGames: 1, won: 1, draw: 0, lost: 0, points: 3, goalsFor: 3, goalsAgainst: 0, goalDifference: 3 },
      { position: 2, team: { id: 760, name: 'Espagne', tla: 'ESP', crest: 'https://crests.football-data.org/760.svg' }, playedGames: 0, won: 0, draw: 0, lost: 0, points: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0 },
      { position: 3, team: { id: 782, name: 'Pays-Bas', tla: 'NED', crest: 'https://crests.football-data.org/682.svg' }, playedGames: 0, won: 0, draw: 0, lost: 0, points: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0 },
      { position: 4, team: { id: 784, name: 'Italie', tla: 'ITA', crest: 'https://crests.football-data.org/784.svg' }, playedGames: 1, won: 0, draw: 0, lost: 1, points: 0, goalsFor: 0, goalsAgainst: 3, goalDifference: -3 },
    ],
  },
  {
    group: 'GROUP C',
    table: [
      { position: 1, team: { id: 765, name: 'Portugal', tla: 'POR', crest: 'https://crests.football-data.org/765.svg' }, playedGames: 0, won: 0, draw: 0, lost: 0, points: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0 },
      { position: 2, team: { id: 781, name: 'Croatie', tla: 'CRO', crest: 'https://crests.football-data.org/799.svg' }, playedGames: 0, won: 0, draw: 0, lost: 0, points: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0 },
      { position: 3, team: { id: 766, name: 'Japon', tla: 'JPN', crest: 'https://crests.football-data.org/766.svg' }, playedGames: 0, won: 0, draw: 0, lost: 0, points: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0 },
      { position: 4, team: { id: 804, name: 'Sénégal', tla: 'SEN', crest: 'https://crests.football-data.org/804.svg' }, playedGames: 0, won: 0, draw: 0, lost: 0, points: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0 },
    ],
  },
];

export const footballApi = {
  getMatches: async (competitionCode = 'WC') => {
    try {
      return await fetchFromAPI(`/competitions/${competitionCode}/matches`);
    } catch {
      return { matches: mockMatches };
    }
  },
  getStandings: async (competitionCode = 'WC') => {
    try {
      return await fetchFromAPI(`/competitions/${competitionCode}/standings`);
    } catch {
      return { standings: mockStandings };
    }
  },
};
