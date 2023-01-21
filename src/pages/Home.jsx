import Login from "../components/Login"

import abstractWelcome from "./../images/abstract-welcome.jpg"

const Home = () => {
    return (
        <section className="greeting">
            <div className="container">
                <div className="greeting-main">
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
                    </div>
                    <div className="greeting-auth">
                        <div className="line"></div>
                        <Login />
                        <div className="line mt-auto"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home