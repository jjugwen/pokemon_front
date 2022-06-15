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
  const index = params.index;

  //리덕스에서 리스트 가져오기
  const poke_list = useSelector((state) => state.pokelist.list);
  // console.log(poke_list);

  //검색 기능 (onChange aciton을 통해 input value값에 저장된 검색어를 가져온다.)
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  // console.log(search);

  // filter, includes를 이용하여 특정값이 검색어를 포함 시 필터링을 해주어 검색 구현.
  // const searchList = () => {
  //   const filtered = poke_list.filter((poke_list) => {
  //     const p = poke_list.name
  //       .toUpperCase()
  //       .includes(search.toUpperCase());
  //     console.log(p);
  //     return (
  //       <div className="cardList">
  //         {filtered.map((poke_list) => {
  //           return <Card key={poke_list.id} {...poke_list} />;
  //         })}
  //       </div>
  //     );
  //   });
  // };

  return (
    <>
      <Header />

      <div className="MainOutter">
        {/* 좋아요 순위 높은(옵션) 이미지 슬라이드(우선은 default 몇 장) */}
        <div className="MainImage">
          <img src={sampleimg} alt="img" />
        </div>
        {/* 검색창 */}
        {/* <form onSubmit={(e) => onSearch(e)}> */}
        <div className="SearchBox">
          <input
            type="text"
            value={search}
            placeholder="포켓몬을 검색하세요"
            onChange={onChangeSearch}
            className="SearchInput"
          ></input>
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            type="submit"
            // onClick={searchList}
          >
            🔍
          </button>
        </div>
        {/* </form> */}

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
                  {/* <TextBox>
                    <div>{props.name}</div>
                    <br />
                    <div>{props.num}</div>
                  </TextBox> */}

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
                </Card>
                {/* <p>{props.name}</p> */}
              </>
            );
          })}
          {/* <Card
            key={index}
            onClick={() => {
              navigate(`/detail/` + index);
            }}
          /> */}
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
  // background-color: red;
  &:hover {
    cursor: default;
    background-color: #b6d3d4;
    box-shadow: 0px 0px 3px 0px rgb(255, 203, 5), 3px 3px 3px rgb(53, 100, 173);
  }
  position: relative;
  overflow: hidden;
  margin-bottom: 2%;
`;

const TextBox = styled.div`
  width: 100%;
  max-width: 235px;
  height: 235px;
  position: relative;
  text-align: center;
  margin: 30px auto;
  display: none;
  &:hover {
    position: ${(props) => props.name || "absolute"};
    display: ${(props) => props.name || "none"};
  }
`;
export default Main;
