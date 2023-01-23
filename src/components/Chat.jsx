import { useState, useEffect } from "react"
import ChatService from './../service/ChatService'

import Input from "./Input/Input"
import Button from "./Button/Button"

import chatGPTIcon from './../images/chatGPT-icon.png'
import settingIcon from './../images/setting.svg'
import paperPlane from './../images/paper-plane.svg'

const Chat = () => {

    const [isDisabled, setIsDisabled] = useState({
        "text": false
    })

    const [data, setData] = useState({})

    const [messages, setMessages] = useState([])

    useEffect(() => {
        // Если в новом браузере открыть страницу /chat выводиться underfined, underfined
        ChatService.getData()
            .then(data => {
                setData(data)
                return data.messages
            })
            .then(messages => messages && setMessages(Object.values(messages)))
    }, [])

    console.log(messages)

    const submitHandler = e => {
        e.preventDefault()
        setMessages([...messages, { from: 'me', content: e.target.elements.text.value }])
        ChatService.onSubmit(e)
            .then(resObjects => setMessages([...messages, { from: 'me', content: e.target.elements.text.value }, ...resObjects]))
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
                    <div className="chat-main">
                        {typeof messages === 'object' && messages.map((m, i) => {
                            if (m?.from === 'me') {
                                return (
                                    <div className="message message--me" key={i}>
                                        <h4 className="message__title">You</h4>
                                        <div className="message__text">
                                            <p>
                                                {m?.content}
                                            </p>
                                        </div>
                                    </div>
                                )
                            }
                            return (
                                <div className="message" key={i}>
                                    <div className="message__inner">
                                        <div className="message__img">
                                            <img src={chatGPTIcon} alt="chatGPT" />
                                        </div>
                                        <div className="message__info">
                                            <h4 className="message__title">ChatGPT</h4>
                                            <div className="message__text">
                                                <p>{m?.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
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