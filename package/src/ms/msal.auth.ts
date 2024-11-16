import { BrowserAuthOptions, Configuration, PublicClientApplication } from '@azure/msal-browser';
import { IPickerAuthOptions } from '../picker/types';


export const getMsalToken = async (authOptions: IPickerAuthOptions) => {
    const { authType, ...authOpts } = authOptions;
    if (authType !== 'msal') {
        throw new Error('Invalid auth options');
    }

    const auth = authOpts as BrowserAuthOptions;
    const options: Configuration = {
        auth,
        cache: {
            cacheLocation: 'sessionStorage',
            storeAuthStateInCookie: true,
        }
    };
    const msalInstance = new PublicClientApplication(options);
    await msalInstance.initialize();

    let account = msalInstance.getAllAccounts()[0];
    if (!account) {
        const loginResponse = await msalInstance.loginPopup({
            scopes: ['Files.ReadWrite.All', 'Sites.Read.All'],
        });
        account = loginResponse.account;
    }
    msalInstance.setActiveAccount(account);

    const response = await msalInstance.acquireTokenSilent({
        scopes: ['Files.ReadWrite.All', 'Sites.Read.All'],
        account,
    });

    return {
        accessToken: response.accessToken,
    };    
};