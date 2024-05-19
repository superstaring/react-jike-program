import { createSlice } from "@reduxjs/toolkit";
import { removeToken, request } from "@/utils";

const userStore = createSlice({
  name: "user",
  initialState: {
    // 初始
    token: localStorage.getItem("token_key") || "",
    // 用户信息
    userInfo: {},
  },
  // 同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;

      // localStorage存储一份
      localStorage.setItem("token_key", action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state, action) {
      state.token = "";
      state.userInfo = {};
      removeToken();
    },
  },
});

const { setToken, setUserInfo, clearUserInfo } = userStore.actions;

// 异步请求
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post("/fill/authorizations", loginForm);
    dispatch(setToken(res.data.token));
  };
};

// 异步方法-获取个人用户信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await request.get("/fill/userInfo");
    dispatch(setUserInfo(res.data));
  };
};

const userReducer = userStore.reducer;

export { setToken, fetchLogin, fetchUserInfo, clearUserInfo };

export default userReducer;
