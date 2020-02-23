import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

import './index.css';
import { FilePreview } from './FilePreview';

function fileUpload(file: File) {
    const url = 'http://example.com/file-upload';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return axios.post(url, formData,config)
}

export const Uploader = () => {
  const [file, setFile] = React.useState<File>();

  const onChangeHandler = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log('onChangeHandler', event);
    },
    [],
  );

  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log('onSubmit', event);
    },
    [],
  );

  const onReset = React.useCallback(() => {
    setFile(undefined);
  }, [])

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'video/mp4,video/x-m4v,image/png,image/jpeg,image/gif',
  });
  
  return (
    <form 
      onSubmit={onSubmit} 
      onReset={onReset}
      className="media-uploader"
    >
      {!file ? (
        <div
          {...getRootProps()}
          className={`media-uploader-drop-area ${isDragActive ? 'active' : ''}`}
        >
          <h3>Drag files here to upload </h3>
          <h3>or browse for files</h3>

          <input
            type="file"
            name="file"
            onChange={onChangeHandler}
            {...getInputProps()}
          />
        </div>
      ) : (
        <FilePreview file={file} />
      )}
    </form>
  );
};
