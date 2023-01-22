import { getDatabase, ref, onValue } from "firebase/database";

export default class ChatService {
    static getMessages() {
        const user = localStorage.getItem('user')
        if (user) {
            const { uid } = JSON.parse(user)

            return new Promise((resolve, reject) => {
                const db = getDatabase()
                onValue(ref(db, 'users/' + uid), snapshot => {
                    const data = snapshot.val()
                    resolve(data.email)
                })
            })
        } else {
            return Promise.resolve(<p class="error">Error {user?.error}</p>)
        }
    }
}