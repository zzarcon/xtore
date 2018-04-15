# xtore [![Build Status](https://travis-ci.org/zzarcon/xtore.svg?branch=master)](https://travis-ci.org/zzarcon/xtore)

> General purpose lib to subscribe and handle state

Xtore provides a generic way of notifying state changes, it's framework agnostic and easy to use in existing apps.

You can think about it like a convinient event emitter or a extremelly simple RXJS. 
# Install 

```
$ yarn add xtore
```

# Usage 

#### Basic


```javascript
import Xtore from 'xtore';

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
```


# Api

# Plugins

* React wrapper: https://github.com/zzarcon/react-xtore