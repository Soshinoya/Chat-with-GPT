import { useRef } from "react";

let globalModalInDOM = null

const ANIMATION_SPEED = 500

function modalClose() {
    globalModalInDOM.current.classList.remove('open')
    globalModalInDOM.current.classList.add('hide')
    setTimeout(() => {
        globalModalInDOM.current.classList.remove('hide')
    }, ANIMATION_SPEED)
}

function listener(event, afterClick) {
    if (!event.target.closest('.vmodal').classList.contains('open')) {
        return
    }
    if (event.target.dataset.close || afterClick === 'close') {
        modalClose()
    }
    if (typeof afterClick === 'function') {
        afterClick()
    }
}

function _createModalFooter(buttons = []) {
    if (buttons.length === 0) {
        return <div></div>
    }


    const wrap = (
        <div className="modal-footer">
            {buttons.map((btn, index) => {
                return <button className={`btn btn-${btn.type || 'secondary'}`} onClick={e => listener(e, btn.afterClick)} key={index}>{btn.text}</button>
            })}
        </div>
    )

    return wrap
}

const Modal = ({ width, title, closable, content, footerButtons }) => {

    const DEFAULT_WIDTH = '600px'

    const modalInDOM = useRef()
    globalModalInDOM = modalInDOM

    const footer = _createModalFooter(footerButtons)

    return {
        modalJSX: (
            <div className='vmodal' ref={modalInDOM} onClick={listener}>
                <div className="modal-overlay" data-close="true">
                    <div className="modal-window" style={{ width: width || DEFAULT_WIDTH }}>
                        <div className="modal-header">
                            <span className="modal-title">{title || 'Окно'}</span>
                            {closable ? <span className="modal-close" data-close="true">&times;</span> : ''}
                        </div>
                        <div className="modal-body" data-content>
                            {content || ''}
                        </div>
                        {footer}
                    </div>
                </div>
            </div>
        ),
        modalInDOM
    }

}

export default Modal