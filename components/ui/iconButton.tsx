import { Pressable, ViewStyle } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { usePressState } from '@/hooks/dayEventsList/usePressState';

export interface IconButtonProps {
  Icon: LucideIcon;
  handlePress?: () => void;
  iconSize?: number;
  iconColor?: string;
  strokeWidth?: number;
  borderRadius?: number | string;

  containerSize?: number;
  backgroundColor?: string;
  pressedBackgroundColor?: string;
}

export function IconButton({
  Icon,
  handlePress,
  iconSize = 30,
  iconColor = 'white',
  strokeWidth = 1.5,
  borderRadius,
  containerSize,
  backgroundColor,
  pressedBackgroundColor
}: IconButtonProps) {
  const { isPressed, handlePressIn, handlePressOut } = usePressState();

  const defaultBgClass = !backgroundColor ? 'bg-zinc-800' : '';
  const defaultPressedClass =
    isPressed && !pressedBackgroundColor ? 'bg-zinc-500' : '';
  const defaultSizeClass = !containerSize ? 'size-[40px]' : '';
  const defaultRadiusClass = !borderRadius ? 'rounded-xl' : '';

  const dynamicBgStyle: ViewStyle | undefined = isPressed
    ? pressedBackgroundColor
      ? { backgroundColor: pressedBackgroundColor }
      : undefined
    : backgroundColor
      ? { backgroundColor }
      : undefined;

  return (
    <Pressable
      className={`${defaultBgClass} ${defaultSizeClass} ${defaultRadiusClass} ${defaultPressedClass}`}
      onPress={handlePress}
      style={[
        containerSize
          ? { width: containerSize, height: containerSize }
          : undefined,
        borderRadius !== undefined
          ? { borderRadius: borderRadius as any }
          : undefined,

        dynamicBgStyle
      ]}
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
