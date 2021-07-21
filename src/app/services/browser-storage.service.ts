import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {

  constructor(
    @Inject(BROWSER_STORAGE) private readonly storage: Storage,
  ) {
  }

  get(key: string): string | null {
    return this.storage.getItem(key);
  }

  set(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}
