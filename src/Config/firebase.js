import * as firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDpJSKDW6gxvTWuJOcLyQn958pwUUHDD1g",
  authDomain: "vivero-2afb7.firebaseapp.com",
  databaseURL: "https://vivero-2afb7.firebaseio.com",
  projectId: "vivero-2afb7",
  storageBucket: "vivero-2afb7.appspot.com",
  messagingSenderId: "973384767886",
  appId: "1:973384767886:web:627f7d17648034f46decdf"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;