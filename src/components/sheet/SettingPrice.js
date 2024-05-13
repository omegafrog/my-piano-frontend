import { useEffect, useState } from "react";

function SettingPrice({ sheetInfo, setSheetInfo, className }) {
  const [isFree, setFree] = useState(true);
  const changePrice = (event) => {
    event.preventDefault();
    setSheetInfo((prev) => ({
      ...prev,
      price: event.target.value,
    }));
  };
  useEffect(() => {
    if (sheetInfo.price > 0) setFree(false);
  }, []);
  useEffect(() => {
    console.log(sheetInfo);
  }, [sheetInfo]);
  return (
    <div className={className}>
      <input
        type="radio"
        id="free"
        name="cost-radio"
        checked={isFree}
        value={"free"}
        onClick={() => setFree(true)}
      />
      <label htmlFor="free">무료</label>

      <input
        type="radio"
        id="pay"
        name="cost-radio"
        value={"pay"}
        checked={!isFree}
        onClick={() => setFree(false)}
      />
      <label htmlFor="pay">유료</label>

      {isFree ? null : (
        <div className="sheet-upload-price">
          <span>소비자가격(원화, 부가세 포함)</span>
          <input type="number" value={sheetInfo.price} onChange={changePrice} />
        </div>
      )}
    </div>
  );
}
export default SettingPrice;
