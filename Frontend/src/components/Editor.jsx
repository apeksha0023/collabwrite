import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import socket from "../socket";

const SAVE_INTERVAL_MS = 2000;

const Editor = ({ documentId }) => {
  const [quill, setQuill] = useState(null);
  const wrapperRef = useRef();

  useEffect(() => {
    const editorDiv = document.createElement("div");
    wrapperRef.current.innerHTML = "";
    wrapperRef.current.append(editorDiv);
    const q = new Quill(editorDiv, { theme: "snow" });
    q.setText("Loading...");
    q.disable();
    setQuill(q);
  }, []);

  useEffect(() => {
    if (!quill) return;

    socket.once("load-document", (doc) => {
      quill.setContents(doc);
      quill.enable();
    });

    socket.emit("join-document", documentId);
  }, [quill, documentId]);

  useEffect(() => {
    if (!quill) return;
    const handler = (delta, _, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", { docId: documentId, delta });
    };
    quill.on("text-change", handler);
    return () => quill.off("text-change", handler);
  }, [quill, documentId]);

  useEffect(() => {
    if (!quill) return;
    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);
    return () => socket.off("receive-changes", handler);
  }, [quill]);

  useEffect(() => {
    if (!quill) return;
    const interval = setInterval(() => {
      socket.emit("save-documents", {
        docId: documentId,
        data: quill.getContents(),
      });
    }, SAVE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [quill]);

  return <div className="editor" ref={wrapperRef}></div>;
};

export default Editor;