// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
    googleAuth: {
        clientID: '122247591538-jut7ak75gtm1uuc6efp6i1cdpkrkoehd.apps.googleusercontent.com',
        clientSecret: 'cpDCXw7FAKsdxfmZDpjuIW3t',
        callbackURL: 'http://localhost:3000/auth/google/callback',
    },

};