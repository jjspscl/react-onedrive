import { getMsalToken } from "../ms/msal.auth";
import { IPickerAuthOptions } from "../picker/types";

/**
 * @description Handle the authentication process for the picker depending on the auth options provided.
 */
export const handleAuth = async (authOptions: IPickerAuthOptions) => {
    let accessToken = "";

    switch (authOptions.authType) {
        case 'auth': {
            accessToken = authOptions.accessToken;
            break;
        }
        case 'msal': {
            const res = await getMsalToken(authOptions);
            accessToken = res.accessToken;
            break;
        }
        default: {
            throw new Error('Invalid auth options');
        }
    }

    if (!accessToken) {
        throw new Error('Failed to get access token');
    }

    return accessToken;
};