import axios from "axios";
import $ from "jquery";
import { APIError } from "./User-context";
import revalidate, { LoginError } from "../util/revalidate";

const backend = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}`,
  withCredentials: true,
  validateStatus: false,
});
const es = axios.create({
  baseURL: `http://${process.env.REACT_APP_ELASTIC_HOSTNAME}:${process.env.REACT_APP_ELASTIC_PORT}`,
  withCredentials: true,
  validateStatus: false,
});

export async function uploadFile(context, fileFormData) {
  try {
    const accessToken = await refreshAccessToken(context);
    return await backend({
      method: "post",
      url: "/sheet/file",
      withCredentials: true,
      headers: {
        Authorization: accessToken,
      },
      data: fileFormData,
    });
  } catch (e) {
    throw e;
  }
}

export async function uploadSheetInfo(context, value, navigate) {
  try {
    const accessToken = await refreshAccessToken(context);
    const formData = new FormData();
    value.sheetFile.forEach((file) => formData.append("sheetFiles", file));
    formData.append("sheetInfo", JSON.stringify(value.sheetInfo));
    const result = await backend.post("/sheet/write", formData, {
      Authorization: accessToken,
    });

    if (result.data.status === 200) {
      navigate("/sheet");
    } else {
      throw new Error("sheet 정보 전송 실패");
    }
  } catch (e) {
    throw e;
  }
}

export async function GetSheetPosts({
  setSheetPosts,
  setShowAlert,
  page = 0,
  size = 20,
  filter,
  context,
}) {
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

  const accessToken = (await refreshAccessToken(context)) || {};

  backend
    .get("/sheet", {
      params: params,
      headers: {
        Authorization: accessToken,
      },
    })
    .then((response) => {
      console.log(response);
      setSheetPosts(response.data.data);
    })
    .catch(function (error) {
      console.log("error:", error);
      setShowAlert({ state: true, text: "network error" });
    });
}

export async function Logout(context) {
  const response = refreshAccessToken(context) || {};
  console.log("response:", response);
  const { error, accessToken } = response;
  if (error !== null) {
    context.initialize();
    alert("로그인이 만료되었습니다. 다시 로그인하세요.");
  } else {
    backend
      .get("/user/logout", {
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
  const response = refreshAccessToken(context) || {};
  const { accessToken } = response;

  const result = await backend.get(
    `/cash/info?orderId=${orderId}&amount=${amount}&name=${name}`,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
  if (result && result.data.status !== 200) {
    return Error("결제 정보 저장 실패.");
  }
}

export async function requestPayment(context, paymentKey, orderId, amount) {
  const response = refreshAccessToken(context) || {};
  const { accessToken } = response;

  const result = await backend.post(
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
    }
  );

  if (!result || result.data.status !== 200) {
    return Error("결제 승인 실패.");
  } else return result;
}

export async function getPosts(pageable) {
  console.log("pagebale", pageable);
  const result = await backend.get(
    `/community/posts?page=${pageable.page}&size=${pageable.size}`
  );
  if (result.status === 200 && result.data.status) {
    return result.data;
  }
}

export async function writePost(context, body) {
  const response = refreshAccessToken(context) || {};
  const { accessToken } = response;

  const result = await backend.post("/community/posts", body, {
    headers: {
      Authorization: accessToken,
    },
  });
  return result;
}
export async function getPost(context, id) {
  const result = await backend.get(`/community/posts/${id}`, {});
  if (result.status === 200 && result.data.status === 200)
    return result.data.data;
}
export async function updatePost(context, id, data) {
  try {
    const response = refreshAccessToken(context) || {};
    const { accessToken } = response;

    const result = await backend.post(`/community/posts/${id}`, data, {
      headers: {
        Authorization: accessToken,
      },
    });
    if (result.status === 200 && result.data.status === 200) {
      return result.data;
    } else {
      return new Error(result.message);
    }
  } catch (e) {
    console.error(e);
  }
}

export async function deletePost(context, id) {
  try {
    const accessToken = refreshAccessToken(context);
    const result = await backend.delete(`/community/posts/${id}`, {
      headers: {
        Authorization: accessToken,
      },
    });
    if (result.status !== 200) {
      return new Error("삭제 실패");
    }
  } catch (e) {
    console.error(e);
  }
}

export async function checkInCart(context, item) {
  try {
    const accessToken = await refreshAccessToken(context);
    const result = await backend.get(`/cart/sheet/${item.id}`, {
      headers: {
        Authorization: accessToken,
      },
    });
    if (result.data.status === 200) {
      if (result.data.data.isInCart === true) {
        $("#cart-btn").html("이미 카트에 추가된 상품입니다.");
        $("#cart-btn").css("font-size", "16px");
        $("#cart-btn").addClass("disabled");
      }
    } else {
      return new Error("카트 체크 여부 확인 실패");
    }
  } catch (e) {
    console.error(e);
  }
}

export async function addToCart(context, item, alertValue) {
  if (!context || context.loggedIn === false) {
    alert("로그인 후 이용해주세요");
    return;
  }
  try {
    const accessToken = refreshAccessToken(context);
    const result = await backend.post(
      "/cart/sheet",
      {
        itemId: item.id,
        buyerId: context.loggedUser.id,
      },
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
    if (result.data.status === 200) {
      alertValue.setShowAlert({
        state: true,
        text: "상품을 카트에 추가했습니다.",
      });
      $("#cart-btn").html("이미 카트에 추가된 상품입니다.");
      $("#cart-btn").css("font-size", "16px");
      $("#cart-btn").addClass("disabled");
    } else {
      return new Error("상품 카트 추가 여부 확인 오류");
    }
  } catch (e) {
    console.error(e);
  }
}

export async function subscribeNoti(context, token) {
  try {
    const accessToken = refreshAccessToken(context);
    const result = await backend.post(
      `/notification/token`,
      { token: token },
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
    if (result && result.status === 200 && result.data.status === 200) {
      console.log("token 전송 성공");
      context.setPushNotification(true);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function validate(context) {
  if (context.loggedIn === true) {
    try {
      const response = await backend.get("/validate", {
        headers: {
          Authorization: context.accessToken,
        },
      });
      if (response.data.status !== 200) {
        alert("로그인이 만료되었습니다.");
        context.initialize();
      }
      context.syncUserInfo(context.accessToken);
    } catch (error) {
      console.log(error);
    }
  }
}

export async function checkIsLiked(context, target, id) {
  try {
    const accessToken = refreshAccessToken(context);
    const result = await backend.get(`/${target}/${id}/like`, {
      headers: {
        Authorization: accessToken,
      },
    });
    if (result.data.data === true) {
      const likeBtn = document.querySelector("#like-count");
      likeBtn.classList.add("active");
    }
  } catch (e) {
    console.error(e);
  }
}

export async function likePost(context, target, targetDOM, id, setState) {
  try {
    const accessToken = refreshAccessToken(context);
    const result = await backend.put(`/${target}/${id}/like`, null, {
      validateStatus: false,
      withCredentials: true,
      headers: {
        Authorization: accessToken,
      },
    });
    if (result.data.status === 200) {
      console.log("success");
      setState((prev) => ({
        ...prev,
        likeCount: prev.likeCount + 1,
      }));
      targetDOM.style.backgroundColor = "#74b9ff";
      targetDOM.classList.add("active");
    }
  } catch (e) {
    console.log("예상하지 못한 에러입니다.");
    console.log("error:", e);
  }
}

export async function login(context, form) {
  try {
    const response = await backend.post("/user/login", form, {
      withCredential: true,
    });
    if (response.data.status !== 200) {
      alert("로그인 실패");
    } else {
      console.log(response.data);
      const accessToken = response.data.data["access token"];
      console.log("accessToken:", accessToken);
      context.syncUserInfo(accessToken);
    }
  } catch (e) {
    console.error(e);
    alert("로그인 실패");
  }
}

export async function googleLogin(
  context,
  navigate,
  credentialResponse,
  handleClose
) {
  try {
    const response = await backend.post("/oauth2/google", {
      code: credentialResponse.credential,
    });
    if (response.data.status === 302) {
      const initialRegisterInfo = response.data.data.userInfo;
      navigate("/user/register", { state: initialRegisterInfo });
    } else if (response.data.status === 200) {
      console.log("로그인 성공");
      console.log("response.data", response.data);
      context.syncUserInfo();
    } else if (response.data.status === 403) {
      console.log("로그인 실패");
      alert(response.data.message);
      handleClose();
    }
  } catch (e) {
    return new Error(e.message);
  }
}

// TODO : backend에서 쿼리하도록 변경
export async function searchQuery(context, e, setSearchResult) {
  try {
    const result = await es.post(
      `/sheetpost/_search`,
      {
        query: {
          bool: {
            should: [
              {
                fuzzy: {
                  name: {
                    value: e.target.value,
                    fuzziness: 1,
                  },
                },
              },
              {
                fuzzy: {
                  title: {
                    value: e.target.value,
                    fuzziness: 1,
                  },
                },
              },
              {
                prefix: {
                  "name.keyword": {
                    value: e.target.value,
                  },
                },
              },
            ],
          },
        },
      },
      {
        headers: {
          Authorization: `ApiKey ${process.env.REACT_APP_ELASTIC_APIKEY}`,
        },
      }
    );
    if (result.status === 200 && result.data.status === 200) {
      console.log(result.data.hits.hits);
      setSearchResult(result.data.hits.hits);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function isPurcahsed(context, target, item, buttonDOM) {
  try {
    const accessToken = refreshAccessToken(context) || {};
    const result = backend.get(`/order/${target}/${item.id}`, {
      headers: {
        Authorization: accessToken,
      },
    });
    if (result.data.status === 200) {
      if (result.data.data.isOrdered === true) {
        buttonDOM.innerHTML = "이미 구매하신 상품입니다.";
        buttonDOM.disabled = true;
        $("#cart-btn").html("이미 카트에 추가된 상품입니다.");
        $("#cart-btn").css("font-size", "16px");
        $("#cart-btn").addClass("disabled");
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export async function updateUser(context, form) {
  let result;
  try {
    const accessToken = await refreshAccessToken(context);
    result = await axios.post("user", form, {
      headers: {
        Authorization: accessToken,
      },
    });
  } catch (e) {
    console.error(e);
  }

  if (result && result.status === 200 && result.data.status === 200) {
  } else {
    throw new Error("유저 정보 업데이트 실패");
  }
}

export async function pay(context, target, item) {
  let accessToken;
  try {
    accessToken = await refreshAccessToken(context);
  } catch (e) {
    console.error(e.message);
    throw e;
  }
  const result = await backend.post(
    `/order/${target}`,
    {
      itemId: item.id,
      buyerId: context.loggedUser.id,
    },
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
  if (result && result.status === 200 && result.data.status === 200) {
    return;
  } else {
    throw new Error("결제 실패");
  }
}

export async function isScrapped(context, target, id) {
  let accessToken;
  try {
    accessToken = await refreshAccessToken(context);
  } catch (e) {
    throw e;
  }
  const result = await backend.get(`/${target}/${id}/scrap`, {
    headers: {
      Authorization: accessToken,
    },
  });
  if (result && result.status === 200 && result.data.status === 200) {
    return result.data.data;
  } else {
    throw new Error("스크랩 실패");
  }
}

export async function unscrap(context, target, id) {
  let accessToken;
  try {
    accessToken = await refreshAccessToken(context);
  } catch (e) {
    throw e;
  }
  const result = await backend.delete(`/${target}/${id}/scrap`, {
    headers: {
      Authorization: accessToken,
    },
  });
  if (result && result.status === 200 && result.data.status === 200) {
    return;
  } else {
    throw new APIError("스크랩 취소 실패", result);
  }
}

export async function scrap(context, target, id) {
  let accessToken;
  try {
    accessToken = await refreshAccessToken(context);
  } catch (e) {
    throw e;
  }
  const result = await backend.put(`/${target}/${id}/scrap`, null, {
    headers: {
      Authorization: accessToken,
    },
  });
  if (result && result.status === 200 && result.data.status === 200) {
    return result.data.data;
  } else {
    throw new APIError("스크랩 실패", result);
  }
}

export async function getCart(context) {
  let accessToken;
  try {
    accessToken = await refreshAccessToken(context);
  } catch (e) {
    throw e;
  }
  const result = await backend.get("/cart", {
    headers: {
      Authorization: accessToken,
    },
  });
  if (result && result.status === 200 && result.data.status === 200) {
    return result.data.data;
  } else {
    throw new APIError("카트 조회 실패", result);
  }
}

export async function deleteItemFromCart(context, id) {
  let accessToken;
  try {
    accessToken = await refreshAccessToken(context);
  } catch (e) {
    throw e;
  }
  const result = await backend.delete(`/cart/${id}`, {
    headers: {
      Authorization: accessToken,
    },
  });
  if (result && result.status === 200 && result.data.status === 200) {
    return;
  } else {
    throw new APIError("카트에서 상품 제거 실패", result);
  }
}
export async function payAllInCart(context, requestURI) {
  let accessToken;
  try {
    accessToken = await refreshAccessToken(context);
  } catch (e) {
    throw e;
  }
  const result = await backend.patch(`/${requestURI}`, null, {
    headers: {
      Authorization: accessToken,
    },
  });
  if (result && result.status === 200 && result.data.status === 200) {
    return result.data.data;
  } else {
    throw new APIError("카트에서 상품 제거 실패", result);
  }
}

export async function addComment(context, target, id, content) {
  let accessToken = await refreshAccessToken(context);
  const body = {
    content: content,
  };
  const result = await backend.post(`${target}/${id}/comment`, body, {
    headers: {
      Authorization: accessToken,
    },
  });
  if (result && result.status === 200 && result.data.status === 200) {
    return result.data.data;
  } else {
    throw new APIError("댓글 달기 실패", result);
  }
}

export async function getComments(context, target, id) {
  let accessToken = await refreshAccessToken(context);
  const result = await backend.get(`/${target}/${id}/comments`, {
    headers: {
      Authorization: accessToken,
    },
  });
  if (result && result.status === 200 && result.data.status === 200) {
    return result.data.data;
  } else {
    throw new APIError("댓글 조회 실패", result);
  }
}

export async function deleteComment(context, target, id, commentId) {
  let accessToken = await refreshAccessToken(context);
  const result = await backend.delete(`/${target}/${id}/comment/${commentId}`, {
    headers: {
      Authorization: accessToken,
    },
  });
  if (result && result.status === 200 && result.data.status === 200) {
    return result.data.data;
  } else {
    throw new APIError("댓글 삭제 실패", result);
  }
}

export async function getLesson(id) {
  const result = await backend.get(`/lesson/${id}`, {});
  if (result && result.status === 200 && result.data.status === 200) {
    return result.data.data;
  } else {
    throw new APIError("레슨 조회 실패", result);
  }
}

export async function getLessons() {
  const result = await backend.get("/lessons", {});
  if (result && result.status === 200 && result.data.status === 200) {
    return result.data.data;
  } else {
    throw new APIError("레슨 조회 실패", result);
  }
}

export async function getUserUploadedSheets(context) {
  let accessToken = await refreshAccessToken(context);
  const result = await backend.get("/user/uploadedSheets", {
    headers: {
      Authorization: accessToken,
    },
  });
  if (result && result.status === 200 && result.data.status === 200) {
    return result.data.data;
  } else {
    throw new APIError("유저가 업로드한 악보 조회 실패", result);
  }
}

export async function uploadLesson(context, lessonInfo) {
  let accessToken = await refreshAccessToken(context);
  const result = await backend.post("/lesson", lessonInfo, {
    headers: {
      Authorization: accessToken,
    },
  });
  if (result && result.status === 200 && result.data.status === 200) {
    return result.data.data;
  } else {
    throw new APIError("레슨 업로드 실패", result);
  }
}

export async function getSheet(id) {
  const result = await backend.get(`/sheet/${id}`);
  if (result && result.status === 200 && result.data.status === 200) {
    return result.data.data;
  } else {
    throw new APIError("악보 조회 실패", result);
  }
}

export async function isLikedPost(context, target, id) {
  let accessToken = await refreshAccessToken(context);
  const response = await backend.get(`/${target}/${id}/like`, {
    headers: {
      Authorization: accessToken,
    },
  });
  if (response && response.status === 200 && response.data.status === 200) {
    return response.data.data;
  } else {
    throw new APIError("좋아요 눌렀는지 조회 실패", response);
  }
}

export async function getPurchasedSheets(context) {
  let accessToken = await refreshAccessToken(context);
  const response = await backend.get("/user/purchasedSheets", {
    headers: {
      Authorization: accessToken,
    },
  });
  if (response && response.status === 200 && response.data.status === 200) {
    return response.data.data;
  } else {
    throw new APIError("구매한 악보 조회 실패", response);
  }
}

export async function getTickets(context) {
  let accessToken = await refreshAccessToken(context);
  const response = await backend.get("/tickets", {
    headers: {
      Authorization: accessToken,
    },
  });
  if (response && response.status === 200 && response.data.status === 200) {
    return response.data.data;
  } else if (response.data.status === 401) {
    throw new LoginError(response.data.message);
  } else {
    throw new APIError("티켓 리스트 조회 실패", response);
  }
}

export async function adminLogin(context, form) {
  const result = await backend.post("/admin/login", form);
  console.log(result);
  if (result && result.status === 200 && result.data.status === 200) {
    const accessToken = result.data.data["access token"];
    console.log("accessToken:", accessToken);
    await context.syncAdminInfo(accessToken);
  } else {
    throw new LoginError("Failed to login");
  }
}

export async function countLoggedUsers(context) {
  let accessToken = await refreshAccessToken(context);
  const response = await backend.get("/admin/log-in-users/count", {
    headers: {
      Authorization: accessToken,
    },
  });
  if (response && response.status === 200 && response.data.status === 200) {
    return response.data.data;
  } else {
    throw new APIError("로그인한 유저 카운팅 실패");
  }
}

async function refreshAccessToken(context) {
  let accessToken;
  try {
    accessToken = await revalidate(context);
  } catch (e) {
    throw e;
  }
  return accessToken;
}
