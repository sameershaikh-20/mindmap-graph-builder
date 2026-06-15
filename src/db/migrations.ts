import { STORE_VERSION } from '../constants/config';

export function runMigrations(): void {
  const version = parseInt(localStorage.getItem('dbVersion') || '0', 10);
  if (version < STORE_VERSION) {
    localStorage.setItem('dbVersion', String(STORE_VERSION));
  }
}
