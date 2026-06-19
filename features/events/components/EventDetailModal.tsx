import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { CalendarEvent } from '@/features/events/EventModel';
import { useEditEvent } from '@/features/events/hooks/useEditEvent';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {
  AlignLeft,
  Calendar,
  Clock,
  Edit2,
  Trash2,
  User,
  Users,
  X
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

interface EventDetailModalProps {
  isOpen: boolean;
  event: CalendarEvent;
  onClose: () => void;
}

const PRESET_COLORS = ['#38bdf8', '#f43f5e', '#10b981', '#eab308', '#a855f7'];

export default function EventDetailModal({
  isOpen,
  event,
  onClose
}: EventDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { state, actions } = useEditEvent({ event, onClose });

  const formatDateDisplay = (date: Date) => {
    return date.toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTimeDisplay = (date: Date) => {
    const hrs = String(date.getHours()).padStart(2, '0');
    const mins = String(date.getMinutes()).padStart(2, '0');
    return `${hrs}:${mins}`;
  };

  const handleClose = () => {
    setIsEditing(false);
    onClose();
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleClose}
        className="flex-1 bg-black/90 justify-end"
      >
        <TouchableOpacity
          activeOpacity={1}
          className="bg-slate-50 border-t border-slate-800 rounded-t-3xl h-[90%] p-6 pb-10"
        >
          {isEditing ? (
            /* TRYB EDYCJI */
            <KeyboardAwareScrollView
              bottomOffset={62}
              showsVerticalScrollIndicator={false}
            >
              {/* Nagłówek Edycji */}
              <View className="flex-row justify-between items-center mb-6">
                <Text
                  variant="large"
                  className="font-bold uppercase tracking-wider text-zinc-900"
                >
                  Edytuj Wydarzenie
                </Text>
                <Button onPress={() => setIsEditing(false)} variant="default">
                  <Icon as={X} />
                </Button>
              </View>

              {/* Formularz */}
              <View className="gap-5 mb-8">
                {/* Nazwa wydarzenia */}
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

                {/* Pola Godzinowe */}
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

                {/* Kolor Znacznika */}
                <View>
                  <Text className="text-slate-500 text-xs font-bold mb-2 uppercase tracking-wide">
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
                              ? 'border-slate-400 scale-110'
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

                {/* Opis */}
                <View>
                  <Text className="text-slate-500 text-xs font-bold mb-2 uppercase tracking-wide">
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
                    className="px-4 py-3.5 rounded-xl border border-slate-800 font-medium text-base h-24 textAlignVertical-top focus:border-sky-500"
                  />
                </View>
              </View>

              {/* Przyciski Akcji na Dole */}
              <View className="flex-row gap-4">
                <Button
                  onPress={() => setIsEditing(false)}
                  variant="outline"
                  className="flex-1 rounded-xl"
                  disabled={state.isSubmitting}
                >
                  <Text className="font-bold">Anuluj</Text>
                </Button>
                <Button
                  onPress={actions.handleUpdate}
                  disabled={!state.isValid || state.isSubmitting}
                  className={`flex-1 rounded-xl flex-row justify-center items-center ${
                    state.isValid
                      ? 'bg-sky-500 active:bg-sky-600'
                      : 'bg-slate-800 opacity-60'
                  }`}
                >
                  {state.isSubmitting ? (
                    <ActivityIndicator color="#0f172a" size="small" />
                  ) : (
                    <Text className="text-slate-950 font-bold">Zapisz</Text>
                  )}
                </Button>
              </View>
            </KeyboardAwareScrollView>
          ) : (
            /* TRYB PODGLĄDU */
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              {/* Nagłówek Szczegółów */}
              <View className="flex-row justify-between items-center mb-6">
                <Text
                  variant="large"
                  className="font-bold uppercase tracking-wider text-zinc-900"
                >
                  Szczegóły Wydarzenia
                </Text>
                <Button onPress={handleClose} variant="default">
                  <Icon as={X} />
                </Button>
              </View>

              {/* Karta z Głównymi Informacjami */}
              <View className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm mb-6">
                <View className="flex-row items-center gap-3.5 mb-4">
                  <View
                    style={{ backgroundColor: event.color }}
                    className="w-5 h-5 rounded-full shadow-sm"
                  />
                  <Text className="text-xl font-bold text-slate-900 flex-1">
                    {event.name}
                  </Text>
                </View>

                {/* Czas wydarzenia */}
                <View className="flex gap-3 pt-3 border-t border-slate-100">
                  <View className="flex-row items-center gap-3">
                    <Icon as={Calendar} className="text-slate-400" size={18} />
                    <View>
                      <Text className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                        Termin
                      </Text>
                      <Text className="text-slate-900 font-medium text-sm">
                        {formatDateDisplay(new Date(event.startDate))}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center gap-3">
                    <Icon as={Clock} className="text-slate-400" size={18} />
                    <View>
                      <Text className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                        Czas trwania
                      </Text>
                      <Text className="text-slate-900 font-medium text-sm">
                        {formatTimeDisplay(new Date(event.startDate))} -{' '}
                        {formatTimeDisplay(new Date(event.endDate))}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Opis */}
              <View className="mb-6">
                <Text className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Opis
                </Text>
                <View className="bg-white border border-slate-100 rounded-2xl p-4 flex-row items-start gap-3 shadow-sm">
                  <Icon as={AlignLeft} className="text-slate-400 mt-0.5" size={16} />
                  <Text className="text-slate-800 text-sm flex-1 leading-relaxed">
                    {event.description || 'Brak opisu dla tego wydarzenia.'}
                  </Text>
                </View>
              </View>

              {/* Kalendarze */}
              <View className="mb-6">
                <Text className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Kalendarze
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {event.calendars && event.calendars.length > 0 ? (
                    event.calendars.map(cal => (
                      <View
                        key={cal.id}
                        className="bg-sky-50 border border-sky-100 rounded-full px-4 py-1.5"
                      >
                        <Text className="text-sky-700 font-semibold text-xs">
                          📁 {cal.name}
                        </Text>
                      </View>
                    ))
                  ) : (
                    <Text className="text-slate-500 text-sm italic">
                      Brak powiązanych kalendarzy
                    </Text>
                  )}
                </View>
              </View>

              {/* Organizator i Uczestnicy */}
              <View className="mb-8 flex-grow">
                <Text className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Uczestnicy
                </Text>
                <View className="bg-white border border-slate-100 rounded-2xl p-4 gap-3 shadow-sm">
                  <View className="flex-row items-center gap-3">
                    <Icon as={User} className="text-sky-500" size={16} />
                    <Text className="text-slate-800 text-sm font-medium flex-1">
                      Organizator:{' '}
                      <Text className="font-bold">{event.owner.username}</Text>
                    </Text>
                  </View>

                  {event.participants && event.participants.length > 0 && (
                    <View className="flex-row items-start gap-3 border-t border-slate-100 pt-3">
                      <Icon as={Users} className="text-slate-400 mt-0.5" size={16} />
                      <View className="flex-1">
                        <Text className="text-slate-500 text-xs font-semibold mb-1">
                          Zaproszeni
                        </Text>
                        <View className="flex-row flex-wrap gap-1.5">
                          {event.participants.map(p => (
                            <View
                              key={p.id}
                              className="bg-slate-100 rounded-lg px-2.5 py-1"
                            >
                              <Text className="text-slate-700 text-xs font-medium">
                                {p.username}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              </View>

              {/* Przyciski Akcji: Edytuj / Usuń */}
              <View className="flex-row gap-4 mt-auto">
                <Button
                  onPress={actions.handleDelete}
                  variant="destructive"
                  className="flex-1 rounded-xl flex-row items-center justify-center gap-2"
                >
                  <Icon as={Trash2} className="text-white" size={16} />
                  <Text className="text-white font-bold">Usuń</Text>
                </Button>
                <Button
                  onPress={() => setIsEditing(true)}
                  className="flex-1 bg-sky-500 active:bg-sky-600 rounded-xl flex-row items-center justify-center gap-2"
                >
                  <Icon as={Edit2} className="text-slate-950" size={16} />
                  <Text className="text-slate-950 font-bold">Edytuj</Text>
                </Button>
              </View>
            </ScrollView>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
