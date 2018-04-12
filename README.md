# Four Function Calculator

This project is an experiment in the use of GraphQL's on-client cache for managing local state.

## Use

Clone the repository and run _yarn install_. Start it with _yarn start_. It's a basic Create-React-App setup.

## Description

One or more calculator faces run in a basic React render tree. They are simple user interfaces with no organic "smarts"; that is provided by a stateless javascript micro-service that has no direct connection with any of the calculator faces. The faces and compute engine communicate indirectly via the Apollo GraphQL client.

Each face has a unique ID that is the primary key for a computation record stored in the ApolloClient in-memory cache. The cache is loaded with a default computation when the Calculator component loads. Each button and display element interacts with this record independently to avoid entangling the operation of the calculators with their render tree. The only setup information required via props is the ID of the computation record in the cache.

The compute engine observes all of the computation records with an observer. This observer is provided by
the ApolloClient via a call to the _watchQuery_ factory method (**see known bugs!!**). Every time a button is "pressed" on a calculator face it updates two properties in the record - the button name goes in the _eventKey_ property and a flag _eventPending_ is set to true. This causes the cache to push an update to the compute engine which then processes the key event and updates the computation state. The calculator display observes the change in state and updates the text in the display window.

The number of calculator faces that can be open simultaneously is arbitrarily large. Since there is only one cursor there are at best only one or two calculators active at a time. The computation records are fairly small so there would be virtually no stress on the cache with even a few million records open at a time.

The computation service is fully stateless. Internally it is composed of pure functions that are composable. The current implementation is a simple four function calculator, but the architecture would support expansion to virtually any form of calculator via function composition.

The display configuration is extremely flexible. Buttons can be re-arranged on a whim with few seconds of cut-and-paste in the editor. The styling is also very easy to modify; all styling is done with a CSS-in-JS styled component package _emotion_.

## Known Issues

This setup has a rather major bug. The observer that the compute engine uses to watch the computations is designed to poll a server periodically for updates. When it does, the first thing it apparently does is wipe out the cache and re-instantiate it with default values. This wipes out all the computation records and lobotomizes the calculators.

This would be almost acceptable if the calculator faces were set up to recover from this loss, but they are _currently_ not set up to do this. The cache records are created by the faces when they are instantiated, so the only way to get the page working again is to reload it.

For this reason the pollInterval for the observer is set to 200,000 ms - long enough for demonstration purposes but certainly not acceptable for even an alpha release. The right solution is to build an observation process for the compute engine that doesn't reset the cache.

## Future directions

It might be fun to implement drag-n-drop in all the components to allow people to assemble their own custom calculators in the browser.
