function UploadFileForm({ setSheetInfo, setSheetFile }) {
  const renameSheetImg = (event) => {
    console.log("event:", event);
    const files = event.target.files;
    let newFile;
    const nameList = files[0].name.split(".");
    var fileNameWithoutExtension = "";
    for (var i = 0; i < nameList.length - 1; i += 1) {
      fileNameWithoutExtension += nameList[i];
    }
    var newFileNameWithoutExtension =
      "sheet-" + fileNameWithoutExtension + "-" + crypto.randomUUID();
    newFile = new File(
      [files[0]],
      newFileNameWithoutExtension + "." + nameList[nameList.length - 1],
      { type: files[0].type }
    );

    setSheetInfo((prev) => ({
      ...prev,
      sheet: {
        ...prev.sheet,
        sheetUrl: newFileNameWithoutExtension,
        originalFileName: files[0].name,
      },
    }));
    console.log("newfile:", newFile);
    setSheetFile(newFile);
  };
  return (
    <div className="input-group mb-3">
      <input
        type="file"
        className="form-control"
        id="inputGroupFile02"
        name="imgFiles"
        onChange={renameSheetImg}
      />
      <label className="input-group-text" htmlFor="inputGroupFile02">
        Upload
      </label>
    </div>
  );
}

export default UploadFileForm;
