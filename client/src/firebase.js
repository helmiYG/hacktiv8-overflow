import firebase from "firebase";
// Initialize Firebase
var config = {
    apiKey: "AIzaSyD7C_dlcr43TRrk6yV0orD2BfNd1BitTrg",
    authDomain: "hacktiv8overflow.firebaseapp.com",
    databaseURL: "https://hacktiv8overflow.firebaseio.com",
    projectId: "hacktiv8overflow",
    storageBucket: "hacktiv8overflow.appspot.com",
    messagingSenderId: "403106790897"
};
firebase.initializeApp(config);

var db = firebase.auth()

var provider = new firebase.auth.GoogleAuthProvider();
export default db