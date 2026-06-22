import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from './context/AppContext';
import AppNavigator from './navigation/AppNavigator';
import { registerForPushNotifications } from './utils/notifications';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 15000,
      retry: 2,
    },
  },
});

const darkTheme = {
  dark: true,
  colors: {
    primary: '#f59e0b',
    background: '#0f172a',
    card: '#0f172a',
    text: '#f8fafc',
    border: '#1e293b',
    notification: '#ef4444',
  },
};

export default function App() {
  useEffect(() => {
    registerForPushNotifications();
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <NavigationContainer theme={darkTheme}>
            <AppNavigator />
            <StatusBar style="light" />
          </NavigationContainer>
        </AppProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
