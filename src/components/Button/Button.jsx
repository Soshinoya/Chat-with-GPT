import styles from './Button.module.css'

const Button = ({ type, isDisabled, className, children }) => {
    const checkIsDisabled = typeof isDisabled === 'object' && !Object.values(isDisabled).every(i => i === true)
    return <button type={type} disabled={checkIsDisabled} className={`button ${styles.btn} ${className}`}>{children}</button>
}

export default Button