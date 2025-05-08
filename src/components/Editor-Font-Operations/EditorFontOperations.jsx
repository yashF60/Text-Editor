import React from "react";
import "./EditorFontOperations.css";
import { useEditor } from "../../context/EditorContext";
import { Icons } from "../../utils/icons";

const {
  Bold,
  Italic,
  Underline,
  Strikethrough,
} = Icons;

const EditorFontOperations = () => {
  const { handleCommand, activeFormats } = useEditor();

  const applyFormatBlock = (value) => {
    switch (value) {
      case "Heading1":
        handleCommand("formatBlock", "<h1>");
        break;
      case "Heading2":
        handleCommand("formatBlock", "<h2>");
        break;
      case "Quote":
        handleCommand("formatBlock", "<blockquote>");
        break;
      case "Normal":
      default:
        handleCommand("formatBlock", "<p>");
        break;
    }
  };

  return (
    <div className="font-op">
      <div className="top-font-op">
        <select
          className="font-fam"
          onChange={(e) => handleCommand("fontName", e.target.value)}
        >
          <option value="Poppins">Poppins</option>
          <option value="Arial">Arial</option>
          <option value="Roboto">Roboto</option>
          <option value="Comic Sans MS">Comic Sans</option>
        </select>
        <select
          className="font-sz"
          onChange={(e) => applyFormatBlock(e.target.value)}
        >
          <option value="Normal">Normal</option>
          <option value="Heading1">Heading 1</option>
          <option value="Heading2">Heading 2</option>
          <option value="Quote">Quote</option>
        </select>
      </div>

      <div className="bottom-font-op">
        <button
          onClick={() => handleCommand("bold")}
          style={{ color: activeFormats.bold ? "#004aad" : "inherit" }}
        >
          <Bold />
        </button>
        <button
          onClick={() => handleCommand("italic")}
          style={{ color: activeFormats.italic ? "#004aad" : "inherit" }}
        >
          <Italic />
        </button>
        <button
          onClick={() => handleCommand("underline")}
          style={{ color: activeFormats.underline ? "#004aad" : "inherit" }}
        >
          <Underline />
        </button>
        <button
          onClick={() => handleCommand("strikeThrough")}
          style={{
            color: activeFormats.strikeThrough ? "#004aad" : "inherit",
          }}
        >
          <Strikethrough />
        </button>
      </div>
    </div>
  );
};

export default EditorFontOperations;
