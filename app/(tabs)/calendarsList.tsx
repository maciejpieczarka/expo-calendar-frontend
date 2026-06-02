import CalendarItem from '@/components/calendarsList/calendarsListItem';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import useCalendarsList from '@/hooks/calendarsList/useCalendarsList';
import { Plus } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CalendarsListScreen = () => {
  const { state, actions } = useCalendarsList();

  return (
    <SafeAreaView className="px-safe-offset-5 flex-1">
      <View>
        <Text variant="h3">Your Calendars</Text>
      </View>

      {state.isLoading ? (
        <ActivityIndicator />
      ) : state.isEmpty ? (
        <View className="flex-1 justify-center items-center py-12">
          <Text variant="muted" className="text-base">
            Nie posiadasz jeszcze zadnych kalendarzy.{'\n'}
            {state.error}
          </Text>
        </View>
      ) : (
        <ScrollView>
          {state.calendars.map(calendar => (
            <CalendarItem
              key={calendar.id}
              name={calendar.name}
              owner={calendar.owner.username}
            />
          ))}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Icon as={Plus} />
                <Text>Utwórz nowy kalendarz</Text>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Utwórz nowy kalendarz</DialogTitle>
                <DialogDescription>
                  Podaj nazwę nowego kalendarza. Naciśnij przycisk Zapisz, aby
                  utworzyć.
                </DialogDescription>
              </DialogHeader>
              <View className="grid gap-4">
                <View className="grid gap-3">
                  <Label htmlFor="calendar-name">Nazwa</Label>
                  <Input
                    id="calendar-name"
                    placeholder="Plan zajęć"
                    onChangeText={actions.setNewCalendarName}
                  />
                </View>
              </View>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">
                    <Text>Cancel</Text>
                  </Button>
                </DialogClose>
                <Button onPress={actions.handleCreate}>
                  <Text>Zapisz</Text>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default CalendarsListScreen;
