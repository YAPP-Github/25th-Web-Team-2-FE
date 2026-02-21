class LocalStorageManager {
  set = <T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  get = <T>(key: string): T | null => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  };
  remove = (key: string) => {
    localStorage.removeItem(key);
  };
  clear = () => {
    localStorage.clear();
  };
}

export const localStorageManager = new LocalStorageManager();
