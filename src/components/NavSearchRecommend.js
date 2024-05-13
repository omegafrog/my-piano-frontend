import { ListGroup, Row } from "react-bootstrap";
import styles from "../css/Navigator.module.scss";

export default function NavSearchRecommend({ focus, searchResult }) {
  return (
    <Row
      className="w-100"
      style={{
        position: "absolute",
      }}
      hidden={!focus}
    >
      <ListGroup className={`${styles["list-group"]}`}>
        {searchResult.map((result, index) => {
          return (
            <ListGroup.Item
              eventKey={index}
              key={index}
              href={`/sheet/${result.id}`}
              action
            >
              {result.title}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Row>
  );
}
