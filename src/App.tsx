import React from 'react';

import './App.css';

import { Uploader } from './uploader';

const App: React.FunctionComponent = () => {
  return (
    <div className="app">
      <Uploader accept="video/mp4,video/x-m4v,image/png,image/jpeg,image/gif" />
    </div>
  );
}

export default App;
