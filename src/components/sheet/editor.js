import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Editor({ content, setContent }) {
  return <ReactQuill theme={"snow"} value={content} onChange={setContent} />;
}
export default Editor;
