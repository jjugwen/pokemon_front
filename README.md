# 🎁 포켓몬 띠부띠부

포켓몬빵을 사 먹지 못한 사람들의 한을 풀어주기 위한 사이트

제작 기간 : 2022.06.19 ~ 2022.06.16 (7일)

# :information_desk_person: 팀원 소개

🦌 : **BACK-END (3명)**  <a href="https://github.com/KorOnechild/Proj.DDibu-backend">back-end github</a>

 + 김민주 : 로그인, 회원가입, 인증(JWT) 구현

 + 김승찬 : 데이터베이스 크롤링, 검색 CRUD, 메인 페이지, 디테일 페이지 구현

 + 심규홍 : 댓글 CRUD, 좋아요 기능 구현

🎅 : **FRONT-END (1명)** 

 + 이영주 : 메인 페이지, 헤더, 로그인, 회원가입 등 구현

# :dizzy: 핵심기능
> 1) 회원가입 / 로그인
 + JWT 인증 방식으로 로그인 구현
 + ID 중복확인, 각 필드별 유효성체크

> 2) 포켓몬 열람
 + 포켓몬 목록
 + 포켓몬 상세 조회
 + 포켓몬 좋아요

> 3) 댓글 CRUD
 +댓글 등록, 댓글 수정, 댓글 삭제

# :tv: 데모영상
<img src="https://img.shields.io/badge/YouTube-FF0000?style=flat&logo=YouTube&logoColor=white"/> https://youtu.be/JPpEf-CZooE

# :computer: 기술 스택 
#### Server 
  <img src="https://img.shields.io/badge/aws-232F3E?style=for-the-badge&logo=AmazonAWS&logoColor=white">
  
#### Framework
  <img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white"><img src="https://img.shields.io/badge/Springboot-6DB33F?style=for-the-badge&logo=Springboot&logoColor=white">
    <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  
#### Language
  <img src="https://img.shields.io/badge/JAVA-007396?style=for-the-badge&logo=java&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  
#### Database
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  
#### Tool
  <img src="https://img.shields.io/badge/gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white"><img src="https://img.shields.io/badge/Git-00000?style=for-the-badge&logo=Git&logoColor=F05032]"/><img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white]"/>

# :key: 트러블 슈팅
> 프론트엔드
 + 회원가입 시 유효성 검사에 따른 글자 변환 CSS 변경. => 화살표 함수를 두 번 이용하여 구현
  <Check>{emailcheck ? "" : "*아이디는 이메일 형식입니다"}</Check>
  <Check2>{emailcheck ? "사용가능한 형식입니다" : ""}</Check2>
 + 프론트 브랜치 합칠 때 => 패키지 설치 충돌 => 패키지 설치 => 해결
 + 백엔드와 합칠 때 => pw vs password 식별자 충돌 => pw로 통일 => 해결.
