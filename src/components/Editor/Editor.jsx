import React from "react";
import "./Editor.css";

import EditorFontOperations from "../Editor-Font-Operations/EditorFontOperations";
import EditorColourOperations from "../Editor-Colour-Operations/EditorColourOperations";
import EditorAlignmentOperations from "../Editor-Alignment-Operations/EditorAlignmentOperations";
import EditorMetaOperations from "../Editor-Meta-Operations/EditorMetaOperations";

import { useEditor } from "../../context/EditorContext";

const Editor = () => {
  const {
    editorRef,
    handleInput,
    updateActiveFormats: handleFormatUpdate,
  } = useEditor();

  return (
    <div className="main-editor">
      <div className="editor-comp">
        <EditorFontOperations />
        <EditorColourOperations />
        <EditorAlignmentOperations />
        <EditorMetaOperations />
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="main-text-area"
        onInput={handleInput}
        onClick={handleFormatUpdate}
        onKeyUp={handleFormatUpdate}
        suppressContentEditableWarning={true}
      />
    </div>
  );
};

export default Editor;
