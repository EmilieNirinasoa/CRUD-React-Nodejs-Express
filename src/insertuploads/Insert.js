import React, { useState } from 'react';
import axios from 'axios';
function Insert() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file)
    setSelectedFile(file);
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    console.log(newName)
    setName(newName);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedFile && name) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('name', name);
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      axios.post('http://localhost:3001/upload', formData)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
      console.log(formData)
    } else {
      console.error('Veuillez remplir tous les champs.');
    }
  };

  return (
    <div>
      <h1>Uploader un fichier</h1>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleFileChange} />
        <input type="text" name="name" value={name} onChange={handleNameChange} placeholder="Nom" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Insert;
