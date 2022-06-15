//src > redux > modules > pokelist.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//초기 상태값 initialstate
const initialState = {
  list: [],
};

//axios
//포켓몬 리스트 불러오기
export const loadPostDB = () => {
  return async function (dispatch) {
    await axios.get("http://13.124.220.124").then((response) => {
      dispatch(pokelistLOAD(response.data));
    });
  };
};

//action, action function, reducer
const pokelistSlice = createSlice({
  name: "pokelist",
  initialState,
  reducers: {
    pokelistLOAD: (state, action) => {
      state.list = action.payload;
    },
  },
});

// console.log("ppp", pokelistSlice);

// console.log("test@test.test", signupUser)
export const { pokelistLOAD } = pokelistSlice.actions;
export default pokelistSlice.reducer;
