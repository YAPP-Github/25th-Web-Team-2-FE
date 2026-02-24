import { LoginProvider, Role } from '@/types/user';

export const STORAGE_KEYS = {
  isPromotionPopupViewed: 'IS_PROMOTION_POPUP_VIEWED',
  lastLogin: 'LAST_LOGIN',
} as const;

type StorageSchema = {
  [STORAGE_KEYS.isPromotionPopupViewed]: boolean;
  [STORAGE_KEYS.lastLogin]: { role: Role; provider: LoginProvider };
};

type StorageKey = keyof StorageSchema;

class LocalStorageManager {
  set = <K extends StorageKey>(key: K, value: StorageSchema[K]) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  get = <K extends StorageKey>(key: K): StorageSchema[K] | null => {
    const raw = localStorage.getItem(key);
    if (raw == null) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  remove = (key: StorageKey) => {
    localStorage.removeItem(key);
  };

  clear = () => {
    localStorage.clear();
  };
}

export const localStorageManager = new LocalStorageManager();
