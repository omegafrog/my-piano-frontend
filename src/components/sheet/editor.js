import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Editor() {
  return (
    <div>
      <ReactQuill />
    </div>
  );
}

function GetEditorOutput(content) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
export default Editor;
