import Editor from "./editor";

function SheetPostDescription({ setSheetInfo, sheetInfo }) {
  const changeContent = (event) => {
    event.preventDefault();
    setSheetInfo((prev) => ({
      ...prev,
      content: event.target.value,
    }));
  };
  const changeSheetTitle = (event) => {
    event.preventDefault();
    setSheetInfo((prev) => ({
      ...prev,
      sheetDto: { ...prev.sheetDto, title: event.target.value },
    }));
  };
  const changeTitle = (event) => {
    event.preventDefault();
    setSheetInfo((prev) => ({
      ...prev,
      title: event.target.value,
    }));
  };
  return (
    <div>
      <input
        type="text"
        placeholder="곡 제목"
        value={sheetInfo.sheetDto.title || ""}
        onChange={changeSheetTitle}
      />
      <input
        type="text"
        placeholder="글 제목"
        value={sheetInfo.title || ""}
        onChange={changeTitle}
      />
      <Editor onChange={changeContent} />
    </div>
  );
}
export default SheetPostDescription;
