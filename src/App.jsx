import React from "react";
import "./App.css";
import Editor from "./components/Editor/Editor";
import { EditorProvider } from "./context/EditorContext";

const App = () => {
  return (
    <>
      <EditorProvider>
        <div className="main-app">
          <p className="main-app-title">Text Editor</p>
          <Editor />
        </div>
      </EditorProvider>
    </>
  );
};

export default App;
