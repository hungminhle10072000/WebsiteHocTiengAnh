import React,{useState, useEffect,useCallback} from 'react';
import { useDropzone } from 'react-dropzone';
function Dropzone() {
    const onDrop = useCallback(acceptedFiles => {
      const file =acceptedFiles[0]
      const formData = new FormData();
      formData.append("file",file);
      
  
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop profile image here, or click to select profile image</p>
        }
      </div>
    )
  }

  export default Dropzone