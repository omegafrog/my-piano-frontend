import { Col, Container, Row, Table, Tabs } from "react-bootstrap";
import { ItemListUserInfo } from "../user/userInfo";
import { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import ReactDOM from "react-dom";

export default function PopularSheetsTabs() {
  const popularSheetBannerList = [];
  useEffect(() => {
    let loadPopular = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/popular?range=monthly&limit=10",
          {
            validateStatus: false,
            withCredentials: true,
          }
        );
        if (response.status === 200 && response.data.status === 200) {
          popularSheetBannerList = response.data.data["popular"];
          for (let i = 0; i < popularSheetBannerList.length; i += 1) {
            const result = (
              <Row
                className="d-flex justify-content-center align-items-center"
                onClick={() => {
                  window.location.href = `/sheet/${popularSheetBannerList[i].id}`;
                }}
                style={{
                  cursor: "pointer",
                }}
              >
                <Col
                  xs={"1"}
                  className="d-flex justify-content-center align-items-center"
                >
                  <span style={{ display: "inline-block" }}>{i + 1}</span>
                </Col>
                <Col
                  xs={"1"}
                  className="d-flex justify-content-center align-items-center"
                >
                  <ItemListUserInfo
                    profileSrc={popularSheetBannerList[i].userInfo.profileSrc}
                  />
                </Col>
                <Col className="d-flex flex-column">
                  <span
                    style={{
                      textOverflow: "ellipsis",
                      display: "inline-block",
                      fontSize: "20px",
                    }}
                  >
                    {popularSheetBannerList[i].title}
                  </span>
                  <span
                    style={{
                      display: "inline-block",
                    }}
                  >
                    {popularSheetBannerList[i].userInfo.name}
                  </span>
                </Col>
              </Row>
            );
            ReactDOM.render(result, document.getElementById(`${i + 1}`));
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadPopular();
  }, []);

  return (
    <>
      {popularSheetBannerList.length > 0 ? (
        <table
          style={{
            width: "1200px",
            height: "400px",
            borderCollapse: "collapse",
            borderTop: "2px solid #dfe4ea",
          }}
        >
          <tbody>
            <tr>
              <td id="1"></td>
              <td id="6"></td>
            </tr>
            <tr>
              <td id="2"></td>
              <td id="7"></td>
            </tr>
            <tr>
              <td id="3"></td>
              <td id="8"></td>
            </tr>
            <tr>
              <td id="4"></td>
              <td id="9"></td>
            </tr>
            <tr>
              <td id="5"></td>
              <td id="10"></td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div
          style={{
            width: "1200px",
            height: "400px",
            borderTop: "2px solid #dfe4ea",
          }}
          className="d-flex justify-content-center align-items-center"
        >
          <h5 style={{ display: "inline-block" }}>
            아직 올라온 악보가 없습니다
          </h5>
        </div>
      )}
    </>
  );
}
