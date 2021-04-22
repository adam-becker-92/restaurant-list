import { IVenues } from 'src/types';
import Cache from '../helper_functions/frontEndCache';

const cacheRequest = (key: string, response: IVenues[]) => {
    const date = new Date();
    const timeStamp = date.getTime();
    const hash = {};
    hash[key]= timeStamp;
    window.localStorage.setItem(`${key}-${timeStamp}`, JSON.stringify(response));
    window.localStorage.setItem('requestHash', JSON.stringify(hash));
}

describe('cache functionalty', () => {

    test('will check local storage for cached searches on page load', () => {
        const localStorageSpy = jest.spyOn(Storage.prototype, 'getItem');
        new Cache();
        expect(localStorageSpy).toHaveBeenCalled();
    });

    test('will get existing item from local storage', () => {
        const venue = [{
            categories: [{ shortName: "short name", id: "id" }],
            id: 'venue id',
            location: {
                formattedAddress: ['address line 1', 'address line 2']
            },
            name: 'KFC'
        }];
        const key = "restaurantA";
        cacheRequest(key, venue);
        const cache = new Cache();
        const request = cache.getRequest(key);
        expect(request).toEqual(venue);
    });

    test('will add new item to local storage', () => {
        const venue = [{
            categories: [{ shortName: "short name", id: "id" }],
            id: 'venue id',
            location: {
                formattedAddress: ['address line 1', 'address line 2']
            },
            name: 'nandos'
        }];
        const key = "restaurantB";
        const cache = new Cache();
        cache.addRequest(key, venue);
        const response = cache.getRequest(key);
        expect(venue).toEqual(response);
    });

    test('will remove item from local storage', () => {
        const venue = [{
            categories: [{ shortName: "short name", id: "id" }],
            id: 'venue id',
            location: {
                formattedAddress: ['address line 1', 'address line 2']
            },
            name: 'burger king'
        }];
        const key = "restaurantC";
        cacheRequest(key, venue);
        const cache = new Cache();
        cache.removeRequest(key);
        const reponse = cache.getRequest(key);
        expect(reponse).toBeUndefined();
    });
})