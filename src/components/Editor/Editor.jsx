import React from "react";
import "./Editor.css";

import EditorFontOperations from "../Editor-Font-Operations/EditorFontOperations";
import EditorColourOperations from "../Editor-Colour-Operations/EditorColourOperations";
import EditorAlignmentOperations from "../Editor-Alignment-Operations/EditorAlignmentOperations";
import EditorMetaOperations from "../Editor-Meta-Operations/EditorMetaOperations";
import LinkModal from "../Link-Modal/LinkModal";

import { useEditor } from "../../context/EditorContext";

const Editor = () => {
  const {
    editorRef,
    updateActiveFormats,
    wordCount,
    handleInput,
    setSelectedLinkNode,
    setShowLinkModal,
    setSubmittedContent,
    content,
  } = useEditor();

  const handleClick = (e) => {
    updateActiveFormats();

    const anchor = e.target.closest("a");
    if (anchor && editorRef.current.contains(anchor)) {
      e.preventDefault();
      setSelectedLinkNode(anchor);
      setShowLinkModal(true);
    }
  };

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
        contentEditable={true}
        className="main-text-area"
        onInput={handleInput}
        onClick={handleClick}
        onKeyUp={updateActiveFormats}
        suppressContentEditableWarning={true}
      />

      <LinkModal />
      <div className="editor-footer">
        <button
          onClick={() => {
            setSubmittedContent(content), console.log("Clicked");
          }}
          className="submit-button"
        >
          Save
        </button>
        <p className="word-count">
          {wordCount}/{2500}
        </p>
      </div>
    </div>
  );
};

export default Editor;
