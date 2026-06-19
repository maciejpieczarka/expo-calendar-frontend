import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Pressable, TextInput, Alert } from 'react-native';
import { Edit2, Trash2, X } from 'lucide-react-native';
import { Calendar } from '@/features/calendar/api/calendar';
import { useCalendarStore } from '@/features/calendar/store/calendarStore'; // Your store

export interface CalendarContextMenuProps {
  calendarId: number;
  calendarName: string;
  visible: boolean;
  onClose: () => void;
}

export function CalendarEditModal({
  calendarId,
  calendarName,
  visible,
  onClose
}: CalendarContextMenuProps) {
  const { updateCalendarName, deleteCalendar } = useCalendarStore();

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(calendarName);

  useEffect(() => {
    if (visible) {
      setNewName(calendarName);
      setIsEditing(false);
    }
  }, [visible, calendarName]);

  const handleDelete = () => {
    Alert.alert(
      'Delete Calendar',
      `Are you sure you want to delete "${calendarName}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteCalendar(calendarId);
            onClose();
          }
        }
      ]
    );
  };

  const handleSaveName = async () => {
    if (newName.trim() === calendarName) {
      setIsEditing(false);
      onClose();
      return;
    }

    await updateCalendarName(calendarId, newName);
    setIsEditing(false);
    onClose();
  };

  const handleCancel = () => {
    setIsEditing(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <Pressable
        className="flex-1 justify-center items-center bg-black/50 p-6"
        onPress={handleCancel}
      >
        <Pressable className="bg-white w-full rounded-3xl p-2 overflow-hidden">
          {!isEditing ? (
            <>
              <Pressable
                onPress={() => setIsEditing(true)}
                className="flex-row items-center p-4 border-b border-zinc-100 active:bg-zinc-50"
              >
                <Edit2 size={20} color="#18181b" className="mr-3" />
                <Text className="text-lg font-medium text-zinc-900">
                  Rename Calendar
                </Text>
              </Pressable>

              <Pressable
                onPress={handleDelete}
                className="flex-row items-center p-4 active:bg-red-50"
              >
                <Trash2 size={20} color="#ef4444" className="mr-3" />
                <Text className="text-lg font-medium text-red-500">
                  Delete Calendar
                </Text>
              </Pressable>
            </>
          ) : (
            <View className="p-4">
              <Text className="text-lg font-bold text-zinc-900 mb-4">
                Rename Calendar
              </Text>
              <TextInput
                value={newName}
                onChangeText={setNewName}
                autoFocus
                className="bg-zinc-100 rounded-xl p-4 text-base text-zinc-900 mb-4"
              />
              <View className="flex-row justify-end gap-2">
                <Pressable
                  onPress={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-lg"
                >
                  <Text className="text-zinc-500 font-medium">Cancel</Text>
                </Pressable>
                <Pressable
                  onPress={handleSaveName}
                  className="bg-zinc-900 px-4 py-2 rounded-lg"
                >
                  <Text className="text-white font-medium">Save</Text>
                </Pressable>
              </View>
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
