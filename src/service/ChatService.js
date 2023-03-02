import { getDatabase, ref, onValue, update, set } from 'firebase/database';

let openaiApiKey;

export default class ChatService {
    static getData() {
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

    static onSubmit(e, userDate) {
        return new Promise(async (resolve, reject) => {
            const userText = e.target.elements.text.value
            try {
                this.getData()
                    .then(async data => {
                        return await this.getResponseFromGPT(userText, data)
                    })
                    .then(response => {
                        resolve({ response, userText, userDate })
                    })
            } catch (error) {
                reject(error)
            }
        })
            .then(({ response, userText, userDate }) => {

                const responseDate = `${new Date().getHours()}:${new Date().getMinutes()}`

                const responseObject = { ...response.data.choices[0].message, date: responseDate }

                const userMsg = { role: 'user', content: userText, date: userDate }

                this.uploadMessages([userMsg, responseObject])

                return responseObject

            })
    }

    static getResponseFromGPT(text, messagesFromDB) {
        return new Promise(async (resolve, reject) => {
            messagesFromDB.messages
            ? Object.values(messagesFromDB.messages).forEach(msg => delete msg?.date)
            : messagesFromDB.messages = {}

            messagesFromDB.messages[Date.now()] = { role: 'user', content: text }

            const { Configuration, OpenAIApi } = require('openai');

            const configuration = new Configuration({
                apiKey: openaiApiKey,
            });

            const openai = new OpenAIApi(configuration);

            try {
                const response = await openai.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    messages: Object.values(messagesFromDB.messages)
                })
                resolve(response)
            } catch (err) {
                switch (err.message) {
                    case 'Request failed with status code 401':
                        reject(401)
                        break;

                    default:
                        reject(err)
                        break;
                }
            }

        })
    }

    static uploadMessages(uploadArr) {
        const user = localStorage.getItem('user')

        const { uid } = JSON.parse(user)

        const db = getDatabase();

        uploadArr?.forEach(m => update(ref(db, 'users/' + uid + '/messages/' + Date.now()), m))
    }

    static uploadApiKey(e, key) {
        return new Promise(async (resolve, reject) => {
            let apiKey = ''

            if (!key) {
                apiKey = e.target.elements.text.value.trim()
            } else {
                apiKey = key
            }

            const user = localStorage.getItem('user')

            const { uid } = JSON.parse(user)

            const db = getDatabase()

            await set(ref(db, 'users/' + uid + '/openai_api_key'), apiKey)

            resolve(apiKey)
        })
    }

    static setApiKey(apiKey) {
        openaiApiKey = apiKey
    }

    static getApiKeyFromDB(isReset) {
        return new Promise((resolve, reject) => {
            const user = localStorage.getItem('user')

            const { uid } = JSON.parse(user)

            const db = getDatabase()

            const getReserveApiKey = () => {
                return new Promise((resolve, reject) => {
                    onValue(ref(db, 'settings/' + 'reserve_openai_api_key'), async snapshot => {
                        const apiKey = await snapshot.val()
                        await ChatService.uploadApiKey(false, apiKey).then(() => resolve(apiKey))
                    })
                })
            }

            if (isReset) {
                getReserveApiKey().then(reserveKey => resolve(reserveKey))
                return
            }

            onValue(ref(db, 'users/' + uid + '/openai_api_key'), async snapshot => {
                const apiKey = await snapshot.val()
                if (!apiKey) {
                    getReserveApiKey().then(reserveKey => resolve(reserveKey))
                    return
                }
                resolve(apiKey)
            })
        })
    }
}