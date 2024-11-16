import { handleAuth } from "../auth/msal";
import { IPickerAuthOptions, onPickType, PickerEvents } from "./types";

export async function handleChannelMessage (
    port: MessagePort, 
    ev: MessageEvent, 
    pickerEvents: PickerEvents,
    authOptions: IPickerAuthOptions
) {
    const payload = ev.data;

    switch (payload.type) {
        case "notification": {
            handleNotification(payload.data);
            break;
        }
        case "command": {
            await handleCommand({
                port, 
                message: ev, 
                payload: payload.data, 
                pickerEvents,
                authOptions
            });
            break;
        }
    }
};

const handleNotification = (data: any) => {
    const notification = data?.notification as string;
    
    if (notification === "page-loaded") {
        // handle the notification
        console.log("Page loaded");
    }
};


const handleCommand = async (params: {
    port: MessagePort,
    message: MessageEvent,
    payload: any,
    pickerEvents: PickerEvents,
    authOptions: IPickerAuthOptions,
}) => {
    const { port, message, payload, pickerEvents, authOptions } = params;

    port.postMessage({
        type: "acknowledge",
        id: payload.id,
    });
    
    const command = payload.command as string;

    switch (command) {
        case "authenticate": {
            await handleAuthentication(port, message, authOptions);
            break;
        }
        case "close": {
            if (pickerEvents.onClose) {
                pickerEvents.onClose();
            }
            break;
        }
        case "pick": {
            handlePick(port, message, pickerEvents.onPick);
            break;
        }
        default: {
            handleDefault(port, message, command);
            break;
        }
    }
};

const handlePick = (
    port: MessagePort, 
    message: MessageEvent, 
    onPick: onPickType | undefined
) => {
    try {
        if (onPick) {
            onPick(message);
        }
        port.postMessage({
            type: "result",
            id: message.data.id,
            data: {
                result: "success"
            }
        });
    } catch (error: any) {
        port.postMessage({
            type: "result",
            id: message.data.id,
            data: {
                result: "error",
                error: {
                    code: "unusableItem",
                    message: error.message
                }
            }
        });
    }
};

const handleAuthentication = async (port: MessagePort, message: MessageEvent, authOptions: IPickerAuthOptions) => {
    try {
        const accessToken = await handleAuth(authOptions);
        port.postMessage({
            type: "result",
            id: message.data.id,
            data: {
                result: "success",
                data: {
                    accessToken
                }
            }
        });
    } catch (error: any) {
        port.postMessage({
            type: "result",
            id: message.data.id,
            data: {
                result: "error",
                error: {
                    code: "unableToObtainToken",
                    message: error.message
                }
            }
        });
    }
};

const handleDefault = (port: MessagePort, message: MessageEvent, command: string) => {
    port.postMessage({
        type: "result",
        id: message.data.id,
        data: {
            result: "error",
            error: {
                code: "unsupportedCommand",
                message: command
            }
        }
    });
};