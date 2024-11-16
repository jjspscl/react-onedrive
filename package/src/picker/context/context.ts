import { createContext, useContext } from "react";
import { IPickerOptions, PickerEvents } from "../types";
import { PickerError } from "../error";


export interface IPickerContext {
  options: IPickerOptions;
  ref: React.RefObject<HTMLIFrameElement> | null;
  pickerEvents: PickerEvents;
}
export const PickerContext = createContext<IPickerContext | null>(null);
export const usePickerContext = () => {
    const ctx = useContext(PickerContext);
    if (!ctx) {
        throw PickerError.error('context_not_found');
    }
    
    return ctx;
};