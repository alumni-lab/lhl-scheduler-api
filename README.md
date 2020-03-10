# USE THIS TEMPLATE TO SETUP NODE JS SERVER

## Basic SERVER Setup
After cloning or downloading the repo, go inside it and run the following:
```
npm install
```
- Create a .env file and follow the env.example file
- If starting LIVE server (uses nodemon) 
```
npm run local
```
- If starting STATIC server (does not use nodemon) 
```
npm start
```
## READ AND DELETE THE COMMENTS AS YOU SEEM FIT.
## Database setup
- Get DB credetials and follow the env.example on setting up the environment variables.
- After setting the .env file with db credentials, UNCOMMENT the db section in the server.js file

## OAUTH WITH GOOGLE AUTHENTICATION
- Go to https://console.developers.google.com/
- Create a new project
- Create credentials ==> OAuth Client ID
- Authorized JavaScript origins --> http://localhost:8001
- Authorized redirect URI --> http://localhost:8001/users/auth/google/callback (change redirect URI as long as it corresponds to passport config)
- Install dependencies using ``` npm i ```

## File Organization
### ROUTING
- Routes folder contains all the routes for all specific paths.
e.g- sampleRoutes.js contains all the path related to localhost:8001/sample
- Service folder contains all the complex business logic for paths defined in routes.
- Repository folder contains query statements to interact ONLY with the DATABASE.
### PAGES
- Views folder contain all the ejs files that are used to render as the url hits a specific path.
e.g- localhost:8001/ is the main landing page which renders the index.ejs
### LIB
- Holds the logic of how the database acquirs its credentials from env variables.
### DB
- Contains the database schema, seeds and the db reset instructions
