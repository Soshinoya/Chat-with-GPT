import { useState, useEffect } from "react"
import ChatService from './../service/ChatService'

const Chat = () => {
    const [data, setData] = useState('')

    useEffect(() => {
        ChatService.getMessages().then(setData)
    }, [])

    return (
        <div>{data}</div>
    )
}

export default Chat