import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

const login = async () => {
    try {
        let provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
          });
        await signInWithPopup(getAuth(), provider);
        window.location.reload()
    } catch (err) {
        console.error(err)
    }
}

const logOut = () => {
    signOut(auth)
    window.location.reload()
}


export { login, logOut, auth, db, storage }
