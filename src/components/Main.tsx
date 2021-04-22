import React, { useState } from 'react';
import Form from './Form';
import Venue from './Venue';
import {IVenues} from '../types';

type restaurantsType = Array<IVenues>;

// main component that displays the form and the restaurants list
const main = (): React.ReactElement => {
    const [restaurants, setRestaurants] = useState<restaurantsType>([]);
    return <div>
        <h1 className="header">Find a restaurant</h1>
        <Form updateRestaurants={setRestaurants}/>
        { restaurants && restaurants.length ? restaurants.map(({ id, name, location, categories }) => {
            return <Venue key={id} name={name} address={location.formattedAddress} categories={categories} /> }) : ''
        }
    </div>;
}

export default main;