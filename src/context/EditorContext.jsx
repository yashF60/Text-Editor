import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";

const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    justifyLeft: false,
    justifyCenter: false,
    justifyRight: false,
    justifyFull: false,
    unorderedList: false,
    orderedList: false,
  });

  const editorRef = useRef(null);
  const [content, setContent] = useState("");
  const [savedSelection, setSavedSelection] = useState(null);
  const [wordCount, setWordCount] = useState(0);

  const handleCommand = (command, value = null) => {
    const selection = document.getSelection();
    if (!selection.rangeCount) return;

    if (command === "fontSize") {
      const size = parseInt(value);
      if (size >= 1 && size <= 7) {
        document.execCommand("fontSize", false, size);

        const fonts = editorRef.current.querySelectorAll("font[size]");
        fonts.forEach((font) => {
          const pxMap = {
            1: "10px",
            2: "13px",
            3: "16px",
            4: "18px",
            5: "24px",
            6: "32px",
            7: "48px",
          };
          const sizeAttr = font.getAttribute("size");
          if (pxMap[sizeAttr]) {
            font.removeAttribute("size");
            font.style.fontSize = pxMap[sizeAttr];
          }
        });
      }
    } else if (command === "fontName") {
      document.execCommand("fontName", false, value);
    } else {
      document.execCommand(command, false, value);
    }

    editorRef.current.focus();
    updateActiveFormats();
  };

  //--------------------------------------------------//

  const updateActiveFormats = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectedNode = range.startContainer;
    const checkNodeForStyle = (node, style) => {
      if (!node) return false;
      if (node.nodeType === 3) {
        return false;
      }
      return node.closest(style) !== null;
    };

    setActiveFormats({
      bold: checkNodeForStyle(selectedNode, "strong"),
      italic: checkNodeForStyle(selectedNode, "em"),
      underline: checkNodeForStyle(selectedNode, "u"),
      strikeThrough: checkNodeForStyle(selectedNode, "s"),
      justifyLeft: checkNodeForStyle(
        selectedNode,
        "div[style*='text-align: left']"
      ),
      justifyCenter: checkNodeForStyle(
        selectedNode,
        "div[style*='text-align: center']"
      ),
      justifyRight: checkNodeForStyle(
        selectedNode,
        "div[style*='text-align: right']"
      ),
      justifyFull: checkNodeForStyle(
        selectedNode,
        "div[style*='text-align: justify']"
      ),
      unorderedList: checkNodeForStyle(selectedNode, "ul"),
      orderedList: checkNodeForStyle(selectedNode, "ol"),
    });
  };

  useEffect(() => {
    document.addEventListener("selectionchange", updateActiveFormats);
    return () => {
      document.removeEventListener("selectionchange", updateActiveFormats);
    };
  }, []);

  const handleInput = () => {
    setContent(editorRef.current.innerHTML);
    setWordCount(editorRef.current?.innerText.length || 0);
    updateActiveFormats();
  };

  //--------------------------------------------------//

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      setSavedSelection(selection.getRangeAt(0));
    }
  };

  const restoreSelection = () => {
    if (savedSelection) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(savedSelection);
    }
  };

  return (
    <EditorContext.Provider
      value={{
        editorRef,
        content,
        setContent,
        handleCommand,
        handleInput,
        activeFormats,
        saveSelection,
        restoreSelection,
        wordCount,
        setWordCount,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEditor = () => useContext(EditorContext);
