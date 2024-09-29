import { Message } from '../ChatModal.types'

const ChatBubble = ({ message }: { message: Message }) => {
    return (
        <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} transition-all duration-300 ease-in-out`}
        >
            <div
                className={`max-w-[80%] px-4 py-3  rounded-xl ${!message.isUser ? 'bg-[#DBEAFE] text-gray-500' : 'bg-gray-100 text-gray-500'
                    } transition-all duration-300 ease-in-out transform hover:scale-105`}
            >
                {message.text}
            </div>
        </div>
    )
}

export default ChatBubble