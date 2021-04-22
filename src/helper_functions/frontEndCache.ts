import {IVenues} from '../types';

const CACHE_INVALIDATION_TIME = 5 * 60 * 1000;

type requestHashType = { [key: string]: string };

// Cache class used to handle search results and place in local storage
class Cache {
    private reqestHash: requestHashType;
    constructor() {
        // On creating a cache instance it will check local stoarage for a reference of the cached requests
        // The requestHash object uses the request search term as the key and the timestamp as the value
        // The request result iteself will be stored in local storage with a key of ${search term}-${timestamp}
        const hashOnPageLoad = JSON.parse(window.localStorage.getItem('requestHash') || '{}');
        this.reqestHash = hashOnPageLoad;
    }

    // Function takes a search term and will return cached results if exists and within 5 minutes
    getRequest(cacheKey: string) {
        if(this.reqestHash[cacheKey]) {
            const oldestCacheTime = new Date().getTime() - CACHE_INVALIDATION_TIME;
            const timeStamp = this.reqestHash[cacheKey];

            // Remove search term from cache if it's been 5 minutes
            if((parseInt(timeStamp) - oldestCacheTime) < 0) {
                this.removeRequest(cacheKey);
                return;
            }
            const cachedRequest = window.localStorage.getItem(`${ cacheKey }-${ timeStamp }`) || '[]';
            const request = JSON.parse(cachedRequest);
            return request;
        }
        return;
    }

    // Function takes search term and values as arguments and stores them in local storage
    addRequest(cacheKey: string, data: IVenues[]) {
        const date = new Date();
        window.localStorage.setItem(`${cacheKey}-${date.getTime()}`, JSON.stringify(data));
        this.reqestHash = Object.assign(this.reqestHash, {
            [cacheKey]: date.getTime() 
        });
        window.localStorage.setItem('requestHash', JSON.stringify(this.reqestHash));
    }

    // function takes search term and removes it from local storage
    removeRequest(cacheKey: string) {
        const hash = this.reqestHash;
        if(!hash) {
            return;
        }
        // first it checks if the search term is in the request hash table
        const timestamp = hash[cacheKey];

        //if it returns a timestamp it will proceeed to remove it from local storage
        if(timestamp) {
            window.localStorage.removeItem(`${cacheKey}-${timestamp}`);
            delete hash[cacheKey];
            this.reqestHash = hash;
            window.localStorage.setItem('requestHash', JSON.stringify(hash));
        }
    }
}

export default Cache;