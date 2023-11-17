import { Button, Col, Row } from "react-bootstrap";
import PaymentModal from "../PaymentModal";
import { genreDict, genreIdDict } from "./GenreSelection";
import { instrumentDict } from "./InstrumentSelection";
import { useNavigate } from "react-router";

export default function Metadata({ item }) {
  const navigate = useNavigate();
  return (
    <div className="h-100 d-flex justify-center ">
      <div
        className="sheet-info w-100"
        id="metadata"
        style={{ width: "300px", paddingTop: "20px" }}
      >
        <Row style={{ margin: "5px" }}>
          <Col>
            <span>가격</span>
          </Col>
          <Col>
            <span>장르</span>
          </Col>
        </Row>
        <Row style={{ margin: "5px" }}>
          <Col>
            <div id="price">{item.price === 0 ? "무료" : item.price}</div>
          </Col>
          <Col>
            <Button
              size="sm"
              className="genre"
              id={genreIdDict[item.sheet.genres.genre1]}
              variant="outline-secondary"
              onClick={() => {
                navigate(`/sheet?genre=${item.sheet.genres.genre1}`);
              }}
            >
              {genreDict[item.sheet.genres.genre1]}
            </Button>
            {item.sheet.genres.genre2 ? (
              <Button
                size="sm"
                className="genre"
                id={genreDict[item.sheet.genres.genre2]}
                variant="outline-secondary"
                onClick={() => {
                  navigate(`/sheet?genre=${item.sheet.genres.genre2}`);
                }}
              >
                {genreDict[item.sheet.genres.genre2]}
              </Button>
            ) : null}
          </Col>
        </Row>
        <Row style={{ margin: "5px" }}>
          <Col>
            <span id="difficulty">난이도</span>
          </Col>
          <Col>
            <span id="instrument">악기</span>
          </Col>
        </Row>
        <Row style={{ margin: "5px" }}>
          <Col>
            <span>{item.sheet.difficulty}</span>
          </Col>
          <Col>
            <span>{instrumentDict[item.sheet.instrument]}</span>
          </Col>
        </Row>
        <Row style={{ margin: "5px" }}>
          <Col>
            <span>솔로/듀엣</span>
          </Col>
          <Col>
            <span>가사 여부</span>
          </Col>
        </Row>
        <Row style={{ margin: "5px" }}>
          <Col>
            <span id="solo">{item.sheet.solo ? "솔로" : "듀엣"}</span>
          </Col>
          <Col>{item.sheet.lyrics ? "가사 없음" : "가사 있음"}</Col>
        </Row>
        <Row style={{ margin: "5px" }}>
          <Col>
            <span>페이지 수</span>
          </Col>
          <Col>
            <span>곡 이름</span>
          </Col>
        </Row>
        <Row style={{ margin: "5px" }}>
          <Col>
            <span id="page-num">{item.sheet.pageNum}</span>
          </Col>
          <Col>
            <span id="sheet-title">{item.sheet.title}</span>
          </Col>
        </Row>
      </div>
    </div>
  );
}
