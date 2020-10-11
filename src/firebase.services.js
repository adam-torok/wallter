import * as firebase from "firebase";

var firebaseConfig = {
  // TODO: All of these should be a .env file 🤘🏼
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
    .then(function() {})
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

export async function getDataFromUser(userId) {
  await db
    .collection("users")
    .doc(userId)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        console.log(doc.data()); //Testing porpuses
      }
    });
}

export async function signIn(userEmail, userPassword) {
  try {
    await auth.signInWithEmailAndPassword(userEmail, userPassword);
    return true;
  } catch (error) {
    console.log(error.code); // Testing porpuses
    return false;
  }
}

export async function getSpecificSpendings(userId, type) {
  var spendings = await db
    .collection("users")
    .doc(userId)
    .collection("transactions")
    .where("category", "==", type)
    .where("type", "==", "Expense")
    .get();
  return spendings.docs.map((doc) => {
    return doc.data().value;
  });
}

export async function sendPasswordResetLink(userEmail) {
  auth
    .sendPasswordResetEmail(userEmail)
    .then(function() {
      alert("email sent!");
    })
    .catch(function(error) {
      alert(error);
    });
}

export async function getTransactions(userId, order) {
  let transactions = await db
    .collection("users")
    .doc(userId)
    .collection("transactions")
    .orderBy(order, "asc")
    .get();
  return transactions.docs.map((doc) => doc.data());
}

export function makeTransaction(userId, value, type) {
  let userRef = db.collection("users").doc(userId);
  userRef.get().then(function(doc) {
    if (doc.exists) {
      if (type == "Expense") {
        const expense = firebase.firestore.FieldValue.increment(-value);
        userRef.update({
          expensesThisMonth: expense,
          balance: expense,
        });
      } else {
        const addValue = firebase.firestore.FieldValue.increment(value);
        userRef.update({
          incomesThisMonth: addValue,
          balance: addValue,
        });
      }
    }
  });
}

export async function addTransaction(flow, userId) {
  await db
    .collection("users")
    .doc(userId)
    .collection("transactions")
    .add(flow)
    .then(function() {
      makeTransaction(userId, parseFloat(flow.value), flow.type);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}

export function resetUserProgress(userId) {
  let userRef = db.collection("users").doc(userId);
  userRef.get().then(function(doc) {
    if (doc.exists) {
      userRef.update({
        expensesThisMonth: 0,
        incomesThisMonth:0,
        balance: 0,
      });
    }
  });
}

export async function resetProgress(userId) {
  await db
    .collection("users")
    .doc(userId)
    .collection("transactions")
    .get()
    .then((res) => {
      res.forEach((element) => {
        element.ref.delete();
      });
    })
    .then(function() {
      resetUserProgress(userId)
    });
}

export async function signUp(
  userEmail,
  userPassword,
  userName,
  userIncomes,
  userBalance
) {
  try {
    return await auth
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then(
        function(user) {
          db.collection("users")
            .doc(user.user.uid)
            .set({
              uid: user.user.uid,
              name: userName,
              email: userEmail,
              balance: userBalance,
              income: userIncomes,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
          user.user
            .updateProfile({
              displayName: userName,
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
