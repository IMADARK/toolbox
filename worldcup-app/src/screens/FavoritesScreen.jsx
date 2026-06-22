import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { useMatches } from '../hooks/useFootballData';
import MatchCard from '../components/MatchCard';

const ALL_TEAMS = [
  { name: 'France', tla: 'FRA', crest: 'https://crests.football-data.org/773.svg' },
  { name: 'Allemagne', tla: 'GER', crest: 'https://crests.football-data.org/759.svg' },
  { name: 'Espagne', tla: 'ESP', crest: 'https://crests.football-data.org/760.svg' },
  { name: 'Italie', tla: 'ITA', crest: 'https://crests.football-data.org/784.svg' },
  { name: 'Angleterre', tla: 'ENG', crest: 'https://crests.football-data.org/770.svg' },
  { name: 'Brésil', tla: 'BRA', crest: 'https://crests.football-data.org/764.svg' },
  { name: 'Argentine', tla: 'ARG', crest: 'https://crests.football-data.org/762.svg' },
  { name: 'Pays-Bas', tla: 'NED', crest: 'https://crests.football-data.org/682.svg' },
  { name: 'Portugal', tla: 'POR', crest: 'https://crests.football-data.org/765.svg' },
  { name: 'Croatie', tla: 'CRO', crest: 'https://crests.football-data.org/799.svg' },
  { name: 'Japon', tla: 'JPN', crest: 'https://crests.football-data.org/766.svg' },
  { name: 'Sénégal', tla: 'SEN', crest: 'https://crests.football-data.org/804.svg' },
];

export default function FavoritesScreen({ navigation }) {
  const { favorites, toggleFav } = useApp();
  const { data: matches = [] } = useMatches();

  const favMatches = matches.filter(
    (m) => favorites.includes(m.homeTeam.name) || favorites.includes(m.awayTeam.name)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⭐ Mes équipes</Text>
      <Text style={styles.subtitle}>Suivez vos équipes et recevez leurs notifications</Text>

      <View style={styles.teamsGrid}>
        {ALL_TEAMS.map((team) => {
          const isFav = favorites.includes(team.name);
          return (
            <TouchableOpacity
              key={team.name}
              style={[styles.teamChip, isFav && styles.teamChipActive]}
              onPress={() => toggleFav(team.name)}
            >
              <Image source={{ uri: team.crest }} style={styles.chipCrest} />
              <Text style={[styles.chipName, isFav && styles.chipNameActive]}>{team.tla}</Text>
              <Text style={styles.chipStar}>{isFav ? '★' : '☆'}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {favorites.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Matchs de vos équipes</Text>
          <FlatList
            data={favMatches}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <MatchCard match={item} onPress={() => navigation.navigate('MatchDetail', { match: item })} />
            )}
            ListEmptyComponent={
              <Text style={styles.noMatches}>Aucun match programmé pour vos équipes</Text>
            }
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  title: { fontSize: 22, fontWeight: '900', color: '#f8fafc', paddingHorizontal: 16, paddingTop: 8 },
  subtitle: { fontSize: 13, color: '#64748b', paddingHorizontal: 16, marginTop: 4, marginBottom: 16 },
  teamsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 8,
    marginBottom: 20,
  },
  teamChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 6,
  },
  teamChipActive: {
    borderColor: '#f59e0b',
    backgroundColor: '#292524',
  },
  chipCrest: { width: 20, height: 20, resizeMode: 'contain' },
  chipName: { fontSize: 12, fontWeight: '700', color: '#94a3b8' },
  chipNameActive: { color: '#f59e0b' },
  chipStar: { fontSize: 14, color: '#f59e0b' },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#f8fafc',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  noMatches: { fontSize: 13, color: '#64748b', textAlign: 'center', paddingTop: 20 },
});
