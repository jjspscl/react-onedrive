import { PickerError } from "../error";
import { useEffect } from "react";
import { getOneDriveUrl, getPickerOptions } from "../utils";
import { initializeMessageListener } from "../listener";
import { IPickerContext } from "../context/context";
import { handleAuth } from "../../auth/msal";
import { withRetry } from "../../utils/retry";
import { IMSPickerOptions } from "../../core/types/ms";


export const usePicker = (ctx: IPickerContext) => {
    const { options, ref, pickerEvents } = ctx;
    const { authOptions, pickerOverrides, baseUrl } = options;

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (!ref?.current) {
            throw PickerError.error('options_not_provided');
        }

        if (!pickerOverrides) {
            throw PickerError.error('auth_options_not_provided');
        }

        const handleMessage = (message: MessageEvent) => {
            if (signal.aborted) return;

            initializeMessageListener({
                event: message,
                ref,
                options: pickerOverrides as IMSPickerOptions,
                authOptions,
                pickerEvents,
            });
        };
        window.addEventListener('message', handleMessage);

        const initializePicker = async () => {
            try {
                const accessToken = await handleAuth(authOptions);

                const formData = new FormData();
                formData.append('access_token', accessToken);

                // TODO: Add options for Retry
                const baseUrl = await withRetry(() => getOneDriveUrl(accessToken), {
                    maxAttempts: 3,
                    delay: 2000,
                    backoff: true,
                    onError: (error, attempt) => {
                        console.error(`Attempt ${attempt} failed:`, error);
                    }
                });
                const root = baseUrl.replace(/\/Documents$/, "");

                const pickerOptions = getPickerOptions(pickerOverrides);               
                const queryString = new URLSearchParams({
                    filePicker: JSON.stringify(pickerOptions),
                    locale: 'en-us'
                });
                const pickerPath = `${root}/_layouts/15/FilePicker.aspx?${queryString}`;

                formData.append('filePicker', JSON.stringify(pickerOptions));
                if (ref.current) {
                    const iframeDoc = ref.current.contentDocument;
                    if (iframeDoc) {
                        // TODO: Add abort event listener signal

                        const form = iframeDoc.createElement('form');
                        form.method = 'POST';
                        form.action = pickerPath;
                        form.style.display = 'none';

                        for (const [key, value] of formData.entries()) {
                            const input = iframeDoc.createElement('input');
                            input.type = 'hidden';
                            input.name = key;
                            input.value = value as string;
                            form.appendChild(input);
                        }

                        iframeDoc.body.appendChild(form);
                        form.submit();
                    }
                }
                
            } catch (error) {
                console.error('Picker Initialization Error:', error);
            }
        };

        initializePicker();

        return () => {
            abortController.abort();
            // window.removeEventListener('message', handleMessage);
        };
    }, [ref, authOptions, baseUrl, pickerOverrides, pickerEvents]);
};