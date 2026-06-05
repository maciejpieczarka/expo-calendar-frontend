import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { useCalendarStore } from '@/lib/calendarStore';

export default function TabLayout() {
  const { fetchCalendars } = useCalendarStore();
  useEffect(() => {
    fetchCalendars();
  }, []);

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={18} name="calendar" color={color} />
          )
        }}
      />

      <Tabs.Screen
        name="calendarsList"
        options={{
          title: 'Calendars',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={18} name="list" color={color} />
          )
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={18} name="bell" color={color} />
          )
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={18} name="cog" color={color} />
          )
        }}
      />
    </Tabs>
  );
}
