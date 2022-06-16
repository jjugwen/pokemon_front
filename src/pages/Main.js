//src > pages > Main.js
//메인 페이지 (헤더는 따로)

import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import sampleimg from "../components/000101.png";
import { useSelector } from "react-redux";

const Main = (props) => {
  //상세페이지 연결에 필요
  const navigate = useNavigate();

  //index 값(PK) 받아오려면
  const params = useParams();

  //리덕스에서 리스트 가져오기
  const poke_list = useSelector((state) => state.pokelist.list);
  // console.log(poke_list);

  //검색 기능 (onChange aciton을 통해 input value값에 저장된 검색어를 가져온다.)
  const [name, setName] = useState("");

  // console.log(search);
  const onChangeSearch = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="MainOutter">
        {/* 좋아요 순위 높은(옵션) 이미지 슬라이드(우선은 default 몇 장) */}
        <div className="MainImage">
          <img src={sampleimg} alt="img" />
        </div>

        {/* 검색창 */}
        <div className="SearchBox">
          <input
            type="text"
            value={name}
            placeholder="포켓몬을 검색하세요"
            onChange={onChangeSearch}
            className="SearchInput"
          ></input>
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            type="submit"
          >
            🔍
          </button>
        </div>
        {/* 포켓몬 1세대 리스트 */}
        <CardBox>
          {/* 리스트 불러와서 매핑 */}
          {poke_list.map((props, index) => {
            return (
              <>
                <Card
                  key="card"
                  onClick={() => {
                    navigate(`/detail/` + index);
                  }}
                >
                  <img
                    key="imgurl"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={props.imageUrl}
                    alt="imageUrl"
                  />
                  <div
                    style={{
                      width: "180px",
                      gap: "2%",
                      color: "#4f4f4f",
                      margin: "2% 2% 0% 2%",
                      position: "absolute",
                      zIndex: "1",
                      display: "flex",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>{props.num}</span>
                    <span>{props.name}</span>
                  </div>
                </Card>
              </>
            );
          })}
        </CardBox>
      </div>
    </>
  );
};
const CardBox = styled.div`
  width: 90%;
  max-width: 1000px;
  gap: 2%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;
const Card = styled.div`
  width: 100%;
  max-width: 235px;
  height: 235px;
  &:hover {
    cursor: default;
    background-color: #b6d3d4;
    box-shadow: 0px 0px 3px 0px rgb(255, 203, 5), 3px 3px 3px rgb(53, 100, 173);
  }
  position: relative;
  overflow: hidden;
  margin-bottom: 2%;
`;

export default Main;
