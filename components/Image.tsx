import { Image } from 'expo-image';
import { cssInterop } from 'nativewind';

export const styledImage = cssInterop(Image, {
  className: 'style'
});
