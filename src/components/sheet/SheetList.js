import { Table } from "react-bootstrap";
import { instrumentDict } from "./InstrumentSelection";
import { difficultyDict } from "./DifficultySelection";
import { ItemListUserInfo } from "../user/userInfo";

export default function SheetList({ sheetPosts, noContentMessage, navigate }) {
  if (sheetPosts && sheetPosts.length > 0) {
    return (
      <Table className="w-100">
        <thead>
          <th>곡 정보</th>
          <th>아티스트</th>
          <th>악기</th>
          <th>난이도</th>
          <th>조회수</th>
          <th>가격</th>
        </thead>
        <tbody>
          {sheetPosts.map((item) => (
            <tr
              onClick={() => {
                navigate(`/sheet/${item.id}`);
              }}
            >
              <td>
                <span>{item.title}</span>
              </td>
              <td>
                <div>
                  <ItemListUserInfo
                    profileSrc={item.artist.profileSrc}
                    name={item.artist.name}
                  />
                </div>
              </td>
              <td>
                <span>{instrumentDict[item.sheet.instrument]}</span>
              </td>
              <td>
                <span>{difficultyDict[item.sheet.difficulty]}</span>
              </td>
              <td>
                <span>{item.viewCount}회</span>
              </td>
              <td>
                <span>{item.price}원</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  } else {
    return <h1>{noContentMessage}</h1>;
  }
}
