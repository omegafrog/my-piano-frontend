import { useContext, useEffect, useState } from "react";
import { GetSheetPosts } from "../AxiosUtil";
import Layout from "../Layout";
import useAlert from "../../hook/useAlert";
import {
  Accordion,
  ButtonGroup,
  ListGroup,
  Row,
  Table,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { genreDict, genreIdDict } from "../../components/sheet/GenreSelection";
import { instrumentDict } from "./InstrumentSelection";
import { useLocation } from "react-router";
import { difficultyDict, difficultyIdDict } from "./DifficultySelection";
import { UserContext } from "../User-context";

function SheetList({ sheetPosts }) {
  if (sheetPosts.length > 0) {
    return (
      <Table>
        <thead>
          <th>곡 정보</th>
          <th>아티스트</th>
          <th>악기</th>
          <th>난이도</th>
          <th>조회수</th>
          <th>가격</th>
        </thead>
        <tbody>
          {sheetPosts.map((item) => {
            return (
              <ListGroup.Item variant="light">
                {/* <a href={`/sheet/${item.id}`}>{item.title}</a> */}

                {item.title}
              </ListGroup.Item>
            );
          })}
        </tbody>
      </Table>
    );
  } else {
    return <h1>아직 올린 악보가 없습니다.</h1>;
  }
}

function Sheets() {
  const [sheetPosts, setSheetPosts] = useState();
  const [genreDefault, setGenreDefault] = useState(false);
  const [difficultyDefault, setDifficultyDefault] = useState(false);
  const context = useContext(UserContext);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const genres = params.get("genre");
  const difficulties = params.get("difficulty");
  const instruments = params.get("instrument");
  const [filter, setFilter] = useState({
    genres: genres ? genres.split(" ") : [],
    difficulties: difficulties ? difficulties.split(" ") : [],
    instruments: instruments ? instruments.split(" ") : [],
  });
  const alertValue = useAlert();

  useEffect(() => {
    console.log("filter:", filter);
    GetSheetPosts({
      setSheetPosts: setSheetPosts,
      setShowAlert: alertValue.setShowAlert,
      context: context,
      filter,
    });
  }, [filter]);

  return (
    <Layout alertValue={alertValue} leftNav={true}>
      {sheetPosts === undefined ? (
        <h1>Loading...</h1>
      ) : (
        <div className="m-2 w-100">
          <Row className="m-1 ">
            <h1>악보 리스트</h1>
          </Row>
          <Row>
            <Accordion>
              <Accordion.Item>
                <Accordion.Header>필터</Accordion.Header>
                <Accordion.Body>
                  <Row className="m-2">
                    <strong>장르</strong>
                    <hr />
                    <ToggleButtonGroup type="checkbox">
                      {Object.values(genreDict).map((item, idx) => {
                        return (
                          <ToggleButton
                            variant="outline-primary"
                            key={idx}
                            id={`genre-${idx}`}
                            type={"checkbox"}
                            name="checkbox"
                            value={genreIdDict[idx]}
                            onChange={(e) => {
                              console.log(e.target.value);
                              let changed;
                              if (filter.genres.includes(e.target.value)) {
                                changed = filter.genres.filter(
                                  (item) => item !== e.target.value
                                );
                              } else {
                                changed = [...filter.genres, e.target.value];
                              }
                              console.log("changed:", changed);
                              setFilter((prev) => ({
                                ...prev,
                                genres: changed,
                              }));
                            }}
                          >
                            {item}
                          </ToggleButton>
                        );
                      })}
                    </ToggleButtonGroup>
                  </Row>
                  <Row className="m-2">
                    <strong>난이도</strong>
                    <ToggleButtonGroup type="checkbox">
                      {Object.keys(difficultyDict).map((item, idx) => {
                        return (
                          <ToggleButton
                            key={idx}
                            id={idx}
                            type="checkbox"
                            variant="outline-primary"
                            name="difficulty"
                            value={difficultyIdDict[idx]}
                            onChange={(e) => {
                              console.log("filter3:", filter);
                              if (
                                filter.difficulties.includes(e.target.value)
                              ) {
                                setFilter((prev) => ({
                                  ...prev,
                                  difficulties: prev.difficulties.filter(
                                    (difficulty) =>
                                      difficulty !== e.target.value
                                  ),
                                }));
                              } else {
                                setFilter((prev) => ({
                                  ...prev,
                                  difficulties: [
                                    ...prev.difficulties,
                                    e.target.value,
                                  ],
                                }));
                              }
                            }}
                          >
                            {item}
                          </ToggleButton>
                        );
                      })}
                    </ToggleButtonGroup>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Row>
          <Row className="m-1">
            <SheetList sheetPosts={sheetPosts} />
          </Row>
        </div>
      )}
    </Layout>
  );
}
export default Sheets;
