import { BrowserAuthOptions } from '@azure/msal-browser';
import { IMSPickerOptions } from '../core/types/ms';

interface MSALAuthOptions extends BrowserAuthOptions {
  authType: 'msal';
}

export type IPickerAuthOptions = {
  authType: 'auth';
  accessToken: string;
  baseUrl: string;
} | MSALAuthOptions;

export interface IPickerOptions {
    baseUrl: string;
    authOptions: IPickerAuthOptions;
    pickerOverrides: Partial<IMSPickerOptions>;
}

export interface PickerProviderProps {
    options: IPickerOptions;
    children: React.ReactNode;
    onClose?: onCloseType;
    onPick?: onPickType;
}

export type onPickType = (data: any) => Promise<void>;
export type onCloseType = () => void;
export interface PickerEvents {
    onClose?: onCloseType;
    onPick?: onPickType;
}