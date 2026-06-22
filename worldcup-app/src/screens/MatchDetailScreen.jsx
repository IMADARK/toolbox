import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { formatMatchDateTime } from '../utils/timezone';

export default function MatchDetailScreen({ route }) {
  const { match } = route.params;
  const { timezone, favorites, toggleFav } = useApp();
  const { homeTeam, awayTeam, score, status, minute, goals = [], referees = [] } = match;
  const isLive = status === 'IN_PLAY' || status === 'LIVE';
  const isFinished = status === 'FINISHED';
  const hasScore = isLive || isFinished;

  const isFavHome = favorites.includes(homeTeam.name);
  const isFavAway = favorites.includes(awayTeam.name);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.matchHeader}>
        {isLive && (
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>EN DIRECT — {minute}'</Text>
          </View>
        )}
        {isFinished && <Text style={styles.finishedBadge}>MATCH TERMINÉ</Text>}
        {!hasScore && (
          <Text style={styles.scheduledTime}>
            {formatMatchDateTime(match.utcDate, timezone)}
          </Text>
        )}

        <View style={styles.teamsRow}>
          <View style={styles.teamBlock}>
            <TouchableOpacity onPress={() => toggleFav(homeTeam.name)}>
              <Text style={styles.favStar}>{isFavHome ? '★' : '☆'}</Text>
            </TouchableOpacity>
            <Image source={{ uri: homeTeam.crest }} style={styles.bigCrest} />
            <Text style={styles.bigTeamName}>{homeTeam.name}</Text>
          </View>

          <View style={styles.centerScore}>
            {hasScore ? (
              <>
                <Text style={[styles.bigScore, isLive && styles.bigScoreLive]}>
                  {score.fullTime.home ?? 0}
                </Text>
                <Text style={styles.bigScoreSep}>-</Text>
                <Text style={[styles.bigScore, isLive && styles.bigScoreLive]}>
                  {score.fullTime.away ?? 0}
                </Text>
              </>
            ) : (
              <Text style={styles.bigVs}>VS</Text>
            )}
          </View>

          <View style={styles.teamBlock}>
            <TouchableOpacity onPress={() => toggleFav(awayTeam.name)}>
              <Text style={styles.favStar}>{isFavAway ? '★' : '☆'}</Text>
            </TouchableOpacity>
            <Image source={{ uri: awayTeam.crest }} style={styles.bigCrest} />
            <Text style={styles.bigTeamName}>{awayTeam.name}</Text>
          </View>
        </View>

        {score.halfTime && score.halfTime.home !== null && (
          <Text style={styles.halfTime}>
            Mi-temps : {score.halfTime.home} - {score.halfTime.away}
          </Text>
        )}
      </View>

      {goals.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚽ Buts</Text>
          {goals.map((goal, i) => (
            <View key={i} style={styles.goalRow}>
              <Text style={styles.goalMinute}>{goal.minute}'</Text>
              <View style={styles.goalInfo}>
                <Text style={styles.goalScorer}>{goal.scorer}</Text>
                {goal.assist && (
                  <Text style={styles.goalAssist}>Passe de {goal.assist}</Text>
                )}
              </View>
              <Text style={styles.goalTeam}>{goal.team}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Infos</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phase</Text>
          <Text style={styles.infoValue}>{(match.group || match.stage || '').replace('_', ' ')}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Date & heure</Text>
          <Text style={styles.infoValue}>{formatMatchDateTime(match.utcDate, timezone)}</Text>
        </View>
        {referees.length > 0 && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Arbitre</Text>
            <Text style={styles.infoValue}>{referees[0].name} ({referees[0].nationality})</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: { paddingBottom: 40 },
  matchHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#1e293b',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    marginBottom: 16,
  },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' },
  liveText: { fontSize: 12, fontWeight: '800', color: '#fff', letterSpacing: 1 },
  finishedBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
    marginBottom: 16,
    letterSpacing: 1,
  },
  scheduledTime: {
    fontSize: 14,
    color: '#60a5fa',
    fontWeight: '600',
    marginBottom: 16,
    textTransform: 'capitalize',
  },
  teamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  teamBlock: { flex: 1, alignItems: 'center', gap: 8 },
  favStar: { fontSize: 22, color: '#f59e0b' },
  bigCrest: { width: 64, height: 64, resizeMode: 'contain' },
  bigTeamName: { fontSize: 14, fontWeight: '700', color: '#f8fafc', textAlign: 'center' },
  centerScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
  },
  bigScore: { fontSize: 36, fontWeight: '900', color: '#cbd5e1' },
  bigScoreLive: { color: '#ffffff' },
  bigScoreSep: { fontSize: 24, color: '#475569' },
  bigVs: { fontSize: 18, fontWeight: '800', color: '#475569' },
  halfTime: { fontSize: 12, color: '#64748b', marginTop: 12 },
  section: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#f8fafc',
    marginBottom: 12,
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#0f172a',
    gap: 12,
  },
  goalMinute: {
    fontSize: 13,
    fontWeight: '800',
    color: '#f59e0b',
    width: 36,
  },
  goalInfo: { flex: 1 },
  goalScorer: { fontSize: 13, fontWeight: '700', color: '#e2e8f0' },
  goalAssist: { fontSize: 11, color: '#64748b', marginTop: 1 },
  goalTeam: { fontSize: 11, color: '#94a3b8', fontWeight: '600' },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#0f172a',
  },
  infoLabel: { fontSize: 13, color: '#64748b' },
  infoValue: { fontSize: 13, color: '#e2e8f0', fontWeight: '600', textTransform: 'capitalize' },
});
