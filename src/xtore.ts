export interface Observer<T> {
  next: (state: T) => void;
}

export interface Subscription {
  unsubscribe: () => void;
}

export class Xtore<T> {
  private store: {[id: string]: T};
  private observers: {[id: string]: Set<Observer<T>>};
  
  constructor() {
    this.store = {};
    this.observers = {};
  }

  subscribe(id: string, observer: Observer<T>): Subscription {
    if (!this.observers[id]) {
      this.observers[id] = new Set();
    }

    this.observers[id].add(observer);

    if (this.store[id]) {
      observer.next(this.store[id]);
    }

    return {
      unsubscribe: this.unsubscribe(id, observer)
    };
  }

  update<S extends T>(id: string, partialState: Partial<S>) {
    const observers = this.observers[id];
    const currentState = this.store[id];
    const newState = {...currentState, ...partialState};

    this.store[id] = newState;

    if (!observers) return;

    observers.forEach(observer => {
      observer.next(newState);
    });
  }

  private unsubscribe(id: string, observer: Observer<T>) {
    return () => {
      this.observers[id].delete(observer);
    };
  }
}