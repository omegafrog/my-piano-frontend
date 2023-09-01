import { useState } from "react";

function SearchBar() {
  const [text, setText] = useState("");
  const onChange = (event) => {
    const value = String(event.target.value);
    if (value.length > 2) {
      setText(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // TODO : 검색 api 호출
  };
  return (
    <div className="search-bar">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="악보를 검색하세요"
          value={text}
          onChange={onChange}
        />
      </form>
    </div>
  );
}
export default SearchBar;
