import Xtore from '../src';

type Person = {
  name: string;
  age: number;
}

type City = {
  country: string;
}

describe('Xtore', () => {
  const setup = () => {
    return {
      
    };
  };
  
  describe('subscribe()', () => {
    it('should get the latest state of the model', () => {
      
      const xtore = new Xtore<Person | City>();
      const nextMock = jest.fn();

      xtore.subscribe('id-1', {
        next: nextMock
      });

      xtore.update<Person>('id-1', {name: 'hector'});
      xtore.update<Person>('id-1', {name: 'hector', age: 26});
      xtore.update<Person>('id-1', {name: 'zzarcon', age: 26});

      expect(nextMock).toHaveBeenCalledTimes(3);
      expect(nextMock.mock.calls[0][0]).toEqual({name: 'hector'});
      expect(nextMock.mock.calls[1][0]).toEqual({name: 'hector', age: 26});
      expect(nextMock.mock.calls[2][0]).toEqual({name: 'zzarcon', age: 26});
    });

    it('should call next right after subscription if there is state', () => {
      const xtore = new Xtore();
      const nextMock = jest.fn();

      xtore.update('id-1', {city: 'valencia'});
      xtore.subscribe('id-1', {
        next: nextMock
      });
      
      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toEqual({city: 'valencia'});
    });

    it('should not call next right after subscription if there is no state', () => {
      const xtore = new Xtore();
      const nextMock = jest.fn();

      xtore.subscribe('id-1', {
        next: nextMock
      });
      
      expect(nextMock).toHaveBeenCalledTimes(0);
    });
  });

  describe('unsubscribe()', () => {
    it('should not call next after unsubscription', () => {
      const xtore = new Xtore<Person | City>();
      const nextMock = jest.fn();

      const subscription = xtore.subscribe('id-1', {
        next: nextMock
      });

      xtore.update<City>('id-1', {
        country: 'Spain'
      });
      subscription.unsubscribe();
      xtore.update('id-1', {
        country: 'Australia'
      });

      expect(nextMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('update()', () => {
    it.skip('should not next for different ids', () => {

    });
  });
});
