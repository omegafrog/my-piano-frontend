import axios from "axios";
import { useState } from "react";
import { Form, Row } from "react-bootstrap";

export default function NavSearchBar({
  searchTermValue,
  searchResultValue,
  focusValue,
}) {
  const { searchTerm, setSearchTerm } = searchTermValue;
  const { searchResult, setSearchResult } = searchResultValue;
  const { focus, setFocus } = focusValue;

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
              Authorization: "Basic ZWxhc3RpYzpIcHJLX3Zfd1VwZHliVjBjdHY0LQ==",
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
