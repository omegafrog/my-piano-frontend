import { Container } from "react-bootstrap";
import "./main.css";

const MainBannerContent = ({
  mainBannerList,
  banner,
  idx,
  bannerCounter,
  setBannerCounter,
}) => {
  return (
    <a
      href={banner.href}
      className={`main-banner ${idx === bannerCounter ? "active" : null}`}
      key={idx}
      onMouseOver={(e) => {
        e.preventDefault();
      }}
      style={{
        background: banner.backgroundColor,
        height: "100%",
      }}
    >
      <div className="banner-body ">
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ width: "350px" }}
        >
          <h1>
            <strong>{banner.title}</strong>
          </h1>
          <small>{banner.body}</small>
        </div>
        <img
          style={{
            height: "100%",
          }}
          src={process.env.PUBLIC_URL + banner.imgSrc}
        ></img>
      </div>
    </a>
  );
};

export default function MainBanner({ mainBannerList, bannerCounter }) {
  console.log(bannerCounter);
  return mainBannerList.map((banner, idx) => (
    // console.log(banner, idx)
    <MainBannerContent
      banner={banner}
      mainBannerList={mainBannerList}
      key={idx}
      idx={idx}
      bannerCounter={bannerCounter}
    />
  ));
}
