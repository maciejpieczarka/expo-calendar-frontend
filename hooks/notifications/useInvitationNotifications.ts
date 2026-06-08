import { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import { useInvitationStore } from '@/lib/invitationStore';
import { useAuthStore } from '@/lib/authStore';
import SockJS from 'sockjs-client';

export function useInvitationNotifications() {
  const token = useAuthStore(state => state.token);
  const addLiveInvitation = useInvitationStore(
    state => state.addLiveInvitation
  );
  const stompClient = useRef<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () =>
        new SockJS(`${process.env.EXPO_PUBLIC_API_URL}/ws`),
      connectHeaders: {
        Authorization: `Bearer ${token}`
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    client.onConnect = () => {
      client.subscribe('/user/queue/invitations', message => {
        if (message.body) {
          try {
            const payload = JSON.parse(message.body);
            addLiveInvitation(payload);
          } catch (error: any) {
            console.error('Error during parsing live invitation', error);
          }
        }
      });
    };

    client.onStompError = frame => {
      console.error('Broker error: ' + frame.headers['message']);
      console.error(frame.body);
    };

    client.onWebSocketError = frame => {
      console.error('Websocket error: ' + frame.headers['message']);
      console.error(frame.body);
    };

    client.activate();
    stompClient.current = client;

    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
  }, [token]);
}
