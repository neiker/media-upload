import * as React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import './FilePreview.css';

const Progress: React.FunctionComponent<{ progress: number }> = ({ progress }) => {
  return (
    <div className="progress-indicator-container">
      <h2>{progress}%</h2>
      <div className="progress-indicator-bar" style={{ width: `${progress}%` }}></div>

      {progress === 100 && (
        <button type="reset">Reset</button>
      )}
    </div>
  )
}

export const FilePreview: React.FunctionComponent<{
    file: File;
    progress?: number;
    compression: number;
    setCompression: (compression: number) => void;
  }> = ({ file, progress, compression, setCompression }) => {
    const type = file.type.split('/')[0];
    
    return (
      <section className="preview">
        {progress !== undefined && <Progress progress={progress} />}

        <div className="preview-body">
          <h2 className="title">Preview: </h2>
          
          {type === 'video' && (
            <video width="400" controls autoPlay>
              <source src={URL.createObjectURL(file)} type={file.type} />
              Your browser does not support HTML5 video.
            </video>
          )}

          {type === 'image' && (
             <img src={URL.createObjectURL(file)} alt="upload preview" />
          )}

          <div className="range-wrapper">
            <InputRange
              disabled={progress !== undefined}
              formatLabel={value => `${value}%`}
              maxValue={100}
              minValue={0}
              value={compression}
              onChange={value => {
                if (typeof value === 'number') {
                  setCompression(value)
                } else {
                  throw new Error('Not handled')
                }
              }} 
            />
          </div>
        </div>
  

        <div className="preview-footer">
          <button disabled={progress !== undefined} type="reset">Reset</button>
          <button disabled={progress !== undefined} type="submit">Upload</button>
        </div>
      </section>
    );
  }
  