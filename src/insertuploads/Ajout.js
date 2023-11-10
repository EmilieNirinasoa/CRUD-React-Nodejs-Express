import React, { useRef, useState } from "react";

export default function Ajout() {
  const [fullname, setFullName] = useState('');
  const [fullnames, setFullNames] = useState('');
  const formRef = useRef(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [serverData, setServerData] = useState({});

  const onChangeFullname = (evt) => {
    setFullName(evt.target.value);
  }

  const onChangeFullnames = (evt) => {
    setFullNames(evt.target.value);
  }

  const onSubmit = async (evt) => {
    evt.preventDefault();

    if (!formRef.current) {
      return;
    }

    try {
      const response = await fetch(formRef.current.action, {
        method: formRef.current.method,
        body: new FormData(formRef.current),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      console.log("json", json);
      setIsUploaded(true);
      setServerData(json);
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  }

  if (isUploaded) {
    return (
      <div>
        <h1>La photo ajoutée : {serverData.fullName}</h1>
        <img src={serverData.asset} alt="img" />
      </div>
    );
  }

  return (
    <div>
      <h1>Hello le stream/replay</h1>
      <form onSubmit={onSubmit} action="/upload" method="POST" ref={formRef}>
        <div>
          <label htmlFor="fullname-upload">Nom</label>
          <input id="fullname-upload" type="text" onChange={onChangeFullname} name="fullname" value={fullname} />
        </div>
        <div>
          <label htmlFor="fullnames-upload">Prenom</label>
          <input id="fullnames-upload" type="text" onChange={onChangeFullnames} name="fullnames" value={fullnames} />
        </div>
        <div>
          <label htmlFor="file-upload">Uploader un fichier</label>
          <input type="file" id="file-upload" name="asset" />
        </div>
        <button type="submit">Envoi</button>
      </form>
    </div>
  );
}
