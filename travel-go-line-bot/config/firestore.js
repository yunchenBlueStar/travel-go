const admin = require("firebase-admin");
const serviceAccount = require("./travel-rego-firebase-adminsdk-5yu3d-60f544b0da.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
