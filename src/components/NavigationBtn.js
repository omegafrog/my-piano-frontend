import { Link } from "react-router-dom";

function NavigationBtn({ text, img, href }) {
  if (text === undefined) {
    text = "";
  }
  return (
    <Link to={href}>
      {text}
      {img ? <img src={img} alt="button img"></img> : null}
    </Link>
  );
}
export default NavigationBtn;
