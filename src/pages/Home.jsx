import { Link } from "react-router-dom"
import Button from "../components/Button/Button"
import abstractWelcome from "./../images/abstract-welcome.jpg"

const Home = () => {
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
        </section>
    )
}

export default Home