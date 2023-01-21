import { useState } from "react"
import Input from "./Input/Input"
import Button from "./Button/Button"
import { Link } from "react-router-dom"

const Register = () => {
    const [isDisabled, setIsDisabled] = useState({
        "name": true,
        "surname": true,
        "email": false,
        "password": false
    })

    return (
        <section className="auth">
            <div className="container">
                <div className="auth__inner">
                    <div className="auth-block">
                        <form className="auth-form">
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
        </section>
    )
}

export default Register