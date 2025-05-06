import React from "react";
import "./EditorAlignmentOperations.css";

import {
  CiTextAlignLeft,
  CiTextAlignCenter,
  CiTextAlignRight,
  CiTextAlignJustify,
} from "react-icons/ci";
import { MdFormatListBulleted, MdFormatListNumbered } from "react-icons/md";

import { useEditor } from "../../context/EditorContext";

const EditorAlignmentOperations = () => {
  const { handleCommand, activeFormats } = useEditor();

  return (
    <div>
      <div className="align-op">
        <div className="top-align-op">
          <button
            className="align-op-btn"
            onClick={() => handleCommand("justifyLeft")}
            style={{
              color: activeFormats.justifyLeft ? "#004aad" : "inherit",
            }}
          >
            <CiTextAlignLeft />
          </button>
          <button
            className="align-op-btn"
            onClick={() => handleCommand("justifyCenter")}
            style={{
              color: activeFormats.justifyCenter ? "#004aad" : "inherit",
            }}
          >
            <CiTextAlignCenter />
          </button>
          <button
            className="align-op-btn"
            onClick={() => handleCommand("justifyRight")}
            style={{
              color: activeFormats.justifyRight ? "#004aad" : "inherit",
            }}
          >
            <CiTextAlignRight />
          </button>
          <button
            className="align-op-btn"
            onClick={() => handleCommand("justifyFull")}
            style={{
              color: activeFormats.justifyFull ? "#004aad" : "inherit",
            }}
          >
            <CiTextAlignJustify />
          </button>
        </div>
        <div className="bottom-align-op">
          <button
            className="align-op-btn"
            onClick={() => handleCommand("insertUnorderedList")}
            style={{
              color: activeFormats.unorderedList ? "#004aad" : "inherit",
            }}
          >
            <MdFormatListBulleted />
          </button>
          <button
            className="align-op-btn"
            onClick={() => handleCommand("insertOrderedList")}
            style={{ color: activeFormats.orderedList ? "#004aad" : "inherit" }}
          >
            <MdFormatListNumbered />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorAlignmentOperations;
