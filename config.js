import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAwlCixdA8vB7U2B3IaLI3uDeTdV9YlHE4",
    authDomain: "notesapp-c2421.firebaseapp.com",
    projectId: "notesapp-c2421",
    storageBucket: "notesapp-c2421.appspot.com",
    messagingSenderId: "866157382661",
    appId: "1:866157382661:web:fc81498e7d4cf1919c206c"
  }


  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }

  export { firebase };