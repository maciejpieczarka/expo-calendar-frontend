import { ArrowRightCircle } from 'lucide-react-native';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card';
import { Icon } from '../ui/icon';

const CalendarItem = ({ name, owner }: { name: string; owner: string }) => {
  return (
    <Card className="my-2 flex flex-row items-center justify-between">
      <CardHeader className="">
        <CardTitle>{name}</CardTitle>
        <CardDescription>Owner: {owner}</CardDescription>
      </CardHeader>
      <CardContent className="">
        <Icon as={ArrowRightCircle} />
      </CardContent>
    </Card>
  );
};

export default CalendarItem;
