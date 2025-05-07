import React from "react";
import "./Display.css";
import { useEditor } from "../../context/EditorContext";
import LinkModal from "../Link-Modal/LinkModal";

const Display = () => {
  const { setSelectedLinkNode, setShowLinkModal, submittedContent } =
    useEditor();

  const handleClick = (e) => {
    const anchor = e.target.closest("a");
    if (anchor) {
      e.preventDefault();
      setSelectedLinkNode(anchor);
      setShowLinkModal(true);
    }
  };

  return (
    <div className="main-display">
      {submittedContent ? (
        <div
          onClick={handleClick}
          dangerouslySetInnerHTML={{ __html: submittedContent }}
        />
      ) : (
        <p>No content submitted yet.</p>
      )}
      <LinkModal />
    </div>
  );
};

export default Display;
