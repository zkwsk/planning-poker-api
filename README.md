# Planning Poker API

## Exercise

Build a frontend application for a Planning Poker app as outlined in these sketches:

https://www.figma.com/file/WUq4MeqQ08zKTJYy7tsY4s/Planning-poker-exercise?node-id=0%3A1&t=471lXRUFTASC5noX-1

Build the screens and the logic outlined in the sketches above. The exact styling (i.e. colors, fonts, spacing) is not important. You should, however, take use on mobile devices into consideration. If you want to be creative you are welcome to do your own take on making things pretty, but do it as the last step as it is not important for this exercise.

The most important part is being able to demonstrate how to fetch data from the supplied API and structure the application logic around that data, so to prioritize your work I suggest starting with screens 4-9 in the sketches above.

The application should be built with Next.js, Typescript. We recommend using Apollo Client for GraphQL requests, as this is what we use in our main project, but you are welcome to choose another direction if you see a better fit with the task at hand. 

The main game screen (i.e. `/planning-session/[session-id]`) should be statically rendered with incremental static revalidation (https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration).  It is up to you to decide if the full page should be static rendered or some elements should be lazy loaded. The application should be deployed to Vercel.

## Running the API

1. Clone this repository
2. Install and run the server

```
yarn && yarn start
```

3. Launch the browser on `http://localhost:4000`

The API is self-documenting, so use the interface to explore the available endpoints.

Note that the API does not have a persistent layer, so all data is stored in memory and lost when you restart the server.
