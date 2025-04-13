module.exports = (socket, io) => {
    socket.on("join-document", docId => {
      socket.join(docId);
    });
  
    socket.on("send-changes", ({ docId, delta }) => {
      socket.broadcast.to(docId).emit("receive-changes", delta);
    });
  
    socket.on("save-document", ({ docId, data }) => {
      // optionally save to DB here
      socket.broadcast.to(docId).emit("document-saved", data);
    });
  };