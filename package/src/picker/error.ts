
type errorCodes =
    | 'options_not_provided'
    | 'auth_options_not_provided'
    | 'context_not_found'

const errorMap: Record<errorCodes, string> = {
    options_not_provided: 'Options not provided',
    context_not_found: 'Context not found',
    auth_options_not_provided: 'Auth options not provided',
};

export class PickerError extends Error {
    constructor(
        message: string,
    ) {
        super(message);
    }

    static error(message: errorCodes) {
        const err = `${message}: ${errorMap[message]}`;
        return new PickerError(err);
    }
}
