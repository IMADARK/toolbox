import React from 'react';
import { View, Text, Switch, ScrollView, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import TimezoneSelector from '../components/TimezoneSelector';

export default function SettingsScreen() {
  const { notifSettings, updateNotifSettings, timezone } = useApp();

  const toggle = (key) => {
    updateNotifSettings({ ...notifSettings, [key]: !notifSettings[key] });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>⚙️ Réglages</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌍 Fuseau horaire</Text>
        <Text style={styles.sectionDesc}>
          Les horaires des matchs s'afficheront selon le pays choisi
        </Text>
        <TimezoneSelector />
        <Text style={styles.currentTz}>{timezone}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔔 Notifications</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Début de match</Text>
            <Text style={styles.settingDesc}>Notification {notifSettings.minutesBefore} min avant le coup d'envoi</Text>
          </View>
          <Switch
            value={notifSettings.matchStart}
            onValueChange={() => toggle('matchStart')}
            trackColor={{ false: '#334155', true: '#f59e0b' }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Buts</Text>
            <Text style={styles.settingDesc}>Notification instantanée à chaque but</Text>
          </View>
          <Switch
            value={notifSettings.goals}
            onValueChange={() => toggle('goals')}
            trackColor={{ false: '#334155', true: '#f59e0b' }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Fin de match</Text>
            <Text style={styles.settingDesc}>Score final à la fin du match</Text>
          </View>
          <Switch
            value={notifSettings.matchEnd}
            onValueChange={() => toggle('matchEnd')}
            trackColor={{ false: '#334155', true: '#f59e0b' }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Équipes favorites uniquement</Text>
            <Text style={styles.settingDesc}>Ne recevoir que les alertes de vos équipes suivies</Text>
          </View>
          <Switch
            value={notifSettings.favoriteOnly}
            onValueChange={() => toggle('favoriteOnly')}
            trackColor={{ false: '#334155', true: '#f59e0b' }}
            thumbColor="#fff"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ℹ️ À propos</Text>
        <Text style={styles.aboutText}>WorldCup Live v1.0.0</Text>
        <Text style={styles.aboutText}>Données : football-data.org</Text>
        <Text style={styles.aboutText}>Rafraîchissement automatique toutes les 30s</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: { paddingBottom: 100 },
  title: { fontSize: 22, fontWeight: '900', color: '#f8fafc', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16 },
  section: {
    backgroundColor: '#1e293b',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: '#f8fafc', marginBottom: 4 },
  sectionDesc: { fontSize: 12, color: '#64748b', marginBottom: 12 },
  currentTz: { fontSize: 11, color: '#64748b', marginTop: 8 },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#0f172a',
  },
  settingInfo: { flex: 1, marginRight: 12 },
  settingLabel: { fontSize: 14, fontWeight: '600', color: '#e2e8f0' },
  settingDesc: { fontSize: 11, color: '#64748b', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#334155', marginVertical: 8 },
  aboutText: { fontSize: 13, color: '#64748b', marginTop: 4 },
});
