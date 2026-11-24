import { Injectable } from "@nestjs/common";

@Injectable()
export class InMemoryCacheService {
  private cache: Map<string, unknown>;

  constructor() {
    this.cache = new Map<string, unknown>();
  }

  /**
   * Retrieves the value associated with the specified key from the cache.
   * @param key - The key of the value to retrieve.
   * @returns The value associated with the specified key, or undefined if the key is not found in the cache.
   */
  get(key: string): unknown {
    return this.cache.get(key);
  }

  /**
   * Sets a value in the cache with the given key.
   * @param key - The key to set the value with.
   * @param value - The value to set in the cache.
   */
  set(key: string, value: unknown): void {
    this.cache.set(key, value);
  }

  /**
   * Deletes the value associated with the given key from the cache.
   * @param key - The key of the value to delete.
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clears all entries from the cache.
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Executes the provided callback function only once for the given key.
   * Subsequent calls with the same key will not execute the callback again.
   * @param key - The key to check if the callback has already been executed for.
   * @param callback - The function to execute only once for the given key.
   */
  executeOnce(key: string, callback: () => void | Promise<void>): void {
    if (this.cache.has(key)) return;
    callback();
    this.cache.set(key, 1);
  }
}
