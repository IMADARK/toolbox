import React from 'react';
import { FlatList, View, Text, RefreshControl, StyleSheet } from 'react-native';
import { useStandings } from '../hooks/useFootballData';
import GroupTable from '../components/GroupTable';

export default function StandingsScreen() {
  const { data: standings = [], isLoading, refetch } = useStandings();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Classements</Text>
      <FlatList
        data={standings}
        keyExtractor={(item) => item.group}
        renderItem={({ item }) => <GroupTable group={item} />}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor="#f59e0b" />
        }
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Classements non disponibles</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#f8fafc',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  list: { paddingBottom: 100 },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 15, color: '#64748b' },
});
