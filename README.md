### Restaurant List App

Form component that takes a foursquare api ID, secret and search term and returns a list of venues

On clicking on any of the returned venues it will show the categories for the venue as well as the address.

There is front end caching that is built using local storage. There is a class in helper_functions/frontEndCache that handles all of the caching functionality. I thought about potentially using. I thought about using redux but state wouldn't persist on a page refresh so local storage seemed like a better approach. The app will read from the cache for upto 5 minutes after the first request, then it will bypass it.

Testing is done using jest, unfortunately I didn't have enough time to do full test coverage so I've only covered tests for the caching class.

start up the dev server with 'npm run start:dev'
run the test with 'npm run test'

Styling is done using Sass. I've also used MiniCssExtractPlugin to break the styling out into its own css file rather than being bundled into the javascript bundle.

# Next Steps

More test coverage

Form validation

Improved error handling

