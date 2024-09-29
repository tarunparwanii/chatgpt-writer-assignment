import useElementFocus from '@/hooks/useElementFocus';
import useElementVisibilityTracker from '@/hooks/useElementVisibilityTracker'
import { MESSAGE_CONTAINER_ACTIVE_CLASS, MESSAGE_CONTAINER_SELECTOR, MESSAGE_INPUT_SELECTOR } from '@/utils/constants';

const ActionButton = ({ setOpen }: { setOpen: (value: boolean) => void }) => {
    const isLinkedinChatOpened = useElementVisibilityTracker(MESSAGE_INPUT_SELECTOR);
    const isChatInputFocused = useElementFocus(MESSAGE_CONTAINER_SELECTOR, MESSAGE_CONTAINER_ACTIVE_CLASS, isLinkedinChatOpened);
    const [delayedFocus, setDelayedFocus] = useState(false);
    const actionButtonRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isLinkedinChatOpened) {
            const inputElement = document.querySelector(MESSAGE_INPUT_SELECTOR);
            if (inputElement && actionButtonRef?.current) {
                const rect = inputElement.getBoundingClientRect();
                actionButtonRef.current.style.position = 'absolute';
                actionButtonRef.current.style.right = `${window.innerWidth - rect.right + 10}px`;
                actionButtonRef.current.style.bottom = `${window.innerHeight - rect.bottom + 6}px`;
            }
        }
    }, [isLinkedinChatOpened])

    useEffect(() => {
        if (isChatInputFocused) {
            setDelayedFocus(true);
        } else {
            const tl = setTimeout(() => {
                setDelayedFocus(false);
            }, 200)

            return () => {
                clearTimeout(tl);
            }
        }
    }, [isChatInputFocused])


    const handleActionButtonClick = () => {
        setOpen(true);
    }

    return (
        <div ref={actionButtonRef} onClick={handleActionButtonClick} className={`w-[28px] cursor-pointer h-[28px] absolute z-[100000] rounded-full bg-white shadow-md hover:scale-105 transition-all hover:bg-gray-100 flex items-center justify-center ${isLinkedinChatOpened && delayedFocus ? "" : "hidden"}`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="14"
                fill="none"
                viewBox="0 0 16 14"
            >
                <path
                    fill="#2563EB"
                    d="M15.467 8.733c0 .154-.06.3-.168.409a.57.57 0 01-.405.17h-1.146v1.155c0 .153-.06.3-.168.408a.57.57 0 01-.81 0 .58.58 0 01-.167-.408V9.31h-1.146a.57.57 0 01-.405-.17.58.58 0 01.405-.985h1.146V7a.57.57 0 111.146 0v1.156h1.145a.57.57 0 01.405.169.58.58 0 01.168.408zM1.719 2.956h1.146V4.11a.57.57 0 101.146 0V2.956h1.145a.57.57 0 00.405-.17.58.58 0 00-.405-.986H4.01V.644a.58.58 0 00-.167-.408.57.57 0 00-.978.408V1.8H1.719a.57.57 0 00-.405.17.58.58 0 00.405.986zm9.165 8.666h-.573v-.578a.58.58 0 00-.168-.408.57.57 0 00-.81 0 .58.58 0 00-.167.408v.578h-.573a.57.57 0 00-.405.17.58.58 0 00.405.986h.573v.577a.57.57 0 101.146 0v-.577h.572a.57.57 0 00.405-.17.58.58 0 00-.405-.986zm2.528-8.089L3.437 13.595a1.14 1.14 0 01-1.62 0L.337 12.1a1.156 1.156 0 01-.249-1.26c.058-.14.142-.267.249-.374L10.31.405a1.145 1.145 0 01.81-.338 1.137 1.137 0 01.81.338L13.413 1.9a1.156 1.156 0 01.249 1.26c-.058.14-.142.267-.249.374zm-.81-.817l-1.48-1.494L8.83 3.533l1.481 1.495 2.292-2.312z"
                ></path>
            </svg>
        </div>
    )
}

export default ActionButton

