import React from 'react';

interface FileState {
  file?: File;
  progress?: number;
  compression: number;
}

interface SetFileAction {
  type: 'SET_FILE';
  payload: File;
}
interface SetFileCompressionAction {
  type: 'SET_FILE_COMPRESSION';
  payload: number;
}
interface SetFileProgressAction {
  type: 'SET_FILE_PROGRESS';
  payload: number;
}
interface ResetAction {
  type: 'RESET';
}

type Action =
  | SetFileAction
  | SetFileCompressionAction
  | SetFileProgressAction
  | ResetAction;

function getInitialState(): FileState {
  return {
    compression: 80,
  };
}

function reducer(state: FileState, action: Action): FileState {
  switch (action.type) {
    case 'SET_FILE':
      return {
        ...state,
        file: action.payload,
      };
    case 'SET_FILE_COMPRESSION':
      return {
        ...state,
        compression: action.payload,
      };
    case 'SET_FILE_PROGRESS':
      return {
        ...state,
        progress: action.payload,
      };
    case 'RESET':
      return getInitialState();
    default:
      throw new Error('Invalid Action');
  }
}

interface FileStateManager {
  state: FileState;
  setFile: (file: File) => void;
  setProgress: (progress: number) => void;
  setCompression: (compression: number) => void;
  reset: () => void;
}

export function useFileState(): FileStateManager {
  const [state, dispatch] = React.useReducer(reducer, getInitialState());

  const setFile = React.useCallback((file: File) => {
    dispatch({
      type: 'SET_FILE',
      payload: file,
    });
  }, []);

  const setProgress = React.useCallback((progress: number) => {
    dispatch({
      type: 'SET_FILE_PROGRESS',
      payload: progress,
    });
  }, []);

  const setCompression = React.useCallback((compression: number) => {
    dispatch({
      type: 'SET_FILE_COMPRESSION',
      payload: compression,
    });
  }, []);

  const reset = React.useCallback(() => {
    dispatch({
      type: 'RESET',
    });
  }, []);
  
  return {
    state,
    setFile,
    setProgress,
    setCompression,
    reset,
  };
}
