import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  // to check active & inactive
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

  const [submittedContent, setSubmittedContent] = useState("");

  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedLinkNode, setSelectedLinkNode] = useState(null);

  const editorRef = useRef(null);
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const handleCommand = useCallback(
    (command, value = null) => {
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
    },
    [updateActiveFormats]
  );

  //--------------------------------------------------//

  const updateActiveFormats = useCallback(() => {
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
  }, []);

  useEffect(() => {
    document.addEventListener("selectionchange", updateActiveFormats);
    return () => {
      document.removeEventListener("selectionchange", updateActiveFormats);
    };
  }, [updateActiveFormats]);

  // const handleInput = () => {
  //   setContent(editorRef.current.innerHTML);
  //   setWordCount(editorRef.current?.innerText.length || 0);
  //   updateActiveFormats();

  //   const text = editorRef.current?.innerText || "";

  //   if (text.length > 2500) {
  //     const trimmed = text.slice(0, 2500);
  //     editorRef.current.innerText = trimmed;
  //     setWordCount(2500);

  //     const range = document.createRange();
  //     const selection = window.getSelection();
  //     range.selectNodeContents(editorRef.current);
  //     range.collapse(false);
  //     selection.removeAllRanges();
  //     selection.addRange(range);
  //   } else {
  //     setWordCount(text.length);
  //   }
  // };

  // optimised !!!!
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleInput = useCallback(() => {
    const text = editorRef.current?.innerText || "";
    const limitedText = text.slice(0, 2500);

    if (text.length > 2500) {
      editorRef.current.innerText = limitedText;
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(editorRef.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    setContent(editorRef.current.innerHTML);
    setWordCount(Math.min(text.length, 2500));
    updateActiveFormats();
  });

  //--------------------------------------------------//

  const savedSelectionRef = useRef(null);

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      savedSelectionRef.current = selection.getRangeAt(0);
    }
  };

  const restoreSelection = () => {
    const range = savedSelectionRef.current;
    if (range) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  // =====================
  // console.log(content);
  // =====================

  const contextValue = useMemo(
    () => ({
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
      showLinkModal,
      setShowLinkModal,
      selectedLinkNode,
      setSelectedLinkNode,
      updateActiveFormats,
      submittedContent,
      setSubmittedContent,
    }),
    [
      content,
      handleCommand,
      handleInput,
      activeFormats,
      wordCount,
      showLinkModal,
      selectedLinkNode,
      updateActiveFormats,
      submittedContent,
    ]
  );

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
    </EditorContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEditor = () => useContext(EditorContext);
