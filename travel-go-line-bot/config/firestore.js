const serviceAccount = require("./travel-rego-firebase-adminsdk-5yu3d-60f544b0da.json");
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const firestore = admin.firestore();
module.exports = firestore;
