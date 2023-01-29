import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ChatService from "../../service/ChatService"
import Button from "../Button/Button"
import Input from "../Input/Input"

const AppSettings = () => {

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const itemClickHandler = e => {
        const current = e.target.closest(".settings-item")
        const currentContent = current.nextSibling

        current.classList.toggle("settings-item--active")

        if (current.classList.contains("settings-item--active")) {
            currentContent.style.maxHeight = currentContent.scrollHeight + "px"
        } else {
            currentContent.style.maxHeight = 0
        }
    }

    const logOutHandler = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

    const switchTheme = (priority = "", color = "", entriesArr) => {
        const html = document.querySelector("html")
        if (entriesArr) {
            resetTheme()
            entriesArr.forEach(([priority, color]) => html.dataset[priority] = color)
        } else {
            html.dataset[priority] = color
        }
        localStorage.setItem("theme", JSON.stringify([...Object.entries(html.dataset)]))
    }

    const resetTheme = () => {
        const html = document.querySelector("html")
        const htmlThemeAttr = ["data-theme-first", "data-theme-second", "data-theme-third", "data-theme-additional"]
        htmlThemeAttr.forEach(a => html.removeAttribute(a))
        localStorage.removeItem("theme")
    }

    const [isDisabled, setIsDisabled] = useState({ "text": false })

    const onSubmitHandler = e => {
        e.preventDefault()
        setIsLoading(true)
        ChatService.uploadApiKey(e)
            .then(ChatService.setApiKey)
            .catch(console.log)
            .finally(() => setIsLoading(false))
    }

    const resetKeyHandler = e => {
        setIsLoading(true)
        ChatService.getApiKeyFromDB(true)
            .then(ChatService.setApiKey)
            .catch(console.log)
            .finally(() => setIsLoading(false))
    }

    return (
        <div className="settings">
            <div className="settings__inner">
                <div className="settings-item" onClick={itemClickHandler}>
                    <h3 className="settings-item__title">Themes</h3>
                </div>
                <div className="settings-item__content">
                    <div className="settings-item__content-row d-flex align-items-center justify-content-between">
                        <h4 className="settings-item__content-row__title">Purple / White</h4>
                        <div className="settings-item__content-row__colors d-flex align-items-center">
                            <div className="settings-item__content-row__color duo-colors duo-purple-white" onClick={() => switchTheme("", "", [["themeFirst", "purple"], ["themeAdditional", "black"], ["themeThird", "white"], ["themeSecond", "gray"]])}></div>
                        </div>
                    </div>
                    <div className="settings-item__content-row d-flex align-items-center justify-content-between">
                        <h4 className="settings-item__content-row__title">Purple / Blue</h4>
                        <div className="settings-item__content-row__colors d-flex align-items-center">
                            <div className="settings-item__content-row__color duo-colors duo-purple-blue" onClick={() => switchTheme("", "", [["themeFirst", "purple"], ["themeSecond", "dark-blue"], ["themeThird", "blue"]])}></div>
                        </div>
                    </div>
                    <div className="settings-item__content-row d-flex align-items-center justify-content-between">
                        <h4 className="settings-item__content-row__title">Yellow / White</h4>
                        <div className="settings-item__content-row__colors d-flex align-items-center">
                            <div className="settings-item__content-row__color duo-colors duo-yellow-white" onClick={() => switchTheme("", "", [["themeFirst", "yellow"], ["themeAdditional", "black"], ["themeThird", "white"]])}></div>
                        </div>
                    </div>
                    <div className="settings-item__content-row d-flex align-items-center justify-content-between">
                        <h4 className="settings-item__content-row__title">Yellow / Blue</h4>
                        <div className="settings-item__content-row__colors d-flex align-items-center">
                            <div className="settings-item__content-row__color duo-colors duo-yellow-blue" onClick={() => switchTheme("", "", [["themeFirst", "yellow"], ["themeSecond", "dark-blue"], ["themeThird", "blue"]])}></div>
                        </div>
                    </div>
                    <div className="settings-item__content-row d-flex align-items-center justify-content-between">
                        <h4 className="settings-item__content-row__title">Green / White</h4>
                        <div className="settings-item__content-row__colors d-flex align-items-center">
                            <div className="settings-item__content-row__color duo-colors duo-green-white" onClick={() => switchTheme("", "", [["themeFirst", "green"], ["themeAdditional", "black"], ["themeThird", "white"]])}></div>
                        </div>
                    </div>
                    <div className="settings-item__content-row d-flex align-items-center justify-content-between">
                        <h4 className="settings-item__content-row__title">Green / Black</h4>
                        <div className="settings-item__content-row__colors d-flex align-items-center">
                            <div className="settings-item__content-row__color duo-colors duo-green-black" onClick={() => switchTheme("", "", [["themeFirst", "green"], ["themeSecond", "dark-blue"], ["themeThird", "dark-green"]])}></div>
                        </div>
                    </div>
                    <div className="settings-item__content-row d-flex align-items-center justify-content-between">
                        <h4 className="settings-item__content-row__title">Blue / Black</h4>
                        <div className="settings-item__content-row__colors d-flex align-items-center">
                            <div className="settings-item__content-row__color duo-colors duo-tg-blue-black" onClick={() => switchTheme("", "", [["themeFirst", "tg-blue"], ["themeSecond", "black"], ["themeThird", "gray"], ["themeAdditional", "white"]])}></div>
                        </div>
                    </div>
                </div>
                <div className="settings-item" onClick={itemClickHandler}>
                    <h3 className="settings-item__title">Advanced Theme Customization</h3>
                </div>
                <div className="settings-item__content">
                    <div className="settings-item__content-row d-flex align-items-center justify-content-between">
                        <h4 className="settings-item__content-row__title">First color</h4>
                        <div className="settings-item__content-row__colors d-flex align-items-center">
                            <div className="settings-item__content-row__color color-yellow" onClick={() => switchTheme("themeFirst", "yellow")}></div>
                            <div className="settings-item__content-row__color color-purple" onClick={() => switchTheme("themeFirst", "purple")}></div>
                            <div className="settings-item__content-row__color color-green" onClick={() => switchTheme("themeFirst", "green")}></div>
                            <div className="settings-item__content-row__color color-tg-blue" onClick={() => switchTheme("themeFirst", "tg-blue")}></div>
                        </div>
                    </div>
                    <div className="settings-item__content-row d-flex align-items-center justify-content-between">
                        <h4 className="settings-item__content-row__title">Second color</h4>
                        <div className="settings-item__content-row__colors d-flex align-items-center">
                            <div className="settings-item__content-row__color color-blue" onClick={() => switchTheme("themeSecond", "blue")}></div>
                            <div className="settings-item__content-row__color color-dark-blue" onClick={() => switchTheme("themeSecond", "dark-blue")}></div>
                            <div className="settings-item__content-row__color color-gray" onClick={() => switchTheme("themeSecond", "gray")}></div>
                            <div className="settings-item__content-row__color color-dark-green" onClick={() => switchTheme("themeSecond", "dark-green")}></div>
                            <div className="settings-item__content-row__color color-white" onClick={() => switchTheme("themeSecond", "white")}></div>
                            <div className="settings-item__content-row__color color-black" onClick={() => switchTheme("themeSecond", "black")}></div>
                        </div>
                    </div>
                    <div className="settings-item__content-row d-flex align-items-center justify-content-between">
                        <h4 className="settings-item__content-row__title">Third color</h4>
                        <div className="settings-item__content-row__colors d-flex align-items-center">
                            <div className="settings-item__content-row__color color-blue" onClick={() => switchTheme("themeThird", "blue")}></div>
                            <div className="settings-item__content-row__color color-dark-blue" onClick={() => switchTheme("themeThird", "dark-blue")}></div>
                            <div className="settings-item__content-row__color color-gray" onClick={() => switchTheme("themeThird", "gray")}></div>
                            <div className="settings-item__content-row__color color-dark-green" onClick={() => switchTheme("themeThird", "dark-green")}></div>
                            <div className="settings-item__content-row__color color-white" onClick={() => switchTheme("themeThird", "white")}></div>
                            <div className="settings-item__content-row__color color-black" onClick={() => switchTheme("themeThird", "black")}></div>
                        </div>
                    </div>
                    <div className="settings-item__content-row d-flex align-items-center justify-content-between">
                        <h4 className="settings-item__content-row__title">Additional color</h4>
                        <div className="settings-item__content-row__colors d-flex align-items-center">
                            <div className="settings-item__content-row__color color-white" onClick={() => switchTheme("themeAdditional", "white")}></div>
                            <div className="settings-item__content-row__color color-black" onClick={() => switchTheme("themeAdditional", "black")}></div>
                        </div>
                    </div>
                    <div className="settings-item__content-row d-flex align-items-center">
                        <Button className="settings-item__content-row__btn" onClick={resetTheme}>Reset</Button>
                    </div>
                </div>
                <div className="settings-item" onClick={itemClickHandler}>
                    <h3 className="settings-item__title">Enter your API key</h3>
                </div>
                <div className="settings-item__content">
                    <div className="settings-item__content-wrapper">
                        <p className="settings-item__content-wrapper__text">
                            Below, insert your API key generated on the OpenAI website. This key will be used as access to the OpenAI chatbot. If you don't understand what this key is for, it's better not to touch it
                        </p>
                        <form className="settings-item__content-form" onSubmit={onSubmitHandler}>
                            <Input className="settings-item__content-form__input" isDisabled={isDisabled} setIsDisabled={setIsDisabled} type="text" name="text" required>
                                Paste your key here
                            </Input>
                            <div className="settings-item__content-form__btns d-flex align-items-center justify-content-between">
                                <Button className="settings-item__content-form__btn d-flex align-items-center justify-content-center button--main" isDisabled={isDisabled}>
                                    Confirm
                                </Button>
                                <Button type="button" className="settings-item__content-form__btn d-flex align-items-center justify-content-center" onClick={resetKeyHandler}>
                                    Reset
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="settings-item" onClick={itemClickHandler}>
                    <h3 className="settings-item__title">Leave</h3>
                </div>
                <div className="settings-item__content">
                    <div className="settings-item__content-inner d-flex align-items-center" onClick={logOutHandler}>
                        <h4 className="settings-item__content-row__title">
                            Log out of your account and go to the main page
                        </h4>
                        <div className="settings-item__content-icon">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.125 9.45005C11.5125 4.95005 13.825 3.11255 18.8875 3.11255H19.05C24.6375 3.11255 26.875 5.35005 26.875 10.9375V19.0875C26.875 24.675 24.6375 26.9125 19.05 26.9125H18.8875C13.8625 26.9125 11.55 25.1001 11.1375 20.6751M18.75 15H4.525M7.3125 10.8125L3.125 15L7.3125 19.1875" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading && (
                <div className="modal-overlay" style={{ background: 'rgba(0, 0, 0, .5)', zIndex: 2, opacity: 1 }}>
                    <h1 className="d-flex align-items-center justify-content-center">Loading...</h1>
                </div>
            )}
        </div>
    )
}

export default AppSettings