interface ICategories {
    shortName: string
    id: string
}

interface IVenues {
    categories: Array<ICategories>
    id: string
    location: {
        formattedAddress: string[]
    }
    name: string
}

export {
    ICategories,
    IVenues
}
