import ReactQuill from "react-quill";
import theme from "../../../node_modules/react-quill/dist/quill.snow.css";

function Editor({ content, setContent }) {
  return (
    <div>
      <ReactQuill
        value={content}
        onChange={setContent}
      />
    </div>
  );
}
export default Editor;
