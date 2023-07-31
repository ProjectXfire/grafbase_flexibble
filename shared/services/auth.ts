import { serverUrl } from '../database';

export async function fetchToken(): Promise<any> {
  try {
    const res = await fetch(`${serverUrl}/api/auth/csrf`);
    const { csrfToken } = await res.json();
    return csrfToken;
  } catch (error: any) {
    throw new Error(error);
  }
}
