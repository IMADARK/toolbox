import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDeviceTimezone } from '../utils/timezone';
import { getFavoriteTeams, toggleFavoriteTeam, getNotifSettings, saveNotifSettings } from '../utils/notifications';

const AppContext = createContext();

const TIMEZONE_KEY = '@worldcup_timezone';

export function AppProvider({ children }) {
  const [timezone, setTimezone] = useState(getDeviceTimezone());
  const [favorites, setFavorites] = useState([]);
  const [notifSettings, setNotifSettings] = useState({
    matchStart: true,
    goals: true,
    matchEnd: true,
    favoriteOnly: false,
    minutesBefore: 15,
  });

  useEffect(() => {
    (async () => {
      const savedTz = await AsyncStorage.getItem(TIMEZONE_KEY);
      if (savedTz) setTimezone(savedTz);
      setFavorites(await getFavoriteTeams());
      setNotifSettings(await getNotifSettings());
    })();
  }, []);

  const changeTimezone = async (tz) => {
    setTimezone(tz);
    await AsyncStorage.setItem(TIMEZONE_KEY, tz);
  };

  const toggleFav = async (teamName) => {
    const updated = await toggleFavoriteTeam(teamName);
    setFavorites(updated);
  };

  const updateNotifSettings = async (newSettings) => {
    setNotifSettings(newSettings);
    await saveNotifSettings(newSettings);
  };

  return (
    <AppContext.Provider value={{
      timezone, changeTimezone,
      favorites, toggleFav,
      notifSettings, updateNotifSettings,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
