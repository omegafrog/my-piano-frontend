import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "./Layout";
import useAlert from "../hook/useAlert";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { genreDict, genreIdDict } from "./sheet/GenreSelection";

export default function SearchResult() {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchResult, setSearchResult] = useState([]);
  console.log();
  const alertValue = useAlert();
  const navigate = useNavigate();
  let content;
  useEffect(() => {
    if (searchParam.get("q")) {
      axios
        .post(
          "https://localhost:9200/sheets/_search",
          {
            query: {
              bool: {
                should: [
                  {
                    fuzzy: {
                      name: {
                        value: searchParam.get("q"),
                        fuzziness: 1,
                      },
                    },
                  },
                  {
                    prefix: {
                      "name.keyword": {
                        value: searchParam.get("q"),
                      },
                    },
                  },
                ],
              },
            },
          },
          {
            headers: {
              Authorization: "Basic ZWxhc3RpYzpIcHJLX3Zfd1VwZHliVjBjdHY0LQ==",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setSearchResult(response.data.hits.hits);
          }
        })
        .catch((error) => {
          console.log("검색 서버 에러");
        });
      setSearchResult();
    }
  }, []);

  if (searchParam.get("q")) {
    content = (
      <Container fluid className="m-2">
        <Row className="m-1">
          <h1>검색 결과 : {searchParam.get("q")}</h1>
        </Row>
        <Row className="m-2">
          {searchResult
            ? searchResult.map((data, index) => {
                const genres = data._source.genre[0].split(" ");
                const genre1 = genres[0];
                const genre2 = genres.length > 1 ? genres[1] : null;
                return (
                  <div
                    style={{
                      padding: "20px",
                      borderBottom: "3px solid #dfe6e9",
                    }}
                    onClick={() => {
                      navigate(`/sheet/${data._id}`);
                    }}
                    onMouseOver={(e) => {
                      e.target.style.cursor = "pointer";
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "25px" }}>
                        {data._source.name}
                      </span>
                    </div>
                    <div>
                      <Row className="d-flex justify-content-end">
                        <Col xs={"auto"}>
                          <span>장르</span>
                        </Col>
                        <Col xs={"auto"}>
                          <Button
                            size="sm"
                            className="genre"
                            id={genreIdDict[genre1]}
                            variant="outline-secondary"
                            disabled
                          >
                            {genreDict[genre1]}
                          </Button>
                          {genre2 ? (
                            <Button
                              size="sm"
                              className="genre"
                              id={genreDict[genre2]}
                              variant="outline-secondary"
                            >
                              {genreDict[genre2]}
                            </Button>
                          ) : null}
                        </Col>
                      </Row>
                    </div>
                  </div>
                );
              })
            : null}
        </Row>
      </Container>
    );
  }
  return (
    <Layout leftNav={true} alertValue={alertValue}>
      {content}
    </Layout>
  );
}
