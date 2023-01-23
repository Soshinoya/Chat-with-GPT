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

    useEffect(() => {
        // Если в новом браузере открыть страницу /chat выводиться underfined, underfined
        ChatService.getMessages().then(setData)
    }, [])

    const submitHandler = e => {
        e.preventDefault()
        const date1 = Date.now()
        data.messages.date1 = { from: 'me', content: e.target.elements.text.value }
        setData({ ...data })
        ChatService.onSubmit(e)
            .then(resObjects => {
                resObjects.forEach(o => {
                    const date = Date.now()
                    data.messages.date = o
                })
                setData({ ...data })
            })
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
                        {data?.messages && Object.values(data.messages).map((m, i) => {
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