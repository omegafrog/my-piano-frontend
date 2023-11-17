import { useContext, useEffect, useState } from "react";
import { GetSheetPosts } from "../AxiosUtil";
import Layout from "../Layout";
import useAlert from "../../hook/useAlert";
import {
  Accordion,
  ButtonGroup,
  Col,
  Container,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { genreDict, genreIdDict } from "../../components/sheet/GenreSelection";
import { useLocation, useNavigate } from "react-router";
import { difficultyDict, difficultyIdDict } from "./DifficultySelection";
import { UserContext } from "../User-context";
import SheetList from "./SheetList";

function Sheets() {
  const [sheetPosts, setSheetPosts] = useState();
  const context = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
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
        <Container className="w-75 my-4">
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
                    <ButtonGroup className="d-flex ">
                      {Object.values(genreDict).map((item, idx) => {
                        return (
                          <ToggleButton
                            className="flex-grow-1"
                            variant="outline-primary"
                            key={idx}
                            id={`genre-${idx}`}
                            type={"checkbox"}
                            name="checkbox"
                            checked={filter.genres.includes(genreIdDict[idx])}
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
                    </ButtonGroup>
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
          <Row className="m-4 d-flex justify-content-center">
            <SheetList sheetPosts={sheetPosts} navigate={navigate} />
          </Row>
        </Container>
      )}
    </Layout>
  );
}
export default Sheets;
