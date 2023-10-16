function UploadFileForm({ value }) {
  const renameSheetImg = (event) => {
    const files = event.target.files;
    const newFiles = [];
    for (const file of files) {
      const nameList = file.name.split(".");
      newFiles.push(
        new File(
          [file],
          "sheet-" +
            nameList[0] +
            "-" +
            crypto.randomUUID() +
            "." +
            nameList[1],
          { type: file.type }
        )
      );
    }
    let imageListItems = "";
    newFiles.forEach((sheet) => {
      imageListItems += sheet.name;
      imageListItems += ",";
    });
    console.log(imageListItems);
    value.setSheetInfo((prev) => ({
      ...prev,
      sheetDto: {
        ...prev.sheetDto,
        filePath: imageListItems,
        pageNum: newFiles.length,
      },
    }));
    value.setSheetFile(newFiles);
  };
  return (
    <div className="input-group mb-3">
      <input
        type="file"
        className="form-control"
        id="inputGroupFile02"
        name="imgFiles"
        onChange={renameSheetImg}
        multiple
      />
      <label className="input-group-text" htmlFor="inputGroupFile02">
        Upload
      </label>
    </div>
  );
}

export default UploadFileForm;
