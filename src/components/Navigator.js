import LogoBtn from "./LogoBtn";
import NavigationBtn from "./NavigationBtn";
import SearchBar from "./SearchBar";
import UserInfo from "./UserInfo";

function Navigator() {
  return (
    <div className="navigator">
      <LogoBtn />
      <NavigationBtn text={"악보"} href="/sheet" />
      <NavigationBtn text={"레슨"} />
      <NavigationBtn text={"커뮤니티"} />
      <SearchBar />
      <NavigationBtn img={"img/coin-stack.png"} />
      <NavigationBtn img={"img/notification.png"} />
      <NavigationBtn img={"img/shopping-cart.png"} />
      <UserInfo />
    </div>
  );
}
export default Navigator;
