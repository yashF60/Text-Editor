import React, { useState, useRef } from "react";
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

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;
      document.execCommand("insertImage", false, imageUrl);
    };
    reader.readAsDataURL(file);
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

        <button
          className="meta-op-btn"
          onClick={() => fileInputRef.current.click()}
        >
          <BsCardImage />
        </button>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
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
