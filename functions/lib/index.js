"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nestedProperty = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const assert_1 = __importDefault(require("assert"));
let app = admin.initializeApp();
const database = admin.firestore(app);
// https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0#update_fields_in_nested_objects
exports.nestedProperty = functions.https.onRequest(async (req, res) => {
    await database.collection('tests').doc('12345').set({
        top: {
            a: 1,
            b: 2
        }
    });
    const data1 = await (await database.collection('tests').doc('12345').get()).data();
    console.log('data1', data1);
    assert_1.default.equal(data1 === null || data1 === void 0 ? void 0 : data1.top.a, 1);
    assert_1.default.equal(data1 === null || data1 === void 0 ? void 0 : data1.top.b, 2);
    await database.collection('tests').doc('12345').set({
        'top.a': 3,
        'top.b': 4,
    });
    const data2 = await (await database.collection('tests').doc('12345').get()).data();
    console.log('data2', data2);
    assert_1.default.equal(data2 === null || data2 === void 0 ? void 0 : data2.top.a, 3);
    assert_1.default.equal(data2 === null || data2 === void 0 ? void 0 : data2.top.b, 4);
    res.send(data2);
});
//# sourceMappingURL=index.js.map