import { Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { searchQuery } from "./AxiosUtil";
import { UserContext } from "./User-context";
import { useContext } from "react";
export default function NavSearchBar({
  searchTermValue,
  searchResultValue,
  focusValue,
}) {
  const { searchTerm, setSearchTerm } = searchTermValue;
  const { searchResult, setSearchResult } = searchResultValue;
  const { focus, setFocus } = focusValue;

  const navigate = useNavigate();
  const context = useContext(UserContext);

  const changeSearchResult = (e) => {
    setSearchTerm(e.target.value);
    console.log("searchTerm:", e.target.value);
    if (searchTerm.length >= 2) {
      searchQuery(context, e, setSearchResult);
    }
  };
  return (
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
  );
}
