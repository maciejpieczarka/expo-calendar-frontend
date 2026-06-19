import { useEventStore } from '@/features/events/store/eventStore';
import { CalendarEvent, UpdateEventData } from '@/features/events/EventModel';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

interface UseEditEventProps {
  event: CalendarEvent;
  onClose: () => void;
}

export type ActivePickerType =
  | 'START_DATE'
  | 'START_TIME'
  | 'END_DATE'
  | 'END_TIME'
  | null;

export const useEditEvent = ({ event, onClose }: UseEditEventProps) => {
  const updateEventDetails = useEventStore(state => state.updateEventDetails);
  const deleteEvent = useEventStore(state => state.deleteEvent);
  const isStoreLoading = useEventStore(state => state.isLoading);

  // Podstawowe stany pól formularza edycji
  const [name, setName] = useState(event.name);
  const [description, setDescription] = useState(event.description || '');
  const [color, setColor] = useState(event.color);
  const [startDate, setStartDate] = useState<Date>(new Date(event.startDate));
  const [endDate, setEndDate] = useState<Date>(new Date(event.endDate));

  // Reset/Aktualizacja stanów gdy zmieni się wydarzenie (np. otworzymy inne)
  useEffect(() => {
    setName(event.name);
    setDescription(event.description || '');
    setColor(event.color);
    setStartDate(new Date(event.startDate));
    setEndDate(new Date(event.endDate));
  }, [event]);

  // Stan dla pickerów czasu/daty
  const [activePicker, setActivePicker] = useState<ActivePickerType>(null);

  const togglePicker = (picker: ActivePickerType) => {
    setActivePicker(current => (current === picker ? null : picker));
  };

  const handleUpdate = async () => {
    if (!name.trim()) return;

    const payload: UpdateEventData = {
      name: name.trim(),
      description: description.trim(),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      color
    };

    try {
      await updateEventDetails(event.id, payload);
      onClose();
    } catch (err) {
      console.error('Błąd aktualizacji wydarzenia:', err);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Usuń wydarzenie',
      'Czy na pewno chcesz usunąć to wydarzenie?',
      [
        { text: 'Anuluj', style: 'cancel' },
        {
          text: 'Usuń',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteEvent(event.id);
              onClose();
            } catch (err) {
              console.error('Błąd usuwania wydarzenia:', err);
            }
          }
        }
      ]
    );
  };

  return {
    state: {
      name,
      description,
      color,
      startDate,
      endDate,
      activePicker,
      isSubmitting: isStoreLoading,
      isValid: name.trim().length > 0
    },
    actions: {
      setName,
      setDescription,
      setColor,
      setStartDate,
      setEndDate,
      togglePicker,
      handleUpdate,
      handleDelete
    }
  };
};
