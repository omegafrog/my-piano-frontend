import { Pagination } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function CustomPagenation({ pageable, endNum, pageBtnSize }) {
  const curPageNum = pageable.page + 1;
  console.log(curPageNum, endNum, pageBtnSize);
  var pageArray = [];
  for (let i = curPageNum - 2; i <= endNum; i += 1) {
    if (i <= 0) continue;
    if (pageArray.length === pageBtnSize) break;
    pageArray.push(i);
  }
  console.log(pageArray);
  const navigate = useNavigate();
  return (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      {pageArray.map((item, idx) => (
        <Pagination.Item
          key={idx}
          onClick={() =>
            navigate(`/post?page=${item - 1}&size=${pageable.size}`)
          }
        >
          {item}
        </Pagination.Item>
      ))}
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
}
