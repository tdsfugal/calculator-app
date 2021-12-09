# Four Function Calculator

This project is an experiment in the use of GraphQL's on-client cache for managing local state.

## Use

Clone the repository and run _yarn install_. Start it with _yarn start_. It's a basic Create-React-App setup.

## Description

The architecture consists of a View layer in React, a Model layer in GraphQL (with inMemoryCache for local storage), and a micro-service layer in Vanilla Javascript for business logic.

The View layer consists of a page with a header and one or more calculator faces. These faces are pure View - they are stateless representations of data in the model layer. Each face has a unique ID that is the primary key for a record in the GraphQL cache. This record contains the complete state of the computation, including any pending operations. Clicking on a button posts the operation associated with the button to the calculation state record.

The compute service in the Vanilla Javascript layer watches the GraphQL cache for changes in the computation states. This observer is provided by the ApolloClient via a call to the _watchQuery_ factory method. The service processes each changed record to update the computation state and clear the key-click event.

The calculator display component in the calculator face is wrapped in a Query component that watches for changes in the display string property of the calculation state. On change it passes the new string to the display's view component for presentation. This one-way flow of information creates a very stable user experience.

The View layer is built for extreme modularity. There is virtually no information passed via props. The buttons and display elements are told which calculation ID to participate in, but that's about it. Currently the calculator types use hard-coded layouts, but the architecture is set up for easy migration to a soft-settable UI via configuration objects. Two calculator faces are shown to illustrate this property.

Computationally, there is no issue with an arbitrary number of calculators on the screen. There is only one cursor, so at most there are only a hand full of calculators active at any one time. Even a weak computer would be able to keep up. The computation state is also a fairly small record, so memory is not likely to be an issue. The number of calculator faces that can be open simultaneously is therefore arbitrarily large.

The computation service is fully stateless. There is one observant external interface that operates a set of composable pure functions to resolve pending operations. The current implementation is a simple four function calculator, but the architecture would support expansion to virtually any form of calculator via function composition.

## Future directions

1.  Drag-n-drop calculator assembly - The user will be able to create a customized calculator by pulling elements from a pallet.
2.  Increase computational complexity - Additional composable pure-functions (e.g. sin, cos, 1/x) will be added to the calculator.
3.  Reverse Polish notation - Adding a RPN option requires a stack to the computation state, and ENTER key, and slight modifications to the behavior of the operator buttons that can be triggered with a flag in the computation state.
4.  "Skins" - The current gray-n-black look is my favorite, but kids might like something flashier.
5.  Static file serving - The app has no permanent state and does not require a server, so a static HTML file is just fine.
