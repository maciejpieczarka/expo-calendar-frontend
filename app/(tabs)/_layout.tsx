import { useCalendarStore } from '@/features/calendar/store/calendarStore';
import { useInvitationNotifications } from '@/features/notifications/hooks/useInvitationNotifications';
import { useInvitationStore } from '@/features/notifications/store/invitationStore';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useEffect } from 'react';

export default function TabLayout() {
  const { fetchCalendars } = useCalendarStore();
  const pendingCount = useInvitationStore(state => state.pendingCount);
  const fetchReceived = useInvitationStore(state => state.fetchReceived);
  const fetchSent = useInvitationStore(state => state.fetchSent);
  useInvitationNotifications();

  useEffect(() => {
    fetchCalendars();
    fetchReceived();
    fetchSent();
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
          tabBarBadge: pendingCount > 0 ? pendingCount : undefined,
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
