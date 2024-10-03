import { signInWithPopup, User } from "firebase/auth";
import { auth, microsoftProvider } from "../config";

export default class AuthService { 

    static async loginMicrosoft(){
        try {
            const firebaseCredential = await signInWithPopup(auth, microsoftProvider);
            return firebaseCredential.user;
        } catch (error) {
            console.log(error)

            return Promise.reject(error);
        }
    }
}