// src > pages > Singup.js
// 회원가입 페이지

//issue 1 : 미입력 시 중복 확인버튼 클릭하면, 알림뜨는 설정 => 입력했다 지우고 다시 비어두고 클릭하면 알림 안뜸.

import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  userCREATE,
  emailcheckDB,
  nicknamecheckDB,
} from "../redux/modules/user";
import { actionCreators as userActions } from "../redux/modules/user";
import Header from "../components/Header";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //아이디(이메일) 제한 조건 : 이메일 형식
  const is_email = (id) => {
    let _reg = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return _reg.test(id);
  };

  // 닉네임 제한 조건 : 3자리 이상 9자리 이하 한글(초성도x)/영문
  const is_nickname = (nickname) => {
    let _reg = /^(?=.*[a-zA-Z0-9ㄱ-ㅎ가-힣])[a-zA-Z0-9ㄱ-ㅎ가-힣]{3,9}$/;
    return _reg.test(nickname);
  };

  // 비밀번호 제한 조건 : 8자리 이상 20자리 이하
  const is_password = (pw) => {
    let _reg = /^[0-9a-zA-Z!@#$%^&.*]{8,20}$/;
    return _reg.test(pw);
  };

  //회원이 기입한 정보 불러오기

  //제약 조건 통과 시 inputbox 아래 글씨 바꾸기 위한 useState 사용
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [pw, setPw] = useState("");
  const [pwcheck, setPwcheck] = useState("");
  const [emailcheck, setEmailCheck] = useState(false);
  const [nicknamecheck, setNicknameCheck] = useState(false);

  //비밀번호 체크 (비어있는지 && 크로스체크 확인)
  const pwDubleCheck = () => {
    if (pw === "" || pwcheck === "") {
      return false;
    }
    if (!is_password(pw)) {
      return false;
    }
    if (pw === pwcheck) {
      return true;
    } else {
      return false;
    }
  };
  //DB에 넣어주기 위한 묶음이 필요
  let userinfo = {
    email: email,
    nickname: nickname,
    pw: pw,
  };
  //아이디(email) 체크
  const emailIDCheck = (e) => {
    if (!is_email(e.target.value)) {
      setEmailCheck(false);
      return;
    } else {
      setEmailCheck(true);
    }
    setEmail(e.target.value);
    // console.log(setEmail(e.target.value));
  };

  //닉네임 체크
  const nickCheck = (e) => {
    if (!is_nickname(e.target.value)) {
      setNicknameCheck(false);
      return;
    } else {
      setNicknameCheck(true);
    }
    setNickname(e.target.value);
    // console.log(setNickname(e.target.value));
  };

  //아이디 중복검사
  const emailDubCheck = () => {
    if (email === "") {
      alert("아이디를 입력해주세요");
      return;
    } else {
      dispatch(emailcheckDB(email));
    }
  };

  //닉네임 중복검사
  const nicknameDubCheck = () => {
    if (nickname === "") {
      alert("닉네임을 입력해주세요");
      return;
    } else {
      console.log(nickname);
      dispatch(nicknamecheckDB(nickname));
    }
  };

  // 회원가입 버튼 클릭 시 유효성 검사와 가입 시키기
  const signup = () => {
    if (email === "" || nickname === "" || pw === "") {
      alert("아이디, 닉네임, 비밀번호를 모두 입력해주세요");
      return;
      // } else if (!is_email()) {
      //   alert("비밀번호 형식을 확인해주세요.");
    }
    if (!pwDubleCheck()) {
      alert("비밀번호를 확인해주세요.");
      return;
    } else {
      console.log(userCREATE.payload);
      dispatch(userActions.signupDB({ email, nickname, pw }));
    }
  };

  return (
    <>
      <Header />
      <div className="SignupBox">
        <p>회원가입</p>
        {/* <form> */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="text"
            onChange={emailIDCheck}
            className="Input1"
            placeholder="아이디를 입력하세요"
          />
          <button
            className="CheckButton"
            onClick={() => {
              console.log("아이디 중복확인 클릭");
              emailDubCheck();
            }}
          >
            중복 확인
          </button>
        </div>
        <Check>{emailcheck ? "" : "*아이디는 이메일 형식입니다"}</Check>
        <Check2>{emailcheck ? "사용가능한 형식입니다" : ""}</Check2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="text"
            onChange={nickCheck}
            className="Input1"
            placeholder="닉네임을 입력하세요"
          />
          <button
            className="CheckButton"
            onClick={() => {
              console.log("닉네임 중복확인 클릭");
              nicknameDubCheck();
            }}
          >
            중복 확인
          </button>
        </div>
        <Check>
          {nicknamecheck ? "" : "*닉네임은 3자리 이상 9자리 이하입니다"}
        </Check>
        <Check2>{nicknamecheck ? "사용가능한 형식입니다" : ""}</Check2>
        <input
          type="password"
          className="Input"
          placeholder="비밀번호(8~20자리)를 입력하세요"
          onChange={(e) => {
            setPw(e.target.value);
          }}
        />

        <input
          type="password"
          className="Input"
          placeholder="비밀번호를 한번 더 입력하세요"
          onChange={(e) => {
            setPwcheck(e.target.value);
          }}
        />
        <Check>{pwDubleCheck() ? "" : "*비밀번호를 확인해주세요"}</Check>
        <Check2>{pwDubleCheck() ? "비밀번호가 일치합니다" : ""}</Check2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "3%",
            margin: "2%",
          }}
        >
          <button
            className="SignupButton"
            // onSubmit={onSubmit}
            onClick={() => {
              signup();
            }}
          >
            회원가입 피카
          </button>
          <button
            className="SignupButton"
            style={{ backgroundColor: "orange" }}
            onClick={() => {
              navigate("/login");
            }}
          >
            이미 회원이신가요? 로그인하기
          </button>
        </div>
        {/* </form> */}
      </div>
    </>
  );
};

const Check = styled.p`
  color: red;
  font-size: 13px;
`;
const Check2 = styled.p`
  color: rgb(53, 100, 173);
  font-size: 13px;
`;

export default Signup;
