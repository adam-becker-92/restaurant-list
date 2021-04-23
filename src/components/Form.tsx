import React, { useState, FormEvent } from 'react';
import Cache from '../helper_functions/frontEndCache';
import { getRestaurants } from '../helper_functions/apiRequest';
import { IVenues } from '../types';

interface IProps {
    updateRestaurants: (venues: Array<IVenues>) => void
}

interface IFormValues {
    clientId: string
    clientSecret: string
    restaurant: string
}

// form component that initialises the cache, takes the form values and makes the api request on submit
const form = ({ updateRestaurants }: IProps): React.ReactElement => {
    const [values, setValues]= useState<IFormValues>({ clientId: '', clientSecret: '', restaurant: '' });

    // Cache initialised in the state of the function
    const [cache, setCache]= useState<Cache>(new Cache());

    // function makes api call on submit
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const getCachedRestaurants = getRestaurants(cache);
        const {clientId, clientSecret, restaurant} = values;
        const restaurants = await getCachedRestaurants(clientId, clientSecret, restaurant);
        updateRestaurants(restaurants);
    };

    // function updates state with input values
    const updateValue = (label: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedValues = {
            ...values,
            [label]: event.target.value
        };
        setValues(updatedValues);
    }

    return <form className='form' onSubmit={(e) => onSubmit(e)}>
        <label className='form__item'>
            <div className='form__label'>Client ID</div>
            <input className='form__input' type='text' name='clientId' onChange={updateValue('clientId')} id='clientId' />
        </label>
        <label className='form__item'>
            <div className='form__label'>Client Secret</div>
            <input className='form__input' type='text' name='clientSecret' onChange={updateValue('clientSecret')} id='clientsecret'/>
        </label>
        <label className='form__item'>
            <div className='form__label'>Venue</div>
            <input className='form__input' type='text' name='restaurant' onChange={updateValue('restaurant')} id='restaurantSearch'/>
        </label>
        <button className='form__submit' type='submit'>Search</button>
    </form>;
}

export default form;