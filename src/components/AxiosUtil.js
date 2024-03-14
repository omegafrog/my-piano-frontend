import axios from "axios";
import revalidate from "../util/revalidate";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

export async function UploadFile(context, fileFormData) {
  const { accessToken } = await revalidate(context);
  return await axios({
    method: "post",
    url: "http://localhost:8080/sheet/file",
    withCredentials: true,
    headers: {
      Authorization: accessToken,
    },
    data: fileFormData,
  });
}

export async function UploadSheetInfo(context, value, setShowAlert, navigate) {
  const response = revalidate(context) || {};
  const { accessToken, error } = response;
  const formData = new FormData();
  value.sheetFile.forEach((file) => formData.append("sheetFiles", file));
  formData.append("sheetInfo", JSON.stringify(value.sheetInfo));
  console.log("formData.getAll(sheetFiles)", formData.getAll("sheetFiles"));
  console.log("asdfasd:", formData.get("sheetInfo"));
  axios({
    method: "post",
    url: "http://localhost:8080/sheet/write",
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
      } else {
        window.location.href = "/sheet";
      }
    })
    .catch(function (error) {
      console.log(error);
      setShowAlert({ state: true, text: "network error" });
    });
}

export function GetSheetPosts({
  setSheetPosts,
  setShowAlert,
  page = 0,
  size = 20,
  filter,
  context,
}) {
  const url = "http://localhost:8080/sheet";
  const params = {};
  params.page = page;
  let genreParam = "";
  let instrumentParam = "";
  let difficultyParam = "";

  if (filter.genres.length > 0) {
    filter.genres.forEach((item) => (genreParam += item + ","));
    genreParam.slice({ end: genreParam.length - 1 });
    params.genre = genreParam;
  }
  if (filter.instruments.length > 0) {
    filter.instruments.forEach((item) => (instrumentParam += item + ","));
    instrumentParam.slice({ end: instrumentParam.length - 1 });
    params.instrument = instrumentParam;
  }
  if (filter.difficulties.length > 0) {
    filter.difficulties.forEach((item) => (difficultyParam += item + ","));
    difficultyParam.slice({ end: difficultyParam.length - 1 });
    params.difficulty = difficultyParam;
  }

  const response = revalidate(context) || {};

  const { accessToken, error } = response;
  const result = axios
    .get(`http://localhost:8080/sheet`, {
      params: params,
      headers: {
        Authorization: accessToken,
      },
    })
    .then((response) => {
      console.log(response);
      setSheetPosts(response.data.data.sheetPosts);
    })
    .catch(function (error) {
      console.log("error:", error);
      setShowAlert({ state: true, text: "network error" });
    });
}

export async function Logout(context) {
  const response = revalidate(context) || {};
  console.log("response:", response);
  const { error, accessToken } = response;
  if (error !== null) {
    context.initialize();
    alert("로그인이 만료되었습니다. 다시 로그인하세요.");
  } else {
    axios
      .get("http://localhost:8080/user/logout", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        console.log("response:", response);
        if (response.data.status === 200) {
          context.initialize();
        } else {
          alert("error");
        }
      })
      .catch(function (error) {
        if (error.request || error.response) console.log("error:", error);
      });
  }
}

export async function createCashOrder(context, orderId, amount, name) {
  const response = revalidate(context) || {};
  const { accessToken, error } = response;

  const result = await instance.get(
    `/cash/info?orderId=${orderId}&amount=${amount}&name=${name}`,
    {
      headers: {
        Authorization: accessToken,
      },
      withCredentials: true,
      validateStatus: false,
    }
  );
  if (result && result.data.status !== 200) {
    return Error("결제 정보 저장 실패.");
  }
}

export async function requestPayment(context, paymentKey, orderId, amount) {
  const response = revalidate(context) || {};
  const { accessToken, error } = response;

  const result = await instance.post(
    "/cash/request",
    {
      paymentKey: paymentKey,
      orderId: orderId,
      amount: amount,
    },
    {
      headers: {
        Authorization: accessToken,
      },
      withCredentials: true,
      validateStatus: false,
    }
  );

  if (!result || result.data.status !== 200) {
    return Error("결제 승인 실패.");
  } else return result;
}

export async function getPosts(pageable) {
  console.log("pagebale", pageable);
  const result = await instance.get(
    `/community/posts?page=${pageable.page}&size=${pageable.size}`,
    {
      withCredentials: true,
      validateStatus: false,
    }
  );
  if (result.status === 200 && result.data.status) {
    return result.data;
  }
}

export async function writePost(context, body) {
  const response = revalidate(context) || {};
  const { accessToken, error } = response;

  const result = await instance.post("/community/posts", body, {
    headers: {
      Authorization: accessToken,
    },
    withCredentials: true,
    validateStatus: false,
  });
  return result;
}
