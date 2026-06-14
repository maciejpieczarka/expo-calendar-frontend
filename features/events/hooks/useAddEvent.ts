import { useCalendarStore } from '@/features/calendar/store/calendarStore';
import { useEventStore } from '@/features/events/store/eventStore';
import { CreateEventData } from '@/features/events/EventModel';
import { useState } from 'react';

interface UseAddEventProps {
  selectedDate: string;
  onClose: () => void;
}

export type ActivePickerType =
  | 'START_DATE'
  | 'START_TIME'
  | 'END_DATE'
  | 'END_TIME'
  | null;

export const useAddEvent = ({ selectedDate, onClose }: UseAddEventProps) => {
  const createNewEvent = useEventStore(state => state.createNewEvent);
  const isStoreLoading = useEventStore(state => state.isLoading);
  const calendars = useCalendarStore(state => state.calendars);

  // Podstawowe stany pól formularza
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#38bdf8'); // Domyślny jasnoniebieski
  const [calendarIds, setCalendarIds] = useState<number[]>([]);

  //   Pełne obiekty Date zainicjalizowane klikniętym dniem z kalendarza
  const [startDate, setStartDate] = useState<Date>(() => {
    const d = new Date(selectedDate);
    d.setHours(12, 0, 0, 0);
    return d;
  });

  const [endDate, setEndDate] = useState<Date>(() => {
    const d = new Date(selectedDate);
    d.setHours(13, 0, 0, 0);
    return d;
  });

  // Stan zarządzający widocznością tylko jednego spinnera naraz
  const [activePicker, setActivePicker] = useState<ActivePickerType>(null);

  // Funkcja otwierająca dany picker lub zamykająca go, jeśli kliknięto w niego ponownie
  const togglePicker = (picker: ActivePickerType) => {
    setActivePicker(current => (current === picker ? null : picker));
  };
  const toggleCalendar = (id: number) => {
    setCalendarIds(
      currentIds =>
        currentIds.includes(id)
          ? currentIds.filter(calendarId => calendarId !== id) // Jeśli już jest, usuń
          : [...currentIds, id] // Jeśli go nie ma, dodaj
    );
  };

  const handleSave = async () => {
    if (!name.trim() || !calendarIds) return;

    const payload: CreateEventData = {
      id: 0,
      name: name.trim(),
      description: description.trim() || undefined,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      calendarIds: calendarIds, // Przekazanie wybranego ID w tablicy
      participantIds: [],
      color
    };
    try {
      await createNewEvent(payload);
      setName('');
      setDescription('');
      setCalendarIds([]);
      setActivePicker(null);
      onClose();
    } catch {
      // Obsługa błędów wbudowana w architekturę sieciową
    }
  };

  return {
    state: {
      name,
      description,
      color,
      calendarIds,
      calendars,
      startDate,
      endDate,
      activePicker,
      isSubmitting: isStoreLoading,
      isValid: name.trim().length > 0 && calendarIds.length > 0
    },
    actions: {
      setName,
      setDescription,
      setColor,
      toggleCalendar,
      setStartDate,
      setEndDate,
      togglePicker,
      handleSave
    }
  };
};
