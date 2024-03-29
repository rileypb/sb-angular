

fs = require('fs')
// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.ts';
const targetPathProd = './src/environments/environment.prod.ts';
// Load node modules
const colors = require('colors');
require('dotenv').load();
// `environment.ts` file structure
const envConfigFile = `import {CacheLocation} from '@auth0/auth0-spa-js/src/global';
   export const environment = {
   apiBaseUrl: '${process.env.API_BASE_URL || "http://localhost:3000"}',
   cableUrl: '${process.env.CABLE_URL || "ws://localhost:3000/cable"}',
   production: '${process.env.PRODUCTION || false}',
   auth: {
   	domain: '${process.env.domain}',
   	clientId: '${process.env.clientId}',
   	audience: '${process.env.audience}',
   	redirectUri: window.location.origin,
    useRefreshTokens: true,
    cacheLocation: <CacheLocation>'localstorage',
   },
   httpInterceptor: {
   	allowedList: [\`${process.env.apiUri}/*\`],
   },
};
`;
console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));
if (!fs.existsSync('./src/environments')) {
   fs.mkdirSync('./src/environments');
}
fs.writeFile(targetPath, envConfigFile, { flag: 'w' }, function (err) {
   if (err) {
       throw console.error(err);
   } else {
       console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
   }
});
fs.writeFile(targetPathProd, envConfigFile, { flag: 'w' }, function (err) {
   if (err) {
       throw console.error(err);
   } else {
       console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPathProd} \n`));
   }
});