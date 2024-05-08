import { useEffect, useRef, useState } from "react"
import { socket } from "./socket";

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const chatMessageRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    if (!chatMessageRef.current) return;
    const message = chatMessageRef.current.value;
    if (message.trim().length == 0) return;

    socket.emit("chat", message);
    chatMessageRef.current.value = ""
  }

  useEffect(() => {
    const onMessage = (newMessage: string) => {
      setMessages(messages => [...messages, newMessage])
    }

    socket.on('chat', onMessage);

    return () => {
      socket.off('chat', onMessage);
    };
  }, []);

  return (
    <>
      <div style={{height: 500, width: 500, backgroundColor: '#DDDDDD', border: '1px solid black', marginBottom: 3}}>
        {messages.map(message => <div>{message}</div>)}
      </div>
      <form onSubmit={event => {event.preventDefault(); sendMessage(); }}>
        <input type="text" placeholder="Type your message" ref={chatMessageRef}></input>
      </form>
    </>
  )
}

export default App
