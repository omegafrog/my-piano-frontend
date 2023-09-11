function UploadFile() {
  return (
    <form id="sheetForm" encType="multipart/form-data" method="POST">
      <div className="input-group mb-3">
        <input
          type="file"
          className="form-control"
          id="inputGroupFile02"
          name="imgFiles"
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
