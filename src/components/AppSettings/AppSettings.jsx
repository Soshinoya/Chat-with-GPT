import Button from "../Button/Button"

const AppSettings = () => {
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
            </div>
        </div>
    )
}

export default AppSettings