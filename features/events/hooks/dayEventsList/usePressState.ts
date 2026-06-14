import React from 'react';

export interface PressState {
  isPressed: boolean;
  handlePressIn: () => void;
  handlePressOut: () => void;
}

export const usePressState = (): PressState => {
  const [isPressed, setPressed] = React.useState(false);

  const handlePressIn = () => {
    setPressed(true);
  };

  const handlePressOut = () => {
    setPressed(false);
  };

  return {
    isPressed,
    handlePressIn,
    handlePressOut
  };
};
