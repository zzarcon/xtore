export interface Observer<T> {
  next: (state: T) => void;
}

export interface Subscription {
  unsubscribe: () => void;
}


// export class Xtore<T extends {[id: string]: Object}> {
export class Xtore<T> {
  private store: {[type in keyof T]?: {[id: string]: T[type]}};
  private observers: {[type in keyof T]?: {[id: string]: Set<Observer<T[type]>>}};
  
  constructor() {
    this.store = {};
    this.observers = {};
  }

  subscribe(type: keyof T, id: string, observer: Observer<T[keyof T]>): Subscription {
    // console.log('store', this)
    // console.log(this.observers[type])
    if (!this.observers[type]) {
      this.observers[type][id] = new Set();
    }
    
    this.observers[type][id].add(observer);

    if (!this.store[type]) {
      this.store[type] = {};
    }
    
    if (this.store[type][id]) {
      observer.next(this.store[type][id]);
    }

    return {
      unsubscribe: this.unsubscribe(type, id, observer)
    };
  }

  update(type: keyof T, id: string, state: Partial<T[keyof T]>) {
    const observers = this.observers[type];
    
    if (!observers) {
      this.observers[type][id] = new Set();
    }

    if (!this.store[type]) {
      this.store[type] = {};
    }
    
    const currentState = this.store[type][id];
    // https://github.com/Microsoft/TypeScript/pull/13288
    // https://github.com/Microsoft/TypeScript/issues/13557
    const newState = {...currentState as any, ...state as any};

    this.store[type][id] = newState;

    if (!observers) return;
    console.log(observers)
    observers.forEach(observer => {
      observer.next(newState);
    });
  }

  private unsubscribe(type: keyof T, id: string, observer: Observer<T[keyof T]>) {
    return () => {
      this.observers[type].delete(observer);
    };
  }
}

// observers = {
//   'file': {1: []}
// }

// store = {
//   'file': {
//     1: {id: '1'},
//     2: {id: '2'}
//   },
//   collection: {
//     1: {name: 'recents'}
//   }
// }

interface MediaFile {
  id: string;
}
interface MediaCollection {
  name: string;
}
interface XtoreTypes {
  file: MediaFile;
  collection: MediaCollection;
}

const xtore = new Xtore<XtoreTypes>();