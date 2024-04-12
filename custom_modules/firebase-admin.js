const admin = require('firebase-admin');
const familyfinanceServiceAccount = require('../data/family-expense-tracker-4d9fb-firebase-adminsdk-d45w8-94a79d0e6a.json')

const userApp=admin.initializeApp(
    {
        credential:admin.credential.cert(familyfinanceServiceAccount),
    },
);

module.exports.userApp = userApp;