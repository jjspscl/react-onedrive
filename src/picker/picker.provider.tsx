"use client";

import { createContext } from "react";
import { IPickerOptions, PickerProps } from "./picker.type";
import { PickerError } from "./picker.error";

interface IPickerContext {
  options: IPickerOptions;
}

export const PickerContext = createContext<IPickerContext | null>(null);
export const PickerProvider = (props: PickerProps) => {
  const { children, options } = props;

  if (!options) {
    throw PickerError.optionsNotProvided();
  }

  const context: IPickerContext = {
    options
  };

  return (
    <PickerContext.Provider value={context}>
      {children}
    </PickerContext.Provider>
  );
};