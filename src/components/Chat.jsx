import { useRef, useState, useEffect } from "react"

import ChatService from './../service/ChatService'

import useCustomModal from "../hooks/useCustomModal/useCustomModal"

import TypeAnim from './TypeAnim/TypeAnim'
import Input from "./Input/Input"
import Button from "./Button/Button"
import AppSettings from "./AppSettings/AppSettings"

import chatGPTIcon from './../images/chatGPT-icon.png'

const Chat = () => {

    const [modal, setModal] = useState({})

    const { modalJSX, modalOpen } = useCustomModal(modal)

    const [settingsOpen, setSettingsOpen] = useState(false)

    const headerIcon = useRef(null)

    const chatMain = useRef(null)

    const [isDisabled, setIsDisabled] = useState({ "text": false })

    const [isLoading, setIsLoading] = useState(false)

    const [data, setData] = useState({})

    const [messages, setMessages] = useState([])

    const scrollToBottom = block => {
        if (block.current === null) return
        block.current.scrollTop = block.current.scrollHeight
    }

    const incorrectApiKeyModalParams = {
        title: 'Incorrect OpenAI Api Key',
        closable: true,
        content: (
            <div className="custom-modal">
                <h2 className="custom-modal__title title">Oops!<br />Try to change or reset api key in settings</h2>
            </div>
        ),
        footerButtons: [{ text: 'Ок', afterClick: 'close' }]
    }

    useEffect(() => chatMain && scrollToBottom(chatMain), [messages])

    useEffect(() => {
        // Если в новом браузере открыть страницу /chat выводиться underfined, underfined
        setIsLoading(true)
        ChatService.getData()
            .then(data => {
                setData(data)
                return data.messages
            })
            .then(messages => messages && setMessages(Object.values(messages)))
            .then(ChatService.getApiKeyFromDB)
            .then(ChatService.setApiKey)
            .finally(() => setIsLoading(false))
    }, []);

    const submitHandler = e => {
        e.preventDefault()
        const date = `${new Date().getHours()}:${new Date().getMinutes()}`
        const myMsg = { role: 'user', content: e.target.elements.text.value, date }
        setMessages([...messages, myMsg])
        setIsLoading(true)
        ChatService.onSubmit(e, date)
            .then(responseObject => setMessages([...messages, myMsg, responseObject]))
            .catch(err => {
                if (typeof err === 'number') {
                    switch (err) {
                        case 401:
                            setModal(incorrectApiKeyModalParams)
                            modalOpen()
                            break;

                        default:
                            console.log(err);
                            break;
                    }
                } else console.log(err)
            })
            .finally(() => setIsLoading(false))
    }

    const headerLinkHandler = () => {
        headerIcon.current.classList.toggle('chat-header__icon--active')
        setSettingsOpen(!settingsOpen)
    }


    return (
        <section className="chat">
            <div className="container">
                <div className="chat__inner position-relative">
                    <div className={`chat-header d-flex flex-column ${settingsOpen ? 'justify-content-center' : 'justify-content-center'}`}>
                        <div className={`chat-header__inner d-flex align-items-center ${settingsOpen ? 'justify-content-end' : 'justify-content-between'}`}>
                            <div className={`chat-header__user ${settingsOpen ? 'd-none' : ''}`}>
                                <div className="chat-header__img">
                                    <img src={chatGPTIcon} alt="chatGPT" />
                                </div>
                                <div className="chat-header__info">
                                    <h3 className="chat-header__title">
                                        ChatGPT
                                    </h3>
                                    <p className="chat-header__desc">
                                        Online
                                    </p>
                                </div>
                            </div>
                            <div className="chat-header__icon" onClick={headerLinkHandler} ref={headerIcon}>
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 18.75C15.9946 18.75 16.9484 18.3549 17.6517 17.6517C18.3549 16.9484 18.75 15.9946 18.75 15C18.75 14.0054 18.3549 13.0516 17.6517 12.3483C16.9484 11.6451 15.9946 11.25 15 11.25C14.0054 11.25 13.0516 11.6451 12.3483 12.3483C11.6451 13.0516 11.25 14.0054 11.25 15C11.25 15.9946 11.6451 16.9484 12.3483 17.6517C13.0516 18.3549 14.0054 18.75 15 18.75Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2.5 16.1V13.9C2.5 12.6 3.5625 11.525 4.875 11.525C7.1375 11.525 8.0625 9.92498 6.925 7.96248C6.275 6.83748 6.6625 5.37498 7.8 4.72498L9.9625 3.48748C10.95 2.89998 12.225 3.24998 12.8125 4.23748L12.95 4.47498C14.075 6.43748 15.925 6.43748 17.0625 4.47498L17.2 4.23748C17.7875 3.24998 19.0625 2.89998 20.05 3.48748L22.2125 4.72498C23.35 5.37498 23.7375 6.83748 23.0875 7.96248C21.95 9.92498 22.875 11.525 25.1375 11.525C26.4375 11.525 27.5125 12.5875 27.5125 13.9V16.1C27.5125 17.4 26.45 18.475 25.1375 18.475C22.875 18.475 21.95 20.075 23.0875 22.0375C23.7375 23.175 23.35 24.625 22.2125 25.275L20.05 26.5125C19.0625 27.1 17.7875 26.75 17.2 25.7625L17.0625 25.525C15.9375 23.5625 14.0875 23.5625 12.95 25.525L12.8125 25.7625C12.225 26.75 10.95 27.1 9.9625 26.5125L7.8 25.275C7.25512 24.9612 6.85698 24.4442 6.69293 23.8372C6.52889 23.2302 6.61235 22.583 6.925 22.0375C8.0625 20.075 7.1375 18.475 4.875 18.475C3.5625 18.475 2.5 17.4 2.5 16.1Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <div className="chat-header__line"></div>
                    </div>
                    <div ref={chatMain} className="chat-main">
                        {typeof messages === 'object' && messages.map((m, i) => {
                            if (m?.role === 'user') {
                                return (
                                    <div className="message message--me position-relative" key={i}>
                                        <h4 className="message__title">You</h4>
                                        <div className="message__text">
                                            <p>{m?.content}</p>
                                        </div>
                                        <span className="message__date">{m?.date}</span>
                                    </div>
                                )
                            }
                            return (
                                <div className="message position-relative" key={i}>
                                    <div className="message__inner">
                                        <div className="message__img">
                                            <img src={chatGPTIcon} alt="chatGPT" />
                                        </div>
                                        <div className="message__info">
                                            <h4 className="message__title">ChatGPT</h4>
                                            <div className="message__text">
                                                <pre>
                                                    {m.content.replace(/(```)[\s\S]*?\1/g, match => match.replace(/```/g, ""))}
                                                </pre>
                                            </div>
                                            <span className="message__date">{m?.date}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        {isLoading && (
                            <div className="message">
                                <div className="message__inner">
                                    <div className="message__img">
                                        <img src={chatGPTIcon} alt="chatGPT" />
                                    </div>
                                    <div className="message__info">
                                        <h4 className="message__title">ChatGPT</h4>
                                        <div className="message__text">
                                            <TypeAnim />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="chat-footer">
                        <form onSubmit={submitHandler} className="chat-footer__form">
                            <Input isDisabled={isDisabled} setIsDisabled={setIsDisabled} type="text" name="text" placeholder="Type a Message" isChatInput required />
                            <Button isDisabled={isDisabled} className="button chat-footer__btn">
                                <div className="chat-footer__img d-flex">
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.0242 17.6009L17.6684 11.9428M7.75169 6.04817L21.1368 1.58783C27.1436 -0.413806 30.4071 2.86446 28.4206 8.86937L23.9589 22.2504C20.9634 31.2499 16.0445 31.2499 13.049 22.2504L11.7247 18.2786L7.75169 16.9547C-1.25056 13.9601 -1.25056 9.0585 7.75169 6.04817Z" stroke="#FBB829" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </Button>
                        </form>
                    </div>

                    {settingsOpen && <AppSettings />}
                </div>
            </div>
            {modalJSX}
        </section>
    )
}

export default Chat