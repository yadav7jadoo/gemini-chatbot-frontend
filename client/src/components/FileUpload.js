import React, { useState } from 'react';
import axios from 'axios';

function FileUpload({apiUrl}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileStatus, setFileStatus] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
      if (!selectedFile) {
        setFileStatus('No file selected');
         return;
        }
        setFileStatus('Uploading ...');

        const formData = new FormData();
          formData.append('file', selectedFile);

          try {
         const response = await axios.post(apiUrl + '/api/upload', formData, {
             headers: {
              'Content-Type': 'multipart/form-data',
              },
        });
           setFileStatus(`File Uploaded. ${response.data.message} ${response.data.filename} `);

          } catch (error) {
              console.error("File Upload Error", error);
            setFileStatus(`Error: ${error.message}`);
         }
   };
   return (
      <div>
       <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload</button>
         <p>{fileStatus}</p>
        </div>
        );
    }

    export default FileUpload;
