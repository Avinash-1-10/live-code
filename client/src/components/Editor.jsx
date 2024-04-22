import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

const Editor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const editor = Codemirror.fromTextArea(editorRef.current, {
        mode: "javascript",
        theme: "dracula",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
        viewportMargin: Infinity,
      });

      editor.setSize("100%", "100vh"); // Set the size of the editor to full height

      // Return cleanup function to remove editor from DOM when component unmounts
      return () => {
        editor.toTextArea();
      };
    }
  }, []);

  return (
    <div className="h-screen">
      <textarea ref={editorRef} id="realtimeEditor"></textarea>
    </div>
  );
};

export default Editor;
