// External Dependencies
global.fetch = require('node-fetch');
const express = require('express');
const universalConfig = require('universal-config');
const Unsplash = require('unsplash-js').default;
const unsplashJsToJson = require('unsplash-js').toJson;

const unsplashEngine = new Unsplash({
  applicationId: universalConfig.get('APPLICATION_ID'),
  secret: universalConfig.get('SECRET'),
  callbackUrl: universalConfig.get('CALLBACK_URL'),
});

const App = express();

// Use async and await here?
App.get('/api/photos', (req, res) => {
  unsplashEngine.photos.listPhotos(1, 30)
    .then(unsplashJsToJson)
    // A better name for json?
    .then(json => res.json(json));
});

const PORT = process.env.PORT || 5000;

App.listen(PORT, () => console.log(`Server started on port ${PORT}`));
