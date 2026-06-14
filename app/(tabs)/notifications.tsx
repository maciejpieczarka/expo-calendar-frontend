import { NotificationList } from '@/features/notifications/components/notificationList';
import { useNotificationScreen } from '@/features/notifications/hooks/useNotificationScreen';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

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
