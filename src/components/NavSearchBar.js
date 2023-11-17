import axios from "axios";
import { Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function NavSearchBar({
  searchTermValue,
  searchResultValue,
  focusValue,
}) {
  const { searchTerm, setSearchTerm } = searchTermValue;
  const { searchResult, setSearchResult } = searchResultValue;
  const { focus, setFocus } = focusValue;

  const navigate = useNavigate();

  const changeSearchResult = (e) => {
    setSearchTerm(e.target.value);
    console.log("searchTerm:", e.target.value);
    if (searchTerm.length >= 2) {
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
                        value: e.target.value,
                        fuzziness: 1,
                      },
                    },
                  },
                  {
                    fuzzy: {
                      title: {
                        value: e.target.value,
                        fuzziness: 1,
                      },
                    },
                  },
                  {
                    prefix: {
                      "name.keyword": {
                        value: e.target.value,
                      },
                    },
                  },
                ],
              },
            },
          },
          {
            headers: {
              Authorization:
                "ApiKey MVFLWjI0c0JLWGtCSW5Eb1ZaR2Q6b1BQUVVfaDFUU2lXTmVQOTBVUHhnZw==",
            },
          }
        )
        .then((response) => {
          console.log(response.data.hits.hits);
          setSearchResult(response.data.hits.hits);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  return (
    <Row>
      <Form.Control
        type="text"
        placeholder="Search"
        onChange={changeSearchResult}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            navigate(`/search?q=${e.target.value}`);
          }
        }}
        onFocus={() => {
          setFocus(true);
          console.log(focus);
        }}
        onBlur={() => {
          setTimeout(() => setFocus(false), 500);
        }}
        value={searchTerm}
      />
    </Row>
  );
}
