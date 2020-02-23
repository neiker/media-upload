import * as React from 'react';

import './FilePreview.css';

export const FilePreview: React.FunctionComponent<{
    file: File;
  }> = ({ file }) => {
    const type = file.type.split('/')[0];

    console.log(type)

    return (
      <section className="preview">
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
        </div>
  

        <div className="preview-footer">
          

          <button type="reset">Reset</button>
          <button type="submit">Upload</button>
        </div>
      </section>
    );
  }
  