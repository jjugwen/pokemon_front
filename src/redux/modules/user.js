//src > redux > modules > user.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie } from "../../shared/Cookie";

//axios
//회원 정보 저장하기 post signupDB //axios.post(url[, data[, config]])
export const signupDB = (userinfo) => {
  return async function (dispatch) {
    try {
      await axios
        .post(
          "http://13.124.220.124/user/signup",
          userinfo //email, nickname, pw 정보 담겨 있음.
        )
        .then((request) => {
          // console.log(request.data);
          dispatch(userCREATE(request.data));
          alert("회원가입 성공");
          // const navigate = useNavigate();
          // navigate("/");
        });
    } catch (error) {
      console.log("failed", error);
      // alert("중복 확인이 필요합니다");
    }
  };
};
//ID(email) 중복 확인 emailcheckDB
export const emailcheckDB = (email) => {
  return function (dispatch) {
    axios
      .get(`http://13.124.220.124/user/emailDupCheck/${email}`)
      .then((response) => {
        // console.log(response);
        const result = dispatch(hasEMAIL(response.data)); //true(사용가능) or false(중복)
        // console.log(result.payload);
        if (result.payload === false) {
          alert("가입된 이메일입니다");
        } else {
          alert("사용 가능합니다");
        }
      })
      .catch((err) => {
        console.log("err확인" + err);
      });
  };
};

//nickname 중복 확인 nicknamecheckDB
export const nicknamecheckDB = (nickname) => {
  return async function (dispatch) {
    axios
      .get(`http://13.124.220.124/user/nameDupCheck/${nickname}`)
      .then((response) => {
        const result = dispatch(hasNICKNAME(response.data)); //true(사용가능) or false(중복)
        // console.log(result.payload);
        if (result.payload === false) {
          alert("사용 중인 닉네임입니다. 다른 닉네임을 사용해주세요");
        } else {
          alert("사용 가능합니다");
        }
      })
      .catch((err) => {
        console.log("err확인" + err);
      });
  };
};

//회원 찾기 (로그인) 서버에 email(id), pw를 제공(request)하고 유저 정보와 토큰을 받아 저장.
export const loginDB = (loginUserinfo) => {
  return async function (dispatch) {
    await axios
      .post("http://13.124.220.124/user/login", loginUserinfo)

      .then((response) => {
        // console.log(response);
        const accessToken = response.data.token;
        // console.log(accessToken);
        setCookie("is_login", `${accessToken}`);
        const result = response.data.result;
        // 저장된 토큰으로 login 여부 확인
        if (result) {
          dispatch(userLOGIN({ is_login: true }));
        } else {
          alert(response.data.errorMsg);
        }
      });
  };
};

//action, action function, reducer
export const User = createSlice({
  name: "users",
  initialState: { list: [{ is_login: false }] },
  reducers: {
    //회원 정보 저장
    userCREATE: (state, action) => {
      state.list = action.payload;
      // console.log(state.list); // {email: "", nickname: "", pw: "" }
    },
    //회원 정보 불러오기
    userLOGIN: (state, action) => {
      state.list = action.payload;
      // console.log(action.payload);
    },
    //ID(email) 중복 확인
    hasEMAIL: (state, action) => {
      state.list = action.payload;
    },
    //nickname 중복 확인
    hasNICKNAME: (state, action) => {
      state.list = action.payload;
    },
    //로그아웃
    userLOGOUT: (state, action) => {
      state.list = action.payload;
    },
  },
});

// console.log("test", signupUser);
// action creator export
const actionCreators = {
  signupDB,
  loginDB,
  nicknamecheckDB,
  emailcheckDB,
};

export { actionCreators };

export const { userCREATE, userLOGIN, hasEMAIL, hasNICKNAME, userLOGOUT } =
  User.actions;
export default User.reducer;
