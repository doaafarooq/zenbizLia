import firebase from 'firebase/app'

require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");
require("firebase/functions");
require("firebase/database");

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyB5mUgMTNXPNT_X6rveLYzPQHL5d-wrceU",
    authDomain: "zebnizlia.firebaseapp.com",
    databaseURL: "https://zebnizlia.firebaseio.com",
    projectId: "zebnizlia",
    storageBucket: "zebnizlia.appspot.com",
    messagingSenderId: "837003098405",
    appId: "1:837003098405:web:617c60a6eb6a38841102cc",
    measurementId: "G-0JHPC1RR08"
  };
  // Initialize Firebase
  const fb= firebase.initializeApp(firebaseConfig);

  const auth=firebase.auth()
  const db=firebase.firestore()
  const storage=firebase.storage()
 
  const functions=firebase.functions()

  export{
      firebase,
      auth,
      fb,
      db,
      storage,
      functions
  }
