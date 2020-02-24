import * as React from 'react';
import { useDropzone } from 'react-dropzone';

import './index.css';

import { FilePreview } from './FilePreview';
import { useFileState } from './FileState';

export const Uploader: React.FunctionComponent<{ accept?: string }> = ({
  accept,
}) => {
  const {
    state: { file, progress, compression },
    setProgress,
    setFile,
    reset,
    setCompression,
  } = useFileState();

  React.useEffect(() => {
    // Fake progress
    if (progress !== undefined && progress < 100) {
      setTimeout(() => {
        setProgress(progress + 1);
      }, 100 - (progress % 100));
    }
  }, [progress, setProgress]);

  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setProgress(0);
    },
    [setProgress],
  );

  const {
    getRootProps,
    getInputProps,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0]);
    },
    accept,
  });

  return (
    <form onSubmit={onSubmit} onReset={reset} className="media-uploader">
      {!file ? (
        <div
          {...getRootProps()}
          className={`media-uploader-drop-area ${
            isDragAccept ? 'accept' : ''
          } ${isDragReject ? 'reject' : ''}`}
        >
          <h3>Drag files here to upload </h3>
          <h3 style={{ color: 'blue' }}>or browse for files</h3>

          <input type="file" name="file" {...getInputProps()} />
        </div>
      ) : (
        <FilePreview
          file={file}
          progress={progress}
          compression={compression}
          setCompression={setCompression}
        />
      )}
    </form>
  );
};
