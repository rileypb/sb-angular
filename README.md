# Scrumboard (Angular UI)

This is the front end for Scrumboard. Good to see you!

## Development server

Before running, you'll need to set up some environment variables (shown here with default values):

```
   API_BASE_URL=http://localhost:3000
   CABLE_URL=ws://localhost:3000/cable
   PRODUCTION=false
   domain
   clientId
   audience
   apiUri=http://localhost:3000/api
```

The value 'domain', 'clientId', and 'audience' relate to Auth0 authentication. You'll need to set up an account there to use authentication as-is.

Run `npm run config && ng s` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Authentication

API authentication to the backend (project sb-rails) is JWT-based. Currently the only auth option is through Auth0. It's easy to set up a free account with them, but you can substitute other options if you like. Feel free to contribute your auth alternatives!

## API

For this project to be useful, you'll also need to clone and run [sb-rails](https://github.com/rileypb/sb-rails). More information about setting up Scrumboard can be found in the README there.
