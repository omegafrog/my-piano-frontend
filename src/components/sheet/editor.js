import ReactQuill from "react-quill";
import theme from "../../../node_modules/react-quill/dist/quill.snow.css";

function Editor({ content, setContent, className }) {
  return (
    <div style={{ height: "100vh" }}>
      <ReactQuill
        style={{ height: "80%" }}
        value={content}
        onChange={setContent}
      />
    </div>
  );
}
export default Editor;
