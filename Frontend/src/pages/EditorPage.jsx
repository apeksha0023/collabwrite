import { useParams } from "react-router-dom";
import Editor from "../components/Editor";

const EditorPage = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>Collaborative Editor</h2>
      <Editor documentId={id} />
    </div>
  );
};

export default EditorPage;