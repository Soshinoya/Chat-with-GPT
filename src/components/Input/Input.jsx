import { useState, useEffect, useRef } from 'react'
import useInput from './../../hooks/useInput/useInput'
import InputAutoHeight from './InputAutoHeight'

import styles from './Input.module.css'

const Input = ({ isDisabled, setIsDisabled, type, name, placeholder, children, isChatInput, required }) => {
    const label = useRef(null)

    const [input, setInput] = useState(useRef(null))

    const { value, onChange } = useInput('')

    const changeHandler = e => {
        const reg = new RegExp('@')

        const obj = { ...isDisabled }

        const trimmedValue = e.target.value.trim()

        switch (name) {
            case 'name':
                if (!!trimmedValue) {
                    obj['name'] = trimmedValue.length <= 30
                } else {
                    obj['name'] = false
                }
                break;
            case 'surname':
                if (!!trimmedValue) {
                    obj['surname'] = trimmedValue.length <= 30
                } else {
                    obj['surname'] = false
                }
                break;
            case 'email':
                if (!!trimmedValue) {
                    obj['email'] = !!reg.test(e.target.value)
                } else {
                    obj['email'] = false
                }
                break;
            case 'password':
                if (!!trimmedValue) {
                    trimmedValue.length >= 8
                        && trimmedValue.length <= 16
                        ? obj['password'] = true
                        : obj['password'] = false
                }
                break;
            case 'text':
                if (!!trimmedValue) {
                    obj['text'] = trimmedValue.length < 256
                } else {
                    obj['text'] = false
                }
                break;
            default:
        }

        setIsDisabled(obj)
        onChange(e)
    }

    const blurHandler = ({ target: value }) => value.value && label.current.classList.add('d-none')

    const focusHandler = ({ target: value }) => value.value && label.current.classList.remove('d-none')

    useEffect(() => {
        isChatInput && InputAutoHeight(input)
    }, [input])

    return (
        <div className={`${styles.inputGroup} ${isChatInput ? 'chat-footer__input' : ''}`}>
            {isChatInput
                ? <textarea
                    ref={e => setInput(e)}
                    value={value}
                    onChange={changeHandler}
                    onBlur={blurHandler}
                    onFocus={focusHandler}
                    type={type}
                    name={name}
                    required={required}
                    placeholder={placeholder}
                    className={`auth-form__input ${styles.input} chat-footer__input`}
                ></textarea>
                : <input
                    value={value}
                    onChange={changeHandler}
                    onBlur={blurHandler}
                    onFocus={focusHandler}
                    type={type}
                    name={name}
                    required={required}
                    placeholder={placeholder}
                    className={`auth-form__input ${styles.input}`}
                    autoComplete="off"
                />}
            {<label ref={label} className={`auth-form__label ${styles.inputLabel}`}>{children}</label>}
        </div>
    )
}

export default Input