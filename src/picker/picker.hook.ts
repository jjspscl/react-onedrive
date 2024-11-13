import { useContext } from "react";
import { PickerContext, PickerProvider } from "./picker.provider";

export const usePicker = () => {
  const ctx = useContext(PickerContext);

  if (!ctx) {
    throw new Error(
      `${usePicker.name} must be used within a ${PickerProvider.name}`,
    );
  }
  return ctx;
};
