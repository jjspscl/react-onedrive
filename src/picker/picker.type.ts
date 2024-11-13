
export interface IPickerOptions {
    clientId: string;
}

export interface PickerProps {
    options: IPickerOptions;
    children: React.ReactNode;
}