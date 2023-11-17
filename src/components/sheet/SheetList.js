import { Table } from "react-bootstrap";
import { instrumentDict } from "./InstrumentSelection";
import { difficultyDict } from "./DifficultySelection";
import { ItemListUserInfo } from "../user/userInfo";

export default function SheetList({ sheetPosts, noContentMessage, navigate }) {
  if (sheetPosts.length > 0) {
    return (
      <Table className="w-100">
        <thead>
          <th>
            <span>곡 정보</span>
          </th>
          <th>
            <span>아티스트</span>
          </th>
          <th>
            <span>악기</span>
          </th>
          <th>
            <span>난이도</span>
          </th>
          <th>
            <span>조회수</span>
          </th>
          <th>
            <span>가격</span>
          </th>
        </thead>
        <tbody>
          {sheetPosts.map((item) => (
            <tr>
              <td
                onClick={(e) => {
                  navigate(`/sheet/${item.id}`);
                }}
                style={{
                  cursor: "pointer",
                }}
              >
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
              <td>{instrumentDict[item.sheet.instrument]}</td>
              <td>{difficultyDict[item.sheet.difficulty]}</td>
              <td>{item.viewCount}회</td>
              <td>{item.price}원</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  } else {
    return <h1>{noContentMessage}</h1>;
  }
}
