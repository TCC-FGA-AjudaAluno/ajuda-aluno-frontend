  import React, { useState } from 'react';
  import './PopChat.css';
  import { PiChatTeardropTextLight } from 'react-icons/pi';
  import axios from 'axios';
  
  export const PopChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
  
    // Função para abrir/fechar o popup
    const togglePopup = () => {
      setIsOpen(!isOpen);
    };
  
    // Função para enviar a mensagem e interagir com o backend NestJS
    const handleSendMessage = async () => {
      if (message.trim()) {
        // Adiciona a mensagem do usuário na tela
        setMessages([...messages, { text: message, sender: 'User' }]);
        setMessage('');
  
        try {
          // Faz a requisição ao backend NestJS
          const response = await axios.post('http://localhost:3000/chat/message', {
            message,
          });
  
          // Recebe a resposta do ChatGPT e adiciona na tela
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: response.data.message, sender: 'ChatGPT' },
          ]);
        } catch (error) {
          console.error('Erro ao enviar mensagem:', error);
        }
      }
    };


  // Função para enviar mensagem
  // const handleSendMessage = () => {
  //   if (message.trim()) {
  //     setMessages([...messages, { text: message, sender: "User" }]);
  //     setMessage("");
  //   }
  // };

  return (
    <div>
      <div>
      <button onClick={togglePopup} className="chat-button"> 
      < PiChatTeardropTextLight style={{  color: "#4378b0" ,   marginTop: "1px"
 }} />  
      </button>
      </div>
      

      {isOpen && (
        <div className="chat-popup">
          <div className="chat-header">
            <h3 style={{paddingTop: "10px"}}>Chat</h3>
            <button onClick={togglePopup} className="close-button">X</button>
          </div>
          <div className="chat-body">
            {messages.length === 0 ? (
              <p>Tire sua duvida!</p>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender.toLowerCase()}`}>
                  <p>{msg.text}</p>
                </div>
              ))
            )}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              placeholder="Digite sua mensagem..."
            />
            <button onClick={handleSendMessage}>Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopChat