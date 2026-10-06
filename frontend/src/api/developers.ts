import type { DeveloperDto } from '#shared/dtos/developers/developer.dto';

import { buildApiError } from './error';

export async function fetchDevelopers(): Promise<DeveloperDto[]> {
  const { apiUrl } = window.APP_CONFIG;
  const response = await fetch(`${apiUrl.replace(/\/$/, '')}/developers`);

  if (!response.ok) {
    throw await buildApiError(response, `Failed to load developers (${response.status})`);
  }

  return response.json() as Promise<DeveloperDto[]>;
}
