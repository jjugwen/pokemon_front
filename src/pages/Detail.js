import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { getCookie } from "../shared/Cookie";

const Detail = () => {
  //사용자 로그인 시 받은 토큰이 있는지 확인하는 함수
  const userCookie = getCookie("is_login");
  // console.log(userCookie);
  // console.log(userCookie ? "have" : "none");

  const params = useParams();
  const detail_id = params.id;
  const pokemonId = Number(params.id) + 1;
  const [data, setData] = useState([]);
  const [comments, setComment] = useState([]);
  // console.log(comments);

  const [info, setInfo] = useState({
    id: 0,
    name: "name",
    imageUrl: "",
    num: "000",
    element: [],
    info: "...",
    likesCnt: 0,
  });

  useEffect(() => {
    axios.get(`http://13.124.220.124/detail/${pokemonId}`).then((response) => {
      setData(response.data);
      // console.log(response);
    });
    axios
      .get(`http://13.124.220.124/viewcomments/${pokemonId}`)
      .then((response) => {
        setComment(response.data);
        // console.log(response);
      });
  }, []);

  const inputholder = `${data.name} 씨를 좋아하나요?`;

  const deletePost = (id) => {
    axios.delete(`http://13.124.220.124/${id}`).then((response) => {
      setData((current) => current.filter((v) => v.id !== id));
    });
  };

  const input_text = useRef(null);
  // console.log(input_text.current.value);

  return (
    <>
      <Header />
      {/* 이미지 div */}
      <Container>
        <ContainerImage>
          <ImageDiv>
            <Div>
              <img
                style={{ width: "300px", height: "300px" }}
                src={data?.imageUrl}
              />
            </Div>
            <div
              style={{
                background: "none",
                border: "none",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                width: "100px",
                gap: "7%",
              }}
            >
              {/*좋아요 기능 구현*/}

              {/* /*좋아요 누르기 전*/}
              {/* <button
                style={{
                  background: "white",
                  borderRadius: "60%",
                  border: "none",
                  fontSize: "1.2em",
                  color: "red",
                }}
                onClick={() => {}}
              >
                {data?.likeByMe && "[ME]"} ♡
              </button> */}

              {/* /*좋아요 누른 후*/}
              <button
                style={{
                  background: "red",
                  borderRadius: "50%",
                  border: "none",
                  fontSize: "1.2em",
                  color: "black",
                }}
                onClick={() => {}}
              >
                ♡
              </button>

              {/*좋아요 총 카운트*/}
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "1.1em",
                }}
              >
                {data?.likesCnt}
              </div>
            </div>

            {/* 오른쪽 */}
          </ImageDiv>
          <InfoDiv>
            <InfoBox>
              <Info>
                <h1>{data?.num}</h1>
              </Info>
              <Info>
                <h1>{data?.name}</h1>
              </Info>
              <Info>
                <InfoTitle>특성</InfoTitle>
              </Info>
              <Info>{data?.element}</Info>
              <Info>
                <InfoTitle>설명</InfoTitle>
              </Info>
              <Info>{data?.info}</Info>
            </InfoBox>
          </InfoDiv>
        </ContainerImage>

        {/* 인풋 div */}
        <InputDiv>
          <Input placeholder={inputholder} type="text" ref={input_text} />
          <Button
            onClick={() => {
              if (!userCookie) {
                alert("로그인 해주세요!");
              } else {
                axios
                  .post(`http://13.124.220.124/comment/${pokemonId}`, {
                    comment: input_text.current.value,
                    postId: params.id,
                  })
                  .then((response) => {
                    console.log(response);
                    setComment((current) => [...current, response.data]);
                  });
              }
            }}
          >
            댓글 남기기
          </Button>
        </InputDiv>
        <div>
          <Ul>
            {comments.map((comment, index) => {
              return (
                <div
                  style={{
                    margin: "1%",
                    backgroundColor: "rgb(242 235 208)",
                  }}
                  key={index}
                >
                  <div style={{ marginLeft: "2%" }}>
                    <TitleP>
                      <span>{comment.nickname}</span>
                      <span> | </span>
                      <span>{comment.createdAt}</span>
                    </TitleP>
                  </div>

                  <div>
                    <CommentP>
                      <span>{comment.comments}</span>
                    </CommentP>
                  </div>
                  <div
                    style={{
                      margin: "1% 2%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button2
                      onClick={() => {
                        if (userCookie) {
                          console.log("회원 클릭");
                          axios
                            .patch(
                              `http://13.124.220.124/comment/${pokemonId}`,
                              {
                                comment: input_text.current.value,
                              }
                            )
                            .then((response) => {
                              setComment((current) =>
                                current.map((value) => {
                                  if (comment.id === value.id) {
                                    value.comment = input_text.current.value;
                                  }
                                  return value;
                                })
                              );
                            });
                        } else {
                          alert("로그인 해주세요!");
                        }
                      }}
                    >
                      수정
                    </Button2>
                    <Button2
                      onClick={() => {
                        if (userCookie) {
                          axios
                            .delete(
                              `http://13.124.220.124/comment/${pokemonId}`
                            )
                            .then((response) => {
                              setComment((current) =>
                                current.filter((value) => {
                                  return comment.id !== value.id;
                                })
                              );
                            });
                        } else {
                          alert("로그인 해주세요!");
                        }
                      }}
                    >
                      삭제
                    </Button2>
                  </div>
                </div>
              );
            })}
          </Ul>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-top: 40px;
`;

const ContainerImage = styled.div`
  border: 1px solid #3564ad;
  margin: 0px auto;
  margin-bottom: 30px;
  width: 100%;
  max-width: 600px;
  height: auto;
  display: flex;
  jusfify-content: center;
`;

const ImageDiv = styled.div`
  width: 300px;
  position: relative;
  padding: 20px;
`;

const Div = styled.div`
  margin-bottom: 1px;
  margin-top: 30px;
  width: 300px;
  height: 300px;
`;

const InfoDiv = styled.div`
  margin-left: 10px;
  margin-top: 50px;
  width: 100%;
  max-width: 600px;
  padding-right: 5%;
`;

const InfoBox = styled.div`
  font-size: 14px;
  width: 100%;
  max-width: 240px;
`;

const Info = styled.div`
  margin-bottom: 10px;
`;

const InfoTitle = styled.h1`
  font-size: 15px;
`;

const Button = styled.button`
  height: 25px;
  border: none;
  background-color: rgb(255, 203, 5);
  color: #3564ad;
  border-radius: 30%;
  font-size: 1em;
  width: 100px;
  height: 30px;
`;

const Button2 = styled.button`
  height: 25px;
  border: none;
  background-color: rgb(255, 203, 5);
  color: #3564ad;
  margin: 0.5%;
  font-size: 0.8em;
  border-radius: 30%;
  width: 40px;
  height: 30px;
`;

const Input = styled.input`
  margin-bottom: 30px;
  margin-right: 10px;
  width: 485px;
  height: 19px;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  border-color: #3564ad;
`;

const InputDiv = styled.div`
  text-align: center;
`;

const Ul = styled.ul`
  margin: 1px auto;
  width: 600px;
  border: 1px solid #3564ad;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.5px;
`;

const TitleP = styled.p`
  margin-left: 2%
  display: grid;
  grid-template-columns: 100px 20px 100px;
  font-size: 13px;
`;

const CommentP = styled.p`
  font-size: 15px;
  margin: 1% 2% 1% 2%;
  color: gray;
`;

export default Detail;
