import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NotificationList } from '@/components/notifications/notificationList';
import { useNotificationScreen } from '@/hooks/useNotificationScreen';

const NotificationsScreen = () => {
  const { receivedInvitations, handleAccept, handleDecline } =
    useNotificationScreen();
  return (
    <SafeAreaView className="flex-1">
      <NotificationList
        invitations={receivedInvitations}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
    </SafeAreaView>
  );
};

export default NotificationsScreen;
