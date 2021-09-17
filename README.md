# VC
> author: ju huang hua


## Program Language:
- Language: typescript/python 
- Frontend: angular Framework service
- Backend: python with flskr framework
- Database: mysql 
- Reason: Originally consider using React, but notice that the time should be limited into 3 days, and focus on system sctruture, decide to use a more familiar framework and focus on data content.

## Run the Project
- Backend Server(for api and access database)
    - switch to `backend` folder
    - Run `sh server.sh` if first use
    - If not first use
        - activate virtualenv: `source ./virtual-env/bin/activate`
        - start app: `flask run --host=0.0.0.0` 
    - **Notice**
        - If not choose manually input, it would directly use default value for the database criteria

- Frontend
    - switch to `frontend` folder
    - run `npm install`
    - run `npm start`

## Operations
- Create application(configuration)
    - Add the new configuration by clicking the `create`
- Update configuration
    - Change the settings of configurations by clicking the setting icon(beside general information)
- View configuration update history(delta list)
    - View all the updates by clicking certain configuration(row item) in the main table
- View certain change
    - View selected update by clicking certain delta(row item) in the updates(table)
- Return to home page
    - Click home icon to return to home page



## Simple Test Case
- Frontend
    - UI: For unit test, the table could be tested by mocking data. 
        - Table
            - Case: Create item 
            - Expect: The display (component.fixture) of the row in table should increase(the right number)
        - Child component
            - Case: Click the selector(table row/configuration setting/create application)
            - Expect: The dialog should pop up smoothly
    - Service: Synchronization is the main point
        - Initialization
            - Case: Load configuration lists/delta
            - Expect: main page should has trustworthy items displaying in tables
        - Basic for save/insert function 
            - Case: create dummyPost for defined data entity, call the service 
            - Expect: compare the two object. Ex: expect(result).toEqual(dummyPost)
        - **Synchronization**
            - Case: change the configuration content
            - Expect: 
                - change history(delta list) automatically increase, the content of the added item is the changed information
                - the settings of configuration should be updated automatically(e.g. latest update time)

## Further Improvement
- Website dataStorage
    - An extra service that used in the local storage could also be applied.  When getting data from Http API, the item could be saved using `localStorage.setItem(key, data)` or `sessionStorage.setItem(key, data)`
    - There would be a pre-defined time for the localStorgae, and before the storage become invalid, the item could always being retrieved using `localStorage.getItem(key)`

- Error handling
    - Warning/error notification from both backend/frontend should be displayed on the page
    
- Create configuration
    - The number of roles with permission are pre-defined, should be changed to flexible added/deleted



