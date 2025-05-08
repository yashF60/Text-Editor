import React, { useState, useRef, useEffect } from "react";
import "./EditorMetaOperations.css";

import { useEditor } from "../../context/EditorContext";
import { Icons } from "../../utils/icons";

const { Link, Image } = Icons;

const EditorMetaOperations = () => {
  const { handleCommand, saveSelection, restoreSelection } = useEditor();
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [url, setUrl] = useState("");

  const urlInputRef = useRef(null);

  useEffect(() => {
    if (showLinkInput && urlInputRef.current) {
      urlInputRef.current.focus();
    }
  }, [showLinkInput]);

  const handleAddLink = (e) => {
    e.preventDefault();
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

      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = "Uploaded Image";
      img.style.maxWidth = "100%";

      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(img);

      range.setStartAfter(img);
      range.setEndAfter(img);
      selection.removeAllRanges();
      selection.addRange(range);
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
          <Link />
        </button>

        <button
          className="meta-op-btn"
          onClick={() => fileInputRef.current.click()}
        >
          <Image />
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
        <form
          type="dialog"
          className="link-input-wrapper"
          onSubmit={handleAddLink}
        >
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="link-input"
            ref={urlInputRef}
          />
          <button type="submit" className="apply-link-btn">
            Add
          </button>
        </form>
      )}
    </div>
  );
};

export default EditorMetaOperations;
