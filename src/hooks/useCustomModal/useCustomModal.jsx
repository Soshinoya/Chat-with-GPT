import Modal from './Modal'
import './modal.css'

const useCustomModal = options => {

    const {modalInDOM, modalJSX} = Modal({ ...options })

    const modal = {
        modalJSX,
        modalOpen() {
            modalInDOM.current.classList.add('open')
        }
    }

    return modal
}

export default useCustomModal