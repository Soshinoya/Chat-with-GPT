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
                const response = await this.getResponseFromGPT(userText)
                resolve({ response, userText, userDate })
            } catch (error) {
                reject(error)
            }
        })
            .then(({ response, userText, userDate }) => {

                const responseDate = `${new Date().getHours()}:${new Date().getMinutes()}`

                const responseObjects = response.data.choices.map(o => {
                    return { from: 'chat', content: o.text, date: responseDate }
                })

                const userMsg = { from: 'me', content: userText, date: userDate }

                this.uploadMessages([userMsg, ...responseObjects])

                return responseObjects

            })
    }

    static getResponseFromGPT(text) {
        return new Promise(async (resolve, reject) => {
            const { Configuration, OpenAIApi } = require('openai');

            const configuration = new Configuration({
                apiKey: openaiApiKey,
            });

            const openai = new OpenAIApi(configuration);

            try {
                const response = await openai.createCompletion({
                    model: 'text-davinci-003',
                    prompt: text,
                    temperature: 0.7,
                    max_tokens: 512,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
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