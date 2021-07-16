# Blockchain
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.1.

## Program Language:
- Main: Typescript 
- Frontend framework: Angular API Service
- Reason: Originally consider using React, but notice that the time should be limited into 2-3 hours. Take the UI into account, have more similar libraries that could be applied. Hope this would not be bothered.

## API
- There's a problem for retrieving for fetching the latest blocks including both `https://blockchain.info/blocks?format=json` and  `https://blockchain.info/blocks/1573858800000?format=json`. The former one seems not crashed, the later one has CORS issue which I spent some time to try on some methods (proxy.config/header/http.get/jsonp) but still can't work.  Thus, here I decide to mock a fetch service by retrieving json data temporarily. Other API such as  `https://blockchain.info/rawblock/$block_hash` , and `https://blockchain.info/rawtx/$tx_hash` works  fine. 

- Construct the backend: `https://blockchain.info/blocks?format=json`, originally think of graphql with node.js. Due to the time limitation, I think the whole backend combineed with databasee would be time consuming. Therefore, here I  directly use the pre-defined one.

## Test
- For unit test, the table could be tested by mocking data. 
- UI
    - Table
        - Create fake data and assign to the datasource (component.fixture) 
        - Check whether the row in table has the right number
    - Table Row 
        - Click thee button, seeing whether the dialog could pop up smoothly
- Service
    - Load block details
        - create dummyPost got from the previous api call
        - call the service and compare the two object. Ex: expect(result).toEqual(dummyPost)

## Cashing
- DataStorage
    - An extra service that used in the local storage could be applied.  When getting the data from Http API, the item could be saved using function `localStorage.setItem(key, data)`
    - There would be a pre-defined time for the localStorgae, and before the storage become invalid, the item could always being retrieved using `localStorage.getItem(key)`

## Extra
- The transaction details are implemented but not displayed, think it would be better to do a chart instead of statisics here(originally spand the tab).

## Run the Project
-  Development server
    - Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

- Build
    - Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

- Running unit tests
    - Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

- Running end-to-end tests
    - Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

