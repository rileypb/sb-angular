# Scrumboard (Angular UI)

This is the front end for Scrumboard. Good to see you!

<img src="https://user-images.githubusercontent.com/311305/111650396-a1f97580-87db-11eb-9dad-bc284b2120b8.png" height="300px">

## About Scrumboard

Scrumboard is a software project management system aimed at teaching Scrum. It aims to be a useful tool for educational institutions, non-profit or otherwise, teaching software engineering classes.

The intent of Scrumboard is to implement a reasonably pure version of Scrum. That said, every instance of Scrum entails choices of how work is recorded, estimated, organized, and so on, so we've had to make some decisions about how implement some dimensions of Scrum.

### What Scrumboard is Not 

Scrumboard is not intended for commercial use. In it present state it doesn't have the power and flexibility to accommodate the many work styles encountered in enterprise software engineering.

## Setting Up

After cloning the repository, install the dependencies with `npm install`.

## Development server

Before running, you'll need to set up some environment variables (shown here with default values):

```
   API_BASE_URL=http://localhost:3000
   CABLE_URL=ws://localhost:3000/cable
   PRODUCTION=false
   domain
   clientId
   audience
   apiUri=http://localhost:3000
```

The value 'domain', 'clientId', and 'audience' relate to Auth0 authentication. You'll need to set up an account there to use authentication as-is.

Run `npm run config && ng s` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Authentication

API authentication to the backend (project sb-rails) is JWT-based. Currently the only auth option is through Auth0. It's easy to set up a free account with them, but you can substitute other options if you like. Feel free to contribute your auth alternatives!

## Setting up Authentication

See the README at [sb-rails](https://github.com/rileypb/sb-rails) for most of the instructions. After setting up the application in Auth0, you can create a .env file in the sb-angular root folder to hold your application information.

For example:
```
domain=my-domain-id.us.auth0.com 
clientId=######################## from the application you set up on Auth0
audience=<The API Audience you set up on Auth0>
apiUri=http://localhost:3000
```

**NOTE:** You should add .env to .gitignore if it's not there already. Your environment variables should not be committed to version control.

## API

For this project to be useful, you'll also need to clone and run [sb-rails](https://github.com/rileypb/sb-rails). More information about setting up Scrumboard can be found in the README there. 

## Licensing

Scrumboard is licensed under GPLv3. This means that you can use this software for any purpose you want, and you can create derivative works, but you must license those derivative works under GPLv3 as well, and share the source code.

We've chosen this license because we want Scrumboard to be a tool for educators, and not the kernel of a proprietary project management product.
