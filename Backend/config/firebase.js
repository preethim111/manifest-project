import admin from 'firebase-admin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require('/Users/preethimanne/Downloads/manifest-8a55f-firebase-adminsdk-5t3tc-2dd71e160e.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://manifest-8a55f.firebaseio.com"
});

// Export the admin object if needed
export default admin;
