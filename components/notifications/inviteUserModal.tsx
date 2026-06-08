import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { X, Search, UserPlus, Check, UserCheck } from 'lucide-react-native';
import { useInviteUserModal } from '@/hooks/notifications/useInviteUserModal';

interface InviteUserModalProps {
  visible: boolean;
  onClose: () => void;
  calendarId: number;
  existingMemberIds?: number[];
}

export function InviteUserModal({
  visible,
  onClose,
  calendarId,
  existingMemberIds = []
}: InviteUserModalProps) {
  const {
    searchQuery,
    setSearchQuery,
    isSearching,
    searchResults,
    localInvitedIds,
    historicalInvitedIds,
    memberIdsSet,
    handleInvite
  } = useInviteUserModal(calendarId, visible, existingMemberIds);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center items-center bg-black/60 px-5"
      >
        <View className="bg-white w-full rounded-3xl p-6 shadow-xl">
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-xl font-bold text-zinc-900">
              Invite to Calendar
            </Text>
            <Pressable
              onPress={onClose}
              className="p-2 bg-zinc-100 rounded-full"
            >
              <X size={20} color="#71717a" />
            </Pressable>
          </View>

          <View className="flex-row items-center bg-zinc-100 rounded-xl px-4 py-3 mb-4">
            <Search size={20} color="#a1a1aa" className="mr-3" />
            <TextInput
              className="flex-1 text-base text-zinc-900"
              placeholder="Search by username..."
              placeholderTextColor="#a1a1aa"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
              autoFocus={true}
            />
            {isSearching && <ActivityIndicator size="small" color="#a1a1aa" />}
          </View>

          <View className="min-h-[150px]">
            {searchQuery.length < 2 ? (
              <Text className="text-center text-zinc-500 mt-5">
                Type at least 2 characters to search.
              </Text>
            ) : searchResults.length === 0 && !isSearching ? (
              <Text className="text-center text-zinc-500 mt-5">
                No users found matching &#34;{searchQuery}&#34;.
              </Text>
            ) : (
              searchResults.map(user => {
                const isMember = memberIdsSet.has(user.id);
                const isInvited =
                  historicalInvitedIds.has(user.id) ||
                  localInvitedIds.has(user.id);

                return (
                  <View
                    key={user.id}
                    className="flex-row justify-between items-center py-3 border-b border-zinc-100 last:border-0"
                  >
                    <View>
                      <Text className="text-base font-semibold text-zinc-900">
                        {user.username}
                      </Text>
                      {user.email && (
                        <Text className="text-sm text-zinc-500">
                          {user.email}
                        </Text>
                      )}
                    </View>

                    {isMember ? (
                      <View className="flex-row items-center px-4 py-2 rounded-full bg-zinc-100">
                        <UserCheck
                          size={16}
                          color="#a1a1aa"
                          className="mr-1.5"
                        />
                        <Text className="text-zinc-500 font-medium">
                          Joined
                        </Text>
                      </View>
                    ) : isInvited ? (
                      <View className="flex-row items-center px-4 py-2 rounded-full bg-green-100">
                        <Check size={16} color="#22c55e" className="mr-1.5" />
                        <Text className="text-green-600 font-medium">Sent</Text>
                      </View>
                    ) : (
                      <Pressable
                        onPress={() => handleInvite(user.id)}
                        className="flex-row items-center px-4 py-2 rounded-full bg-zinc-900 active:bg-zinc-700"
                      >
                        <UserPlus
                          size={16}
                          className="mr-1.5"
                          color="#ffffff"
                        />
                        <Text className="text-white font-medium">Invite</Text>
                      </Pressable>
                    )}
                  </View>
                );
              })
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
