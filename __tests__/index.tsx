import Xtore from '../src';

interface Person {
  name: string;
  age: number;
}

interface City {
  country: string;
}

describe('Xtore', () => {
  const setup = () => {
    return {
      
    };
  };
  
  describe('subscribe()', () => {
    it('should get the latest state of the model', () => {
      const xtore = new Xtore<{person: Person}>();
      const nextMock = jest.fn();

      xtore.subscribe('person', '1', {
        next: nextMock
      });

      xtore.update('person', '1', {name: 'hector'});
      xtore.update('person', '1', {name: 'hector', age: 26});
      xtore.update('person', '1', {name: 'zzarcon', age: 26});

      expect(nextMock).toHaveBeenCalledTimes(3);
      expect(nextMock.mock.calls[0][0]).toEqual({name: 'hector'});
      expect(nextMock.mock.calls[1][0]).toEqual({name: 'hector', age: 26});
      expect(nextMock.mock.calls[2][0]).toEqual({name: 'zzarcon', age: 26});
    });

    it('should support different types', () => {

    });

    it('should call next right after subscription if there is state', () => {
      const xtore = new Xtore<{city: City}>();
      const nextMock = jest.fn();

      xtore.update('city', '1', {country: 'valencia'});
      xtore.subscribe('city', '1', {
        next: nextMock
      });
      
      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toEqual({country: 'valencia'});
    });

    it('should not call next right after subscription if there is no state', () => {
      const xtore = new Xtore<{city: City}>();
      const nextMock = jest.fn();

      xtore.subscribe('city', '1', {
        next: nextMock
      });
      
      expect(nextMock).toHaveBeenCalledTimes(0);
    });

    it('should call all observers subscribed to the same id', () => {

    });
  });

  describe('unsubscribe()', () => {
    it('should not call next after unsubscription', () => {
      const xtore = new Xtore<{city: City}>();
      const nextMock = jest.fn();

      const subscription = xtore.subscribe('city', '1', {
        next: nextMock
      });

      xtore.update('city', '1', {
        country: 'Spain'
      });
      subscription.unsubscribe();
      xtore.update('city', '1', {
        country: 'Australia'
      });

      expect(nextMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('update()', () => {
    it.only('should not call next for different ids', () => {
      const xtore = new Xtore<{city: City}>();
      const nextMock = jest.fn();

      const subscription = xtore.subscribe('city', '1', {
        next: nextMock
      });

      xtore.update('city', '2', {
        country: 'Spain'
      });
      
      expect(nextMock).not.toBeCalled();
    });
  });
});
