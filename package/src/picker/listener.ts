import { IMSPickerOptions } from "../core/types/ms";
import { handleChannelMessage } from "./handlers";
import { IPickerAuthOptions, PickerEvents } from "./types";

/**
 * @link https://learn.microsoft.com/en-us/onedrive/developer/controls/file-pickers/?view=odsp-graph-online#message-listener-implementation
 */



let port: MessagePort;

export function initializeMessageListener(params: {
    event: MessageEvent,
    ref: React.RefObject<HTMLIFrameElement>,
    options: IMSPickerOptions,
    authOptions: IPickerAuthOptions,
    pickerEvents: PickerEvents,
}) {
    const {
        event,
        ref,
        options,
        pickerEvents,
        authOptions,
    } = params;

    const currentRef = ref.current;

    if (event.source === currentRef?.contentWindow) {
        const message = event.data;
        
        if (message.type === "initialize" && message.channelId === options.messaging.channelId) {
            // grab the port from the event
            port = event.ports[0];

            // add an event listener to the port (example implementation is in the next section)
            // TODO: Add abort event listener signal
            port.addEventListener("message", async (ev) => {
                await handleChannelMessage(port, ev, pickerEvents, authOptions);
            });

            // start ("open") the port
            port.start();

            // tell the picker to activate
            port.postMessage({
                type: "activate",
            });
        }
    }
};

