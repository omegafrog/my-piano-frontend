import { Pagination } from "react-bootstrap";

export default function CustomPagenation({ pageable, setPageable, count }) {
  const page = paginate(count, pageable.size, pageable.page);
  console.log("page:", page);
  const pageArr = [];
  for (let i = page.startPage; i <= page.endPage; i += 1) {
    pageArr.push(i);
  }
  return (
    <Pagination>
      <Pagination.First
        onClick={() => setPageable((prev) => ({ ...prev, page: 0 }))}
      />
      <Pagination.Prev />
      {pageArr.map((item, idx) => (
        <Pagination.Item
          key={idx}
          onClick={() => {
            setPageable((prev) => ({ ...prev, page: item - 1 }));
          }}
        >
          {item}
        </Pagination.Item>
      ))}
      <Pagination.Next />
      <Pagination.Last
      // onClick={() => setPageable((prev) => ({ ...prev, page: endNum - 1 }))}
      />
    </Pagination>
  );
}
function paginate(totalItems, pageSize, currentPage) {
  // 전체 아이템 갯수와 페이지 크기를 이용하여 총 페이지 수를 계산
  const totalPages = Math.ceil(totalItems / pageSize);

  // 현재 페이지가 총 페이지 수를 넘어가지 않도록 보정
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  // 시작과 끝 페이지 번호를 계산
  let startPage, endPage;
  if (totalPages <= 10) {
    // 총 페이지 수가 10 이하인 경우 모든 페이지를 보여줌
    startPage = 1;
    endPage = totalPages;
  } else {
    // 총 페이지 수가 10 이상인 경우 현재 페이지를 중심으로 앞뒤로 5개씩 보여줌
    if (currentPage <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (currentPage + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }
  }

  // 페이지네이션에 필요한 정보를 담은 객체를 반환
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  return {
    currentPage: currentPage,
    totalPages: totalPages,
    startPage: startPage,
    endPage: endPage,
    startIndex: startIndex,
    endIndex: endIndex,
  };
}
