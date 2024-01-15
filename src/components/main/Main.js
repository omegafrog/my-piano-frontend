import Layout from "../Layout";
import { useContext, useEffect, useState } from "react";
import useAlert from "../../hook/useAlert";
import { UserContext } from "../User-context";

function Main() {
  const alertValue = useAlert();
  const context = useContext(UserContext);
  const [mainBannerList, setMainBannerList] = useState([]);
  const [popularSheetBannerList, setPopularSheetBannerList] = useState([]);
  const [pastPopularSheetBannerList, setPastPopularSheetBannerList] = useState(
    []
  );

  const loadMainBanner = () => {};
  const loadPopularSheetBanner = () => {};
  const loadPastPopularSheetBannerList = () => {};
  const loadPopularLessonList = () => {};
  const loadPopularArtistList = () => {};
  const loadPopularCommunityPostList = () => {};

  useEffect(() => {}, []);

  return (
    <Layout alertValue={alertValue}>
      <div>
        메인 배너
        <div>배너 리스트</div>
      </div>
      <div>인기 악보 탭 추가 가능하게</div>
      <div>그때 xx월 인기 악보</div>
      <div>인기 연주 영상</div>
      <div>인기 레슨</div>
      <div>인기 아티스트</div>
      <div> 주간 베스트 글</div>
    </Layout>
  );
}
export default Main;
