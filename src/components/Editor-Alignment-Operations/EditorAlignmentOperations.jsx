import React from "react";
import "./EditorAlignmentOperations.css";

import { useEditor } from "../../context/EditorContext";

import { Icons } from "../../utils/icons";

const {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  UnorderedList,
  OrderedList,
} = Icons;

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
            <AlignLeft />
          </button>
          <button
            className="align-op-btn"
            onClick={() => handleCommand("justifyCenter")}
            style={{
              color: activeFormats.justifyCenter ? "#004aad" : "inherit",
            }}
          >
            <AlignCenter />
          </button>
          <button
            className="align-op-btn"
            onClick={() => handleCommand("justifyRight")}
            style={{
              color: activeFormats.justifyRight ? "#004aad" : "inherit",
            }}
          >
            <AlignRight />
          </button>
          <button
            className="align-op-btn"
            onClick={() => handleCommand("justifyFull")}
            style={{
              color: activeFormats.justifyFull ? "#004aad" : "inherit",
            }}
          >
            <AlignJustify />
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
            <UnorderedList />
          </button>
          <button
            className="align-op-btn"
            onClick={() => handleCommand("insertOrderedList")}
            style={{
              color: activeFormats.orderedList ? "#004aad" : "inherit",
            }}
          >
            <OrderedList />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorAlignmentOperations;
