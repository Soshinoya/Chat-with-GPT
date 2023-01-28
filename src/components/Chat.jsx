import { useRef, useState, useEffect } from "react"
import ChatService from './../service/ChatService'

import TypeAnim from './TypeAnim/TypeAnim'
import Input from "./Input/Input"
import Button from "./Button/Button"

import chatGPTIcon from './../images/chatGPT-icon.png'
import settingIcon from './../images/setting.svg'
import paperPlane from './../images/paper-plane.svg'

const Chat = () => {
    const chatMain = useRef(null)

    const [isDisabled, setIsDisabled] = useState({ "text": false })

    const [isLoading, setIsLoading] = useState(false)

    const [data, setData] = useState({})

    const [messages, setMessages] = useState([])

    const scrollToBottom = block => {
        if (block.current === null) return
        block.current.scrollTop = block.current.scrollHeight
    }

    useEffect(() => chatMain?.current !== null && scrollToBottom(chatMain), [messages])

    useEffect(() => {
        // Если в новом браузере открыть страницу /chat выводиться underfined, underfined
        setIsLoading(true)
        ChatService.getData()
            .then(data => {
                setData(data)
                return data.messages
            })
            .then(messages => messages && setMessages(Object.values(messages)))
            .finally(() => setIsLoading(false))
    }, []);

    const submitHandler = e => {
        e.preventDefault()
        const date = `${new Date().getHours()}:${new Date().getMinutes()}`
        const myMsg = { from: 'me', content: e.target.elements.text.value, date }
        setMessages([...messages, myMsg])
        setIsLoading(true)
        ChatService.onSubmit(e, date)
            .then(responseObjects => setMessages([...messages, myMsg, ...responseObjects]))
            .finally(() => setIsLoading(false))
    }

    return (
        <section className="chat">
            <div className="container">
                <div className="chat__inner position-relative">
                    <div className="chat-header">
                        <div className="chat-header__inner">
                            <div className="chat-header__user">
                                <div className="chat-header__img">
                                    <img src={chatGPTIcon} alt="chatGPT" />
                                </div>
                                <div className="chat-header__info">
                                    <h3 className="chat-header__title">
                                        ChatGPT
                                    </h3>
                                    <p className="chat-header__desc">
                                        Artificial intelligence chatbot
                                    </p>
                                </div>
                            </div>
                            <div className="chat-header__icon">
                                <img src={settingIcon} alt="settings" />
                            </div>
                        </div>
                        <div className="chat-header__line"></div>
                    </div>
                    <div ref={chatMain} className="chat-main">
                        {typeof messages === 'object' && messages.map((m, i) => {
                            if (m?.from === 'me') {
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
                                                <p>{m?.content}</p>
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
                                <div className="chat-footer__img">
                                    <img src={paperPlane} alt="" />
                                </div>
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Chat