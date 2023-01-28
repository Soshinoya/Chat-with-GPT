import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useCustomModal from "../hooks/useCustomModal/useCustomModal"
import Button from "../components/Button/Button"

import abstractWelcome from "./../images/abstract-welcome.jpg"

const Home = () => {

    const navigate = useNavigate()
    
    const successModalParams = {
        title: 'Authorized',
        closable: true,
        content: (
            <div className="custom-modal">
                <h2 className="custom-modal__title title">You already logged in! Click "ok" to redirect to the chat</h2>
            </div>
        ),
        footerButtons: [
            { text: 'Ок', afterClick: () => navigate('/chat') },
            { text: 'Cancel', afterClick: 'close' }
        ]
    }

    const toBeInLocalStorage = key => {
        const ls = localStorage.getItem(key)
        const parsedLs = JSON.parse(ls)
        if (parsedLs?.uid && parsedLs?.email && parsedLs?.apiKey) return true
        return false
    }

    const [modal, setModal] = useState({})

    const { modalJSX, modalOpen } = useCustomModal(modal)

    useEffect(() => {
        const boo = toBeInLocalStorage('user')
        if (boo) {
            setModal(successModalParams)
            modalOpen()
        } else console.log('unauthorized...')
    }, [])

    return (
        <section className="greeting">
            <div className="container">
                <div className="greeting__inner">
                    <div className="greeting-info">
                        <div className="greeting-info__img">
                            <img src={abstractWelcome} alt="welcome" />
                        </div>
                        <h1 className="title greeting-info__title">
                            Welcome!
                        </h1>
                        <p className="greeting-info__text">
                            В апреле 2014 года компания Facebook объявила, что отключит возможность отправки текстовых сообщений из своего основного сотового приложения «Facebook», вынудив пользователей скачать и установить Facebook Messenger.
                        </p>
                        <div className="greeting-info__btns">
                            <Link className="link" to="login">
                                <Button className="button--main w-auto">
                                    Go to login!
                                </Button>
                            </Link>
                            <h2 className="d-none d-md-block">or</h2>
                            <Link className="link" to="register">
                                <Button className="button--main w-auto">
                                    Go to register!
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {modalJSX}
        </section>
    )
}

export default Home