interface RetryOptions {
  /** The maximum number of attempts before giving up */
  maxAttempts?: number;

  /** The delay between attempts in milliseconds */
  delay?: number;

  /** Whether to use exponential backoff */
  backoff?: boolean;

  /** A callback that is called when an error occurs */
  onError?: (error: Error, attempt: number) => void;
}

export async function withRetry<T>(
    fn: () => Promise<T>,
    options: RetryOptions = {}
): Promise<T> {
    const {
        maxAttempts = 3,
        delay = 1000,
        backoff = true,
        onError
    } = options;

    let lastError: Error;
  
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error as Error;
      
            if (onError) {
                onError(lastError, attempt);
            }

            if (attempt === maxAttempts) {
                break;
            }

            const waitTime = backoff ? delay * Math.pow(2, attempt - 1) : delay;
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
    }

    throw lastError!;
}