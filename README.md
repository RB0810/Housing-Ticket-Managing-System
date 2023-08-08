# Getting Started with the Housing Portal
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Before using the application, please ensure to create your own Supabase URL and key as well as provide your email in a .env file. The format of the .env file is as follows :\
REACT_APP_SUPABASE_KEY = {insert key here}\
REACT_APP_SUPABASE_URL = {insert url here}\
REACT_APP_EMAIL = {insert email here}

## Available Scripts

In the project directory, you can run:

### `npm install`

This ensures that all dependencies are installed correctly. This should be done after cloning the repository.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Testing Scripts

In the project directory, there are various tests you can run. S

ince 2FA and cookies are optional implmenetations that were done immediately after Client Meeting, the tests mainly focus on the function of the portal based on the requirements stipulated by client as must-haves. 

### `git checkout system-tests-without-2fa`
To begin testing, you can switch to the above branch which will be the testing branch for all required features which will include all unit tests, integration tests as well as system tests.

### `npx jest file_path_of_test`
For unit and integration testing, locate the .test.js files for each manager to run the unit tests/integration tests individually. 

For the unit tests of our managers, you can run: \
Ticket Manager: npx jest src/managers/ticketmanager.test.js \
Notification Manager: npx jest src/managers/notificationmanager.test.js \
Authentication Manager: npx jest src/managers/authentication.test.js \
Account Manager: npx jest src/managers/accountmanager.test.js 

For the unit tests of our UI components, you can run:

For the integration tests, you can run:

### `npx cucumber-js file_path_of_feature`
For system testing, locate the .feature files of each portal. This uses Selenium to run the system tests of each portal.

We also have some fuzzing tests. 
You can run:
