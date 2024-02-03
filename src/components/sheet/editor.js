import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Editor({ content, setContent, height }) {
  return (
    <div style={{ height: height ? height : "100vh" }}>
      <ReactQuill
        theme={"snow"}
        style={{ height: "80%" }}
        value={content}
        onChange={setContent}
      />
    </div>
  );
}
export default Editor;
