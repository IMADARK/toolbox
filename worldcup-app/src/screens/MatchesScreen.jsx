import React, { useState, useCallback } from 'react';
import { View, FlatList, Text, RefreshControl, StyleSheet } from 'react-native';
import { useMatches } from '../hooks/useFootballData';
import MatchCard from '../components/MatchCard';
import FilterBar from '../components/FilterBar';
import TimezoneSelector from '../components/TimezoneSelector';

export default function MatchesScreen({ navigation }) {
  const { data: matches = [], isLoading, isFetching, refetch } = useMatches();
  const [filter, setFilter] = useState('ALL');

  const filtered = matches.filter((m) => {
    if (filter === 'LIVE') return m.status === 'IN_PLAY' || m.status === 'LIVE';
    if (filter === 'FINISHED') return m.status === 'FINISHED';
    if (filter === 'UPCOMING') return m.status === 'TIMED' || m.status === 'SCHEDULED';
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const order = { IN_PLAY: 0, LIVE: 0, TIMED: 1, SCHEDULED: 1, FINISHED: 2 };
    const diff = (order[a.status] ?? 3) - (order[b.status] ?? 3);
    if (diff !== 0) return diff;
    return new Date(a.utcDate) - new Date(b.utcDate);
  });

  const liveCount = matches.filter((m) => m.status === 'IN_PLAY' || m.status === 'LIVE').length;

  const onRefresh = useCallback(() => { refetch(); }, [refetch]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.title}>⚽ Coupe du Monde</Text>
          {liveCount > 0 && (
            <Text style={styles.liveIndicator}>
              🔴 {liveCount} match{liveCount > 1 ? 's' : ''} en direct
            </Text>
          )}
        </View>
        <TimezoneSelector />
      </View>

      <FilterBar active={filter} onChange={setFilter} />

      <FlatList
        data={sorted}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <MatchCard
            match={item}
            onPress={() => navigation.navigate('MatchDetail', { match: item })}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} tintColor="#f59e0b" />
        }
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>Aucun match trouvé</Text>
          </View>
        }
      />

      {isFetching && !isLoading && (
        <View style={styles.syncBar}>
          <Text style={styles.syncText}>Mise à jour...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: { fontSize: 22, fontWeight: '900', color: '#f8fafc' },
  liveIndicator: { fontSize: 12, color: '#ef4444', fontWeight: '600', marginTop: 2 },
  list: { paddingBottom: 100 },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyIcon: { fontSize: 48 },
  emptyText: { fontSize: 15, color: '#64748b', marginTop: 8 },
  syncBar: {
    position: 'absolute',
    bottom: 90,
    alignSelf: 'center',
    backgroundColor: '#1e293b',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  syncText: { fontSize: 11, color: '#94a3b8' },
});
