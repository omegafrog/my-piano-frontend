import Editor from "./Editor";
import { Col, Form, InputGroup } from "react-bootstrap";

function SheetPostDescription({ setSheetInfo, sheetInfo, className }) {
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
    <div className={className}>
      <Col className="d-inline-flex justify-content-between w-100">
        <InputGroup className="m-3">
          <InputGroup.Text id="sheet-name">곡 제목</InputGroup.Text>
          <Form.Control
            type="text"
            value={sheetInfo.sheetDto.title || ""}
            onChange={changeSheetTitle}
            aria-describedby="sheet-name"
          />
        </InputGroup>
        <InputGroup className="m-3">
          <InputGroup.Text id="sheetpost-name">글 제목</InputGroup.Text>
          <Form.Control
            type="text"
            value={sheetInfo.title || ""}
            onChange={changeTitle}
            aria-describedby="sheetpost-name"
          />
        </InputGroup>
      </Col>
      <Col className="">
        <Editor
          content={sheetInfo.content}
          setContent={(e) => setSheetInfo((prev) => ({ ...prev, content: e }))}
        />
      </Col>
    </div>
  );
}
export default SheetPostDescription;
