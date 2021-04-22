import React, { useState } from "react";
import { ICategories } from '../types';

interface IProps {
    name: string;
    address: string[];
    categories: ICategories[];
}

// component thats used to display each of the venue items in the api response 
const venue = ({ name, address, categories }: IProps): React.ReactElement => {
    const [showVenue, toggleVenue] = useState(false);
    return <div className="venue">
        <div className="venue__display" onClick={() => toggleVenue(!showVenue)}>
            { name }
            <div className={`venue__dropdown venue__dropdown--${ showVenue ? 'show' : 'hide' }`}></div>
        </div>
        {showVenue && <div className="venue__details">
            <div className="venue__categories">
                { categories.length && <>
                    <div className="venue__label">Categories</div>
                    {categories.map(({shortName, id}) => <div key={id} className="venue__category">{ shortName }</div>) }
                </>
                }
            </div>
            <div className="venue__address">
                <div className="venue__label">Address</div>
                {address.map((line, index) => <div key={index} className="venue__address-line">{ line }</div>)}
            </div>
        </div>}
    </div>;
}

export default venue;