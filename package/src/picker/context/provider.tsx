"use client";

import { useMemo, useRef } from "react";
import { PickerEvents, PickerProviderProps } from "../types";
import { PickerError } from "../error";
import { IPickerContext, PickerContext } from "./context";

export const PickerProvider = (props: PickerProviderProps) => {
    const { 
        children, 
        options, 
        onClose,
        onPick
    } = props;

    const ref = useRef<HTMLIFrameElement>(null);
    if (!options) {
        throw PickerError.error('options_not_provided');
    }

    const pickerEvents = useMemo<PickerEvents>(() => {
        return {
            onClose,
            onPick
        };
    }, [onClose, onPick]);

    const context: IPickerContext = {
        options,
        ref,
        pickerEvents
    };

    return (
        <PickerContext.Provider value={context}>
            {children}
        </PickerContext.Provider>
    );
};