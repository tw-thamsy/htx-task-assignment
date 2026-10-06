export async function buildApiError(response: Response, genericMessage: string): Promise<Error> {
  const body: unknown = await response.json().catch(() => null);
  const message =
    typeof body === 'object' &&
    body !== null &&
    'message' in body &&
    typeof body.message === 'string' &&
    body.message.trim().length > 0
      ? body.message
      : genericMessage;

  return new Error(message);
}
