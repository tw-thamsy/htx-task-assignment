import type { DeveloperDto } from '#shared/dtos/developers/developer.dto';

export async function fetchDevelopers() {
  const { apiUrl } = window.APP_CONFIG;
  const response = await fetch(`${apiUrl.replace(/\/$/, '')}/developers`);

  if (!response.ok) {
    throw new Error(`Failed to load developers (${response.status})`);
  }

  return response.json() as Promise<DeveloperDto[]>;
}
