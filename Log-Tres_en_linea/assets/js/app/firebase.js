import { getDatabase } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDVT9_rhep5-OMIn8n0uUuvzDOwE-WnFP4",
    authDomain: "login-firebase-8e211.firebaseapp.com",
    projectId: "login-firebase-8e211",
    storageBucket: "login-firebase-8e211.appspot.com",
    messagingSenderId: "394331577163",
    appId: "1:394331577163:web:f04ff0307a8e083778e6ce"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getDatabase(app);