export const environment = {
   apiBaseUrl: 'http://localhost:3000',
   cableUrl: 'ws://localhost:3000/cable',
   production: 'false',
   auth: {
   	domain: 'dev-rijos-fj.us.auth0.com',
   	clientId: 'Udyb5CrDo4qSqAN6ifBHHth8WIWP74Tx',
   	audience: 'https://rileypb.com/scrumboard',
   	redirectUri: window.location.origin,
   },
   httpInterceptor: {
   	allowedList: [`http://localhost:3000/*`],
   },
};
