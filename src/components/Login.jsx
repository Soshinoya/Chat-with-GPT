import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useCustomModal from './../hooks/useCustomModal/useCustomModal'
import Input from "./Input/Input"
import Button from "./Button/Button"
import Auth from "../service/auth"

const Login = () => {
    const [isDisabled, setIsDisabled] = useState({
        "email": false,
        "password": false
    })

    const [modal, setModal] = useState({})

    const navigate = useNavigate()

    const submitHandler = e => {
        Auth.loginHandler(e)
            .then(res => {
                switch (res) {
                    case true:
                        navigate('/chat')
                        break;

                    case ('auth/user-not-found'):
                        setModal(emailNotFoundModalParams)
                        modalOpen()
                        break;

                    case ('auth/wrong-password'):
                        setModal(invalidPasswordModalParams)
                        modalOpen()
                        break;

                    case ('auth/user-disabled'):
                        setModal(userDisabledModalParams)
                        modalOpen()
                        break;

                    default:
                }
            })
    }

    const emailNotFoundModalParams = {
        title: 'Email not found',
        closable: true,
        content: (
            <div className="custom-modal">
                <h2 className="custom-modal__title title">Oops!<br />Try to register (sign up)</h2>
            </div>
        ),
        footerButtons: [{ text: 'Ок', afterClick: 'close' }]
    }

    const invalidPasswordModalParams = {
        title: 'Wrong password',
        closable: true,
        content: (
            <div className="custom-modal">
                <h2 className="custom-modal__title title">Oops!<br />Incorrect password, try again</h2>
            </div>
        ),
        footerButtons: [{ text: 'Ок', afterClick: 'close' }]
    }

    const userDisabledModalParams = {
        title: 'User is disabled',
        closable: true,
        content: (
            <div className="custom-modal">
                <h2 className="custom-modal__title title">Oops!<br />User was disabled, try again later</h2>
            </div>
        ),
        footerButtons: [{ text: 'Ок', afterClick: 'close' }]
    }

    const { modalJSX, modalOpen } = useCustomModal(modal)

    return (
        <section className="auth">
            <div className="container">
                <div className="auth__inner">
                    <div className="auth-block">
                        <form className="auth-form" onSubmit={submitHandler}>
                            <h1 className="title auth-form__title">Login</h1>
                            <div className="auth-form__inputs">
                                <Input isDisabled={isDisabled} setIsDisabled={setIsDisabled} type="email" name="email" required>email</Input>
                                <Input isDisabled={isDisabled} setIsDisabled={setIsDisabled} type="password" name="password" required>password</Input>
                            </div>
                            <div className="auth-form__btns">
                                <Button isDisabled={isDisabled} className="button--main">Sign In</Button>
                                <Link to="/register">
                                    <Button type="button">Sign Up</Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {modalJSX}
        </section>
    )
}

export default Login