import { useEffect, useState } from "react";
import { createDocument, getDocuments } from "../services/document";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [docs, setDocs] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDocs = async () => {
      const res = await getDocuments();
      console.log(res);  // Debug the response to make sure it's an array
      setDocs(Array.isArray(res) ? res : []);  // Ensure it's an array
    };
    fetchDocs();
  }, []);

  const handleCreate = async () => {
    console.log("Create button clicked");  // Debug log
    try {
      const doc = await createDocument();
      console.log("New document created:", doc);  // Verify the document creation response
      setDocs((prevDocs) => [...prevDocs, doc]);  // Add to docs state
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  return (
    <div>
      <h1>Welcome to CollabWrite</h1>
      {user && <button onClick={handleCreate}>➕ Create New Document</button>}
      <ul>
        {Array.isArray(docs) && docs.length > 0 ? (
          docs.map((doc) => (
            <li key={doc._id}>
              <Link to={`/documents/${doc._id}`}>{doc.title || "Untitled"}</Link>
            </li>
          ))
        ) : (
          <p>No documents found.</p>  // Show message if no documents
        )}
      </ul>
    </div>
  );
};

export default Home;
