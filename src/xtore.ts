export interface Observer {
  next: (state: any) => void;
}

export interface Subscription {
  unsubscribe: () => void;
}

export class Xtore {
  private store: {[id: string]: any};
  private observers: {[id: string]: Set<Observer>};
  
  constructor() {
    this.store = {};
    this.observers = {};
  }

  subscribe(id: string, observer: Observer): Subscription {
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

  update(id: string, state: any) {
    const observers = this.observers[id];
    const currentState = this.store[id];
    const newState = {...currentState, ...state};

    this.store[id] = newState;

    if (!observers) return;

    observers.forEach(observer => {
      observer.next(newState);
    });
  }

  private unsubscribe(id: string, observer: Observer) {
    return () => {
      this.observers[id].delete(observer);
    };
  }
}