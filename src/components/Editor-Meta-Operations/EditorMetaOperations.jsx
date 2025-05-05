import React, { useState } from "react";
import "./EditorMetaOperations.css";

import { IoMdLink } from "react-icons/io";
import { BsCardImage } from "react-icons/bs";
import { useEditor } from "../../context/EditorContext";

const EditorMetaOperations = () => {
  const { handleCommand, saveSelection, restoreSelection } = useEditor();
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [url, setUrl] = useState("");

  const handleAddLink = () => {
    if (url.trim()) {
      restoreSelection();
      handleCommand("createLink", url);
      setUrl("");
      setShowLinkInput(false);
    }
  };

  return (
    <div>
      <div className="meta-op">
        <button
          className="meta-op-btn"
          onClick={() => {
            saveSelection();
            setShowLinkInput((prev) => !prev);
          }}
        >
          <IoMdLink />
        </button>
        <button className="meta-op-btn" onClick={() => alert("Coming soon")}>
          <BsCardImage />
        </button>
      </div>

      {showLinkInput && (
        <div className="link-input-wrapper">
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="link-input"
          />
          <button onClick={handleAddLink} className="apply-link-btn">
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default EditorMetaOperations;
