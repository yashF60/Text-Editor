/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
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

  // to pass data to display
  const [submittedContent, setSubmittedContent] = useState("");

  // Link Modal
  const [showLinkModal, setShowLinkModal] = useState(false);
  // On click <a/>
  const [selectedLinkNode, setSelectedLinkNode] = useState(null);

  // Content Ref
  const editorRef = useRef(null);
  // Main Content State
  const [content, setContent] = useState("");
  // Word Count State
  const [wordCount, setWordCount] = useState(0);

  // Handle all HTML operations
  const handleCommand = useCallback((command, value = null) => {
    const selection = document.getSelection();
    if (!selection.rangeCount) return;

    if (command === "fontName") {
      document.execCommand("fontName", false, value);
    } else {
      document.execCommand(command, false, value);
    }

    editorRef.current.focus();
    updateActiveFormats();
  }, []);

  //--------------------------------------------------//

  // Update hover and active colours
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

  // useEffect(() => {
  //   document.addEventListener("selectionchange", updateActiveFormats);
  //   return () => {
  //     document.removeEventListener("selectionchange", updateActiveFormats);
  //   };
  // }, [updateActiveFormats]);

  useEffect(() => {
    const handleSelectionChange = () => {
      updateActiveFormats();
    };
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [updateActiveFormats]);

  // optimised !!!!
  // Input handler
  const handleInput = useCallback(() => {
    const text = editorRef.current?.innerText || "";
    const trimmedText = text.trim();
    const limitedText = trimmedText.slice(0, 2500);

    if (trimmedText.length > 2500) {
      editorRef.current.innerText = limitedText;
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(editorRef.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    setContent(editorRef.current.innerHTML);
    setWordCount(Math.min(trimmedText.length, 2500));
    updateActiveFormats();
  }, [updateActiveFormats]);

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

export const useEditor = () => useContext(EditorContext);
