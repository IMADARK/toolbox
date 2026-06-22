import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function GroupTable({ group }) {
  return (
    <View style={styles.container}>
      <Text style={styles.groupName}>{group.group.replace('_', ' ')}</Text>

      <View style={styles.headerRow}>
        <Text style={[styles.headerCell, styles.teamCol]}>Équipe</Text>
        <Text style={styles.headerCell}>MJ</Text>
        <Text style={styles.headerCell}>G</Text>
        <Text style={styles.headerCell}>N</Text>
        <Text style={styles.headerCell}>P</Text>
        <Text style={styles.headerCell}>DB</Text>
        <Text style={[styles.headerCell, styles.ptsCol]}>Pts</Text>
      </View>

      {group.table.map((row, index) => {
        const isQualified = index < 2;
        return (
          <View key={row.team.id || index} style={[styles.row, isQualified && styles.qualifiedRow]}>
            <View style={[styles.teamCol, styles.teamCell]}>
              <Text style={styles.position}>{row.position}</Text>
              <Image source={{ uri: row.team.crest }} style={styles.crest} />
              <Text style={styles.teamName} numberOfLines={1}>{row.team.tla || row.team.name}</Text>
            </View>
            <Text style={styles.cell}>{row.playedGames}</Text>
            <Text style={styles.cell}>{row.won}</Text>
            <Text style={styles.cell}>{row.draw}</Text>
            <Text style={styles.cell}>{row.lost}</Text>
            <Text style={[styles.cell, row.goalDifference > 0 && styles.positive, row.goalDifference < 0 && styles.negative]}>
              {row.goalDifference > 0 ? '+' : ''}{row.goalDifference}
            </Text>
            <Text style={[styles.cell, styles.ptsCol, styles.pts]}>{row.points}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
  },
  groupName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#f8fafc',
    padding: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headerRow: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#0f172a',
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  headerCell: {
    width: 28,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
  },
  teamCol: {
    flex: 1,
  },
  ptsCol: {
    width: 32,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
  },
  qualifiedRow: {
    borderLeftWidth: 3,
    borderLeftColor: '#22c55e',
  },
  teamCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  position: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    width: 16,
  },
  crest: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  teamName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#e2e8f0',
    flex: 1,
  },
  cell: {
    width: 28,
    textAlign: 'center',
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  pts: {
    fontWeight: '800',
    color: '#f8fafc',
    fontSize: 13,
  },
  positive: {
    color: '#22c55e',
  },
  negative: {
    color: '#ef4444',
  },
});
