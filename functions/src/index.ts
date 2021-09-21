import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
import assert from 'assert';

let app = admin.initializeApp();

const database = admin.firestore(app);

// https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0#update_fields_in_nested_objects
export const nestedProperty = functions.https.onRequest(async (req, res) => {
    await database.collection('tests').doc('12345').set({ 
      top: {
        a: 1,
        b: 2
      }
    })

    const data1 = await (await database.collection('tests').doc('12345').get()).data();

    console.log('data1', data1);

    assert.equal(data1?.top.a, 1);
    assert.equal(data1?.top.b, 2);

    await database.collection('tests').doc('12345').set({ 
      'top.a': 3,
      'top.b': 4,
    })
    
    const data2 = await (await database.collection('tests').doc('12345').get()).data();

    console.log('data2', data2);

    assert.equal(data2?.top.a, 3);
    assert.equal(data2?.top.b, 4);

    res.send(data2);
});
