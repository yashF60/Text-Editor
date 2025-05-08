import React, { useState } from "react";
import "./EditorColourOperations.css";
import { useEditor } from "../../context/EditorContext";
import { Icons } from "../../utils/icons";

const { FontColor, HighlightSquare } = Icons;

const EditorColourOperations = () => {
  const { handleCommand } = useEditor();
  const [fontColor, setFontColor] = useState("#000000");
  const [highlightColor, setHighlightColor] = useState("#ffffff");

  const handleFontColorChange = (e) => {
    const color = e.target.value;
    setFontColor(color);
    handleCommand("foreColor", color);
  };

  const handleHighlightColorChange = (e) => {
    const color = e.target.value;
    setHighlightColor(color);
    handleCommand("backColor", color);
  };

  return (
    <div>
      <div className="colour-op">
        <button className="colour-op-btn">
          <label htmlFor="font-color-picker" style={{ cursor: "pointer" }}>
            <FontColor style={{ color: fontColor }} />
          </label>
          <input
            id="font-color-picker"
            type="color"
            onChange={handleFontColorChange}
            value={fontColor}
            style={{ display: "none" }}
          />
        </button>

        <button className="colour-op-btn">
          <label htmlFor="highlight-color-picker" style={{ cursor: "pointer" }}>
            <div className="fill-colour">
              <HighlightSquare style={{ color: highlightColor }} />
            </div>
          </label>
          <input
            id="highlight-color-picker"
            type="color"
            onChange={handleHighlightColorChange}
            value={highlightColor}
            style={{ display: "none" }}
          />
        </button>
      </div>
    </div>
  );
};

export default EditorColourOperations;
