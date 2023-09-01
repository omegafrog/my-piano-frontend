import LogoBtn from "./LogoBtn";
import NavigationBtn from "./NavigationBtn";
import SearchBar from "./SearchBar";
import UserInfo from "./UserInfo";

function Navigator({ userInfo }) {
  return (
    <div className="navigator">
      <LogoBtn />
      <NavigationBtn text={"악보"} />
      <NavigationBtn text={"레슨"} />
      <NavigationBtn text={"커뮤니티"} />
      <SearchBar />
      <NavigationBtn img={"public/coin-stack.png"} />
      <NavigationBtn img={"public/notification.png"} />
      <NavigationBtn img={"publicshopping-cart.png"} />
      <UserInfo userInfo={userInfo} />
    </div>
  );
}
export default Navigator;
