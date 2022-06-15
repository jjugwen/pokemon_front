//src > pages > Login.js
//로그인 페이지

import React, { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../components/Header";

import { actionCreators as userActions } from "../redux/modules/user";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //id, 비밀번호 정보 확인
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const loginUserinfo = {
    email: email,
    pw: pw,
  };
  // console.log(loginUserinfo);
  const LoginAccess = () => {
    if (email === "" || pw === "") {
      window.alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    dispatch(userActions.loginDB({ email, pw }));
  };

  return (
    <>
      <Header />
      <div className="SignupBox">
        <p>로그인</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="Input"
            placeholder="아이디(이메일 형식)를 입력하세요"
          />
        </div>

        <input
          onChange={(e) => {
            setPw(e.target.value);
          }}
          type="password"
          className="Input"
          placeholder="비밀번호(8~20자리)를 입력하세요"
        />
        <div className="InputBottomText"></div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "3%",
            margin: "2%",
          }}
        >
          <button
            // disabled={!email || !password ? true : false}
            className="SignupButton"
            onClick={() => {
              LoginAccess();

              // console.log(email, pw);
            }}
          >
            로그인 피카
          </button>
          <button
            className="SignupButton"
            style={{ backgroundColor: "orange" }}
            onClick={() => {
              navigate("/signup");
            }}
          >
            {/* 아직 회원이 아니신가요?  */}
            회원가입하기
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
