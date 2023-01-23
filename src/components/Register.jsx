import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useCustomModal from './../hooks/useCustomModal/useCustomModal'
import Input from "./Input/Input"
import Button from "./Button/Button"
import Auth from "../service/auth"

const Register = () => {
    const [isDisabled, setIsDisabled] = useState({
        "name": false,
        "surname": false,
        "email": false,
        "password": false
    })

    const navigate = useNavigate()

    const [modal, setModal] = useState({})

    const successModalParams = {
        title: 'Success',
        closable: true,
        content: (
            <div className="custom-modal">
                <h2 className="custom-modal__title title">You have successfully logged in! Click "ok" to redirect to the authorization page</h2>
            </div>
        ),
        footerButtons: [
            { text: 'Ок', afterClick: () => navigate('/login') },
            { text: 'Cancel', afterClick: 'close' }
        ]
    }

    const emailExistsModalParams = {
        title: 'Try another email',
        closable: true,
        content: (
            <div className="custom-modal">
                <h2 className="custom-modal__title title">Oops!<br />Email already in use :(</h2>
            </div>
        ),
        footerButtons: [{ text: 'Ок', afterClick: 'close' }]
    }

    const { modalJSX, modalOpen } = useCustomModal(modal)

    const submitHandler = e => {
        Auth.registerHandler(e)
            .then(res => {
                switch (res) {
                    case true:
                        setModal(successModalParams)
                        modalOpen()
                        break;

                    case ('auth/email-already-in-use'):
                        setModal(emailExistsModalParams)
                        modalOpen()
                        break;

                    default:
                }
            })
    }

    return (
        <section className="auth">
            <div className="container">
                <div className="auth__inner">
                    <div className="auth-block">
                        <form className="auth-form" onSubmit={submitHandler}>
                            <h1 className="title auth-form__title">Register</h1>
                            <div className="auth-form__inputs">
                                <Input isDisabled={isDisabled} setIsDisabled={setIsDisabled} type="text" name="name" required>Name</Input>
                                <Input isDisabled={isDisabled} setIsDisabled={setIsDisabled} type="text" name="surname" required>Surname</Input>
                                <Input isDisabled={isDisabled} setIsDisabled={setIsDisabled} type="email" name="email" required>Email</Input>
                                <Input isDisabled={isDisabled} setIsDisabled={setIsDisabled} type="password" name="password" required>Password</Input>
                            </div>
                            <div className="auth-form__btns">
                                <Button isDisabled={isDisabled} className="button--main">Sign Up</Button>
                                <Link to="/login">
                                    <Button type="button">Sign In</Button>
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

export default Register