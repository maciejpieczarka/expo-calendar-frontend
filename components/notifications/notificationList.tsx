import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { CalendarInvitation } from '@/types/IInvitation';
import { EmptyInbox } from '@/components/notifications/emptyInbox';
import { InvitationItem } from '@/components/notifications/invitationItem';

interface NotificationListProps {
  invitations: CalendarInvitation[];
  onAccept: (invitationId: number) => void;
  onDecline: (invitationId: number) => void;
}

export function NotificationList({
  invitations,
  onAccept,
  onDecline
}: NotificationListProps) {
  return (
    <FlatList
      data={invitations}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <InvitationItem item={item} onAccept={onAccept} onDecline={onDecline} />
      )}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<EmptyInbox />}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
    flexGrow: 1
  }
});
