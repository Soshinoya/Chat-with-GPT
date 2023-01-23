import { getDatabase, ref, onValue, update } from 'firebase/database';

export default class ChatService {
    static getMessages() {
        const user = localStorage.getItem('user')
        if (user) {
            const { uid } = JSON.parse(user)

            return new Promise((resolve, reject) => {
                const db = getDatabase()
                onValue(ref(db, 'users/' + uid), snapshot => {
                    const data = snapshot.val()
                    resolve(data)
                })
            })
        } else {
            return Promise.resolve(<p class='error'>Error {user?.error}</p>)
        }
    }
    static onSubmit(e) {
        return new Promise(async (resolve, reject) => {
            const userText = e.target.elements.text.value
            const response = await this.getResponseFromGPT(userText)
            resolve({ response, userText })
        })
            .then(({ response, userText }) => {

                const resObjects = response.data.choices.map(o => {
                    return { from: 'chat', content: o.text }
                })

                const userMsg = { from: 'me', content: userText }

                this.uploadMessages([userMsg, ...resObjects])

                return resObjects

            })
            .catch(console.log)
    }
    static getResponseFromGPT(text) {
        return new Promise(async (resolve, reject) => {
            const { Configuration, OpenAIApi } = require('openai');

            const configuration = new Configuration({
                apiKey: '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',
            });
            const openai = new OpenAIApi(configuration);

            const response = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: text,
                temperature: 0.7,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            })

            resolve(response)
        })
    }
    static uploadMessages(uploadArr) {
        const user = localStorage.getItem('user')

        const parsedUser = JSON.parse(user)

        const db = getDatabase();

        uploadArr?.forEach(m => update(ref(db, 'users/' + parsedUser.uid + '/messages/' + Date.now()), m))
    }
}