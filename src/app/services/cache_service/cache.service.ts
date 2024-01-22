// cache.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  /// the cache
  private cache: Map<string, any> = new Map();

  /// get data from cache
  get(key: string): any {
    return this.cache.get(key);
  }

  /// add data to cache
  set(key: string, value: any): void {
    this.cache.set(key, value);
  }
}
