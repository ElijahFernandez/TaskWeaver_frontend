import { useState } from 'react';
import axios from 'axios';
import styles from './ChatComponent.module.css';

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);

  const handleSend = async () => {
    if (message.trim()) {
      const userMessage = message;
      setResponses([...responses, { user: userMessage, bot: '...' }]);
      setMessage('');

      try {
        const response = await axios.post('http://localhost:5000/chat', { message: userMessage });
        setResponses(prevResponses => {
          const updatedResponses = [...prevResponses];
          updatedResponses[updatedResponses.length - 1].bot = response.data.message;
          return updatedResponses;
        });
      } catch (error) {
        console.error('Error sending message:', error);
        setResponses(prevResponses => {
          const updatedResponses = [...prevResponses];
          updatedResponses[updatedResponses.length - 1].bot = 'Error: Unable to get a response';
          return updatedResponses;
        });
      }
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatBox}>
        {responses.map((res, index) => (
          <div key={index} className={styles.messageContainer}>
            <div className={styles.userMessage}>
              <strong>You:</strong> {res.user}
            </div>
            <div className={styles.botMessage}>
              <strong>TaskWeaver:</strong> {res.bot}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className={styles.inputField}
        />
        <button onClick={handleSend} className={styles.sendButton}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
