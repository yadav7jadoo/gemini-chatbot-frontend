import React from 'react';
import ChatInterface from './components/ChatInterface';
import FileUpload from './components/FileUpload';

function App() {
   const apiUrl = process.env.REACT_APP_API_URL;
  return (
        <div className="App">
            <h1> Gemini Chatbot </h1>
        <ChatInterface apiUrl={apiUrl} />
        <FileUpload apiUrl={apiUrl} />
      </div>
  );
}

export default App;
