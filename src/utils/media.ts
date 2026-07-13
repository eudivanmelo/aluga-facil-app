const API_HOST = (() => {
  try {
    return new URL(process.env.EXPO_PUBLIC_API_URL ?? '').hostname;
  } catch {
    return null;
  }
})();

const LOOPBACK_HOSTS = ['localhost', '127.0.0.1'];

/**
 * The backend (MinIO) is configured with a fixed public URL that only resolves from the
 * host machine's own network namespace (e.g. `localhost`). On an Android emulator, physical
 * device, etc. that host isn't reachable, so we rewrite loopback hosts in photo URLs to
 * whatever host is already working for API calls (EXPO_PUBLIC_API_URL), keeping the port.
 */
export function resolveImageUrl<T extends string | null | undefined>(url: T): T {
  if (!url) return url;

  try {
    const parsed = new URL(url);
    if (API_HOST && LOOPBACK_HOSTS.includes(parsed.hostname)) {
      parsed.hostname = API_HOST;
    }
    return parsed.toString() as T;
  } catch {
    return url;
  }
}
