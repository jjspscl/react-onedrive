"use client";

import { IMSPickerOptions } from "../core/types/ms";
import { uuid } from "../utils/generator";
import { deepMerge } from "../utils/object";

export const getOneDriveUrl = async (accessToken: string): Promise<string> => {
    const graphEndpoint = "https://graph.microsoft.com/v1.0/me/drive";
    const headers = new Headers({
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
    });

    const response = await fetch(graphEndpoint, { headers });
    if (!response.ok) {
        console.error('response', response);
        throw new Error("Failed to fetch OneDrive URL");
    }

    const data = await response.json();
    return data.webUrl;
};

export const getPickerOptions = (overrides?: Partial<IMSPickerOptions>): IMSPickerOptions => {
    let options: IMSPickerOptions = {
        sdk: '8.0',
        entry: {
            oneDrive: {},
            sharePoint: {
                byPath: {
                    web: '',
                    fallbackToRoot: false,
                }
            }
        },
        messaging: {
            origin: window.location.origin,
            channelId: uuid(),
        },
    };

    if (overrides) {
        options = deepMerge(options, overrides);
    }

    return options;
};