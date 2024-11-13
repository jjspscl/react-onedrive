

enum PickerErrors {
    OPTIONS_NOT_PROVIDED = 'Options not provided',
}

export const PickerError = {
  optionsNotProvided: () => new Error(PickerErrors.OPTIONS_NOT_PROVIDED),
};