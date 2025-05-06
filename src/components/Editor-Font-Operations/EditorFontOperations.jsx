// import React from "react";
// import "./EditorFontOperations.css";

// import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
// import { RxFontBold, RxFontItalic, RxUnderline } from "react-icons/rx";
// import { HiOutlineStrikethrough } from "react-icons/hi2";

// import { useEditor } from "../../context/EditorContext";

// const EditorFontOperations = () => {
//   const { handleCommand, activeFormats } = useEditor();

//   return (
//     <div>
//       <div className="font-op">
//         <div className="top-font-op">
//           <select
//             className="font-fam"
//             onChange={(e) => handleCommand("fontName", e.target.value)}
//           >
//             <option value="Poppins">Poppins</option>
//             <option value="Arial">Arial</option>
//             <option value="Roboto">Roboto</option>
//             <option value="Comic Sans MS">Comic Sans</option>
//           </select>
//           <select className="font-sz">
//             <option value="10">10</option>
//             <option value="13">13</option>
//             <option value="16">16</option>
//             <option value="18">18</option>
//             <option value="24">24</option>
//             <option value="32">32</option>
//             <option value="48">48</option>
//           </select>
//           <div className="font-btns">
//             <button className="font-btn">
//               <MdKeyboardArrowUp />
//             </button>
//             <button className="font-btn">
//               <MdKeyboardArrowDown />
//             </button>
//           </div>
//         </div>
//         <div className="bottom-font-op">
//           <button
//             onClick={() => handleCommand("bold")}
//             style={{
//               color: activeFormats.bold ? "#004aad" : "inherit",
//             }}
//           >
//             <RxFontBold />
//           </button>
//           <button
//             onClick={() => handleCommand("italic")}
//             style={{
//               color: activeFormats.italic ? "#004aad" : "inherit",
//             }}
//           >
//             <RxFontItalic />
//           </button>
//           <button
//             onClick={() => handleCommand("underline")}
//             style={{
//               color: activeFormats.underline ? "#004aad" : "inherit",
//             }}
//           >
//             <RxUnderline />
//           </button>
//           <button
//             onClick={() => handleCommand("strikeThrough")}
//             style={{
//               color: activeFormats.strikeThrough ? "#004aad" : "inherit",
//             }}
//           >
//             <HiOutlineStrikethrough />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditorFontOperations;

import React, { useState } from "react";
import "./EditorFontOperations.css";

import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { RxFontBold, RxFontItalic, RxUnderline } from "react-icons/rx";
import { HiOutlineStrikethrough } from "react-icons/hi2";

import { useEditor } from "../../context/EditorContext";

// Font size mapping (pixels → execCommand value)
const fontSizeMap = {
  10: 1,
  13: 2,
  16: 3,
  18: 4,
  24: 5,
  32: 6,
  48: 7,
};

const fontSizes = Object.keys(fontSizeMap).map(Number); // [10, 13, 16, 18, 24, 32, 48]

const EditorFontOperations = () => {
  const { handleCommand, activeFormats } = useEditor();
  const [fontSize, setFontSize] = useState(16); // Default font size

  const changeFontSize = (direction) => {
    const currentIndex = fontSizes.indexOf(fontSize);
    let newIndex =
      direction === "increase" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= 0 && newIndex < fontSizes.length) {
      const newSize = fontSizes[newIndex];
      setFontSize(newSize);
      handleCommand("fontSize", fontSizeMap[newSize]);
    }
  };

  const handleFontSizeChange = (e) => {
    const newSize = Number(e.target.value);
    setFontSize(newSize);
    handleCommand("fontSize", fontSizeMap[newSize]);
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
          value={fontSize}
          onChange={handleFontSizeChange}
        >
          {fontSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <div className="font-btns">
          <button
            className="font-btn"
            onClick={() => changeFontSize("increase")}
          >
            <MdKeyboardArrowUp />
          </button>
          <button
            className="font-btn"
            onClick={() => changeFontSize("decrease")}
          >
            <MdKeyboardArrowDown />
          </button>
        </div>
      </div>

      <div className="bottom-font-op">
        <button
          onClick={() => handleCommand("bold")}
          style={{ color: activeFormats.bold ? "#004aad" : "inherit" }}
        >
          <RxFontBold />
        </button>
        <button
          onClick={() => handleCommand("italic")}
          style={{ color: activeFormats.italic ? "#004aad" : "inherit" }}
        >
          <RxFontItalic />
        </button>
        <button
          onClick={() => handleCommand("underline")}
          style={{ color: activeFormats.underline ? "#004aad" : "inherit" }}
        >
          <RxUnderline />
        </button>
        <button
          onClick={() => handleCommand("strikeThrough")}
          style={{ color: activeFormats.strikeThrough ? "#004aad" : "inherit" }}
        >
          <HiOutlineStrikethrough />
        </button>
      </div>
    </div>
  );
};

export default EditorFontOperations;
