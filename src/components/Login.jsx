import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Input from "./Input/Input"
import Button from "./Button/Button"
import Auth from "../service/auth"

const Login = () => {
    const [isDisabled, setIsDisabled] = useState({
        "email": false,
        "password": false
    })

    const navigate = useNavigate()

    const submitHandler = e => {
        Auth.loginHandler(e)
            .then(res => res && navigate('/chat'))
    }

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
        </section>
    )
}

export default Login