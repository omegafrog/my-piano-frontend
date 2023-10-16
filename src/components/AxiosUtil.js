import axios from "axios";
import useRevalidate from "../hook/useRevalidate";

export async function UploadFile(context, fileFormData) {
  const { accessToken } = await useRevalidate(context);
  return await axios({
    method: "post",
    url: "/api/sheet/file",
    withCredentials: true,
    headers: {
      Authorization: accessToken,
    },
    data: fileFormData,
  });
}

export async function UploadSheetInfo(context, value, setShowAlert) {
  const { accessToken } = await useRevalidate(context);
  const formData = new FormData();
  value.sheetFile.forEach((file) => formData.append("sheetFiles", file));
  formData.append("sheetInfo", JSON.stringify(value.sheetInfo));
  console.log("formData.getAll(sheetFiles)", formData.getAll("sheetFiles"));
  console.log("asdfasd:", formData.get("sheetInfo"));
  axios({
    method: "post",
    url: "/api/sheet/write",
    withCredentials: true,
    validateStatus: false,
    headers: {
      Authorization: accessToken,
    },
    data: formData,
  })
    .then((response) => {
      if (response.data.status !== 200) {
        setShowAlert({ state: true, text: response.data.message });
      }
    })
    .catch(function (error) {
      console.log(error);
      setShowAlert({ state: true, text: "network error" });
    });
}

export function GetSheetPosts(setSheetPosts, setShowAlert) {
  const result = axios
    .get("/api/sheet")
    .then((response) => {
      setSheetPosts(response.data.serializedData.sheetPosts);
    })
    .catch(function (error) {
      console.log("error:", error);
      setShowAlert({ state: true, text: "network error" });
    });
}

export async function Logout(context) {
  useRevalidate(context).then((response) => {
    const { error, accessToken } = response;
    console.log("response:", response);
    console.log("accessToken:", accessToken);
    if (error !== undefined) {
      alert("로그인이 만료되었습니다. 다시 로그인하세요.");
      console.log("context:", context);
      context.initialize();
    } else {
      axios
        .get("/api/user/logout", {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((response) => {
          console.log("response:", response);
          if (response.data.status === 200) {
            console.log(context);
            context.initialize();
            console.log("initialized");
          } else {
            alert("error");
          }
        })
        .catch(function (error) {
          if (error.request || error.response) console.log("error:", error);
        });
    }
  });
}
