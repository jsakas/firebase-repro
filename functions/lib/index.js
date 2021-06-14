"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloPubSub = exports.helloWorld = void 0;
const functions = require("firebase-functions");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});
exports.helloPubSub = functions.pubsub.schedule('0 * * * *').onRun(() => {
    functions.logger.info("Hello PubSub!", { structuredData: true });
});
//# sourceMappingURL=index.js.map