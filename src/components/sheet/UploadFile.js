function UploadFile({ value }) {
  const renameSheetImg = (event) => {
    const files = event.target.files;
    const form = new FormData();
    for (const file of files) {
      const nameList = file.name.split(".");
      form.append(
        "imgFiles",
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
    const imgFiles = form.getAll("imgFiles");
    let imageListItems = "";
    imgFiles.forEach((sheet) => {
      imageListItems += sheet.name;
      imageListItems += ",";
    });
    console.log(imageListItems);
    value.setSheetInfo((prev) => ({
      ...prev,
      sheetDto: {
        ...prev.sheetDto,
        filePath: imageListItems,
        pageNum: files.length,
      },
    }));
    return form;
  };
  return (
    <form id="sheetForm" encType="multipart/form-data" method="POST">
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
    </form>
  );
}

export default UploadFile;
