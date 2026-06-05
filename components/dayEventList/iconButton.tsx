import { Pressable } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { usePressState } from '@/hooks/dayEventsList/usePressState';

export interface IconButtonProps {
  Icon: LucideIcon;
  handlePress?: () => void;
  iconSize?: number;
  iconColor?: string;
  strokeWidth?: number;
}

export function IconButton({
  Icon,
  handlePress,
  iconSize = 30,
  iconColor = 'white',
  strokeWidth = 1.5
}: IconButtonProps) {
  const { isPressed, handlePressIn, handlePressOut } = usePressState();

  return (
    <Pressable
      className={`bg-zinc-800 rounded-xl size-[40px] ${isPressed ? 'bg-zinc-600' : ''}`}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Icon
        size={iconSize}
        strokeWidth={strokeWidth}
        color={iconColor}
        style={{ margin: 'auto' }}
      />
    </Pressable>
  );
}
