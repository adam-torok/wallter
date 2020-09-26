import * as firebase from "firebase";

var firebaseConfig = {
  // All of these should be a .env file 🤘🏼
  apiKey: "AIzaSyAyQF7etoEgbfi0EyRnIiuB3RUB5yRFUck",
  authDomain: "wallter-f403f.firebaseapp.com",
  databaseURL: "https://wallter-f403f.firebaseio.com",
  projectId: "wallter-f403f",
  storageBucket: "wallter-f403f.appspot.com",
  messagingSenderId: "752537461395",
  appId: "1:752537461395:web:9d1b9440db415f48eda366",
};

firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();
var db = firebase.firestore();

export function deleteAccount(uid) {
  db.collection("users")
    .doc(uid)
    .delete()
    .then(function() {})
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });
}

export function signOut() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      console.log("signed out");
    })
    .catch(function(error) {
      console.log(error);
    });
}

export async function getCurrentUser() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      return user;
    } else {
      return false;
    }
  });
}

export async function getDataFromUser(uid) {
  await db
    .collection("users")
    .doc(uid)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        console.log(doc.data());
      }
    });
}

export async function signIn(email, password) {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    return true;
  } catch (error) {
    console.log(error.code);
    return false;
  }
}

export async function getTransactions(userId) {
  let transactions = await db
    .collection("users")
    .doc(userId)
    .collection("transactions")
    .get();
  return transactions.docs.map((doc) => doc.data());
}

export function makeTransaction(uid, value, type) {
  let userRef = db.collection("users").doc(uid);
  userRef.get().then(function(doc) {
    if (doc.exists) {
      if (type == "Expense") {
        const expense = firebase.firestore.FieldValue.increment(-value);
        userRef.update({
          balance: expense,
        });
      } else {
        const addValue = firebase.firestore.FieldValue.increment(value);
        console.log("Add " + addValue);
        userRef.update({
          balance: addValue,
        });
      }
    }
  });
}

export async function addTransaction(flow, uid) {
  await db
    .collection("users")
    .doc(uid)
    .collection("transactions")
    .add(flow)
    .then(function() {
      makeTransaction(uid, parseFloat(flow.value), flow.type);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}

export async function signUp(email, password, name, incomes, balance) {
  try {
    return await auth.createUserWithEmailAndPassword(email, password).then(
      function(user) {
        db.collection("users")
          .doc(user.user.uid)
          .set({
            uid: user.user.uid,
            name: name,
            email: email,
            balance: balance,
            income: incomes,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
        user.user
          .updateProfile({
            displayName: name,
          })
          .then(
            function() {
              return true;
            },
            function() {
              return false;
            }
          );
      },
      function(error) {
        var errorCode = error.code;
        if (errorCode == "auth/email-already-in-use") {
          alert("The email is already used.");
        }
        if (errorCode == "auth/weak-password") {
          alert("The password is too weak.");
        } else {
          console.error(error);
        }
        return false;
      }
    );
  } catch (error) {
    console.log(error);
    return false;
  }
}
