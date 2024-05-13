import { Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { searchQuery } from "./AxiosUtil";
import { useState } from "react";
export default function NavSearchBar({
  searchTerm,
  setSearchTerm,
  searchResult,
  setSearchResult,
  focus,
  setFocus,
}) {
  const navigate = useNavigate();

  const changeSearchResult = async (e) => {
    setSearchTerm(e.target.value);
    setSearchResult([]);
    console.log("searchTerm:", e.target.value);
    if (searchTerm.length >= 2) {
      const data = await searchQuery(e.target.value);
      setSearchResult(data.content);
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
