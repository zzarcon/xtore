import * as React from 'react';
import Highlight from 'react-highlight';

const highlight = (code: string) => (
  <Highlight language="javascript" className="javascript">
    {code}
  </Highlight>  
);

export const basic = highlight(`import Xtore from 'xtore';
const xtore = new Xtore();
xtore.subscribe('some-unique-id', {
  next(state) {
    console.log(state);
  }
});
xtore.update('some-unique-id', {name: 'hector'});
// LOG: {name: 'hector'}
xtore.update('some-unique-id', {lastName: 'zarco'});
// LOG: {name: 'hector', lastName: 'zarco'}
xtore.update('some-unique-id', {name: 'leon'});
// LOG: {name: 'leon', lastName: 'zarco'}
xtore.update('other-id', {name: 'zzarcon'});
// Nothing will be logged 😉
`);

export const unsubscribe = highlight(`import Xtore from 'xtore';
const xtore = new Xtore();
const subscription = xtore.subscribe('id-1', {next: console.log});
xtore.update('id-1', {foo: 'bar'});
// LOG: {foo: 'bar'}
subscription.unsubscribe();
xtore.update('id-1', {hi: 'hola'});
// Nothing will be logged
`);
