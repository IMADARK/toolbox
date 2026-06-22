import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const FILTERS = [
  { key: 'ALL', label: 'Tous' },
  { key: 'LIVE', label: '🔴 En direct' },
  { key: 'UPCOMING', label: 'À venir' },
  { key: 'FINISHED', label: 'Terminés' },
];

export default function FilterBar({ active, onChange }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {FILTERS.map((f) => (
        <TouchableOpacity
          key={f.key}
          style={[styles.chip, active === f.key && styles.chipActive]}
          onPress={() => onChange(f.key)}
        >
          <Text style={[styles.chipText, active === f.key && styles.chipTextActive]}>
            {f.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94a3b8',
  },
  chipTextActive: {
    color: '#0f172a',
  },
});
