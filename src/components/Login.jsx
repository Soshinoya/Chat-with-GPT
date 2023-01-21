import { useState } from "react"
import Input from "./Input/Input"
import Button from "./Button/Button"
import { Link } from "react-router-dom"

const Login = () => {
    const [isDisabled, setIsDisabled] = useState({
        "email": false,
        "password": false
    })

    return (
        <section className="auth">
            <div className="container">
                <div className="auth__inner">
                    <div className="auth-block">
                        <form className="auth-form">
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