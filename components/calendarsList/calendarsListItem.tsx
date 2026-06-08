import { ArrowRightCircle, PlusCircle } from 'lucide-react-native';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card';
import { Icon } from '../ui/icon';

export interface CalendarsListItemProps {
  name: string;
  owner: string;
  arrowPressHandler?: () => void;
  plusPressHandler?: () => void;
  plusIconDisabled?: boolean;
}

const CalendarItem = ({
  name,
  owner,
  arrowPressHandler,
  plusPressHandler,
  plusIconDisabled
}: CalendarsListItemProps) => {
  return (
    <Card className="my-2 flex flex-row items-center justify-between">
      <CardHeader>
        <CardTitle className="h-[1.5em]">{name}</CardTitle>
        <CardDescription>Owner: {owner}</CardDescription>
      </CardHeader>
      <CardContent className="">
        <Icon
          className={'mb-4'}
          size={20}
          onPress={arrowPressHandler}
          as={ArrowRightCircle}
        />
        <Icon
          size={20}
          onPress={plusPressHandler}
          as={PlusCircle}
          disabled={plusIconDisabled}
          color={plusIconDisabled ? '#cacaca' : '#000000'}
        />
      </CardContent>
    </Card>
  );
};

export default CalendarItem;
