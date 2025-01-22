    import React, { useState } from 'react';
    import axios from 'axios';

    function ChatInterface({apiUrl}) {
     const [message, setMessage] = useState('');
     const [chatLog, setChatLog] = useState([]);
     const [loading, setLoading] = useState(false);

      const handleSendMessage = async () => {
        if (!message.trim()) return;
         setLoading(true);

        try {
        const response = await axios.post(apiUrl + '/api/chat', { message });
           const geminiResponse = response.data.response;

         setChatLog([...chatLog, { sender: 'user', text: message }, { sender: 'bot', text: geminiResponse }]);
             setMessage('');

     } catch (error) {
            console.error('Error sending message', error);
          setChatLog([...chatLog, { sender: 'user', text: message }, { sender: 'error', text: 'Could not reach the server.' }]);

         }
     finally {
             setLoading(false);
     }
  };

        return (
       <div>
         <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid gray' }}>
            {chatLog.map((msg, i) => (
                <div key={i} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                <strong>{msg.sender}: </strong>{msg.text}
                </div>
               ))}
          { loading ? <p> Loading ...</p> : null }
      </div>
    <input
          type="text"
          placeholder="Type your message..."
          value={message}
            onChange={e => setMessage(e.target.value)}
   />
    <button onClick={handleSendMessage}>Send</button>
      </div>
      );
    }

    export default ChatInterface;
