import React, { useState, useEffect, useRef } from 'react';
import SendArrow from '@/utils/icons/SendArrow';
import ClockwiseIcon from '@/utils/icons/ClockwiseIcon';
import ArrowDown from '@/utils/icons/ArrowDown';
import { Message } from './ChatModal.types';
import ChatBubble from './ChatBubble';



interface ChatModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ open, setOpen }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = { id: Date.now().toString(), text: input, isUser: true };
      setMessages(prev => [...prev, newMessage]);
      setInput('');
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: STATIC_MESSAGE,
          isUser: false
        };
        setMessages(prev => [...prev, responseMessage]);
        setHasGenerated(true);
      }, 1000);
    }
  };


  const handleInsert = () => {
    const placeholderText = document.querySelector(MESSAGE_PLACEHOLDER) as HTMLDivElement;
    if (placeholderText) {
      placeholderText.classList.remove(MESSAGE_PLACEHOLDER.replace('.', ''));
    }
    const messageText = document.querySelector('.msg-form__contenteditable p') as HTMLParagraphElement;
    if (!messageText) return null;
    messageText.innerText = STATIC_MESSAGE;
    setOpen(false)

  }

  if (!open) return null;

  return (
    <div onClick={() => setOpen(false)} className="fixed inset-0 z-[1000000000] bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity duration-300">
      <div onClick={(e) => e.stopPropagation()} className="bg-[#F9FAFB] rounded-lg shadow-xl w-full max-w-[620px] overflow-hidden transition-all duration-300 ease-in-out transform">
        <div className="flex flex-col max-h-[500px]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatBubble message={message} key={message.id} />
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#DBEAFE] text-gray-500 max-w-xs px-4 py-2 rounded-lg animate-pulse">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className={`p-4 pb-6 pt-3 ${hasGenerated && "border-t"}`}>
            <div className="flex flex-col space-y-5">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Your prompt"
                className="flex-1 px-4 py-3 border text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <div className='flex items-center gap-4  justify-end w-full'>
                {!hasGenerated ? (
                  <button
                    onClick={handleSend}
                    className="px-4 py-1.5 bg-blue-500 text-white flex items-center gap-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    <SendArrow /> Generate
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleInsert}
                      className="px-4 py-1.5 flex items-center gap-2.5  text-gray-500 border border-gray-500 rounded-lg   transition-colors duration-200"
                    >
                      <ArrowDown /> Insert
                    </button>
                    <button
                      className="px-4 py-1.5 flex items-center gap-2.5 bg-blue-500 text-white border border-blue-500 rounded-lg   transition-colors duration-200"
                    >
                      <ClockwiseIcon /> Regenerate
                    </button>

                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;