export function sheetInfoValidator(sheetInfo, alertContext) {
  let flag = true;
  console.log("sheetInfo:", sheetInfo);
  if (sheetInfo.title.length < 3) {
    alertContext.alert("danger", "글 제목이 너무 짧습니다.");
    flag = false;
  }
  if (sheetInfo["content"].length < 10) {
    alertContext.alert("danger", "글 내용이 너무 짧습니다.");
    flag = false;
  }
  if (sheetInfo["price"] === null || sheetInfo["price"] < 0) {
    alertContext.alert("danger", "금액은 0원 미만일 수 없습니다.");
    flag = false;
  }
  console.log(sheetInfo.sheetDto);
  if (
    sheetInfo.sheetDto.title === null ||
    sheetInfo["sheetDto"]["title"].length < 3
  ) {
    alertContext.alert("danger", "곡 제목이 너무 짧습니다.");
    flag = false;
  }

  if (
    sheetInfo.sheetDto.difficulty === null ||
    sheetInfo.sheetDto.difficulty < 0 ||
    sheetInfo.sheetDto.difficulty > 4
  ) {
    alertContext.alert("danger", "난이도가 잘못되었습니다.");
    flag = false;
  }
  if (
    sheetInfo.sheetDto.instrument === null ||
    sheetInfo.sheetDto.instrument < 0 ||
    sheetInfo.sheetDto.instrument > 12
  ) {
    alertContext.alert("danger", "악기 선택이 잘못되었습니다.");
    flag = false;
  }
  if (
    sheetInfo.sheetDto.genres === null ||
    sheetInfo.sheetDto.genres.length === 0 ||
    sheetInfo.sheetDto.genres.length > 2
  ) {
    alertContext.alert("danger", "장르 선택이 잘못되었습니다.");
    flag = false;
  }
  if (sheetInfo.sheetDto.isSolo === null) {
    alertContext.alert("danger", "편성을 선택하지 않았습니다.");
    flag = false;
  }
  if (sheetInfo.sheetDto.lyrics === null) {
    alertContext.alert("danger", "가사 여부를 선택하지 않았습니다.");
    flag = false;
  }
  if (
    sheetInfo.sheetDto.filePath === null ||
    sheetInfo.sheetDto.filePath.length === 0
  ) {
    alertContext.alert("danger", "악보를 올리지 않았습니다.");
    flag = false;
  }
  return flag;
}
