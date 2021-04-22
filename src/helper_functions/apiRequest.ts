import Cache from './frontEndCache';
import { IVenues } from '../types';

// curried function that takes cache as first argument and returns another function that expects the api values.
// the function checks the search term in local storage and will returned a cached repsonse if it exists
// if not it will fetch the values from the api endpoint
// on receiving the value it will cache them
const getRestaurants = (cache: Cache) =>  async (CLIENT_ID: string, CLIENT_SECRET: string, venueName: string): Promise<Array<IVenues>> => {
    const cacheResponse = cache.getRequest(venueName);
    if(cacheResponse) {
        return cacheResponse;
    }
    const response= await fetch(`https://api.foursquare.com/v2/venues/search?near=London&query=${ venueName }&client_id=${ CLIENT_ID }&client_secret=${ CLIENT_SECRET }&v=20200226`);
    const data = await response.json();
    const venueList = data.response.venues;
    cache.addRequest(venueName, venueList);
    return venueList;
}

export { getRestaurants };
