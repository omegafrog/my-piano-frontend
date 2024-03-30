import Layout from "../Layout";
import { useContext, useEffect, useRef, useState } from "react";

import "./main.css";
import MainBanner from "./MainBanner";
import MainBannerList from "./MainBannerList";
import axios from "axios";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { ItemListUserInfo } from "../user/userInfo";
import PopularSheetsTabs from "./PopularSheetsTabs";
import { AlertContext } from "../../context/AlertContext";

function Main() {
  const alertValue = useContext(AlertContext);
  const [mainBannerList, setMainBannerList] = useState([]);
  const [pastPopularSheetBannerList, setPastPopularSheetBannerList] = useState(
    []
  );
  const [bannerCounter, setBannerCounter] = useState(0);

  const cycleMainBanner = () => {
    if (mainBannerList.length > 0) {
      const a = setInterval(() => {
        setBannerCounter((prev) => (prev + 1) % mainBannerList.length);
      }, 5000);
      return () => clearInterval(a);
    }
  };

  const loadMainBanner = () => {
    // static에 저장된 배너 정보 가져옴
    const mainBanners = require("../../assets/main/mainBanner.json");
    console.log(mainBanners);
    setMainBannerList(mainBanners);
  };

  useEffect(() => {
    loadMainBanner();
  }, []);

  useEffect(() => {
    cycleMainBanner();
  }, [mainBannerList]);

  return (
    <Layout alertValue={alertValue}>
      <div className="w-100 d-flex justfiy-content-center align-items-center flex-column">
        <div
          style={{
            width: "100%",
            height: "320px",
            position: "relative",
          }}
        >
          <MainBanner
            mainBannerList={mainBannerList}
            bannerCounter={bannerCounter}
            setBannerCounter={setBannerCounter}
          />
          <div
            className="banner-list-container"
            style={{
              position: "absolute",
              top: "0px",
              right: "10vw",
              height: "100%",
              width: "200px",
            }}
          >
            <MainBannerList
              mainBannerList={mainBannerList}
              bannerCounter={bannerCounter}
              setBannerCounter={setBannerCounter}
            />
          </div>
        </div>
        <div
          className={"d-flex my-5 flex-column align-items-center"}
          style={{ width: "1200px" }}
        >
          <h3 className="align-self-start">주간 인기 악보</h3>
          <PopularSheetsTabs />
        </div>
      </div>
    </Layout>
  );
}
export default Main;
