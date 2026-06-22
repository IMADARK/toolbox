import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';

import MatchesScreen from '../screens/MatchesScreen';
import StandingsScreen from '../screens/StandingsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MatchDetailScreen from '../screens/MatchDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabIcon({ label, focused }) {
  const icons = { Matchs: '⚽', Classement: '🏆', Favoris: '⭐', Réglages: '⚙️' };
  return (
    <View style={styles.tabIcon}>
      <Text style={{ fontSize: 20 }}>{icons[label]}</Text>
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>{label}</Text>
    </View>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => <TabIcon label={route.name} focused={focused} />,
      })}
    >
      <Tab.Screen name="Matchs" component={MatchesScreen} />
      <Tab.Screen name="Classement" component={StandingsScreen} />
      <Tab.Screen name="Favoris" component={FavoritesScreen} />
      <Tab.Screen name="Réglages" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0f172a' },
        headerTintColor: '#f8fafc',
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: '#0f172a' },
      }}
    >
      <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
      <Stack.Screen
        name="MatchDetail"
        component={MatchDetailScreen}
        options={{ title: 'Détail du match', headerBackTitle: 'Retour' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#0f172a',
    borderTopColor: '#1e293b',
    borderTopWidth: 1,
    height: 80,
    paddingBottom: 16,
    paddingTop: 8,
    position: 'absolute',
    elevation: 0,
  },
  tabIcon: {
    alignItems: 'center',
    gap: 2,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748b',
  },
  tabLabelActive: {
    color: '#f59e0b',
  },
});
