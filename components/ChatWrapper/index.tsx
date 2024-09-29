import ActionButton from '../ActionButton'
import ChatModal from '../ChatModal'

const ChatWrapper = () => {
  const [open, setOpen] = useState(false)

  return (
    <div id='linkedin-chat-extension'>
      <ActionButton setOpen={setOpen} />
      <ChatModal open={open} setOpen={setOpen} />
    </div>
  )
}

export default ChatWrapper