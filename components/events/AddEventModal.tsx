import { useAddEvent } from '@/hooks/events/useAddEvent';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Check, Plus, X } from 'lucide-react-native';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { Input } from '../ui/input';
import { Text } from '../ui/text';
import { Toggle, ToggleIcon } from '../ui/toggle';

interface AddEventModalProps {
  isOpen: boolean;
  selectedDate: string;
  onClose: () => void;
}

const PRESET_COLORS = ['#38bdf8', '#f43f5e', '#10b981', '#eab308', '#a855f7'];

const AddEventModal = ({
  isOpen,
  onClose,
  selectedDate
}: AddEventModalProps) => {
  const { state, actions } = useAddEvent({ selectedDate, onClose });
  const formatDateDisplay = (date: Date) => {
    return date.toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTimeDisplay = (date: Date) => {
    const hrs = String(date.getHours()).padStart(2, '0');
    const mins = String(date.getMinutes()).padStart(2, '0');
    return `${hrs}:${mins}`;
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        className="flex-1 bg-black/90 justify-end"
      >
        <TouchableOpacity
          activeOpacity={1}
          className="bg-slate-50 border-t border-slate-800 rounded-t-3xl h-[90%] p-6 pb-10"
        >
          <KeyboardAwareScrollView
            bottomOffset={62}
            showsVerticalScrollIndicator={false}
          >
            {/* Nagłówek Modala */}
            <View className="flex-row justify-between items-center mb-6">
              <View>
                <Text
                  variant="large"
                  className="font-bold uppercase tracking-wider"
                >
                  Nowe Wydarzenie
                </Text>
              </View>
              <Button onPress={onClose} variant="default">
                <Icon as={X} />
              </Button>
            </View>

            {/* Formularz */}
            <View className="gap-5 mb-8">
              {/* Pole: Tytuł */}
              <View>
                <Text className="text-slate-500 text-xs font-bold mb-2 uppercase tracking-wide">
                  Nazwa wydarzenia
                </Text>
                <Input
                  keyboardType="default"
                  placeholder="np. Wspólna nauka, Synchronizacja"
                  placeholderTextColor="#64748b"
                  value={state.name}
                  onChangeText={actions.setName}
                  editable={!state.isSubmitting}
                />
              </View>

              {/* Pola: Godziny */}
              <View className="flex gap-4">
                <View className="flex-row items-center justify-between ">
                  <Text className="text-slate-500 text-xs font-bold uppercase">
                    Od:
                  </Text>
                  <View className="flex-row flex">
                    <Button
                      variant="ghost"
                      onPress={() => actions.togglePicker('START_DATE')}
                    >
                      <Text>📅 {formatDateDisplay(state.startDate)}</Text>
                    </Button>
                    <Button
                      variant="ghost"
                      onPress={() => actions.togglePicker('START_TIME')}
                    >
                      <Text>⏰ {formatTimeDisplay(state.startDate)}</Text>
                    </Button>
                  </View>
                </View>
                {state.activePicker === 'START_DATE' && (
                  <RNDateTimePicker
                    value={state.startDate}
                    mode="date"
                    display="spinner"
                    onChange={(_e, d) => d && actions.setStartDate(d)}
                  />
                )}
                {state.activePicker === 'START_TIME' && (
                  <RNDateTimePicker
                    value={state.startDate}
                    mode="time"
                    display="spinner"
                    onChange={(_e, d) => d && actions.setStartDate(d)}
                  />
                )}
                <View className="flex-row items-center justify-between ">
                  <Text className="text-slate-500 text-xs font-bold uppercase">
                    Do:
                  </Text>

                  <View className="flex-row flex">
                    <Button
                      variant="ghost"
                      onPress={() => actions.togglePicker('END_DATE')}
                    >
                      <Text>📅 {formatDateDisplay(state.endDate)}</Text>
                    </Button>
                    <Button
                      variant="ghost"
                      onPress={() => actions.togglePicker('END_TIME')}
                    >
                      <Text>⏰ {formatTimeDisplay(state.endDate)}</Text>
                    </Button>
                  </View>
                </View>
                {state.activePicker === 'END_DATE' && (
                  <RNDateTimePicker
                    value={state.endDate}
                    mode="date"
                    display="spinner"
                    onChange={(_e, d) => d && actions.setEndDate(d)}
                  />
                )}
                {state.activePicker === 'END_TIME' && (
                  <RNDateTimePicker
                    value={state.endDate}
                    mode="time"
                    display="spinner"
                    onChange={(_e, d) => d && actions.setEndDate(d)}
                  />
                )}
              </View>

              {/* ZMIANA: Wielokrotny wybór kalendarzy (Tagi) */}
              <View>
                <Text className=" text-xs font-bold mb-1 uppercase tracking-wide">
                  Dodaj do kalendarzy
                </Text>
                <Text className="text-slate-500 text-[11px] mb-2">
                  Możesz zaznaczyć więcej niż jeden
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {state.calendars.map(cal => {
                    // Sprawdzamy czy ID tego konkretnego kalendarza znajduje się w tablicy stanu
                    const isSelected = state.calendarIds.includes(cal.id);
                    return (
                      <Toggle
                        key={cal.id}
                        pressed={isSelected}
                        onPressedChange={() => actions.toggleCalendar(cal.id)}
                        disabled={state.isSubmitting}
                        className={` mx-2 ${isSelected ? 'bg-sky-300' : 'bg-slate-400'}`}
                      >
                        {isSelected ? (
                          <ToggleIcon as={Check} />
                        ) : (
                          <ToggleIcon as={Plus} />
                        )}
                        <Text
                        // className={isSelected ? 'text-sky-400 font-bold' : ''}
                        >
                          {cal.name}
                        </Text>
                      </Toggle>
                    );
                  })}
                </ScrollView>
              </View>

              {/* Pole: Paleta Kolorów */}
              <View>
                <Text className=" text-xs font-bold mb-2 uppercase tracking-wide">
                  Kolor znacznika
                </Text>
                <View className="flex-row gap-3">
                  {PRESET_COLORS.map(hex => {
                    const isSelected = state.color === hex;
                    return (
                      <Button
                        key={hex}
                        onPress={() => actions.setColor(hex)}
                        disabled={state.isSubmitting}
                        style={{ backgroundColor: hex }}
                        className={`w-10 h-10 rounded-full items-center justify-center border-2 ${
                          isSelected
                            ? 'border-slate-100 scale-110'
                            : 'border-transparent'
                        }`}
                      >
                        {isSelected && (
                          <View className="w-2 h-2 bg-slate-900 rounded-full" />
                        )}
                      </Button>
                    );
                  })}
                </View>
              </View>

              {/* Pole: Opis */}
              <View>
                <Text className=" text-xs font-bold mb-2 uppercase tracking-wide">
                  Opis (opcjonalnie)
                </Text>
                <Input
                  placeholder="Dodaj notatki lub szczegóły spotkania..."
                  placeholderTextColor="#64748b"
                  value={state.description}
                  onChangeText={actions.setDescription}
                  editable={!state.isSubmitting}
                  multiline
                  numberOfLines={3}
                  className=" px-4 py-3.5 rounded-xl border border-slate-800 font-medium text-base h-24 textAlignVertical-top focus:border-sky-500"
                />
              </View>
            </View>

            {/* Przycisk Zapisz (Odblokowany tylko, gdy podano tytuł i wybrano min. 1 kalendarz) */}
            <Button
              onPress={actions.handleSave}
              disabled={!state.isValid || state.isSubmitting}
              className={`w-full rounded-xl flex-row justify-center items-center ${
                state.isValid
                  ? 'bg-sky-500 active:bg-sky-600'
                  : 'bg-slate-800 opacity-60'
              }`}
            >
              {state.isSubmitting ? (
                <ActivityIndicator color="#0f172a" size="small" />
              ) : (
                <Text className="text-slate-950 font-bold text-base text-center">
                  Zapisz wydarzenie
                </Text>
              )}
            </Button>
          </KeyboardAwareScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default AddEventModal;
