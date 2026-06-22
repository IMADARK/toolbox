import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { formatMatchTime } from '../utils/timezone';

const STATUS_COLORS = {
  LIVE: { bg: '#ef4444', text: '#fff' },
  IN_PLAY: { bg: '#ef4444', text: '#fff' },
  FINISHED: { bg: '#334155', text: '#94a3b8' },
  TIMED: { bg: '#1e3a5f', text: '#60a5fa' },
  SCHEDULED: { bg: '#1e3a5f', text: '#60a5fa' },
};

export default function MatchCard({ match, onPress }) {
  const { timezone } = useApp();
  const { homeTeam, awayTeam, score, status, minute } = match;
  const colors = STATUS_COLORS[status] || STATUS_COLORS.TIMED;
  const isLive = status === 'IN_PLAY' || status === 'LIVE';
  const isFinished = status === 'FINISHED';
  const hasScore = isLive || isFinished;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.stage}>{(match.group || match.stage || '').replace('_', ' ')}</Text>
        <View style={[styles.badge, { backgroundColor: colors.bg }]}>
          {isLive && <View style={styles.liveDot} />}
          <Text style={[styles.badgeText, { color: colors.text }]}>
            {isLive ? `${minute}'` : isFinished ? 'Terminé' : formatMatchTime(match.utcDate, timezone)}
          </Text>
        </View>
      </View>

      <View style={styles.teams}>
        <View style={styles.team}>
          <Image source={{ uri: homeTeam.crest }} style={styles.crest} />
          <Text style={styles.teamName} numberOfLines={1}>{homeTeam.tla || homeTeam.name}</Text>
        </View>

        <View style={styles.scoreBox}>
          {hasScore ? (
            <View style={styles.scoreContainer}>
              <Text style={[styles.score, isLive && styles.scoreLive]}>
                {score.fullTime.home ?? 0}
              </Text>
              <Text style={styles.scoreSep}>-</Text>
              <Text style={[styles.score, isLive && styles.scoreLive]}>
                {score.fullTime.away ?? 0}
              </Text>
            </View>
          ) : (
            <Text style={styles.vs}>VS</Text>
          )}
        </View>

        <View style={styles.team}>
          <Image source={{ uri: awayTeam.crest }} style={styles.crest} />
          <Text style={styles.teamName} numberOfLines={1}>{awayTeam.tla || awayTeam.name}</Text>
        </View>
      </View>

      {isLive && match.goals && match.goals.length > 0 && (
        <View style={styles.goalsList}>
          {match.goals.slice(-2).map((g, i) => (
            <Text key={i} style={styles.goalText}>
              ⚽ {g.minute}' {g.scorer}
            </Text>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stage: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  teams: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  team: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  crest: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  teamName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#e2e8f0',
    textAlign: 'center',
  },
  scoreBox: {
    flex: 1,
    alignItems: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 6,
  },
  score: {
    fontSize: 22,
    fontWeight: '900',
    color: '#cbd5e1',
  },
  scoreLive: {
    color: '#ffffff',
  },
  scoreSep: {
    fontSize: 16,
    color: '#475569',
  },
  vs: {
    fontSize: 12,
    fontWeight: '800',
    color: '#475569',
    letterSpacing: 2,
  },
  goalsList: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    gap: 2,
  },
  goalText: {
    fontSize: 11,
    color: '#94a3b8',
  },
});
