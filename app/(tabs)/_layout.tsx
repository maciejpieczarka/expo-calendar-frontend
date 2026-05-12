import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
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
