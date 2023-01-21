import { useRef } from 'react'
import useInput from './../../hooks/useInput/useInput'

import styles from './Input.module.css'

const Input = ({ isDisabled, setIsDisabled, type, name, children, required }) => {
    const label = useRef(null)

    const { value, onChange } = useInput('')

    const changeHandler = e => {
        const reg = new RegExp('@')

        const obj = { ...isDisabled }

        switch (name) {
            case 'email':
                if (!!e.target.value.trim()) {
                    obj['email'] = !!reg.test(e.target.value)
                }
                break;
            case 'password':
                if (!!e.target.value.trim()) {
                    e.target.value.trim().length >= 8
                    && e.target.value.trim().length <= 16
                    ? obj['password'] = true
                    : obj['password'] = false
                }
                break;
            default:
        }

        setIsDisabled(obj)
        onChange(e)
    }

    const blurHandler = ({ target: value }) => value.value && label.current.classList.add('d-none')

    const focusHandler = ({ target: value }) => value.value && label.current.classList.remove('d-none')

    return (
        <div className={styles.inputGroup}>
            <input
                value={value}
                onChange={changeHandler}
                onBlur={blurHandler}
                onFocus={focusHandler}
                type={type}
                name={name}
                required={required}
                className={`auth-form__input ${styles.input}`}
                autoComplete="off"
            />
            <label ref={label} className={`auth-form__label ${styles.inputLabel}`}>{children}</label>
        </div>
    )
}

export default Input