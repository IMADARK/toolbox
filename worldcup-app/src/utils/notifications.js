import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUBSCRIBED_TEAMS_KEY = '@worldcup_fav_teams';
const NOTIF_SETTINGS_KEY = '@worldcup_notif_settings';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function registerForPushNotifications() {
  if (!Device.isDevice) {
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return null;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('match-start', {
      name: 'Début de match',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#f59e0b',
      sound: 'default',
    });

    await Notifications.setNotificationChannelAsync('goals', {
      name: 'Buts',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 500, 200, 500],
      lightColor: '#22c55e',
      sound: 'default',
    });

    await Notifications.setNotificationChannelAsync('match-end', {
      name: 'Fin de match',
      importance: Notifications.AndroidImportance.DEFAULT,
      sound: 'default',
    });
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

export async function scheduleMatchNotification(match, minutesBefore = 15) {
  const matchDate = new Date(match.utcDate);
  const triggerDate = new Date(matchDate.getTime() - minutesBefore * 60000);

  if (triggerDate <= new Date()) return null;

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: '⚽ Match dans ' + minutesBefore + ' min !',
      body: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
      data: { matchId: match.id, type: 'match-start' },
      sound: 'default',
      categoryIdentifier: 'match-start',
    },
    trigger: { date: triggerDate, channelId: 'match-start' },
  });

  return id;
}

export async function sendGoalNotification(match, team, scorer, newScore) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '⚽ BUUUUT ! ' + team,
      body: `${match.homeTeam.name} ${newScore.home} - ${newScore.away} ${match.awayTeam.name}`,
      data: { matchId: match.id, type: 'goal', team },
      sound: 'default',
      categoryIdentifier: 'goals',
    },
    trigger: null,
  });
}

export async function sendMatchEndNotification(match, finalScore) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🏁 Match terminé',
      body: `${match.homeTeam.name} ${finalScore.home} - ${finalScore.away} ${match.awayTeam.name}`,
      data: { matchId: match.id, type: 'match-end' },
      sound: 'default',
      categoryIdentifier: 'match-end',
    },
    trigger: null,
  });
}

export async function getFavoriteTeams() {
  const data = await AsyncStorage.getItem(SUBSCRIBED_TEAMS_KEY);
  return data ? JSON.parse(data) : [];
}

export async function toggleFavoriteTeam(teamName) {
  const teams = await getFavoriteTeams();
  const idx = teams.indexOf(teamName);
  if (idx >= 0) {
    teams.splice(idx, 1);
  } else {
    teams.push(teamName);
  }
  await AsyncStorage.setItem(SUBSCRIBED_TEAMS_KEY, JSON.stringify(teams));
  return teams;
}

export async function getNotifSettings() {
  const data = await AsyncStorage.getItem(NOTIF_SETTINGS_KEY);
  return data ? JSON.parse(data) : {
    matchStart: true,
    goals: true,
    matchEnd: true,
    favoriteOnly: false,
    minutesBefore: 15,
  };
}

export async function saveNotifSettings(settings) {
  await AsyncStorage.setItem(NOTIF_SETTINGS_KEY, JSON.stringify(settings));
}
