import { Link } from "react-router-dom";
import styles from "../css/NavigationBtn.module.css";

function NavigationBtn({ text, img, href }) {
  if (text !== undefined) {
    return { text };
  }
  if (img !== undefined) {
    return <img className={styles.NavBtn} src={img} alt="button img"></img>;
  }
}
export default NavigationBtn;
