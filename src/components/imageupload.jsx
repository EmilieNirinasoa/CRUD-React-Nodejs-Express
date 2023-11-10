import React, { useState, useRef } from 'react';
import Dropzone from 'react-dropzone';

export default function imageupload(){
    const onDrop = (files) => {
        const [uploadedFile] = files;
        setFile(uploadedFile);
      
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setPreviewSrc(fileReader.result);
        };
        fileReader.readAsDataURL(uploadedFile);
        setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
      };
    
      const [file, setFile] = useState(null); // state for storing actual image
      const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
      const [state, setState] = useState({
        title: '',
        description: ''
      });
      const [errorMsg, setErrorMsg] = useState('');
      const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
      const dropRef = useRef(); 
    return(
        <div className="upload-section">
  <Dropzone onDrop={onDrop}>
    {({ getRootProps, getInputProps }) => (
      <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
        <input {...getInputProps()} />
        <p>Drag and drop a file OR click here to select a file</p>
        {file && (
          <div>
            <strong>Selected file:</strong> {file.name}
          </div>
        )}
      </div>
    )}
  </Dropzone>
  {previewSrc ? (
    isPreviewAvailable ? (
      <div className="image-preview">
        <img className="preview-image" src={previewSrc} alt="Preview" />
      </div>
    ) : (
      <div className="preview-message">
        <p>No preview available for this file</p>
      </div>
    )
  ) : (
    <div className="preview-message">
      <p>Image preview will be shown here after selection</p>
    </div>
  )}
</div>
    )
}