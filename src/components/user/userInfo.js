import { Col, Image, Row } from "react-bootstrap";

export function ItemListUserInfo({ profileSrc, name }) {
  return (
    <Row>
      <Col xs={"auto"} style={{ paddingRight: "0px" }}>
        <Image
          className="sm"
          src={profileSrc !== "" ? profileSrc : "/img/defaultUserImg.png"}
          roundedCircle
          style={{ width: "30px", height: "auto" }}
        />
      </Col>

      <Col
        xs={"auto"}
        style={{ paddingLeft: "5px" }}
        className="d-flex align-items-center"
      >
        <span style={{ textAlign: "baseline" }}>{name}</span>
      </Col>
    </Row>
  );
}
