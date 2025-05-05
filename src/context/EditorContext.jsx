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

  const handleCommand = (command, value = null) => {
    const selection = document.getSelection();
    if (!selection.rangeCount) return;
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const handleInput = () => {
    setContent(editorRef.current.innerHTML);
    updateActiveFormats();
  };

  //--------------------------------------------------//

  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strikeThrough: document.queryCommandState("strikeThrough"),
      justifyLeft: document.queryCommandState("justifyLeft"),
      justifyCenter: document.queryCommandState("justifyCenter"),
      justifyRight: document.queryCommandState("justifyRight"),
      justifyFull: document.queryCommandState("justifyFull"),
      unorderedList: document.queryCommandState("insertUnorderedList"),
      orderedList: document.queryCommandState("insertOrderedList"),
    });
  };

  useEffect(() => {
    document.addEventListener("selectionchange", updateActiveFormats);
    return () => {
      document.removeEventListener("selectionchange", updateActiveFormats);
    };
  }, []);

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

  //   console.log(content)

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
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEditor = () => useContext(EditorContext);
