// Safe storage wrapper for iframe / sandbox environments where localStorage access is denied
const memoryStorage: Record<string, string> = {};

function isLocalStorageAvailable(): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

const canUseLocalStorage = isLocalStorageAvailable();

export const safeStorage = {
  getItem: (key: string): string | null => {
    if (canUseLocalStorage) {
      try {
        return window.localStorage.getItem(key);
      } catch (e) {
        // Fall back to in-memory if runtime exception happens
      }
    }
    return memoryStorage[key] ?? null;
  },

  setItem: (key: string, value: string): void => {
    memoryStorage[key] = value;
    if (canUseLocalStorage) {
      try {
        window.localStorage.setItem(key, value);
      } catch (e) {
        // Ignore or handle fallback gracefully
      }
    }
  },

  removeItem: (key: string): void => {
    delete memoryStorage[key];
    if (canUseLocalStorage) {
      try {
        window.localStorage.removeItem(key);
      } catch (e) {
        // Ignore or handle fallback gracefully
      }
    }
  },
};
