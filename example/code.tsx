import * as React from 'react';
import Highlight from 'react-highlight';

const highlight = (code: string) => (
  <Highlight language="javascript" className="javascript">
    {code.trim()}
  </Highlight>  
);

export const basic = highlight(`
import Xtore from 'xtore';

interface Cat {
  name: string;
  age: number;
}

interface City {
  country: string;
}

const xtore = new Xtore<{cat: Cat, city: City}>();
xtore.subscribe('cat', 'id-1' {
  next(state) { // Some Cat state
    console.log(state.name);
  }
});
xtore.update('cat', 'id-1' {name: 'Smokey'});
// LOG: {name: 'Smokey'}
xtore.update('cat', 'id-1', {age: 2});
// LOG: {name: 'Smokey', age: 2}
xtore.update('cat', 'id-1', {name: 'tigger'});
// LOG: {name: 'tigger', age: 2}
xtore.update('cat', '2', {name: 'zzarcon'});
// Nothing will be logged 😉
xtore.update('city', '1', {country: 'Spain'});
// Nothing will be logged 😉
`);

export const unsubscribe = highlight(`
import Xtore from 'xtore';
const xtore = new Xtore<{cat: Cat}>();
const subscription = xtore.subscribe('cat', '1', {next: console.log});
xtore.update('cat', '1', {name: 'Missy'});
// LOG: {foo: 'bar'}
subscription.unsubscribe();
xtore.update('cat', '1', {name: 'Misty'});
// Nothing will be logged
`);

export const apiSubscribe = highlight(`
interface Observer<T> {
  next: (state: T) => void;
}

interface Subscription {
  unsubscribe: () => void;
}

subscribe(type: keyof T, id: string, observer: Observer<T]>): Subscription
`);

export const apiUpdate = highlight(`
update(type: keyof T, id: string, state: Partial<T>) 
`);
