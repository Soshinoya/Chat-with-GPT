import { initializeApp } from "firebase/app"
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAXxIkNPWDVSICX0FstrLvKwqmQMIh_LjY",
    authDomain: "chat-with-gpt-9a36f.firebaseapp.com",
    databaseURL: "https://chat-with-gpt-9a36f-default-rtdb.firebaseio.com",
    projectId: "chat-with-gpt-9a36f",
    storageBucket: "chat-with-gpt-9a36f.appspot.com",
    messagingSenderId: "792085996914",
    appId: "1:792085996914:web:dd6eea3411a0081627a9eb"
};

const app = initializeApp(firebaseConfig)

const auth = getAuth();

export default class Auth {

    static loginHandler(e) {
        e.preventDefault()
        const { target } = e
        const email = target.elements.email.value
        const password = target.elements.password.value
        // Очистить поля формы после присваивания переменным значений

        return signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                localStorage.setItem('user', JSON.stringify(user))
                return true
            })
            .catch(error => {
                const errorMessage = error.message;
                console.log(errorMessage);
                return false
            });
    }

    static registerHandler(e) {
        e.preventDefault()
        const { target } = e
        let name = target.elements.name.value
        let surname = target.elements.surname.value
        let email = target.elements.email.value
        let password = target.elements.password.value
        // Очистить поля формы после присваивания переменным значений

        return createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                const userId = user.reloadUserInfo.localId
                const db = getDatabase();
                set(ref(db, 'users/' + userId), {
                    name,
                    surname,
                    email,
                    messages: [
                        { from: 'chat', content: `Welcome to the chat, ${name}!` }
                    ]
                });
                target.elements.name.value = ''
                target.elements.surname.value = ''
                target.elements.email.value = ''
                target.elements.password.value = ''
                return true
            })
            .catch(({ code }) => code)
    }

}