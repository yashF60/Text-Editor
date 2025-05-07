import React from "react";
import "./App.css";
import Editor from "./components/Editor/Editor";
import { EditorProvider } from "./context/EditorContext";
import Display from "./components/Display/Display";

const App = () => {
  return (
    <>
      <EditorProvider>
        <div className="main-app">
          <div className="editor-section">
            <p className="main-app-title">Text Editor</p>
            <Editor />
          </div>
          <div className="display-section">
            <p className="main-app-title">Display</p>
            <Display />
          </div>
        </div>
      </EditorProvider>
    </>
  );
};

export default App;
