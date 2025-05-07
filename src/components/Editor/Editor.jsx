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
    setWordCount,
    setSelectedLinkNode,
    setShowLinkModal,
  } = useEditor();

  const handleInput = () => {
    const text = editorRef.current?.innerText || "";

    if (text.length > 2500) {
      const trimmed = text.slice(0, 2500);
      editorRef.current.innerText = trimmed;
      setWordCount(2500);

      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(editorRef.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      setWordCount(text.length);
    }
  };

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
      {/* <div
        ref={editorRef}
        contentEditable={true}
        className="main-text-area"
        onInput={handleInput}
        onClick={handleFormatUpdate}
        onKeyUp={handleFormatUpdate}
        suppressContentEditableWarning={true}
      /> */}
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
      <p className="word-count">
        {wordCount}/{2500}
      </p>
    </div>
  );
};

export default Editor;
