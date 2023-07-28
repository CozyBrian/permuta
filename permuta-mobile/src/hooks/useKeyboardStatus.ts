import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export function useKeyboardStatus() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [metrics, setMetrics] = useState(Keyboard.metrics());

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
        setKeyboardHeight(Keyboard.metrics()?.height || 0);
        setMetrics(Keyboard.metrics());
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
        setMetrics(Keyboard.metrics());
        setKeyboardHeight(Keyboard.metrics()?.height || 0);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return { isKeyboardVisible, keyboardHeight, metrics };
}
