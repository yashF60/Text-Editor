import React from "react";
import "./LinkModal.css";
import { useEditor } from "../../context/EditorContext";

import { Icons } from "../../utils/icons";

const { Close } = Icons;

const LinkModal = () => {
  const {
    showLinkModal,
    setShowLinkModal,
    selectedLinkNode,
    setSelectedLinkNode,
  } = useEditor();

  if (!showLinkModal || !selectedLinkNode) return null;

  const handleNavigate = () => {
    let href = selectedLinkNode.getAttribute("href");
    if (href) {
      if (!/^https?:\/\//i.test(href)) {
        href = "https://" + href;
      }
      window.open(href, "_blank");
    }
  };

  const handleRemove = () => {
    const span = document.createElement("span");
    span.innerHTML = selectedLinkNode.innerHTML;
    selectedLinkNode.replaceWith(span);
    setShowLinkModal(false);
    setSelectedLinkNode(null);
  };

  const handleClose = () => {
    setShowLinkModal(false);
  };

  return (
    <div className="main-link-modal">
      <div className="modal-content">
        <div className="close-modal" onClick={handleClose}>
          <Close />
        </div>
        <form action="dialog">
          <h2>Link</h2>
          <div className="modal-btns">
            <button type="button" onClick={handleNavigate}>
              Navigate
            </button>
            <button type="button" onClick={handleRemove}>
              Remove
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinkModal;
