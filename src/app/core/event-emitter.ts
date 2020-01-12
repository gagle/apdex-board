export type EventCallback<T> = (value: T) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class EventEmitter<T = any> {
  private listeners: EventCallback<T>[] = [];

  subscribe(fn: EventCallback<T>): void {
    this.addListener(fn);
  }

  private addListener(fn: EventCallback<T>): void {
    this.listeners.push(fn);
  }

  emit(value: T): void {
    this.listeners.forEach(listener => listener(value));
  }
}
