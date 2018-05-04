export interface Observer<T> {
  next: (state: T) => void;
}

export interface Subscription {
  unsubscribe: () => void;
}

export class Xtore<T> {
  private store: {[type in keyof T]?: {[id: string]: T[type]}};
  private observers: {[type in keyof T]?: {[id: string]: Set<Observer<T[type]>>}};
  
  constructor() {
    this.store = {};
    this.observers = {};
  }

  subscribe(type: keyof T, id: string, observer: Observer<T[keyof T]>): Subscription {
    if (!this.observers[type]) {
      this.observers[type] = {};
    }

    if (!this.observers[type][id]) {
      this.observers[type][id] = new Set();
    }
    
    this.observers[type][id].add(observer);

    if (this.store[type] && this.store[type][id]) {
      observer.next(this.store[type][id]);
    }
    
    return {
      unsubscribe: this.unsubscribe(type, id, observer)
    };
  }

  update(type: keyof T, id: string, state: Partial<T[keyof T]>) {
    const observers = this.observers[type];

    if (!this.store[type]) {
      this.store[type] = {};
    }
    
    const currentState = this.store[type][id];
    // https://github.com/Microsoft/TypeScript/pull/13288
    // https://github.com/Microsoft/TypeScript/issues/13557
    const newState = {...currentState as any, ...state as any};

    this.store[type][id] = newState;

    if (!observers || !observers[id]) return;

    observers[id].forEach(observer => {
      observer.next(newState);
    });
  }

  private unsubscribe(type: keyof T, id: string, observer: Observer<T[keyof T]>) {
    return () => {
      this.observers[type][id].delete(observer);
    };
  }
}