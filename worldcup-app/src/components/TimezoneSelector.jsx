import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, StyleSheet } from 'react-native';
import { TIMEZONE_PRESETS } from '../utils/timezone';
import { useApp } from '../context/AppContext';

export default function TimezoneSelector() {
  const { timezone, changeTimezone } = useApp();
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');

  const current = TIMEZONE_PRESETS.find((t) => t.zone === timezone);
  const filtered = TIMEZONE_PRESETS.filter((t) =>
    t.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <TouchableOpacity style={styles.trigger} onPress={() => setVisible(true)}>
        <Text style={styles.triggerFlag}>{current?.flag || '🌍'}</Text>
        <Text style={styles.triggerText}>{current?.label || timezone}</Text>
        <Text style={styles.triggerArrow}>▼</Text>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Fuseau horaire</Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text style={styles.close}>✕</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.search}
              placeholder="Rechercher un pays..."
              placeholderTextColor="#64748b"
              value={search}
              onChangeText={setSearch}
            />

            <FlatList
              data={filtered}
              keyExtractor={(item) => item.zone}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.item, item.zone === timezone && styles.itemActive]}
                  onPress={() => { changeTimezone(item.zone); setVisible(false); setSearch(''); }}
                >
                  <Text style={styles.itemFlag}>{item.flag}</Text>
                  <Text style={styles.itemLabel}>{item.label}</Text>
                  {item.zone === timezone && <Text style={styles.check}>✓</Text>}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 6,
  },
  triggerFlag: { fontSize: 16 },
  triggerText: { fontSize: 13, color: '#e2e8f0', fontWeight: '600' },
  triggerArrow: { fontSize: 10, color: '#64748b' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#0f172a',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
    paddingBottom: 40,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  sheetTitle: { fontSize: 18, fontWeight: '800', color: '#f8fafc' },
  close: { fontSize: 20, color: '#64748b', padding: 4 },
  search: {
    margin: 16,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#f8fafc',
    borderWidth: 1,
    borderColor: '#334155',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    paddingHorizontal: 20,
    gap: 12,
  },
  itemActive: {
    backgroundColor: '#1e293b',
  },
  itemFlag: { fontSize: 20 },
  itemLabel: { fontSize: 14, color: '#e2e8f0', fontWeight: '500', flex: 1 },
  check: { fontSize: 16, color: '#f59e0b', fontWeight: '800' },
});
