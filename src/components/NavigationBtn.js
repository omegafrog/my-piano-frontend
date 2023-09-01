function NavigationBtn({ text, img, href }) {
  if (text === undefined) {
    text = "";
  }
  return (
    <a href={href}>
      {text}
      {img ? <img src={img} alt="button img"></img> : null}
    </a>
  );
}
export default NavigationBtn;
