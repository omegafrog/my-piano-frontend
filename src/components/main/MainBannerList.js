import "./main.css";
const MainBannerListContent = ({
  banner,
  idx,
  listLength,
  bannerCounter,
  setBannerCounter,
}) => {
  return (
    <div
      data-list-length={listLength}
      className={`p-2 d-flex align-items-center banner-list ${
        idx === bannerCounter ? "active" : ""
      }`}
      style={{
        height: "64px",
      }}
      onClick={(e) => {
        setBannerCounter(idx);
      }}
    >
      <img
        src={process.env.PUBLIC_URL + banner.thumbnailSrc}
        style={{
          borderRadius: "300px",
          width: "auto",
          height: "80%",
        }}
      ></img>
      <div className="px-1 d-flex justify-content-center align-items-center">
        <span
          style={{
            wordBreak: "keep-all",
            fontSize: "14px",
          }}
        >
          {banner.title}
        </span>
      </div>
    </div>
  );
};

export default function MainBannerList({
  mainBannerList,
  bannerCounter,
  setBannerCounter,
}) {
  return mainBannerList.map((banner, idx) => (
    <MainBannerListContent
      banner={banner}
      key={idx}
      idx={idx}
      listLength={mainBannerList.length}
      bannerCounter={bannerCounter}
      setBannerCounter={setBannerCounter}
    />
  ));
}
