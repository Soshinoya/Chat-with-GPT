import { useState } from "react"
import Input from "./Input/Input"
import Button from "./Button/Button"

const Login = () => {
    const [isDisabled, setIsDisabled] = useState({
        "email": false,
        "password": false
    })

    return (
        <form className="auth-form">
            <h1 className="title auth-form__title">Login</h1>
            <div className="auth-form__inputs">
                <Input isDisabled={isDisabled} setIsDisabled={setIsDisabled} type="email" name="email" required>email</Input>
                <Input isDisabled={isDisabled} setIsDisabled={setIsDisabled} type="password" name="password" required>password</Input>
            </div>
            <div className="auth-form__btns">
                <Button isDisabled={isDisabled} className="auth-form__btn auth-form__btn--main">Sign In</Button>
                <Button type="button" className="auth-form__btn">Sign Up</Button>
            </div>
        </form>
    )
}

export default Login