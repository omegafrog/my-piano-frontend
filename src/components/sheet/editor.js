import ReactQuill from "react-quill";
import theme from "../../../node_modules/react-quill/dist/quill.snow.css";

function Editor({ sheetInfo, setSheetInfo }) {
  return (
    <div>
      <ReactQuill
        value={sheetInfo.content}
        onChange={(e) => setSheetInfo((prev) => ({ ...prev, content: e }))}
      />
    </div>
  );
}
export default Editor;
