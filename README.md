# star-wars-coda

SW coda showcases Star Wars people and planets using Vue 3 with typescript. It allows the user to sort, search and paginate through fetched data. It's built with modular architecture and generic, flexible components, designed with scalability and maintainability in mind.  

## Project Setup

Requires node 20+. To run the app, execute: 

```sh
npm install
npm run dev
```

The app will run at `http://localhost:5173`. 

## Testing

Unit tests run with Vitest + Vue test utils

```sh
npm run test:unit
```

e2e test run with Playwright. Please, make sure the server is running before initializing. 

```sh
npm run test:e2e
```

## Technical decisions

- Vue 3 + Vite, using CAPI with setup in the script tag as recommended by the official Vue docs. 
- Typescript to improve typing, with class-transformer to use more javascript friendly naming conventions
- Vue Router 4 for routing management
- Pinia as state management (only used to manage error notifications)
- Used lodash and Vue Use to avoid recoding reusable utilities, as those libraries are reliable and consistent
- Styled with SCSS, applying variables and mixins to make sure the styling was consistent
- BEM for styling class naming to ensure maintainable and semantic class naming 
- MVC architecture, with separated views, logic and data handling 
- 
